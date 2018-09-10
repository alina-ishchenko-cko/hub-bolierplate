import * as TransactionsAPI from '../transactions.api';
import { setCurrencyId, setToken } from 'services/appRequest';

describe('TransactionsAPI', () => {
  const token = '1234567890';

  beforeEach(function() {
    setToken(token);
    setCurrencyId('106');
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  afterAll(() => {
    setToken(null);
    setCurrencyId(null);
  });

  // getIndicators
  describe('getIndicators()', () => {
    let getIndicators;
    let mockData = {
      entityTypeId: 2,
      entityId: 10003,
      fromDate: '2012-04-03',
      toDate: '2012-04-03',
    };

    beforeEach(function() {
      // Mock Request
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: '200',
          response: {},
        });
      });
      getIndicators = TransactionsAPI.getIndicators(mockData);
    });

    it('should use get request method', () => {
      return getIndicators.then(({ request }) => {
        expect(request.config.method).toEqual('get');
      });
    });

    it('should call the path /transactions/overview/indicators', () => {
      return getIndicators.then(({ request }) => {
        const path = getApiPath(request.url);
        expect(path).toEqual(
          '/transactions/overview/indicators?currencyId=106&entityId=10003&entityTypeId=2&fromDate=2012-04-03&toDate=2012-04-03'
        );
      });
    });

    it('should include X-AuthToken in headers', () => {
      return getIndicators.then(({ request }) => {
        expect(request.headers['X-AuthToken']).toBeDefined();
        expect(request.headers['X-AuthToken']).toEqual(token);
      });
    });

    it('should handle missing params', () => {
      mockData.entityId = undefined;
      getIndicators = TransactionsAPI.getIndicators(mockData);
      return expect(getIndicators).rejects.toMatch(
        'Transactions.getIndicators() is missing {entityId} param(s)'
      );
    });
  });

  // getIndicators
  describe('getAll()', () => {
    let getAll;
    let dataParam = {
      entityId: 100069,
      entityType: 'accounts',
      fromDate: '2017-06-30T23:00:00.000Z',
      toDate: '2017-07-31T22:59:59.999Z',
      pageSize: 10,
      sortColumn: 'timestamp',
      sortOrder: 'desc',
      startIndex: 0,
    };

    beforeEach(function() {
      // Mock Request
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: '200',
          response: {},
        });
      });
      getAll = TransactionsAPI.getAll(dataParam);
    });

    it('should use get request method', () => {
      return getAll.then(({ request }) => {
        expect(request.config.method).toEqual('get');
      });
    });

    it('should call the path hub/accounts/100069/transactions', () => {
      return getAll.then(({ request }) => {
        const path = getApiPath(request.url);
        expect(path).toEqual(
          '/accounts/100069/transactions?fromDate=2017-06-30T23:00:00.000Z&toDate=2017-07-31T22:59:59.999Z&pageSize=10&sortColumn=timestamp&sortOrder=desc&startIndex=0'
        );
      });
    });

    it('should add the business is for channel level request', () => {
      let dataParam = {
        entityId: 100069,
        entityType: 'channels',
        businessId: 10002,
        fromDate: '2017-06-30T23:00:00.000Z',
        toDate: '2017-07-31T22:59:59.999Z',
        pageSize: 10,
        sortColumn: 'timestamp',
        sortOrder: 'desc',
        startIndex: 0,
      };
      getAll = TransactionsAPI.getAll(dataParam);
      return getAll.then(({ request }) => {
        const path = getApiPath(request.url);
        expect(path).toEqual(
          '/businesses/10002/channels/100069/transactions?fromDate=2017-06-30T23:00:00.000Z&toDate=2017-07-31T22:59:59.999Z&pageSize=10&sortColumn=timestamp&sortOrder=desc&startIndex=0'
        );
      });
    });

    it('should include X-AuthToken in headers', () => {
      return getAll.then(({ request }) => {
        expect(request.headers['X-AuthToken']).toBeDefined();
        expect(request.headers['X-AuthToken']).toEqual(token);
      });
    });

    it('should handle missing params', () => {
      dataParam.entityId = undefined;
      getAll = TransactionsAPI.getAll(dataParam);
      return expect(getAll).rejects.toMatch(
        'Transactions.getAll() is missing {entityId} param(s)'
      );
    });
  });

  // get transaction details
  describe('getTransactionDetails()', () => {
    let getTransactionDetails;
    const chargeId = 'test_E88E3FF9EE249G5C3A79';

    beforeEach(function() {
      // Mock Request
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: '200',
          response: {},
        });
      });
      getTransactionDetails = TransactionsAPI.getTransactionDetails(chargeId);
    });

    it('should use get request method', () => {
      const expected = 'get';
      return getTransactionDetails.then(({ request }) => {
        expect(request.config.method).toBe(expected);
      });
    });

    it('should call the path transactions/test_E88E3FF9EE249G5C3A79', () => {
      const expected = '/transactions/test_E88E3FF9EE249G5C3A79?currencyId=106';
      return getTransactionDetails.then(({ request }) => {
        const path = getApiPath(request.url);
        expect(path).toBe(expected);
      });
    });

    it('should include X-AuthToken in headers', () => {
      return getTransactionDetails.then(({ request }) => {
        expect(request.headers['X-AuthToken']).toBeDefined();
        expect(request.headers['X-AuthToken']).toBe(token);
      });
    });

    it('should handle missing param', () => {
      getTransactionDetails = TransactionsAPI.getTransactionDetails();
      expect.assertions(1);
      return expect(getTransactionDetails).rejects.toMatch(
        'Transactions.getTransactionDetails() is missing: chargeId'
      );
    });
  });

  describe('createCharges()', () => {
    let createCharges;
    let dataParam;

    beforeEach(function() {
      dataParam = {
        channelId: 1,
        card: {
          number: '112',
          name: 'Test',
          cvv2: 232,
          expiryMonth: '01',
          expiryYear: '08',
        },
        autoCapTime: 0,
        email: 'test@email.com',
        currency: 'gbp',
        amount: 1,
        type: 'card',
        autoCapture: 'y',
        billingDetails: {},
        shippingDetails: null,
        udf1: '',
      };

      // Mock Request
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: '200',
          response: {},
        });
      });
      createCharges = TransactionsAPI.createCharges(dataParam);
    });

    it('should use post request method', () => {
      return createCharges.then(({ request }) => {
        expect(request.config.method).toEqual('post');
      });
    });

    it('should call the path /charges', () => {
      return createCharges.then(({ request }) => {
        const path = getApiPath(request.url);
        expect(path).toEqual('/charges');
      });
    });

    it('should include X-AuthToken in headers', () => {
      return createCharges.then(({ request }) => {
        expect(request.headers['X-AuthToken']).toBeDefined();
        expect(request.headers['X-AuthToken']).toEqual(token);
      });
    });

    it('should handle missing card cvv2 params', () => {
      dataParam.card.cvv2 = undefined;
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: '200',
          response: {},
        });
      });
      createCharges = TransactionsAPI.createCharges(dataParam);
      return createCharges.then(
        x => {},
        errorMsg => {
          expect(errorMsg).toEqual(
            'Transactions.createCharges() is missing {cvv2} param(s)'
          );
        }
      );
    });

    it('should handle missing card params', () => {
      dataParam.card = undefined;
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: '200',
          response: {},
        });
      });
      createCharges = TransactionsAPI.createCharges(dataParam);
      return expect(createCharges).rejects.toMatch(
        'Transactions.createCharges() is missing {card} param(s)'
      );
    });

    it('should handle all params missing', () => {
      dataParam = {};
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: '200',
          response: {},
        });
      });
      createCharges = TransactionsAPI.createCharges(dataParam);
      return expect(createCharges).rejects.toMatch(
        'Transactions.createCharges() is missing {channelId,autoCapTime,email,currency,amount,type,autoCapture,billingDetails,shippingDetails,udf1,card} param(s)'
      );
    });
  });

  // get transaction blacklist
  describe('getTransactionBlacklist()', () => {
    let getTransactionBlacklist;
    const chargeId = 'test_E88E3FF9EE249G5C3A79';

    beforeEach(function() {
      // Mock Request
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: '200',
          response: {},
        });
      });
      getTransactionBlacklist = TransactionsAPI.getTransactionBlacklist(
        chargeId
      );
    });

    it('should use get request method', () => {
      const expected = 'get';
      return getTransactionBlacklist.then(({ request }) => {
        expect(request.config.method).toBe(expected);
      });
    });

    it('should call the path transactions/test_E88E3FF9EE249G5C3A79/blacklist', () => {
      const expected = '/transactions/test_E88E3FF9EE249G5C3A79/blacklist';
      return getTransactionBlacklist.then(({ request }) => {
        const path = getApiPath(request.url);
        expect(path).toBe(expected);
      });
    });

    it('should include X-AuthToken in headers', () => {
      return getTransactionBlacklist.then(({ request }) => {
        expect(request.headers['X-AuthToken']).toBeDefined();
        expect(request.headers['X-AuthToken']).toBe(token);
      });
    });

    it('should handle missing param', () => {
      getTransactionBlacklist = TransactionsAPI.getTransactionBlacklist();
      expect.assertions(1);
      return expect(getTransactionBlacklist).rejects.toMatch(
        'Transactions.getTransactionBlacklist() is missing: chargeId'
      );
    });
  });

  // blacklist transaction
  describe('blacklistTransaction()', () => {
    let blacklistTransaction;
    const chargeId = 'test_E88E3FF9EE249G5C3A79';
    const params = {
      entityId: 1002,
      entityTypeId: 2,
    };

    beforeEach(function() {
      // Mock Request
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: '200',
          response: {},
        });
      });
      blacklistTransaction = TransactionsAPI.blacklistTransaction(
        chargeId,
        params
      );
    });

    it('should use put request method', () => {
      const expected = 'put';
      return blacklistTransaction.then(({ request }) => {
        expect(request.config.method).toBe(expected);
      });
    });

    it('should call the path transactions/test_E88E3FF9EE249G5C3A79/blacklist?entityId=1002&entityTypeId=2', () => {
      const expected =
        '/transactions/test_E88E3FF9EE249G5C3A79/blacklist?entityId=1002&entityTypeId=2';
      return blacklistTransaction.then(({ request }) => {
        const path = getApiPath(request.url);
        expect(path).toBe(expected);
      });
    });

    it('should include X-AuthToken in headers', () => {
      return blacklistTransaction.then(({ request }) => {
        expect(request.headers['X-AuthToken']).toBeDefined();
        expect(request.headers['X-AuthToken']).toBe(token);
      });
    });

    it('should handle missing param', () => {
      blacklistTransaction = TransactionsAPI.blacklistTransaction();
      expect.assertions(1);
      return expect(blacklistTransaction).rejects.toMatch(
        'Transactions.blacklistTransaction() is missing {chargeId,entityId,entityTypeId} param(s)'
      );
    });
  });

  // void transaction
  describe('voidTransaction()', () => {
    let voidTransaction;
    const chargeId = 'test_E88E3FF9EE249G5C3A79';
    const params = {
      amount: 543,
      note: '',
    };

    beforeEach(function() {
      // Mock Request
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: '200',
          response: {},
        });
      });
      voidTransaction = TransactionsAPI.voidTransaction(chargeId, params);
    });

    it('should use post request method', () => {
      const expected = 'post';
      return voidTransaction.then(({ request }) => {
        expect(request.config.method).toBe(expected);
      });
    });

    it('should call the path charges/test_E88E3FF9EE249G5C3A79/void', () => {
      const expected = '/charges/test_E88E3FF9EE249G5C3A79/void';
      return voidTransaction.then(({ request }) => {
        const path = getApiPath(request.url);
        expect(path).toBe(expected);
      });
    });

    it('should include X-AuthToken in headers', () => {
      return voidTransaction.then(({ request }) => {
        expect(request.headers['X-AuthToken']).toBeDefined();
        expect(request.headers['X-AuthToken']).toBe(token);
      });
    });

    it('should handle missing params', () => {
      const voidTransactionError = TransactionsAPI.voidTransaction();
      return expect(voidTransactionError).rejects.toMatch(
        'Transactions.voidTransaction() is missing {chargeId,amount} param(s)'
      );
    });
  });

  // refund transaction
  describe('refundTransaction()', () => {
    let refundTransaction;
    const chargeId = 'test_E88E3FF9EE249G5C3A79';
    const params = {
      amount: 543,
      note: '',
    };

    beforeEach(function() {
      // Mock Request
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: '200',
          response: {},
        });
      });
      refundTransaction = TransactionsAPI.refundTransaction(chargeId, params);
    });

    it('should use post request method', () => {
      const expected = 'post';
      return refundTransaction.then(({ request }) => {
        expect(request.config.method).toBe(expected);
      });
    });

    it('should call the path charges/test_E88E3FF9EE249G5C3A79/refund', () => {
      const expected = '/charges/test_E88E3FF9EE249G5C3A79/refund';
      return refundTransaction.then(({ request }) => {
        const path = getApiPath(request.url);
        expect(path).toBe(expected);
      });
    });

    it('should include X-AuthToken in headers', () => {
      return refundTransaction.then(({ request }) => {
        expect(request.headers['X-AuthToken']).toBeDefined();
        expect(request.headers['X-AuthToken']).toBe(token);
      });
    });

    it('should handle missing param', () => {
      const refundTransactionError = TransactionsAPI.refundTransaction();
      expect.assertions(1);
      return expect(refundTransactionError).rejects.toMatch(
        'Transactions.refundTransaction() is missing {chargeId,amount} param(s)'
      );
    });
  });

  // capture transaction
  describe('captureTransaction()', () => {
    let captureTransaction;
    const chargeId = 'test_E88E3FF9EE249G5C3A79';
    const params = {
      amount: 543,
      note: '',
    };

    beforeEach(function() {
      // Mock Request
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: '200',
          response: {},
        });
      });
      captureTransaction = TransactionsAPI.captureTransaction(chargeId, params);
    });

    it('should use post request method', () => {
      const expected = 'post';
      return captureTransaction.then(({ request }) => {
        expect(request.config.method).toBe(expected);
      });
    });

    it('should call the path charges/test_E88E3FF9EE249G5C3A79/capture', () => {
      const expected = '/charges/test_E88E3FF9EE249G5C3A79/capture';
      return captureTransaction.then(({ request }) => {
        const path = getApiPath(request.url);
        expect(path).toBe(expected);
      });
    });

    it('should include X-AuthToken in headers', () => {
      return captureTransaction.then(({ request }) => {
        expect(request.headers['X-AuthToken']).toBeDefined();
        expect(request.headers['X-AuthToken']).toBe(token);
      });
    });

    it('should handle missing param', () => {
      const captureTransactionError = TransactionsAPI.captureTransaction();
      expect.assertions(1);
      return expect(captureTransactionError).rejects.toMatch(
        'Transactions.captureTransaction() is missing {chargeId,amount} param(s)'
      );
    });
  });

  // getTransactionLogs
  describe('getTransactionLogs()', () => {
    let getTransactionLogs;
    let dataParam = {
      chargeId: 100069,
      fromDate: '2017-06-30T23:00:00.000Z',
      toDate: '2017-07-31T22:59:59.999Z',
      pageSize: 10,
      sortField: 'timestamp',
      sortOrder: 'desc',
      startIndex: 0,
    };

    beforeEach(function() {
      // Mock Request
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: '200',
          response: {},
        });
      });
      getTransactionLogs = TransactionsAPI.getTransactionLogs(dataParam);
    });

    it('should use get request method', () => {
      return getTransactionLogs.then(({ request }) => {
        expect(request.config.method).toEqual('get');
      });
    });

    it('should call the path hub/transactions/100069/logs', () => {
      return getTransactionLogs.then(({ request }) => {
        const path = getApiPath(request.url);
        expect(path).toEqual(
          '/transactions/100069/logs?fromDate=2017-06-30T23:00:00.000Z&toDate=2017-07-31T22:59:59.999Z&pageSize=10&sortColumn=timestamp&sortOrder=desc&startIndex=0'
        );
      });
    });

    it('should include X-AuthToken in headers', () => {
      return getTransactionLogs.then(({ request }) => {
        expect(request.headers['X-AuthToken']).toBeDefined();
        expect(request.headers['X-AuthToken']).toEqual(token);
      });
    });

    it('should handle missing params', () => {
      dataParam.chargeId = undefined;
      getTransactionLogs = TransactionsAPI.getTransactionLogs(dataParam);
      return expect(getTransactionLogs).rejects.toMatch(
        'Transactions.getTransactionLogs() is missing {chargeId} param(s)'
      );
    });
  });

  // getResponseCodes
  describe('getResponseCodes()', () => {
    let getResponseCodes;
    let dataParam = [
      100069,
      1002,
      '2017-06-30T23:00:00.000Z',
      '2017-07-31T22:59:59.999Z',
    ];

    beforeEach(function() {
      // Mock Request
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: '200',
          response: {},
        });
      });
      getResponseCodes = TransactionsAPI.getResponseCodes(...dataParam);
    });

    it('should use get request method', () => {
      return getResponseCodes.then(({ request }) => {
        expect(request.config.method).toEqual('get');
      });
    });

    it('should call the path hub/transactions/100069/logs', () => {
      return getResponseCodes.then(({ request }) => {
        const path = getApiPath(request.url);
        expect(path).toEqual(
          '/transactions/gateway-response/codes?accountId=100069&businessId=1002&fromDate=2017-06-30T23:00:00.000Z&toDate=2017-07-31T22:59:59.999Z'
        );
      });
    });

    it('should include X-AuthToken in headers', () => {
      return getResponseCodes.then(({ request }) => {
        expect(request.headers['X-AuthToken']).toBeDefined();
        expect(request.headers['X-AuthToken']).toEqual(token);
      });
    });

    it('should handle missing params', () => {
      getResponseCodes = TransactionsAPI.getResponseCodes(100069, 102);
      return expect(getResponseCodes).rejects.toMatch(
        'Transactions.getResponseCodes() is missing {fromDate,toDate} param(s)'
      );
    });
  });
});
