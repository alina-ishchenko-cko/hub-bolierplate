// @flow
import { USER_MANAGEMENT } from 'store/constants';
import * as UserManagementAPI from 'services/resources/user-management.api';
import { dispatchResponse } from 'utils/action.util';

export function getListOfUsers(accountId: string | number) {
  const promiseReq = UserManagementAPI.getListOfUsers(accountId);
  const { PENDING, SUCCESS, ERROR } = USER_MANAGEMENT.LIST_USERS;
  return dispatchResponse(promiseReq, PENDING, { type: SUCCESS }, ERROR);
}

export function updateUserInfo(
  accountId: string | number,
  userId: string | number,
  data: Object
) {
  const promiseReq = UserManagementAPI.updateUserInfo(accountId, userId, data);
  const { PENDING, SUCCESS, ERROR } = USER_MANAGEMENT.UPDATE_USER;
  return dispatchResponse(promiseReq, PENDING, { type: SUCCESS }, ERROR);
}

export function createUser(accountId: string | number, userInfo: Object) {
  const promiseReq = UserManagementAPI.createUser(accountId, userInfo);
  const { PENDING, SUCCESS, ERROR } = USER_MANAGEMENT.CREATE_USER;
  return dispatchResponse(promiseReq, PENDING, { type: SUCCESS }, ERROR);
}

export function deleteUser(
  accountId: string | number,
  userId: string | number
) {
  const promiseReq = UserManagementAPI.deleteUser(accountId, userId);
  const { PENDING, SUCCESS, ERROR } = USER_MANAGEMENT.DELETE_USER;
  return dispatchResponse(promiseReq, PENDING, { type: SUCCESS }, ERROR);
}
