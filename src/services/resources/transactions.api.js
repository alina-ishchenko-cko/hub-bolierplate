import { ajxPromise, getCurrencyId } from 'services/appRequest';
import { validateParams } from 'utils/api.util';

/**
 * Handle the transactions KPI request
 * @param {object} dataParam
 * @returns {promise}
 */
export const getIndicators = dataParam => {
  let currencyId = getCurrencyId();
  const requiredParams = ['fromDate', 'toDate', 'entityTypeId', 'entityId'];
  const errorList = validateParams(dataParam, requiredParams, currencyId);

  // Check the required params are valid
  if (errorList.length > 0) {
    return Promise.reject(
      `Transactions.getIndicators() is missing {${errorList}} param(s)`
    );
  }

  currencyId = `currencyId=${currencyId}`;
  let entity = `entityId=${dataParam.entityId}&entityTypeId=${
    dataParam.entityTypeId
  }`;
  let date = `fromDate=${dataParam.fromDate}&toDate=${dataParam.toDate}`;

  // Make the Ajax request and return promise object
  return ajxPromise.get(
    `/transactions/overview/indicators?${currencyId}&${entity}&${date}`
  );
};

/**
 * Handle the transactions table data list request
 * @param {object} dataParam
 * @returns {promise}
 */
export const getAll = dataParam => {
  const requiredParams = [
    'entityId',
    'entityType',
    'fromDate',
    'toDate',
    'sortColumn',
    'sortOrder',
    'pageSize',
    'startIndex',
  ];

  const errorList = validateParams(dataParam, requiredParams);

  // Check the required params are valid
  if (errorList.length > 0) {
    return Promise.reject(
      `Transactions.getAll() is missing {${errorList}} param(s)`
    );
  }

  let entityId = dataParam.entityId;
  let entityType = dataParam.entityType;
  let date = `fromDate=${dataParam.fromDate}&toDate=${dataParam.toDate}`;
  let pageSize = `pageSize=${dataParam.pageSize}`;
  let sortColumn = `sortColumn=${dataParam.sortColumn}`;
  let sortOrder = `sortOrder=${dataParam.sortOrder}`;
  let startIndex = `startIndex=${dataParam.startIndex}`;

  let urlPaths = `${date}&${pageSize}&${sortColumn}&${sortOrder}&${startIndex}`;

  // Optional Params
  if (dataParam.search) {
    urlPaths += `&search=${dataParam.search}`;
  }

  if (dataParam.filter) {
    const filter = JSON.stringify(dataParam.filter);
    urlPaths += `&filter=${filter}`;
  }

  let endpoint = `/${entityType}/${entityId}/transactions?${urlPaths}`;
  // URL for Channel level
  if (entityType === 'channels') {
    endpoint = `/businesses/${
      dataParam.businessId
    }/${entityType}/${entityId}/transactions?${urlPaths}`;
  }

  return ajxPromise.get(endpoint);
};

/**
 * Handle the transactions details request
 * @param {string|number} chargeId
 * @returns {promise}
 */
export const getTransactionDetails = chargeId => {
  if (!chargeId) {
    return Promise.reject(
      'Transactions.getTransactionDetails() is missing: chargeId'
    );
  }
  let currencyId = getCurrencyId();
  currencyId = `currencyId=${currencyId}`;
  return ajxPromise.get(`/transactions/${chargeId}?${currencyId}`);
};

/**
 * Handle the transactions create payment request
 * @param {object} dataParam
 * @returns {promise}
 */
export const createCharges = dataParam => {
  const cardProperties = {
    card: ['number', 'name', 'cvv2', 'expiryMonth', 'expiryYear'],
  };
  const requiredParams = [
    'channelId',
    'autoCapTime',
    'email',
    'currency',
    'amount',
    'type',
    'autoCapture',
    'billingDetails',
    'shippingDetails',
    'udf1',
  ];
  if (dataParam.cardId === void 0) {
    requiredParams.push(cardProperties);
  } else {
    requiredParams.push('cardId');
  }
  const errorList = validateParams(dataParam, requiredParams);

  // Check the required params are valid
  if (errorList.length > 0) {
    return Promise.reject(
      `Transactions.createCharges() is missing {${errorList}} param(s)`
    );
  }

  return ajxPromise.post(`/charges`, dataParam);
};

/**
 * Handles the transactions blacklist data request
 * @param {string|number} chargeId
 * @returns {promise}
 */
export const getTransactionBlacklist = chargeId => {
  if (!chargeId) {
    return Promise.reject(
      'Transactions.getTransactionBlacklist() is missing: chargeId'
    );
  }
  return ajxPromise.get(`/transactions/${chargeId}/blacklist`);
};

