// @flow
import * as React from 'react';
import CkoModal from 'components/ui/modal/';
import Form from 'antd/lib/form';
import CkoInput from 'components/ui/form/CkoInput';
import ChannelSelector from 'components/ui/form/channel-selector';
import CkoAmount from 'components/ui/form/CkoAmount';
import CkoCardDetails from 'components/ui/form/CkoCardDetails';
import CkoCardSelector from 'components/ui/form/cko-card-selector';
import { getCurrencyByName } from 'services/currency/currencyService';
import { MoreStyled, ContainerStyled } from '../CreatePayment.sc';
import BillingAddress from '../billing-address/';
import Miscellaneous from '../miscellaneous/';
import ShippingAddress from '../shipping-address/';

type Props = {
  form: Object,
  isVisible: boolean,
  processing: boolean,
  businesses: Array<Object>,
  paymentData: {
    channels: Array<Object>,
    defaultCurrency: string,
    countries: Array<Object>,
    currencyIds: Array<number>,
    currenciesLoading: boolean,
  },
  channelId: number,
  accountId: number,
  businessId: number,
  onSubmit: Function,
  handleCancel: Function,
  onChannelChange: Function,
  onPaymentPlanChange: Function,
  paymentPlanOptions: Function,
  isEmailInputVisible: boolean,
  cards?: Array<Object>,
  shouldSelectExistingCard?: boolean,
};

type State = {
  showOtherFields: boolean,
  isShippingAddressActive: boolean,
  showPaymentPlan: boolean,
  selectedCard: Object | null,
  shouldUseExistingAddress: boolean,
};

type ChargeData = {
  [x: string]: any,
  channelId: any,
  autoCapTime: number,
  email: string,
  currency: string,
  amount: number,
  type: string,
  autoCapture: string,
  udf1: any,
  trackId: any,
  paymentPlans: any[],
  card?: Object,
  cardId?: string,
};

export class PaymentForm extends React.Component<Props, State> {
  static getDerivedStateFromProps(nextProps: Props, prevState: State) {
    if (nextProps.cards && nextProps.cards.length !== 0) {
      return {
        selectedCard: prevState.selectedCard || nextProps.cards[0],
        shouldUseExistingAddress: true,
      };
    }
    return null;
  }

  state = {
    showOtherFields: false,
    isShippingAddressActive: false,
    showPaymentPlan: false,
    selectedCard: null,
    shouldUseExistingAddress: false,
  };
  countUserFields: number = 1;

  resetState = () => {
    this.setState(() => ({
      showOtherFields: false,
      isShippingAddressActive: false,
      showPaymentPlan: false,
      selectedCard: null,
      shouldUseExistingAddress: false,
    }));
    this.countUserFields = 1;
  };

  handleSubmit = (e: SyntheticEvent<any>) => {
    e.preventDefault();

    this.props.form.validateFields((err, fieldValues) => {
      if (!err) {
        const coefficient = getCurrencyByName(fieldValues.currency).coefficient;
        const amount = parseFloat(fieldValues.amount.replace(/,/g, ''));
        const amountInCurrency = Math.round(
          amount * Math.pow(10, coefficient) || 100
        );
        const countryCode = fieldValues.phoneCountryCode || '';

        // Default form data

        const data: ChargeData = {
          channelId: this.props.channelId || fieldValues.channelId,
          autoCapTime: 0,
          email: fieldValues.email,
          currency: fieldValues.currency.toLowerCase(),
          amount: amountInCurrency,
          type: 'card',
          autoCapture: 'y',
          udf1: fieldValues.userField1 || '',
          trackId: fieldValues.trackingId || '',
          paymentPlans: [],
          description: fieldValues.description || '',
        };

        if (this.props.shouldSelectExistingCard) {
          data.cardId = fieldValues.cardId;
        } else {
          const cardExp = fieldValues.cardExpDate.split('/');
          const cardNumber = fieldValues.cardDetails.replace(/\s/g, '');
          data.card = {
            number: cardNumber,
            name: fieldValues.cardName,
            cvv2: fieldValues.cardCvv,
            expiryMonth: cardExp[0],
            expiryYear: cardExp[1],
          };
        }
        const address =
          this.state.shouldUseExistingAddress && this.state.selectedCard
            ? this.state.selectedCard.billingDetails
            : {
                addressLine1: fieldValues.addressLine1,
                addressLine2: fieldValues.addressLine1,
                city: fieldValues.city,
                state: fieldValues.state,
                postcode: fieldValues.postcode,
                country: fieldValues.country,
              };

        data.billingDetails = {
          ...address,
          phone: {
            number: fieldValues.phoneNumber || '',
            countryCode,
          },
        };

        if (this.state.isShippingAddressActive) {
          data.shippingDetails = {
            addressLine1: fieldValues.newAddressLine1 || '',
            addressLine2: fieldValues.newAddressLine2 || '',
            city: fieldValues.newAddressCity || '',
            state: fieldValues.newAddressState || '',
            postcode: fieldValues.newAddressPostcode || '',
            country: fieldValues.newAddressCountry || '',
          };
        } else {
          data.shippingDetails = {
            ...address,
          };
        }

        // avoid sending empty strings instead of address
        data.billingDetails = this.isAddressFilled(data.billingDetails)
          ? data.billingDetails
          : {};
        data.shippingDetails = this.isAddressFilled(data.shippingDetails)
          ? data.shippingDetails
          : {};

        // User Fields
        if (fieldValues.userFields.length > 0) {
          fieldValues.userFields.forEach((x, index) => {
            let objKey = `udf${index + 2}`;
            if (fieldValues[x]) {
              data[objKey] = fieldValues[x];
            }
          });
        }

        // Payment plans
        if (fieldValues.paymentPlan) {
          data.paymentPlans = [
            { planId: fieldValues.paymentPlan, startDate: '' },
          ];

          if (fieldValues.paymentPlanStartDate) {
            data.paymentPlans[0].startDate = fieldValues.paymentPlanStartDate.format(
              'YYYY-MM-DD'
            );
          } else {
            delete data.paymentPlans[0].startDate;
          }
        } else {
          delete data.paymentPlans;
        }

        // Submit the data
        this.props.onSubmit(data);
        this.resetState();
      }
    });
  };

