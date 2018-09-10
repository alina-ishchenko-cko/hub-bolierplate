import * as services from '../subscriptionService';
import { setCurrency } from 'services/currency/currencyService';

describe('subscriptionService', () => {
  it('should contain the right frequencies', () => {
    const expectedData = [
      { name: 'Daily', noun: 'Day', code: '1d', unit: 'd' },
      { name: 'Weekly', noun: 'Week', code: '1w', unit: 'w' },
      { name: 'Monthly', noun: 'Month', code: '1m', unit: 'm' },
      { name: 'Every 3 Months', noun: 'Month', code: '3m', unit: 'm' },
      { name: 'Every 6 Months', noun: 'Month', code: '6m', unit: 'm' },
      { name: 'Yearly', noun: 'Year', code: '1y', unit: 'y' },
      { name: 'Custom', noun: undefined, code: undefined, unit: undefined },
    ];
    expect(services.frequencies).toEqual(expectedData);
  });

  it('should return the correct frequency string', () => {
    expect(services.getFrequencyString('2d')).toEqual('Every 2 Days');
    expect(services.getFrequencyString('1d')).toEqual('Every Day');
    expect(services.getFrequencyString('1w')).toEqual('Every Week');
    expect(services.getFrequencyString('3m')).toEqual('Every 3 Months');
  });

  it('should return the correct frequency string', () => {
    const mockCurrencies = [
      {
        currencyId: 1,
        name: 'AED',
      },
      {
        currencyId: 2,
        name: 'GBP',
      },
      {
        currencyId: 3,
        name: 'USD',
      },
    ];
    const currency = setCurrency(mockCurrencies);
    const toCents = services.convertCentsWorth(true, {
      planId: 'rp_0949088E145W76BD3C12',
      name: 'payment plan cardtok 160217',
      value: 2315,
      currency: 'USD',
      cycle: '1d',
    });
    const expectedData = {
      currency: 'USD',
      cycle: '1d',
      name: 'payment plan cardtok 160217',
      planId: 'rp_0949088E145W76BD3C12',
      value: 231500,
    };
    expect(toCents).toEqual(expectedData);
  });
});
