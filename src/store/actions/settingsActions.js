// @flow
import {
  ACCOUNT_DETAILS,
  BANK_ACCOUNTS,
  ACCOUNT_SETTINGS,
  PROCESSING_CURRENCIES,
  APPLE_PAY,
  PROCESSING_SETTINGS,
  PAYMENT_METHODS,
  SERVICE_SETTINGS,
  DISPLAY_CURRENCY,
  COUNTRY_CITIES,
  COUNTRY_TIMEZONES,
  FREQUENCIES,
  API_KEYS,
} from 'store/constants';
import * as SettingsAPI from 'services/resources/settings.api';
import { dispatchResponse } from 'utils/action.util';

/**
 * Action to get the account details
 * @param {string|number} accountId account id
 * @returns {function}
 */
export function getAccountDetails(accountId: string | number) {
  const promiseReq = SettingsAPI.getAccountDetails(accountId);
  const { PENDING, SUCCESS, ERROR } = ACCOUNT_DETAILS;
  return dispatchResponse(promiseReq, PENDING, { type: SUCCESS }, ERROR);
}

/**
 * Action to get the bank accounts details
 * @param {string|number} accountId account id
 * @returns {function}
 */
export function getBankAccountsDetails(accountId: string | number) {
  const promiseReq = SettingsAPI.getBankAccountsDetails(accountId);
  const { PENDING, SUCCESS, ERROR } = BANK_ACCOUNTS.LIST;
  return dispatchResponse(promiseReq, PENDING, { type: SUCCESS }, ERROR);
}

/**
 * Action to get the account settings
 * @param {string|number} accountId account id
 * @returns {function}
 */
export function getAccountSettings(accountId: string | number) {
  const promiseReq = SettingsAPI.getAccountSettings(accountId);
  const { PENDING, SUCCESS, ERROR } = ACCOUNT_SETTINGS;
  return dispatchResponse(promiseReq, PENDING, { type: SUCCESS }, ERROR);
}

/**
 * Action to get the processing currencies
 * @param {string|number} accountId account id
 * @param {string|number} businessId business id
 * @returns {function}
 */
export function getProcessingCurrencies(
  accountId: string | number,
  businessId: string | number
) {
  const promiseReq = SettingsAPI.getProcessingCurrencies(accountId, businessId);
  const { PENDING, SUCCESS, ERROR } = PROCESSING_CURRENCIES;
  return dispatchResponse(promiseReq, PENDING, { type: SUCCESS }, ERROR);
}

/**
 * Action to get the Apple Pay signing request
 * @param {string|number} accountId account id
 * @param {string|number} businessId business id
 * @returns {function}
 */
export function getApplePaySigningRequest(
  accountId: string | number,
  businessId: string | number
) {
  const promiseReq = SettingsAPI.getApplePaySigningRequest(
    accountId,
    businessId
  );
  const { PENDING, SUCCESS, ERROR } = APPLE_PAY.SIGNING_REQUEST;
  return dispatchResponse(promiseReq, PENDING, { type: SUCCESS }, ERROR);
}

/**
 * Action to get the Apple Pay certificates
 * @param {string|number} accountId account id
 * @param {string|number} businessId business id
 * @returns {function}
 */
export function getApplePayCertificates(
  accountId: string | number,
  businessId: string | number
) {
  const promiseReq = SettingsAPI.getApplePayCertificates(accountId, businessId);
  const { PENDING, SUCCESS, ERROR } = APPLE_PAY.CERTIFICATES;
  return dispatchResponse(promiseReq, PENDING, { type: SUCCESS }, ERROR);
}

/**
 * Action to get the processing settings
 * @param {string|number} accountId account id
 * @param {string|number} businessId business id
 * @returns {function}
 */
export function getProcessingSettings(
  accountId: string | number,
  businessId: string | number
) {
  const promiseReq = SettingsAPI.getProcessingSettings(accountId, businessId);
  const { PENDING, SUCCESS, ERROR } = PROCESSING_SETTINGS;
  return dispatchResponse(promiseReq, PENDING, { type: SUCCESS }, ERROR);
}

/**
 * Action to get the payment methods
 * @param {string|number} accountId account id
 * @param {string|number} businessId business id
 * @returns {function}
 */
export function getPaymentMethods(
  accountId: string | number,
  businessId: string | number
) {
  const promiseReq = SettingsAPI.getPaymentMethods(accountId, businessId);
  const { PENDING, SUCCESS, ERROR } = PAYMENT_METHODS;
  return dispatchResponse(promiseReq, PENDING, { type: SUCCESS }, ERROR);
}

