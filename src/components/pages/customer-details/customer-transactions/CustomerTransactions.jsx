// @ flow
import * as React from 'react';
import {
  TableContainerStyled,
  ShowMoreContainerStyled,
} from '../styled/CustomerDetailesTables.sc';
import isEqual from 'lodash/isEqual';
import CkoButton from 'components/ui/button';
import CkoTable from 'components/ui/table';
import CkoIcon from 'components/ui/icon';
import CkoTag from 'components/ui/tag';
import CkoTooltip from 'components/ui/tooltip';
import { RESPONSE_CODES } from 'config';
import moment from 'moment';
import { trimStatus } from 'utils/transactions';
import { getPaymentMethodById } from 'services/currency/currencyService';
import { getTransactionStatusClass, formatNumber } from 'utils/ui.util';
import CreatePayment from 'components/pages/create-payment/';
import { GoToContainerStyled } from './CustomerTransactions.sc';
import CkoLoading from 'components/ui/loading/';

type Props = {
  customerId: string,
  transactions: Object,
  actions: Object,
  email: string,
  createCharges: Function,
  clearCharges: Function,
  isReadOnly: boolean,
  accounts: {
    accountId: string,
    businessId: string,
    channelId: string,
  },
  getCustomerTransactions: Function,
  pushToRowDetailStack: Function,
};

type State = {
  loading: boolean,
  isCreatePaymentDialogVisible: boolean,
  areAllTransactionsLoaded: boolean,
};

export default class CustomerTransactions extends React.Component<
  Props,
  State
