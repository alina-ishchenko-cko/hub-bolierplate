import * as actions from '../customersActions';
import { CUSTOMERS, LOGIN_TYPE } from '../../constants';
import { setCurrencyId } from 'services/appRequest';

describe('CustomersActions', () => {
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
    const { PENDING, SUCCESS, ERROR } = CUSTOMERS.INDICATORS;
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
              'Customers.getIndicators() is missing {entityTypeId,entityId} param(s)',
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
    const { PENDING, SUCCESS, ERROR } = CUSTOMERS.ALL;
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
              'Customers.getAll() is missing {entityId,entityTypeId} param(s)',
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
});
