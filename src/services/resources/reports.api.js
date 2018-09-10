import { ajxPromise } from 'services/appRequest';
import { validateParams } from 'utils/api.util';

/**
 * Get the list of reports via an api call
 */
export const getAllReports = () => ajxPromise.get('/query/reports');

/**
 * Generate reports via an api call
 * @param {object} params payload to the request (e.g. date, reports list)
 */
export const generateReports = params => {
  const requiredParams = [
    'entityTypeId',
    'entityId',
    'fromDate',
    'toDate',
    'reports'
  ];
  const errorList = validateParams(params, requiredParams);
  if (errorList.length > 0) {
    return Promise.reject(
      `Reports.generateReports() is missing {${errorList}} param(s)`
    );
  }
  return ajxPromise.post(`/query/reports`, params);
};
