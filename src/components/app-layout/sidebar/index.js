import { connect } from 'react-redux';
import * as accountsActions from 'store/actions/accountsActions';
import * as loginActions from 'store/actions/loginActions';
import Sidebar from './Sidebar';

const mapActionsToProps = {
  getAccountAssets: accountsActions.getAccountAssets,
  setSelection: accountsActions.setSelection,
  getAccounts: accountsActions.getAccounts,
  globalLookUp: loginActions.globalLookUp,
  logout: loginActions.logout,
};

const mapStateToProps = ({ global, currentUser }) => ({
  currentUser: currentUser.data,
  global: global.data,
  selected: global.selected,
});

export default connect(mapStateToProps, mapActionsToProps)(Sidebar);
