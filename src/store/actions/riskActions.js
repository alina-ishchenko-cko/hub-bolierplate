// @flow
import {
  RISK_BLACKLIST,
  RISK_AVS,
  RISK_VELOCITY,
  RISK_MISMATCH,
  RISK_THRESHOLD,
  RISK_VERIFIED_INFO,
  RISK_COUNTRY,
} from 'store/constants';
import * as RiskAPI from 'services/resources/risks.api';
import { dispatchResponse } from 'utils/action.util';

/**
 * Action to get the blacklists
 * @param {object} dataParams data parameters
 */
export function getAllBlacklist(dataParams: Object) {
  const promiseReq = RiskAPI.getAllBlacklist(dataParams);
  const { PENDING, SUCCESS, ERROR } = RISK_BLACKLIST.ALL;
  return dispatchResponse(promiseReq, PENDING, { type: SUCCESS }, ERROR);
}

/**
 * Action to get the blacklist attributes of an account
 * @param {string|number} accountId account id
 */
export function getBlacklistAttributes(accountId: string | number) {
  const promiseReq = RiskAPI.getBlacklistAttributes(accountId);
  const { PENDING, SUCCESS, ERROR } = RISK_BLACKLIST.ATTRIBUTES;
  return dispatchResponse(promiseReq, PENDING, { type: SUCCESS }, ERROR);
}

/**
 * Action to delete the blacklist rules of an account
 * @param {string|number} accountId account id
 * @param {Array} ruleIds array of rule id
 */
export function deleteBlacklistRules(
  accountId: string | number,
  ruleIds: Array<string>
) {
  const promiseReq = RiskAPI.deleteBlacklistRules(accountId, ruleIds);
  const { PENDING, SUCCESS, ERROR } = RISK_BLACKLIST.DELETE;
  return dispatchResponse(promiseReq, PENDING, { type: SUCCESS }, ERROR);
}

/**
 * Action to add a blacklist rule
 * @param {string|number} accountId account id
 * @param {string} attributeType attribute type (e.g. phone, email)
 * @param {string} attributeValue attribute value
 */
export function addBlacklistRule(
  accountId: string | number,
  attributeType: string,
  attributeValue: string
) {
  const promiseReq = RiskAPI.addBlacklistRule(
    accountId,
    attributeType,
    attributeValue
  );
  const { PENDING, SUCCESS, ERROR } = RISK_BLACKLIST.ADD;
  return dispatchResponse(promiseReq, PENDING, { type: SUCCESS }, ERROR);
}

/**
 * Action to get the avs (Address Verification Service) rules
 * @param {string|number} accountId account id
 * @param {string|number} businessId business id
 */
export function getAvsRules(
  accountId: string | number,
  businessId: string | number
) {
  const promiseReq = RiskAPI.getAvsRules(accountId, businessId);
  const { PENDING, SUCCESS, ERROR } = RISK_AVS.ALL;
  return dispatchResponse(promiseReq, PENDING, { type: SUCCESS }, ERROR);
}

/**
 * Action to get the avs (Address Verification Service) actions
 * @param {string|number} accountId account id
 * @param {string|number} businessId business id
 */
export function getAvsActions(
  accountId: string | number,
  businessId: string | number
) {
  const promiseReq = RiskAPI.getAvsActions(accountId, businessId);
  const { PENDING, SUCCESS, ERROR } = RISK_AVS.LIST_ACTIONS;
  return dispatchResponse(promiseReq, PENDING, { type: SUCCESS }, ERROR);
}

/**
 * Action to save the avs rules
 * @param {string|number} accountId account id
 * @param {string|number} businessId business id
 * @param {array} avsRules avs rules
 * @param {string} password user's password
 */
export function saveAvsRules(
  accountId: string | number,
  businessId: string | number,
  avsRules: Array<string>,
  password: string
) {
  const promiseReq = RiskAPI.saveAvsRules(
    accountId,
    businessId,
    avsRules,
    password
  );
  const { PENDING, SUCCESS, ERROR } = RISK_AVS.SAVE;
  return dispatchResponse(promiseReq, PENDING, { type: SUCCESS }, ERROR, false);
}