/**
 * Actino to get the service settings
 * @param {string|number} accountId account id
 * @returns {function}
 */
export function getServiceSettings(accountId: string | number) {
  const promiseReq = SettingsAPI.getServiceSettings(accountId);
  const { PENDING, SUCCESS, ERROR } = SERVICE_SETTINGS;
  return dispatchResponse(promiseReq, PENDING, { type: SUCCESS }, ERROR);
}

/**
 * Action to update the display currency
 * @param {string|number} accountId account id
 * @param {string|number} currencyId currency id
 * @returns {function}
 */
export function updateDisplayCurrency(
  accountId: string | number,
  currencyId: string | number
) {
  const promiseReq = SettingsAPI.updateDisplayCurrency(accountId, currencyId);
  const { PENDING, SUCCESS, ERROR } = DISPLAY_CURRENCY.UPDATE;
  return dispatchResponse(promiseReq, PENDING, { type: SUCCESS }, ERROR);
}

/**
 * Action to update the bank account information
 * @param {string|number} accountId account id
 * @param {string|number} bankAccountId bank account id
 * @param {object} data new bank account data
 * @returns {function}
 */
export function updateBankAccountInfo(
  accountId: string | number,
  bankAccountId: string | number,
  data: Object
) {
  const promiseReq = SettingsAPI.updateBankAccountInfo(
    accountId,
    bankAccountId,
    data
  );
  const { PENDING, SUCCESS, ERROR } = BANK_ACCOUNTS.UPDATE;
  return dispatchResponse(promiseReq, PENDING, { type: SUCCESS }, ERROR);
}

/**
 * Action to get the list of cities of the country
 * @param {string|number} countryId country id
 * @returns {function}
 */
export function getCountryCities(countryId: string | number) {
  const promiseReq = SettingsAPI.getCountryCities(countryId);
  const { PENDING, SUCCESS, ERROR } = COUNTRY_CITIES;
  return dispatchResponse(promiseReq, PENDING, { type: SUCCESS }, ERROR);
}

/**
 * Action to get the list of timezones of the country
 * @param {string|number} countryId country id
 * @returns {function}
 */
export function getCountryTimezones(countryId: string | number) {
  const promiseReq = SettingsAPI.getCountryTimezones(countryId);
  const { PENDING, SUCCESS, ERROR } = COUNTRY_TIMEZONES;
  return dispatchResponse(promiseReq, PENDING, { type: SUCCESS }, ERROR);
}

/**
 * Action to get the payout cycle frequencies
 * @returns {function}
 */
export function getFrequencies() {
  const promiseReq = SettingsAPI.getFrequencies();
  const { PENDING, SUCCESS, ERROR } = FREQUENCIES;
  return dispatchResponse(promiseReq, PENDING, { type: SUCCESS }, ERROR);
}

/**
 * Action to get the business bank account details
 * @returns {function}
 */
export function getBusinessBankDetails(
  accountId: string | number,
  businessId: string | number
) {
  const promiseReq = SettingsAPI.getBusinessBankDetails(accountId, businessId);
  const { PENDING, SUCCESS, ERROR } = BANK_ACCOUNTS.DETAILS;
  return dispatchResponse(promiseReq, PENDING, { type: SUCCESS }, ERROR);
}

/**
 * Action to get the account bank fields
 * @returns {function}
 */
export function getAccountBankFields(
  countryId: string | number,
  currencyId: string | number
) {
  const promiseReq = SettingsAPI.getAccountBankFields(countryId, currencyId);
  const { PENDING, SUCCESS, ERROR } = BANK_ACCOUNTS.FIELDS;
  return dispatchResponse(promiseReq, PENDING, { type: SUCCESS }, ERROR);
}

/**
 * Action to get the channel api keys
 * @param {string|number} accountId
 * @param {string|number} businessId
 * @param {string|number} channelId
 * @returns {function}
 */
export function getApiKeys(
  accountId: string | number,
  businessId: string | number,
  channelId: string | number
) {
  const promiseReq = SettingsAPI.getApiKeys(accountId, businessId, channelId);
  const { PENDING, SUCCESS, ERROR } = API_KEYS;
  return dispatchResponse(promiseReq, PENDING, { type: SUCCESS }, ERROR);
}
