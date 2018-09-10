// @ flow
import * as React from 'react';
import { TableContainerStyled } from '../styled/CustomerDetailesTables.sc';
import CkoButton from 'components/ui/button';
import CkoTable from 'components/ui/table';
import CkoTag from 'components/ui/tag';
import ExpandedRowButton from '../expanded-row-button';
import { currencyService } from 'services/currency/currencyService';
import { paymentPlanStatuses } from 'utils/index';
import CustomerAssociatedPlanDetails from '../customer-associated-plan-details';
import AddPaymentPlan from 'components/pages/add-payment-plan';
import { auth } from 'services/security/authorisation';

type Props = {
  actions: Object,
  associatedPaymentPlans: Object,
  cards: Array<Object>,
  editPaymentPlan: Function,
  deletePaymentPlan: Function,
  accounts: {
    accountId: string,
    businessId: string,
    channelId: string,
  },
  isReadOnly: boolean,
  customerId: string,
  getAssociatedPaymentPlans: Function,
};

type State = {
  isAddPaymentPlanDialogVisible: boolean,
  expandedRows: Array<string>,
};

export default class CustomerAssociatedPlans extends React.Component<
  Props,
  State
> {
  state = {
    isAddPaymentPlanDialogVisible: false,
    expandedRows: [],
  };

  columns: Array<Object> = [
    {
      title: 'Plan name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Plan price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (statusCode: number) => {
        const statusColors = {
          yellow: ['Suspended', 'Auto Suspended'],
          green: ['Active', 'Completed'],
          red: ['In Arrears', 'Failed Initial', 'Cancelled'],
        };
        const status = paymentPlanStatuses.get(statusCode).status;
        return (
          <CkoTag
            value={status}
            yellow={statusColors.yellow.includes(status)}
            red={statusColors.red.includes(status)}
            green={statusColors.green.includes(status)}
          />
        );
      },
    },
    {
      title: 'Actions',
      render: plan => {
        return (
          <ExpandedRowButton
            isRowExpanded={this.state.expandedRows.indexOf(plan.key) !== -1}
          />
        );
      },
    },
  ];

  componentDidMount() {
    this.getCustomerAssociatedPlans();
  }

  componentDidUpdate(prevProps: Props) {
    const { actions } = this.props;
    const prevActions = prevProps.actions;
    if (
      this.props.customerId !== prevProps.customerId ||
      (prevActions.edit.loading && actions.edit.success) ||
      (prevActions.delete.loading && actions.delete.success) ||
      (prevActions.addPaymentPlan.loading && actions.addPaymentPlan.success)
    ) {
      this.getCustomerAssociatedPlans();
    }
  }

  getDataSourceFromPlans() {
    const plans = this.props.associatedPaymentPlans.data;
    if (!plans || plans.length === 0) {
      return;
    }

    const cycles = {
      '1d': 'DAY',
      '1w': 'WEEK',
      '1m': 'MONTH',
      '1y': 'YEAR',
    };
    const currency = currencyService.wrap(plans.currency);

    return plans.map(plan => {
      return {
        key: plan.customerPlanId,
        name: plan.name,
        price: `${currency.convertFromCents(plan.value)} ${plan.currency} / ${
          cycles[plan.cycle]
        }`,
        status: plan.status,
        ...plan,
      };
    });
  }

  toggleAddPaymentPlanDialog = () => {
    this.setState(prevState => {
      return {
        isAddPaymentPlanDialogVisible: !prevState.isAddPaymentPlanDialogVisible,
      };
    });
  };

  updateExpandedRows = (expanded, record) => {
    this.setState(prevState => ({
      expandedRows: expanded
        ? [...prevState.expandedRows, record.key]
        : prevState.expandedRows.filter(key => key !== record.key),
    }));
  };

  resetExpandedRows = () => {
    this.setState(() => {
      return {
        expandedRows: [],
      };
    });
  };

  editPaymentPlan = (
    customerPlanId: string,
    status: number,
    cardId: string,
    channelId: string
  ) => {
    this.props.editPaymentPlan(customerPlanId, channelId, status, cardId);
    this.resetExpandedRows();
  };

  deletePaymentPlan = (customerPlanId: string) => {
    this.props.deletePaymentPlan(customerPlanId);
    this.resetExpandedRows();
  };

  getCustomerAssociatedPlans = () => {
    if (auth.canRead('subscriptions')) {
      this.props.getAssociatedPaymentPlans(this.props.customerId);
      this.resetExpandedRows();
    }
  };

  expandedRowRender = (plan: any) => {
    return (
      <CustomerAssociatedPlanDetails
        plan={plan}
        cards={this.props.cards}
        editPaymentPlan={this.editPaymentPlan}
        deletePaymentPlan={this.deletePaymentPlan}
        isReadOnly={this.props.isReadOnly}
      />
    );
  };

  renderAddPlanBtn() {
    return !this.props.isReadOnly ? (
      <CkoButton
        icon="add-plan"
        value="Add new plan"
        onClick={this.toggleAddPaymentPlanDialog}
      />
    ) : null;
  }

  render() {
    return this.props.associatedPaymentPlans ? (
      <TableContainerStyled>
        <CkoTable
          className="customer-plans-table"
          title="Associated Plans"
          dataSource={this.getDataSourceFromPlans()}
          columns={this.columns}
          headerRight={this.renderAddPlanBtn()}
          expandedRowRender={this.expandedRowRender}
          onExpand={this.updateExpandedRows}
          loading={this.props.associatedPaymentPlans.loading}
        />
        {this.state.isAddPaymentPlanDialogVisible ? (
          <AddPaymentPlan
            onCancel={this.toggleAddPaymentPlanDialog}
            onOk={this.toggleAddPaymentPlanDialog}
            customerId={this.props.customerId}
          />
        ) : null}
      </TableContainerStyled>
    ) : null;
  }
}
