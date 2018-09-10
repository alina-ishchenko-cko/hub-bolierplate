import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import * as actions from '../paymentPlanActions';
import { PAYMENT_TYPE, LOGIN_TYPE, PAYMENT_PLAN } from '../../constants';
import moxios from 'moxios';
import { setCurrencyId } from 'services/appRequest';

describe('PaymentPlanActions', () => {
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

  describe('getPaymentPlanOptions()', () => {
    const { PENDING, SUCCESS, ERROR } = PAYMENT_TYPE.OPTIONS;
    let accountsData;

    beforeEach(() => {
      accountsData = {
        accountId: 108,
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
        .dispatch(actions.getPaymentPlanOptions(accountsData))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('should handle missing params', () => {
      accountsData.accountId = undefined;

      // Exepected Actions
      const expectedActions = [
        {
          type: PENDING,
        },
        {
          type: ERROR,
          payload: {
            data:
              'PaymentPlan.getPaymentPlanOptions() is missing {entityId,entityTypeId} param(s)',
          },
        },
      ];

      const store = mockStore({});
      return store
        .dispatch(actions.getPaymentPlanOptions(accountsData))
        .then(() => {
          expect(store.getActions()).toEqual(
            expect.arrayContaining(expectedActions)
          );
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
        .dispatch(actions.getPaymentPlanOptions(accountsData))
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
        .dispatch(actions.getPaymentPlanOptions(accountsData))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
  });

  describe('getPaymentPlanList()', () => {
    const { PENDING, SUCCESS, ERROR } = PAYMENT_PLAN.ALL;
    let accountsData;

    beforeEach(() => {
      accountsData = [
        {
          accountId: 108,
        },
        12,
        1,
      ];
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
        .dispatch(actions.getPaymentPlanList(...accountsData))
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
              'PaymentPlan.getPaymentPlanList() is missing {entityId,entityTypeId} param(s)',
          },
        },
      ];

      const store = mockStore({});
      return store
        .dispatch(actions.getPaymentPlanList(...accountsData))
        .then(() => {
          expect(store.getActions()).toEqual(
            expect.arrayContaining(expectedActions)
          );
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
        .dispatch(actions.getPaymentPlanList(...accountsData))
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
        .dispatch(actions.getPaymentPlanList(...accountsData))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
  });

  describe('updatePaymentPlan()', () => {
    const { PENDING, SUCCESS, ERROR } = PAYMENT_PLAN.UPDATE;
    let accountsData;

    beforeEach(() => {
      accountsData = [
        'cy_2345678dasdasdsad',
        {
          autoCapTime: 100,
          name: 'Test',
          planTrackId: 10000,
          status: 'active',
          value: 500000,
        },
      ];
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
        .dispatch(actions.updatePaymentPlan(...accountsData))
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
              'PaymentPlan.updatePaymentPlan() is missing {payplanId} param(s)',
          },
        },
      ];

      const store = mockStore({});
      return store
        .dispatch(actions.updatePaymentPlan(...accountsData))
        .then(() => {
          expect(store.getActions()).toEqual(
            expect.arrayContaining(expectedActions)
          );
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
        .dispatch(actions.updatePaymentPlan(...accountsData))
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
        .dispatch(actions.updatePaymentPlan(...accountsData))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
  });
});
