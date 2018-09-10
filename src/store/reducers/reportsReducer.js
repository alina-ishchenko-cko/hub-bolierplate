// @flow
import { REPORTS } from 'store/constants';
import { buildReducer } from 'utils/reducer.util';

type STATE = {
  list: {
    loading: boolean,
    error: boolean,
    data: Array<Object>,
  },
  generate: {
    loading: boolean,
    error: boolean,
  },
};

const DEFAULT_STATE: STATE = {
  list: {
    loading: false,
    error: false,
    data: [],
  },
  generate: {
    loading: false,
    error: false,
  },
};

const handlers = {
  /**
   * All - Pending
   */
  [REPORTS.ALL.PENDING]: (state: Object, action: Object) => ({
    ...state,
    list: {
      loading: true,
      error: false,
      data: [],
    },
  }),
  /**
   * All - Success
   */
  [REPORTS.ALL.SUCCESS]: (state: Object, action: Object) => ({
    ...state,
    list: {
      loading: false,
      error: false,
      data: action.payload.data,
    },
  }),
  /**
   * All - Error
   */
  [REPORTS.ALL.ERROR]: (state: Object, action: Object) => ({
    ...state,
    list: {
      ...state.list,
      loading: false,
      error: true,
    },
  }),
  /**
   * Generate - Pending
   */
  [REPORTS.GENERATE.PENDING]: (state: Object, action: Object) => ({
    ...state,
    generate: {
      loading: true,
      error: false,
    },
  }),
  /**
   * Generate - Success
   */
  [REPORTS.GENERATE.SUCCESS]: (state: Object, action: Object) => ({
    ...state,
    generate: {
      loading: false,
      error: false,
      ...action.payload.data,
    },
  }),
  /**
   * Generate - Error
   */
  [REPORTS.GENERATE.ERROR]: (state: Object, action: Object) => ({
    ...state,
    generate: {
      ...state.generate,
      loading: false,
      error: true,
    },
  }),
};
export default buildReducer(handlers, DEFAULT_STATE);
