import * as SettingsAPI from '../settings.api';
import { setCurrencyId, setToken } from 'services/appRequest';

describe('SettingsAPI', () => {
  const token = '1234567890';

  beforeEach(function() {
    setToken(token);
    setCurrencyId(106);
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  afterAll(() => {
    setToken(null);
    setCurrencyId(null);
  });

  describe('getAccountDetails()', () => {
    let getAccountDetails;
    const accountId = '10002';

    beforeEach(function() {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: '200',
          response: {},
        });
      });
      getAccountDetails = SettingsAPI.getAccountDetails(accountId);
    });

    it('should use get request method', () => {
      return getAccountDetails.then(({ request }) => {
        expect(request.config.method).toBe('get');
      });
    });

    it('should call the path /accounts/10002', () => {
      const expected = '/accounts/10002';
      return getAccountDetails.then(({ request }) => {
        const path = getApiPath(request.url);
        expect(path).toBe(expected);
      });
    });

    it('should include X-AuthToken in headers', () => {
      return getAccountDetails.then(({ request }) => {
        expect(request.headers['X-AuthToken']).toBeDefined();
        expect(request.headers['X-AuthToken']).toBe(token);
      });
    });

    it('should handle missing params', () => {
      expect.assertions(1);
      const expected =
        'Settings.getAccountDetails() is missing {accountId} param(s)';
      return SettingsAPI.getAccountDetails().catch(errorMsg => {
        expect(errorMsg).toBe(expected);
      });
    });
  });

  describe('getBankAccountsDetails()', () => {
    let getBankAccountsDetails;
    const accountId = '10002';

    beforeEach(function() {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: '200',
          response: {},
        });
      });
      getBankAccountsDetails = SettingsAPI.getBankAccountsDetails(accountId);
    });

    it('should use get request method', () => {
      return getBankAccountsDetails.then(({ request }) => {
        expect(request.config.method).toBe('get');
      });
    });

    it('should call the path /accounts/10002/bank-accounts?isDetailed=true', () => {
      const expected = '/accounts/10002/bank-accounts?isDetailed=true';
      return getBankAccountsDetails.then(({ request }) => {
        const path = getApiPath(request.url);
        expect(path).toBe(expected);
      });
    });

    it('should include X-AuthToken in headers', () => {
      return getBankAccountsDetails.then(({ request }) => {
        expect(request.headers['X-AuthToken']).toBeDefined();
        expect(request.headers['X-AuthToken']).toBe(token);
      });
    });

    it('should handle missing params', () => {
      expect.assertions(1);
      const expected =
        'Settings.getBankAccountsDetails() is missing {accountId} param(s)';
      return SettingsAPI.getBankAccountsDetails().catch(errorMsg => {
        expect(errorMsg).toBe(expected);
      });
    });
  });

  describe('getAccountSettings()', () => {
    let getAccountSettings;
    const accountId = '10002';

    beforeEach(function() {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: '200',
          response: {},
        });
      });
      getAccountSettings = SettingsAPI.getAccountSettings(accountId);
    });

    it('should use get request method', () => {
      return getAccountSettings.then(({ request }) => {
        expect(request.config.method).toBe('get');
      });
    });

    it('should call the path /accounts/10002/account-settings-override', () => {
      const expected = '/accounts/10002/account-settings-override';
      return getAccountSettings.then(({ request }) => {
        const path = getApiPath(request.url);
        expect(path).toBe(expected);
      });
    });

    it('should include X-AuthToken in headers', () => {
      return getAccountSettings.then(({ request }) => {
        expect(request.headers['X-AuthToken']).toBeDefined();
        expect(request.headers['X-AuthToken']).toBe(token);
      });
    });

    it('should handle missing params', () => {
      expect.assertions(1);
      const expected =
        'Settings.getAccountSettings() is missing {accountId} param(s)';
      return SettingsAPI.getAccountSettings().catch(errorMsg => {
        expect(errorMsg).toBe(expected);
      });
    });
  });

  describe('getProcessingCurrencies()', () => {
    let getProcessingCurrencies;
    const accountId = '10002';
    const businessId = '10003';

    beforeEach(function() {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: '200',
          response: {},
        });
      });
      getProcessingCurrencies = SettingsAPI.getProcessingCurrencies(
        accountId,
        businessId
      );
    });

    it('should use get request method', () => {
      return getProcessingCurrencies.then(({ request }) => {
        expect(request.config.method).toBe('get');
      });
    });

    it('should call the path /accounts/10002/businesses/10003/processingCurrencies', () => {
      const expected = '/accounts/10002/businesses/10003/processingCurrencies';
      return getProcessingCurrencies.then(({ request }) => {
        const path = getApiPath(request.url);
        expect(path).toBe(expected);
      });
    });

    it('should include X-AuthToken in headers', () => {
      return getProcessingCurrencies.then(({ request }) => {
        expect(request.headers['X-AuthToken']).toBeDefined();
        expect(request.headers['X-AuthToken']).toBe(token);
      });
    });

    it('should handle missing params', () => {
      expect.assertions(1);
      const expected =
        'Settings.getProcessingCurrencies() is missing {accountId,businessId} param(s)';
      return SettingsAPI.getProcessingCurrencies().catch(errorMsg => {
        expect(errorMsg).toBe(expected);
      });
    });
  });

  describe('getApplePaySigningRequest()', () => {
    let getApplePaySigningRequest;
    const accountId = '10002';
    const businessId = '10003';

    beforeEach(function() {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: '200',
          response: {},
        });
      });
      getApplePaySigningRequest = SettingsAPI.getApplePaySigningRequest(
        accountId,
        businessId
      );
    });

    it('should use get request method', () => {
      return getApplePaySigningRequest.then(({ request }) => {
        expect(request.config.method).toBe('get');
      });
    });

    it('should call the path /accounts/10002/businesses/10003/business-settings/apple-pay/signing-request', () => {
      const expected =
        '/accounts/10002/businesses/10003/business-settings/apple-pay/signing-request';
      return getApplePaySigningRequest.then(({ request }) => {
        const path = getApiPath(request.url);
        expect(path).toBe(expected);
      });
    });

    it('should include X-AuthToken in headers', () => {
      return getApplePaySigningRequest.then(({ request }) => {
        expect(request.headers['X-AuthToken']).toBeDefined();
        expect(request.headers['X-AuthToken']).toBe(token);
      });
    });

    it('should handle missing params', () => {
      expect.assertions(1);
      const expected =
        'Settings.getApplePaySigningRequest() is missing {accountId,businessId} param(s)';
      return SettingsAPI.getApplePaySigningRequest().catch(errorMsg => {
        expect(errorMsg).toBe(expected);
      });
    });
  });

  describe('getApplePayCertificates()', () => {
    let getApplePayCertificates;
    const accountId = '10002';
    const businessId = '10003';

    beforeEach(function() {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: '200',
          response: {},
        });
      });
      getApplePayCertificates = SettingsAPI.getApplePayCertificates(
        accountId,
        businessId
      );
    });

    it('should use get request method', () => {
      return getApplePayCertificates.then(({ request }) => {
        expect(request.config.method).toBe('get');
      });
    });

    it('should call the path /accounts/10002/businesses/10003/business-settings/apple-pay/certificates', () => {
      const expected =
        '/accounts/10002/businesses/10003/business-settings/apple-pay/certificates';
      return getApplePayCertificates.then(({ request }) => {
        const path = getApiPath(request.url);
        expect(path).toBe(expected);
      });
    });

    it('should include X-AuthToken in headers', () => {
      return getApplePayCertificates.then(({ request }) => {
        expect(request.headers['X-AuthToken']).toBeDefined();
        expect(request.headers['X-AuthToken']).toBe(token);
      });
    });

    it('should handle missing params', () => {
      expect.assertions(1);
      const expected =
        'Settings.getApplePayCertificates() is missing {accountId,businessId} param(s)';
      return SettingsAPI.getApplePayCertificates().catch(errorMsg => {
        expect(errorMsg).toBe(expected);
      });
    });
  });

  describe('getProcessingSettings()', () => {
    let getProcessingSettings;
    const accountId = '10002';
    const businessId = '10003';

    beforeEach(function() {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: '200',
          response: {},
        });
      });
      getProcessingSettings = SettingsAPI.getProcessingSettings(
        accountId,
        businessId
      );
    });

    it('should use get request method', () => {
      return getProcessingSettings.then(({ request }) => {
        expect(request.config.method).toBe('get');
      });
    });

    it('should call the path /accounts/10002/properties/10003/processor-management', () => {
      const expected = '/accounts/10002/properties/10003/processor-management';
      return getProcessingSettings.then(({ request }) => {
        const path = getApiPath(request.url);
        expect(path).toBe(expected);
      });
    });

    it('should include X-AuthToken in headers', () => {
      return getProcessingSettings.then(({ request }) => {
        expect(request.headers['X-AuthToken']).toBeDefined();
        expect(request.headers['X-AuthToken']).toBe(token);
      });
    });

    it('should handle missing params', () => {
      expect.assertions(1);
      const expected =
        'Settings.getProcessingSettings() is missing {accountId,businessId} param(s)';
      return SettingsAPI.getProcessingSettings().catch(errorMsg => {
        expect(errorMsg).toBe(expected);
      });
    });
  });

  describe('getPaymentMethods()', () => {
    let getPaymentMethods;
    const accountId = '10002';
    const businessId = '10003';

    beforeEach(function() {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: '200',
          response: {},
        });
      });
      getPaymentMethods = SettingsAPI.getPaymentMethods(accountId, businessId);
    });

    it('should use get request method', () => {
      return getPaymentMethods.then(({ request }) => {
        expect(request.config.method).toBe('get');
      });
    });

    it('should call the path /accounts/10002/businesses/10003/payment-methods', () => {
      const expected = '/accounts/10002/businesses/10003/payment-methods';
      return getPaymentMethods.then(({ request }) => {
        const path = getApiPath(request.url);
        expect(path).toBe(expected);
      });
    });

    it('should include X-AuthToken in headers', () => {
      return getPaymentMethods.then(({ request }) => {
        expect(request.headers['X-AuthToken']).toBeDefined();
        expect(request.headers['X-AuthToken']).toBe(token);
      });
    });

    it('should handle missing params', () => {
      expect.assertions(1);
      const expected =
        'Settings.getPaymentMethods() is missing {accountId,businessId} param(s)';
      return SettingsAPI.getPaymentMethods().catch(errorMsg => {
        expect(errorMsg).toBe(expected);
      });
    });
  });

  describe('getServiceSettings()', () => {
    let getServiceSettings;
    const accountId = '10002';

    beforeEach(function() {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: '200',
          response: {},
        });
      });
      getServiceSettings = SettingsAPI.getServiceSettings(accountId);
    });

    it('should use get request method', () => {
      return getServiceSettings.then(({ request }) => {
        expect(request.config.method).toBe('get');
      });
    });

    it('should call the path /accounts/10002/service-settings', () => {
      const expected = '/accounts/10002/service-settings';
      return getServiceSettings.then(({ request }) => {
        const path = getApiPath(request.url);
        expect(path).toBe(expected);
      });
    });

    it('should include X-AuthToken in headers', () => {
      return getServiceSettings.then(({ request }) => {
        expect(request.headers['X-AuthToken']).toBeDefined();
        expect(request.headers['X-AuthToken']).toBe(token);
      });
    });

    it('should handle missing params', () => {
      expect.assertions(1);
      const expected =
        'Settings.getServiceSettings() is missing {accountId} param(s)';
      return SettingsAPI.getServiceSettings().catch(errorMsg => {
        expect(errorMsg).toBe(expected);
      });
    });
  });

  describe('updateDisplayCurrency()', () => {
    let updateDisplayCurrency;
    const accountId = '10002';
    const currencyId = 141;

    beforeEach(function() {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: '200',
          response: {},
        });
      });
      updateDisplayCurrency = SettingsAPI.updateDisplayCurrency(
        accountId,
        currencyId
      );
    });

    it('should use put request method', () => {
      return updateDisplayCurrency.then(({ request }) => {
        expect(request.config.method).toBe('put');
      });
    });

    it('should call the path /accounts/10002/display-currency', () => {
      const expected = '/accounts/10002/display-currency';
      return updateDisplayCurrency.then(({ request }) => {
        const path = getApiPath(request.url);
        expect(path).toBe(expected);
      });
    });

    it('should include X-AuthToken in headers', () => {
      return updateDisplayCurrency.then(({ request }) => {
        expect(request.headers['X-AuthToken']).toBeDefined();
        expect(request.headers['X-AuthToken']).toBe(token);
      });
    });

    it('should handle missing params', () => {
      expect.assertions(1);
      const expected =
        'Settings.updateDisplayCurrency() is missing {accountId,currencyId} param(s)';
      return SettingsAPI.updateDisplayCurrency().catch(errorMsg => {
        expect(errorMsg).toBe(expected);
      });
    });
  });

  describe('updateBankAccountInfo()', () => {
    let updateBankAccountInfo;
    const accountId = '10002';
    const bankAccountId = 3;
    const data = {};

    beforeEach(function() {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: '200',
          response: {},
        });
      });
      updateBankAccountInfo = SettingsAPI.updateBankAccountInfo(
        accountId,
        bankAccountId,
        data
      );
    });

    it('should use put request method', () => {
      return updateBankAccountInfo.then(({ request }) => {
        expect(request.config.method).toBe('put');
      });
    });

    it('should call the path /accounts/10002/bank-accounts/3', () => {
      const expected = '/accounts/10002/bank-accounts/3';
      return updateBankAccountInfo.then(({ request }) => {
        const path = getApiPath(request.url);
        expect(path).toBe(expected);
      });
    });

    it('should include X-AuthToken in headers', () => {
      return updateBankAccountInfo.then(({ request }) => {
        expect(request.headers['X-AuthToken']).toBeDefined();
        expect(request.headers['X-AuthToken']).toBe(token);
      });
    });

    it('should handle missing params', () => {
      expect.assertions(1);
      const expected =
        'Settings.updateBankAccountInfo() is missing {accountId,bankAccountId,data} param(s)';
      return SettingsAPI.updateBankAccountInfo().catch(errorMsg => {
        expect(errorMsg).toBe(expected);
      });
    });
  });

  describe('getCountryCities()', () => {
    let getCountryCities;
    const countryId = 59;

    beforeEach(function() {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: '200',
          response: {},
        });
      });
      getCountryCities = SettingsAPI.getCountryCities(countryId);
    });

    it('should use get request method', () => {
      return getCountryCities.then(({ request }) => {
        expect(request.config.method).toBe('get');
      });
    });

    it('should call the path /countries/59/cities', () => {
      const expected = '/countries/59/cities';
      return getCountryCities.then(({ request }) => {
        const path = getApiPath(request.url);
        expect(path).toBe(expected);
      });
    });

    it('should include X-AuthToken in headers', () => {
      return getCountryCities.then(({ request }) => {
        expect(request.headers['X-AuthToken']).toBeDefined();
        expect(request.headers['X-AuthToken']).toBe(token);
      });
    });

    it('should handle missing params', () => {
      expect.assertions(1);
      const expected =
        'Settings.getCountryCities() is missing {countryId} param(s)';
      return SettingsAPI.getCountryCities().catch(errorMsg => {
        expect(errorMsg).toBe(expected);
      });
    });
  });

  describe('getCountryTimezones()', () => {
    let getCountryTimezones;
    const countryId = 59;

    beforeEach(function() {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: '200',
          response: {},
        });
      });
      getCountryTimezones = SettingsAPI.getCountryTimezones(countryId);
    });

    it('should use get request method', () => {
      return getCountryTimezones.then(({ request }) => {
        expect(request.config.method).toBe('get');
      });
    });

    it('should call the path /lookups/countries/59/timezones', () => {
      const expected = '/lookups/countries/59/timezones';
      return getCountryTimezones.then(({ request }) => {
        const path = getApiPath(request.url);
        expect(path).toBe(expected);
      });
    });

    it('should include X-AuthToken in headers', () => {
      return getCountryTimezones.then(({ request }) => {
        expect(request.headers['X-AuthToken']).toBeDefined();
        expect(request.headers['X-AuthToken']).toBe(token);
      });
    });

    it('should handle missing params', () => {
      expect.assertions(1);
      const expected =
        'Settings.getCountryTimezones() is missing {countryId} param(s)';
      return SettingsAPI.getCountryTimezones().catch(errorMsg => {
        expect(errorMsg).toBe(expected);
      });
    });
  });

  describe('updateProfile()', () => {
    let updateProfile;
    const mockData = ['test', 'test@text.com', 'london'];

    beforeEach(function() {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: '200',
          response: {},
        });
      });
      updateProfile = SettingsAPI.updateProfile(...mockData);
    });

    it('should use put request method', () => {
      return updateProfile.then(({ request }) => {
        expect(request.config.method).toBe('put');
      });
    });

    it('should call the path /me', () => {
      const expected = '/me';
      return updateProfile.then(({ request }) => {
        const path = getApiPath(request.url);
        expect(path).toBe(expected);
      });
    });

    it('should include X-AuthToken in headers', () => {
      return updateProfile.then(({ request }) => {
        expect(request.headers['X-AuthToken']).toBeDefined();
        expect(request.headers['X-AuthToken']).toBe(token);
      });
    });

    it('should handle missing params', () => {
      mockData[0] = undefined;
      updateProfile = SettingsAPI.updateProfile(...mockData);
      return expect(updateProfile).rejects.toMatch(
        'Settings.updateProfile() is missing {name} param(s)'
      );
    });
  });

  describe('getFrequencies()', () => {
    let getFrequencies;

    beforeEach(function() {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: '200',
          response: {},
        });
      });
      getFrequencies = SettingsAPI.getFrequencies();
    });

    it('should use get request method', () => {
      return getFrequencies.then(({ request }) => {
        expect(request.config.method).toBe('get');
      });
    });

    it('should call the path /lookups/frequencies', () => {
      const expected = '/lookups/frequencies';
      return getFrequencies.then(({ request }) => {
        const path = getApiPath(request.url);
        expect(path).toBe(expected);
      });
    });

    it('should include X-AuthToken in headers', () => {
      return getFrequencies.then(({ request }) => {
        expect(request.headers['X-AuthToken']).toBeDefined();
        expect(request.headers['X-AuthToken']).toBe(token);
      });
    });
  });

  describe('getBusinessBankDetails()', () => {
    let getBusinessBankDetails;

    beforeEach(function() {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: '200',
          response: {},
        });
      });
      getBusinessBankDetails = SettingsAPI.getBusinessBankDetails(1000, 10005);
    });

    it('should use get request method', () => {
      return getBusinessBankDetails.then(({ request }) => {
        expect(request.config.method).toBe('get');
      });
    });

    it('should call the path /accounts/1000/businesses/10005/bank-accounts', () => {
      const expected =
        '/accounts/1000/businesses/10005/bank-accounts?isDetailed=true';
      return getBusinessBankDetails.then(({ request }) => {
        const path = getApiPath(request.url);
        expect(path).toBe(expected);
      });
    });

    it('should include X-AuthToken in headers', () => {
      return getBusinessBankDetails.then(({ request }) => {
        expect(request.headers['X-AuthToken']).toBeDefined();
        expect(request.headers['X-AuthToken']).toBe(token);
      });
    });

    it('should handle missing params', () => {
      getBusinessBankDetails = SettingsAPI.getBusinessBankDetails(1000);
      return expect(getBusinessBankDetails).rejects.toMatch(
        'Settings.getBusinessBankDetails() is missing {businessId} param(s)'
      );
    });
  });

  describe('getAccountBankFields()', () => {
    let getAccountBankFields;

    beforeEach(function() {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: '200',
          response: {},
        });
      });
      getAccountBankFields = SettingsAPI.getAccountBankFields(1000, 10005);
    });

    it('should use get request method', () => {
      return getAccountBankFields.then(({ request }) => {
        expect(request.config.method).toBe('get');
      });
    });

    it('should call the path /bank-fields?countryId=1000&currencyId=10005', () => {
      const expected = '/bank-fields?countryId=1000&currencyId=10005';
      return getAccountBankFields.then(({ request }) => {
        const path = getApiPath(request.url);
        expect(path).toBe(expected);
      });
    });

    it('should include X-AuthToken in headers', () => {
      return getAccountBankFields.then(({ request }) => {
        expect(request.headers['X-AuthToken']).toBeDefined();
        expect(request.headers['X-AuthToken']).toBe(token);
      });
    });

    it('should handle missing params', () => {
      getAccountBankFields = SettingsAPI.getAccountBankFields(1000);
      return expect(getAccountBankFields).rejects.toMatch(
        'Settings.getAccountBankFields() is missing {currencyId} param(s)'
      );
    });
  });

  describe('getApiKeys()', () => {
    let getApiKeys;

    beforeEach(function() {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: '200',
          response: {},
        });
      });
      getApiKeys = SettingsAPI.getApiKeys(1000, 10005, 10008);
    });

    it('should use get request method', () => {
      return getApiKeys.then(({ request }) => {
        expect(request.config.method).toBe('get');
      });
    });

    it('should call the path /accounts/1000/businesses/10005/channels/10008/api-keys', () => {
      const expected =
        '/accounts/1000/businesses/10005/channels/10008/api-keys';
      return getApiKeys.then(({ request }) => {
        const path = getApiPath(request.url);
        expect(path).toBe(expected);
      });
    });

    it('should include X-AuthToken in headers', () => {
      return getApiKeys.then(({ request }) => {
        expect(request.headers['X-AuthToken']).toBeDefined();
        expect(request.headers['X-AuthToken']).toBe(token);
      });
    });

    it('should handle missing params', () => {
      getApiKeys = SettingsAPI.getApiKeys(1000);
      return expect(getApiKeys).rejects.toMatch(
        'Settings.getApiKeys() is missing {businessId,channelId} param(s)'
      );
    });
  });
});
