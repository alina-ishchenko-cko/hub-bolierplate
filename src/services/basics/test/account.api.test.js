import * as AccountAPI from '../account.api';

describe('AccountAPI', () => {
  beforeEach(function() {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  // getAccounts
  describe('getAccounts()', () => {
    let getAccounts;
    const mockData = [{ accountId: 100069, name: 'TestMerchant' }];

    beforeEach(function() {
      // Mock Request
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: '200',
          response: {},
        });
      });
      getAccounts = AccountAPI.getAccounts();
    });

    it('should use get request method', () => {
      return getAccounts.then(({ request }) => {
        expect(request.config.method).toEqual('get');
      });
    });

    it('should call the path /accounts', () => {
      return getAccounts.then(({ request }) => {
        const path = getApiPath(request.url);
        expect(path).toEqual('/accounts');
      });
    });
  });

  // getAccountAssets
  describe('getAccountAssets()', () => {
    let getAccountAssets;
    const mockData = {
      businesses: [
        {
          accountId: 100069,
          channels: [
            {
              channelId: 100083,
            },
          ],
        },
      ],
    };

    beforeEach(function() {
      // Mock Request
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: '200',
          response: mockData,
        });
      });
      getAccountAssets = AccountAPI.getAccountAssets(1002);
    });

    it('should use get request method', () => {
      return getAccountAssets.then(({ request }) => {
        expect(request.config.method).toEqual('get');
      });
    });

    it('should call the path /accounts', () => {
      return getAccountAssets.then(({ request }) => {
        expect(request.url).toContain('/accounts/1002/assets');
      });
    });

    it('should handle missing params', () => {
      getAccountAssets = AccountAPI.getAccountAssets();
      return expect(getAccountAssets).rejects.toMatch(
        'Account.getAccountAssets() is missing entityId param'
      );
    });
  });

  describe('getChannelCurrency()', () => {
    let getChannelCurrency;

    beforeEach(function() {
      // Mock Request
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: '200',
          response: {},
        });
      });
      getChannelCurrency = AccountAPI.getChannelCurrency(1002, 1004);
    });

    it('should use get request method', () => {
      return getChannelCurrency.then(({ request }) => {
        expect(request.config.method).toEqual('get');
      });
    });

    it('should call the correct path', () => {
      return getChannelCurrency.then(({ request }) => {
        const path = getApiPath(request.url);
        expect(path).toEqual('/accounts/1002/channels/1004/currencies');
      });
    });

    it('should handle missing channelId params', () => {
      getChannelCurrency = AccountAPI.getChannelCurrency(1004);
      return expect(getChannelCurrency).rejects.toMatch(
        'Account.getChannelCurrency() is missing {channelId} param(s)'
      );
    });

    it('should handle missing params', () => {
      getChannelCurrency = AccountAPI.getChannelCurrency();
      return expect(getChannelCurrency).rejects.toMatch(
        'Account.getChannelCurrency() is missing {accountId,channelId} param(s)'
      );
    });
  });
});
