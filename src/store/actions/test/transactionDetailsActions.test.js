import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import * as actions from '../transactionDetailsActions';
import {
  LOGIN_TYPE,
  TRANSACTIONS,
  TRANSACTION_ACTIONS,
  TRANSACTION_BLACKLIST,
} from '../../constants';
import moxios from 'moxios';
import { setCurrencyId } from 'services/appRequest';

describe.skip('TransactionsDetailsActions', () => {
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

  describe('getTransactionDetails()', () => {
    const { PENDING, SUCCESS, ERROR } = TRANSACTIONS.SINGLE;
    const chargeId = 'test_E88E3FF9EE249G5C3A79';

    it('should handle success response', () => {
      // Mock request
      const responseData = {};
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: responseData,
        });
      });

      // expected actions
      const expected = [
        { type: PENDING },
        {
          type: SUCCESS,
          payload: { data: { ...responseData } },
        },
      ];

      const store = mockStore({});
      return store
        .dispatch(actions.getTransactionDetails(chargeId))
        .then(() => {
          expect(store.getActions()).toEqual(expected);
        });
    });

    it('should handle missing param', () => {
      const expected = [
        {
          type: PENDING,
        },
        {
          type: ERROR,
          payload: {
            data: 'Transactions.getTransactionDetails() is missing: chargeId',
          },
        },
      ];

      const store = mockStore({});
      return store.dispatch(actions.getTransactionDetails()).then(() => {
        expect(store.getActions()).toEqual(expected);
      });
    });

    it('should handle error response', () => {
      // Mock request
      const responseData = {};
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 400,
          response: responseData,
        });
      });

      // expected actions
      const expected = [
        {
          type: PENDING,
        },
        {
          type: ERROR,
          payload: { data: {} },
        },
      ];
      const store = mockStore({});
      return store
        .dispatch(actions.getTransactionDetails(chargeId))
        .then(() => {
          expect(store.getActions()).toEqual(expected);
        });
    });

    it('should handle error code 401: Unauthorized', () => {
      // Mock request
      const responseData = {};
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 401,
          response: responseData,
        });
      });

      // expected actions
      const expected = [
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
        .dispatch(actions.getTransactionDetails(chargeId))
        .then(() => {
          expect(store.getActions()).toEqual(expected);
        });
    });
  });

  describe('getTransactionBlacklist()', () => {
    const { PENDING, SUCCESS, ERROR } = TRANSACTION_BLACKLIST;
    const chargeId = 'test_E88E3FF9EE249G5C3A79';

    it('should handle success response', () => {
      // Mock request
      const responseData = {};
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: responseData,
        });
      });

      // expected actions
      const expected = [
        { type: PENDING },
        {
          type: SUCCESS,
          payload: { data: { ...responseData } },
        },
      ];

      const store = mockStore({});
      return store
        .dispatch(actions.getTransactionBlacklist(chargeId))
        .then(() => {
          expect(store.getActions()).toEqual(expected);
        });
    });

    it('should handle missing param', () => {
      const expected = [
        {
          type: PENDING,
        },
        {
          type: ERROR,
          payload: {
            data: 'Transactions.getTransactionBlacklist() is missing: chargeId',
          },
        },
      ];

      const store = mockStore({});
      return store.dispatch(actions.getTransactionBlacklist()).then(() => {
        expect(store.getActions()).toEqual(expected);
      });
    });

    it('should handle error response', () => {
      // Mock request
      const responseData = {};
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 400,
          response: responseData,
        });
      });

      // expected actions
      const expected = [
        {
          type: PENDING,
        },
        {
          type: ERROR,
          payload: { data: {} },
        },
      ];
      const store = mockStore({});
      return store
        .dispatch(actions.getTransactionBlacklist(chargeId))
        .then(() => {
          expect(store.getActions()).toEqual(expected);
        });
    });

    it('should handle error code 401: Unauthorized', () => {
      // Mock request
      const responseData = {};
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 401,
          response: responseData,
        });
      });

      // expected actions
      const expected = [
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
        .dispatch(actions.getTransactionBlacklist(chargeId))
        .then(() => {
          expect(store.getActions()).toEqual(expected);
        });
    });
  });

  describe('voidTransaction()', () => {
    const { PENDING, SUCCESS, ERROR } = TRANSACTION_ACTIONS.VOID;
    const chargeId = 'test_E88E3FF9EE249G5C3A79';
    const params = {
      amount: 543,
      note: '',
    };

    it('should handle success response', () => {
      // Mock request
      const responseData = {};
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: responseData,
        });
      });

      // expected actions
      const expected = [
        { type: PENDING },
        {
          type: SUCCESS,
          payload: { data: { ...responseData } },
        },
      ];

      const store = mockStore({});
      return store
        .dispatch(actions.voidTransaction(chargeId, params))
        .then(() => {
          expect(store.getActions()).toEqual(expected);
        });
    });

    it('should handle missing param', () => {
      const expected = [
        {
          type: PENDING,
        },
        {
          type: ERROR,
          payload: {
            data:
              'Transactions.voidTransaction() is missing {chargeId,amount} param(s)',
          },
        },
      ];

      const store = mockStore({});
      return store.dispatch(actions.voidTransaction()).then(() => {
        expect(store.getActions()).toEqual(expected);
      });
    });

    it('should handle error response', () => {
      // Mock request
      const responseData = {};
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 400,
          response: responseData,
        });
      });

      // expected actions
      const expected = [
        {
          type: PENDING,
        },
        {
          type: ERROR,
          payload: { data: {} },
        },
      ];
      const store = mockStore({});
      return store
        .dispatch(actions.voidTransaction(chargeId, params))
        .then(() => {
          expect(store.getActions()).toEqual(expected);
        });
    });

    it('should handle error code 401: Unauthorized', () => {
      // Mock request
      const responseData = {};
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 401,
          response: responseData,
        });
      });

      // expected actions
      const expected = [
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
        .dispatch(actions.voidTransaction(chargeId, params))
        .then(() => {
          expect(store.getActions()).toEqual(expected);
        });
    });
  });

  describe('captureTransaction()', () => {
    const { PENDING, SUCCESS, ERROR } = TRANSACTION_ACTIONS.CAPTURE;
    const chargeId = 'test_E88E3FF9EE249G5C3A79';
    const params = {
      amount: 543,
      note: '',
    };

    it('should handle success response', () => {
      // Mock request
      const responseData = {};
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: responseData,
        });
      });

      // expected actions
      const expected = [
        { type: PENDING },
        {
          type: SUCCESS,
          payload: { data: { ...responseData } },
        },
      ];

      const store = mockStore({});
      return store
        .dispatch(actions.captureTransaction(chargeId, params))
        .then(() => {
          expect(store.getActions()).toEqual(expected);
        });
    });

    it('should handle missing param', () => {
      const expected = [
        {
          type: PENDING,
        },
        {
          type: ERROR,
          payload: {
            data:
              'Transactions.captureTransaction() is missing {chargeId,amount} param(s)',
          },
        },
      ];

      const store = mockStore({});
      return store.dispatch(actions.captureTransaction()).then(() => {
        expect(store.getActions()).toEqual(expected);
      });
    });

    it('should handle error response', () => {
      // Mock request
      const responseData = {};
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 400,
          response: responseData,
        });
      });

      // expected actions
      const expected = [
        {
          type: PENDING,
        },
        {
          type: ERROR,
          payload: { data: {} },
        },
      ];
      const store = mockStore({});
      return store
        .dispatch(actions.captureTransaction(chargeId, params))
        .then(() => {
          expect(store.getActions()).toEqual(expected);
        });
    });

    it('should handle error code 401: Unauthorized', () => {
      // Mock request
      const responseData = {};
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 401,
          response: responseData,
        });
      });

      // expected actions
      const expected = [
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
        .dispatch(actions.captureTransaction(chargeId, params))
        .then(() => {
          expect(store.getActions()).toEqual(expected);
        });
    });
  });

  describe('refundTransaction()', () => {
    const { PENDING, SUCCESS, ERROR } = TRANSACTION_ACTIONS.REFUND;
    const chargeId = 'test_E88E3FF9EE249G5C3A79';
    const params = {
      amount: 543,
      note: '',
    };

    it('should handle success response', () => {
      // Mock request
      const responseData = {};
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: responseData,
        });
      });

      // expected actions
      const expected = [
        { type: PENDING },
        {
          type: SUCCESS,
          payload: { data: { ...responseData } },
        },
      ];

      const store = mockStore({});
      return store
        .dispatch(actions.refundTransaction(chargeId, params))
        .then(() => {
          expect(store.getActions()).toEqual(expected);
        });
    });

    it('should handle missing param', () => {
      const expected = [
        {
          type: PENDING,
        },
        {
          type: ERROR,
          payload: {
            data:
              'Transactions.refundTransaction() is missing {chargeId,amount} param(s)',
          },
        },
      ];

      const store = mockStore({});
      return store.dispatch(actions.refundTransaction()).then(() => {
        expect(store.getActions()).toEqual(expected);
      });
    });

    it('should handle error response', () => {
      // Mock request
      const responseData = {};
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 400,
          response: responseData,
        });
      });

      // expected actions
      const expected = [
        {
          type: PENDING,
        },
        {
          type: ERROR,
          payload: { data: {} },
        },
      ];
      const store = mockStore({});
      return store
        .dispatch(actions.refundTransaction(chargeId, params))
        .then(() => {
          expect(store.getActions()).toEqual(expected);
        });
    });

    it('should handle error code 401: Unauthorized', () => {
      // Mock request
      const responseData = {};
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 401,
          response: responseData,
        });
      });

      // expected actions
      const expected = [
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
        .dispatch(actions.refundTransaction(chargeId, params))
        .then(() => {
          expect(store.getActions()).toEqual(expected);
        });
    });
  });

  describe('blacklistTransaction()', () => {
    const { PENDING, SUCCESS, ERROR } = TRANSACTION_ACTIONS.BLACKLIST;
    const chargeId = 'test_E88E3FF9EE249G5C3A79';
    const data = {
      accountSelected: 10002,
    };

    it('should handle success response', () => {
      // Mock request
      const responseData = {};
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: responseData,
        });
      });

      // expected actions
      const expected = [
        { type: PENDING },
        {
          type: SUCCESS,
          payload: { data: { ...responseData } },
        },
      ];

      const store = mockStore({});
      return store
        .dispatch(actions.blacklistTransaction(chargeId, data))
        .then(() => {
          expect(store.getActions()).toEqual(expected);
        });
    });

    it('should handle missing param', () => {
      const expected = [
        {
          type: PENDING,
        },
        {
          type: ERROR,
          payload: {
            data:
              'Transactions.blacklistTransaction() is missing {chargeId,entityId,entityTypeId} param(s)',
          },
        },
      ];

      const store = mockStore({});
      return store.dispatch(actions.blacklistTransaction()).then(() => {
        expect(store.getActions()).toEqual(expected);
      });
    });

    it('should handle error response', () => {
      // Mock request
      const responseData = {};
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 400,
          response: responseData,
        });
      });

      // expected actions
      const expected = [
        {
          type: PENDING,
        },
        {
          type: ERROR,
          payload: { data: {} },
        },
      ];
      const store = mockStore({});
      return store
        .dispatch(actions.blacklistTransaction(chargeId, data))
        .then(() => {
          expect(store.getActions()).toEqual(expected);
        });
    });

    it('should handle error code 401: Unauthorized', () => {
      // Mock request
      const responseData = {};
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 401,
          response: responseData,
        });
      });

      // expected actions
      const expected = [
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
        .dispatch(actions.blacklistTransaction(chargeId, data))
        .then(() => {
          expect(store.getActions()).toEqual(expected);
        });
    });
  });
});
