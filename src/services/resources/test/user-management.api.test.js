import * as UserManagementAPI from '../user-management.api';
import { setCurrencyId, setToken } from 'services/appRequest';

describe('UserManagementAPI', () => {
  const token = '1234567890';

  beforeEach(function() {
    setToken(token);
    setCurrencyId(106);
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  describe('getListOfUsers()', () => {
    let getListOfUsers;
    const accountId = '10002';

    beforeEach(function() {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: '200',
          response: {},
        });
      });
      getListOfUsers = UserManagementAPI.getListOfUsers(accountId);
    });

    it('should use get request method', () => {
      return getListOfUsers.then(({ request }) => {
        expect(request.config.method).toBe('get');
      });
    });

    it('should call the path /accounts/10002/user-management', () => {
      const expected = '/accounts/10002/user-management';
      return getListOfUsers.then(({ request }) => {
        const path = getApiPath(request.url);
        expect(path).toBe(expected);
      });
    });

    it('should include X-AuthToken in headers', () => {
      return getListOfUsers.then(({ request }) => {
        expect(request.headers['X-AuthToken']).toBeDefined();
        expect(request.headers['X-AuthToken']).toBe(token);
      });
    });

    it('should handle missing params', () => {
      expect.assertions(1);
      const expected =
        'UserManagement.getListOfUsers() is missing {accountId} param(s)';
      return UserManagementAPI.getListOfUsers().catch(errorMsg => {
        expect(errorMsg).toBe(expected);
      });
    });
  });

  describe('updateUserInfo()', () => {
    let updateUserInfo;
    const accountId = '10002';
    const userId = 200;
    const data = {};

    beforeEach(function() {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: '200',
          response: {},
        });
      });
      updateUserInfo = UserManagementAPI.updateUserInfo(
        accountId,
        userId,
        data
      );
    });

    it('should use put request method', () => {
      return updateUserInfo.then(({ request }) => {
        expect(request.config.method).toBe('put');
      });
    });

    it('should call the path /accounts/10002/user-management/200', () => {
      const expected = '/accounts/10002/user-management/200';
      return updateUserInfo.then(({ request }) => {
        const path = getApiPath(request.url);
        expect(path).toBe(expected);
      });
    });

    it('should include X-AuthToken in headers', () => {
      return updateUserInfo.then(({ request }) => {
        expect(request.headers['X-AuthToken']).toBeDefined();
        expect(request.headers['X-AuthToken']).toBe(token);
      });
    });

    it('should handle missing params', () => {
      expect.assertions(1);
      const expected =
        'UserManagement.updateUserInfo() is missing {accountId,userId,data} param(s)';
      return UserManagementAPI.updateUserInfo().catch(errorMsg => {
        expect(errorMsg).toBe(expected);
      });
    });
  });

  describe('createUser()', () => {
    let createUser;
    const accountId = '10002';
    const data = {
      allowedBusinesses: [],
      email: 'blabla@email.com',
      readOnly: true,
    };

    beforeEach(function() {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: '200',
          response: {},
        });
      });
      createUser = UserManagementAPI.createUser(accountId, data);
    });

    it('should use post request method', () => {
      return createUser.then(({ request }) => {
        expect(request.config.method).toBe('post');
      });
    });

    it('should call the path /accounts/10002/user-management', () => {
      const expected = '/accounts/10002/user-management';
      return createUser.then(({ request }) => {
        const path = getApiPath(request.url);
        expect(path).toBe(expected);
      });
    });

    it('should include X-AuthToken in headers', () => {
      return createUser.then(({ request }) => {
        expect(request.headers['X-AuthToken']).toBeDefined();
        expect(request.headers['X-AuthToken']).toBe(token);
      });
    });

    it('should handle missing params', () => {
      expect.assertions(1);
      const expected =
        'UserManagement.createUser() is missing {accountId,allowedBusinesses,email,readOnly} param(s)';
      return UserManagementAPI.createUser().catch(errorMsg => {
        expect(errorMsg).toBe(expected);
      });
    });
  });

  describe('deleteUser()', () => {
    let deleteUser;
    const accountId = '10002';
    const userId = 200;

    beforeEach(function() {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: '200',
          response: {},
        });
      });
      deleteUser = UserManagementAPI.deleteUser(accountId, userId);
    });

    it('should use delete request method', () => {
      return deleteUser.then(({ request }) => {
        expect(request.config.method).toBe('delete');
      });
    });

    it('should call the path /accounts/10002/user-management/200', () => {
      const expected = '/accounts/10002/user-management/200';
      return deleteUser.then(({ request }) => {
        const path = getApiPath(request.url);
        expect(path).toBe(expected);
      });
    });

    it('should include X-AuthToken in headers', () => {
      return deleteUser.then(({ request }) => {
        expect(request.headers['X-AuthToken']).toBeDefined();
        expect(request.headers['X-AuthToken']).toBe(token);
      });
    });

    it('should handle missing params', () => {
      expect.assertions(1);
      const expected =
        'UserManagement.deleteUser() is missing {accountId,userId} param(s)';
      return UserManagementAPI.deleteUser().catch(errorMsg => {
        expect(errorMsg).toBe(expected);
      });
    });
  });
});
