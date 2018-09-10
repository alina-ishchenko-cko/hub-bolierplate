import * as actions from '../transactionsActions';
import { TRANSACTIONS, LOGIN_TYPE, CHARGES } from '../../constants';
import { setCurrencyId } from 'services/appRequest';

describe('TransactionsActions', () => {
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

  describe('getIndicators()', () => {
    const { PENDING, SUCCESS, ERROR } = TRANSACTIONS.INDICATORS;
    let accountsData;

    beforeEach(() => {
      accountsData = {
        accountId: 108,
        fromDate: {
          toISOString: () => {
            return '2012-04-03';
          },
        },
        toDate: {
          toISOString: () => {
            return '2012-04-03';
          },
        },
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
      return store.dispatch(actions.getIndicators(accountsData)).then(() => {
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
              'Transactions.getIndicators() is missing {entityTypeId,entityId} param(s)',
          },
        },
      ];

      const store = mockStore({});
      return store.dispatch(actions.getIndicators(accountsData)).then(() => {
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
      return store.dispatch(actions.getIndicators(accountsData)).then(() => {
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
      return store.dispatch(actions.getIndicators(accountsData)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });

  describe('getAll()', () => {
    const { PENDING, SUCCESS, ERROR } = TRANSACTIONS.ALL;
    let accountsData;

    beforeEach(() => {
      accountsData = {
        accountId: 106,
        fromDate: {
          toISOString: () => {
            return '2012-04-03';
          },
        },
        toDate: {
          toISOString: () => {
            return '2012-04-03';
          },
        },
        currentPage: 0,
        pageSize: 10,
        sortField: 'timestamp',
        sortOrder: 'desc',
        startIndex: 0,
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
        { payload: { scope: 'default' }, type: 'loading-bar/HIDE' },
        { payload: { scope: 'default' }, type: 'loading-bar/SHOW' },
        {
          type: PENDING,
        },
        { payload: { scope: 'default' }, type: 'loading-bar/HIDE' },
        {
          type: SUCCESS,
          payload: {
            data: { ...mockData },
          },
        },
      ];

      const store = mockStore({});
      return store.dispatch(actions.getAll(accountsData)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    it('should handle missing params', () => {
      accountsData.accountId = undefined;

      // Exepected Actions
      const expectedActions = [
        { payload: { scope: 'default' }, type: 'loading-bar/HIDE' },
        { payload: { scope: 'default' }, type: 'loading-bar/SHOW' },
        {
          type: PENDING,
        },
        {
          type: ERROR,
          payload: {
            data:
              'Transactions.getAll() is missing {entityId,entityType} param(s)',
          },
        },
      ];

      const store = mockStore({});
      return store.dispatch(actions.getAll(accountsData)).then(() => {
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
        { payload: { scope: 'default' }, type: 'loading-bar/HIDE' },
        { payload: { scope: 'default' }, type: 'loading-bar/SHOW' },
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
      return store.dispatch(actions.getAll(accountsData)).then(() => {
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
        { payload: { scope: 'default' }, type: 'loading-bar/HIDE' },
        { payload: { scope: 'default' }, type: 'loading-bar/SHOW' },
        {
          type: PENDING,
        },
        {
          type: LOGIN_TYPE.SIGN_OUT,
          sessionEnd: true,
        },
      ];

      const store = mockStore({});
      return store.dispatch(actions.getAll(accountsData)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });

  describe('createCharges()', () => {
    const { PENDING, SUCCESS, ERROR } = CHARGES.CREATE;
    let paramObj, accountsData;

    beforeEach(() => {
      accountsData = {
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
      return store.dispatch(actions.createCharges(accountsData)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    it('should handle missing params', () => {
      accountsData.channelId = undefined;
      accountsData.email = undefined;

      // Exepected Actions
      const expectedActions = [
        {
          type: PENDING,
        },
        {
          type: ERROR,
          payload: {
            data:
              'Transactions.createCharges() is missing {channelId,email,} param(s)',
          },
        },
      ];

      const store = mockStore({});
      return store.dispatch(actions.createCharges(accountsData)).then(() => {
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
      return store.dispatch(actions.createCharges(accountsData)).then(() => {
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
      return store.dispatch(actions.createCharges(accountsData)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });

  describe('getTransactionLogs()', () => {
    const { PENDING, SUCCESS, ERROR } = TRANSACTIONS.LOGS;
    let accountsData;

    beforeEach(() => {
      accountsData = {
        chargeId: '106',
        fromDate: {
          toISOString: () => {
            return '2012-04-03';
          },
        },
        toDate: {
          toISOString: () => {
            return '2012-04-03';
          },
        },
        pageSize: 10,
        sortField: 'timestamp',
        sortOrder: 'desc',
        startIndex: 0,
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
          chargeId: '106',
          payload: {
            data: { ...mockData },
          },
        },
      ];

      const store = mockStore({});
      return store
        .dispatch(actions.getTransactionLogs(accountsData))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('should handle missing params', () => {
      accountsData.chargeId = undefined;

      // Exepected Actions
      const expectedActions = [
        {
          type: PENDING,
        },
        {
          type: ERROR,
          payload: {
            data:
              'Transactions.getTransactionLogs() is missing {chargeId} param(s)',
          },
        },
      ];

      const store = mockStore({});
      return store
        .dispatch(actions.getTransactionLogs(accountsData))
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
        .dispatch(actions.getTransactionLogs(accountsData))
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
        .dispatch(actions.getTransactionLogs(accountsData))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
  });

  describe('clearCharges()', () => {
    it('should handle success response', () => {
      const expectedData = {
        type: CHARGES.CLEAR,
      };
      expect(actions.clearCharges()).toEqual(expectedData);
    });
  });

  describe('getResponseCodes()', () => {
    const { PENDING, SUCCESS, ERROR } = TRANSACTIONS.RESPONSECODES;
    let accountsData;

    beforeEach(() => {
      accountsData = [
        10003,
        1000,
        {
          toISOString: () => {
            return '2012-04-03';
          },
        },
        {
          toISOString: () => {
            return '2012-04-03';
          },
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
        .dispatch(actions.getResponseCodes(...accountsData))
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
              'Transactions.getResponseCodes() is missing {accountId} param(s)',
          },
        },
      ];

      const store = mockStore({});
      return store
        .dispatch(actions.getResponseCodes(...accountsData))
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
        .dispatch(actions.getResponseCodes(...accountsData))
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
        .dispatch(actions.getResponseCodes(...accountsData))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
  });
});
