import { connect } from 'react-redux';
import { addPaymentPlan } from 'store/actions/customerDetailsActions';
import { getPaymentPlanOptions } from 'store/actions/paymentPlanActions';
import AddPaymentPlan from './AddPaymentPlan';

const mapActionsToProps = { addPaymentPlan, getPaymentPlanOptions };

const mapStateToProps = state => {
  const {
    customerDetails: { details },
    global,
    global: { selected },
    paymentPlan,
  } = state;
  return {
    cards: details.cards ? details.cards.data : void 0,
    defaultCard: details.defaultCard,
    paymentPlans: paymentPlan.options.data,
    accounts: {
      accountId: selected.account.id,
      businessId: selected.business.id,
      channelId: selected.channel.id,
    },
    businesses: global.data.businesses,
  };
};

export default connect(mapStateToProps, mapActionsToProps)(AddPaymentPlan);
