import { connect } from 'react-redux';
import { refreshData } from 'store/actions/accountsActions';
import TransactionTable from './TransactionTable';
import * as appActions from 'store/actions/appActions';
import * as transactionActions from 'store/actions/transactionsActions';
import * as transactionDetailsActions from 'store/actions/transactionDetailsActions';

const mapActionsToProps = {
  refreshData,
  createCharges: transactionActions.createCharges,
  clearCharges: transactionActions.clearCharges,
  setTableRow: appActions.setTableRow,
  setActiveRow: appActions.setActiveRow,
  pushToRowDetailStack: appActions.pushToRowDetailStack,
  setTableSearch: appActions.setTableSearch,
  setPageTitle: appActions.setPageTitle,
  getAll: transactionActions.getAll,
  clearBatch: transactionDetailsActions.clearBatch,
  setTransactionAction: transactionActions.setTransactionAction,
};

const mapStateToProps = ({
  global,
  transactions,
  transactionDetails,
  currentUser,
  app,
}) => ({
  selected: global.selected,
  fromDate: global.fromDate,
  toDate: global.toDate,
  list: transactions.list,
  refresh: transactions.refresh,
  currentUser: currentUser.data,
  lookups: currentUser.lookups,
  selectedRows: app.selectedRows,
  assetsLoading: global.data.assetsLoading,
});

export default connect(mapStateToProps, mapActionsToProps)(TransactionTable);
