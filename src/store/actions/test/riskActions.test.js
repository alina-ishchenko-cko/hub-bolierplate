import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import * as actions from '../riskActions';
import {
  LOGIN_TYPE,
  RISK_BLACKLIST,
  RISK_AVS,
  RISK_VELOCITY,
  RISK_MISMATCH,
  RISK_THRESHOLD,
  RISK_VERIFIED_INFO,
  RISK_COUNTRY,
} from '../../constants';
import moxios from 'moxios';
import { setCurrencyId } from 'services/appRequest';

describe('RiskActions', () => {
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

  describe('getAllBlacklist()', () => {
    const { PENDING, SUCCESS, ERROR } = RISK_BLACKLIST.ALL;
    const dataParams = {
      accountId: '10002',
      pageSize: 10,
      startIndex: 0,
      search: 'rem',
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
      return store.dispatch(actions.getAllBlacklist(dataParams)).then(() => {
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
              'Risk.getAllBlacklist() is missing {accountId,pageSize,startIndex} param(s)',
          },
        },
      ];

      const store = mockStore({});
      return store.dispatch(actions.getAllBlacklist()).then(() => {
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
      return store.dispatch(actions.getAllBlacklist(dataParams)).then(() => {
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
      return store.dispatch(actions.getAllBlacklist(dataParams)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });

  describe('getBlacklistAttributes()', () => {
    const { PENDING, SUCCESS, ERROR } = RISK_BLACKLIST.ATTRIBUTES;
    const accountId = 100002;

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
      return store
        .dispatch(actions.getBlacklistAttributes(accountId))
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
              'Risk.getBlacklistAttributes() is missing {accountId} param(s)',
          },
        },
      ];

      const store = mockStore({});
      return store.dispatch(actions.getBlacklistAttributes()).then(() => {
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
        .dispatch(actions.getBlacklistAttributes(accountId))
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
        .dispatch(actions.getBlacklistAttributes(accountId))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
  });

  describe('deleteBlacklistRules()', () => {
    const { PENDING, SUCCESS, ERROR } = RISK_BLACKLIST.DELETE;
    const accountId = '100002';
    const ruleIds = ['generic_548', 'generic_257'];

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
      return store
        .dispatch(actions.deleteBlacklistRules(accountId, ruleIds))
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
              'Risk.deleteBlacklistRules() is missing {accountId,ruleIds} param(s)',
          },
        },
      ];

      const store = mockStore({});
      return store.dispatch(actions.deleteBlacklistRules()).then(() => {
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
        .dispatch(actions.deleteBlacklistRules(accountId, ruleIds))
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
        .dispatch(actions.deleteBlacklistRules(accountId, ruleIds))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
  });

  describe('addBlacklistRule()', () => {
    const { PENDING, SUCCESS, ERROR } = RISK_BLACKLIST.ADD;
    const accountId = '100002';
    const attributeType = 'Phone';
    const attributeValue = '93-123456789';

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
      return store
        .dispatch(
          actions.addBlacklistRule(accountId, attributeType, attributeValue)
        )
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
              'Risk.addBlacklistRule() is missing {accountId,attributeType,attributeValue} param(s)',
          },
        },
      ];

      const store = mockStore({});
      return store.dispatch(actions.addBlacklistRule()).then(() => {
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
        .dispatch(
          actions.addBlacklistRule(accountId, attributeType, attributeValue)
        )
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
        .dispatch(
          actions.addBlacklistRule(accountId, attributeType, attributeValue)
        )
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
  });

  describe('getAvsRules()', () => {
    const { PENDING, SUCCESS, ERROR } = RISK_AVS.ALL;
    const accountId = '10002';
    const businessId = '10002';

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
      return store
        .dispatch(actions.getAvsRules(accountId, businessId))
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
              'Risk.getAvsRules() is missing {accountId,businessId} param(s)',
          },
        },
      ];

      const store = mockStore({});
      return store.dispatch(actions.getAvsRules()).then(() => {
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
        .dispatch(actions.getAvsRules(accountId, businessId))
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
        .dispatch(actions.getAvsRules(accountId, businessId))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
  });

  describe('getAvsActions()', () => {
    const { PENDING, SUCCESS, ERROR } = RISK_AVS.LIST_ACTIONS;
    const accountId = '10002';
    const businessId = '10002';

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
      return store
        .dispatch(actions.getAvsActions(accountId, businessId))
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
              'Risk.getAvsActions() is missing {accountId,businessId} param(s)',
          },
        },
      ];

      const store = mockStore({});
      return store.dispatch(actions.getAvsActions()).then(() => {
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
        .dispatch(actions.getAvsActions(accountId, businessId))
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
        .dispatch(actions.getAvsActions(accountId, businessId))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
  });

  describe('saveAvsRules()', () => {
    const { PENDING, SUCCESS, ERROR } = RISK_AVS.SAVE;
    const accountId = '10002';
    const businessId = '10002';
    const avsRules = [
      {
        id: 1,
        avsCode: 'A',
        description: 'Street Match Only',
        actionId: 5,
        isActive: false,
        pendingApproval: false,
      },
      {
        id: 2,
        avsCode: 'B',
        description:
          'Street Match but Postal/Zip Not Verified (Invalid Format)',
        actionId: 7,
        isActive: false,
        pendingApproval: false,
      },
    ];
    const password = 'BlaBlaBla111!';

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
      return store
        .dispatch(
          actions.saveAvsRules(accountId, businessId, avsRules, password)
        )
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
              'Risk.saveAvsRules() is missing {accountId,businessId,avsRules,password} param(s)',
          },
        },
      ];

      const store = mockStore({});
      return store.dispatch(actions.saveAvsRules()).then(() => {
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
        .dispatch(
          actions.saveAvsRules(accountId, businessId, avsRules, password)
        )
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('should handle error code 401', () => {
      const mockData = 'Oops wrong password';
      // Mock request
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 401,
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
        .dispatch(
          actions.saveAvsRules(accountId, businessId, avsRules, password)
        )
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
  });

  describe('getVelocityRules()', () => {
    const { PENDING, SUCCESS, ERROR } = RISK_VELOCITY.ALL;
    const accountId = '10002';
    const businessId = '10003';

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
      return store
        .dispatch(actions.getVelocityRules(accountId, businessId))
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
              'Risk.getVelocityRules() is missing {accountId,businessId} param(s)',
          },
        },
      ];

      const store = mockStore({});
      return store.dispatch(actions.getVelocityRules()).then(() => {
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
        .dispatch(actions.getVelocityRules(accountId, businessId))
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
        .dispatch(actions.getVelocityRules(accountId, businessId))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
  });

  describe('getVelocityActions()', () => {
    const { PENDING, SUCCESS, ERROR } = RISK_VELOCITY.LIST_ACTIONS;
    const accountId = '10002';
    const businessId = '10003';

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
      return store
        .dispatch(actions.getVelocityActions(accountId, businessId))
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
              'Risk.getVelocityActions() is missing {accountId,businessId} param(s)',
          },
        },
      ];

      const store = mockStore({});
      return store.dispatch(actions.getVelocityActions()).then(() => {
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
        .dispatch(actions.getVelocityActions(accountId, businessId))
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
        .dispatch(actions.getVelocityActions(accountId, businessId))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
  });

  describe('saveVelocityRules()', () => {
    const { PENDING, SUCCESS, ERROR } = RISK_VELOCITY.SAVE;
    const accountId = '10002';
    const businessId = '10003';
    const velocityRules = [
      {
        id: 21,
        reasonCode: '40150',
        description: 'Card Velocity - Daily - Approved Only',
        actionId: 3,
        isActive: false,
        triggerCount: 1,
        transactionType: 'Approved',
        frequency: 'Daily',
        velocityRuleType: 'CardVelocity',
        pendingApproval: false,
      },
      {
        id: 22,
        reasonCode: '40151',
        description: 'Card Velocity - Daily - All transactions',
        actionId: 3,
        isActive: false,
        triggerCount: 1,
        transactionType: 'Approved & Declined',
        frequency: 'Daily',
        velocityRuleType: 'CardVelocity',
        pendingApproval: false,
      },
    ];
    const password = 'BlaBlaBla111!';

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
      return store
        .dispatch(
          actions.saveVelocityRules(
            accountId,
            businessId,
            velocityRules,
            password
          )
        )
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
              'Risk.saveVelocityRules() is missing {accountId,businessId,velocityRules,password} param(s)',
          },
        },
      ];

      const store = mockStore({});
      return store.dispatch(actions.saveVelocityRules()).then(() => {
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
        .dispatch(
          actions.saveVelocityRules(
            accountId,
            businessId,
            velocityRules,
            password
          )
        )
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('should handle error code 401', () => {
      const mockData = 'Oops wrong password';
      // Mock request
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 401,
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
        .dispatch(
          actions.saveVelocityRules(
            accountId,
            businessId,
            velocityRules,
            password
          )
        )
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
  });

  describe('getMismatchRules()', () => {
    const { PENDING, SUCCESS, ERROR } = RISK_MISMATCH.ALL;
    const accountId = '10002';
    const businessId = '10003';

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
      return store
        .dispatch(actions.getMismatchRules(accountId, businessId))
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
              'Risk.getMismatchRules() is missing {accountId,businessId} param(s)',
          },
        },
      ];

      const store = mockStore({});
      return store.dispatch(actions.getMismatchRules()).then(() => {
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
        .dispatch(actions.getMismatchRules(accountId, businessId))
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
        .dispatch(actions.getMismatchRules(accountId, businessId))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
  });

  describe('getMismatchActions()', () => {
    const { PENDING, SUCCESS, ERROR } = RISK_MISMATCH.LIST_ACTIONS;
    const accountId = '10002';
    const businessId = '10003';

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
      return store
        .dispatch(actions.getMismatchActions(accountId, businessId))
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
              'Risk.getMismatchActions() is missing {accountId,businessId} param(s)',
          },
        },
      ];

      const store = mockStore({});
      return store.dispatch(actions.getMismatchActions()).then(() => {
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
        .dispatch(actions.getMismatchActions(accountId, businessId))
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
        .dispatch(actions.getMismatchActions(accountId, businessId))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
  });

  describe('saveMismatchRules()', () => {
    const { PENDING, SUCCESS, ERROR } = RISK_MISMATCH.SAVE;
    const accountId = '10002';
    const businessId = '10003';
    const mismatchRules = [
      {
        id: 37,
        reasonCode: '40131',
        description: 'Shipping to Billing mismatch',
        actionId: 5,
        isActive: false,
        pendingApproval: false,
      },
      {
        id: 35,
        reasonCode: '40132',
        description: 'Shipping to BIN mismatch',
        actionId: 5,
        isActive: false,
        pendingApproval: false,
      },
    ];
    const password = 'BlaBlaBla111!';

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
      return store
        .dispatch(
          actions.saveMismatchRules(
            accountId,
            businessId,
            mismatchRules,
            password
          )
        )
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
              'Risk.saveMismatchRules() is missing {accountId,businessId,mismatchRules,password} param(s)',
          },
        },
      ];

      const store = mockStore({});
      return store.dispatch(actions.saveMismatchRules()).then(() => {
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
        .dispatch(
          actions.saveMismatchRules(
            accountId,
            businessId,
            mismatchRules,
            password
          )
        )
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('should handle error code 401', () => {
      const mockData = 'Oops wrong password';
      // Mock request
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 401,
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
        .dispatch(
          actions.saveMismatchRules(
            accountId,
            businessId,
            mismatchRules,
            password
          )
        )
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
  });

  describe('getThresholdRules()', () => {
    const { PENDING, SUCCESS, ERROR } = RISK_THRESHOLD.ALL;
    const accountId = '10002';
    const businessId = '10003';

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
      return store
        .dispatch(actions.getThresholdRules(accountId, businessId))
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
              'Risk.getThresholdRules() is missing {accountId,businessId} param(s)',
          },
        },
      ];

      const store = mockStore({});
      return store.dispatch(actions.getThresholdRules()).then(() => {
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
        .dispatch(actions.getThresholdRules(accountId, businessId))
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
        .dispatch(actions.getThresholdRules(accountId, businessId))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
  });

  describe('getThresholdActions()', () => {
    const { PENDING, SUCCESS, ERROR } = RISK_THRESHOLD.LIST_ACTIONS;
    const accountId = '10002';
    const businessId = '10003';

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
      return store
        .dispatch(actions.getThresholdActions(accountId, businessId))
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
              'Risk.getThresholdActions() is missing {accountId,businessId} param(s)',
          },
        },
      ];

      const store = mockStore({});
      return store.dispatch(actions.getThresholdActions()).then(() => {
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
        .dispatch(actions.getThresholdActions(accountId, businessId))
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
        .dispatch(actions.getThresholdActions(accountId, businessId))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
  });

  describe('saveThresholdRules()', () => {
    const { PENDING, SUCCESS, ERROR } = RISK_THRESHOLD.SAVE;
    const accountId = '10002';
    const businessId = '10003';
    const thresholdRules = {
      rules: [
        {
          id: 753,
          actionId: 8,
          isActive: false,
          reasonCode: '40141',
          lower: 0,
          upper: 200000,
          pendingApproval: false,
        },
        {
          id: 754,
          actionId: 8,
          isActive: false,
          reasonCode: '40141',
          lower: 200000,
          upper: -1,
          pendingApproval: false,
        },
      ],
      currencyId: 134,
    };
    const password = 'BlaBlaBla111!';

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
      return store
        .dispatch(
          actions.saveThresholdRules(
            accountId,
            businessId,
            thresholdRules,
            password
          )
        )
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
              'Risk.saveThresholdRules() is missing {accountId,businessId,thresholdRules,password} param(s)',
          },
        },
      ];

      const store = mockStore({});
      return store.dispatch(actions.saveThresholdRules()).then(() => {
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
        .dispatch(
          actions.saveThresholdRules(
            accountId,
            businessId,
            thresholdRules,
            password
          )
        )
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('should handle error code 401', () => {
      const mockData = 'Oops wrong password';
      // Mock request
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 401,
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
        .dispatch(
          actions.saveThresholdRules(
            accountId,
            businessId,
            thresholdRules,
            password
          )
        )
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
  });

  describe('getVerifiedInfoRules()', () => {
    const { PENDING, SUCCESS, ERROR } = RISK_VERIFIED_INFO.ALL;
    const accountId = '10002';
    const businessId = '10003';

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
      return store
        .dispatch(actions.getVerifiedInfoRules(accountId, businessId))
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
              'Risk.getVerifiedInfoRules() is missing {accountId,businessId} param(s)',
          },
        },
      ];

      const store = mockStore({});
      return store.dispatch(actions.getVerifiedInfoRules()).then(() => {
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
        .dispatch(actions.getVerifiedInfoRules(accountId, businessId))
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
        .dispatch(actions.getVerifiedInfoRules(accountId, businessId))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
  });

  describe('getVerifiedInfoActions()', () => {
    const { PENDING, SUCCESS, ERROR } = RISK_VERIFIED_INFO.LIST_ACTIONS;
    const accountId = '10002';
    const businessId = '10003';

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
      return store
        .dispatch(actions.getVerifiedInfoActions(accountId, businessId))
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
              'Risk.getVerifiedInfoActions() is missing {accountId,businessId} param(s)',
          },
        },
      ];

      const store = mockStore({});
      return store.dispatch(actions.getVerifiedInfoActions()).then(() => {
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
        .dispatch(actions.getVerifiedInfoActions(accountId, businessId))
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
        .dispatch(actions.getVerifiedInfoActions(accountId, businessId))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
  });

  describe('saveVerifiedInfoRules()', () => {
    const { PENDING, SUCCESS, ERROR } = RISK_VERIFIED_INFO.SAVE;
    const accountId = '10002';
    const businessId = '10003';
    const verifiedInfoRules = [
      {
        id: 44,
        reasonCode: '40181',
        description: 'Verify the email address is valid ',
        actionId: 3,
        isActive: false,
        pendingApproval: false,
      },
      {
        id: 45,
        reasonCode: '40183',
        description: 'Verify if the IP is behind a proxy',
        actionId: 5,
        isActive: false,
        pendingApproval: false,
      },
    ];
    const password = 'BlaBlaBla111!';

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
      return store
        .dispatch(
          actions.saveVerifiedInfoRules(
            accountId,
            businessId,
            verifiedInfoRules,
            password
          )
        )
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
              'Risk.saveVerifiedInfoRules() is missing {accountId,businessId,verifiedInfoRules,password} param(s)',
          },
        },
      ];

      const store = mockStore({});
      return store.dispatch(actions.saveVerifiedInfoRules()).then(() => {
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
        .dispatch(
          actions.saveVerifiedInfoRules(
            accountId,
            businessId,
            verifiedInfoRules,
            password
          )
        )
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('should handle error code 401', () => {
      const mockData = 'Oops wrong password';
      // Mock request
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 401,
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
        .dispatch(
          actions.saveVerifiedInfoRules(
            accountId,
            businessId,
            verifiedInfoRules,
            password
          )
        )
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
  });

  describe('getHighRiskCountries()', () => {
    const { PENDING, SUCCESS, ERROR } = RISK_COUNTRY.ALL;
    const accountId = '10002';
    const businessId = '10003';

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
      return store
        .dispatch(actions.getHighRiskCountries(accountId, businessId))
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
              'Risk.getHighRiskCountries() is missing {accountId,businessId} param(s)',
          },
        },
      ];

      const store = mockStore({});
      return store.dispatch(actions.getHighRiskCountries()).then(() => {
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
        .dispatch(actions.getHighRiskCountries(accountId, businessId))
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
        .dispatch(actions.getHighRiskCountries(accountId, businessId))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
  });

  describe('saveHighRiskCountries()', () => {
    const { PENDING, SUCCESS, ERROR } = RISK_COUNTRY.SAVE;
    const accountId = '10002';
    const businessId = '10003';
    const data = { countries: [1, 2, 3] };
    const password = 'BlaBlaBla111!';

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
      return store
        .dispatch(
          actions.saveHighRiskCountries(accountId, businessId, data, password)
        )
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
              'Risk.saveHighRiskCountries() is missing {accountId,businessId,countries,password} param(s)',
          },
        },
      ];

      const store = mockStore({});
      return store.dispatch(actions.saveHighRiskCountries()).then(() => {
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
        .dispatch(
          actions.saveHighRiskCountries(accountId, businessId, data, password)
        )
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('should handle error code 401', () => {
      const mockData = 'Oops wrong password';
      // Mock request
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 401,
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
        .dispatch(
          actions.saveHighRiskCountries(accountId, businessId, data, password)
        )
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
  });
});
