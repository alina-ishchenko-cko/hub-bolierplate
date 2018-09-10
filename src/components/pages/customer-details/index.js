import { connect } from 'react-redux';
import CustomerDetails from './CustomerDetails';
import {
  updateCustomerDetails,
  getCustomerDetails,
} from 'store/actions/customerDetailsActions';

const mapActionsToProps = {
  getCustomerDetails,
  updateCustomerDetails,
};

const mapStateToProps = state => {
  const { global: { selected }, customerDetails } = state;

  return {
    accounts: {
      accountId: selected.account.id,
      businessId: selected.business.id,
      channelId: selected.channel.id,
    },
    cardActions: customerDetails.cardActions,
    updateDetailsActions: customerDetails.actions.updateDetails,
    addCreditCardActions: customerDetails.actions.addCreditCard,
  };
};
export default connect(mapStateToProps, mapActionsToProps)(CustomerDetails);
