import { connect } from 'react-redux';
import TransactionDetails from './TransactionDetails';
import { pushToRowDetailStack } from 'store/actions/appActions';
import { setTransactionAction } from 'store/actions/transactionsActions';
import { getTransactionDetails } from 'store/actions/transactionDetailsActions';

const mapActionsToProps = {
  pushToRowDetailStack,
  getTransactionDetails,
  setTransactionAction,
};

const mapStateToProps = ({ global, currentUser, transactionDetails, app }) => ({
  //selected: global.selected,
  countries: currentUser.lookups.countries,
  loading: transactionDetails.data.loading,
  indicators: transactionDetails.data.indicators,
  details: transactionDetails.data.details,
  purchases: transactionDetails.data.purchases,
  paymentMethods: transactionDetails.data.paymentMethods,
  logs: transactionDetails.data.logs,
  allowedActions: transactionDetails.data.allowedActions,
  actions: transactionDetails.actions,
  isMerchantAdmin: currentUser.data.isMerchantAdmin,
  isSuperAdmin: currentUser.data.isSuperAdmin,
  isGodUser: currentUser.data.isGodUser,
  isReadOnlyUser: currentUser.data.isReadOnly,
});

export default connect(mapStateToProps, mapActionsToProps)(TransactionDetails);
