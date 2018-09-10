import { connect } from 'react-redux';
import { getPaymentPlanOptions } from 'store/actions/paymentPlanActions';
import CreatePayment from './CreatePayment';

const mapActionsToProps = {
  getPaymentPlanOptions,
};

const mapStateToProps = ({
  currentUser,
  global,
  transactions,
  paymentPlan,
  customerDetails: { details },
}) => {
  return {
    paymentPlan,
    lookups: currentUser.lookups,
    currencyName: currentUser.data.displayCurrencyName,
    selected: global.selected,
    businesses: global.data.businesses,
    channelCurrencies: global.channelCurrencies,
    paymentCharge: transactions.paymentCharge,
    cards: details.cards ? details.cards.data : [],
  };
};

export default connect(mapStateToProps, mapActionsToProps)(CreatePayment);
