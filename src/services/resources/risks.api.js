import { ajxPromise } from 'services/appRequest';
import { validateParams } from 'utils/api.util';

/**
 * Get all blacklist via an api call
 * @param {object} dataParams data parameters
 * @returns {Promise}
 */
export const getAllBlacklist = dataParams => {
  const requiredParams = ['accountId', 'pageSize', 'startIndex'];
  const errorList = validateParams(dataParams, requiredParams);
  if (errorList.length > 0) {
    return Promise.reject(
      `Risk.getAllBlacklist() is missing {${errorList}} param(s)`
    );
  }
  const { accountId, pageSize, search, startIndex } = dataParams;
  let path = `/accounts/${accountId}/risk/blacklist?pageSize=${
    pageSize
  }&startIndex=${startIndex}`;
  if (search) path += `&search=${search}`;
  return ajxPromise.get(path);
};

/**
 * Get the blacklist attributes via an api call
 * @param {string|number} accountId account id
 * @returns {Promise}
 */
export const getBlacklistAttributes = accountId => {
  const requiredParams = ['accountId'];
  const errorList = validateParams({ accountId }, requiredParams);
  if (errorList.length > 0) {
    return Promise.reject(
      `Risk.getBlacklistAttributes() is missing {${errorList}} param(s)`
    );
  }
  return ajxPromise.get(`/accounts/${accountId}/risk/blacklist/attributes`);
};

/**
 * Delete the blacklist rules via an api call
 * @param {string|number} accountId account id
 * @param {array} ruleIds array of rule id
 * @returns {promise}
 */
export const deleteBlacklistRules = (accountId, ruleIds) => {
  const requiredParams = ['accountId', 'ruleIds'];
  const errorList = validateParams({ accountId, ruleIds }, requiredParams);
  if (errorList.length > 0) {
    return Promise.reject(
      `Risk.deleteBlacklistRules() is missing {${errorList}} param(s)`
    );
  }
  const ruleIdsParam = ruleIds
    .reduce((acc, val) => `${acc}${val},`, '')
    .slice(0, -1);
  return ajxPromise.delete(
    `/accounts/${accountId}/risk/blacklist?ruleIds=${ruleIdsParam}`
  );
};

/**
 * Add a blacklist rule via an api call
 * @param {string|number} accountId account id
 * @param {string} attributeType attribute type (e.g. email, bin number)
 * @param {string} attributeValue attribute value
 * @returns {Promise}
 */
export const addBlacklistRule = (accountId, attributeType, attributeValue) => {
  const requiredParams = ['accountId', 'attributeType', 'attributeValue'];
  const errorList = validateParams(
    { accountId, attributeType, attributeValue },
    requiredParams
  );
  if (errorList.length > 0) {
    return Promise.reject(
      `Risk.addBlacklistRule() is missing {${errorList}} param(s)`
    );
  }
  return ajxPromise.post(`/accounts/${accountId}/risk/blacklist`, {
    attributeType,
    attributeValue
  });
};

/**
 * Get the avs (Address Verification Service) rules via an api call
 * @param {string|number} accountId account id
 * @param {string|number} businessId business id
 * @returns {Promise}
 */
export const getAvsRules = (accountId, businessId) => {
  const requiredParams = ['accountId', 'businessId'];
  const errorList = validateParams({ accountId, businessId }, requiredParams);
  if (errorList.length > 0) {
    return Promise.reject(
      `Risk.getAvsRules() is missing {${errorList}} param(s)`
    );
  }
  return ajxPromise.get(
    `/accounts/${accountId}/businesses/${businessId}/risk/avs`
  );
};

/**
 * Get the avs (Address Verification Service) actions via an api call
 * @param {string|number} accountId account id
 * @param {string|number} businessId business id
 * @returns {Promise}
 */
export const getAvsActions = (accountId, businessId) => {
  const requiredParams = ['accountId', 'businessId'];
  const errorList = validateParams({ accountId, businessId }, requiredParams);
  if (errorList.length > 0) {
    return Promise.reject(
      `Risk.getAvsActions() is missing {${errorList}} param(s)`
    );
  }
  return ajxPromise.get(
    `/accounts/${accountId}/businesses/${businessId}/risk/avs/actions`
  );
};

/**
 * Save the avs (Address Verification Service) rules via an api call
 * @param {string|number} accountId account id
 * @param {string|number} businessId business id
 * @param {array} avsRules avs rules
 * @param {string} password user's password
 */
export const saveAvsRules = (accountId, businessId, avsRules, password) => {
  const requiredParams = ['accountId', 'businessId', 'avsRules', 'password'];
  const errorList = validateParams(
    { accountId, businessId, avsRules, password },
    requiredParams
  );
  if (errorList.length > 0) {
    return Promise.reject(
      `Risk.saveAvsRules() is missing {${errorList}} param(s)`
    );
  }
  return ajxPromise.put(
    `/accounts/${accountId}/businesses/${businessId}/risk/avs`,
    avsRules,
    {
      X_AUTH_CREDENTIALS: password
    }
  );
};