/**
 * Handles the setting blacklist request
 * @param {string|number} chargeId
 * @param {object} params
 * @returns {promise}
 */
export const blacklistTransaction = (chargeId, params) => {
  const requiredParams = ['chargeId', 'entityId', 'entityTypeId'];
  const errorList = validateParams({ ...params, chargeId }, requiredParams);

  // Check the required params are valid
  if (errorList.length > 0) {
    const errorMsg = `Transactions.blacklistTransaction() is missing {${errorList}} param(s)`;
    if (process.env.NODE_ENV === 'development') console.error(errorMsg);
    return Promise.reject(errorMsg);
  }
  let entity = `entityId=${params.entityId}&entityTypeId=${
    params.entityTypeId
  }`;
  return ajxPromise.put(
    `/transactions/${chargeId}/blacklist?${entity}`,
    params
  );
};

/**
 * Handles the void blacklist request
 * @param {string|number} chargeId
 * @param {object} params
 * @returns {promise}
 */
export const voidTransaction = (chargeId, params) => {
  const requiredParams = ['chargeId', 'amount'];
  const errorList = validateParams({ ...params, chargeId }, requiredParams);
  // Check the required params are valid
  if (errorList.length > 0) {
    return Promise.reject(
      `Transactions.voidTransaction() is missing {${errorList}} param(s)`
    );
  }
  return ajxPromise.post(`/charges/${chargeId}/void`, params);
};

/**
 * Handles the refund transaction request
 * @param {string|number} chargeId
 * @param {object} params
 * @returns {promise}
 */
export const refundTransaction = (chargeId, params) => {
  const requiredParams = ['chargeId', 'amount'];
  const errorList = validateParams({ ...params, chargeId }, requiredParams);
  // Check the required params are valid
  if (errorList.length > 0) {
    return Promise.reject(
      `Transactions.refundTransaction() is missing {${errorList}} param(s)`
    );
  }
  return ajxPromise.post(`/charges/${chargeId}/refund`, params);
};

/**
 * Handles the capture transaction request
 * @param {string|number} chargeId
 * @param {object} params
 * @returns {promise}
 */
export const captureTransaction = (chargeId, params) => {
  const requiredParams = ['chargeId', 'amount'];
  const errorList = validateParams({ ...params, chargeId }, requiredParams);
  // Check the required params are valid
  if (errorList.length > 0) {
    return Promise.reject(
      `Transactions.captureTransaction() is missing {${errorList}} param(s)`
    );
  }
  return ajxPromise.post(`/charges/${chargeId}/capture`, params);
};

/**
 * Handles the transaction logs data request
 * @param {object} params
 * @returns {promise}
 */
export const getTransactionLogs = params => {
  const requiredParams = [
    'chargeId',
    'fromDate',
    'toDate',
    'sortField',
    'sortOrder',
    'pageSize',
    'startIndex',
  ];

  const errorList = validateParams(params, requiredParams);

  // Check the required params are valid
  if (errorList.length > 0) {
    return Promise.reject(
      `Transactions.getTransactionLogs() is missing {${errorList}} param(s)`
    );
  }

  let chargeId = params.chargeId.toString();
  let date = `fromDate=${params.fromDate}&toDate=${params.toDate}`;
  let pageSize = `pageSize=${params.pageSize}`;
  let sortColumn = `sortColumn=${params.sortField}`;
  let sortOrder = `sortOrder=${params.sortOrder}`;
  let startIndex = `startIndex=${params.startIndex}`;

  let urlPaths = `${date}&${pageSize}&${sortColumn}&${sortOrder}&${startIndex}`;
  return ajxPromise.get(`/transactions/${chargeId}/logs?${urlPaths}`);
};

/**
 * Gets the transaction response codes
 * @param {object} params
 * @returns {promise}
 */
export const getResponseCodes = (accountId, businessId, fromDate, toDate) => {
  const requiredParams = ['accountId', 'businessId', 'fromDate', 'toDate'];
  const errorList = validateParams(
    { accountId, businessId, fromDate, toDate },
    requiredParams
  );

  // Check the required params are valid
  if (errorList.length > 0) {
    return Promise.reject(
      `Transactions.getResponseCodes() is missing {${errorList}} param(s)`
    );
  }

  let accountParams = `accountId=${accountId}&businessId=${businessId}`;
  let dateParams = `fromDate=${fromDate}&toDate=${toDate}`;
  return ajxPromise.get(
    `/transactions/gateway-response/codes?${accountParams}&${dateParams}`
  );
};
