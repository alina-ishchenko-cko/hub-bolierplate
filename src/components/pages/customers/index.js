import { connect } from 'react-redux';
import * as appActions from 'store/actions/appActions';
import Customers from './Customers';
import * as actions from 'store/actions/customersActions';

const mapActionsToProps = {
  getAll: actions.getAll,
  resetTable: appActions.resetTable,
  setTableSearch: appActions.setTableSearch,
  setPageTitle: appActions.setPageTitle,
};

const mapStateToProps = ({
  currentUser: { data = {} },
  global,
  customers,
  app,
}) => ({
  selected: global.selected,
  fromDate: global.fromDate,
  toDate: global.toDate,
  list: customers.list,
  currencyName: data.displayCurrencyName,
  refresh: customers.refresh,
  tableOptions: app.tableOptions,
  selectedRows: app.selectedRows,
});

export default connect(mapStateToProps, mapActionsToProps)(Customers);
