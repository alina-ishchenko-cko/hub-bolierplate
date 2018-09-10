import { ajxPromise } from 'services/appRequest';
import { validateParams } from 'utils/api.util';

/**
 * Gets the selected business payment plan list
 * @param {string|number} entityId
 * @param {string|number} entityTypeId
 * @param {string|number} pageSize page size
 * @param {string|number} startIndex starting index
 * @return {promise}
 */
export const getPaymentPlanList = (
  entityId,
  entityTypeId,
  pageSize = 10,
  startIndex = 0
) => {
  const requiredParams = ['entityId', 'entityTypeId', 'pageSize', 'startIndex'];
  const paramsList = { entityId, entityTypeId, pageSize, startIndex };
  const errorList = validateParams(paramsList, requiredParams);
  if (errorList.length > 0) {
    return Promise.reject(
      `PaymentPlan.getPaymentPlanList() is missing {${errorList}} param(s)`
    );
  }

  let entity = `entityId=${entityId}&entityTypeId=${entityTypeId}`;
  let params = `pageSize=${pageSize}&startIndex=${startIndex}`;

  return ajxPromise.get(`/recurringPayments/plans?${entity}&${params}`);
};

/**
 * Update payment plan list
 * @param {string|number} payplanId payment plan id
 * @param {object} data
 * @return {promise}
 */
export const updatePaymentPlan = (payplanId, data) => {
  const requiredParams = [
    'payplanId',
    'autoCapTime',
    'name',
    'planTrackId',
    'status',
    'value',
  ];
  const errorList = validateParams({ payplanId, ...data }, requiredParams);
  if (errorList.length > 0) {
    return Promise.reject(
      `PaymentPlan.updatePaymentPlan() is missing {${errorList}} param(s)`
    );
  }

  return ajxPromise.put(`/recurringPayments/plans/${payplanId}`, data);
};

/**
 * Handles the payment plan options request
 * @param {string|number} entityId
 * @param {string|number} entityTypeId
 * @return {promise}
 */
export const getPaymentPlanOptions = (entityId, entityTypeId) => {
  const requiredParams = ['entityId', 'entityTypeId'];
  const errorList = validateParams({ entityId, entityTypeId }, requiredParams);
  if (errorList.length > 0) {
    return Promise.reject(
      `PaymentPlan.getPaymentPlanOptions() is missing {${errorList}} param(s)`
    );
  }

  return ajxPromise.get(
    `/recurringPayments?entityId=${entityId}&entityTypeId=${entityTypeId}`
  );
};

/**
 * Handles the associated payment plans request - /recurringPayments/customers/cust_{customerId}
 * @param {string|number} customerId
 * @return {promise}
 */
export const getAssociatedPaymentPlans = customerId => {
  if (customerId === void 0) {
    return Promise.reject(
      'PaymentPlan.getAssociatedPaymentPlans() is missing {customerId} param'
    );
  }
  return ajxPromise.get(`/recurringPayments/customers/${customerId}`);
};

/**
 * Handles the create payment plan request - /recurringPayments/customers/cp_{customerPlanId}
 * @param {string|number} customerPlanId
 * @param {object} data
 * @param {boolean} isEdit
 * @return {promise}
 */
export const changePaymentPlan = (customerPlanId, data, isEdit = false) => {
  const requiredParams = ['customerPlanId', 'channelId', 'status'];
  if (isEdit) requiredParams.push('cardId');
  const errorList = validateParams({ ...data, customerPlanId }, requiredParams);
  if (errorList.length > 0) {
    return Promise.reject(
      `PaymentPlan.changePaymentPlan() is missing {${errorList}} param(s)`
    );
  }
  return ajxPromise.put(`/recurringPayments/customers/${customerPlanId}`, data);
};

/**
 * Handles the create payment plan request
 * @param {string|number} customerPlanId
 * @param {string|number} channelId
 * @param {string|number} status
 * @return {promise}
 */
export const changePaymentPlanStatus = (customerPlanId, channelId, status) => {
  return changePaymentPlan(customerPlanId, { channelId, status });
};

/**
 * Handles the edit payment plan request
 * @param {string|number} customerPlanId
 * @param {string|number} channelId
 * @param {string|number} status
 * @param {string|number} cardId
 * @return {promise}
 */
export const editPaymentPlan = (customerPlanId, channelId, status, cardId) => {
  return changePaymentPlan(customerPlanId, { channelId, status, cardId }, true);
};

/**
 * Handles the delete payment plan request
 * @param {string|number} customerPlanId
 * @return {promise}
 */
export const deletePaymentPlan = customerPlanId => {
  if (customerPlanId === void 0) {
    return Promise.reject(
      'PaymentPlan.deletePaymentPlan() is missing {customerPlanId} param'
    );
  }
  return ajxPromise.delete(`/recurringPayments/customers/${customerPlanId}`);
};

/**
 * Handles the add payment plan request
 * @param {string|number} customerId
 * @param {string|number} cardId
 * @param {string|number} channelId
 * @param {string|number} planId
 * @return {promise}
 */
export const addPaymentPlan = (customerId, cardId, channelId, planId) => {
  const requiredParams = ['customerId', 'cardId', 'channelId', 'planId'];
  const errorList = validateParams(
    { customerId, cardId, channelId, planId },
    requiredParams
  );
  if (errorList.length > 0) {
    return Promise.reject(
      `PaymentPlan.addPaymentPlan() is missing {${errorList}} param(s)`
    );
  }
  return ajxPromise.post(`/recurringPayments/customers/cust_${customerId}`, {
    cardId,
    channelId,
    planId,
  });
};
