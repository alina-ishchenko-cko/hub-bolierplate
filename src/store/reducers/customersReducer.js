// @flow
import { buildReducer } from 'utils/reducer.util';
import { CUSTOMERS, ACCOUNTS_TYPE } from 'store/constants';
import * as typed from './flow-type';

type STATE = {
  indicators: typed.CUSTOMER_INDICATORS,
  list: {
    loading: boolean,
    error: boolean,
  },
  refresh: boolean,
};

const DEFAULT_STATE: STATE = {
  indicators: {
    loading: false,
    error: false,
    uniqueCustomers: 0,
    returningCustomers: 0,
    averageSpend: 0,
  },
  list: {
    loading: false,
    error: false,
  },
  refresh: false,
};

const handlers = {
  /**
   * Indicator - Pending
   */
  [CUSTOMERS.INDICATORS.PENDING]: (state: Object, action: Object) => ({
    ...state,
    refresh: false,
    indicators: {
      ...DEFAULT_STATE.indicators,
      loading: true,
    },
  }),
  /**
   * Indicator - Success
   */
  [CUSTOMERS.INDICATORS.SUCCESS]: (state: Object, action: Object) => ({
    ...state,
    indicators: {
      ...DEFAULT_STATE.indicators,
      loading: false,
      ...action.payload.data.data,
    },
  }),
  /**
   * Indicator - Error
   */
  [CUSTOMERS.INDICATORS.ERROR]: (state: Object, action: Object) => ({
    ...state,
    indicators: {
      ...state.indicators,
      loading: false,
      error: true,
    },
  }),
  /**
   * All - Pending
   */
  [CUSTOMERS.ALL.PENDING]: (state: Object, action: Object) => ({
    ...state,
    refresh: false,
    list: {
      loading: true,
      error: false,
    },
  }),
  /**
   * All - Success
   */
  [CUSTOMERS.ALL.SUCCESS]: (state: Object, action: Object) => ({
    ...state,
    list: {
      ...DEFAULT_STATE.list,
      ...action.payload.data,
    },
  }),
  /**
   * All - Error
   */
  [CUSTOMERS.ALL.ERROR]: (state: Object, action: Object) => ({
    ...state,
    list: {
      loading: false,
      error: true,
      errorMsg: action.payload.data,
    },
  }),
  /**
   * Refresh - Pending
   */
  [ACCOUNTS_TYPE.REFRESH_DATA]: (state: Object, action: Object) => ({
    ...state,
    refresh: true,
  }),
};
export default buildReducer(handlers, DEFAULT_STATE);
