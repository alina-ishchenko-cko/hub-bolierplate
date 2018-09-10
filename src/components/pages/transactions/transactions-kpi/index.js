import { connect } from 'react-redux';
import TransactionsKPI from './TransactionsKPI';
import { setPageTitle } from 'store/actions/appActions';
import { getIndicators } from 'store/actions/transactionsActions';

const mapActionsToProps = {
  setPageTitle,
  getIndicators,
};

const mapStateToProps = ({ global, transactions, currentUser }) => ({
  selected: global.selected,
  fromDate: global.fromDate,
  toDate: global.toDate,
  indicators: transactions.indicators,
  refresh: transactions.refresh,
  currentUser: currentUser.data,
  assetsLoading: global.data.assetsLoading,
});

export default connect(mapStateToProps, mapActionsToProps)(TransactionsKPI);
