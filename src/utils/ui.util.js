// @flow
import pickBy from 'lodash/pickBy';
import identity from 'lodash/identity';
import mapValues from 'lodash/mapValues';
import isString from 'lodash/isString';
import { ACTIONS_ENUMS } from 'config';
import { BASE } from 'styles/common.sc';
import { auth } from 'services/security/authorisation';
import { currencyService } from 'services/currency/currencyService';

// Retuns the app assets folder path
export const assetsPath = `/assets`;

// Converts PX to em
export function toEm(value: number, baseValue: number = BASE) {
  return `${value / baseValue}em`;
}

// Converts PX to rem
export const toRem = (value: number) => `${value / 16}rem`;

/**
 * Side Menu Links
 */
export function getMenuArray() {
  return [
    {
      label: 'Dashboard',
      link: '/dashboard',
      icon: 'sidebar-dashboard',
      id: 'dashboard-link',
      isAuthorised: auth.canView('dashboard'),
    },
    {
      label: 'Transactions',
      link: '/transactions',
      icon: 'sidebar-transactions',
      id: 'transactions-link',
      isAuthorised: auth.canView('transactions'),
    },
    {
      label: 'Customers',
      link: '/customers',
      icon: 'sidebar-customers',
      id: 'customers-link',
      isAuthorised: auth.canView('customers'),
    },
    // {
    //   label: 'Payment plans',
    //   link: '/payment-plans',
    //   icon: 'sidebar-plans',
    //   id: 'payment-link',
    // },
    {
      label: 'Statements',
      link: '/statements',
      icon: 'sidebar-statements',
      id: 'statements-link',
      isAuthorised: auth.canView('Deposits::Viewing'),
    },
    // {
    //   label: 'Blacklist cards',
    //   link: '/risk/blacklist',
    //   icon: 'sidebar-blacklisted',
    //   id: 'blacklist-link',
    // },
    {
      label: 'Reports',
      link: '/reports',
      icon: 'sidebar-reports',
      id: 'reports-link',
      isAuthorised: auth.canView('reports'),
    },
    {
      isAuthorised: true,
      sideInfo: true,
    },
    {
      label: 'Settings',
      link: '/settings',
      icon: 'sidebar-settings',
      id: 'settings-link',
      isAuthorised: true,
    },
    {
      isAuthorised: true,
      logout: true,
      label: 'Log out',
      icon: 'sidebar-logout',
      id: 'logout-link',
    },
  ];
}

/**
 * Remove empty props in the object
 * @returns {object}
 */
export const removeEmptyObjects = (objData: Object) => {
  return pickBy(objData, identity);
};

/**
 * Common form fields error message
 * @returns {object}
 */
export const formErrorMsg = {
  creditCard: 'Please enter a valid card details',
  email: 'Please enter a valid email',
  cardholder: 'Please enter cardholder name',
  amount: 'Please enter valid amount',
  cardExpDate: 'Please enter valid date',
  cvv: 'Please enter valid CVV',
  channel: 'Please select a channel',
  currency: 'Please select a currency',
  paymentPlan: 'Please select payment plan',
  address: 'Please enter the address',
  city: 'Please enter the city',
  postcode: 'Please enter the postcode',
  country: 'Please select country',
};

export const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
  },
};

export const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 24 },
    sm: { span: 14, offset: 6 },
  },
};

export const ColWithOutLabel = {
  xs: { span: 24, offset: 24 },
  sm: { span: 14, offset: 6 },
};

export const parseAllowedActions = (allowedActionsBitwiseFlag: number) => {
  return mapValues(ACTIONS_ENUMS, function(actionEnumValue) {
    return !!(actionEnumValue & allowedActionsBitwiseFlag);
  });
};

export const isActionAllowed = (
  allowedAction: number,
  action: Object,
  canEdit: boolean
): boolean => {
  if (canEdit) {
    return parseAllowedActions(allowedAction)[action.name.toUpperCase()];
  } else if (action.id === 4) {
    return parseAllowedActions(allowedAction)[action.name.toUpperCase()];
  }
  return false;
};

const normaliseStatus = status => {
  if (isString(status)) {
    return status.toLowerCase().replace(/\s/g, '');
  }
  return '';
};

