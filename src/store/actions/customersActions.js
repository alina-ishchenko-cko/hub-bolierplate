import { CUSTOMERS } from 'store/constants';
import * as CustomersAPI from 'services/resources/customers.api';
import { dispatchResponse, getEntity } from 'utils/action.util';

/**
 * Action to get the customers KPI data
 * @param {object} accountsData
 * @returns {function}
 */
export function getIndicators(accountsData: Object) {
  const { id: entityId, typeId: entityTypeId } = getEntity(accountsData);
  const paramsObj = {
    entityId,
    entityTypeId,
    fromDate: accountsData.fromDate.toISOString(),
    toDate: accountsData.toDate.toISOString(),
  };
  const promiseReq = CustomersAPI.getIndicators(paramsObj);
  const { PENDING, SUCCESS, ERROR } = CUSTOMERS.INDICATORS;
  return dispatchResponse(promiseReq, PENDING, { type: SUCCESS }, ERROR);
}

/**
 * Action to get the customers table data
 * @param {object} dataObj
 * @returns {function}
 */
export function getAll(dataObj: Object) {
  const { id: entityId, typeId: entityTypeId } = getEntity(dataObj);
  const { PENDING, SUCCESS, ERROR } = CUSTOMERS.ALL;

  const paramObj = {
    entityId,
    entityTypeId,
    sortField: dataObj.sortColumn || 'timestamp',
    sortOrder: dataObj.sortOrder || 'desc',
    fromDate: dataObj.fromDate.toISOString(),
    toDate: dataObj.toDate.toISOString(),
    currentPage: dataObj.currentPage,
    pageSize: dataObj.pageSize,
    startIndex: dataObj.startIndex,
  };

  if (dataObj.search) {
    paramObj.search = dataObj.search;
  }

  if (dataObj.filter && dataObj.filter.length > 0) {
    paramObj.filter = dataObj.filter;
  }

  const promiseReq = CustomersAPI.getAll(paramObj);
  return dispatchResponse(
    promiseReq,
    PENDING,
    { type: SUCCESS },
    ERROR,
    true,
    true
  );
}
