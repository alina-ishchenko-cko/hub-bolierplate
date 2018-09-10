// @flow
import { STATEMENTS } from 'store/constants';
import * as StatementsAPI from 'services/resources/statements.api';
import { dispatchResponse } from 'utils/action.util';
import type { MonthSectionMap } from 'store/reducers/statementsReducer';

export function streamMonthSectionMap(monthSectionMap: MonthSectionMap) {
  return {
    monthSectionMap,
    type: STATEMENTS.STREAM_MONTH_SECTION_MAP,
  };
}

/**
 * Action to get a list of statements
 * @param {object} data data used for the api request
 */
export function getAll(data: Object) {
  const { PENDING, SUCCESS, ERROR } = STATEMENTS;
  const promiseReq = StatementsAPI.getAll(data);
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
 * Action to get the business statements
 * @param {string} accountId account id
 * @param {string} statementId statement id
 */
export function getBusinessStatements(accountId: string, statementId: string) {
  const { PENDING, SUCCESS, ERROR } = STATEMENTS.GROUP;
  const promiseReq = StatementsAPI.getBusinessStatements(
    accountId,
    statementId
  );
  return dispatchResponse(
    promiseReq,
    PENDING,
    { type: SUCCESS, statementId },
    ERROR
  );
}
