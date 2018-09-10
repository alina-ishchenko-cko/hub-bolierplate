// @flow
import numeral from 'numeral';
import mapValues from 'lodash/mapValues';
import isEmpty from 'lodash/isEmpty';
import isPlainObject from 'lodash/isPlainObject';
import sortBy from 'lodash/sortBy';
import isArray from 'lodash/isArray';
import isString from 'lodash/isString';
import isObject from 'lodash/isObject';
import isNumber from 'lodash/isNumber';
import find from 'lodash/find';
import extend from 'lodash/extend';

let currenciesMap: Array<Object> = [];
let paymentMethodsMap: Array<Object> = [];
let currentUserCurrencyId: number = 0;

// type alias
type ServiceAlias = {
  wrap: Function,
  sortAndGroupCurrencies: Function,
};

type CurrencyParam = {
  coefficient: number,
  currencyId: number,
  isCommon: boolean,
  isSettlement: boolean,
  name: string,
  symbol: string,
};

// Set Default Currency Format e.g 1,000.00
// numeral.defaultFormat('');

/**
 * Wraps, Sort and group the currencies
 */
export const currencyService: ServiceAlias = {
  /**
   * Create the currency object containing the name, currencyCode, Id etc..
   * @param {any} currency
   * @returns {Currency}
   */
  wrap(currency: any) {
    if (currency === undefined || currency === null) {
      currency = currentUserCurrencyId;
    }

    if (currency instanceof Currency) {
      return currency;
    }

    let currencyObject = isObject(currency) ? currency : null;

    if (currencyObject && currencyObject.currencyId && !currencyObject.name) {
      currency = currencyObject.currencyId;
      currencyObject = null;
    }

    let currencyId = parseInt(currency, 10);
    if (!currencyObject && isNumber(currencyId)) {
      currencyObject = isNumber(currencyId)
        ? find(currenciesMap, c => {
            return c.currencyId === currencyId;
          })
        : null;
    }

    if (!currencyObject && isString(currency)) {
      // check for matching names
      currencyObject =
        find(currenciesMap, c => {
          return c.name.toLowerCase() === currency.toLowerCase();
        }) || null;

      // check for matching symbols
      if (!currencyObject) {
        currencyObject =
          find(currenciesMap, c => {
            return c.symbol.toLowerCase() === currency.toLowerCase();
          }) || null;
      }
    }

    if (!currencyObject) {
      return null;
    }

    return new Currency(currencyObject);
  },

  /**
   * Sorts and Group the currencies
   * @param {array} currencyIds
   * @returns
   */
  sortAndGroupCurrencies(currencyIds: Array<any>): Array<any> {
    if (!isArray(currencyIds) || isEmpty(currencyIds)) {
      return [];
    }

    const currencies = currencyIds.map(this.wrap);

    return sortBy(currencies, currency => {
      let group = currency.isCommon ? '1' : '2';
      return group + currency.name; // e.g. 1GBP, 1USD, 2BBD
    });
  },
};

/**
 * Currency Constructor
 * @param {object} currency
 */
function Currency(currency: CurrencyParam) {
  extend(this, currency);
}

Currency.prototype.getFormatter = function(
  useCommas: boolean,
  dropDecimals: boolean
) {
  let formatter = useCommas === true ? '0,0' : '0';

  if (!dropDecimals) {
    formatter += '.';
    for (let i = 0; i < this.coefficient; i++) {
      formatter += '0';
    }
  }
  return formatter;
};

Currency.prototype.format = function(
  amount: number,
  useCommas: boolean,
  dropDecimals: boolean
) {
  useCommas = useCommas === true;
  dropDecimals = dropDecimals === true;

  return numeral(amount).format(this.getFormatter(useCommas, dropDecimals));
};

Currency.prototype.convertFromCents = function(amount) {
  if (isPlainObject(amount)) {
    let currency = this;

    return mapValues(amount, function(a) {
      return currency.convertFromCents(a);
    });
  }

  if (isNaN(amount)) {
    throw new TypeError('Number input required');
  }

  let coefficient = Math.pow(10, this.coefficient);
  return Number(amount) / coefficient;
};

Currency.prototype.convertToCents = function(amount) {
  if (isPlainObject(amount)) {
    let currency = this;

    return mapValues(amount, function(a) {
      return currency.convertToCents(a);
    });
  }

  if (isNaN(amount)) {
    throw new TypeError('Number input required');
  }

  var coefficient = Math.pow(10, this.coefficient) || 100;
  return Math.round(Number(amount) * coefficient);
};

/*
 * - Sets the current user currency object
 * - Set the global currenciesMap 
 * - currentUserCurrencyId
 */
export function setCurrency(
  currencyArray: Array<any> = [],
  currencyId: number = 0
): any {
  currenciesMap = [...currencyArray];
  currentUserCurrencyId = currencyId;

  if (currencyArray.length === 0 || !currencyId) {
    return null;
  }

  const currencyObject = currencyArray.filter(data => {
    return data.currencyId === currencyId;
  });
  return currencyObject.length === 1 ? currencyObject[0] : null;
}

/**
 * Get currency by currency ID
 * @param {number} currencyId
 * @returns {object}
 */
export function getCurrencyById(currencyId: number): any {
  if (!currencyId) {
    throw new Error('currencyId params required');
  }

  const currency = find(currenciesMap, function(c) {
    return c.currencyId === currencyId;
  });
  return currency || {};
}

/**
 * Get currency by currency name
 * @param {string} currencyName
 * @returns {object}
 */
export function getCurrencyByName(currencyName: string): any {
  if (!currencyName) {
    throw new Error('currencyName params required');
  }

  const currency = find(currenciesMap, function(c) {
    return c.name === currencyName.toUpperCase();
  });
  return currency || {};
}

/**
 * Cache the payment methods
 * @param {array} paymentMethods
 */
export function setPaymentMethod(paymentMethods: Array<Object>): void {
  if (!isArray(paymentMethods) || !paymentMethods) {
    throw new Error('paymentMethods param must be array');
  }
  paymentMethodsMap = paymentMethods;
}

/**
 * Cache the payment methods
 * @param {number} id
 * @returns {object}
 */
export function getPaymentMethodById(id: string | number) {
  return find(paymentMethodsMap, x => {
    return x.paymentMethodId === parseInt(id, 10);
  });
}
