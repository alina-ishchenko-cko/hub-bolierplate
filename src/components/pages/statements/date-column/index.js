// @flow
import { connect } from 'react-redux';
import type { State } from 'store/reducers';
import type {
  Statement,
  MonthSectionMap,
} from 'store/reducers/statementsReducer';

import DateColumn from './DateColumn';

type StateProps = {
  statements: Statement[],
  monthSectionMap: MonthSectionMap,
};

export type Props = StateProps;

function mapStateToProps(state: State): StateProps {
  return {
    statements: state.statements.list.statements,
    monthSectionMap: state.statements.monthSectionMap,
  };
}

export default connect(mapStateToProps)(DateColumn);