/**
 * Action to get the velocity rules
 * @param {string|number} accountId account id
 * @param {string|number} businessId business id
 */
export function getVelocityRules(
  accountId: string | number,
  businessId: string | number
) {
  const promiseReq = RiskAPI.getVelocityRules(accountId, businessId);
  const { PENDING, SUCCESS, ERROR } = RISK_VELOCITY.ALL;
  return dispatchResponse(promiseReq, PENDING, { type: SUCCESS }, ERROR);
}

/**
 * Action to get the velocity actions
 * @param {string|number} accountId account id
 * @param {string|number} businessId business id
 */
export function getVelocityActions(
  accountId: string | number,
  businessId: string | number
) {
  const promiseReq = RiskAPI.getVelocityActions(accountId, businessId);
  const { PENDING, SUCCESS, ERROR } = RISK_VELOCITY.LIST_ACTIONS;
  return dispatchResponse(promiseReq, PENDING, { type: SUCCESS }, ERROR);
}

/**
 * Action to save the avs rules
 * @param {string|number} accountId account id
 * @param {string|number} businessId business id
 * @param {array} velocityRules velocity rules
 * @param {string} password user's password
 */
export function saveVelocityRules(
  accountId: string | number,
  businessId: string | number,
  velocityRules: Array<string>,
  password: string
) {
  const promiseReq = RiskAPI.saveVelocityRules(
    accountId,
    businessId,
    velocityRules,
    password
  );
  const { PENDING, SUCCESS, ERROR } = RISK_VELOCITY.SAVE;
  return dispatchResponse(promiseReq, PENDING, { type: SUCCESS }, ERROR, false);
}

/**
 * Action to get the mismatch rules
 * @param {string|number} accountId account id
 * @param {string|number} businessId business id
 */
export function getMismatchRules(
  accountId: string | number,
  businessId: string | number
) {
  const promiseReq = RiskAPI.getMismatchRules(accountId, businessId);
  const { PENDING, SUCCESS, ERROR } = RISK_MISMATCH.ALL;
  return dispatchResponse(promiseReq, PENDING, { type: SUCCESS }, ERROR);
}

/**
 * Action to get the mismatch actions
 * @param {string|number} accountId account id
 * @param {string|number} businessId business id
 */
export function getMismatchActions(
  accountId: string | number,
  businessId: string | number
) {
  const promiseReq = RiskAPI.getMismatchActions(accountId, businessId);
  const { PENDING, SUCCESS, ERROR } = RISK_MISMATCH.LIST_ACTIONS;
  return dispatchResponse(promiseReq, PENDING, { type: SUCCESS }, ERROR);
}

/**
 * Action to save the mismatch rules
 * @param {string|number} accountId account id
 * @param {string|number} businessId business id
 * @param {array} mismatchRules mismatch rules
 * @param {string} password user's password
 */
export function saveMismatchRules(
  accountId: string | number,
  businessId: string | number,
  mismatchRules: Array<string>,
  password: string
) {
  const promiseReq = RiskAPI.saveMismatchRules(
    accountId,
    businessId,
    mismatchRules,
    password
  );
  const { PENDING, SUCCESS, ERROR } = RISK_MISMATCH.SAVE;
  return dispatchResponse(promiseReq, PENDING, { type: SUCCESS }, ERROR, false);
}

/**
 * Action to get the threshold rules
 * @param {string|number} accountId account id
 * @param {string|number} businessId business id
 */
export function getThresholdRules(
  accountId: string | number,
  businessId: string | number
) {
  const promiseReq = RiskAPI.getThresholdRules(accountId, businessId);
  const { PENDING, SUCCESS, ERROR } = RISK_THRESHOLD.ALL;
  return dispatchResponse(promiseReq, PENDING, { type: SUCCESS }, ERROR);
}

/**
 * Action to get the threshold actions
 * @param {string|number} accountId account id
 * @param {string|number} businessId business id
 */
