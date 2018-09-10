// @flow
import axios from 'axios';
import pickBy from 'lodash/pickBy';
import identity from 'lodash/identity';
import isEmpty from 'lodash/isEmpty';
import * as localApi from 'services/localDataApi';

const appData: {
  url: string,
  token: string,
  currencyId: string,
} = {
  url: '',
  token: '',
  currencyId: '',
};

/**
 * Sets the current user's currencyId
 * @param {string} url
 */
export function setUrl(url: string): void {
  appData.url = url;
}

/**
 * Sets the current user's token
 * @param {string} token
 */
export function setToken(token: string): void {
  appData.token = token;
}

/**
 * Sets the current user's currencyId
 * @param {string} value - currency ID
 */
export function setCurrencyId(value: string): void {
  appData.currencyId = value;
}

/** Gets the current user's currencyId */
export function getCurrencyId(): string {
  if (appData.currencyId) {
    return appData.currencyId;
  }

  const user = localApi.user.get();
  // presumes user is guaranteed to have a data property
  return user && user.data ? user.data.displayCurrencyId : '';
}

/** Gets the API endpoint root domain */
export function getUrl(): string {
  return appData.url;
}

/** Gets the current user's token */
export function getToken(): string {
  const token = appData.token;
  return token;
}

/**
 * Maps RESTful actions.
 * All actions accepts the following arugments
 * (path = String, data = Object, reqHeaders = Object)
 * @returns {object}
 * - get()
 * - post()
 * - put()
 * - delete()
 */

export const ajxPromise = {
  get(path: string = '', data: Object = {}, reqHeaders: Object = {}) {
    return handleRequest('get', path, data, reqHeaders);
  },
  post(path: string = '', data: Object = {}, reqHeaders: Object = {}) {
    return handleRequest('post', path, data, reqHeaders);
  },
  put(path: string = '', data: Object = {}, reqHeaders: Object = {}) {
    return handleRequest('put', path, data, reqHeaders);
  },
  delete(path: string = '', data: Object = {}, reqHeaders: Object = {}) {
    return handleRequest('delete', path, data, reqHeaders);
  },
};

/** Clears the stored currencyId and token */
export function clearAppData(): void {
  appData.currencyId = '';
  appData.token = '';
}

/**
 * Makes Ajax request and returns a promise
 * @param {string} method
 * @param {string} path
 * @param {object} data
 * @param {object} reqHeaders
 * @returns {promise}
 */
function handleRequest(
  method: string = '',
  path: string = '',
  data: ?Object = {},
  reqHeaders: ?Object = {}
): Promise<Object> {
  let token = getToken();
  let endpoint = getUrl();
  let headers = { ...reqHeaders };
  if (isEmpty(data)) data = null;
  if (token) headers['X-AuthToken'] = token;
  if (isEmpty(headers)) headers = null;

  // Remove Object undefinded or null props
  // before making the request.
  const reqObj = pickBy(
    {
      url: `${endpoint}/hub${path}`,
      method,
      data,
      headers,
    },
    identity
  );

  // Make request
  return axios(reqObj);
}
