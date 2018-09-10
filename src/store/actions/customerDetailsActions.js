// @flow
import { CUSTOMERS, CUSTOMERS_ACTIONS } from 'store/constants';
import * as CustomersAPI from 'services/resources/customers.api';
import * as PaymentPlanAPI from 'services/resources/payment-plans.api';
import * as TransactionsAPI from 'services/resources/transactions.api';
import { dispatchResponse, getEntity } from 'utils/action.util';
import { IAction } from './flow-type';

/**
 * Action to get the customers details
 * @param {object} customerData
 * @returns {function}
 */
export function getCustomerDetails(customerData: Object) {
  const { PENDING, SUCCESS, ERROR } = CUSTOMERS.SINGLE;
  const entity = getEntity(customerData);
  const detailsRequestParams = {
    entityId: entity.id,
    entityTypeId: entity.typeId,
    customerId: customerData.customerId,
  };
  const promiseReq = CustomersAPI.getCustomerDetails(detailsRequestParams);
  return dispatchResponse(promiseReq, PENDING, { type: SUCCESS }, ERROR);
}

/**
 * Action to get the customers transactions
 * @param {object} dataObj
 * @returns {function}
 */
export function getCustomerTransactions(
  customerTransactionsData: Object,
  resetBeforeLoading: boolean
) {
  const { PENDING, SUCCESS, ERROR } = CUSTOMERS.TRANSACTIONS;
  const entity = getEntity(customerTransactionsData);
  const detailsRequestParams = {
    entityId: entity.id,
    entityTypeId: entity.typeId,
    customerId: customerTransactionsData.customerId,
    limit: customerTransactionsData.limit,
    startIndex: customerTransactionsData.startIndex,
  };
  const promiseReq = CustomersAPI.getCustomerTransactions(detailsRequestParams);
  return dispatchResponse(
    promiseReq,
    { type: PENDING, resetBeforeLoading },
    { type: SUCCESS },
    ERROR
  );
}

/**
 * Action to update the customers card details
 * @param {string} cardId card id
 * @param {string} customerId  customer id
 * @param {number} accountId aka
 * @returns {function}
 */
export function updateCardDetails(
  cardId: string,
  customerId: string,
  accountId: string,
  data: Object
) {
  const { PENDING, SUCCESS, ERROR } = CUSTOMERS.CARD_UPDATE;
  const promiseReq = CustomersAPI.updateCardDetails(
    cardId,
    customerId,
    accountId,
    data
  );
  return dispatchResponse(promiseReq, PENDING, { type: SUCCESS }, ERROR);
}

/**
 * Action to set a default associated card
 * @param {string} cardId card id
 * @param {string} customerId  customer id
 * @param {number} accountId aka
 * @returns {function}
 */
export function setDefaultCard(
  cardId: string,
  customerId: string,
  accountId: string | number
) {
  const { PENDING, SUCCESS, ERROR } = CUSTOMERS.CARD_DEFAULT;
  const promiseReq = CustomersAPI.setDefaultCard(cardId, customerId, accountId);
  return dispatchResponse(
    promiseReq,
    PENDING,
    { type: SUCCESS, cardId },
    ERROR
  );
}

/**
 * Action to delete an associated card
 * @param {string} cardId
 * @param {string} customerId
 * @returns {function}
 */
export function deleteCard(cardId: string, customerId: string) {
  const { PENDING, SUCCESS, ERROR } = CUSTOMERS.CARD_DELETE;
  const promiseReq = CustomersAPI.deleteCard(cardId, customerId);
  return dispatchResponse(
    promiseReq,
    PENDING,
    { type: SUCCESS, cardId },
    ERROR
  );
}

export function resetCustomerTransactions(): IAction {
  return {
    type: CUSTOMERS.TRANSACTIONS.RESET,
  };
}

/**
 * Action to get the associated payment plans of a customer
 * @param {string} customerId customer id
 */
export function getAssociatedPaymentPlans(customerId: string) {
  const { PENDING, SUCCESS, ERROR } = CUSTOMERS.PAYMENT_PLANS;
  const promiseReq = PaymentPlanAPI.getAssociatedPaymentPlans(customerId);
  return dispatchResponse(promiseReq, PENDING, { type: SUCCESS }, ERROR);
}

