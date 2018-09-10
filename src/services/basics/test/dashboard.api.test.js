import * as DashboadAPI from '../dashboard.api';
import { setCurrencyId } from 'services/appRequest';

describe('DashboadAPI', () => {
  beforeEach(function() {
    setCurrencyId(106);
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  // getIndicators
  describe('getIndicators()', () => {
    let getIndicators;
    let mockData = {
      entityTypeId: 2,
      entityId: 10003,
      fromDate: '2012-04-03',
      toDate: '2012-04-03',
    };

    beforeEach(function() {
      // Mock Request
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: '200',
          response: {},
        });
      });
      getIndicators = DashboadAPI.getIndicators(mockData);
    });

    it('should use get request method', () => {
      return getIndicators.then(({ request }) => {
        expect(request.config.method).toEqual('get');
      });
    });

    it('should call the path /dashboard/indicators', () => {
      return getIndicators.then(({ request }) => {
        const path = getApiPath(request.url);
        expect(path).toEqual(
          '/dashboard/indicators?currencyId=106&entityId=10003&entityTypeId=2&fromDate=2012-04-03&toDate=2012-04-03'
        );
      });
    });

    it('should handle missing params', () => {
      mockData.entityId = undefined;
      getIndicators = DashboadAPI.getIndicators(mockData);
      return expect(getIndicators).rejects.toMatch(
        'Dashboard.getIndicators() is missing {entityId} param(s)'
      );
    });
  });

  // getSummary
  describe('getSummary()', () => {
    let getSummary;
    let mockData = {
      entityTypeId: 2,
      entityId: 10003,
      fromDate: '2012-04-03',
      toDate: '2012-04-03',
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
      getSummary = DashboadAPI.getSummary(mockData);
    });

    it('should use get request method', () => {
      return getSummary.then(({ request }) => {
        expect(request.config.method).toEqual('get');
      });
    });

    it('should call the path /dashboard/indicators/summary', () => {
      return getSummary.then(({ request }) => {
        const path = getApiPath(request.url);
        expect(path).toEqual(
          '/dashboard/indicators/summary?currencyId=106&entityId=10003&entityTypeId=2&fromDate=2012-04-03&toDate=2012-04-03'
        );
      });
    });

    it('should handle missing params', () => {
      mockData.entityId = undefined;
      getSummary = DashboadAPI.getSummary(mockData);
      return expect(getSummary).rejects.toMatch(
        'Dashboard.getSummary() is missing {entityId} param(s)'
      );
    });
  });
});
