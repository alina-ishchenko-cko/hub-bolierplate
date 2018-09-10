// @ flow
import * as React from 'react';
import CkoButton from 'components/ui/button';
import CkoSwitch from 'components/ui/switch';
import {
  ExpandedActionsStyled,
  ExpandedRowStyled,
} from '../styled/ExpandedDetails.sc';
import { CardInfoStyled } from './CustomerCardDetails.sc';
import EditAssociatedCardForm from '../edit-associated-card-form';
import Confirmation from 'components/ui/confirm';
import CopyToClipboardBtn from 'components/ui/copy-to-clipboard-btn';
import CkoTooltip from 'components/ui/tooltip';
import AddressInfo from 'components/ui/address-info';

type Props = {
  card: Object,
  countries: Array<Object>,
  updateCustomerCardDetails: Function,
  deleteCard: Function,
  setDefaultCard: Function,
  isReadOnly: boolean,
};

type State = {
  isEditCardDialogVisible: boolean,
  isRemoveCardDialogVisible: boolean,
};

export default class CustomerCardDetails extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      isEditCardDialogVisible: false,
      isRemoveCardDialogVisible: false,
    };
  }

  toggleEditCardDialog = () => {
    this.setState(prevState => {
      return {
        isEditCardDialogVisible: !prevState.isEditCardDialogVisible,
      };
    });
  };

  toggleRemoveCardDialog = () => {
    this.setState(prevState => {
      return {
        isRemoveCardDialogVisible: !prevState.isRemoveCardDialogVisible,
      };
    });
  };

  onSaveCustomerCardDetails = newBillingDetails => {
    this.props.updateCustomerCardDetails(this.props.card.id, {
      billingDetails: Object.assign(
        {},
        this.props.card.billingDetails,
        newBillingDetails
      ),
    });
    this.toggleEditCardDialog();
  };

  onSetDefaultCard = () => {
    this.props.setDefaultCard(this.props.card.id);
  };

  onDeleteCard = () => {
    this.props.deleteCard(this.props.card.id);
  };

  render() {
    const {
      addressLine1,
      addressLine2,
      city,
      postcode,
      state,
      country,
    } = this.props.card.billingDetails;
    const areBillingDetailsFilled =
      addressLine1 || addressLine2 || city || state || postcode || country;
    const removeCardBtn = (
      <CkoButton
        value="Remove"
        size="small"
        icon="edit"
        onClick={this.toggleRemoveCardDialog}
        disabled={this.props.card.defaultCard}
      />
    );
    return (
      <ExpandedRowStyled>
        {this.state.isEditCardDialogVisible ? (
          <EditAssociatedCardForm
            countries={this.props.countries}
            billingDetails={this.props.card.billingDetails}
            name={this.props.card.name}
            onOk={this.onSaveCustomerCardDetails}
            onCancel={this.toggleEditCardDialog}
          />
        ) : null}
        {this.state.isRemoveCardDialogVisible ? (
          <Confirmation
            title="Confirm removing card"
            titleIcon="modal-payment"
            message="Removing card is permanent. 
          Are you sure that you want to remove
          this card for current customer?"
            okText="Remove"
            cancelText="Don't remove"
            onOk={this.onDeleteCard}
            onCancel={this.toggleRemoveCardDialog}
          />
        ) : null}
        <CardInfoStyled>
          <div className="card-id">
            <div className="card-info-title">Card ID</div>
            <div className="card-info">
              <span className="card-info-id">{this.props.card.id}</span>
              <CopyToClipboardBtn text={this.props.card.id} />
            </div>
          </div>
          <div className="avs-check">
            <div className="card-info-title">AVS Check</div>
            <div className="card-info">{this.props.card.avsCheck}</div>
          </div>
        </CardInfoStyled>
        <CardInfoStyled>
          <div className="card-info-title">Address</div>
          {areBillingDetailsFilled ? (
            <div className="card-info">
              <AddressInfo
                address={
                  areBillingDetailsFilled
                    ? this.props.card.billingDetails
                    : void 0
                }
              />
            </div>
          ) : (
            <div className="card-info">N/A</div>
          )}
        </CardInfoStyled>
        {!this.props.isReadOnly ? (
          <ExpandedActionsStyled>
            {!this.props.card.defaultCard && this.props.setDefaultCard ? (
              <div className="action-container">
                <div className="switcher-container">
                  Default
                  <CkoSwitch
                    type="circle"
                    onToggleBtn={this.onSetDefaultCard}
                    defaultChecked={this.props.card.defaultCard}
                    disabled={this.props.card.defaultCard}
                  />
                </div>
              </div>
            ) : null}

            <div className="action-container">
              <CkoButton
                value="Edit card"
                size="small"
                icon="edit"
                onClick={this.toggleEditCardDialog}
              />
            </div>
            {this.props.deleteCard && (
              <div className="action-container">
                {/*use REMOVE icon*/}
                {this.props.card.defaultCard ? (
                  <CkoTooltip
                    placement="left"
                    title="Default card cannot be deleted">
                    {removeCardBtn}
                  </CkoTooltip>
                ) : (
                  removeCardBtn
                )}
              </div>
            )}
          </ExpandedActionsStyled>
        ) : null}
      </ExpandedRowStyled>
    );
  }
}
