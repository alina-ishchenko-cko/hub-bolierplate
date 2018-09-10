import { connect } from 'react-redux';
import * as appActions from 'store/actions/appActions';
import { withRouter } from 'react-router';
import CkoAdvancedTable from 'components/ui/table/advanced/';

const mapActionsToProps = {
  setActiveRow: appActions.setActiveRow,
  pushToRowDetailStack: appActions.pushToRowDetailStack,
  sliceRowDetailStack: appActions.sliceRowDetailStack,
  clearRowDetailStack: appActions.clearRowDetailStack,
  setTableRow: appActions.setTableRow,
  onSearch: appActions.setTableSearch,
  setTableFilter: appActions.setTableFilter,
  onSort: appActions.setTableSort,
  clearTableFilter: appActions.clearTableFilter,
  onPagination: appActions.setTablePagination,
  resetTable: appActions.resetTable,
  setPageTitle: appActions.setPageTitle,
  resetTableSelections: appActions.resetTableSelections,
};

const mapStateToProps = ({
  global,
  transactions,
  transactionDetails,
  currentUser,
  app,
  loadingBar,
}) => ({
  isSidebarCollapsed: app.isSidebarCollapsed,
  isReadOnly: currentUser.data.isReadOnly,
  activeRow: app.activeRow,
  selected: global.selected,
  fromDate: global.fromDate,
  toDate: global.toDate,
  tableOptions: app.tableOptions,
  selectedRows: app.selectedRows,
});

const wrapWithRedux = connect(
  (mapStateToProps: Function),
  (mapActionsToProps: Object)
)(CkoAdvancedTable);

export default withRouter(wrapWithRedux);
