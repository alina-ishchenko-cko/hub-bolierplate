// @flow
import { buildReducer } from 'utils/reducer.util';
import { USER_MANAGEMENT } from 'store/constants';

type State = {
  listUsers: {
    loading: boolean,
    error: boolean,
  },
  createUser: {
    loading: boolean,
    error: boolean,
    success: boolean,
  },
  updateUser: {
    loading: boolean,
    error: boolean,
    success: boolean,
  },
  deleteUser: {
    loading: boolean,
    error: boolean,
    success: boolean,
  },
};

const DEFAULT_STATE: State = {
  listUsers: {
    loading: false,
    error: false,
  },
  createUser: {
    loading: false,
    error: false,
    success: false,
  },
  updateUser: {
    loading: false,
    error: false,
    success: false,
  },
  deleteUser: {
    loading: false,
    error: false,
    success: false,
  },
};

const handlers = {
  /**
   * List Users - Pending
   */
  [USER_MANAGEMENT.LIST_USERS.PENDING]: (state: Object, action: Object) => ({
    ...state,
    listUsers: {
      loading: true,
      error: false,
    },
  }),
  /**
   * List Users - Success
   */
  [USER_MANAGEMENT.LIST_USERS.SUCCESS]: (state: Object, action: Object) => ({
    ...state,
    listUsers: {
      loading: false,
      error: false,
      data: action.payload.data.users,
    },
  }),
  /**
   * List Users - Error
   */
  [USER_MANAGEMENT.LIST_USERS.ERROR]: (state: Object, action: Object) => ({
    ...state,
    listUsers: {
      loading: false,
      error: true,
    },
  }),
  /**
   * Create User - Pending
   */
  [USER_MANAGEMENT.CREATE_USER.PENDING]: (state: Object, action: Object) => ({
    ...state,
    createUser: {
      loading: true,
      error: false,
      success: false,
    },
  }),
  /**
   * Create User - Success
   */
  [USER_MANAGEMENT.CREATE_USER.SUCCESS]: (state: Object, action: Object) => ({
    ...state,
    createUser: {
      loading: false,
      error: false,
      success: true,
    },
  }),
  /**
   * Create User - Error
   */
  [USER_MANAGEMENT.CREATE_USER.ERROR]: (state: Object, action: Object) => ({
    ...state,
    createUser: {
      loading: false,
      error: true,
      success: false,
    },
  }),
  /**
   * Update User - Pending
   */
  [USER_MANAGEMENT.UPDATE_USER.PENDING]: (state: Object, action: Object) => ({
    ...state,
    updateUser: {
      loading: true,
      error: false,
      success: false,
    },
  }),
  /**
   * Update User - Success
   */
  [USER_MANAGEMENT.UPDATE_USER.SUCCESS]: (state: Object, action: Object) => ({
    ...state,
    updateUser: {
      loading: false,
      error: false,
      success: true,
    },
  }),
  /**
   * Update User - Error
   */
  [USER_MANAGEMENT.UPDATE_USER.ERROR]: (state: Object, action: Object) => ({
    ...state,
    updateUser: {
      loading: false,
      error: true,
      success: false,
    },
  }),
  /**
   * Delete User - Pending
   */
  [USER_MANAGEMENT.DELETE_USER.PENDING]: (state: Object, action: Object) => ({
    ...state,
    deleteUser: {
      loading: true,
      error: false,
      success: false,
    },
  }),
  /**
   * Delete User - Success
   */
  [USER_MANAGEMENT.DELETE_USER.SUCCESS]: (state: Object, action: Object) => ({
    ...state,
    deleteUser: {
      loading: false,
      error: false,
      success: true,
    },
  }),
  /**
   * Delete User - Error
   */
  [USER_MANAGEMENT.DELETE_USER.ERROR]: (state: Object, action: Object) => ({
    ...state,
    deleteUser: {
      loading: false,
      error: true,
      success: false,
    },
  }),
};

export default buildReducer(handlers, DEFAULT_STATE);
