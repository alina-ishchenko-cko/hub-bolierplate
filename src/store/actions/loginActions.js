// @flow
import {
  LOGIN_TYPE,
  CHANGE_PASSWORD_TYPE,
  LOOKUPS_TYPE,
  PROFILE_UPDATE,
} from 'store/constants';
import * as loginAPI from 'services/basics/login.api';
import * as SettingsAPI from 'services/resources/settings.api';
import { dispatchResponse } from 'utils/action.util';
import { ERROR_CODES } from 'config';
import { IAction } from './flow-type';

type dispatchAlias = (Object | Function) => {};
/**
 * Action to handle the user login
 * @param {object} userData
 * @returns {function}
 */
export function loginUser(userData: { email: string, password: string }) {
  const request = loginAPI.login(userData.email, userData.password);

  return (dispatch: dispatchAlias) => {
    // Dispatch pending action
    dispatch({ type: LOGIN_TYPE.PENDING });
    return request
      .then((response: Object) => {
        loginSuccess(response.data, dispatch);
      })
      .catch((error: Object) => {
        loginError(error, dispatch, userData);
      });
  };
}

function loginSuccess(data: Object, dispatch: dispatchAlias) {
  const { SUCCESS, ERROR } = LOGIN_TYPE;
  let type = SUCCESS;

  if (data && data.errorCode) {
    type = ERROR;
  }

  dispatch({ type, payload: { data } });
}

function loginError(error: Object, dispatch: dispatchAlias, userData: Object) {
  const { SIGN_OUT, ERROR } = LOGIN_TYPE;
  const response = error.response;
  const resObj = {};
  let errorCode;

  // Check Error Codes
  if (response && response.data && response.data.errorCode) {
    errorCode = parseInt(response.data.errorCode, 10);
    if (
      errorCode === ERROR_CODES.PASSWORD_RESET_REQUIRED ||
      errorCode === ERROR_CODES.PASSWORD_EXPIRED
    ) {
      resObj.type = CHANGE_PASSWORD_TYPE.RESET;
      resObj.payload = { data: { ...userData } };
    } else if (errorCode === ERROR_CODES.TOKEN_EXPIRED) {
      resObj.type = SIGN_OUT;
    } else {
      resObj.type = ERROR;
      resObj.payload = { data: response.data };
    }

    // Dispatch response
    dispatch(resObj);
    return;
  } else {
    dispatch({
      type: ERROR,
      payload: response ? response.data : error,
    });
    return;
  }
}

/**
 * Action to logout user
 * @returns {function}
 */
export function logout(sessionEnd: boolean = false): IAction {
  return {
    type: LOGIN_TYPE.SIGN_OUT,
    sessionEnd,
  };
}

/**
 * Action to clear the login state
 * @returns {function}
 */
export function clearLoginState(): IAction {
  return {
    type: LOGIN_TYPE.CLEAR,
  };
}

/**
 * Action to get the global permissions and settings
 * @returns {function}
 */
export function globalLookUp(): IAction {
  const promiseReq = loginAPI.globalLookUp();
  const { PENDING, SUCCESS, ERROR } = LOOKUPS_TYPE;
  return dispatchResponse(promiseReq, PENDING, { type: SUCCESS }, ERROR);
}

/**
 * Action to get the list of timezones of the country
 * @param {string} name user name
 * @param {string} email user email
 * @param {string} timeZone user selected time zone
 * @returns {function}
 */
export function updateProfile(
  name: string,
  email: string,
  timeZone: string
): IAction {
  const promiseReq = SettingsAPI.updateProfile(name, email, timeZone);
  const { PENDING, SUCCESS, ERROR } = PROFILE_UPDATE;
  return dispatchResponse(promiseReq, PENDING, { type: SUCCESS }, ERROR);
}

export function updateTwoFactorStatus(): IAction {
  return {
    type: LOGIN_TYPE.TWO_FACTOR,
    payload: { data: { success: true } },
  };
}

export function loadCachedLogin(data: Object): IAction {
  return {
    type: LOGIN_TYPE.CACHED_DATA,
    payload: { data },
  };
}
