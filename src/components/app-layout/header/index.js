import { connect } from 'react-redux';
import { setDates, refreshData } from 'store/actions/accountsActions';
import Header from './Header';

const mapActionsToProps = {
  setDates,
  refreshData,
};

const mapStateToProps = ({ app, global }) => ({
  title: app.pageTitle,
  fromDate: global.fromDate,
  toDate: global.fromDate,
  accountLoading: global.data.loading,
  assetsLoading: global.data.assetsLoading,
});

export default connect(mapStateToProps, mapActionsToProps)(Header);
