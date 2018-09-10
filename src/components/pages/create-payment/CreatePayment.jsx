// @flow
import * as React from 'react';
import isEqual from 'lodash/isEqual';
import feedback from 'components/ui/feedback/';
import { getBusinessById } from 'services/business/businessService';
import PaymentForm from './payment-form/';
import * as typed from 'store/reducers/flow-type';

type Props = {
  isVisible: boolean,
  lookups: typed.LoginLookUps,
  selected: typed.Selected,
  currencyName: string,
  businesses: Array<Object>,
  channelCurrencies: typed.AccountChannel,
  paymentCharge: typed.TransactionPayment,
  paymentPlan: Object,
  onOk: Function,
  onCancel: Function,
  createCharges: Function,
  clearCharges: Function,
  getPaymentPlanOptions: Function,
  email: string,
  cards?: Array<Object>,
  shouldSelectExistingCard?: boolean,
};

export default class CreatePayment extends React.Component<Props> {
  static defaultProps = {
    currentUser: {
      userData: {},
      lookups: {},
    },
  };

  componentWillReceiveProps(nextProps: Props) {
    if (!isEqual(nextProps.paymentCharge, this.props.paymentCharge)) {
      this.showFeedBack(nextProps.paymentCharge);
      return;
    }
  }

  getBusinessChannels(): Array<Object> {
    const { selected } = this.props;
    const business = getBusinessById(selected.account.id, selected.business.id);
    return business.channels || [];
  }

  showFeedBack = (paymentCharge: Object) => {
    const { status } = paymentCharge;
    if (status) {
      if (status !== 'Authorised') {
        feedback.error(paymentCharge.responseMessage);
      } else if (status === 'Authorised') {
        feedback.success('Payment successful');
        this.hideModal(true);
      }
    } else if (paymentCharge.error === true) {
      feedback.error(
        paymentCharge.errorMsg.message || 'Error creating payment'
      );
    }
  };

  getPaymentData = () => {
    return {
      channels: this.getBusinessChannels(),
      defaultCurrency: this.props.currencyName,
      countries: this.props.lookups.countries,
      currencyIds: this.props.channelCurrencies.currencies,
      currenciesLoading: this.props.channelCurrencies.loading,
    };
  };

  hideModal = (isOK?: boolean) => {
    this.props.clearCharges();
    this.props.onCancel();
    if (isOK === true) {
      this.props.onOk();
    }
  };

  onCreatePayment = (values: any) => {
    const createChargesParams = values;
    if (this.props.email) {
      createChargesParams.email = this.props.email;
    }
    this.props.createCharges(createChargesParams);
  };

  render() {
    return (
      <PaymentForm
        isVisible={this.props.isVisible}
        processing={this.props.paymentCharge.loading}
        paymentData={this.getPaymentData()}
        accountId={this.props.selected.account.id}
        channelId={this.props.selected.channel.id}
        businessId={this.props.selected.business.id}
        onSubmit={this.onCreatePayment}
        handleCancel={this.hideModal}
        paymentPlanOptions={this.props.paymentPlan.options}
        isEmailInputVisible={!this.props.email}
        businesses={this.props.businesses}
        cards={this.props.cards}
        shouldSelectExistingCard={this.props.shouldSelectExistingCard}
      />
    );
  }
}
