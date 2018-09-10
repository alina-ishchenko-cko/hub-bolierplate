import * as actions from '../accountsActions';
import { ACCOUNTS_TYPE, LOGIN_TYPE } from '../../constants';

describe('accountActions', () => {
  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);

  beforeEach(function() {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  describe('getAccounts()', () => {
    const { SUCCESS, PENDING, ERROR } = ACCOUNTS_TYPE.ACCOUNTS;
    it('should handle success response', () => {
      const mockData = {
        token: '123',
        email: 'test@example.com',
      };

      // Mock Request
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: '200',
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
      return store.dispatch(actions.getAccounts()).then(() => {
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
      return store.dispatch(actions.getAccounts()).then(() => {
        expect(store.getActions()).toEqual(
          expect.arrayContaining(expectedActions)
        );
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
      return store.dispatch(actions.getAccounts()).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });

  describe('getAccountAssets()', () => {
    const { SUCCESS, PENDING, ERROR } = ACCOUNTS_TYPE.ASSETS;
    it('should handle success response', () => {
      const mockData = {
        token: '123',
        email: 'test@example.com',
      };

      // Mock Request
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: '200',
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
          entityId: '1234',
        },
      ];

      const store = mockStore({});
      return store.dispatch(actions.getAccountAssets('1234')).then(() => {
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
            data: 'Account.getAccountAssets() is missing entityId param',
          },
        },
      ];

      const store = mockStore({});
      return store.dispatch(actions.getAccountAssets()).then(() => {
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
      return store.dispatch(actions.getAccountAssets(1233)).then(() => {
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
      return store.dispatch(actions.getAccountAssets(1223)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });

  describe('getChannelCurrency()', () => {
    const { SUCCESS, PENDING, ERROR } = ACCOUNTS_TYPE.CURRENCIES;
    it('should handle success response', () => {
      const mockData = {
        token: '123',
        email: 'test@example.com',
      };

      // Mock Request
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: '200',
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
      return store.dispatch(actions.getChannelCurrency(123, 106)).then(() => {
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
            data:
              'Account.getChannelCurrency() is missing {accountId,channelId} param(s)',
          },
        },
      ];

      const store = mockStore({});
      return store.dispatch(actions.getChannelCurrency()).then(() => {
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
      return store.dispatch(actions.getChannelCurrency(1233, 123)).then(() => {
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
      return store.dispatch(actions.getChannelCurrency(12, 344)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });

  it('should handle setSelection()', () => {
    const mockData = {
      token: '123',
      email: 'test@example.com',
    };

    // Exepected Actions
    const expectedActions = {
      type: ACCOUNTS_TYPE.SET_SELECTION,
      payload: mockData,
    };

    expect(actions.setSelection(mockData)).toEqual(expectedActions);
  });

  it('should handle setDates()', () => {
    const mockData = {
      token: '123',
      email: 'test@example.com',
    };

    // Exepected Actions
    const expectedActions = {
      type: ACCOUNTS_TYPE.SET_DATES,
      payload: mockData,
    };

    expect(actions.setDates(mockData)).toEqual(expectedActions);
  });

  it('should handle refreshData()', () => {
    // Exepected Actions
    const expectedActions = {
      type: ACCOUNTS_TYPE.REFRESH_DATA,
    };

    expect(actions.refreshData()).toEqual(expectedActions);
  });
});
