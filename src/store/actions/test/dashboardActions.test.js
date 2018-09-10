import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import * as actions from '../dashboardActions';
import { INDICATORS_TYPE, SUMMARY_TYPE, LOGIN_TYPE } from '../../constants';
import moxios from 'moxios';
import { setCurrencyId } from 'services/appRequest';

describe('dashboardActions', () => {
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
    it('should handle success response', () => {
      const accountsData = {
        accountId: 106,
        fromDate: {
          toISOString: () => '2012-04-03',
        },
        toDate: {
          toISOString: () => '2012-04-03',
        },
      };

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
          type: INDICATORS_TYPE.PENDING,
        },
        {
          type: INDICATORS_TYPE.SUCCESS,
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
      const accountsData = {
        fromDate: {
          toISOString: () => '2012-04-03',
        },
        toDate: {
          toISOString: () => '2012-04-03',
        },
      };

      // Exepected Actions
      const expectedActions = [
        {
          type: INDICATORS_TYPE.PENDING,
        },
        {
          type: INDICATORS_TYPE.ERROR,
          payload: {
            data:
              'Dashboard.getIndicators() is missing {entityTypeId,entityId} param(s)',
          },
        },
      ];

      const store = mockStore({});
      return store.dispatch(actions.getIndicators(accountsData)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    it('should handle reject response', () => {
      const accountsData = {
        accountId: 108,
        fromDate: {
          toISOString: () => '2012-04-03',
        },
        toDate: {
          toISOString: () => '2012-04-03',
        },
      };

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
          type: INDICATORS_TYPE.PENDING,
        },
        {
          type: INDICATORS_TYPE.ERROR,
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
      const accountsData = {
        accountId: 108,
        fromDate: {
          toISOString: () => '2012-04-03',
        },
        toDate: {
          toISOString: () => '2012-04-03',
        },
      };

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
          type: INDICATORS_TYPE.PENDING,
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

  describe('getSummary()', () => {
    it('should handle success response', () => {
      const accountsData = {
        accountId: 106,
        fromDate: {
          toISOString: () => '2012-04-03',
        },
        toDate: {
          toISOString: () => '2012-04-03',
        },
      };

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
          type: SUMMARY_TYPE.PENDING,
        },
        {
          type: SUMMARY_TYPE.SUCCESS,
          payload: {
            data: { ...mockData },
          },
        },
      ];

      const store = mockStore({});
      return store.dispatch(actions.getSummary(accountsData)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    it('should handle missing params', () => {
      const accountsData = {
        fromDate: {
          toISOString: () => '2012-04-03',
        },
        toDate: {
          toISOString: () => '2012-04-03',
        },
      };

      // Exepected Actions
      const expectedActions = [
        {
          type: SUMMARY_TYPE.PENDING,
        },
        {
          type: SUMMARY_TYPE.ERROR,
          payload: {
            data:
              'Dashboard.getSummary() is missing {entityTypeId,entityId} param(s)',
          },
        },
      ];

      const store = mockStore({});
      return store.dispatch(actions.getSummary(accountsData)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    it('should handle reject response', () => {
      const accountsData = {
        accountId: 108,
        fromDate: {
          toISOString: () => '2012-04-03',
        },
        toDate: {
          toISOString: () => '2012-04-03',
        },
      };

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
          type: SUMMARY_TYPE.PENDING,
        },
        {
          type: SUMMARY_TYPE.ERROR,
          payload: {
            data: mockData,
          },
        },
      ];

      const store = mockStore({});
      return store.dispatch(actions.getSummary(accountsData)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    it('should handle error code 401', () => {
      const accountsData = {
        accountId: 108,
        fromDate: {
          toISOString: () => '2012-04-03',
        },
        toDate: {
          toISOString: () => '2012-04-03',
        },
      };

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
          type: SUMMARY_TYPE.PENDING,
        },
        {
          type: LOGIN_TYPE.SIGN_OUT,
          sessionEnd: true,
        },
      ];

      const store = mockStore({});
      return store.dispatch(actions.getSummary(accountsData)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });
});
