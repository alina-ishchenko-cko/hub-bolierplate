// @ flow
import * as React from 'react';
import CkoButton from 'components/ui/button';
import EditAssociatedPaymentPlanForm from '../edit-associated-payment-plan-form';
import Confirmation from 'components/ui/confirm';
import CkoSwitch from 'components/ui/switch';
import moment from 'moment';
import { paymentPlanStatuses, paymentPlanStatusCodes } from 'utils';
import { FlexColumn, FlexRow } from 'components/ui/flex';
import CopyToClipboardBtn from 'components/ui/copy-to-clipboard-btn';
import CustomerDetailsValueSummary from '../customer-details-value-summary';
import {
  ExpandedActionsStyled,
  ExpandedRowStyled,
} from '../styled/ExpandedDetails.sc';
import {
  PlanInfoStyled,
  PlanSummaryStyled,
  PlanInfoContainerStyled,
} from './CustomerAssociatedPlanDetails.sc';

type Props = {
  plan: Object,
  cards: Array<Object>,
  editPaymentPlan: Function,
  deletePaymentPlan: Function,
  isReadOnly: boolean,
};

type State = {
  isEditPlanDialogVisible: boolean,
  isDeletePlanDialogVisible: boolean,
};

export default class CustomerAssociatedPlanDetails extends React.Component<
  Props,
  State
