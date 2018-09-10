import { ajxPromise, getCurrencyId } from 'services/appRequest';
import { validateParams } from 'utils/api.util';

type ParamObj = {
  fromDate: string,
  toDate: string,
  entityTypeId: number,
  entityId: number,
};
/**
 * Gets the KPI data - /customers/overview/indicators
 * @param {any} dataParam - { fromDate, toDate, entityTypeId, entityId }
 * @returns {promise}
 */
export function getIndicators(dataParam: ParamObj): Promise<any> {
  let currencyId = getCurrencyId();
  const requiredParams = ['fromDate', 'toDate', 'entityTypeId', 'entityId'];
  const errorList = validateParams(dataParam, requiredParams, currencyId);

  // Check the required params are valid
  if (errorList.length > 0) {
    return Promise.reject(
      `Customers.getIndicators() is missing {${errorList}} param(s)`
    );
  }

  currencyId = `currencyId=${currencyId}`;
  let entity = `entityId=${dataParam.entityId}&entityTypeId=${
    dataParam.entityTypeId
  }`;
  let date = `fromDate=${dataParam.fromDate}&toDate=${dataParam.toDate}`;

  // Make the Ajax request and return promise object
  return ajxPromise.get(
    `/customers/overview/indicators?${currencyId}&${entity}&${date}`
  );
}

/**
 * Gets the KPI data
 * @param {any} dataParam
 * @returns {promise}
 */
type GetAllParams = {
  fromDate: string,
  toDate: string,
  entityTypeId: number,
  entityId: number,
  sortField: string,
  sortOrder: string,
  pageSize: number,
  startIndex: number,
  search: ?string,
};

export function getAll(dataParam: GetAllParams): Promise<any> {
  const requiredParams = [
    'entityId',
    'entityTypeId',
    'fromDate',
    'toDate',
    'sortField',
    'sortOrder',
    'pageSize',
    'startIndex',
  ];
  let currencyId: string = getCurrencyId();

  const errorList = validateParams(dataParam, requiredParams, currencyId);

  // Check the required params are valid
  if (errorList.length > 0) {
    return Promise.reject(
      `Customers.getAll() is missing {${errorList}} param(s)`
    );
  }

  currencyId = `currencyId=${currencyId}`;
  let entity = `entityId=${dataParam.entityId}&entityTypeId=${
    dataParam.entityTypeId
  }`;
  let date = `fromDate=${dataParam.fromDate}&toDate=${dataParam.toDate}`;
  let pageSize = `pageSize=${dataParam.pageSize}`;
  let sortColumn = `sortColumn=${dataParam.sortField}`;
  let sortOrder = `sortOrder=${dataParam.sortOrder}`;
  let startIndex = `startIndex=${dataParam.startIndex}`;

  let urlPaths = `${currencyId}&${entity}&${date}&${pageSize}&${sortColumn}&${sortOrder}&${startIndex}`;

  // Optional Params
  if (dataParam.search) {
    urlPaths += `&search=${dataParam.search}`;
  }

  if (dataParam.filter) {
    urlPaths += `&filter=${JSON.stringify(dataParam.filter)}`;
  }

  return ajxPromise.get(`/customers/overview?${urlPaths}`);
}

/**
 * Gets customer's details
 * @param {any} dataParam
 * @returns {promise}
 */
type GetDetailsParams = {
  entityTypeId: number,
  entityId: number,
  customerId: number,
};
export function getCustomerDetails(dataParam: GetDetailsParams): Promise<any> {
  let currencyId = getCurrencyId();
  const requiredParams = ['entityId', 'entityTypeId', 'customerId'];
  const errorList = validateParams(dataParam, requiredParams, currencyId);

  // Check the required params are valid
  if (errorList.length > 0) {
    return Promise.reject(
      `Customers.getCustomerDetails() is missing {${errorList}} param(s)`
    );
  }

  let customerId = dataParam.customerId;
  currencyId = `currencyId=${currencyId}`;
  let entity = `entityId=${dataParam.entityId}&entityTypeId=${
    dataParam.entityTypeId
  }`;
  return ajxPromise.get(`/customers/${customerId}?${currencyId}&${entity}`);
}

/**
 * Gets customer's transaction details
 * @param {any} dataParam
 * @returns {promise}
 */
