import * as StatementsAPI from '../statements.api';
import { setToken, setCurrencyId } from 'services/appRequest';

describe('StatementsAPI', () => {
  const token = '1234567890';

  beforeEach(() => {
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

  describe('getAll()', () => {
    let getAll;
    const mockData = {
      accountId: 100069,
      businessId: 100105,
      pageSize: 10,
      sortColumn: 'settlementDate',
      sortOrder: 'desc',
      startIndex: 0,
    };

    beforeEach(function() {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: '200',
          response: {},
        });
      });

      getAll = StatementsAPI.getAll(mockData);
    });

    it('should use get method', () => {
      return getAll.then(({ request }) => {
        expect(request.config.method).toBe('get');
      });
    });

    it('should call the path /accounts/100069/business/100105/statement', () => {
      return getAll.then(({ request }) => {
        const path = getApiPath(request.url.split('?')[0]);
        expect(path).toBe('/accounts/100069/business/100105/statement');
      });
    });

    it('should call the path /accounts/100069/statement', () => {
      mockData.businessId = null;
      getAll = StatementsAPI.getAll(mockData);
      return getAll.then(({ request }) => {
        const path = getApiPath(request.url.split('?')[0]);
        expect(path).toBe('/accounts/100069/statement');
      });
    });

    it('should include X-AuthToken in headers', () => {
      return getAll.then(({ request }) => {
        expect(request.headers['X-AuthToken']).toBeDefined();
        expect(request.headers['X-AuthToken']).toBe(token);
      });
    });

    it('should handle missing param(s)', () => {
      getAll = StatementsAPI.getAll({});
      return expect(getAll).rejects.toMatch(
        'Statements.getAll() is missing {accountId,businessId,pageSize,sortColumn,sortOrder,startIndex} param(s)'
      );
    });
  });

  describe('getBusinessStatements()', () => {
    let getBusinessStatements;
    const accountId = 100069;
    const statementId = 22;

    beforeEach(function() {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: '200',
          response: {},
        });
      });

      getBusinessStatements = StatementsAPI.getBusinessStatements(
        accountId,
        statementId
      );
    });

    it('should use get method', () => {
      return getBusinessStatements.then(({ request }) => {
        expect(request.config.method).toBe('get');
      });
    });

    it('should call the path /accounts/100069/statement/22/business', () => {
      return getBusinessStatements.then(({ request }) => {
        const path = getApiPath(request.url.split('?')[0]);
        expect(path).toBe('/accounts/100069/statement/22/business');
      });
    });

    it('should include X-AuthToken in headers', () => {
      return getBusinessStatements.then(({ request }) => {
        expect(request.headers['X-AuthToken']).toBeDefined();
        expect(request.headers['X-AuthToken']).toBe(token);
      });
    });

    it('should handle missing param(s)', () => {
      getBusinessStatements = StatementsAPI.getBusinessStatements();
      return expect(getBusinessStatements).rejects.toMatch(
        'Statements.getBusinessStatements() is missing {accountId,statementId} param(s)'
      );
    });
  });
});
