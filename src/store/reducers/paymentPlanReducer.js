// @flow
import sortBy from 'lodash/sortBy';
import { buildReducer } from 'utils/reducer.util';
import { PAYMENT_TYPE, PAYMENT_PLAN } from 'store/constants';
import { convertCentsWorth } from 'services/subscription/subscriptionService';

type STATE = {
  list: {
    loading: boolean,
    success: boolean,
    error: boolean,
    data: Array<Object>,
  },
  options: {
    data: Array<Object>,
    loading: boolean,
    success: boolean,
    error: boolean,
  },
};

/* TODO: Add paymentPlan update action */
const DEFAULT_STATE: STATE = {
  list: {
    loading: false,
    success: false,
    error: false,
    data: [],
  },
  options: {
    data: [],
    loading: false,
    success: false,
    error: false,
  },
};

const handlers = {
  /**
   * Payment Options - Pending
   */
  [PAYMENT_TYPE.OPTIONS.PENDING]: (state: Object, action: Object) => ({
    ...state,
    options: {
      ...DEFAULT_STATE.options,
      loading: true,
    },
  }),
  /**
   * Payment Options - Success
   */
  [PAYMENT_TYPE.OPTIONS.SUCCESS]: (state: Object, action: Object) => {
    const data =
      action.payload.data.length > 1
        ? sortBy(action.payload.data, p =>
            (p.name + p.value).toLowerCase()
          ).map(p => convertCentsWorth(false, p))
        : [action.payload.data];

    return {
      ...state,
      options: {
        ...DEFAULT_STATE.options,
        data,
        success: true,
      },
    };
  },
  /**
   * Payment Options - Error
   */
  [PAYMENT_TYPE.OPTIONS.ERROR]: (state: Object, action: Object) => ({
    ...state,
    options: {
      ...DEFAULT_STATE.options,
      ...action.payload.data,
      error: true,
    },
  }),
  /**
   * Payment All - Pending
   */
  [PAYMENT_PLAN.ALL.PENDING]: (state: Object, action: Object) => ({
    ...state,
    list: {
      ...DEFAULT_STATE.list,
      loading: true,
    },
  }),
  /**
   * Payment All - Success
   */
  [PAYMENT_PLAN.ALL.SUCCESS]: (state: Object, action: Object) => ({
    ...state,
    list: {
      ...DEFAULT_STATE.list,
      success: true,
      data: [...action.payload.data],
    },
  }),
  /**
   * Payment All - Error
   */
  [PAYMENT_PLAN.ALL.ERROR]: (state: Object, action: Object) => ({
    ...state,
    list: {
      ...DEFAULT_STATE.list,
      error: true,
      ...action.payload.data,
    },
  }),
};
export default buildReducer(handlers, DEFAULT_STATE);
