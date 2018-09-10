import { connect } from 'react-redux';
import * as actions from 'store/actions/transactionDetailsActions';
import Refund from './Refund';

const mapActionsToProps = {
  processSingleAction: actions.refundTransaction,
  getTransactionDetails: actions.getTransactionDetails,
  processBatchActions: actions.batchRefund,
};

const mapStateToProps = ({ transactionDetails, app }) => {
  const { purchases, indicators } = transactionDetails.data;
  return {
    actionKey: 'refundId',
    actionType: 'Refund',
    activeRow: app.activeRow,
    maxRefundAmount: purchases.maxRefundAmount,
    currencyId: purchases.currencyId,
    currencySymbol: purchases.currencySymbol,
    captureId: purchases.captureTransactionId,
    originalAmount: indicators.transactionValue,
    action: transactionDetails.actions.refund,
    loading: transactionDetails.data.loading,
    transactions: transactionDetails.batch,
  };
};

export default connect(mapStateToProps, mapActionsToProps)(Refund);
