import * as PaymentPlanAPI from '../payment-plans.api';
import { setCurrencyId, setToken } from 'services/appRequest';

describe('PaymentPlan', () => {
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

  // getPaymentPlanList
  describe('getPaymentPlanList()', () => {
    let getPaymentPlanList;

    beforeEach(function() {
      // Mock Request
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: '200',
          response: {},
        });
      });
      getPaymentPlanList = PaymentPlanAPI.getPaymentPlanList(10003, 2, 10, 0);
    });

    it('should use get request method', () => {
      return getPaymentPlanList.then(({ request }) => {
        expect(request.config.method).toEqual('get');
      });
    });

    it('should call the correct endpoint', () => {
      return getPaymentPlanList.then(({ request }) => {
        const path = getApiPath(request.url);
        expect(path).toEqual(
          '/recurringPayments/plans?entityId=10003&entityTypeId=2&pageSize=10&startIndex=0'
        );
      });
    });

    it('should include X-AuthToken in headers', () => {
      return getPaymentPlanList.then(({ request }) => {
        expect(request.headers['X-AuthToken']).toBeDefined();
        expect(request.headers['X-AuthToken']).toEqual(token);
      });
    });

    it('should handle missing params', () => {
      getPaymentPlanList = PaymentPlanAPI.getPaymentPlanList();
      return expect(getPaymentPlanList).rejects.toMatch(
        'PaymentPlan.getPaymentPlanList() is missing {entityId,entityTypeId} param(s)'
      );
    });
  });

  // updatePaymentPlan
  describe('updatePaymentPlan()', () => {
    let updatePaymentPlan;
    let mockData = [
      10003,
      {
        name: 'TosinPlanS',
        autoCapTime: 0,
        value: 100,
        planTrackId: 'TeePlan_001',
        status: 1,
      },
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
      updatePaymentPlan = PaymentPlanAPI.updatePaymentPlan(...mockData);
    });

    it('should use get request method', () => {
      return updatePaymentPlan.then(({ request }) => {
        expect(request.config.method).toEqual('put');
      });
    });

    it('should call the correct endpoint', () => {
      return updatePaymentPlan.then(({ request }) => {
        const path = getApiPath(request.url);
        expect(path).toEqual('/recurringPayments/plans/10003');
      });
    });

    it('should include X-AuthToken in headers', () => {
      return updatePaymentPlan.then(({ request }) => {
        expect(request.headers['X-AuthToken']).toBeDefined();
        expect(request.headers['X-AuthToken']).toEqual(token);
      });
    });

    it('should handle missing params', () => {
      updatePaymentPlan = PaymentPlanAPI.updatePaymentPlan(10003);
      return expect(updatePaymentPlan).rejects.toMatch(
        'PaymentPlan.updatePaymentPlan() is missing {autoCapTime,name,planTrackId,status,value} param(s)'
      );
    });
  });

  // getPaymentPlanOptions
  describe('getPaymentPlanOptions()', () => {
    let getPaymentPlanOptions;
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
      getPaymentPlanOptions = PaymentPlanAPI.getPaymentPlanOptions(10003, 2);
    });

    it('should use get request method', () => {
      return getPaymentPlanOptions.then(({ request }) => {
        expect(request.config.method).toEqual('get');
      });
    });

    it('should call the path /transactions/overview/indicators', () => {
      return getPaymentPlanOptions.then(({ request }) => {
        const path = getApiPath(request.url);
        expect(path).toEqual(
          '/recurringPayments?entityId=10003&entityTypeId=2'
        );
      });
    });

    it('should include X-AuthToken in headers', () => {
      return getPaymentPlanOptions.then(({ request }) => {
        expect(request.headers['X-AuthToken']).toBeDefined();
        expect(request.headers['X-AuthToken']).toEqual(token);
      });
    });

    it('should handle missing params', () => {
      getPaymentPlanOptions = PaymentPlanAPI.getPaymentPlanOptions();
      return expect(getPaymentPlanOptions).rejects.toMatch(
        'PaymentPlan.getPaymentPlanOptions() is missing {entityId,entityTypeId} param(s)'
      );
    });
  });

  //getAssociatedPaymentPlans
  describe('getAssociatedPaymentPlans()', () => {
    const customerId = 'cust_53d5f31d-5f43-426d-b736-210a958e6e56';
    let getAssociatedPaymentPlans;

    beforeEach(function() {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: '200',
          response: {},
        });
      });
      getAssociatedPaymentPlans = PaymentPlanAPI.getAssociatedPaymentPlans(
        customerId
      );
    });

    it('should use get request method', () => {
      return getAssociatedPaymentPlans.then(({ request }) => {
        expect(request.config.method).toBe('get');
      });
    });

    it('should call the path /recurringPayments/customers/cust_53d5f31d-5f43-426d-b736-210a958e6e56', () => {
      return getAssociatedPaymentPlans.then(({ request }) => {
        const path = getApiPath(request.url);
        expect(path).toBe(
          '/recurringPayments/customers/cust_53d5f31d-5f43-426d-b736-210a958e6e56'
        );
      });
    });

    it('should include X-AuthToken in headers', () => {
      return getAssociatedPaymentPlans.then(({ request }) => {
        expect(request.headers['X-AuthToken']).toBeDefined();
        expect(request.headers['X-AuthToken']).toBe(token);
      });
    });

    it('should handle missing params', () => {
      getAssociatedPaymentPlans = PaymentPlanAPI.getAssociatedPaymentPlans();
      return expect(getAssociatedPaymentPlans).rejects.toMatch(
        'PaymentPlan.getAssociatedPaymentPlans() is missing {customerId} param'
      );
    });
  });

  //changePaymentPlanStatus
  describe('changePaymentPlanStatus()', () => {
    const customerPlanId = 'cp_331FC6A5EE9V7AF9A49C';
    const channelId = 100083;
    const status = 4;
    let changePaymentPlanStatus;

    beforeEach(function() {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: '200',
          response: {},
        });
      });
      changePaymentPlanStatus = PaymentPlanAPI.changePaymentPlanStatus(
        customerPlanId,
        channelId,
        status
      );
    });

    it('should use put request method', () => {
      return changePaymentPlanStatus.then(({ request }) => {
        expect(request.config.method).toBe('put');
      });
    });

    it('should have the request payload: channelId, status', () => {
      const requestData = JSON.stringify({
        channelId,
        status,
      });
      return changePaymentPlanStatus.then(({ request }) => {
        expect(request.config.data).toBe(requestData);
      });
    });

    it('should call the path /recurringPayments/customers/cp_331FC6A5EE9V7AF9A49C', () => {
      return changePaymentPlanStatus.then(({ request }) => {
        const path = getApiPath(request.url);
        expect(path).toBe(
          '/recurringPayments/customers/cp_331FC6A5EE9V7AF9A49C'
        );
      });
    });

    it('should include X-AuthToken in headers', () => {
      return changePaymentPlanStatus.then(({ request }) => {
        expect(request.headers['X-AuthToken']).toBeDefined();
        expect(request.headers['X-AuthToken']).toBe(token);
      });
    });

    it('should handle missing params', () => {
      changePaymentPlanStatus = PaymentPlanAPI.changePaymentPlanStatus();
      return expect(changePaymentPlanStatus).rejects.toMatch(
        'PaymentPlan.changePaymentPlan() is missing {customerPlanId,channelId,status} param(s)'
      );
    });
  });

  //deletePaymentPlan
  describe('deletePaymentPlan()', () => {
    const customerPlanId = 'cp_331FC6A5EE9V7AF9A49C';
    let deletePaymentPlan;

    beforeEach(function() {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: '200',
          response: {},
        });
      });
      deletePaymentPlan = PaymentPlanAPI.deletePaymentPlan(customerPlanId);
    });

    it('should use delete request method', () => {
      return deletePaymentPlan.then(({ request }) => {
        expect(request.config.method).toBe('delete');
      });
    });

    it('should call the path /recurringPayments/customers/cp_331FC6A5EE9V7AF9A49C', () => {
      return deletePaymentPlan.then(({ request }) => {
        const path = getApiPath(request.url);
        expect(path).toBe(
          '/recurringPayments/customers/cp_331FC6A5EE9V7AF9A49C'
        );
      });
    });

    it('should include X-AuthToken in headers', () => {
      return deletePaymentPlan.then(({ request }) => {
        expect(request.headers['X-AuthToken']).toBeDefined();
        expect(request.headers['X-AuthToken']).toBe(token);
      });
    });

    it('should handle missing params', () => {
      expect.assertions(1);
      deletePaymentPlan = PaymentPlanAPI.deletePaymentPlan();
      return expect(deletePaymentPlan).rejects.toMatch(
        'PaymentPlan.deletePaymentPlan() is missing {customerPlanId} param'
      );
    });
  });

  //editPaymentPlan
  describe('editPaymentPlan()', () => {
    const customerPlanId = 'cp_331FC6A5EE9V7AF9A49C';
    const channelId = 100083;
    const status = 4;
    const cardId = 'euo';
    let editPaymentPlan;

    beforeEach(function() {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: '200',
          response: {},
        });
      });
      editPaymentPlan = PaymentPlanAPI.editPaymentPlan(
        customerPlanId,
        channelId,
        status,
        cardId
      );
    });

    it('should use put request method', () => {
      return editPaymentPlan.then(({ request }) => {
        expect(request.config.method).toBe('put');
      });
    });

    it('should have the request payload: channelId, status', () => {
      const requestData = JSON.stringify({
        channelId,
        status,
        cardId,
      });
      return editPaymentPlan.then(({ request }) => {
        expect(request.config.data).toBe(requestData);
      });
    });

    it('should call the path /recurringPayments/customers/cp_331FC6A5EE9V7AF9A49C', () => {
      return editPaymentPlan.then(({ request }) => {
        const path = getApiPath(request.url);
        expect(path).toBe(
          '/recurringPayments/customers/cp_331FC6A5EE9V7AF9A49C'
        );
      });
    });

    it('should include X-AuthToken in headers', () => {
      return editPaymentPlan.then(({ request }) => {
        expect(request.headers['X-AuthToken']).toBeDefined();
        expect(request.headers['X-AuthToken']).toBe(token);
      });
    });

    it('should handle missing params', () => {
      expect.assertions(1);
      editPaymentPlan = PaymentPlanAPI.editPaymentPlan();
      return expect(editPaymentPlan).rejects.toMatch(
        'PaymentPlan.changePaymentPlan() is missing {customerPlanId,channelId,status,cardId} param(s)'
      );
    });
  });

  //addPaymentPlan
  describe('addPaymentPlan()', () => {
    const planId = 'cp_331FC6A5EE9V7AF9A49C';
    const channelId = 100083;
    const customerId = '53D5F31D-5F43-426D-B736-210A958E6E56';
    const cardId = 'euo';
    let addPaymentPlan;

    beforeEach(function() {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: '200',
          response: {},
        });
      });
      addPaymentPlan = PaymentPlanAPI.addPaymentPlan(
        customerId,
        cardId,
        channelId,
        planId
      );
    });

    it('should use post request method', () => {
      return addPaymentPlan.then(({ request }) => {
        expect(request.config.method).toBe('post');
      });
    });

    it('should have the request payload: cardId, channelId, planId', () => {
      const requestData = JSON.stringify({
        cardId,
        channelId,
        planId,
      });
      return addPaymentPlan.then(({ request }) => {
        expect(request.config.data).toBe(requestData);
      });
    });

    it('should call the path /recurringPayments/customers/cust_53D5F31D-5F43-426D-B736-210A958E6E56', () => {
      return addPaymentPlan.then(({ request }) => {
        const path = getApiPath(request.url);
        expect(path).toBe(
          '/recurringPayments/customers/cust_53D5F31D-5F43-426D-B736-210A958E6E56'
        );
      });
    });

    it('should include X-AuthToken in headers', () => {
      return addPaymentPlan.then(({ request }) => {
        expect(request.headers['X-AuthToken']).toBeDefined();
        expect(request.headers['X-AuthToken']).toBe(token);
      });
    });

    it('should handle missing params', () => {
      expect.assertions(1);
      addPaymentPlan = PaymentPlanAPI.addPaymentPlan();
      return expect(addPaymentPlan).rejects.toMatch(
        'PaymentPlan.addPaymentPlan() is missing {customerId,cardId,channelId,planId} param(s)'
      );
    });
  });
});
