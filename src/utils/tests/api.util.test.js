import { validateParams } from '../api.util';

describe('API Utils', () => {
  it('should return no missing params', () => {
    const dataParam = { channelId: 1, autoCapTime: 'y' };
    const requiredParams = ['channelId', 'autoCapTime'];
    const errorList = validateParams(dataParam, requiredParams);
    expect(errorList).toHaveLength(0);
  });

  it('should return two missing params', () => {
    const dataParam = { channelId: 1 };
    const requiredParams = ['channelId', 'autoCapTime', 'email'];
    const errorList = validateParams(dataParam, requiredParams);
    expect(errorList).toEqual('autoCapTime,email');
  });

  it('should return missing object param', () => {
    const dataParam = {
      channelId: 1,
      autoCapTime: 'y',
    };
    const requiredParams = [
      'channelId',
      'autoCapTime',
      { card: ['number', 'name', 'cvv2', 'expiryMonth', 'expiryYear'] },
    ];
    const errorList = validateParams(dataParam, requiredParams);
    expect(errorList).toEqual('card');
  });

  it('should return object missing params', () => {
    const dataParam = {
      channelId: 1,
      autoCapTime: 'y',
      card: { number: 1 },
      other: {},
    };
    const requiredParams = [
      'channelId',
      'autoCapTime',
      { card: ['number', 'name', 'cvv2', 'expiryMonth', 'expiryYear'] },
      { other: ['other1'] },
    ];
    const expectedList = [
      'name',
      'cvv2',
      'expiryMonth',
      'expiryYear',
      'other1',
    ];
    const errorList = validateParams(dataParam, requiredParams);
    expect(errorList).toEqual('name,cvv2,expiryMonth,expiryYear,other1');
  });
});
