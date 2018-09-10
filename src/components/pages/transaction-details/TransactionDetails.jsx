// @flow
import * as React from 'react';
import isEqual from 'lodash/isEqual';
import find from 'lodash/find';
import CustomerSection from './customer-section/';
import TransactionSection from './transaction-section/';
import HeaderSection from './header-section/';
import PaymentSection from './payment-section/';
import PurchaseSection from './purchase-section/';
import CkoSideContent from 'components/ui/layout/CkoSideContent';
import * as typed from 'store/reducers/flow-type';
import { getStatus } from 'utils/transactions';

type Props = {
  loading: boolean,
  chargeId: string,
  className?: string,
  showBackBtn: boolean,
  customerEmail: string,
  isMerchantAdmin: boolean,
  isSuperAdmin: boolean,
  isGodUser: boolean,
  isReadOnlyUser: boolean,
  details: typed.tDataDetails,
  indicators: typed.tIndicator,
  logs: Array<Object>,
  countries: Array<Object>,
  paymentMethods: typed.tPaymentMethods,
  purchases: typed.tPurchases,
  allowedActions: number,
  actions: typed.Actions,
  onClose: Function,
  setTransactionAction: Function,
  getTransactionDetails: Function,
  pushToRowDetailStack: Function,
};

export default class TransactionDetails extends React.Component<Props> {
  componentDidMount() {
    this.getDetails(this.props.chargeId);
  }

  componentWillReceiveProps(nextProps: Props) {
    const { chargeId } = nextProps;
    if (!isEqual(this.props.chargeId, chargeId)) {
      this.getDetails(chargeId);
    }
  }

  hasPaymentDetails(): boolean {
    const { purchases } = this.props;
    return !!(
      purchases.product.length > 0 && !purchases.shippingAddress.addressLine1
    );
  }

  getDetails = (chargeId: string) => {
    this.props.getTransactionDetails(chargeId);
  };

  getExpDate() {
    const { paymentMethods } = this.props;
    let month = `${paymentMethods.expiryMonth}`;
    month = month.length === 1 ? `0${month}` : month;
    return `${month} / ${paymentMethods.expiryYear}`;
  }

  getCountryIso() {
    const country = find(
      this.props.countries,
      data => data.name === this.props.paymentMethods.bankCountry
    );
    return country ? country.countryIso2Code : '';
  }

  handleActionClick = (actionType: string) => {
    this.props.setTransactionAction({
      type: actionType,
      value: this.props.chargeId,
    });
  };

  renderHeader = () => {
    const { indicators, details } = this.props;
    return (
      <HeaderSection
        chargeId={details.chargeId}
        value={indicators.transactionValue}
        currencyName={indicators.currencySymbol}
        transactionDate={indicators.transactionDate}
        transactionStatus={indicators.transactionStatus}
        responseCode={details.shortResponseCode}
        logs={this.props.logs}
        allowedActions={this.props.allowedActions}
        isReadOnlyUser={this.props.isReadOnlyUser}
        onClick={this.handleActionClick}
        setActiveData={this.props.pushToRowDetailStack}
      />
    );
  };

  handleClose = () => {
    this.props.onClose({
      type: 'transaction',
      id: this.props.chargeId,
    });
  };

  render() {
    const { paymentMethods, details, purchases, indicators } = this.props;
    const { isAPM, isChargeBack } = getStatus(indicators.transactionStatus);
    const className = `transaction-details ${this.props.className || ''}`;
    return (
      <CkoSideContent
        header={this.renderHeader()}
        loading={this.props.loading}
        className={className}
        showBackBtn={this.props.showBackBtn}
        onClose={this.handleClose}>
        <CustomerSection
          email={this.props.customerEmail}
          name={paymentMethods.customerName}
          customerId={paymentMethods.customerId}
          pushToRowDetailStack={this.props.pushToRowDetailStack}
        />
        <TransactionSection
          isChargeBack={isChargeBack}
          chargeId={details.chargeId}
          trackID={details.trackId}
          authCode={details.authorizationCode}
          indicator={details.transactionIndicator}
          billingDesc={details.billingDescriptor}
          customerIp={purchases.customerIp}
          customerLocation={purchases.customerIpCountryIso3}
          acquirer={details.arn}
        />
        {!isAPM && (
          <PaymentSection
            cardHolderName={paymentMethods.cardHolder}
            scheme={paymentMethods.paymentMethod}
            issuingCountry={paymentMethods.bankCountry}
            issuingCountryIso={this.getCountryIso()}
            issuingBank={paymentMethods.issuingBank}
            cardNumber={paymentMethods.ccNumber}
            cvvCheck={paymentMethods.cvvCheck}
            expiryDate={this.getExpDate()}
            avsCheck={paymentMethods.avsCheck}
          />
        )}
        {this.hasPaymentDetails() && (
          <PurchaseSection
            addressLineOne={purchases.shippingAddress.addressLine1}
            addressLineTwo={purchases.shippingAddress.addressLine2}
            city={purchases.shippingAddress.city}
            country={purchases.shippingAddress.country}
            postCode={purchases.shippingAddress.postCode}
            description={purchases.description}
            products={purchases.product}
            currencyName={indicators.currencySymbol}
          />
        )}
      </CkoSideContent>
    );
  }
}
