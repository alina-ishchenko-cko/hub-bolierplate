import { connect } from 'react-redux';
import * as appActions from 'store/actions/appActions';
import { refreshData } from 'store/actions/accountsActions';
import { clearBatch } from 'store/actions/transactionDetailsActions';
import { setTransactionAction } from 'store/actions/transactionsActions';
import ContentDetails from './ContentDetails';

const mapActionsToProps = {
  setTransactionAction,
  clearBatch,
  setActiveRow: appActions.setActiveRow,
  sliceRowDetailStack: appActions.sliceRowDetailStack,
  refreshData,
};

const mapStateToProps = ({ app, transactions, currentUser }) => ({
  activeAction: transactions.activeAction,
  rowDetailStack: app.rowDetailStack,
  activeRow: app.activeRow,
  selectedRows: app.selectedRows,
  isReadOnly: currentUser.data.isReadOnly,
});

export default connect(mapStateToProps, mapActionsToProps)(ContentDetails);
