import * as localApi from '../localDataApi';

describe('LocalDataAPI', () => {
  afterEach(() => {
    localApi.clearData();
  });

  it('it should store dateRange', () => {
    const data = { fromDate: '2017-02-01', fromTo: '2017-02-05' };
    localApi.dateRange.save(data);
    expect(localApi.dateRange.get()).toEqual(data);
  });

  it('it should store user data', () => {
    const data = {
      data: {
        token: '23456789dfghjk',
        email: 'test@test.com',
      },
    };
    localApi.user.save(data);
    expect(localApi.user.get()).toEqual(data);
  });

  it('it should store accounts data', () => {
    const data = {
      accounts: [1, 2, 3, 4],
      businesses: {
        '1101': {
          name: 'business name',
        },
      },
    };
    localApi.accounts.save(data);
    expect(localApi.accounts.get()).toEqual(data);
  });

  it('it should Not be authenticated', () => {
    expect(localApi.isAuthenticated()).toEqual(false);
  });

  it('it should be authenticated', () => {
    const data = {
      data: {
        token: '23456789dfghjk',
        email: 'test@test.com',
      },
    };
    localApi.user.save(data);
    expect(localApi.isAuthenticated()).toEqual(true);
  });
});
