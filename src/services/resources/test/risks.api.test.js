import * as RiskAPI from '../risks.api';
import { setCurrencyId, setToken } from 'services/appRequest';

describe('RiskAPI', () => {
  const token = '1234567890';

  beforeEach(function() {
    setToken(token);
    setCurrencyId(106);
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  afterAll(() => {
    setToken(null);
    setCurrencyId(null);
  });

  describe('getAllBlacklist()', () => {
    let getAllBlacklist;
    let mockData = {
      accountId: '100002',
      pageSize: 10,
      startIndex: 0,
      search: 'rem',
    };

    beforeEach(function() {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: '200',
          response: {},
        });
      });
      getAllBlacklist = RiskAPI.getAllBlacklist(mockData);
    });

    it('should use get request method', () => {
      return getAllBlacklist.then(({ request }) => {
        expect(request.config.method).toBe('get');
      });
    });

    it('should call the path /accounts/100002/risk/blacklist?pageSize=10&startIndex=0&search=rem', () => {
      const expected =
        '/accounts/100002/risk/blacklist?pageSize=10&startIndex=0&search=rem';
      return getAllBlacklist.then(({ request }) => {
        const path = getApiPath(request.url);
        expect(path).toBe(expected);
      });
    });

    it('should include X-AuthToken in headers', () => {
      return getAllBlacklist.then(({ request }) => {
        expect(request.headers['X-AuthToken']).toBeDefined();
        expect(request.headers['X-AuthToken']).toBe(token);
      });
    });

    it('should handle missing params', () => {
      expect.assertions(1);
      getAllBlacklist = RiskAPI.getAllBlacklist();
      return expect(getAllBlacklist).rejects.toMatch(
        'Risk.getAllBlacklist() is missing {accountId,pageSize,startIndex} param(s)'
      );
    });
  });

  describe('getBlacklistAttributes()', () => {
    let getBlacklistAttributes;
    let accountId = '100002';

    beforeEach(function() {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: '200',
          response: {},
        });
      });
      getBlacklistAttributes = RiskAPI.getBlacklistAttributes(accountId);
    });

    it('should use get request method', () => {
      return getBlacklistAttributes.then(({ request }) => {
        expect(request.config.method).toBe('get');
      });
    });

    it('should call the path /accounts/100002/risk/blacklist/attributes', () => {
      const expected = '/accounts/100002/risk/blacklist/attributes';
      return getBlacklistAttributes.then(({ request }) => {
        const path = getApiPath(request.url);
        expect(path).toBe(expected);
      });
    });

    it('should include X-AuthToken in headers', () => {
      return getBlacklistAttributes.then(({ request }) => {
        expect(request.headers['X-AuthToken']).toBeDefined();
        expect(request.headers['X-AuthToken']).toBe(token);
      });
    });

    it('should handle missing params', () => {
      expect.assertions(1);
      getBlacklistAttributes = RiskAPI.getBlacklistAttributes();
      return expect(getBlacklistAttributes).rejects.toMatch(
        'Risk.getBlacklistAttributes() is missing {accountId} param(s)'
      );
    });
  });

  describe('deleteBlacklistRules()', () => {
    let deleteBlacklistRules;
    const accountId = '100002';
    const ruleIds = ['generic_548', 'generic_257'];

    beforeEach(function() {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: '200',
          response: {},
        });
      });
      deleteBlacklistRules = RiskAPI.deleteBlacklistRules(accountId, ruleIds);
    });

    it('should use delete request method', () => {
      return deleteBlacklistRules.then(({ request }) => {
        expect(request.config.method).toBe('delete');
      });
    });

    it('should call the path /accounts/100002/risk/blacklist?ruleIds=generic_548,generic_257', () => {
      const expected =
        '/accounts/100002/risk/blacklist?ruleIds=generic_548,generic_257';
      return deleteBlacklistRules.then(({ request }) => {
        const path = getApiPath(request.url);
        expect(path).toBe(expected);
      });
    });

    it('should include X-AuthToken in headers', () => {
      return deleteBlacklistRules.then(({ request }) => {
        expect(request.headers['X-AuthToken']).toBeDefined();
        expect(request.headers['X-AuthToken']).toBe(token);
      });
    });

    it('should handle missing params', () => {
      expect.assertions(1);
      deleteBlacklistRules = RiskAPI.deleteBlacklistRules();
      return expect(deleteBlacklistRules).rejects.toMatch(
        'Risk.deleteBlacklistRules() is missing {accountId,ruleIds} param(s)'
      );
    });
  });

  describe('addBlacklistRule()', () => {
    let addBlacklistRule;
    const accountId = '100002';
    const attributeType = 'Phone';
    const attributeValue = '93-123456789';

    beforeEach(function() {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: '200',
          response: {},
        });
      });
      addBlacklistRule = RiskAPI.addBlacklistRule(
        accountId,
        attributeType,
        attributeValue
      );
    });

    it('should use post request method', () => {
      return addBlacklistRule.then(({ request }) => {
        expect(request.config.method).toBe('post');
      });
    });

    it('should call the path /accounts/100002/risk/blacklist', () => {
      const expected = '/accounts/100002/risk/blacklist';
      return addBlacklistRule.then(({ request }) => {
        const path = getApiPath(request.url);
        expect(path).toBe(expected);
      });
    });

    it('should include X-AuthToken in headers', () => {
      return addBlacklistRule.then(({ request }) => {
        expect(request.headers['X-AuthToken']).toBeDefined();
        expect(request.headers['X-AuthToken']).toBe(token);
      });
    });

    it('should handle missing params', () => {
      expect.assertions(1);
      addBlacklistRule = RiskAPI.addBlacklistRule();
      return expect(addBlacklistRule).rejects.toMatch(
        'Risk.addBlacklistRule() is missing {accountId,attributeType,attributeValue} param(s)'
      );
    });
  });

  describe('getAvsRules()', () => {
    let getAvsRules;
    const accountId = '10002';
    const businessId = '10002';

    beforeEach(function() {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: '200',
          response: {},
        });
      });
      getAvsRules = RiskAPI.getAvsRules(accountId, businessId);
    });

    it('should use get request method', () => {
      return getAvsRules.then(({ request }) => {
        expect(request.config.method).toBe('get');
      });
    });

    it('should call the path /accounts/10002/businesses/10002/risk/avs', () => {
      const expected = '/accounts/10002/businesses/10002/risk/avs';
      return getAvsRules.then(({ request }) => {
        const path = getApiPath(request.url);
        expect(path).toBe(expected);
      });
    });

    it('should include X-AuthToken in headers', () => {
      return getAvsRules.then(({ request }) => {
        expect(request.headers['X-AuthToken']).toBeDefined();
        expect(request.headers['X-AuthToken']).toBe(token);
      });
    });

    it('should handle missing params', () => {
      expect.assertions(1);
      getAvsRules = RiskAPI.getAvsRules();
      return expect(getAvsRules).rejects.toMatch(
        'Risk.getAvsRules() is missing {accountId,businessId} param(s)'
      );
    });
  });

  describe('getAvsActions()', () => {
    let getAvsActions;
    const accountId = '10002';
    const businessId = '10002';

    beforeEach(function() {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: '200',
          response: {},
        });
      });
      getAvsActions = RiskAPI.getAvsActions(accountId, businessId);
    });

    it('should use get request method', () => {
      return getAvsActions.then(({ request }) => {
        expect(request.config.method).toBe('get');
      });
    });

    it('should call the path /accounts/10002/businesses/10002/risk/avs/actions ', () => {
      const expected = '/accounts/10002/businesses/10002/risk/avs/actions';
      return getAvsActions.then(({ request }) => {
        const path = getApiPath(request.url);
        expect(path).toBe(expected);
      });
    });

    it('should include X-AuthToken in headers', () => {
      return getAvsActions.then(({ request }) => {
        expect(request.headers['X-AuthToken']).toBeDefined();
        expect(request.headers['X-AuthToken']).toBe(token);
      });
    });

    it('should handle missing params', () => {
      expect.assertions(1);
      getAvsActions = RiskAPI.getAvsActions();
      return expect(getAvsActions).rejects.toMatch(
        'Risk.getAvsActions() is missing {accountId,businessId} param(s)'
      );
    });
  });

  describe('saveAvsRules()', () => {
    let saveAvsRules;
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

    beforeEach(function() {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: '200',
          response: {},
        });
      });
      saveAvsRules = RiskAPI.saveAvsRules(
        accountId,
        businessId,
        avsRules,
        password
      );
    });

    it('should use put request method', () => {
      return saveAvsRules.then(({ request }) => {
        expect(request.config.method).toBe('put');
      });
    });

    it('should have the request payload: avsRules', () => {
      const requestData = JSON.stringify(avsRules);
      return saveAvsRules.then(({ request }) => {
        expect(request.config.data).toBe(requestData);
      });
    });

    it('should call the path /accounts/10002/businesses/10002/risk/avs', () => {
      const expected = '/accounts/10002/businesses/10002/risk/avs';
      return saveAvsRules.then(({ request }) => {
        const path = getApiPath(request.url);
        expect(path).toBe(expected);
      });
    });

    it('should include X-AuthToken in headers', () => {
      return saveAvsRules.then(({ request }) => {
        expect(request.headers['X-AuthToken']).toBeDefined();
        expect(request.headers['X-AuthToken']).toBe(token);
      });
    });

    it('should handle missing params', () => {
      expect.assertions(1);
      saveAvsRules = RiskAPI.saveAvsRules();
      return expect(saveAvsRules).rejects.toMatch(
        'Risk.saveAvsRules() is missing {accountId,businessId,avsRules,password} param(s)'
      );
    });
  });

  describe('getVelocityRules()', () => {
    let getVelocityRules;
    const accountId = '10002';
    const businessId = '10003';

    beforeEach(function() {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: '200',
          response: {},
        });
      });
      getVelocityRules = RiskAPI.getVelocityRules(accountId, businessId);
    });

    it('should use get request method', () => {
      return getVelocityRules.then(({ request }) => {
        expect(request.config.method).toBe('get');
      });
    });

    it('should call the path /accounts/10002/businesses/10003/risk/velocity', () => {
      const expected = '/accounts/10002/businesses/10003/risk/velocity';
      return getVelocityRules.then(({ request }) => {
        const path = getApiPath(request.url);
        expect(path).toBe(expected);
      });
    });

    it('should include X-AuthToken in headers', () => {
      return getVelocityRules.then(({ request }) => {
        expect(request.headers['X-AuthToken']).toBeDefined();
        expect(request.headers['X-AuthToken']).toBe(token);
      });
    });

    it('should handle missing params', () => {
      expect.assertions(1);
      getVelocityRules = RiskAPI.getVelocityRules();
      return expect(getVelocityRules).rejects.toMatch(
        'Risk.getVelocityRules() is missing {accountId,businessId} param(s)'
      );
    });
  });

  describe('getVelocityActions()', () => {
    let getVelocityActions;
    const accountId = '10002';
    const businessId = '10003';

    beforeEach(function() {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: '200',
          response: {},
        });
      });
      getVelocityActions = RiskAPI.getVelocityActions(accountId, businessId);
    });

    it('should use get request method', () => {
      return getVelocityActions.then(({ request }) => {
        expect(request.config.method).toBe('get');
      });
    });

    it('should call the path /accounts/10002/businesses/10003/risk/velocity/actions', () => {
      const expected = '/accounts/10002/businesses/10003/risk/velocity/actions';
      return getVelocityActions.then(({ request }) => {
        const path = getApiPath(request.url);
        expect(path).toBe(expected);
      });
    });

    it('should include X-AuthToken in headers', () => {
      return getVelocityActions.then(({ request }) => {
        expect(request.headers['X-AuthToken']).toBeDefined();
        expect(request.headers['X-AuthToken']).toBe(token);
      });
    });

    it('should handle missing params', () => {
      expect.assertions(1);
      getVelocityActions = RiskAPI.getVelocityActions();
      return expect(getVelocityActions).rejects.toMatch(
        'Risk.getVelocityActions() is missing {accountId,businessId} param(s)'
      );
    });
  });

  describe('saveVelocityRules()', () => {
    let saveVelocityRules;
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

    beforeEach(function() {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: '200',
          response: {},
        });
      });
      saveVelocityRules = RiskAPI.saveVelocityRules(
        accountId,
        businessId,
        velocityRules,
        password
      );
    });

    it('should use put request method', () => {
      return saveVelocityRules.then(({ request }) => {
        expect(request.config.method).toBe('put');
      });
    });

    it('should have the request payload: velocityRules', () => {
      const requestData = JSON.stringify(velocityRules);
      return saveVelocityRules.then(({ request }) => {
        expect(request.config.data).toBe(requestData);
      });
    });

    it('should call the path /accounts/10002/businesses/10003/risk/velocity', () => {
      const expected = '/accounts/10002/businesses/10003/risk/velocity';
      return saveVelocityRules.then(({ request }) => {
        const path = getApiPath(request.url);
        expect(path).toBe(expected);
      });
    });

    it('should include X-AuthToken in headers', () => {
      return saveVelocityRules.then(({ request }) => {
        expect(request.headers['X-AuthToken']).toBeDefined();
        expect(request.headers['X-AuthToken']).toBe(token);
      });
    });

    it('should handle missing params', () => {
      expect.assertions(1);
      saveVelocityRules = RiskAPI.saveVelocityRules();
      return expect(saveVelocityRules).rejects.toMatch(
        'Risk.saveVelocityRules() is missing {accountId,businessId,velocityRules,password} param(s)'
      );
    });
  });

  describe('getMismatchRules()', () => {
    let getMismatchRules;
    const accountId = '10002';
    const businessId = '10003';

    beforeEach(function() {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: '200',
          response: {},
        });
      });
      getMismatchRules = RiskAPI.getMismatchRules(accountId, businessId);
    });

    it('should use get request method', () => {
      return getMismatchRules.then(({ request }) => {
        expect(request.config.method).toBe('get');
      });
    });

    it('should call the path /accounts/10002/businesses/10003/risk/mismatch', () => {
      const expected = '/accounts/10002/businesses/10003/risk/mismatch';
      return getMismatchRules.then(({ request }) => {
        const path = getApiPath(request.url);
        expect(path).toBe(expected);
      });
    });

    it('should include X-AuthToken in headers', () => {
      return getMismatchRules.then(({ request }) => {
        expect(request.headers['X-AuthToken']).toBeDefined();
        expect(request.headers['X-AuthToken']).toBe(token);
      });
    });

    it('should handle missing params', () => {
      expect.assertions(1);
      getMismatchRules = RiskAPI.getMismatchRules();
      return expect(getMismatchRules).rejects.toMatch(
        'Risk.getMismatchRules() is missing {accountId,businessId} param(s)'
      );
    });
  });

  describe('getMismatchActions()', () => {
    let getMismatchActions;
    const accountId = '10002';
    const businessId = '10003';

    beforeEach(function() {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: '200',
          response: {},
        });
      });
      getMismatchActions = RiskAPI.getMismatchActions(accountId, businessId);
    });

    it('should use get request method', () => {
      return getMismatchActions.then(({ request }) => {
        expect(request.config.method).toBe('get');
      });
    });

    it('should call the path /accounts/10002/businesses/10003/risk/mismatch/actions', () => {
      const expected = '/accounts/10002/businesses/10003/risk/mismatch/actions';
      return getMismatchActions.then(({ request }) => {
        const path = getApiPath(request.url);
        expect(path).toBe(expected);
      });
    });

    it('should include X-AuthToken in headers', () => {
      return getMismatchActions.then(({ request }) => {
        expect(request.headers['X-AuthToken']).toBeDefined();
        expect(request.headers['X-AuthToken']).toBe(token);
      });
    });

    it('should handle missing params', () => {
      expect.assertions(1);
      getMismatchActions = RiskAPI.getMismatchActions();
      return expect(getMismatchActions).rejects.toMatch(
        'Risk.getMismatchActions() is missing {accountId,businessId} param(s)'
      );
    });
  });

  describe('saveMismatchRules()', () => {
    let saveMismatchRules;
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

    beforeEach(function() {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: '200',
          response: {},
        });
      });
      saveMismatchRules = RiskAPI.saveMismatchRules(
        accountId,
        businessId,
        mismatchRules,
        password
      );
    });

    it('should use put request method', () => {
      return saveMismatchRules.then(({ request }) => {
        expect(request.config.method).toBe('put');
      });
    });

    it('should have the request payload: mismatchRules', () => {
      const requestData = JSON.stringify(mismatchRules);
      return saveMismatchRules.then(({ request }) => {
        expect(request.config.data).toBe(requestData);
      });
    });

    it('should call the path /accounts/10002/businesses/10003/risk/mismatch', () => {
      const expected = '/accounts/10002/businesses/10003/risk/mismatch';
      return saveMismatchRules.then(({ request }) => {
        const path = getApiPath(request.url);
        expect(path).toBe(expected);
      });
    });

    it('should include X-AuthToken in headers', () => {
      return saveMismatchRules.then(({ request }) => {
        expect(request.headers['X-AuthToken']).toBeDefined();
        expect(request.headers['X-AuthToken']).toBe(token);
      });
    });

    it('should handle missing params', () => {
      expect.assertions(1);
      saveMismatchRules = RiskAPI.saveMismatchRules();
      return expect(saveMismatchRules).rejects.toMatch(
        'Risk.saveMismatchRules() is missing {accountId,businessId,mismatchRules,password} param(s)'
      );
    });
  });

  describe('getThresholdRules()', () => {
    let getThresholdRules;
    const accountId = '10002';
    const businessId = '10003';

    beforeEach(function() {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: '200',
          response: {},
        });
      });
      getThresholdRules = RiskAPI.getThresholdRules(accountId, businessId);
    });

    it('should use get request method', () => {
      return getThresholdRules.then(({ request }) => {
        expect(request.config.method).toBe('get');
      });
    });

    it('should call the path /accounts/10002/businesses/10003/risk/threshold', () => {
      const expected = '/accounts/10002/businesses/10003/risk/threshold';
      return getThresholdRules.then(({ request }) => {
        const path = getApiPath(request.url);
        expect(path).toBe(expected);
      });
    });

    it('should include X-AuthToken in headers', () => {
      return getThresholdRules.then(({ request }) => {
        expect(request.headers['X-AuthToken']).toBeDefined();
        expect(request.headers['X-AuthToken']).toBe(token);
      });
    });

    it('should handle missing params', () => {
      expect.assertions(1);
      getThresholdRules = RiskAPI.getThresholdRules();
      return expect(getThresholdRules).rejects.toMatch(
        'Risk.getThresholdRules() is missing {accountId,businessId} param(s)'
      );
    });
  });

  describe('saveThresholdRules()', () => {
    let saveThresholdRules;
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

    beforeEach(function() {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: '200',
          response: {},
        });
      });
      saveThresholdRules = RiskAPI.saveThresholdRules(
        accountId,
        businessId,
        thresholdRules,
        password
      );
    });

    it('should use put request method', () => {
      return saveThresholdRules.then(({ request }) => {
        expect(request.config.method).toBe('put');
      });
    });

    it('should have the request payload: thresholdRules', () => {
      const requestData = JSON.stringify(thresholdRules);
      return saveThresholdRules.then(({ request }) => {
        expect(request.config.data).toBe(requestData);
      });
    });

    it('should call the path /accounts/10002/businesses/10003/risk/threshold', () => {
      const expected = '/accounts/10002/businesses/10003/risk/threshold';
      return saveThresholdRules.then(({ request }) => {
        const path = getApiPath(request.url);
        expect(path).toBe(expected);
      });
    });

    it('should include X-AuthToken in headers', () => {
      return saveThresholdRules.then(({ request }) => {
        expect(request.headers['X-AuthToken']).toBeDefined();
        expect(request.headers['X-AuthToken']).toBe(token);
      });
    });

    it('should handle missing params', () => {
      expect.assertions(1);
      saveThresholdRules = RiskAPI.saveThresholdRules();
      return expect(saveThresholdRules).rejects.toMatch(
        'Risk.saveThresholdRules() is missing {accountId,businessId,thresholdRules,password} param(s)'
      );
    });
  });

  describe('getThresholdActions()', () => {
    let getThresholdActions;
    const accountId = '10002';
    const businessId = '10003';

    beforeEach(function() {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: '200',
          response: {},
        });
      });
      getThresholdActions = RiskAPI.getThresholdActions(accountId, businessId);
    });

    it('should use get request method', () => {
      return getThresholdActions.then(({ request }) => {
        expect(request.config.method).toBe('get');
      });
    });

    it('should call the path /accounts/10002/businesses/10003/risk/threshold/actions', () => {
      const expected =
        '/accounts/10002/businesses/10003/risk/threshold/actions';
      return getThresholdActions.then(({ request }) => {
        const path = getApiPath(request.url);
        expect(path).toBe(expected);
      });
    });

    it('should include X-AuthToken in headers', () => {
      return getThresholdActions.then(({ request }) => {
        expect(request.headers['X-AuthToken']).toBeDefined();
        expect(request.headers['X-AuthToken']).toBe(token);
      });
    });

    it('should handle missing params', () => {
      expect.assertions(1);
      getThresholdActions = RiskAPI.getThresholdActions();
      return expect(getThresholdActions).rejects.toMatch(
        'Risk.getThresholdActions() is missing {accountId,businessId} param(s)'
      );
    });
  });

  describe('getVerifiedInfoRules()', () => {
    let getVerifiedInfoRules;
    const accountId = '10002';
    const businessId = '10003';

    beforeEach(function() {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: '200',
          response: {},
        });
      });
      getVerifiedInfoRules = RiskAPI.getVerifiedInfoRules(
        accountId,
        businessId
      );
    });

    it('should use get request method', () => {
      return getVerifiedInfoRules.then(({ request }) => {
        expect(request.config.method).toBe('get');
      });
    });

    it('should call the path /accounts/10002/businesses/10003/risk/verified-info', () => {
      const expected = '/accounts/10002/businesses/10003/risk/verified-info';
      return getVerifiedInfoRules.then(({ request }) => {
        const path = getApiPath(request.url);
        expect(path).toBe(expected);
      });
    });

    it('should include X-AuthToken in headers', () => {
      return getVerifiedInfoRules.then(({ request }) => {
        expect(request.headers['X-AuthToken']).toBeDefined();
        expect(request.headers['X-AuthToken']).toBe(token);
      });
    });

    it('should handle missing params', () => {
      expect.assertions(1);
      getVerifiedInfoRules = RiskAPI.getVerifiedInfoRules();
      return expect(getVerifiedInfoRules).rejects.toMatch(
        'Risk.getVerifiedInfoRules() is missing {accountId,businessId} param(s)'
      );
    });
  });

  describe('getVerifiedInfoActions()', () => {
    let getVerifiedInfoActions;
    const accountId = '10002';
    const businessId = '10003';

    beforeEach(function() {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: '200',
          response: {},
        });
      });
      getVerifiedInfoActions = RiskAPI.getVerifiedInfoActions(
        accountId,
        businessId
      );
    });

    it('should use get request method', () => {
      return getVerifiedInfoActions.then(({ request }) => {
        expect(request.config.method).toBe('get');
      });
    });

    it('should call the path /accounts/10002/businesses/10003/risk/verified-info/actions', () => {
      const expected =
        '/accounts/10002/businesses/10003/risk/verified-info/actions';
      return getVerifiedInfoActions.then(({ request }) => {
        const path = getApiPath(request.url);
        expect(path).toBe(expected);
      });
    });

    it('should include X-AuthToken in headers', () => {
      return getVerifiedInfoActions.then(({ request }) => {
        expect(request.headers['X-AuthToken']).toBeDefined();
        expect(request.headers['X-AuthToken']).toBe(token);
      });
    });

    it('should handle missing params', () => {
      expect.assertions(1);
      getVerifiedInfoActions = RiskAPI.getVerifiedInfoActions();
      return expect(getVerifiedInfoActions).rejects.toMatch(
        'Risk.getVerifiedInfoActions() is missing {accountId,businessId} param(s)'
      );
    });
  });

  describe('saveVerifiedInfoRules()', () => {
    let saveVerifiedInfoRules;
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

    beforeEach(function() {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: '200',
          response: {},
        });
      });
      saveVerifiedInfoRules = RiskAPI.saveVerifiedInfoRules(
        accountId,
        businessId,
        verifiedInfoRules,
        password
      );
    });

    it('should use put request method', () => {
      return saveVerifiedInfoRules.then(({ request }) => {
        expect(request.config.method).toBe('put');
      });
    });

    it('should have the request payload: verifiedInfoRules', () => {
      const requestData = JSON.stringify(verifiedInfoRules);
      return saveVerifiedInfoRules.then(({ request }) => {
        expect(request.config.data).toBe(requestData);
      });
    });

    it('should call the path /accounts/10002/businesses/10003/risk/verified-info', () => {
      const expected = '/accounts/10002/businesses/10003/risk/verified-info';
      return saveVerifiedInfoRules.then(({ request }) => {
        const path = getApiPath(request.url);
        expect(path).toBe(expected);
      });
    });

    it('should include X-AuthToken in headers', () => {
      return saveVerifiedInfoRules.then(({ request }) => {
        expect(request.headers['X-AuthToken']).toBeDefined();
        expect(request.headers['X-AuthToken']).toBe(token);
      });
    });

    it('should handle missing params', () => {
      expect.assertions(1);
      saveVerifiedInfoRules = RiskAPI.saveVerifiedInfoRules();
      return expect(saveVerifiedInfoRules).rejects.toMatch(
        'Risk.saveVerifiedInfoRules() is missing {accountId,businessId,verifiedInfoRules,password} param(s)'
      );
    });
  });

  describe('getHighRiskCountries()', () => {
    let getHighRiskCountries;
    const accountId = '10002';
    const businessId = '10003';

    beforeEach(function() {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: '200',
          response: {},
        });
      });
      getHighRiskCountries = RiskAPI.getHighRiskCountries(
        accountId,
        businessId
      );
    });

    it('should use get request method', () => {
      return getHighRiskCountries.then(({ request }) => {
        expect(request.config.method).toBe('get');
      });
    });

    it('should call the path /accounts/10002/businesses/10003/risk/high-risk-country', () => {
      const expected =
        '/accounts/10002/businesses/10003/risk/high-risk-country';
      return getHighRiskCountries.then(({ request }) => {
        const path = getApiPath(request.url);
        expect(path).toBe(expected);
      });
    });

    it('should include X-AuthToken in headers', () => {
      return getHighRiskCountries.then(({ request }) => {
        expect(request.headers['X-AuthToken']).toBeDefined();
        expect(request.headers['X-AuthToken']).toBe(token);
      });
    });

    it('should handle missing params', () => {
      expect.assertions(1);
      getHighRiskCountries = RiskAPI.getHighRiskCountries();
      return expect(getHighRiskCountries).rejects.toMatch(
        'Risk.getHighRiskCountries() is missing {accountId,businessId} param(s)'
      );
    });
  });

  describe('saveHighRiskCountries()', () => {
    let saveHighRiskCountries;
    const accountId = '10002';
    const businessId = '10003';
    const data = { countries: [1, 2, 3] };
    const password = 'BlaBlaBla111!';

    beforeEach(function() {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: '200',
          response: {},
        });
      });
      saveHighRiskCountries = RiskAPI.saveHighRiskCountries(
        accountId,
        businessId,
        data,
        password
      );
    });

    it('should use put request method', () => {
      return saveHighRiskCountries.then(({ request }) => {
        expect(request.config.method).toBe('put');
      });
    });

    it('should call the path /accounts/10002/businesses/10003/risk/high-risk-country', () => {
      const expected =
        '/accounts/10002/businesses/10003/risk/high-risk-country';
      return saveHighRiskCountries.then(({ request }) => {
        const path = getApiPath(request.url);
        expect(path).toBe(expected);
      });
    });

    it('should include X-AuthToken in headers', () => {
      return saveHighRiskCountries.then(({ request }) => {
        expect(request.headers['X-AuthToken']).toBeDefined();
        expect(request.headers['X-AuthToken']).toBe(token);
      });
    });

    it('should handle missing params', () => {
      expect.assertions(1);
      saveHighRiskCountries = RiskAPI.saveHighRiskCountries();
      return expect(saveHighRiskCountries).rejects.toMatch(
        'Risk.saveHighRiskCountries() is missing {accountId,businessId,countries,password} param(s)'
      );
    });
  });
});
