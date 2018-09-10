import { connect } from 'react-redux';
import { collapseSidebar } from 'store/actions/appActions';
import AppLayout from './AppLayout';

const mapActionsToProps = {
  collapseSidebar,
};

export default connect(null, mapActionsToProps)(AppLayout);