> {
  state = {
    isCreatePaymentDialogVisible: false,
    areAllTransactionsLoaded: false,
  };
  step: number = 5;
  columns: Array<Object> = [
    {
      title: 'Transaction details',
      dataIndex: 'totalSales',
      key: 'totalSales',
      render: (cell: number, transaction: Object) => {
        const value = transaction.totalSales;
        return (
          <div className="details-wrap">
            <div className="value-wrap">
              <span className="cko-currency-format value">
                {formatNumber(value, transaction.currencySymbol)}
              </span>
              <span className="currency">{transaction.currencySymbol}</span>
            </div>
          </div>
        );
      },
    },
    {
      title: '',
      dataIndex: 'scheme',
      key: 'scheme',
      width: '60px',
      render: (scheme: number) => {
        const paymentPlan = getPaymentMethodById(scheme).name;
        return (
          <div className="card-number">
            <CkoIcon
              type="scheme"
              name={`${paymentPlan.toLowerCase()}-small`}
            />
          </div>
        );
      },
    },
    {
      title: 'Request',
      dataIndex: 'status',
      key: 'status',
      width: '30%',
      render: (status: string, rowData: Object) => {
        const tagStatus = getTransactionStatusClass(status);
        const { responseCode } = rowData;

        return (
          <div className="tag-wrap">
            <CkoTag plain value={trimStatus(status)} />
            {this.isNotSuccessStatus(status) && (
              <CkoTag
                red={tagStatus === 'red'}
                green={tagStatus === 'green'}
                yellow={tagStatus === 'yellow'}
                value={status.split(':')[1].trim()}
                className="td-tag"
              />
            )}
            {this.isNotSuccessStatus(status) &&
              responseCode && (
                <CkoTooltip
                  danger={tagStatus === 'red'}
                  warning={tagStatus === 'yellow'}
                  placement="top"
                  title={RESPONSE_CODES[responseCode]}>
                  <CkoTag className="td-tag" value={responseCode} />
                </CkoTooltip>
              )}
          </div>
        );
      },
    },
    {
      title: 'Timestamp',
      dataIndex: 'timeStamp',
      key: 'timeStamp',
      width: '30%',
      render: (timestamp: string) => {
        return (
          <div className="td-data">
            {moment(timestamp).format('DD/MM/YYYY HH:mm:ss')}
          </div>
        );
      },
    },
    {
      title: '',
      render: () => {
        return (
          <GoToContainerStyled>
            <i />
          </GoToContainerStyled>
        );
      },
    },
  ];

  componentDidMount() {
    this.getCustomerTransactions(true);
  }

  isNotSuccessStatus = (tagStatus: string) => {
    const statusResult = tagStatus
      .split(':')[1]
      .trim()
      .toLowerCase();
    return !!(statusResult !== 'success');
  };

  componentDidUpdate(prevProps: Props) {
    const isNewCustomerData = this.props.customerId !== prevProps.customerId;
    const newPaymentCreated =
      prevProps.actions.createPayment.loading &&
      this.props.actions.createPayment.success;

    // Make request for new customer OR
    // when new payment created
    if (isNewCustomerData || newPaymentCreated) {
      if (isNewCustomerData) {
        this.setState(prevState => ({ areAllTransactionsLoaded: false }));
      }
      this.getCustomerTransactions(true);
      return;
    }

    // Show loader Icon
    if (
      prevProps.transactions.data.length &&
      !isEqual(prevProps.transactions, this.props.transactions)
    ) {
      this.setState({ loading: true });
    } else if (this.state.loading) {
      // Add a bit of delay to make the loader icon more obvious
      setTimeout(() => {
        this.setState({ loading: false });
      }, 300);
    }

    if (prevProps.transactions.loading && this.props.transactions.success) {
      // if no transactions were added after
      // then it means that all transactions are loaded already
      if (
        prevProps.transactions.data &&
        prevProps.transactions.data.length ===
          this.props.transactions.data.length
      ) {
        this.setState(prevState => ({ areAllTransactionsLoaded: true }));
      }
    }
  }

  getCustomerTransactions = (resetTransactionsBeforeLoading: boolean) => {
    const requestParams = {
      ...this.props.accounts,
      customerId: this.props.customerId,
      limit: this.step,
      startIndex: resetTransactionsBeforeLoading
        ? 0
        : this.props.transactions.data.length,
    };

    this.props.getCustomerTransactions(
      requestParams,
      resetTransactionsBeforeLoading
    );
  };

  getDataSourceFromTransactions() {
    const transactions = this.props.transactions.data;
    if (transactions.length === 0) {
      return transactions;
    }

    return transactions.map(transaction => {
      return {
        key: transaction.id,
        ...transaction,
      };
    });
  }

  renderCreatePaymentBtn() {
    if (this.props.isReadOnly) {
      return null;
    }

    return (
      <CkoButton
        icon="create-payment"
        value="Create Payment"
        onClick={this.toggleCreatePaymentDialog}
      />
    );
  }

  toggleCreatePaymentDialog = () => {
    this.setState(prevState => {
      return {
        isCreatePaymentDialogVisible: !prevState.isCreatePaymentDialogVisible,
      };
    });
  };

  onTansactionTableRowClick = transaction => {
    return {
      onClick: () => {
        this.props.pushToRowDetailStack({
          type: 'transaction',
          id: transaction.id,
        });
      },
    };
  };

  onShowMoreTransactionsClick = () => {
    this.getCustomerTransactions();
  };

  render() {
    const { data } = this.props.transactions;
    const canLoadMoreTransactions = !(
      this.state.areAllTransactionsLoaded ||
      (data && data.length < this.step)
    );
    return this.props.transactions ? (
      <TableContainerStyled className="customer-transactions">
        {this.state.loading && <CkoLoading full opacity="1" />}
        <CkoTable
          className="customer-transactions-table"
          title="Transactions"
          headerRight={this.renderCreatePaymentBtn()}
          dataSource={this.getDataSourceFromTransactions()}
          columns={this.columns}
          onRow={this.onTansactionTableRowClick}
          loading={this.props.transactions.loading}
        />
        {canLoadMoreTransactions && (
          <ShowMoreContainerStyled onClick={this.onShowMoreTransactionsClick}>
            <span className="show-more-link">Show more transactions</span>
            <CkoIcon name="down-arrow" />
          </ShowMoreContainerStyled>
        )}
        <CreatePayment
          isVisible={this.state.isCreatePaymentDialogVisible}
          onCancel={this.toggleCreatePaymentDialog}
          onOk={this.toggleCreatePaymentDialog}
          email={this.props.email}
          createCharges={this.props.createCharges}
          clearCharges={this.props.clearCharges}
          shouldSelectExistingCard={true}
        />
      </TableContainerStyled>
    ) : null;
  }
}
