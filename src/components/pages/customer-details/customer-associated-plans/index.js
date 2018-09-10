import { connect } from 'react-redux';
import CustomerAssociatedPlans from './CustomerAssociatedPlans';
import {
  editPaymentPlan,
  deletePaymentPlan,
  getAssociatedPaymentPlans,
} from 'store/actions/customerDetailsActions';

const mapActionsToProps = {
  editPaymentPlan,
  deletePaymentPlan,
  getAssociatedPaymentPlans,
};

const mapStateToProps = state => {
  const { customerDetails, currentUser } = state;
  const { data } = currentUser;

  return {
    associatedPaymentPlans: customerDetails.associatedPaymentPlans,
    cards: customerDetails.details.cards,
    actions: customerDetails.actions,
    isReadOnly: data.isReadOnly,
  };
};
export default connect(mapStateToProps, mapActionsToProps)(
  CustomerAssociatedPlans
);
