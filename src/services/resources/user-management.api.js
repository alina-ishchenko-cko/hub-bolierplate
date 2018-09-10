import { ajxPromise } from 'services/appRequest';
import { validateParams } from 'utils/api.util';

/**
 * Get the list of users via an api call
 * @param {string|number} accountId account id
 * @return {promise}
 */
export const getListOfUsers = accountId => {
  const errorList = validateParams({ accountId }, ['accountId']);
  if (errorList.length > 0) {
    return Promise.reject(
      `UserManagement.getListOfUsers() is missing {${errorList}} param(s)`
    );
  }
  return ajxPromise.get(`/accounts/${accountId}/user-management`);
};

/**
 * Update user information via an api call
 * @param {string|number} accountId account id
 * @param {string|number} userId user id
 * @param {object} data user information
 * @return {promise}
 */
export const updateUserInfo = (accountId, userId, data) => {
  const requiredParams = ['accountId', 'userId', 'data'];
  const errorList = validateParams({ accountId, userId, data }, requiredParams);
  if (errorList.length > 0) {
    return Promise.reject(
      `UserManagement.updateUserInfo() is missing {${errorList}} param(s)`
    );
  }
  return ajxPromise.put(
    `/accounts/${accountId}/user-management/${userId}`,
    data
  );
};

/**
 * Create a new user via an api call
 * @param {string|number} accountId account id
 * @param {object} userInfo user information
 * @return {promise}
 */
export const createUser = (accountId, userInfo) => {
  const requiredParams = [
    'accountId',
    'allowedBusinesses',
    'email',
    'readOnly'
  ];
  const errorList = validateParams({ accountId, ...userInfo }, requiredParams);
  if (errorList.length > 0) {
    return Promise.reject(
      `UserManagement.createUser() is missing {${errorList}} param(s)`
    );
  }
  return ajxPromise.post(`/accounts/${accountId}/user-management`, userInfo);
};

/**
 * Delete an user via an api call
 * @param {string|number} accountId account id
 * @param {string|number} userId user id
 * @return {promise}
 */
export const deleteUser = (accountId, userId) => {
  const requiredParams = ['accountId', 'userId'];
  const errorList = validateParams({ accountId, userId }, requiredParams);
  if (errorList.length > 0) {
    return Promise.reject(
      `UserManagement.deleteUser() is missing {${errorList}} param(s)`
    );
  }
  return ajxPromise.delete(`/accounts/${accountId}/user-management/${userId}`);
};
