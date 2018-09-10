// @flow
import * as React from 'react';
import CustomerDetailsHeader from './customer-details-header';
import CkoSideContent from 'components/ui/layout/CkoSideContent';
import CustomerSummary from './customer-summary';
import CustomerTransactions from './customer-transactions/';
import CustomerCards from './customer-cards';
import CustomerAssociatedPlans from './customer-associated-plans';
import { auth } from 'services/security/authorisation';

type Props = {
  showBackBtn: boolean,
  className?: string,
  accounts: {
    accountId: string,
    businessId: string,
    channelId: string,
  },
  details: Object,
  cardActions: Object,
  updateDetailsActions: Object,
  addCreditCardActions: Object,
  customerId: string,
  getCustomerDetails: Function,
  updateCustomerDetails: Function,
  onClose: Function,
};

type State = {
  loading: boolean,
};

export default class CustomerDetails extends React.Component<Props, State> {
  state = {
    loading: false,
  };

  componentDidMount() {
    this.getCustomerDetails();
    this.setState({ loading: true });
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    if (this.props.customerId !== prevProps.customerId) {
      this.getCustomerDetails();
      this.setState({ loading: true });
      return;
    } else if (prevState.loading) {
      setTimeout(this.setUiLoading, 300);
    }
    // We check current props loading value and
    // nextProps success value because we need to reload the data
    // only after it was updated. After data was loaded successfully
    // nextProps.[].loading=false and nextProps.[].success=true
    // they remain the same until the data will be updated again
    const isCardUpdated =
      prevProps.cardActions.update.loading &&
      this.props.cardActions.update.success;

    const isCardDeleted =
      prevProps.cardActions.delete.loading &&
      this.props.cardActions.delete.success;

    const isCardSetDefault =
      prevProps.cardActions.default.loading &&
      this.props.cardActions.default.success;

    const isCardAdded =
      prevProps.addCreditCardActions.loading &&
      this.props.addCreditCardActions.success;

    const areCustomerDetailsUpdated =
      prevProps.updateDetailsActions.loading &&
      this.props.updateDetailsActions.success;

    if (
      isCardAdded ||
      isCardUpdated ||
      isCardDeleted ||
      isCardSetDefault ||
      areCustomerDetailsUpdated
    ) {
      // TODO change API so that it will be possible to request cards separately
      this.getCustomerDetails();
    }
  }

  // componentDidUpdate(prevProps: Props) {
  //   if (this.props.customerId !== prevProps.customerId) {
  //     this.getCustomerDetails();
  //   }
  // }
  setUiLoading = () => {
    this.setState(prevState => ({
      loading: false,
    }));
  };

  getCustomerDetails = () => {
    const requestParams = {
      ...this.props.accounts,
      customerId: this.props.customerId,
    };
    this.props.getCustomerDetails(requestParams);
  };

  handleClose = () => {
    this.props.onClose({
      type: 'customer',
      id: this.props.customerId,
    });
  };

  isUserAuthorized(): boolean {
    return auth.canRead('subscriptions');
  }

  render() {
    return (
      <CkoSideContent
        loading={this.state.loading}
        showBackBtn={this.props.showBackBtn}
        onClose={this.handleClose}
        className={this.props.className}
        header={<CustomerDetailsHeader />}>
        <CustomerSummary />
        <CustomerTransactions customerId={this.props.customerId} />
        <CustomerCards customerId={this.props.customerId} />
        {this.isUserAuthorized() && (
          <CustomerAssociatedPlans customerId={this.props.customerId} />
        )}
      </CkoSideContent>
    );
  }
}
