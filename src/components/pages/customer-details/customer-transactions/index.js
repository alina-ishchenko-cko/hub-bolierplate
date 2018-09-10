import { connect } from 'react-redux';
import CustomerTransactions from './CustomerTransactions';
import { pushToRowDetailStack } from 'store/actions/appActions';
import {
  createCharges,
  clearCharges,
  getCustomerTransactions,
} from 'store/actions/customerDetailsActions';

const mapActionsToProps = {
  pushToRowDetailStack,
  createCharges,
  clearCharges,
  getCustomerTransactions,
};

const mapStateToProps = ({ global, customerDetails, currentUser }) => ({
  accounts: {
    accountId: global.selected.account.id,
    businessId: global.selected.business.id,
    channelId: global.selected.channel.id,
  },
  transactions: customerDetails.transactions,
  email: customerDetails.details.email,
  cardActions: customerDetails.cardActions,
  actions: customerDetails.actions,
  countries: currentUser.lookups.countries || [],
  currencyName: currentUser.data.displayCurrencyName,
  isReadOnly: currentUser.data.isReadOnly,
});

export default connect(mapStateToProps, mapActionsToProps)(
  CustomerTransactions
);