type GetCustTransParams = {
  entityTypeId: number,
  entityId: number,
  customerId: number,
  limit: number,
  startIndex: number,
};
export function getCustomerTransactions(
  dataParam: GetCustTransParams
): Promise<any> {
  const requiredParams = [
    'entityId',
    'entityTypeId',
    'limit',
    'startIndex',
    'customerId',
  ];
  const errorList = validateParams(dataParam, requiredParams);

  // Check the required params are valid
  if (errorList.length > 0) {
    return Promise.reject(
      `Customers.getCustomerTransactions() is missing {${errorList}} param(s)`
    );
  }

  let customerId = dataParam.customerId;
  let entity = `entityId=${dataParam.entityId}&entityTypeId=${
    dataParam.entityTypeId
  }`;
  let limit = `limit=${dataParam.limit}`;
  let startIndex = `startIndex=${dataParam.startIndex}`;

  return ajxPromise.get(
    `/customers/${customerId}/transactions?${entity}&${limit}&${startIndex}`
  );
}

/**
 * Update customer's details
 * @param {number|string} customerId
 * @param {number|string} email
 * @param {number|string} name
 * @param {number|string} phone
 * @returns {promise}
 */
export function updateCustomerDetails(
  customerId: number,
  email: string,
  name: string,
  phone: Object
): Promise<Object> {
  const requiredParams = ['customerId', 'email', 'name'];
  const errorList = validateParams({ customerId, email, name }, requiredParams);
  if (errorList.length > 0) {
    return Promise.reject(
      `Customers.updateCustomerDetails() is missing {${errorList}} param(s)`
    );
  }
  return ajxPromise.put(`/customers/${customerId}`, {
    email,
    name,
    phone,
  });
}

/**
 * Add new card
 * @param {string} customerId
 * @param {Object} card
 * @param {number} channelId
 * @returns {promise}
 */
export function addCreditCard(
  customerId: string,
  card: string,
  channelId: number | string
): Promise<Object> {
  const requiredParams = ['customerId', 'card', 'channelId'];
  const errorList = validateParams(
    { customerId, card, channelId },
    requiredParams
  );
  if (errorList.length > 0) {
    return Promise.reject(
      `Customers.addCreditCard() is missing {${errorList}} param(s)`
    );
  }
  return ajxPromise.post(`/customers/${customerId}/cards`, {
    card,
    channelId,
  });
}

/**
 * Updates customers details - /customers/cust_${customerId}/cards/${cardId}
 * @param {string} cardId
 * @param {string} customerId
 * @param {number} accountId
 * @returns {promise}
 */
export function updateCardDetails(
  cardId: string,
  customerId: string,
  accountId: number,
  data: any
): Promise<any> {
  const requiredParams = ['cardId', 'customerId', 'accountId'];
  const checkParams = { cardId, customerId, accountId };
  const errorList = validateParams(checkParams, requiredParams);

  // Check the required params are valid
  if (errorList.length > 0) {
    return Promise.reject(
      `Customers.updateCardDetails() is missing {${errorList}} param(s)`
    );
  }

  return ajxPromise.put(`/customers/${customerId}/cards/${cardId}`, {
    accountId,
    ...data,
  });
}

/**
 * Sets a credit card as the default customer card - /customers/cust_${customerId}/cards/${cardId}/default
 * @param {string} cardId
 * @param {string} customerId
 * @param {number} merchantAccountId
 * @returns {promise}
 */
export function setDefaultCard(
  cardId: string,
  customerId: string,
  merchantAccountId: number
): Promise<any> {
  const requiredParams = ['cardId', 'customerId', 'merchantAccountId'];
  const checkParams = { cardId, customerId, merchantAccountId };
  const errorList = validateParams(checkParams, requiredParams);

  // Check the required params are valid
  if (errorList.length > 0) {
    return Promise.reject(
      `Customers.setDefaultCard() is missing {${errorList}} param(s)`
    );
  }

  // Remove 'cust_' to avoid duplication
  customerId = customerId.replace('cust_', '');

  return ajxPromise.put(
    `/customers/cust_${customerId}/cards/${cardId}/default`,
    { merchantAccountId }
  );
}

/**
 * Delete customers credit card  - /customers/cust_${customerId}/cards/${cardId}
 * @param {string} cardId
 * @param {string} customerId
 * @returns {promise}
 */
export function deleteCard(cardId: string, customerId: string): Promise<any> {
  const requiredParams = ['cardId', 'customerId'];
  const checkParams = { cardId, customerId };
  const errorList = validateParams(checkParams, requiredParams);

  // Check the required params are valid
  if (errorList.length > 0) {
    return Promise.reject(
      `Customers.deleteCard() is missing {${errorList}} param(s)`
    );
  }

  // Remove 'cust_' to avoid duplication
  customerId = customerId.replace('cust_', '');

  return ajxPromise.delete(`/customers/cust_${customerId}/cards/${cardId}`);
}
