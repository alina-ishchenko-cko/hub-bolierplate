import { ajxPromise } from 'services/appRequest';
import { validateParams } from 'utils/api.util';

/**
 * Get account details via an api call
 * @param {string|number} accountId account id
 * @returns {promise}
 */
export const getAccountDetails = accountId => {
  const errorList = validateParams({ accountId }, ['accountId']);
  if (errorList.length > 0) {
    return Promise.reject(
      `Settings.getAccountDetails() is missing {${errorList}} param(s)`
    );
  }
  return ajxPromise.get(`/accounts/${accountId}`);
};

/**
 * Get bank accounts details via an api call
 * @param {string|number} accountId account id
 * @returns {promise}
 */
export const getBankAccountsDetails = accountId => {
  const errorList = validateParams({ accountId }, ['accountId']);
  if (errorList.length > 0) {
    return Promise.reject(
      `Settings.getBankAccountsDetails() is missing {${errorList}} param(s)`
    );
  }
  return ajxPromise.get(`/accounts/${accountId}/bank-accounts?isDetailed=true`);
};

/**
 * Get account settings via an api call
 * @param {string|number} accountId account id
 * @returns {promise}
 */
export const getAccountSettings = accountId => {
  const errorList = validateParams({ accountId }, ['accountId']);
  if (errorList.length > 0) {
    return Promise.reject(
      `Settings.getAccountSettings() is missing {${errorList}} param(s)`
    );
  }
  return ajxPromise.get(`/accounts/${accountId}/account-settings-override`);
};

/**
 * Get the list of processing currencies associated to a business via an api call
 * @param {string|number} accountId account id
 * @param {string|number} businessId business id
 * @returns {promise}
 */
export const getProcessingCurrencies = (accountId, businessId) => {
  const requiredParams = ['accountId', 'businessId'];
  const errorList = validateParams({ accountId, businessId }, requiredParams);
  if (errorList.length > 0) {
    return Promise.reject(
      `Settings.getProcessingCurrencies() is missing {${errorList}} param(s)`
    );
  }
  return ajxPromise.get(
    `/accounts/${accountId}/businesses/${businessId}/processingCurrencies`
  );
};

/**
 * Get apple pay signing request via an api call
 * @param {string|number} accountId account id
 * @param {string|number} businessId business id
 * @returns {promise}
 */
export const getApplePaySigningRequest = (accountId, businessId) => {
  const requiredParams = ['accountId', 'businessId'];
  const errorList = validateParams({ accountId, businessId }, requiredParams);
  if (errorList.length > 0) {
    return Promise.reject(
      `Settings.getApplePaySigningRequest() is missing {${errorList}} param(s)`
    );
  }
  return ajxPromise.get(
    `/accounts/${accountId}/businesses/${
      businessId
    }/business-settings/apple-pay/signing-request`
  );
};

/**
 * Get apple pay certificates via an api call
 * @param {string|number} accountId account id
 * @param {string|number} businessId business id
 * @returns {promise}
 */
export const getApplePayCertificates = (accountId, businessId) => {
  const requiredParams = ['accountId', 'businessId'];
  const errorList = validateParams({ accountId, businessId }, requiredParams);
  if (errorList.length > 0) {
    return Promise.reject(
      `Settings.getApplePayCertificates() is missing {${errorList}} param(s)`
    );
  }
  return ajxPromise.get(
    `/accounts/${accountId}/businesses/${
      businessId
    }/business-settings/apple-pay/certificates`
  );
};

/**
 * Get the processing settings via an api call
 * @param {string|number} accountId account id
 * @param {string|number} businessId business id
 * @returns {promise}
 */
export const getProcessingSettings = (accountId, businessId) => {
  const requiredParams = ['accountId', 'businessId'];
  const errorList = validateParams({ accountId, businessId }, requiredParams);
  if (errorList.length > 0) {
    return Promise.reject(
      `Settings.getProcessingSettings() is missing {${errorList}} param(s)`
    );
  }
  return ajxPromise.get(
    `/accounts/${accountId}/properties/${businessId}/processor-management`
  );
};

/**
 * Get the payment methods via an api call
 * @param {string|number} accountId account id
 * @param {string|number} businessId business id
 * @returns {promise}
 */
export const getPaymentMethods = (accountId, businessId) => {
  const requiredParams = ['accountId', 'businessId'];
  const errorList = validateParams({ accountId, businessId }, requiredParams);
  if (errorList.length > 0) {
    return Promise.reject(
      `Settings.getPaymentMethods() is missing {${errorList}} param(s)`
    );
  }
  return ajxPromise.get(
    `/accounts/${accountId}/businesses/${businessId}/payment-methods`
  );
};

/**
 * Get the service settings via an api call
 * @param {string|number} accountId account id
 * @returns {promise}
 */
export const getServiceSettings = accountId => {
  const requiredParams = ['accountId'];
  const errorList = validateParams({ accountId }, requiredParams);
  if (errorList.length > 0) {
    return Promise.reject(
      `Settings.getServiceSettings() is missing {${errorList}} param(s)`
    );
  }
  return ajxPromise.get(`/accounts/${accountId}/service-settings`);
};

