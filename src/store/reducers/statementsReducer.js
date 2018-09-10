// @flow
import { STATEMENTS } from 'store/constants';
import { buildReducer } from 'utils/reducer.util';

export type Deposit = {
  amount: number,
  currencySymbol: string,
  status: string,
};

export type Statement = {
  deposits: Deposit[],
  displayId: string,
  endDate: string,
  entityName: string,
  isLegacyStatement: boolean,
  isValidated: boolean,
  settlementDate: string,
  startDate: string,
  statementId: string,
  status: string,
  url: string,
};

export type MonthSection = {
  inView: boolean,
  rect: ?(ClientRect | DOMRect), // optional becuase it can only be retrieved once we have a valid ref
};

// key should be `${year}${month}`
export type MonthSectionMap = { [key: string]: MonthSection };

export type StatementsState = {
  list: {
    loading: boolean,
    error: boolean,
    startIndex: number,
    totalRows: number,
    statements: Statement[],
  },
  groups: Object,
  monthSectionMap: MonthSectionMap,
};

const DEFAULT_STATE: StatementsState = {
  list: {
    loading: false,
    error: false,
    startIndex: 0,
    totalRows: 0,
    statements: [],
  },
  groups: {},
  monthSectionMap: {},
};

const handlers = {
  /**
   * All - Pending
   */
  [STATEMENTS.PENDING]: (
    state: StatementsState,
    action: Object
  ): StatementsState => ({
    ...DEFAULT_STATE,
    list: {
      ...DEFAULT_STATE.list,
      loading: true,
    },
  }),
  /**
   * All - Success
   */
  [STATEMENTS.SUCCESS]: (
    state: StatementsState,
    action: Object
  ): StatementsState => ({
    ...state,
    list: {
      ...DEFAULT_STATE.list,
      loading: false,
      error: false,
      ...action.payload.data,
    },
  }),
  /**
   * All - Error
   */
  [STATEMENTS.ERROR]: (
    state: StatementsState,
    action: Object
  ): StatementsState => ({
    ...state,
    list: {
      ...state.list,
      loading: false,
      error: true,
    },
  }),
  /**
   * Group - Success
   */
  [STATEMENTS.GROUP.SUCCESS]: (
    state: StatementsState,
    action: Object
  ): StatementsState => ({
    ...state,
    groups: {
      ...state.groups,
      [action.statementId]: action.payload.data,
    },
  }),

  [STATEMENTS.STREAM_MONTH_SECTION_MAP]: (
    state: StatementsState,
    action: Object
  ): StatementsState => ({
    ...state,
    monthSectionMap: action.monthSectionMap,
  }),
};

export default buildReducer(handlers, DEFAULT_STATE);
