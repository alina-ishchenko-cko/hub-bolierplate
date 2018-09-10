import { LOGIN_TYPE, LOOKUPS_TYPE, ACCOUNTS_TYPE } from '../constants';
import * as localApi from 'services/localDataApi';
import { clearAppData } from 'services/appRequest';

const LOGIN = [LOGIN_TYPE.SUCCESS, LOGIN_TYPE.TWO_FACTOR, LOOKUPS_TYPE.SUCCESS];
const ACCOUNTS = [
  ACCOUNTS_TYPE.ACCOUNTS.SUCCESS,
  ACCOUNTS_TYPE.ASSETS.SUCCESS,
  ACCOUNTS_TYPE.SET_SELECTION,
  ACCOUNTS_TYPE.SET_DATES,
  ACCOUNTS_TYPE.CURRENCIES.SUCCESS,
];

/**
 * Clear cache and state
 */
export const handleLogout = store => next => action => {
  if (action.type === LOGIN_TYPE.SIGN_OUT) {
    localApi.clearData();
    clearAppData();

    const { pathname } = window.location;
    // Check if current view is not /login
    if (!pathname.includes('/login')) {
      const showSessionMsg = action.sessionEnd === true ? '?s=1' : '';
      // If v2 is the root path add it to the redirection
      window.location.href = pathname.includes('v2')
        ? `v2/login${showSessionMsg}`
        : `/login${showSessionMsg}`;
    }

    return null;
  }
  return next(action);
};

/**
 * Cache States
 */
export const cacheStates = store => next => action => {
  if (LOGIN.includes(action.type)) {
    /**
     * Cache Login
     */
    localApi.login.passed();
    const result = next(action);
    localApi.user.save(store.getState().currentUser);
    return result;
  } else if (ACCOUNTS.includes(action.type)) {
    /**
     * Cache Accounts
     */
    const result = next(action);
    localApi.accounts.save(store.getState().global);
    return result;
  }
  return next(action);
};