/**
 * Update the display currency via an api call
 * @param {string|number} accountId account id
 * @param {string|number} currencyId currency id
 * @returns {promise}
 */
export const updateDisplayCurrency = (accountId, currencyId) => {
  const requiredParams = ['accountId', 'currencyId'];
  const errorList = validateParams({ accountId, currencyId }, requiredParams);
  if (errorList.length > 0) {
    return Promise.reject(
      `Settings.updateDisplayCurrency() is missing {${errorList}} param(s)`
    );
  }
  return ajxPromise.put(`/accounts/${accountId}/display-currency`, {
    currencyId
  });
};

/**
 * Update the bank account information via an api call
 * @param {string|number} accountId account id
 * @param {string|number} bankAccountId bank account id
 * @param {object} data bank account information
 * @returns {promise}
 */
export const updateBankAccountInfo = (accountId, bankAccountId, data) => {
  const requiredParams = ['accountId', 'bankAccountId', 'data'];
  const errorList = validateParams(
    { accountId, bankAccountId, data },
    requiredParams
  );
  if (errorList.length > 0) {
    return Promise.reject(
      `Settings.updateBankAccountInfo() is missing {${errorList}} param(s)`
    );
  }
  return ajxPromise.put(
    `/accounts/${accountId}/bank-accounts/${bankAccountId}`,
    data
  );
};

/**
 * Get the list of cities of the country via an api call
 * @param {string|number} countryId country id
 * @returns {promise}
 */
export const getCountryCities = countryId => {
  const requiredParams = ['countryId'];
  const errorList = validateParams({ countryId }, requiredParams);
  if (errorList.length > 0) {
    return Promise.reject(
      `Settings.getCountryCities() is missing {${errorList}} param(s)`
    );
  }
  return ajxPromise.get(`/countries/${countryId}/cities`);
};

/**
 * Get the list of timezones of the country via an api call
 * @param {string|number} countryId country id
 * @returns {promise}
 */
export const getCountryTimezones = countryId => {
  const requiredParams = ['countryId'];
  const errorList = validateParams({ countryId }, requiredParams);
  if (errorList.length > 0) {
    return Promise.reject(
      `Settings.getCountryTimezones() is missing {${errorList}} param(s)`
    );
  }
  return ajxPromise.get(`/lookups/countries/${countryId}/timezones`);
};

/**
 * Updates the user's profile
 * @param {string} name
 * @param {string} email
 * @param {string} timeZone
 * @returns {promise}
 */
export const updateProfile = (name, email, timeZone) => {
  const requiredParams = ['name', 'email', 'timeZone'];
  const params = { name, email, timeZone };
  const errorList = validateParams(params, requiredParams);
  if (errorList.length > 0) {
    return Promise.reject(
      `Settings.updateProfile() is missing {${errorList}} param(s)`
    );
  }
  return ajxPromise.put(`/me`, params);
};

/**
 * Get payout cycle frequencies
 * @returns {promise}
 */
export const getFrequencies = () => ajxPromise.get(`/lookups/frequencies`);

/**
 * Get business bank account details
 * @param {string|number} accountId
 * @param {string|number} businessId
 * @returns {promise}
 */
export const getBusinessBankDetails = (accountId, businessId) => {
  const requiredParams = ['accountId', 'businessId'];
  const params = { accountId, businessId };
  const errorList = validateParams(params, requiredParams);
  if (errorList.length > 0) {
    return Promise.reject(
      `Settings.getBusinessBankDetails() is missing {${errorList}} param(s)`
    );
  }
  return ajxPromise.get(
    `/accounts/${accountId}/businesses/${
      businessId
    }/bank-accounts?isDetailed=true`
  );
};

/**
 * Get account bank fields
 * @param {string|number} accountId
 * @param {string|number} businessId
 * @returns {promise}
 */
export const getAccountBankFields = (countryId, currencyId) => {
  const requiredParams = ['countryId', 'currencyId'];
  const params = { countryId, currencyId };
  const errorList = validateParams(params, requiredParams);
  if (errorList.length > 0) {
    return Promise.reject(
      `Settings.getAccountBankFields() is missing {${errorList}} param(s)`
    );
  }
  return ajxPromise.get(
    `/bank-fields?countryId=${countryId}&currencyId=${currencyId}`
  );
};

/**
 * Get channel api keys
 * @param {string|number} accountId
 * @param {string|number} businessId
 * @param {string|number} channelId
 * @returns {promise}
 */
export const getApiKeys = (accountId, businessId, channelId) => {
  const requiredParams = ['accountId', 'businessId', 'channelId'];
  const params = { accountId, businessId, channelId };
  const errorList = validateParams(params, requiredParams);
  if (errorList.length > 0) {
    return Promise.reject(
      `Settings.getApiKeys() is missing {${errorList}} param(s)`
    );
  }
  return ajxPromise.get(
    `/accounts/${accountId}/businesses/${businessId}/channels/${
      channelId
    }/api-keys`
  );
};
