import { storeBusinesses, getBusinessById } from '../businessService';

describe('businessService', () => {
  let mockData;
  beforeEach(() => {
    mockData = {
      '100001': [
        {
          propertyId: 100002,
          propertyName: 'test p1',
        },
        {
          propertyId: 100003,
          propertyName: 'test p2',
        },
      ],
      '100004': [
        {
          propertyId: 100005,
          propertyName: 'test p3',
        },
        {
          propertyId: 100006,
          propertyName: 'test p4',
        },
      ],
    };

    storeBusinesses(mockData);
  });

  it('should cache the accounts and find business by ID', () => {
    const expectedData = {
      propertyId: 100005,
      propertyName: 'test p3',
    };
    expect(getBusinessById(100004, 100005)).toEqual(expectedData);
  });

  it('should return empty object if Not accountId passed', () => {
    const expectedData = {};
    expect(getBusinessById(null, 100005)).toEqual(expectedData);
  });

  it('should return empty object if Not propertyId passed', () => {
    const expectedData = {};
    expect(getBusinessById(100005)).toEqual(expectedData);
  });

  it('should return empty object if business does not exist', () => {
    const expectedData = {};
    expect(getBusinessById(100008, 1000)).toEqual(expectedData);
  });
});
