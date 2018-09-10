import * as CustomersAPI from '../customers.api';
import * as request from 'services/appRequest';

describe('CustomersAPI', () => {
  const token = '1234567890';

  beforeEach(function() {
    request.setToken(token);
    request.setCurrencyId(106);
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  afterAll(() => {
    request.setToken(null);
    request.setCurrencyId(null);
  });

  // getIndicators()
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
      getIndicators = CustomersAPI.getIndicators(mockData);
    });

    it('should use get request method', () => {
      return getIndicators.then(({ request }) => {
        expect(request.config.method).toEqual('get');
      });
    });

    it('should call the path /customers/overview/indicators', () => {
      return getIndicators.then(({ request }) => {
        const path = getApiPath(request.url);
        expect(path).toEqual(
          '/customers/overview/indicators?currencyId=106&entityId=10003&entityTypeId=2&fromDate=2012-04-03&toDate=2012-04-03'
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
      expect.assertions(1);
      mockData.entityId = undefined;
      getIndicators = CustomersAPI.getIndicators(mockData);
      return expect(getIndicators).rejects.toMatch(
        'Customers.getIndicators() is missing {entityId} param(s)'
      );
    });
  });

  // getCustomerDetails
  describe('getCustomerDetails()', () => {
    let getCustomerDetails;
    let mockData = {
      entityTypeId: 2,
      entityId: 10003,
      customerId: 'cust_E88E3FF9EE249G5C3A79',
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
      getCustomerDetails = CustomersAPI.getCustomerDetails(mockData);
    });

    it('should use get request method', () => {
      const expected = 'get';
      return getCustomerDetails.then(({ request }) => {
        expect(request.config.method).toBe(expected);
      });
    });

    it('should call the path customers/cust_E88E3FF9EE249G5C3A79', () => {
      const expected =
        '/customers/cust_E88E3FF9EE249G5C3A79?currencyId=106&entityId=10003&entityTypeId=2';
      return getCustomerDetails.then(({ request }) => {
        const path = getApiPath(request.url);
        expect(path).toBe(expected);
      });
    });

    it('should include X-AuthToken in headers', () => {
      return getCustomerDetails.then(({ request }) => {
        expect(request.headers['X-AuthToken']).toBeDefined();
        expect(request.headers['X-AuthToken']).toBe(token);
      });
    });

    it('should handle missing param', () => {
      getCustomerDetails = CustomersAPI.getCustomerDetails();
      return expect(getCustomerDetails).rejects.toMatch(
        'Customers.getCustomerDetails() is missing {entityId,entityTypeId,customerId} param(s)'
      );
    });
  });

  // getAll()
  describe('getAll()', () => {
    let getAll;
    let mockData = {
      entityId: 100069,
      entityTypeId: 2,
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
      getAll = CustomersAPI.getAll(mockData);
    });

    it('should use get request method', () => {
      return getAll.then(({ request }) => {
        expect(request.config.method).toEqual('get');
      });
    });

    it('should call the path /customers/overview/indicators', () => {
      return getAll.then(({ request }) => {
        const path = getApiPath(request.url);
        expect(path).toEqual(
          '/customers/overview?currencyId=106&entityId=100069&entityTypeId=2&fromDate=2017-06-30T23:00:00.000Z&toDate=2017-07-31T22:59:59.999Z&pageSize=10&sortColumn=timestamp&sortOrder=desc&startIndex=0'
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
      mockData.entityId = undefined;
      getAll = CustomersAPI.getAll(mockData);
      return expect(getAll).rejects.toMatch(
        'Customers.getAll() is missing {entityId} param(s)'
      );
    });
  });

  // getCustomerTransactions()
  describe('getCustomerTransactions()', () => {
    let getCustomerTransactions;
    let mockData = {
      entityId: 100069,
      entityTypeId: 2,
      limit: 5,
      customerId: 'cust_5',
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
      getCustomerTransactions = CustomersAPI.getCustomerTransactions(mockData);
    });

    it('should use get request method', () => {
      return getCustomerTransactions.then(({ request }) => {
        expect(request.config.method).toEqual('get');
      });
    });

    it('should call the path /customers/cust_5/transactions', () => {
      return getCustomerTransactions.then(({ request }) => {
        const path = getApiPath(request.url);
        expect(path).toEqual(
          '/customers/cust_5/transactions?entityId=100069&entityTypeId=2&limit=5&startIndex=0'
        );
      });
    });

    it('should include X-AuthToken in headers', () => {
      return getCustomerTransactions.then(({ request }) => {
        expect(request.headers['X-AuthToken']).toBeDefined();
        expect(request.headers['X-AuthToken']).toEqual(token);
      });
    });

    it('should handle missing params', () => {
      mockData.entityId = undefined;
      getCustomerTransactions = CustomersAPI.getCustomerTransactions(mockData);
      return expect(getCustomerTransactions).rejects.toMatch(
        'Customers.getCustomerTransactions() is missing {entityId} param(s)'
      );
    });
  });

  // updateCustomerDetails
  describe('updateCustomerDetails()', () => {
    let updateCustomerDetails;
    const customerId = 'cust_53D5F31D-5F43-426D-B736-210A958E6E56';
    const email = 'test@example.com';
    const name = 'Jack John';
    const phone = {
      number: '622545688',
      countryCode: '60',
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
      updateCustomerDetails = CustomersAPI.updateCustomerDetails(
        customerId,
        email,
        name,
        phone
      );
    });

    it('should use put request method', () => {
      return updateCustomerDetails.then(({ request }) => {
        expect(request.config.method).toBe('put');
      });
    });

    it('should call the path /customers/cust_53D5F31D-5F43-426D-B736-210A958E6E56', () => {
      return updateCustomerDetails.then(({ request }) => {
        const path = getApiPath(request.url);
        expect(path).toBe(
          '/customers/cust_53D5F31D-5F43-426D-B736-210A958E6E56'
        );
      });
    });

    it('should include X-AuthToken in headers', () => {
      return updateCustomerDetails.then(({ request }) => {
        expect(request.headers['X-AuthToken']).toBeDefined();
        expect(request.headers['X-AuthToken']).toEqual(token);
      });
    });

    it('should handle missing params', () => {
      updateCustomerDetails = CustomersAPI.updateCustomerDetails();
      return expect(updateCustomerDetails).rejects.toMatch(
        'Customers.updateCustomerDetails() is missing {customerId,email,name} param(s)'
      );
    });
  });

  // addCreditCard
  describe('addCreditCard()', () => {
    let addCreditCard;
    const customerId = 'cust_53D5F31D-5F43-426D-B736-210A958E6E56';
    const card = {
      number: '622545688',
      countryCode: '60',
    };
    const channelId = 100083;
    beforeEach(function() {
      // Mock Request
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: '200',
          response: {},
        });
      });
      addCreditCard = CustomersAPI.addCreditCard(customerId, card, channelId);
    });

    it('should use post request method', () => {
      return addCreditCard.then(({ request }) => {
        expect(request.config.method).toBe('post');
      });
    });

    it('should call the path /customers/cust_53D5F31D-5F43-426D-B736-210A958E6E56/cards', () => {
      return addCreditCard.then(({ request }) => {
        const path = getApiPath(request.url);
        expect(path).toBe(
          '/customers/cust_53D5F31D-5F43-426D-B736-210A958E6E56/cards'
        );
      });
    });

    it('should include X-AuthToken in headers', () => {
      return addCreditCard.then(({ request }) => {
        expect(request.headers['X-AuthToken']).toBeDefined();
        expect(request.headers['X-AuthToken']).toEqual(token);
      });
    });

    it('should handle missing params', () => {
      addCreditCard = CustomersAPI.addCreditCard();
      return expect(addCreditCard).rejects.toMatch(
        'Customers.addCreditCard() is missing {customerId,card,channelId} param(s)'
      );
    });
  });

  // updateCardDetails()
  describe('updateCardDetails()', () => {
    let updateCardDetails;
    let mockData = ['123123', 'cust_123123123', 1000, { address: 'test addy' }];

    beforeEach(function() {
      // Mock Request
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: '200',
          response: {},
        });
      });
      updateCardDetails = CustomersAPI.updateCardDetails(...mockData);
    });

    it('should use put request method', () => {
      return updateCardDetails.then(({ request }) => {
        expect(request.config.method).toEqual('put');
      });
    });

    it('should call the path /customers/cust_123123123/cards/123123', () => {
      return updateCardDetails.then(({ request }) => {
        const path = getApiPath(request.url);
        expect(path).toEqual('/customers/cust_123123123/cards/123123');
      });
    });

    it('should include X-AuthToken in headers', () => {
      return updateCardDetails.then(({ request }) => {
        expect(request.headers['X-AuthToken']).toBeDefined();
        expect(request.headers['X-AuthToken']).toEqual(token);
      });
    });

    it('should handle missing params', () => {
      mockData[0] = undefined;
      updateCardDetails = CustomersAPI.updateCardDetails(...mockData);
      return expect(updateCardDetails).rejects.toMatch(
        'Customers.updateCardDetails() is missing {cardId} param(s)'
      );
    });
  });

  // setDefaultCard()
  describe('setDefaultCard()', () => {
    let setDefaultCard;
    let mockData = ['5000', '23424', 123123];

    beforeEach(function() {
      // Mock Request
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: '200',
          response: {},
        });
      });
      setDefaultCard = CustomersAPI.setDefaultCard(...mockData);
    });

    it('should use put request method', () => {
      return setDefaultCard.then(({ request }) => {
        expect(request.config.method).toEqual('put');
      });
    });

    it('should call the path /customers/cust_23424/cards/id/default', () => {
      return setDefaultCard.then(({ request }) => {
        const path = getApiPath(request.url);
        expect(path).toEqual('/customers/cust_23424/cards/5000/default');
      });
    });

    it('should include X-AuthToken in headers', () => {
      return setDefaultCard.then(({ request }) => {
        expect(request.headers['X-AuthToken']).toBeDefined();
        expect(request.headers['X-AuthToken']).toEqual(token);
      });
    });

    it('should handle missing params', () => {
      mockData[0] = undefined;
      setDefaultCard = CustomersAPI.setDefaultCard(...mockData);
      return expect(setDefaultCard).rejects.toMatch(
        'Customers.setDefaultCard() is missing {cardId} param(s)'
      );
    });
  });

  // deleteCard()
  describe('deleteCard()', () => {
    let deleteCard;

    beforeEach(function() {
      // Mock Request
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: '200',
          response: {},
        });
      });
      deleteCard = CustomersAPI.deleteCard('23424', '5000');
    });

    it('should use delete request method', () => {
      return deleteCard.then(({ request }) => {
        expect(request.config.method).toEqual('delete');
      });
    });

    it('should call the path /customers/cust_23424/cards/5000', () => {
      return deleteCard.then(({ request }) => {
        const path = getApiPath(request.url);
        expect(path).toEqual('/customers/cust_5000/cards/23424');
      });
    });

    it('should include X-AuthToken in headers', () => {
      return deleteCard.then(({ request }) => {
        expect(request.headers['X-AuthToken']).toBeDefined();
        expect(request.headers['X-AuthToken']).toEqual(token);
      });
    });

    it('should handle missing params', () => {
      expect.assertions(1);
      deleteCard = CustomersAPI.deleteCard('5000');
      return expect(deleteCard).rejects.toMatch(
        'Customers.deleteCard() is missing {customerId} param(s)'
      );
    });
  });
});
