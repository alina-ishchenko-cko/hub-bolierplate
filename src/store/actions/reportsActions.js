// @flow
import { REPORTS } from 'store/constants';
import * as ReportsAPI from 'services/resources/reports.api';
import { dispatchResponse } from 'utils/action.util';

/**
 * Action to get the list of reports
 */
export function getAllReports() {
  const promiseReq = ReportsAPI.getAllReports();
  const { PENDING, SUCCESS, ERROR } = REPORTS.ALL;
  return dispatchResponse(promiseReq, PENDING, { type: SUCCESS }, ERROR);
}

/**
 * Action to generate reports
 * @param {object} reportsData payload to the request (e.g. date, reports list)
 */
export function generateReports(reportsData: Object) {
  const promiseReq = ReportsAPI.generateReports(reportsData);
  const { PENDING, SUCCESS, ERROR } = REPORTS.GENERATE;
  return dispatchResponse(promiseReq, PENDING, { type: SUCCESS }, ERROR);
}
