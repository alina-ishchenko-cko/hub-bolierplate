// @flow
import { PAYMENT_TYPE, PAYMENT_PLAN } from 'store/constants';
import * as PaymentPlanAPI from 'services/resources/payment-plans.api';
import { dispatchResponse, getEntity } from 'utils/action.util';

/**
 * Action to get the payment plan options
 * @param {object} accountsData
 * @returns {function}
 */
export function getPaymentPlanOptions(accountsData: Object) {
  const entity = getEntity(accountsData);
  const promiseReq = PaymentPlanAPI.getPaymentPlanOptions(
    entity.id,
    entity.typeId
  );
  const { PENDING, SUCCESS, ERROR } = PAYMENT_TYPE.OPTIONS;
  return dispatchResponse(promiseReq, PENDING, { type: SUCCESS }, ERROR);
}

/**
 * Action to get the payment plan list
 * @param {object} accountsData
 * @returns {function}
 */
export function getPaymentPlanList(
  accountsData: Object,
  pageSize: number = 10,
  startIndex: number = 0
) {
  const entity = getEntity(accountsData);
  const promiseReq = PaymentPlanAPI.getPaymentPlanList(
    entity.id,
    entity.typeId,
    pageSize,
    startIndex
  );
  const { PENDING, SUCCESS, ERROR } = PAYMENT_PLAN.ALL;
  return dispatchResponse(promiseReq, PENDING, { type: SUCCESS }, ERROR);
}

/**
 * Action to update payment plan
 * @param {object} accountsData
 * @returns {function}
 */
export function updatePaymentPlan(payplanId: string, data: Object = {}) {
  const promiseReq = PaymentPlanAPI.updatePaymentPlan(payplanId, data);
  const { PENDING, SUCCESS, ERROR } = PAYMENT_PLAN.UPDATE;
  return dispatchResponse(promiseReq, PENDING, { type: SUCCESS }, ERROR);
}
