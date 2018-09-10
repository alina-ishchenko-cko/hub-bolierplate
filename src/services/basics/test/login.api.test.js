import * as LoginAPI from '../login.api';
import { setToken } from 'services/appRequest';

describe('LoginAPI', () => {
  const token = '1234567890987654';
  beforeEach(function() {
    moxios.install();
    setToken(token);
  });

  afterEach(() => {
    moxios.uninstall();
    setToken(null);
  });

  // login
  describe('login()', () => {
    let login;
    const mockData = { userId: 181, name: 'test', email: 'test@example.com' };

    beforeEach(function() {
      // Mock Request
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: '200',
          response: mockData,
        });
      });
      login = LoginAPI.login('test@example.com', '123456');
    });

    it('should use post request method', () => {
      return login.then(({ request }) => {
        expect(request.config.method).toEqual('post');
      });
    });

    it('should call the path /login', () => {
      return login.then(({ request }) => {
        const path = getApiPath(request.url);
        expect(path).toContain('/login');
      });
    });

    it('should handle missing params', () => {
      login = LoginAPI.login('test@example.com');
      return expect(login).rejects.toMatch(
        'LoginAPI.login() is missing {password} param(s)'
      );
    });
  });

  // changePassword
  describe('changePassword()', () => {
    let changePassword;
    const mockData = {
      email: 'test@example.com',
      currentPassword: '123456',
      newPassword: '1234567',
      confirmPassword: '1234567',
    };

    beforeEach(function() {
      // Mock Request
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: '200',
          response: mockData,
        });
      });
      changePassword = LoginAPI.changePassword(
        'test@example.com',
        '123456',
        '1234567',
        '1234567'
      );
    });

    it('should use post request method', () => {
      return changePassword.then(({ request }) => {
        expect(request.config.method).toEqual('post');
      });
    });

    it('should include X_AUTH_CREDENTIALS in headers', () => {
      return changePassword.then(({ request }) => {
        expect(request.headers['X_AUTH_CREDENTIALS']).toBeDefined();
        expect(request.headers['X_AUTH_CREDENTIALS']).toEqual(
          mockData.currentPassword
        );
      });
    });

    it('should call the path /change-password', () => {
      return changePassword.then(({ request }) => {
        const path = getApiPath(request.url);
        expect(path).toEqual('/change-password');
      });
    });

    it('should handle missing params', () => {
      changePassword = LoginAPI.changePassword('test@example.com', '123456');
      return expect(changePassword).rejects.toMatch(
        'LoginAPI.changePassword() is missing {newPassword,confirmPassword} param(s)'
      );
    });
  });

  // requestResetPassword
  describe('requestResetPassword()', () => {
    let requestResetPassword;
    const mockData = {
      email: 'test@example.com',
    };

    beforeEach(function() {
      // Mock Request
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: '200',
          response: mockData,
        });
      });
      requestResetPassword = LoginAPI.requestResetPassword('test@example.com');
    });

    it('should use post request method', () => {
      return requestResetPassword.then(({ request }) => {
        expect(request.config.method).toEqual('post');
      });
    });

    it('should call the path /request-reset-password', () => {
      return requestResetPassword.then(({ request }) => {
        const path = getApiPath(request.url);
        expect(path).toEqual('/request-reset-password');
      });
    });

    it('should handle missing params', () => {
      requestResetPassword = LoginAPI.requestResetPassword();
      return expect(requestResetPassword).rejects.toMatch(
        'LoginAPI.requestResetPassword() is missing {email} param(s)'
      );
    });
  });

  // verifyToken
  describe('verifyToken()', () => {
    let verifyToken;
    const mockData = {
      token: '123456789',
    };

    beforeEach(function() {
      // Mock Request
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: '200',
          response: mockData,
        });
      });
      verifyToken = LoginAPI.verifyToken('123456789');
    });

    it('should use post request method', () => {
      return verifyToken.then(({ request }) => {
        expect(request.config.method).toEqual('post');
      });
    });

    it('should call the path /verify-token', () => {
      return verifyToken.then(({ request }) => {
        const path = request.url.split('hub')[1];
        expect(path).toEqual('/verify-token');
      });
    });

    it('should handle missing params', () => {
      verifyToken = LoginAPI.verifyToken();
      return expect(verifyToken).rejects.toMatch(
        'LoginAPI.verifyToken() is missing {token} param(s)'
      );
    });
  });

  // verifyResetPassword
  describe('verifyResetPassword()', () => {
    let verifyResetPassword;

    beforeEach(function() {
      // Mock Request
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: '200',
          response: {},
        });
      });
      verifyResetPassword = LoginAPI.verifyResetPassword(
        '123',
        'tosin@exap.com',
        '1234',
        '1234'
      );
    });

    it('should use post request method', () => {
      return verifyResetPassword.then(({ request }) => {
        expect(request.config.method).toEqual('post');
      });
    });

    it('should call the path /verify-reset-password', () => {
      return verifyResetPassword.then(({ request }) => {
        const path = getApiPath(request.url);
        expect(path).toEqual('/verify-reset-password');
      });
    });

    it('should handle missing params', () => {
      verifyResetPassword = LoginAPI.verifyResetPassword(
        '123',
        'tosin@exap.com',
        '1234'
      );
      return expect(verifyResetPassword).rejects.toMatch(
        'LoginAPI.verifyResetPassword() is missing {confirmPassword} param(s)'
      );
    });
  });

  // globalLookUp
  describe('globalLookUp()', () => {
    let globalLookUp;

    beforeEach(function() {
      // Mock Request
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: '200',
          response: {},
        });
      });
      globalLookUp = LoginAPI.globalLookUp();
    });

    it('should use post request method', () => {
      return globalLookUp.then(({ request }) => {
        expect(request.config.method).toEqual('get');
      });
    });

    it('should call the path /lookups', () => {
      return globalLookUp.then(({ request }) => {
        const path = getApiPath(request.url);
        expect(path).toEqual(
          '/lookups/?lookupNames=countries,paymentmethods,currencies,industries,merchantCategoryCodes,eventTypes,frequencies'
        );
      });
    });

    it('should include X-AuthToken in headers', () => {
      return globalLookUp.then(({ request }) => {
        expect(request.headers['X-AuthToken']).toBeDefined();
        expect(request.headers['X-AuthToken']).toEqual(token);
      });
    });
  });
});