export function getThresholdActions(
  accountId: string | number,
  businessId: string | number
) {
  const promiseReq = RiskAPI.getThresholdActions(accountId, businessId);
  const { PENDING, SUCCESS, ERROR } = RISK_THRESHOLD.LIST_ACTIONS;
  return dispatchResponse(promiseReq, PENDING, { type: SUCCESS }, ERROR);
}

/**
 * Action to save the threshold rules
 * @param {string|number} accountId account id
 * @param {string|number} businessId business id
 * @param {array} thresholdRules threshold rules
 * @param {string} password user's password
 */
export function saveThresholdRules(
  accountId: string | number,
  businessId: string | number,
  thresholdRules: Array<string>,
  password: string
) {
  const promiseReq = RiskAPI.saveThresholdRules(
    accountId,
    businessId,
    thresholdRules,
    password
  );
  const { PENDING, SUCCESS, ERROR } = RISK_THRESHOLD.SAVE;
  return dispatchResponse(promiseReq, PENDING, { type: SUCCESS }, ERROR, false);
}

/**
 * Action to get the verified info rules
 * @param {string|number} accountId account id
 * @param {string|number} businessId business id
 */
export function getVerifiedInfoRules(
  accountId: string | number,
  businessId: string | number
) {
  const promiseReq = RiskAPI.getVerifiedInfoRules(accountId, businessId);
  const { PENDING, SUCCESS, ERROR } = RISK_VERIFIED_INFO.ALL;
  return dispatchResponse(promiseReq, PENDING, { type: SUCCESS }, ERROR);
}

/**
 * Action to get the verified info actions
 * @param {string|number} accountId account id
 * @param {string|number} businessId business id
 */
export function getVerifiedInfoActions(
  accountId: string | number,
  businessId: string | number
) {
  const promiseReq = RiskAPI.getVerifiedInfoActions(accountId, businessId);
  const { PENDING, SUCCESS, ERROR } = RISK_VERIFIED_INFO.LIST_ACTIONS;
  return dispatchResponse(promiseReq, PENDING, { type: SUCCESS }, ERROR);
}

/**
 * Action to save the verified info rules
 * @param {string|number} accountId account id
 * @param {string|number} businessId business id
 * @param {array} verifiedInfoRules verified info rules
 * @param {string} password user's password
 */
export function saveVerifiedInfoRules(
  accountId: string | number,
  businessId: string | number,
  verifiedInfoRules: Array<string>,
  password: string
) {
  const promiseReq = RiskAPI.saveVerifiedInfoRules(
    accountId,
    businessId,
    verifiedInfoRules,
    password
  );
  const { PENDING, SUCCESS, ERROR } = RISK_VERIFIED_INFO.SAVE;
  return dispatchResponse(promiseReq, PENDING, { type: SUCCESS }, ERROR, false);
}

/**
 * Action to get the high risk countries
 * @param {string|number} accountId account id
 * @param {string|number} businessId business id
 */
export function getHighRiskCountries(
  accountId: string | number,
  businessId: string | number
) {
  const promiseReq = RiskAPI.getHighRiskCountries(accountId, businessId);
  const { PENDING, SUCCESS, ERROR } = RISK_COUNTRY.ALL;
  return dispatchResponse(promiseReq, PENDING, { type: SUCCESS }, ERROR);
}

/**
 * Action to save the high risk countries
 * @param {string|number} accountId account id
 * @param {string|number} businessId business id
 * @param {array} countriesObj high risk countries
 * @param {string} password user's password
 */
export function saveHighRiskCountries(
  accountId: string | number,
  businessId: string | number,
  countriesObj: Object,
  password: string
) {
  const promiseReq = RiskAPI.saveHighRiskCountries(
    accountId,
    businessId,
    countriesObj,
    password
  );
  const { PENDING, SUCCESS, ERROR } = RISK_COUNTRY.SAVE;
  return dispatchResponse(promiseReq, PENDING, { type: SUCCESS }, ERROR, false);
}
