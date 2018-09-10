import * as cs from '../currencyService';

describe('currencyService', () => {
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

  describe('currencyService', () => {
    it('should return null', () => {
      const currencyObj = cs.currencyService.wrap();
      expect(currencyObj).toEqual(null);
    });

    it('should return 20,000', () => {
      const currency = cs.setCurrency(mockCurrencies, 1);
      const currencyObj = cs.currencyService.wrap();
      const formatNum = currencyObj.format(20000, true);
      expect(formatNum).toEqual('20,000');
    });
  });

  describe('setCurrency', () => {
    it('should return null for no params', () => {
      const currency = cs.setCurrency();
      expect(currency).toEqual(null);
    });

    it('should return null for empty array', () => {
      const currency = cs.setCurrency([]);
      expect(currency).toEqual(null);
    });

    it('should return null if no match', () => {
      const currency = cs.setCurrency(mockCurrencies, 5);
      expect(currency).toEqual(null);
    });

    it('should return GBP currency object', () => {
      const currency = cs.setCurrency(mockCurrencies, 2);
      expect(currency.name).toEqual('GBP');
    });
  });

  describe('getCurrencyById', () => {
    it('should return AED currency object', () => {
      const expectedData = {
        currencyId: 1,
        name: 'AED',
      };
      expect(cs.getCurrencyById(1)).toEqual(expectedData);
    });

    it('should return empty object if currency do not exist', () => {
      const expectedData = {};
      expect(cs.getCurrencyById(10)).toEqual(expectedData);
    });

    it('should throw error if currencyId params not provided', () => {
      expect(() => {
        cs.getCurrencyById();
      }).toThrow('currencyId params required');
    });
  });

  describe('getCurrencyByName', () => {
    it('should return AED currency object', () => {
      const expectedData = {
        currencyId: 1,
        name: 'AED',
      };
      expect(cs.getCurrencyByName('AED')).toEqual(expectedData);
    });

    it('should return AED currency object if passed in lowercase', () => {
      const expectedData = {
        currencyId: 1,
        name: 'AED',
      };
      expect(cs.getCurrencyByName('aed')).toEqual(expectedData);
    });

    it('should return empty object if currency do not exist', () => {
      const expectedData = {};
      expect(cs.getCurrencyByName('Tee')).toEqual(expectedData);
    });

    it('should throw error if currencyName params not provided', () => {
      expect(() => {
        cs.getCurrencyByName();
      }).toThrow('currencyName params required');
    });
  });

  describe('setPaymentMethod', () => {
    const mockpaymentMethods = [
      {
        paymentMethodId: 1233,
        paymentMethodName: 'p1',
      },
      {
        paymentMethodId: 1235,
        paymentMethodName: 'p2',
      },
    ];

    it('should set payment method', () => {
      const expectedData = {
        paymentMethodId: 1235,
        paymentMethodName: 'p2',
      };
      cs.setPaymentMethod(mockpaymentMethods);
      expect(cs.getPaymentMethodById(1235)).toEqual(expectedData);
    });

    it('should throw error if currencyId params not provided', () => {
      expect(() => {
        cs.setPaymentMethod(122);
      }).toThrow('paymentMethods param must be array');
    });
  });

  describe('getPaymentMethodById', () => {
    const mockpaymentMethods = [
      {
        paymentMethodId: 1233,
        paymentMethodName: 'p1',
      },
      {
        paymentMethodId: 1235,
        paymentMethodName: 'p2',
      },
    ];

    it('should get payment method by Id', () => {
      const expectedData = {
        paymentMethodId: 1235,
        paymentMethodName: 'p2',
      };
      expect(cs.getPaymentMethodById(1235)).toEqual(expectedData);
    });

    it('should return undefined', () => {
      const expectedData = {};
      expect(cs.getPaymentMethodById(12355)).toBeUndefined();
    });
  });
});
