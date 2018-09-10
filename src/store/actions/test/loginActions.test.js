import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import * as actions from '../loginActions';
import {
  LOGIN_TYPE,
  PASSWORD_TYPE,
  LOOKUPS_TYPE,
  CHANGE_PASSWORD_TYPE,
  PROFILE_UPDATE,
} from '../../constants';
import moxios from 'moxios';
import { ERROR_CODES } from 'config/';

describe('LoginActions', () => {
  const middlewares = [thunk];
  let request;
  const mockStore = configureMockStore(middlewares);

  beforeEach(function() {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  describe('loginUser()', () => {
    const { PENDING, SUCCESS, ERROR, SIGN_OUT } = LOGIN_TYPE;
    let accountsData;

    beforeEach(() => {
      accountsData = {
        email: 'test@exampke.com',
        password: '122346',
      };
    });

    it('should handle success response', () => {
      const mockData = {
        other: 'hello',
        email: 'test@example.com',
      };

      // Mock Request
      moxios.wait(() => {
        request = moxios.requests.mostRecent();
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
      return store.dispatch(actions.loginUser(accountsData)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    it('should handle reject response', () => {
      const mockData = 'Oops error error';

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
          payload: mockData,
        },
      ];

      const store = mockStore({});
      return store.dispatch(actions.loginUser(accountsData)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    it('should handle error code PASSWORD_RESET_REQUIRED', () => {
      // Mock Request
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 400,
          response: {
            errorCode: ERROR_CODES.PASSWORD_RESET_REQUIRED,
          },
        });
      });

      // Expected Actions
      const expectedActions = [
        {
          type: PENDING,
        },
        {
          type: CHANGE_PASSWORD_TYPE.RESET,
          payload: { data: { ...accountsData } },
        },
      ];

      const store = mockStore({});
      return store.dispatch(actions.loginUser(accountsData)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    it('should handle error code PASSWORD_EXPIRED', () => {
      // Mock Request
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 400,
          response: {
            errorCode: ERROR_CODES.PASSWORD_EXPIRED,
          },
        });
      });

      // Expected Actions
      const expectedActions = [
        {
          type: PENDING,
        },
        {
          type: CHANGE_PASSWORD_TYPE.RESET,
          payload: { data: { ...accountsData } },
        },
      ];

      const store = mockStore({});
      return store.dispatch(actions.loginUser(accountsData)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    it('should handle error code TOKEN_EXPIRED', () => {
      // Mock Request
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 400,
          response: {
            errorCode: ERROR_CODES.TOKEN_EXPIRED,
          },
        });
      });

      // Expected Actions
      const expectedActions = [
        {
          type: PENDING,
        },
        {
          type: SIGN_OUT,
        },
      ];

      const store = mockStore({});
      return store.dispatch(actions.loginUser(accountsData)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });

  describe('loadCachedLogin()', () => {
    it('should dispatch the right data', () => {
      const mockData = {
        other: 'hello',
        email: 'test@example.com',
      };

      // Exepected Actions
      const expectedActions = {
        type: LOGIN_TYPE.CACHED_DATA,
        payload: { data: mockData },
      };

      const store = mockStore({});
      expect(actions.loadCachedLogin(mockData)).toEqual(expectedActions);
    });
  });

  describe('logout()', () => {
    it('should dispatch sign out type', () => {
      // Exepected Actions
      const expectedActions = {
        type: LOGIN_TYPE.SIGN_OUT,
        sessionEnd: false,
      };

      const store = mockStore({});
      expect(actions.logout()).toEqual(expectedActions);
    });
  });

  describe('clearLoginState()', () => {
    it('should clear the login state', () => {
      // Exepected Actions
      const expectedActions = {
        type: LOGIN_TYPE.CLEAR,
      };

      const store = mockStore({});
      expect(actions.clearLoginState()).toEqual(expectedActions);
    });
  });

  describe('globalLookUp()', () => {
    const { PENDING, SUCCESS, ERROR } = LOOKUPS_TYPE;
    let accountsData;

    beforeEach(() => {
      accountsData = {
        entityTypeId: 2,
        entityId: 1000,
        customerId: 50000,
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
      return store.dispatch(actions.globalLookUp()).then(() => {
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
      return store.dispatch(actions.globalLookUp()).then(() => {
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
      return store.dispatch(actions.globalLookUp()).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });

  describe('updateProfile()', () => {
    let data;
    const { PENDING, SUCCESS, ERROR } = PROFILE_UPDATE;

    beforeEach(() => {
      data = ['test', 'test@text.com', 'london'];
    });

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
      return store.dispatch(actions.updateProfile(...data)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    it('should handle missing params', () => {
      data[0] = undefined;
      // Expected actions
      const expectedActions = [
        {
          type: PENDING,
        },
        {
          type: ERROR,
          payload: {
            data: 'Settings.updateProfile() is missing {name} param(s)',
          },
        },
      ];

      const store = mockStore({});
      return store.dispatch(actions.updateProfile(...data)).then(() => {
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
      return store.dispatch(actions.updateProfile(...data)).then(() => {
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
      return store.dispatch(actions.updateProfile(...data)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });
});
