import { connect } from 'react-redux';
import {
  getTransactionBlacklist,
  blacklistTransaction,
} from 'store/actions/transactionDetailsActions';
import Blacklist from './Blacklist';

const mapActionsToProps = {
  getTransactionBlacklist,
  blacklistTransaction,
};

const mapStateToProps = ({ transactionDetails, global, currentUser }) => ({
  ...transactionDetails.blacklistData,
  action: transactionDetails.actions.blacklist,
  selected: global.selected,
  isReadOnly: currentUser.data.isReadOnly,
});

export default connect(mapStateToProps, mapActionsToProps)(Blacklist);
