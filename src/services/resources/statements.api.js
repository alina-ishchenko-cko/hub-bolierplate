import { ajxPromise } from 'services/appRequest';
import { validateParams } from 'utils/api.util';

/**
 * Handles request to get all the deposit list
 * @param {object} dataParam
 * @return {promise}
 */
type iGetAll = {
  businessId: number,
  accountId: number,
  sortField: ?string,
  sortColumn: string,
  sortOrder: string,
  pageSize: number,
  startIndex: number,
};
export function getAll(dataParam: iGetAll): Promise<any> {
  if (dataParam.sortField) dataParam.sortColumn = dataParam.sortField;
  if (dataParam.sortOrder === 'ascend') dataParam.sortOrder = 'asc';
  if (dataParam.sortOrder === 'descend') dataParam.sortOrder = 'desc';
  const requiredParams = [
    'accountId',
    'businessId',
    'pageSize',
    'sortColumn',
    'sortOrder',
    'startIndex',
  ];

  const errorList = validateParams(dataParam, requiredParams);
  if (errorList.length > 0) {
    return Promise.reject(
      `Statements.getAll() is missing {${errorList}} param(s)`
    );
  }
  const {
    pageSize,
    sortColumn,
    sortOrder,
    startIndex,
    accountId,
    businessId,
  } = dataParam;

  const pageSizeParam = `pageSize=${pageSize}`;
  const sortColumnParam = `sortColumn=${sortColumn}`;
  const sortOrderParam = `sortOrder=${sortOrder}`;
  const startIndexParam = `startIndex=${startIndex}`;
  const queryStringParams = `${pageSizeParam}&${sortColumnParam}&${sortOrderParam}&${startIndexParam}`;
  const url =
    businessId === null
      ? `/accounts/${accountId}/statement?${queryStringParams}`
      : `/accounts/${accountId}/business/${businessId}/statement?${queryStringParams}`;
  return ajxPromise.get(url);
}

/**
 * Handles request to get the business statements
 * @param {string|number} accountId
 * @param {string|number} statementId
 * @return {promise}
 */
export const getBusinessStatements = (accountId, statementId) => {
  const requiredParams = ['accountId', 'statementId'];
  const errorList = validateParams({ accountId, statementId }, requiredParams);
  if (errorList.length > 0) {
    return Promise.reject(
      `Statements.getBusinessStatements() is missing {${errorList}} param(s)`
    );
  }
  return ajxPromise.get(
    `/accounts/${accountId}/statement/${statementId}/business`
  );
};
