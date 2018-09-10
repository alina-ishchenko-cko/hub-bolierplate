import { ajxPromise } from 'services/appRequest';
import { validateParams } from 'utils/api.util';

/**
 * Gets all the merchants accounts - /accounts
 * @returns {promise}
 */
export function getAccounts(): Promise<any> {
  return ajxPromise.get('/accounts');
}

/**
 * Gets the account assets - /accounts/{entityId}/assets
 * @param {string|number} entityId
 * @returns {promise}
 */
export function getAccountAssets(entityId: number): Promise<any> {
  if (entityId === void 0) {
    return Promise.reject(
      `Account.getAccountAssets() is missing entityId param`
    );
  }
  return ajxPromise.get(`/accounts/${entityId}/assets`);
}

/**
 * Gets all currencies for channel - /accounts/{accountId}/channels/{channelId}/currencies
 * @param {string|number} accountId
 * @param {string|number} channelId
 * @returns {promise}
 */
export function getChannelCurrency(
  accountId: number,
  channelId: number
): Promise<any> {
  const requiredParams = ['accountId', 'channelId'];
  const errorList = validateParams({ accountId, channelId }, requiredParams);

  // Check the required params are valid
  if (errorList.length > 0) {
    return Promise.reject(
      `Account.getChannelCurrency() is missing {${errorList}} param(s)`
    );
  }

  return ajxPromise.get(
    `/accounts/${accountId}/channels/${channelId}/currencies`
  );
}