/**
 * CSS selector for the transactions status
 * @param {string} status
 * @param {boolean} isFlag
 * @returns {string}
 */
export const getTransactionStatusClass = (status: string, isFlag?: boolean) => {
  status = normaliseStatus(status);
  let _class = '';

  if (/(pending|flag)/i.test(status)) {
    _class = isFlag ? 'warning' : 'yellow';
  } else if (/fail/i.test(status)) {
    _class = isFlag ? 'error' : 'red'; //'burnt';
  } else if (/success/i.test(status)) {
    _class = isFlag ? 'success' : 'green';
  } else {
    _class = 'default';
  }
  return _class;
};

export function getFormattedPhoneNumber(phone: Object): string {
  if (!phone.countryCode) return '';
  return `+${phone.countryCode} ${phone.number}`;
}

export const FILTER_ACTIONS = {
  CONTAINS: 'CONTAINS',
  EQUALS: 'EQUALS',
  BEGINS: 'BEGINS',
  ENDS: 'ENDS',
  GT: 'GT',
  GTE: 'GTE',
  LT: 'LT',
  LTE: 'LTE',
  SHOW: 'INCLUDE',
  HIDE: 'EXCLUDE',
};

/**
 * Number shortener. eg. 23500 = 23.5k
 * @param {number} num value
 * @param {number} digits number of decimal places
 * @returns {string}
 */
export function numberShortner(num: number, digits: number): string {
  let numShort;
  const si = [
    // { value: 1E18, symbol: "E" },
    // { value: 1E15, symbol: "P" },
    // { value: 1E12, symbol: "T" },
    // { value: 1E9, symbol: "B" },
    { value: 1e6, symbol: 'M' },
    { value: 1e3, symbol: 'k' },
    { value: 1, symbol: '' },
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  // if(num >= 1E9){
  // 	numShort = si[0];
  // } else {
  // 	numShort = si[1];
  // }
  numShort = si[1];
  let formattedValue = `${(num / numShort.value)
    .toFixed(digits)
    .replace(rx, '$1')}${numShort.symbol}`;

  return formattedValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export const getDevice = {
  width: window.innerWidth,
  height: window.innerHeight,
};

export function getBrowserType(): Object {
  // Firefox 1.0+
  const isFirefox = typeof InstallTrigger !== 'undefined';

  // Safari 3.0+ "[object HTMLElementConstructor]"
  const isSafari =
    /constructor/i.test(window.HTMLElement) ||
    (function(p) {
      return p.toString() === '[object SafariRemoteNotification]';
    })(
      !window['safari'] ||
        (typeof window['safari'] !== 'undefined' &&
          window['safari'].pushNotification)
    );

  // Edge 20+
  const isEdge = !window['ie'] && !!window.StyleMedia;

  // Chrome 1+
  const isChrome = !!window.chrome && !!window.chrome.webstore;

  return {
    isFirefox,
    isSafari,
    isEdge,
    isChrome,
  };
}

export function formatNumber(
  value: number,
  currencyName?: string,
  shorten?: boolean = false,
  useCommas?: boolean = true,
  dropDecimals?: boolean = false
): string {
  if (!currencyName && !value) return '0';
  if (shorten && value >= 1e6) return numberShortner(value, 0);

  if (useCommas && !currencyName) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  return currencyService
    .wrap(currencyName)
    .format(value, useCommas, dropDecimals);
}

export function formatToCents(currencyId: number, value: number): number {
  const currency = currencyService.wrap(currencyId);
  if (currency === null) return 0;
  return currency.convertToCents(value);
}

export function elemInView(
  el: ?HTMLElement,
  rect: ?(ClientRect | DOMRect),
  offset: number = 0
): boolean {
  // if we don't have the ref, then it can't be in view
  // we will have the rect if we have the el, but flow doesn't know that
  if (!el || !rect) {
    return false;
  }

  // the element is completely before the section in view
  if (rect.top - offset + rect.height < 0) {
    return false;
  }

  // the element is completely after the section in view
  if (rect.top + offset > window.innerHeight) {
    return false;
  }

  // if the element is not completely before or after the sectionInView
  // then it must be inView
  return true;
}

export const blankValue = 'Unknown';
