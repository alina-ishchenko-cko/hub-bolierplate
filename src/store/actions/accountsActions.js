// @flow
import { ACCOUNTS_TYPE } from 'store/constants';
import * as AccountAPI from 'services/basics/account.api';
import { dispatchResponse } from 'utils/action.util';
import { IAction } from './flow-type';

/*
 * getAccounts() - /accounts
 */
export function getAccounts() {
  const promiseReq = AccountAPI.getAccounts();
  let { PENDING, SUCCESS, ERROR } = ACCOUNTS_TYPE.ACCOUNTS;

  return dispatchResponse(promiseReq, PENDING, { type: SUCCESS }, ERROR);
}

/*
 * getAccountAssets() - /accounts/{entityId}/assets
 */
export function getAccountAssets(entityId: string | number) {
  const promiseReq = AccountAPI.getAccountAssets(entityId);
  let { PENDING, SUCCESS, ERROR } = ACCOUNTS_TYPE.ASSETS;

  return dispatchResponse(
    promiseReq,
    PENDING,
    { type: SUCCESS, entityId },
    ERROR
  );
}

/*
 * getChannelCurrency() - /accounts/{accountSelected}/channels/{channelId}/currencies
 */
export function getChannelCurrency(
  entityId: string | number,
  channelId: string | number
) {
  const promiseReq = AccountAPI.getChannelCurrency(entityId, channelId);
  let { PENDING, SUCCESS, ERROR } = ACCOUNTS_TYPE.CURRENCIES;

  return dispatchResponse(promiseReq, PENDING, { type: SUCCESS }, ERROR);
}

/*
 * Set's the selected account
 */
export function setSelection(selectionObj: Object): IAction {
  return {
    type: ACCOUNTS_TYPE.SET_SELECTION,
    payload: selectionObj,
  };
}

/*
 * Set the from and to date
 */
export function setDates(dateObj: Object): IAction {
  return {
    type: ACCOUNTS_TYPE.SET_DATES,
    payload: dateObj,
  };
}

export function refreshData(): IAction {
  return {
    type: ACCOUNTS_TYPE.REFRESH_DATA,
  };
}

export function loadCachedAccounts(data: Object): IAction {
  return {
    type: ACCOUNTS_TYPE.CACHED_DATA,
    payload: { data },
  };
}
