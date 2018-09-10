import { connect } from 'react-redux';
import * as actions from 'store/actions/transactionDetailsActions';
import Void from './Void';

const mapActionsToProps = {
  processSingleAction: actions.voidTransaction,
  getTransactionDetails: actions.getTransactionDetails,
  processBatchActions: actions.batchVoid,
};

const mapStateToProps = ({ transactionDetails, app }) => {
  const { indicators, purchases } = transactionDetails.data;
  return {
    actionKey: 'voidId',
    actionType: 'Void',
    activeRow: app.activeRow,
    action: transactionDetails.actions.void,
    originalAmount: indicators.transactionValue,
    currencyId: purchases.currencyId,
    currencySymbol: purchases.currencySymbol,
    loading: transactionDetails.data.loading,
    transactions: transactionDetails.batch,
  };
};

export default connect(mapStateToProps, mapActionsToProps)(Void);
