// @flow
// import {
//   TRANSACTIONS,
//   TRANSACTION_ACTIONS,
//   TRANSACTION_BLACKLIST,
// } from 'store/constants';
import * as ACTIONS from 'store/constants';
import * as TransactionDetailsAPI from 'services/resources/transactions.api';
import {
  dispatchResponse,
  getEntity,
  dispatchBatchResponse,
} from 'utils/action.util';

const TRANSACTIONS = ACTIONS.TRANSACTIONS;
const TRANSACTION_ACTIONS = ACTIONS.TRANSACTION_ACTIONS;
const TRANSACTION_BLACKLIST = ACTIONS.TRANSACTION_BLACKLIST;

/**
 * Action to get the transaction details given a charge id
 * @param {string} chargeId transaction charge id
 * @returns {function}
 */
export function getTransactionDetails(
  chargeId: string,
  isBatch: boolean = false
) {
  const { PENDING, SUCCESS, ERROR } = TRANSACTIONS[
    isBatch ? 'BATCH' : 'SINGLE'
  ];
  const promiseReq = TransactionDetailsAPI.getTransactionDetails(chargeId);
  return dispatchResponse(promiseReq, PENDING, { type: SUCCESS }, ERROR);
}

/**
 * Action to get the transaction details given a charge id
 * @param {string} chargeId transaction charge id
 * @returns {function}
 */
export function getTransactionBlacklist(
  chargeId: string,
  isList: boolean = false
) {
  const { PENDING, SUCCESS, ERROR } = TRANSACTION_BLACKLIST;
  const promiseReq = TransactionDetailsAPI.getTransactionBlacklist(chargeId);
  return dispatchResponse(
    promiseReq,
    PENDING,
    { type: SUCCESS, isList },
    ERROR
  );
}

/**
 * Action to void the transaction corresponding to the charge id
 * @param {string} chargeId transaction charge id
 * @param {object} params parameters to send via an api call
 * @returns {function}
 */
export function voidTransaction(chargeId: string, params: Object) {
  const { PENDING, SUCCESS, ERROR } = TRANSACTION_ACTIONS.VOID;
  const promiseReq = TransactionDetailsAPI.voidTransaction(chargeId, params);
  return dispatchResponse(promiseReq, PENDING, { type: SUCCESS }, ERROR);
}

export function batchVoid(batchParams: Array<Object>) {
  const { PENDING, SUCCESS, ERROR } = TRANSACTION_ACTIONS.VOID_BATCH;
  const promiseReq = TransactionDetailsAPI.voidTransaction;
  const config = {
    pending: PENDING,
    success: SUCCESS,
    error: ERROR,
  };
  return dispatchBatchResponse(promiseReq, batchParams, config);
}

/**
 * Action to capture the transaction corresponding to the charge id
 * @param {string} chargeId transaction charge id
 * @param {object} params parameters to send via an api call
 * @returns {function}
 */
export function captureTransaction(chargeId: string, params: Object) {
  const { PENDING, SUCCESS, ERROR } = TRANSACTION_ACTIONS.CAPTURE;
  const promiseReq = TransactionDetailsAPI.captureTransaction(chargeId, params);
  return dispatchResponse(promiseReq, PENDING, { type: SUCCESS }, ERROR);
}

export function batchCapture(batchParams: Array<Object>) {
  const { PENDING, SUCCESS, ERROR } = TRANSACTION_ACTIONS.CAPTURE_BATCH;
  const promiseReq = TransactionDetailsAPI.captureTransaction;
  const config = {
    pending: PENDING,
    success: SUCCESS,
    error: ERROR,
  };
  return dispatchBatchResponse(promiseReq, batchParams, config);
}

export function clearBatch() {
  return {
    type: TRANSACTIONS.BATCH.CLEAR,
  };
}

/**
 * Action to refund the transaction corresponding to the charge id
 * @param {string} chargeId transaction charge id
 * @param {object} params parameters to send via an api call
 * @returns {function}
 */
export function refundTransaction(chargeId: string, params: Object) {
  const { PENDING, SUCCESS, ERROR } = TRANSACTION_ACTIONS.REFUND;
  const promiseReq = TransactionDetailsAPI.refundTransaction(chargeId, params);
  return dispatchResponse(promiseReq, PENDING, { type: SUCCESS }, ERROR);
}

export function batchRefund(batchParams: Array<Object>) {
  const { PENDING, SUCCESS, ERROR } = TRANSACTION_ACTIONS.REFUND_BATCH;
  const promiseReq = TransactionDetailsAPI.refundTransaction;
  const config = {
    pending: PENDING,
    success: SUCCESS,
    error: ERROR,
  };
  return dispatchBatchResponse(promiseReq, batchParams, config);
}

/**
 * Blacklist the specified data related to the transaction corresponding to the charge id
 * @param {string} chargeId transaction charge id
 * @param {object} data data to blacklist
 * @returns {function}
 */
export function blacklistTransaction(chargeId: string, data: Object) {
  const entity = getEntity(data);
  const paramsObj = {
    entityId: entity.id,
    entityTypeId: entity.typeId,
    ...data,
  };

  const { PENDING, SUCCESS, ERROR } = TRANSACTION_ACTIONS.BLACKLIST;
  const promiseReq = TransactionDetailsAPI.blacklistTransaction(
    chargeId,
    paramsObj
  );
  return dispatchResponse(promiseReq, PENDING, { type: SUCCESS }, ERROR);
}