/**
 * Get the velocity rules via an api call
 * @param {string|number} accountId account id
 * @param {string|number} businessId business id
 */
export const getVelocityRules = (accountId, businessId) => {
  const requiredParams = ['accountId', 'businessId'];
  const errorList = validateParams({ accountId, businessId }, requiredParams);
  if (errorList.length > 0) {
    return Promise.reject(
      `Risk.getVelocityRules() is missing {${errorList}} param(s)`
    );
  }
  return ajxPromise.get(
    `/accounts/${accountId}/businesses/${businessId}/risk/velocity`
  );
};

/**
 * Get the velocity actions via an api call
 * @param {string|number} accountId account id
 * @param {string|number} businessId business id
 */
export const getVelocityActions = (accountId, businessId) => {
  const requiredParams = ['accountId', 'businessId'];
  const errorList = validateParams({ accountId, businessId }, requiredParams);
  if (errorList.length > 0) {
    return Promise.reject(
      `Risk.getVelocityActions() is missing {${errorList}} param(s)`
    );
  }
  return ajxPromise.get(
    `/accounts/${accountId}/businesses/${businessId}/risk/velocity/actions`
  );
};

/**
 * Save the velocity rules via an api call
 * @param {string|number} accountId account id
 * @param {string|number} businessId business id
 * @param {array} avsRules array of velocity rules
 * @param {string} password user's password
 */
export const saveVelocityRules = (
  accountId,
  businessId,
  velocityRules,
  password
) => {
  const requiredParams = [
    'accountId',
    'businessId',
    'velocityRules',
    'password'
  ];
  const errorList = validateParams(
    { accountId, businessId, velocityRules, password },
    requiredParams
  );
  if (errorList.length > 0) {
    return Promise.reject(
      `Risk.saveVelocityRules() is missing {${errorList}} param(s)`
    );
  }
  return ajxPromise.put(
    `/accounts/${accountId}/businesses/${businessId}/risk/velocity`,
    velocityRules,
    {
      X_AUTH_CREDENTIALS: password
    }
  );
};

/**
 * Get the mismatch rules via an api call
 * @param {string|number} accountId account id
 * @param {string|number} businessId business id
 */
export const getMismatchRules = (accountId, businessId) => {
  const requiredParams = ['accountId', 'businessId'];
  const errorList = validateParams({ accountId, businessId }, requiredParams);
  if (errorList.length > 0) {
    return Promise.reject(
      `Risk.getMismatchRules() is missing {${errorList}} param(s)`
    );
  }
  return ajxPromise.get(
    `/accounts/${accountId}/businesses/${businessId}/risk/mismatch`
  );
};

/**
 * Get the mismatch actions via an api call
 * @param {string|number} accountId account id
 * @param {string|number} businessId business id
 */
export const getMismatchActions = (accountId, businessId) => {
  const requiredParams = ['accountId', 'businessId'];
  const errorList = validateParams({ accountId, businessId }, requiredParams);
  if (errorList.length > 0) {
    return Promise.reject(
      `Risk.getMismatchActions() is missing {${errorList}} param(s)`
    );
  }
  return ajxPromise.get(
    `/accounts/${accountId}/businesses/${businessId}/risk/mismatch/actions`
  );
};

/**
 * Save the mismatch rules via an api call
 * @param {string|number} accountId account id
 * @param {string|number} businessId business id
 * @param {array} avsRules array of mismatch rules
 * @param {string} password user's password
 */
export const saveMismatchRules = (
  accountId,
  businessId,
  mismatchRules,
  password
) => {
  const requiredParams = [
    'accountId',
    'businessId',
    'mismatchRules',
    'password'
  ];
  const errorList = validateParams(
    { accountId, businessId, mismatchRules, password },
    requiredParams
  );
  if (errorList.length > 0) {
    return Promise.reject(
      `Risk.saveMismatchRules() is missing {${errorList}} param(s)`
    );
  }
  return ajxPromise.put(
    `/accounts/${accountId}/businesses/${businessId}/risk/mismatch`,
    mismatchRules,
    {
      X_AUTH_CREDENTIALS: password
    }
  );
};

/**
 * Get the threshold rules via an api call
 * @param {string|number} accountId account id
 * @param {string|number} businessId business id
 */
export const getThresholdRules = (accountId, businessId) => {
  const requiredParams = ['accountId', 'businessId'];
  const errorList = validateParams({ accountId, businessId }, requiredParams);
  if (errorList.length > 0) {
    return Promise.reject(
      `Risk.getThresholdRules() is missing {${errorList}} param(s)`
    );
  }
  return ajxPromise.get(
    `/accounts/${accountId}/businesses/${businessId}/risk/threshold`
  );
};

/**
 * Get the threshold actions via an api call
 * @param {string|number} accountId account id
 * @param {string|number} businessId business id
 */
