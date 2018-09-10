// @flow
import * as ACTIONS from 'store/constants';
import * as TransactionAPI from 'services/resources/transactions.api';
import { dispatchResponse, getEntity } from 'utils/action.util';
import { IAction } from './flow-type';

const TRANSACTIONS = ACTIONS.TRANSACTIONS;
const CHARGES = ACTIONS.CHARGES;

/**
 * Action to get the transaction KPI data
 * @param {object} accountsData
 * @returns {function}
 */
export function getIndicators(accountsData: Object) {
  const entity = getEntity(accountsData);
  const paramsObj = {
    entityId: entity.id,
    entityTypeId: entity.typeId,
    fromDate: accountsData.fromDate.toISOString(),
    toDate: accountsData.toDate.toISOString(),
  };
  const promiseReq = TransactionAPI.getIndicators(paramsObj);
  const { PENDING, SUCCESS, ERROR } = TRANSACTIONS.INDICATORS;

  return dispatchResponse(promiseReq, PENDING, { type: SUCCESS }, ERROR);
}

/**
 * Action to get all transaction list data
 * @param {object} dataObj
 * @returns {function}
 */
export function getAll(dataObj: Object) {
  const entity = getEntity(dataObj);
  const { PENDING, SUCCESS, ERROR } = TRANSACTIONS.ALL;

  const paramObj = {
    ...dataObj,
    entityId: entity.id,
    entityType: entity.type,
    fromDate: dataObj.fromDate.toISOString(),
    toDate: dataObj.toDate.toISOString(),
    sortColumn: dataObj.sortColumn || 'timestamp',
    sortOrder: dataObj.sortOrder || 'desc',
    pageSize: dataObj.pageSize || 10,
    startIndex: dataObj.startIndex || 0,
  };

  const promiseReq = TransactionAPI.getAll(paramObj);
  return dispatchResponse(
    promiseReq,
    PENDING,
    { type: SUCCESS },
    ERROR,
    true,
    true
  );
}

/**
 * Action to create charges request /charges
 * @param {object} dataObj
 * @returns {function}
 */
export function createCharges(dataObj: Object) {
  const { PENDING, SUCCESS, ERROR } = CHARGES.CREATE;
  const promiseReq = TransactionAPI.createCharges(dataObj);
  return dispatchResponse(promiseReq, PENDING, { type: SUCCESS }, ERROR);
}

/**
 * Action to fetch the transaction logs
 * @param {object} dataObj
 * @returns {function}
 */
export function getTransactionLogs(dataObj: Object) {
  const { PENDING, SUCCESS, ERROR } = TRANSACTIONS.LOGS;
  const chargeId = dataObj.chargeId;
  const paramObj = {
    chargeId,
    fromDate: dataObj.fromDate.toISOString(),
    toDate: dataObj.toDate.toISOString(),
    sortField: dataObj.sortField,
    sortOrder: dataObj.sortOrder === 'descend' ? 'desc' : 'asc',
    pageSize: dataObj.pageSize,
    startIndex: dataObj.startIndex,
  };

  const promiseReq = TransactionAPI.getTransactionLogs(paramObj);
  return dispatchResponse(
    promiseReq,
    PENDING,
    { type: SUCCESS, chargeId },
    ERROR
  );
}

/**
 * Action to clear all the transaction charges
 * @returns {object}
 */
export function clearCharges(): IAction {
  return {
    type: CHARGES.CLEAR,
  };
}

/**
 * Action to fetch the transaction response codes
 * @param {object} dataObj
 * @returns {function}
 */
export function getResponseCodes(
  accountId: string | number,
  businessId: string | number,
  fromDate: Object,
  toDate: Object
) {
  fromDate = fromDate.toISOString();
  toDate = toDate.toISOString();

  const { PENDING, SUCCESS, ERROR } = TRANSACTIONS.RESPONSECODES;
  const promiseReq = TransactionAPI.getResponseCodes(
    accountId,
    businessId,
    fromDate,
    toDate
  );
  return dispatchResponse(promiseReq, PENDING, { type: SUCCESS }, ERROR);
}

export function setTransactionAction(actionData: Object) {
  return {
    type: TRANSACTIONS.SET_TRANSACTION_ACTION,
    data: {
      type: actionData.type,
      value: actionData.value,
    },
  };
}
