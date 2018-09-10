// @flow
import { buildReducer } from 'utils/reducer.util';
import { CHANGE_PASSWORD_TYPE, REQUEST_PASSWORD_TYPE } from 'store/constants';

type STATE = {
  newPasswordData: {
    loading: boolean,
    success: boolean,
    error: boolean,
  },
  requestPasswordData: {
    loading: boolean,
    success: boolean,
    error: boolean,
  },
  verifyTokenData: {
    success: boolean,
    error: boolean,
  },
};

const DEFAULT_STATE: STATE = {
  newPasswordData: {
    loading: false,
    success: false,
    error: false,
  },
  requestPasswordData: {
    loading: false,
    success: false,
    error: false,
  },
  verifyTokenData: {
    success: false,
    error: false,
  },
};

const handlers = {
  /**
   * Change password - Reset
   */
  [CHANGE_PASSWORD_TYPE.RESET]: (state: Object, action: Object) => ({
    ...DEFAULT_STATE,
    newPasswordData: {
      ...state.newPasswordData,
      ...action.payload.data,
    },
  }),
  /**
   * Change password - Pending
   */
  [CHANGE_PASSWORD_TYPE.PENDING]: (state: Object, action: Object) => ({
    ...state,
    newPasswordData: {
      ...state.newPasswordData,
      loading: true,
    },
  }),
  /**
   * Change password - Success
   */
  [CHANGE_PASSWORD_TYPE.SUCCESS]: (state: Object, action: Object) => ({
    ...state,
    newPasswordData: {
      ...state.newPasswordData,
      loading: false,
      success: true,
    },
  }),
  /**
   * Change password - Error
   */
  [CHANGE_PASSWORD_TYPE.ERROR]: (state: Object, action: Object) => ({
    ...state,
    newPasswordData: {
      ...state.newPasswordData,
      ...action.payload.data,
      loading: false,
      success: false,
      error: true,
    },
  }),
  /**
   * Verifiy Token - Success
   */
  [CHANGE_PASSWORD_TYPE.TOKEN_SUCCESS]: (state: Object, action: Object) => ({
    ...DEFAULT_STATE,
    verifyTokenData: {
      success: true,
      error: false,
    },
  }),
  /**
   * Verifiy Token - Error
   */
  [CHANGE_PASSWORD_TYPE.TOKEN_ERROR]: (state: Object, action: Object) => ({
    ...DEFAULT_STATE,
    verifyTokenData: {
      success: false,
      error: true,
    },
  }),
  /**
   * Reset New Password - Pending
   */
  [REQUEST_PASSWORD_TYPE.PENDING]: (state: Object, action: Object) => ({
    ...DEFAULT_STATE,
    requestPasswordData: {
      loading: true,
    },
  }),
  /**
   * Reset New Password - Success
   */
  [REQUEST_PASSWORD_TYPE.SUCCESS]: (state: Object, action: Object) => ({
    ...state,
    requestPasswordData: {
      loading: false,
      success: true,
    },
  }),
  /**
   * Reset New Password - Error
   */
  [REQUEST_PASSWORD_TYPE.ERROR]: (state: Object, action: Object) => ({
    ...state,
    requestPasswordData: {
      ...action.payload.data,
      error: true,
      success: false,
      loading: false,
    },
  }),
  /**
   * Change password - Clear
   */
  [CHANGE_PASSWORD_TYPE.CLEAR]: (state: Object, action: Object) => ({
    ...DEFAULT_STATE,
  }),
};

export default buildReducer(handlers, DEFAULT_STATE);
