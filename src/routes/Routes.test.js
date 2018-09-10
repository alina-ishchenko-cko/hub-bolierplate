import * as React from 'react';
import Routes from './';
import PublicRoutes from './public-routes/';
import * as localApi from 'services/localDataApi';

describe('Routes', () => {
  let AppComp;

  describe('Public Users', () => {
    beforeEach(() => {
      AppComp = shallow(<Routes />);
    });

    it('should contain PublicRoutes', () => {
      expect(AppComp.find(PublicRoutes)).toHaveLength(1);
    });
  });

  describe('Auth Users', () => {
    beforeEach(() => {
      localApi.user.save({ data: { email: 'user@example.com' } });
      AppComp = shallow(<Routes />);
    });

    afterEach(() => {
      localApi.clearData();
    });
  });
});
