import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { STATEMENTS, LOGIN_TYPE } from '../../constants';
import moxios from 'moxios';
import { setCurrencyId } from 'services/appRequest';
import * as actions from '../statementsActions';

describe('StatementsActions', () => {
  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);

  beforeEach(function() {
    moxios.install();
    setCurrencyId(106);
  });

  afterEach(() => {
    moxios.uninstall();
    setCurrencyId(null);
  });

  describe('getAll()', () => {
    const { PENDING, SUCCESS, ERROR } = STATEMENTS;
    const data = {
      accountId: 100069,
      businessId: 100105,
      pageSize: 10,
      sortColumn: 'settlementDate',
      sortOrder: 'desc',
      startIndex: 0,
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
        { payload: { scope: 'default' }, type: 'loading-bar/HIDE' },
        { payload: { scope: 'default' }, type: 'loading-bar/SHOW' },
        { type: PENDING },
        { payload: { scope: 'default' }, type: 'loading-bar/HIDE' },
        {
          type: SUCCESS,
          payload: {
            data: { ...mockData },
          },
        },
      ];
      const store = mockStore({});
      return store.dispatch(actions.getAll(data)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    it('should handle missing params', () => {
      // Expected actions
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
              'Statements.getAll() is missing {accountId,businessId,pageSize,sortColumn,sortOrder,startIndex} param(s)',
          },
        },
      ];

      const store = mockStore({});
      return store.dispatch(actions.getAll({})).then(() => {
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
      return store.dispatch(actions.getAll(data)).then(() => {
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
      return store.dispatch(actions.getAll(data)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });

  describe('getBusinessStatements()', () => {
    const { PENDING, SUCCESS, ERROR } = STATEMENTS.GROUP;
    const accountId = '100069';
    const statementId = '22';

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
          statementId: '22',
        },
      ];
      const store = mockStore({});
      return store
        .dispatch(actions.getBusinessStatements(accountId, statementId))
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
              'Statements.getBusinessStatements() is missing {accountId,statementId} param(s)',
          },
        },
      ];

      const store = mockStore({});
      return store.dispatch(actions.getBusinessStatements()).then(() => {
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
        .dispatch(actions.getBusinessStatements(accountId, statementId))
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
        .dispatch(actions.getBusinessStatements(accountId, statementId))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
  });
});
