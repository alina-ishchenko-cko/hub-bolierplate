// @flow
import { INDICATORS_TYPE, SUMMARY_TYPE } from 'store/constants';
import * as DashboadAPI from 'services/basics/dashboard.api';
import { dispatchResponse, getEntity } from 'utils/action.util';

/**
 * Action to get the KPI cards data
 * @param {object} accountsData
 * @returns {function}
 */
export function getIndicators(accountsData: Object): Promise<any> {
  const { PENDING, SUCCESS, ERROR } = INDICATORS_TYPE;
  const entity = getEntity(accountsData);
  const paramsObj = {
    entityId: entity.id,
    entityTypeId: entity.typeId,
    fromDate: accountsData.fromDate.toISOString(),
    toDate: accountsData.toDate.toISOString(),
  };
  const promiseReq = DashboadAPI.getIndicators(paramsObj);
  return dispatchResponse(promiseReq, PENDING, { type: SUCCESS }, ERROR);
}

/**
 * Action to get the dashboard table summary
 * @param {object} accountsData
 * @returns {function}
 */
export function getSummary(accountsData: Object): Promise<any> {
  const { PENDING, SUCCESS, ERROR } = SUMMARY_TYPE;
  const entity = getEntity(accountsData);
  const paramsObj = {
    entityId: entity.id,
    entityTypeId: entity.typeId,
    fromDate: accountsData.fromDate.toISOString(),
    toDate: accountsData.toDate.toISOString(),
  };
  const promiseReq = DashboadAPI.getSummary(paramsObj);
  return dispatchResponse(promiseReq, PENDING, { type: SUCCESS }, ERROR);
}
