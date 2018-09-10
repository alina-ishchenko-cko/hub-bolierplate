// @flow
import { buildReducer } from 'utils/reducer.util';
import { INDICATORS_TYPE, SUMMARY_TYPE, ACCOUNTS_TYPE } from 'store/constants';

type STATE = {
  indicators: {
    loading: boolean,
    error: boolean,
  },
  summary: {
    currencies: Array<Object>,
    paymentMethods: Array<Object>,
  },
  refresh: boolean,
};

const DEFAULT_STATE: STATE = {
  indicators: {
    loading: false,
    error: false,
  },
  summary: {
    loading: false,
    error: false,
    currencies: [],
    paymentMethods: [],
  },
  refresh: false,
};

const handlers = {
  /**
   * Indicator - Pending
   */
  [INDICATORS_TYPE.PENDING]: (state: Object, action: Object) => ({
    ...state,
    refresh: false,
    indicators: {
      ...DEFAULT_STATE.indicators,
      loading: true,
    },
  }),
  /**
   * Indicator - Error
   */
  [INDICATORS_TYPE.ERROR]: (state: Object, action: Object) => ({
    ...state,
    indicators: {
      ...DEFAULT_STATE.indicators,
      error: true,
    },
  }),
  /**
   * Indicator - Success
   */
  [INDICATORS_TYPE.SUCCESS]: (state: Object, action: Object) => ({
    ...state,
    indicators: {
      ...DEFAULT_STATE.indicators,
      ...action.payload.data,
    },
  }),
  /**
   * Summary - Pending
   */
  [SUMMARY_TYPE.PENDING]: (state: Object, action: Object) => {
    return {
      ...state,
      summary: {
        ...DEFAULT_STATE.summary,
        loading: true,
      },
      refresh: false,
    };
  },
  /**
   * Summary - Success
   */
  [SUMMARY_TYPE.SUCCESS]: (state: Object, action: Object) => {
    const { currencies, paymentMethods } = action.payload.data;
    return {
      ...state,
      summary: {
        loading: false,
        error: false,
        currencies: [...currencies],
        paymentMethods: [...paymentMethods],
      },
      refresh: false,
    };
  },
  /**
   * Summary - Error
   */
  [SUMMARY_TYPE.ERROR]: (state: Object, action: Object) => {
    return {
      ...state,
      summary: {
        ...state.summary,
        error: true,
      },
      refresh: false,
    };
  },
  /**
   * Refresh
   */
  [ACCOUNTS_TYPE.REFRESH_DATA]: (state: Object, action: Object) => ({
    ...state,
    refresh: true,
  }),
};

export default buildReducer(handlers, DEFAULT_STATE);
