import { connect } from 'react-redux';
import * as actions from 'store/actions/transactionDetailsActions';
import Capture from './Capture';

const mapActionsToProps = {
  processSingleAction: actions.captureTransaction,
  getTransactionDetails: actions.getTransactionDetails,
  processBatchActions: actions.batchCapture,
};

const mapStateToProps = ({ transactionDetails, app }) => {
  const { indicators, purchases } = transactionDetails.data;
  return {
    actionKey: 'captureId',
    actionType: 'Capture',
    activeRow: app.activeRow,
    loading: transactionDetails.data.loading,
    originalAmount: indicators.transactionValue,
    currencyId: purchases.currencyId,
    currencySymbol: purchases.currencySymbol,
    action: transactionDetails.actions.capture,
    transactions: transactionDetails.batch,
  };
};

export default connect(mapStateToProps, mapActionsToProps)(Capture);
