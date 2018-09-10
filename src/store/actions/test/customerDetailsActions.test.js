import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import * as actions from '../customerDetailsActions';
import { CUSTOMERS, CUSTOMERS_ACTIONS, LOGIN_TYPE } from '../../constants';
import moxios from 'moxios';
import { setCurrencyId } from 'services/appRequest';

describe('CustomerDetailsActions', () => {
  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);

  beforeEach(function() {
    moxios.install();
    setCurrencyId(100);
  });

  afterEach(() => {
    moxios.uninstall();
    setCurrencyId(null);
  });

  describe('getCustomerDetails()', () => {
    const { PENDING, SUCCESS, ERROR } = CUSTOMERS.SINGLE;
    let accountsData;

    beforeEach(() => {
      accountsData = {
        entityId: 1000,
        customerId: 50000,
        accountId: 100001,
      };
    });

    it('should handle success response', () => {
      const mockData = {
        other: 'hello',
        email: 'test@example.com',
      };

      // Mock Request
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: mockData,
        });
      });

      // Expected Actions
      const expectedActions = [
        {
          type: PENDING,
        },
        {
          type: SUCCESS,
          payload: {
            data: { ...mockData },
          },
        },
      ];

      const store = mockStore({});
      return store
        .dispatch(actions.getCustomerDetails(accountsData))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('should handle missing params', () => {
      accountsData.accountId = undefined;

      // Expected Actions
      const expectedActions = [
        {
          type: PENDING,
        },
        {
          type: ERROR,
          payload: {
            data:
              'Customers.getCustomerDetails() is missing {entityId,entityTypeId} param(s)',
          },
        },
      ];

      const store = mockStore({});
      return store
        .dispatch(actions.getCustomerDetails(accountsData))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('should handle reject response', () => {
      const mockData = 'Oops error';

      // Mock Request
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 400,
          response: mockData,
        });
      });

      // Expected Actions
      const expectedActions = [
        {
          type: PENDING,
        },
        {
          type: ERROR,
          payload: {
            data: mockData,
          },
        },
      ];

      const store = mockStore({});
      return store
        .dispatch(actions.getCustomerDetails(accountsData))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('should handle error code 401', () => {
      // Mock Request
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 401,
        });
      });

      // Expected Actions
      const expectedActions = [
        {
          type: PENDING,
        },
        {
          type: LOGIN_TYPE.SIGN_OUT,
          sessionEnd: true,
        },
      ];

      const store = mockStore({});
      return store
        .dispatch(actions.getCustomerDetails(accountsData))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
  });

  describe('getCustomerTransactions()', () => {
    const { PENDING, SUCCESS, ERROR } = CUSTOMERS.TRANSACTIONS;
    let accountsData;

    beforeEach(() => {
      accountsData = {
        entityTypeId: 2,
        entityId: 1000,
        customerId: 50000,
        startIndex: 0,
        limit: 5,
        accountId: 100,
      };
    });

    it('should handle success response', () => {
      const mockData = {
        other: 'hello',
        email: 'test@example.com',
      };

      // Mock Request
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: mockData,
        });
      });

      // Expected Actions
      const expectedActions = [
        {
          type: PENDING,
        },
        {
          type: SUCCESS,
          payload: {
            data: { ...mockData },
          },
        },
      ];

      const store = mockStore({});
      return store
        .dispatch(actions.getCustomerTransactions(accountsData))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('should handle missing params', () => {
      accountsData.accountId = undefined;

      // Expected Actions
      const expectedActions = [
        {
          type: PENDING,
        },
        {
          type: ERROR,
          payload: {
            data:
              'Customers.getCustomerTransactions() is missing {entityId,entityTypeId} param(s)',
          },
        },
      ];

      const store = mockStore({});
      return store
        .dispatch(actions.getCustomerTransactions(accountsData))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('should handle reject response', () => {
      const mockData = 'Oops error';

      // Mock Request
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 400,
          response: mockData,
        });
      });

      // Expected Actions
      const expectedActions = [
        {
          type: PENDING,
        },
        {
          type: ERROR,
          payload: {
            data: mockData,
          },
        },
      ];

      const store = mockStore({});
      return store
        .dispatch(actions.getCustomerTransactions(accountsData))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('should handle error code 401', () => {
      // Mock Request
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 401,
        });
      });

      // Expected Actions
      const expectedActions = [
        {
          type: PENDING,
        },
        {
          type: LOGIN_TYPE.SIGN_OUT,
          sessionEnd: true,
        },
      ];

      const store = mockStore({});
      return store
        .dispatch(actions.getCustomerTransactions(accountsData))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
  });

  describe('getAssociatedPaymentPlans()', () => {
    const { PENDING, SUCCESS, ERROR } = CUSTOMERS.PAYMENT_PLANS;
    let customerId = '53d5f31d-5f43-426d-b736-210a958e6e56';

    it('should handle success response', () => {
      const mockData = [
        {
          planId: 'rp_9E6B498D844Y76BD1812',
          customerPlanId: 'cp_331FC6A5EE9V7AF9A49C',
          cardId: 'card_9be70e2e-ecc4-43d0-9649-7042362f68dd',
          customerId: 'cust_53d5f31d-5f43-426d-b736-210a958e6e56',
          name: 'Recurring Plan 1',
          planTrackId: 'CKO Plan 1',
          autoCapTime: 0,
          value: 1000,
          currency: 'USD',
          cycle: '1d',
          recurringCount: 10,
          recurringCountLeft: 10,
          totalCollectedValue: 0,
          totalCollectedCount: 0,
          status: 1,
          startDate: '2017-10-13T09:00:00Z',
          previousRecurringDate: null,
          nextRecurringDate: '2017-10-13T09:00:00Z',
          channelId: 100083,
        },
      ];

      // Mock Request
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: mockData,
        });
      });

      // Expected Actions
      const expectedActions = [
        {
          type: PENDING,
        },
        {
          type: SUCCESS,
          payload: {
            data: mockData,
          },
        },
      ];

      const store = mockStore({});

      return store
        .dispatch(actions.getAssociatedPaymentPlans(customerId))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('should handle missing params', () => {
      // Expected Actions
      const expectedActions = [
        {
          type: PENDING,
        },
        {
          type: ERROR,
          payload: {
            data:
              'PaymentPlan.getAssociatedPaymentPlans() is missing {customerId} param',
          },
        },
      ];

      const store = mockStore({});
      return store.dispatch(actions.getAssociatedPaymentPlans()).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    it('should handle reject response', () => {
      const mockData = 'Oops error';

      // Mock Request
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 400,
          response: mockData,
        });
      });

      // Expected Actions
      const expectedActions = [
        {
          type: PENDING,
        },
        {
          type: ERROR,
          payload: {
            data: mockData,
          },
        },
      ];

      const store = mockStore({});
      return store
        .dispatch(actions.getAssociatedPaymentPlans(customerId))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('should handle error code 401', () => {
      // Mock Request
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 401,
        });
      });

      // Expected Actions
      const expectedActions = [
        {
          type: PENDING,
        },
        {
          type: LOGIN_TYPE.SIGN_OUT,
          sessionEnd: true,
        },
      ];

      const store = mockStore({});
      return store
        .dispatch(actions.getAssociatedPaymentPlans(customerId))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
  });

  describe('changePaymentPlanStatus()', () => {
    const {
      PENDING,
      SUCCESS,
      ERROR,
    } = CUSTOMERS.PAYMENT_PLANS_ACTIONS.CHANGE_STATUS;
    const customerPlanId = '331FC6A5EE9V7AF9A49C';
    const channelId = 100083;
    const status = 4;

    it('should handle success response', () => {
      const mockData = {
        message: 'ok',
      };

      // Mock Request
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: mockData,
        });
      });

      // Expected Actions
      const expectedActions = [
        {
          type: PENDING,
        },
        {
          type: SUCCESS,
          payload: {
            data: { ...mockData },
          },
        },
      ];

      const store = mockStore({});
      return store
        .dispatch(
          actions.changePaymentPlanStatus(customerPlanId, channelId, status)
        )
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('should handle missing params', () => {
      // Expected Actions
      const expectedActions = [
        {
          type: PENDING,
        },
        {
          type: ERROR,
          payload: {
            data:
              'PaymentPlan.changePaymentPlan() is missing {customerPlanId,channelId,status} param(s)',
          },
        },
      ];

      const store = mockStore({});
      return store.dispatch(actions.changePaymentPlanStatus()).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    it('should handle reject response', () => {
      const mockData = 'Oops error';

      // Mock Request
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 400,
          response: mockData,
        });
      });

      // Expected Actions
      const expectedActions = [
        {
          type: PENDING,
        },
        {
          type: ERROR,
          payload: {
            data: mockData,
          },
        },
      ];

      const store = mockStore({});
      return store
        .dispatch(
          actions.changePaymentPlanStatus(customerPlanId, channelId, status)
        )
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('should handle error code 401', () => {
      // Mock Request
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 401,
        });
      });

      // Expected Actions
      const expectedActions = [
        {
          type: PENDING,
        },
        {
          type: LOGIN_TYPE.SIGN_OUT,
          sessionEnd: true,
        },
      ];

      const store = mockStore({});
      return store
        .dispatch(
          actions.changePaymentPlanStatus(customerPlanId, channelId, status)
        )
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
  });

  describe('deletePaymentPlan()', () => {
    const { PENDING, SUCCESS, ERROR } = CUSTOMERS.PAYMENT_PLANS_ACTIONS.DELETE;
    const customerPlanId = '331FC6A5EE9V7AF9A49C';

    it('should handle success response', () => {
      const mockData = {
        message: 'ok',
      };

      // Mock Request
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: mockData,
        });
      });

      // Expected Actions
      const expectedActions = [
        {
          type: PENDING,
        },
        {
          type: SUCCESS,
          payload: {
            data: { ...mockData },
          },
        },
      ];

      const store = mockStore({});
      return store
        .dispatch(actions.deletePaymentPlan(customerPlanId))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('should handle missing params', () => {
      // Expected Actions
      const expectedActions = [
        {
          type: PENDING,
        },
        {
          type: ERROR,
          payload: {
            data:
              'PaymentPlan.deletePaymentPlan() is missing {customerPlanId} param',
          },
        },
      ];

      const store = mockStore({});
      return store.dispatch(actions.deletePaymentPlan()).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    it('should handle reject response', () => {
      const mockData = 'Oops error';

      // Mock Request
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 400,
          response: mockData,
        });
      });

      // Expected Actions
      const expectedActions = [
        {
          type: PENDING,
        },
        {
          type: ERROR,
          payload: {
            data: mockData,
          },
        },
      ];

      const store = mockStore({});
      return store
        .dispatch(actions.deletePaymentPlan(customerPlanId))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('should handle error code 401', () => {
      // Mock Request
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 401,
        });
      });

      // Expected Actions
      const expectedActions = [
        {
          type: PENDING,
        },
        {
          type: LOGIN_TYPE.SIGN_OUT,
          sessionEnd: true,
        },
      ];

      const store = mockStore({});
      return store
        .dispatch(actions.deletePaymentPlan(customerPlanId))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
  });

  describe('editPaymentPlan()', () => {
    const { PENDING, SUCCESS, ERROR } = CUSTOMERS.PAYMENT_PLANS_ACTIONS.EDIT;
    const customerPlanId = '331FC6A5EE9V7AF9A49C';
    const channelId = 100083;
    const status = 4;
    const cardId = '45678';

    it('should handle success response', () => {
      const mockData = {
        message: 'ok',
      };

      // Mock Request
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: mockData,
        });
      });

      // Expected Actions
      const expectedActions = [
        {
          type: PENDING,
        },
        {
          type: SUCCESS,
          payload: {
            data: { ...mockData },
          },
        },
      ];

      const store = mockStore({});
      return store
        .dispatch(
          actions.editPaymentPlan(customerPlanId, channelId, status, cardId)
        )
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('should handle missing params', () => {
      // Expected Actions
      const expectedActions = [
        {
          type: PENDING,
        },
        {
          type: ERROR,
          payload: {
            data:
              'PaymentPlan.changePaymentPlan() is missing {customerPlanId,channelId,status,cardId} param(s)',
          },
        },
      ];

      const store = mockStore({});
      return store.dispatch(actions.editPaymentPlan()).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    it('should handle reject response', () => {
      const mockData = 'Oops error';

      // Mock Request
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 400,
          response: mockData,
        });
      });

      // Expected Actions
      const expectedActions = [
        {
          type: PENDING,
        },
        {
          type: ERROR,
          payload: {
            data: mockData,
          },
        },
      ];

      const store = mockStore({});
      return store
        .dispatch(
          actions.editPaymentPlan(customerPlanId, channelId, status, cardId)
        )
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('should handle error code 401', () => {
      // Mock Request
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 401,
        });
      });

      // Expected Actions
      const expectedActions = [
        {
          type: PENDING,
        },
        {
          type: LOGIN_TYPE.SIGN_OUT,
          sessionEnd: true,
        },
      ];

      const store = mockStore({});
      return store
        .dispatch(
          actions.editPaymentPlan(customerPlanId, channelId, status, cardId)
        )
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
  });

  describe('updateCustomerDetails()', () => {
    const { PENDING, SUCCESS, ERROR } = CUSTOMERS_ACTIONS.UPDATE_DETAILS;
    const customerId = '331FC6A5EE9V7AF9A49C';
    const email = 'test@example.com';
    const name = 'Jack John';
    const phone = {
      countryCode: '33',
      number: '622545688',
    };

    it('should handle success response', () => {
      const mockData = {
        message: 'ok',
      };
      // Mock request
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: mockData,
        });
      });
      // Expected actions
      const expectedActions = [
        { type: PENDING },
        {
          type: SUCCESS,
          payload: {
            data: { ...mockData },
          },
        },
      ];
      const store = mockStore({});
      return store
        .dispatch(actions.updateCustomerDetails(customerId, email, name, phone))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('should handle missing params', () => {
      // Expected actions
      const expectedActions = [
        {
          type: PENDING,
        },
        {
          type: ERROR,
          payload: {
            data:
              'Customers.updateCustomerDetails() is missing {customerId,email,name} param(s)',
          },
        },
      ];

      const store = mockStore({});
      return store.dispatch(actions.updateCustomerDetails()).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    it('should handle reject response', () => {
      const mockData = 'Oops error';
      // Mock request
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 400,
          response: mockData,
        });
      });
      // Expected actions
      const expectedActions = [
        {
          type: PENDING,
        },
        {
          type: ERROR,
          payload: {
            data: mockData,
          },
        },
      ];
      const store = mockStore({});
      return store
        .dispatch(actions.updateCustomerDetails(customerId, email, name, phone))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('should handle error code 401', () => {
      // Mock request
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 401,
        });
      });
      // Expected actions
      const expectedActions = [
        {
          type: PENDING,
        },
        {
          type: LOGIN_TYPE.SIGN_OUT,
          sessionEnd: true,
        },
      ];
      const store = mockStore({});
      return store
        .dispatch(actions.updateCustomerDetails(customerId, email, name, phone))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
  });

  describe('createCharges()', () => {
    const { PENDING, SUCCESS, ERROR } = CUSTOMERS_ACTIONS.CREATE_PAYMENT;
    const data = {
      amount: 100,
      autoCapTime: 0,
      autoCapture: 'y',
      cardId: 'card_d345043d-9930-4d0c-addb-96231ebfd9b1',
      channelId: '100083',
      currency: 'gbp',
      email: 'testexample@gmail.com',
      shippingDetails: null,
      trackId: '',
      type: 'card',
      udf1: '',
      billingDetails: {},
    };

    it('should handle success response', () => {
      const mockData = {
        message: 'ok',
      };
      // Mock request
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: mockData,
        });
      });
      // Expected actions
      const expectedActions = [
        { type: PENDING },
        {
          type: SUCCESS,
          payload: {
            data: { ...mockData },
          },
        },
      ];
      const store = mockStore({});
      return store.dispatch(actions.createCharges(data)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    it('should handle missing params', () => {
      // Expected actions
      const expectedActions = [
        {
          type: PENDING,
        },
        {
          type: ERROR,
          payload: {
            data:
              'Transactions.createCharges() is missing {channelId,autoCapTime,email,currency,amount,type,autoCapture,billingDetails,shippingDetails,udf1,card} param(s)',
          },
        },
      ];

      const store = mockStore({});
      return store.dispatch(actions.createCharges({})).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    it('should handle reject response', () => {
      const mockData = 'Oops error';
      // Mock request
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 400,
          response: mockData,
        });
      });
      // Expected actions
      const expectedActions = [
        {
          type: PENDING,
        },
        {
          type: ERROR,
          payload: {
            data: mockData,
          },
        },
      ];
      const store = mockStore({});
      return store.dispatch(actions.createCharges(data)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    it('should handle error code 401', () => {
      // Mock request
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 401,
        });
      });
      // Expected actions
      const expectedActions = [
        {
          type: PENDING,
        },
        {
          type: LOGIN_TYPE.SIGN_OUT,
          sessionEnd: true,
        },
      ];
      const store = mockStore({});
      return store.dispatch(actions.createCharges(data)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });

  describe('clearCharges', () => {
    it('should return the right action type', () => {
      const expectedActions = [
        {
          type: CUSTOMERS_ACTIONS.CREATE_PAYMENT.CLEAR,
        },
      ];
      const store = mockStore({});
      store.dispatch(actions.clearCharges());
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  describe('addCreditCard()', () => {
    const { PENDING, SUCCESS, ERROR } = CUSTOMERS_ACTIONS.ADD_CREDIT_CARD;
    const customerId = '331FC6A5EE9V7AF9A49C';
    const card = {};
    const channelId = 100083;

    it('should handle success response', () => {
      const mockData = {
        message: 'ok',
      };
      // Mock request
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: mockData,
        });
      });
      // Expected actions
      const expectedActions = [
        { type: PENDING },
        {
          type: SUCCESS,
          payload: {
            data: { ...mockData },
          },
        },
      ];
      const store = mockStore({});
      return store
        .dispatch(actions.addCreditCard(customerId, card, channelId))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('should handle missing params', () => {
      // Expected actions
      const expectedActions = [
        {
          type: PENDING,
        },
        {
          type: ERROR,
          payload: {
            data:
              'Customers.addCreditCard() is missing {customerId,card,channelId} param(s)',
          },
        },
      ];

      const store = mockStore({});
      return store.dispatch(actions.addCreditCard()).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    it('should handle reject response', () => {
      const mockData = 'Oops error';
      // Mock request
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 400,
          response: mockData,
        });
      });
      // Expected actions
      const expectedActions = [
        {
          type: PENDING,
        },
        {
          type: ERROR,
          payload: {
            data: mockData,
          },
        },
      ];
      const store = mockStore({});
      return store
        .dispatch(actions.addCreditCard(customerId, card, channelId))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('should handle error code 401', () => {
      // Mock request
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 401,
        });
      });
      // Expected actions
      const expectedActions = [
        {
          type: PENDING,
        },
        {
          type: LOGIN_TYPE.SIGN_OUT,
          sessionEnd: true,
        },
      ];
      const store = mockStore({});
      return store
        .dispatch(actions.addCreditCard(customerId, card, channelId))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
  });

  describe('addPaymentPlan()', () => {
    const { PENDING, SUCCESS, ERROR } = CUSTOMERS_ACTIONS.ADD_PAYMENT_PLAN;
    const customerId = '331FC6A5EE9V7AF9A49C';
    const cardId = '9be70e2e-ecc4-43d0-9649-7042362f68dd';
    const channelId = 100083;
    const planId = '9E6B498D844Y76BD1812';

    it('should handle success response', () => {
      const mockData = {
        message: 'ok',
      };
      // Mock request
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: mockData,
        });
      });
      // Expected actions
      const expectedActions = [
        { type: PENDING },
        {
          type: SUCCESS,
          payload: {
            data: { ...mockData },
          },
        },
      ];
      const store = mockStore({});
      return store
        .dispatch(actions.addPaymentPlan(customerId, cardId, channelId, planId))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('should handle missing params', () => {
      // Expected actions
      const expectedActions = [
        {
          type: PENDING,
        },
        {
          type: ERROR,
          payload: {
            data:
              'PaymentPlan.addPaymentPlan() is missing {customerId,cardId,channelId,planId} param(s)',
          },
        },
      ];

      const store = mockStore({});
    });

    it('should handle reject response', () => {
      const mockData = 'Oops error';
      // Mock request
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 400,
          response: mockData,
        });
      });
      // Expected actions
      const expectedActions = [
        {
          type: PENDING,
        },
        {
          type: ERROR,
          payload: {
            data: mockData,
          },
        },
      ];
      const store = mockStore({});
      return store
        .dispatch(actions.addPaymentPlan(customerId, cardId, channelId, planId))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('should handle error code 401', () => {
      // Mock request
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 401,
        });
      });
      // Expected actions
      const expectedActions = [
        {
          type: PENDING,
        },
        {
          type: LOGIN_TYPE.SIGN_OUT,
          sessionEnd: true,
        },
      ];

      const store = mockStore({});
      return store
        .dispatch(actions.addPaymentPlan(customerId, cardId, channelId, planId))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
  });

  describe('updateCardDetails()', () => {
    const { PENDING, SUCCESS, ERROR } = CUSTOMERS.CARD_UPDATE;
    let accountsData;

    beforeEach(() => {
      accountsData = ['5000', '23424', 1000];
    });

    it('should handle success response', () => {
      const mockData = {
        other: 'hello',
        email: 'test@example.com',
      };

      // Mock Request
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: mockData,
        });
      });

      // Exepected Actions
      const expectedActions = [
        {
          type: PENDING,
        },
        {
          type: SUCCESS,
          payload: {
            data: { ...mockData },
          },
        },
      ];

      const store = mockStore({});
      return store
        .dispatch(actions.updateCardDetails(...accountsData))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('should handle missing params', () => {
      accountsData[0] = undefined;

      // Exepected Actions
      const expectedActions = [
        {
          type: PENDING,
        },
        {
          type: ERROR,
          payload: {
            data:
              'Customers.updateCardDetails() is missing {customerId,accountId} param(s)',
          },
        },
      ];

      const store = mockStore({});
      return store
        .dispatch(actions.updateCardDetails(accountsData))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('should handle reject response', () => {
      const mockData = 'Oops error';

      // Mock Request
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 400,
          response: mockData,
        });
      });

      // Exepected Actions
      const expectedActions = [
        {
          type: PENDING,
        },
        {
          type: ERROR,
          payload: {
            data: mockData,
          },
        },
      ];

      const store = mockStore({});
      return store
        .dispatch(actions.updateCardDetails(...accountsData))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('should handle error code 401', () => {
      // Mock Request
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 401,
        });
      });

      // Exepected Actions
      const expectedActions = [
        {
          type: PENDING,
        },
        {
          type: LOGIN_TYPE.SIGN_OUT,
          sessionEnd: true,
        },
      ];

      const store = mockStore({});
      return store
        .dispatch(actions.updateCardDetails(...accountsData))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
  });

  describe('setDefaultCard()', () => {
    const { PENDING, SUCCESS, ERROR } = CUSTOMERS.CARD_DEFAULT;
    let accountsData;

    beforeEach(() => {
      accountsData = ['5000', '23424', 1000];
    });

    it('should handle success response', () => {
      const mockData = {
        other: 'hello',
        email: 'test@example.com',
      };

      // Mock Request
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: mockData,
        });
      });

      // Exepected Actions
      const expectedActions = [
        {
          type: PENDING,
        },
        {
          type: SUCCESS,
          cardId: '5000',
          payload: {
            data: { ...mockData },
          },
        },
      ];

      const store = mockStore({});
      return store
        .dispatch(actions.setDefaultCard(...accountsData))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('should handle missing params', () => {
      accountsData[0] = undefined;

      // Exepected Actions
      const expectedActions = [
        {
          type: PENDING,
        },
        {
          type: ERROR,
          payload: {
            data:
              'Customers.setDefaultCard() is missing {customerId,merchantAccountId} param(s)',
          },
        },
      ];

      const store = mockStore({});
      return store.dispatch(actions.setDefaultCard(accountsData)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    it('should handle reject response', () => {
      const mockData = 'Oops error';

      // Mock Request
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 400,
          response: mockData,
        });
      });

      // Exepected Actions
      const expectedActions = [
        {
          type: PENDING,
        },
        {
          type: ERROR,
          payload: {
            data: mockData,
          },
        },
      ];

      const store = mockStore({});
      return store
        .dispatch(actions.setDefaultCard(...accountsData))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('should handle error code 401', () => {
      // Mock Request
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 401,
        });
      });

      // Exepected Actions
      const expectedActions = [
        {
          type: PENDING,
        },
        {
          type: LOGIN_TYPE.SIGN_OUT,
          sessionEnd: true,
        },
      ];

      const store = mockStore({});
      return store
        .dispatch(actions.setDefaultCard(...accountsData))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
  });

  describe('deleteCard()', () => {
    const { PENDING, SUCCESS, ERROR } = CUSTOMERS.CARD_DELETE;

    it('should handle success response', () => {
      const mockData = {
        other: 'hello',
        email: 'test@example.com',
      };

      // Mock Request
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: mockData,
        });
      });

      // Exepected Actions
      const expectedActions = [
        {
          type: PENDING,
        },
        {
          type: SUCCESS,
          cardId: '23424',
          payload: {
            data: { ...mockData },
          },
        },
      ];

      const store = mockStore({});
      return store.dispatch(actions.deleteCard('23424', '5000')).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    it('should handle missing params', () => {
      // Exepected Actions
      const expectedActions = [
        {
          type: PENDING,
        },
        {
          type: ERROR,
          payload: {
            data: 'Customers.deleteCard() is missing {customerId} param(s)',
          },
        },
      ];

      const store = mockStore({});
      return store.dispatch(actions.deleteCard('23424')).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    it('should handle reject response', () => {
      const mockData = 'Oops error';

      // Mock Request
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 400,
          response: mockData,
        });
      });

      // Exepected Actions
      const expectedActions = [
        {
          type: PENDING,
        },
        {
          type: ERROR,
          payload: {
            data: mockData,
          },
        },
      ];

      const store = mockStore({});
      return store.dispatch(actions.deleteCard('23424', '5000')).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    it('should handle error code 401', () => {
      // Mock Request
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 401,
        });
      });

      // Exepected Actions
      const expectedActions = [
        {
          type: PENDING,
        },
        {
          type: LOGIN_TYPE.SIGN_OUT,
          sessionEnd: true,
        },
      ];

      const store = mockStore({});
      return store.dispatch(actions.deleteCard('23424', '5000')).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });

  describe('resetList()', () => {
    const { RESET } = CUSTOMERS.TRANSACTIONS;

    it('should handle success response', () => {
      const expectedData = {
        type: RESET,
      };
      expect(actions.resetCustomerTransactions()).toEqual(expectedData);
    });
  });
});