> {
  constructor(props) {
    super(props);
    this.state = {
      isEditPlanDialogVisible: false,
    };
  }

  toggleEditPlanDialog = () => {
    this.setState(prevState => {
      return { isEditPlanDialogVisible: !prevState.isEditPlanDialogVisible };
    });
  };

  toggleDeletePlanDialog = () => {
    this.setState(prevState => {
      return {
        isDeletePlanDialogVisible: !prevState.isDeletePlanDialogVisible,
      };
    });
  };

  composeDataForEditPlanDialog() {
    if (!this.props.cards.data) {
      return [];
    }

    return this.props.cards.data.map(card => {
      return {
        key: card.id,
        value: card.id,
        label: card.last4,
      };
    });
  }

  onPlanCardEdit = ({ cardId }) => {
    this.toggleEditPlanDialog();
    this.props.editPaymentPlan(
      this.props.plan.customerPlanId,
      this.props.plan.status,
      cardId,
      this.props.plan.channelId
    );
  };

  toggleActivePlan = () => {
    const { plan } = this.props;
    const newPlanStatus =
      plan.status === paymentPlanStatusCodes.ACTIVE
        ? paymentPlanStatusCodes.SUSPENDED
        : paymentPlanStatusCodes.ACTIVE;
    this.props.editPaymentPlan(
      plan.customerPlanId,
      newPlanStatus,
      plan.cardId,
      plan.channelId
    );
  };

  onDeletePlan = () => {
    this.toggleDeletePlanDialog();
    this.props.deletePaymentPlan(this.props.plan.customerPlanId);
  };

  getCardNumber = () => {
    if (!this.props.cards) {
      return;
    }

    const cards = this.props.cards.data;
    const planCardId = this.props.plan.cardId;

    return cards.filter(card => {
      return card.id.toLowerCase() === planCardId.toLowerCase();
    })[0].last4;
  };

  render() {
    const cycles = {
      '1d': 'DAY',
      '1w': 'WEEK',
      '1m': 'MONTH',
      '1y': 'YEAR',
    };
    const { plan } = this.props;
    const cycle = cycles[plan.cycle];
    const allowedActions = paymentPlanStatuses.get(plan.status).allowedActions;
    return (
      <ExpandedRowStyled>
        <PlanInfoStyled>
          <PlanSummaryStyled>
            <CustomerDetailsValueSummary
              size="small"
              value={plan.totalCollectedValue}
              units={plan.currency}
              title="Total collected amount"
              description="Sum of all recurring payment processed"
            />
            <CustomerDetailsValueSummary
              size="small"
              value={plan.totalCollectedCount}
              units={'\u00d7'}
              title="Processed payments"
              description="Total number of successfull payments"
            />
          </PlanSummaryStyled>

          <FlexRow>
            <PlanInfoContainerStyled>
              <div className="plan-info-container">
                <div className="plan-info-title">Card number</div>
                <div className="plan-info">{this.getCardNumber()}</div>
              </div>
              <FlexRow>
                <FlexColumn>
                  <div className="plan-info-container">
                    <div className="plan-info-title">Plan Duration</div>
                    <div className="plan-info">
                      {/*Add S at the end if the cycle name if cycle is plural*/}
                      {`${plan.recurringCount} ${cycle}${
                        plan.recurringCount > 1 ? 'S' : ''
                      }`}
                    </div>
                  </div>
                  <div className="plan-info-container">
                    <div className="plan-info-title">Recurrency left</div>
                    <div className="plan-info">{plan.recurringCountLeft}</div>
                  </div>
                </FlexColumn>
                <FlexColumn>
                  <div className="plan-info-container">
                    <div className="plan-info-title">Plan Frequency</div>
                    <div className="plan-info">{`1 ${cycle}`}</div>
                  </div>
                  <div className="plan-info-container">
                    <div className="plan-info-title">Next Rec Date</div>
                    <div className="plan-info">
                      {plan.nextRecurringDate
                        ? moment(plan.nextRecurringDate).format('DD/MM/YYYY')
                        : 'N/A'}
                    </div>
                  </div>
                </FlexColumn>
              </FlexRow>
            </PlanInfoContainerStyled>
            <PlanInfoContainerStyled>
              <div className="plan-info-container">
                <div className="plan-info-title">Plan ID</div>
                <div className="plan-info">
                  <span className="plan-id">{plan.planId}</span>
                  <CopyToClipboardBtn text={plan.planId} />
                </div>
              </div>
              <div className="plan-info-container">
                <div className="plan-info-title">Customer Plan ID</div>
                <div className="plan-info">
                  <span className="customer-plan-id">
                    {plan.customerPlanId}
                  </span>
                  <CopyToClipboardBtn text={plan.customerPlanId} />
                </div>
              </div>
              <div className="plan-info-container">
                <div className="plan-info-title">Plan Track ID</div>
                <div className="plan-info">{plan.planTrackId}</div>
              </div>
            </PlanInfoContainerStyled>
          </FlexRow>
        </PlanInfoStyled>

        {!this.props.isReadOnly ? (
          <ExpandedActionsStyled>
            {allowedActions.enable || allowedActions.suspend ? (
              <div className="action-container">
                <div className="switcher-container">
                  Active
                  <CkoSwitch
                    type="circle"
                    onToggleBtn={this.toggleActivePlan}
                    defaultChecked={
                      plan.status === paymentPlanStatusCodes.ACTIVE
                    }
                  />
                </div>
              </div>
            ) : null}

            {allowedActions.edit ? (
              <div className="action-container">
                <CkoButton
                  value="Change card"
                  size="small"
                  icon="edit"
                  onClick={this.toggleEditPlanDialog}
                />
              </div>
            ) : null}

            {allowedActions.delete ? (
              <div className="action-container">
                {/*use REMOVE icon*/}
                <CkoButton
                  value="Remove plan"
                  size="small"
                  icon="edit"
                  onClick={this.toggleDeletePlanDialog}
                />
              </div>
            ) : null}
          </ExpandedActionsStyled>
        ) : null}

        {this.state.isEditPlanDialogVisible ? (
          <EditAssociatedPaymentPlanForm
            data={this.composeDataForEditPlanDialog()}
            initialValue={this.props.plan.cardId}
            onCancel={this.toggleEditPlanDialog}
            onOk={this.onPlanCardEdit}
          />
        ) : null}
        {this.state.isDeletePlanDialogVisible ? (
          <Confirmation
            title="Confirm removing plan"
            titleIcon="modal-payment"
            message="Removing plan is permanent. 
						Are you sure that you want to remove
						this plan for current customer?"
            okText="Remove"
            cancelText="Don't remove"
            onOk={this.onDeletePlan}
            onCancel={this.toggleDeletePlanDialog}
          />
        ) : null}
      </ExpandedRowStyled>
    );
  }
}
