import { connect } from 'react-redux';
import { setPageTitle } from 'store/actions/appActions';
import { getIndicators, getSummary } from 'store/actions/dashboardActions';
import Dashboard from './Dashboard';

const mapActionsToProps = {
  getIndicators,
  getSummary,
  setPageTitle,
};

const mapStateToProps = ({ global, currentUser, dashboard }) => ({
  global: {
    selected: global.selected,
    fromDate: global.fromDate,
    toDate: global.toDate,
  },
  assetsLoading: global.data.assetsLoading,
  currentUser: currentUser.data,
  indicators: dashboard.indicators,
  summary: dashboard.summary,
  refresh: dashboard.refresh,
});

export default connect(mapStateToProps, mapActionsToProps)(Dashboard);
