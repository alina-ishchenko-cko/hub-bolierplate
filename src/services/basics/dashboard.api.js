import { ajxPromise, getCurrencyId } from 'services/appRequest';
import { validateParams } from 'utils/api.util';

type ParamObj = {
  fromDate: string,
  toDate: string,
  entityTypeId: string,
  entityId: string,
};

/**
 * Gets all dashboard KPI data - /dashboard/indicators?{currencyId}&{entity}&{date}
 * @param {object} dataParam - { entityId, entityTypeId, fromDate, toDate }
 * @returns {promise}
 */
export function getIndicators(dataParam: ParamObj): Promise<any> {
  let currencyId = getCurrencyId();
  const requiredParams = ['fromDate', 'toDate', 'entityTypeId', 'entityId'];
  const errorList = validateParams(dataParam, requiredParams, currencyId);

  // Return Promise reject if missing params
  if (errorList.length > 0) {
    return Promise.reject(
      `Dashboard.getIndicators() is missing {${errorList}} param(s)`
    );
  }

  currencyId = `currencyId=${currencyId}`;
  let entity = `entityId=${dataParam.entityId}&entityTypeId=${
    dataParam.entityTypeId
  }`;
  let date = `fromDate=${dataParam.fromDate}&toDate=${dataParam.toDate}`;

  // Make the Ajax request and return promise object
  return ajxPromise.get(
    `/dashboard/indicators?${currencyId}&${entity}&${date}`
  );
}

/**
 * Gets all dashboard table summary - /dashboard/indicators/summary?{currencyId}&{entity}&{date}
 * @param {object} dataParam - { entityId, entityTypeId, fromDate, toDate }
 * @returns {promise}
 */
export function getSummary(dataParam: ParamObj): Promise<any> {
  let currencyId = getCurrencyId();
  const requiredParams = ['fromDate', 'toDate', 'entityTypeId', 'entityId'];
  const errorList = validateParams(dataParam, requiredParams, currencyId);

  // Return Promise reject if missing params
  if (errorList.length > 0) {
    return Promise.reject(
      `Dashboard.getSummary() is missing {${errorList}} param(s)`
    );
  }

  currencyId = `currencyId=${currencyId}`;
  let entity = `entityId=${dataParam.entityId}&entityTypeId=${
    dataParam.entityTypeId
  }`;
  let date = `fromDate=${dataParam.fromDate}&toDate=${dataParam.toDate}`;

  return ajxPromise.get(
    `/dashboard/indicators/summary?${currencyId}&${entity}&${date}`
  );
}
