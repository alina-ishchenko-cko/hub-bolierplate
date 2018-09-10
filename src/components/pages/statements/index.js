// @flow
import { connect } from 'react-redux';
import * as appActions from 'store/actions/appActions';
import * as statementsActions from 'store/actions/statementsActions';
import Statements from './Statements';

const mapActionsToProps = {
  setPageTitle: appActions.setPageTitle,
  getAll: statementsActions.getAll,
};

const mapStateToProps = ({ global, statements, currentUser, app }) => ({
  selected: global.selected,
  fromDate: global.fromDate,
  toDate: global.toDate,
  list: statements.list,
  currentUser: currentUser.data,
  tableOptions: app.tableOptions,
  assetsLoading: global.data.assetsLoading,
  isSidebarCollapsed: app.isSidebarCollapsed,
});

export default connect(mapStateToProps, mapActionsToProps)(Statements);
