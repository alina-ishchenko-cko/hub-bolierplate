// @flow
import { ajxPromise, getToken } from 'services/appRequest';
import { validateParams } from 'utils/api.util';

/**
 * Handles the login request - /login
 * @param {string} email
 * @param {string} password
 * @returns {promise}
 */
export function login(email: string, password: string): Promise<Object> {
  const requiredParams = ['email', 'password'];
  const errorList = validateParams({ email, password }, requiredParams);

  // Return Promise reject if missing params
  if (errorList.length > 0) {
    return Promise.reject(
      `LoginAPI.login() is missing {${errorList}} param(s)`
    );
  }

  return ajxPromise.post('/login', { email, password });
}

/**
 * Handles the password change request - /change-password
 * @param {string} email
 * @param {string} currentPassword
 * @param {string} newPassword
 * @param {string} confirmPassword
 * @returns {promise}
 */
export function changePassword(
  email: string,
  currentPassword: string,
  newPassword: string,
  confirmPassword: string
): Promise<Object> {
  const requiredParams = [
    'email',
    'currentPassword',
    'newPassword',
    'confirmPassword',
  ];
  const dataParam = { email, currentPassword, newPassword, confirmPassword };
  const errorList = validateParams(dataParam, requiredParams);

  // Return Promise reject if missing params
  if (errorList.length > 0) {
    return Promise.reject(
      `LoginAPI.changePassword() is missing {${errorList}} param(s)`
    );
  }

  return ajxPromise.post(
    '/change-password',
    {
      email,
      currentPassword,
      newPassword,
      confirmPassword,
    },
    {
      X_AUTH_CREDENTIALS: currentPassword,
    }
  );
}

/**
 * Handles the reset password change - /request-reset-password
 * @param {string} email
 * @returns {promise}
 */
export function requestResetPassword(email: string): Promise<any> {
  const requiredParams = ['email'];
  const errorList = validateParams({ email }, requiredParams);

  // Return Promise reject if missing params
  if (errorList.length > 0) {
    return Promise.reject(
      `LoginAPI.requestResetPassword() is missing {${errorList}} param(s)`
    );
  }
  return ajxPromise.post('/request-reset-password', { email });
}

/**
 * Handles the token verification - /verify-token
 * @param {string} token
 * @returns {promise}
 */
export function verifyToken(token: string): Promise<any> {
  const requiredParams = ['token'];
  const errorList = validateParams({ token }, requiredParams);

  // Return Promise reject if missing params
  if (errorList.length > 0) {
    return Promise.reject(
      `LoginAPI.verifyToken() is missing {${errorList}} param(s)`
    );
  }
  return ajxPromise.post('/verify-token', { token });
}

/**
 * Verifies the password - /verify-reset-password
 * @param {string} token
 * @param {string} email
 * @param {string} newPassword
 * @param {string} confirmPassword
 * @returns {promise}
 */
export function verifyResetPassword(
  token: string,
  email: string,
  newPassword: string,
  confirmPassword: string
): Promise<any> {
  const requiredParams = ['token', 'email', 'newPassword', 'confirmPassword'];
  const dataParam = { token, email, newPassword, confirmPassword };
  const errorList = validateParams(dataParam, requiredParams);

  // Return Promise reject if missing params
  if (errorList.length > 0) {
    return Promise.reject(
      `LoginAPI.verifyResetPassword() is missing {${errorList}} param(s)`
    );
  }

  return ajxPromise.post('/verify-reset-password', {
    token,
    email,
    newPassword,
    confirmPassword,
  });
}

/**
 * Get the global permissions and settings - /lookups/?lookupNames=countries...
 * @returns {promise}
 */
export function globalLookUp(): Promise<any> {
  return ajxPromise.get(
    '/lookups/?lookupNames=countries,paymentmethods,currencies,industries,merchantCategoryCodes,eventTypes,frequencies',
    {
      headers: {
        'X-AuthToken': getToken(),
      },
    }
  );
}