  isAddressFilled = (address: Object) => {
    return (
      address &&
      (address.addressLine1 ||
        address.addressLine2 ||
        address.city ||
        address.postcode ||
        address.state ||
        address.country)
    );
  };

  toggleMoreOptions = () => {
    this.setState(prevState => ({
      showOtherFields: !prevState.showOtherFields,
    }));
  };

  toggleShippingAddress = (isShippingAddressActive: boolean) => {
    this.setState({ isShippingAddressActive });
  };

  renderOptionBtn = () => {
    let icon = 'down';
    let label = 'More options';
    if (this.state.showOtherFields) {
      icon = 'up';
      label = 'Less options';
    }

    return (
      <MoreStyled onClick={this.toggleMoreOptions}>
        <span className={`flaticon-${icon}-chevron`} /> {label}
      </MoreStyled>
    );
  };

  onCardSelectionChange = (cardId: string) => {
    if (!this.props.cards) {
      return;
    }
    const selectedCard = this.props.cards.find(
      card => card.id.toLowerCase() === cardId.toLowerCase()
    );
    this.setState(() => ({
      selectedCard: selectedCard,
    }));
  };

  resetBillingAddress = () => {
    this.setState(() => ({
      shouldUseExistingAddress: false,
    }));
  };

  onCancel = () => {
    this.resetState();
    this.props.handleCancel();
  };

  render() {
    const isBillingAddressFilled = this.state.selectedCard
      ? this.isAddressFilled(this.state.selectedCard.billingDetails)
      : false;

    const { form, paymentData } = this.props;
    form.getFieldDecorator('userFields', { initialValue: [] });
    return (
      <CkoModal
        okText="Create payment"
        titleIcon="modal-payment"
        title="Create Payment"
        visible={this.props.isVisible}
        onOk={this.handleSubmit}
        onCancel={this.onCancel}
        afterClose={this.resetState}
        className="create-payment"
        loading={this.props.processing}>
        <ContainerStyled>
          {this.props.isVisible && (
            <Form onSubmit={this.handleSubmit} autoComplete="off">
              {!this.props.channelId && (
                <ChannelSelector
                  form={form}
                  businesses={this.props.businesses}
                  accountId={this.props.accountId}
                  channelId={this.props.channelId}
                  businessId={this.props.businessId}
                />
              )}
              {this.props.isEmailInputVisible ? (
                <CkoInput
                  required
                  id="email"
                  type="email"
                  size="large"
                  form={form}
                  label="Customer Email"
                  placeholder="Enter customer email"
                  message="Please enter your email"
                />
              ) : null}
              <CkoAmount
                required
                id="amount"
                form={form}
                label="Amount"
                size="large"
                currencyIds={paymentData.currencyIds}
                loading={paymentData.currenciesLoading}
                currencyName={paymentData.defaultCurrency}
                message="Please enter valid amount"
              />
              {!this.props.shouldSelectExistingCard && (
                <CkoInput
                  required
                  id="cardName"
                  form={form}
                  size="large"
                  label="Cardholder name"
                  placeholder="Enter cardholder name"
                  message="Please enter cardholder name"
                />
              )}
              {this.props.shouldSelectExistingCard && this.props.cards ? (
                <CkoCardSelector
                  form={form}
                  cards={this.props.cards}
                  onChange={this.onCardSelectionChange}
                  initialValue={
                    this.state.selectedCard
                      ? this.state.selectedCard.id
                      : void 0
                  }
                />
              ) : (
                <CkoCardDetails
                  required
                  id="cardDetails"
                  form={form}
                  label="Card details"
                />
              )}

              {this.renderOptionBtn()}
              {this.state.showOtherFields && (
                <div className="form-group-wrap">
                  <Miscellaneous
                    form={this.props.form}
                    countries={this.props.paymentData.countries}
                  />
                  <BillingAddress
                    form={this.props.form}
                    countries={this.props.paymentData.countries}
                    onToggleBtn={this.toggleShippingAddress}
                    billingAddress={
                      isBillingAddressFilled && this.state.selectedCard
                        ? this.state.selectedCard.billingDetails
                        : void 0
                    }
                    onChangeAddressClick={this.resetBillingAddress}
                  />
                  {this.state.isShippingAddressActive && (
                    <ShippingAddress
                      form={this.props.form}
                      countries={this.props.paymentData.countries}
                    />
                  )}
                </div>
              )}
            </Form>
          )}
        </ContainerStyled>
      </CkoModal>
    );
  }
}
const WrappedRegistrationForm = Form.create()(PaymentForm);
export default WrappedRegistrationForm;
