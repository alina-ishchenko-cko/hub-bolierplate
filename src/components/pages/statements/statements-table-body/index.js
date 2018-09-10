// @flow
import { connect } from 'react-redux';
import * as statementsActions from 'store/actions/statementsActions';

import StatementsTableBody from './StatementsTableBody';

const mapActionsToProps = {
  streamMonthSectionMap: statementsActions.streamMonthSectionMap,
};

export default connect(null, mapActionsToProps)(StatementsTableBody);
