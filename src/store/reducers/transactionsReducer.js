// @flow
import * as typed from './flow-type';
import { buildReducer } from 'utils/reducer.util';
//import { TRANSACTIONS, CHARGES, ACCOUNTS_TYPE } from 'store/constants';

import * as ACTIONS from 'store/constants';
const TRANSACTIONS = ACTIONS.TRANSACTIONS;
const CHARGES = ACTIONS.CHARGES;
const ACCOUNTS_TYPE = ACTIONS.ACCOUNTS_TYPE;

type STATE = {
  refresh: boolean,
  indicators: typed.TransactionKPI,
  list: typed.TransactionList,
  paymentCharge: typed.TransactionPayment,
  activeAction: {
    blacklistId: string,
    refundId: string,
    voidId: string,
    captureId: string,
  },
};

const DEFAULT_STATE: STATE = {
  refresh: false,
  indicators: {
    loading: false,
    error: false,
    success: false,
    averageSaleAmount: 0,
    totalRevenueAmount: 0,
    totalSalesCount: 0,
    chargebacks: {
      revenuePercentage: 0,
      salesPercentage: 0,
      totalAmount: 0,
      totalCount: 0,
    },
    refunds: {
      revenuePercentage: 0,
      salesPercentage: 0,
      totalAmount: 0,
      totalCount: 0,
    },
  },
  list: {
    loading: false,
    error: false,
    success: false,
    startIndex: 0,
    totalRows: 0,
    headers: [],
    datas: [],
  },
  paymentCharge: {
    loading: false,
    error: false,
    errorMsg: '',
    success: false,
  },
  logs: {},
  activeAction: {
    blacklistId: '',
    refundId: '',
    voidId: '',
    captureId: '',
  },
};

const handlers = {
  /**
   * Indicators - Pending
   */
  [TRANSACTIONS.INDICATORS.PENDING]: (state: Object, action: Object) => ({
    ...state,
    refresh: false,
    indicators: {
      ...DEFAULT_STATE.indicators,
      loading: true,
    },
  }),
  /**
   * Indicators - Error
   */
  [TRANSACTIONS.INDICATORS.ERROR]: (state: Object, action: Object) => ({
    ...state,
    indicators: {
      ...DEFAULT_STATE.indicators,
      error: true,
    },
  }),
  /**
   * Indicators - Success
   */
  [TRANSACTIONS.INDICATORS.SUCCESS]: (state: Object, action: Object) => ({
    ...state,
    indicators: {
      ...DEFAULT_STATE.indicators,
      ...action.payload.data,
      success: true,
    },
  }),
  /**
   * List - Pending
   */
  [TRANSACTIONS.ALL.PENDING]: (state: Object, action: Object) => ({
    ...state,
    refresh: false,
    list: {
      ...DEFAULT_STATE.list,
      loading: true,
    },
  }),
  /**
   * List - Error
   */
  [TRANSACTIONS.ALL.ERROR]: (state: Object, action: Object) => ({
    ...state,
    list: {
      ...DEFAULT_STATE.list,
      error: true,
    },
  }),
  /**
   * List - Success
   */
  [TRANSACTIONS.ALL.SUCCESS]: (state: Object, action: Object) => ({
    ...state,
    list: {
      ...DEFAULT_STATE.list,
      ...action.payload.data,
      success: true,
    },
  }),
  /**
   * Create - Pending
   */
  [CHARGES.CREATE.PENDING]: (state: Object, action: Object) => ({
    ...state,
    refresh: false,
    paymentCharge: {
      ...DEFAULT_STATE.paymentCharge,
      loading: true,
    },
  }),
  /**
   * Create - Error
   */
  [CHARGES.CREATE.ERROR]: (state: Object, action: Object) => ({
    ...state,
    paymentCharge: {
      ...DEFAULT_STATE.paymentCharge,
      errorMsg: action.payload.data,
      error: true,
    },
  }),
  /**
   * Create - Success
   */
  [CHARGES.CREATE.SUCCESS]: (state: Object, action: Object) => ({
    ...state,
    paymentCharge: {
      ...DEFAULT_STATE.paymentCharge,
      ...action.payload.data,
      success: true,
    },
  }),
  /**
   * Clear Charges
   */
  [CHARGES.CLEAR]: (state: Object, action: Object) => ({
    ...state,
    paymentCharge: {
      ...DEFAULT_STATE.paymentCharge,
    },
  }),
  /**
   * Logs - success
   */
  [TRANSACTIONS.LOGS.SUCCESS]: (state: Object, action: Object) => {
    const { data } = action.payload;
    const addKeyProp = data.map(x => ({ key: x.id, ...x }));
    const transactionLog = {};
    transactionLog[action.chargeId] = [...addKeyProp];

    return {
      ...state,
      logs: {
        ...state.logs,
        ...transactionLog,
      },
    };
  },
  /**
   * Refreshed - Pending
   */
  [ACCOUNTS_TYPE.REFRESH_DATA]: (state: Object, action: Object) => ({
    ...state,
    refresh: true,
  }),
  /**
   * Set Transaction Action
   */
  [TRANSACTIONS.SET_TRANSACTION_ACTION]: (state: Object, action: Object) => {
    const activeAction = { ...state.activeAction };
    activeAction[action.data.type] = action.data.value;
    return {
      ...state,
      activeAction,
    };
  },
};

export default buildReducer(handlers, DEFAULT_STATE);
