import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import * as actions from '../reportsActions';
import { REPORTS, LOGIN_TYPE } from '../../constants';
import moxios from 'moxios';
import { setCurrencyId } from 'services/appRequest';

describe('ReportsActions', () => {
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

  describe('getAllReports()', () => {
    const { PENDING, SUCCESS, ERROR } = REPORTS.ALL;
    const connectionId = '';

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
      return store.dispatch(actions.getAllReports(connectionId)).then(() => {
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
      return store.dispatch(actions.getAllReports(connectionId)).then(() => {
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
      return store.dispatch(actions.getAllReports(connectionId)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });

  describe('generateReports()', () => {
    const { PENDING, SUCCESS, ERROR } = REPORTS.GENERATE;
    let data = {
      entityTypeId: 2,
      entityId: 1000,
      fromDate: '2012-04-03',
      toDate: '2012-04-03',
      reports: ['RPCB'],
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
        { type: PENDING },
        {
          type: SUCCESS,
          payload: {
            data: { ...mockData },
          },
        },
      ];
      const store = mockStore({});
      return store.dispatch(actions.generateReports(data)).then(() => {
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
              'Reports.generateReports() is missing {entityTypeId,entityId,fromDate,toDate,reports} param(s)',
          },
        },
      ];

      const store = mockStore({});
      return store.dispatch(actions.generateReports()).then(() => {
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
      return store.dispatch(actions.generateReports(data)).then(() => {
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
          sessionEnd: true,
          type: LOGIN_TYPE.SIGN_OUT,
          sessionEnd: true,
        },
      ];
      const store = mockStore({});
      return store.dispatch(actions.generateReports(data)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });
});
