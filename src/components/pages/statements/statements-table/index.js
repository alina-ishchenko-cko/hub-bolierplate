// @flow
import { connect } from 'react-redux';

import StatementsTable from './StatementsTable';

type StateProps = {
  isSidebarCollapsed: boolean,
};

function mapStateToProps(state: Object): StateProps {
  return {
    isSidebarCollapsed: state.app.isSidebarCollapsed,
  };
}

export default connect(mapStateToProps)(StatementsTable);
