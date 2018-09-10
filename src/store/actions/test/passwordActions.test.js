import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import * as passwordActions from '../passwordActions';
import {
  CHANGE_PASSWORD_TYPE,
  REQUEST_PASSWORD_TYPE,
  LOGIN_TYPE,
} from '../../constants';
import moxios from 'moxios';

describe('PasswordActions', () => {
  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);

  beforeEach(function() {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  describe('requestResetPassword()', () => {
    const { PENDING, SUCCESS, ERROR } = REQUEST_PASSWORD_TYPE;

    it('should handle success response', () => {
      // Mock request
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: {},
        });
      });
      // Expected actions
      const expectedActions = [
        { type: PENDING },
        {
          type: SUCCESS,
        },
      ];
      const store = mockStore({});
      return store
        .dispatch(passwordActions.requestResetPassword('test@text.com'))
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
            data: 'LoginAPI.requestResetPassword() is missing {email} param(s)',
          },
        },
      ];

      const store = mockStore({});
      return store.dispatch(passwordActions.requestResetPassword()).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    it('should handle reject response', () => {
      const mockData = {
        errorCode: 1234,
      };
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
        .dispatch(passwordActions.requestResetPassword('test@exaple.com'))
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
        .dispatch(passwordActions.requestResetPassword('test@exaple.com'))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
  });

  describe('changePassword()', () => {
    let mockData;
    const { PENDING, SUCCESS, ERROR } = CHANGE_PASSWORD_TYPE;

    beforeEach(() => {
      mockData = {
        email: 'test@example.com',
        currentPassword: 'password',
        newPassword: 'password',
        confirmPassword: 'password',
      };
    });

    it('should handle success response without token', () => {
      // Mock request
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: {},
        });
      });
      // Expected actions
      const expectedActions = [
        { type: PENDING },
        {
          type: SUCCESS,
        },
      ];
      const store = mockStore({});
      return store
        .dispatch(passwordActions.changePassword(mockData))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('should handle success response with token', () => {
      mockData.token = '234567890-';
      // Mock request
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: {},
        });
      });
      // Expected actions
      const expectedActions = [
        { type: PENDING },
        {
          type: SUCCESS,
        },
      ];
      const store = mockStore({});
      return store
        .dispatch(passwordActions.changePassword(mockData))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('should handle missing params', () => {
      mockData.email = undefined;
      // Expected actions
      const expectedActions = [
        {
          type: PENDING,
        },
        {
          type: ERROR,
          payload: {
            data: 'LoginAPI.changePassword() is missing {email} param(s)',
          },
        },
      ];

      const store = mockStore({});
      return store
        .dispatch(passwordActions.changePassword(mockData))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('should handle reject response', () => {
      const data = {
        errorCode: 1234,
      };
      // Mock request
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 400,
          response: data,
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
            data: data,
          },
        },
      ];
      const store = mockStore({});
      return store
        .dispatch(passwordActions.changePassword(mockData))
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
        .dispatch(passwordActions.changePassword(mockData))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
  });

  describe('verifyToken()', () => {
    const { TOKEN_SUCCESS, TOKEN_ERROR } = CHANGE_PASSWORD_TYPE;

    it('should handle success response', () => {
      // Mock request
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: {},
        });
      });
      // Expected actions
      const expectedActions = [
        {
          type: TOKEN_SUCCESS,
        },
      ];
      const store = mockStore({});
      return store
        .dispatch(passwordActions.verifyToken('1234567890-'))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('should handle missing params', () => {
      // Expected actions
      const expectedActions = [
        {
          type: TOKEN_ERROR,
          payload: {
            data: 'LoginAPI.verifyToken() is missing {token} param(s)',
          },
        },
      ];

      const store = mockStore({});
      return store.dispatch(passwordActions.verifyToken()).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    it('should handle reject response', () => {
      const mockData = {
        errorCode: 1234,
      };
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
          type: TOKEN_ERROR,
          payload: {
            data: mockData,
          },
        },
      ];
      const store = mockStore({});
      return store
        .dispatch(passwordActions.verifyToken('1234567890-'))
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
          type: LOGIN_TYPE.SIGN_OUT,
          sessionEnd: true,
        },
      ];
      const store = mockStore({});
      return store
        .dispatch(passwordActions.verifyToken('1234567890-'))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
  });

  describe('clearPassword()', () => {
    it('should handle clear password state', () => {
      // Exepected Actions
      const expectedActions = {
        type: CHANGE_PASSWORD_TYPE.CLEAR,
      };

      expect(passwordActions.clearPassword()).toEqual(expectedActions);
    });
  });
});