export const getThresholdActions = (accountId, businessId) => {
  const requiredParams = ['accountId', 'businessId'];
  const errorList = validateParams({ accountId, businessId }, requiredParams);
  if (errorList.length > 0) {
    return Promise.reject(
      `Risk.getThresholdActions() is missing {${errorList}} param(s)`
    );
  }
  return ajxPromise.get(
    `/accounts/${accountId}/businesses/${businessId}/risk/threshold/actions`
  );
};

/**
 * Save the threshold rules via an api call
 * @param {string|number} accountId account id
 * @param {string|number} businessId business id
 * @param {array} avsRules array of threshold rules
 * @param {string} password user's password
 */
export const saveThresholdRules = (
  accountId,
  businessId,
  thresholdRules,
  password
) => {
  const requiredParams = [
    'accountId',
    'businessId',
    'thresholdRules',
    'password'
  ];
  const errorList = validateParams(
    { accountId, businessId, thresholdRules, password },
    requiredParams
  );
  if (errorList.length > 0) {
    return Promise.reject(
      `Risk.saveThresholdRules() is missing {${errorList}} param(s)`
    );
  }
  return ajxPromise.put(
    `/accounts/${accountId}/businesses/${businessId}/risk/threshold`,
    thresholdRules,
    {
      X_AUTH_CREDENTIALS: password
    }
  );
};

/**
 * Get the verified info rules via an api call
 * @param {string|number} accountId account id
 * @param {string|number} businessId business id
 */
export const getVerifiedInfoRules = (accountId, businessId) => {
  const requiredParams = ['accountId', 'businessId'];
  const errorList = validateParams({ accountId, businessId }, requiredParams);
  if (errorList.length > 0) {
    return Promise.reject(
      `Risk.getVerifiedInfoRules() is missing {${errorList}} param(s)`
    );
  }
  return ajxPromise.get(
    `/accounts/${accountId}/businesses/${businessId}/risk/verified-info`
  );
};

/**
 * Get the verified info actions via an api call
 * @param {string|number} accountId account id
 * @param {string|number} businessId business id
 */
export const getVerifiedInfoActions = (accountId, businessId) => {
  const requiredParams = ['accountId', 'businessId'];
  const errorList = validateParams({ accountId, businessId }, requiredParams);
  if (errorList.length > 0) {
    return Promise.reject(
      `Risk.getVerifiedInfoActions() is missing {${errorList}} param(s)`
    );
  }
  return ajxPromise.get(
    `/accounts/${accountId}/businesses/${businessId}/risk/verified-info/actions`
  );
};

/**
 * Save the verified info rules via an api call
 * @param {string|number} accountId account id
 * @param {string|number} businessId business id
 * @param {array} avsRules array of verified info rules
 * @param {string} password user's password
 */
export const saveVerifiedInfoRules = (
  accountId,
  businessId,
  verifiedInfoRules,
  password
) => {
  const requiredParams = [
    'accountId',
    'businessId',
    'verifiedInfoRules',
    'password'
  ];
  const errorList = validateParams(
    { accountId, businessId, verifiedInfoRules, password },
    requiredParams
  );
  if (errorList.length > 0) {
    return Promise.reject(
      `Risk.saveVerifiedInfoRules() is missing {${errorList}} param(s)`
    );
  }
  return ajxPromise.put(
    `/accounts/${accountId}/businesses/${businessId}/risk/verified-info`,
    verifiedInfoRules,
    {
      X_AUTH_CREDENTIALS: password
    }
  );
};

/**
 * Get the high risk countries via an api call
 * @param {string|number} accountId account id
 * @param {string|number} businessId business id
 */
export const getHighRiskCountries = (accountId, businessId) => {
  const requiredParams = ['accountId', 'businessId'];
  const errorList = validateParams({ accountId, businessId }, requiredParams);
  if (errorList.length > 0) {
    return Promise.reject(
      `Risk.getHighRiskCountries() is missing {${errorList}} param(s)`
    );
  }
  return ajxPromise.get(
    `/accounts/${accountId}/businesses/${businessId}/risk/high-risk-country`
  );
};

/**
 * Save the high risk countries via an api call
 * @param {string|number} accountId account id
 * @param {string|number} businessId business id
 * @param {object} countriesObj array of high risk countries
 * @param {string} password user's password
 */
export const saveHighRiskCountries = (
  accountId,
  businessId,
  countriesObj,
  password
) => {
  const requiredParams = ['accountId', 'businessId', 'countries', 'password'];
  const errorList = validateParams(
    { accountId, businessId, ...countriesObj, password },
    requiredParams
  );
  if (errorList.length > 0) {
    return Promise.reject(
      `Risk.saveHighRiskCountries() is missing {${errorList}} param(s)`
    );
  }
  return ajxPromise.put(
    `/accounts/${accountId}/businesses/${businessId}/risk/high-risk-country`,
    countriesObj,
    {
      X_AUTH_CREDENTIALS: password
    }
  );
};
