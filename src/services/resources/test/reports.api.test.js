import * as ReportsAPI from '../reports.api';
import { setCurrencyId, setToken } from 'services/appRequest';

describe('ReportsAPI', () => {
  const token = '1234567890';

  beforeEach(function() {
    setToken(token);
    setCurrencyId(106);
    moxios.install();
  });

  afterEach(() => {
    setToken(null);
    setCurrencyId(null);
  });

  describe('getAllReports()', () => {
    let getAllReports;

    beforeEach(function() {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: '200',
          response: {},
        });
      });
      getAllReports = ReportsAPI.getAllReports();
    });

    it('should use get request method', () => {
      return getAllReports.then(({ request }) => {
        expect(request.config.method).toBe('get');
      });
    });

    it('should call the path /query/reports', () => {
      const expected = '/query/reports';
      return getAllReports.then(({ request }) => {
        const path = getApiPath(request.url);
        expect(path).toBe(expected);
      });
    });

    it('should include X-AuthToken in headers', () => {
      return getAllReports.then(({ request }) => {
        expect(request.headers['X-AuthToken']).toBeDefined();
        expect(request.headers['X-AuthToken']).toBe(token);
      });
    });
  });

  describe('generateReports()', () => {
    let generateReports;
    let mockData = {
      entityTypeId: 2,
      entityId: 1000,
      fromDate: '2012-04-03',
      toDate: '2012-04-03',
      reports: ['RPCB'],
    };

    beforeEach(function() {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: '200',
          response: {},
        });
      });
      generateReports = ReportsAPI.generateReports(mockData);
    });

    it('should use post request method', () => {
      return generateReports.then(({ request }) => {
        expect(request.config.method).toBe('post');
      });
    });

    it('should call the path /query/reports', () => {
      const expected = '/query/reports';
      return generateReports.then(({ request }) => {
        const path = getApiPath(request.url);
        expect(path).toBe(expected);
      });
    });

    it('should include X-AuthToken in headers', () => {
      return generateReports.then(({ request }) => {
        expect(request.headers['X-AuthToken']).toBeDefined();
        expect(request.headers['X-AuthToken']).toBe(token);
      });
    });

    it('should handle missing params', () => {
      expect.assertions(1);
      const expected =
        'Reports.generateReports() is missing {entityTypeId,entityId,fromDate,toDate,reports} param(s)';
      return ReportsAPI.generateReports().catch(errorMsg => {
        expect(errorMsg).toBe(expected);
      });
    });
  });
});