/**
 * Action to change the status of a payment plan
 * @param {string} customerPlanId customer payment plan id
 * @param {number} channelId channel id
 * @param {number} status new payment plan status
 */
export function changePaymentPlanStatus(
  customerPlanId: string,
  channelId: string,
  status: number
) {
  const {
    PENDING,
    SUCCESS,
    ERROR,
  } = CUSTOMERS.PAYMENT_PLANS_ACTIONS.CHANGE_STATUS;
  const promiseReq = PaymentPlanAPI.changePaymentPlanStatus(
    customerPlanId,
    channelId,
    status
  );
  return dispatchResponse(promiseReq, PENDING, { type: SUCCESS }, ERROR);
}

/**
 * Action to delete a payment plan
 * @param {string} customerPlanId customer payment plan id
 */
export function deletePaymentPlan(customerPlanId: string) {
  const { PENDING, SUCCESS, ERROR } = CUSTOMERS.PAYMENT_PLANS_ACTIONS.DELETE;
  const promiseReq = PaymentPlanAPI.deletePaymentPlan(customerPlanId);
  return dispatchResponse(promiseReq, PENDING, { type: SUCCESS }, ERROR);
}

/**
 * Action to edit a payment plan (status and card)
 * @param {string} customerPlanId customer payment plan id
 * @param {number} channelId channel id
 * @param {number} status payment plan status code
 * @param {string} cardId id of the card associated with the payment plan
 */
export function editPaymentPlan(
  customerPlanId: string,
  channelId: string,
  status: number,
  cardId: string
) {
  const { PENDING, SUCCESS, ERROR } = CUSTOMERS.PAYMENT_PLANS_ACTIONS.EDIT;
  const promiseReq = PaymentPlanAPI.editPaymentPlan(
    customerPlanId,
    channelId,
    status,
    cardId
  );
  return dispatchResponse(promiseReq, PENDING, { type: SUCCESS }, ERROR);
}

/**
 * Action to update the customer details
 * @param {string} customerId customer id
 * @param {string} email customer email
 * @param {string} name customer name
 * @param {object} phone customer phone object
 */
export function updateCustomerDetails(
  customerId: string,
  email: string,
  name: string,
  phone: Object
) {
  const { PENDING, SUCCESS, ERROR } = CUSTOMERS_ACTIONS.UPDATE_DETAILS;
  const promiseReq = CustomersAPI.updateCustomerDetails(
    customerId,
    email,
    name,
    phone
  );
  return dispatchResponse(promiseReq, PENDING, { type: SUCCESS }, ERROR);
}

/**
 * Action to create a charge
 * @param {object} data Payment data (cardId, channelId, ...)
 */
export function createCharges(data: Object) {
  const { PENDING, SUCCESS, ERROR } = CUSTOMERS_ACTIONS.CREATE_PAYMENT;
  const promiseReq = TransactionsAPI.createCharges(data);
  return dispatchResponse(promiseReq, PENDING, { type: SUCCESS }, ERROR);
}

/**
 * Action to clear the create payment data
 */
export const clearCharges = () => {
  return {
    type: CUSTOMERS_ACTIONS.CREATE_PAYMENT.CLEAR,
  };
};

/**
 * Action to add a credit card to a customer
 * @param {string} customerId customer id
 * @param {object} card customer credit card information
 * @param {number} channelId channel id
 */
export function addCreditCard(
  customerId: string,
  card: string,
  channelId: number | string
) {
  const { PENDING, SUCCESS, ERROR } = CUSTOMERS_ACTIONS.ADD_CREDIT_CARD;
  const promiseReq = CustomersAPI.addCreditCard(customerId, card, channelId);
  return dispatchResponse(promiseReq, PENDING, { type: SUCCESS }, ERROR);
}

/**
 * Action to add a payment plan to a customer
 * @param {string} customerId customer id
 * @param {string} cardId card id
 * @param {number} channelId channel id
 * @param {string} planId plan id
 */
export function addPaymentPlan(
  customerId: string,
  cardId: string,
  channelId: string,
  planId: string
) {
  const { PENDING, SUCCESS, ERROR } = CUSTOMERS_ACTIONS.ADD_PAYMENT_PLAN;
  const promiseReq = PaymentPlanAPI.addPaymentPlan(
    customerId,
    cardId,
    channelId,
    planId
  );
  return dispatchResponse(promiseReq, PENDING, { type: SUCCESS }, ERROR);
}
