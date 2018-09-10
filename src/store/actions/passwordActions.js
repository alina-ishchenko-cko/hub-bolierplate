// @flow
import { CHANGE_PASSWORD_TYPE, REQUEST_PASSWORD_TYPE } from 'store/constants';
import * as LoginAPI from 'services/basics/login.api';
import { dispatchResponse } from 'utils/action.util';
import { IAction } from './flow-type';

// Request New Password
export function requestResetPassword(email: string) {
  // Make request to /request-reset-password
  const promiseReq = LoginAPI.requestResetPassword(email);
  const { PENDING, SUCCESS, ERROR } = REQUEST_PASSWORD_TYPE;
  return dispatchResponse(promiseReq, PENDING, SUCCESS, ERROR);
}

// Update Password
export function changePassword(formData: Object) {
  let promiseReq;

  if (formData.token) {
    // If Token exist, then make request to /verify-reset-password
    const { token, email, newPassword, confirmPassword } = formData;
    promiseReq = LoginAPI.verifyResetPassword(
      token,
      email,
      newPassword,
      confirmPassword
    );
  } else {
    // Make request to /change-password
    const { email, currentPassword, newPassword, confirmPassword } = formData;
    promiseReq = LoginAPI.changePassword(
      email,
      currentPassword,
      newPassword,
      confirmPassword
    );
  }
  const { PENDING, SUCCESS, ERROR } = CHANGE_PASSWORD_TYPE;
  return dispatchResponse(promiseReq, PENDING, SUCCESS, ERROR);
}

// Verify Token
export function verifyToken(token: string) {
  // Make request to /verify-token
  const promiseReq = LoginAPI.verifyToken(token);
  const { TOKEN_SUCCESS, TOKEN_ERROR } = CHANGE_PASSWORD_TYPE;
  return dispatchResponse(promiseReq, null, TOKEN_SUCCESS, TOKEN_ERROR);
}

// Clear State
export function clearPassword(): IAction {
  return {
    type: CHANGE_PASSWORD_TYPE.CLEAR,
  };
}
