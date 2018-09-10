// @flow
// import isArray from 'lodash/isArray';
import isPlainObject from 'lodash/isPlainObject';
import { isUndefined } from './index';

/**
 * Check if the required params exist
 * @param {object} dataParams
 * @param {array} requiredParams
 * @param {number} currencyId
 * @returns {array}
 */
export function validateParams(
  dataParams: Object,
  requiredParams: Array<string>,
  currencyId: ?number | ?string
) {
  // Check if dataParams is undefined
  if (isUndefined(dataParams)) {
    showErrorInConsole(requiredParams);
    return requiredParams.toString();
  }

  const errorList = [...validateArray(dataParams, requiredParams)];

  // If currencyId exist
  if (currencyId && isUndefined(currencyId)) {
    errorList.push('currencyId');
  }

  // Show in console
  if (errorList.length > 0 && errorList[0]) {
    showErrorInConsole(errorList);
  }

  // Return list of missing params
  return errorList ? errorList.toString() : '';
}

function validateArray(dataParams, paramList) {
  const errors = [];
  paramList.forEach(propKey => {
    if (isPlainObject(propKey)) {
      errors.push(validateObject(propKey, dataParams));
    } else if (isUndefined(dataParams[propKey])) {
      errors.push(propKey);
    }
  });
  return errors;
}

function validateObject(data, dataParams): string {
  const objKey = Object.keys(data)[0];
  const paramValue = data[objKey];
  const reqParam = dataParams[objKey];
  if (isUndefined(reqParam)) {
    return objKey;
  } else {
    const errorList = validateArray(reqParam, paramValue);
    return errorList.toString();
  }
}

function showErrorInConsole(requiredParams: Array<string>): void {
  // Show error in console log
  const list = [...requiredParams];
  const errorMsg = `{${list.toString()}} param(s) is missing`;
  if (process.env.NODE_ENV === 'development') console.error(errorMsg);
}
