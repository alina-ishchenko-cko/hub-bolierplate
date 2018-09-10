// @flow
import { setUrl, setToken } from '../services/appRequest';
import { isAuthenticated, getToken } from '../services/localDataApi';
import responseCodes from './responseCodes.json';

export const ACTIONS_OVERVIEW = [
  {
    id: 1,
    name: 'Capture',
    supportBatch: true,
  },
  {
    id: 2,
    name: 'Void',
    supportBatch: true,
  },
  {
    id: 3,
    name: 'Refund',
    supportBatch: true,
  },
  {
    id: 4,
    name: 'Blacklist',
    requiresReadPermissionOnly: true,
  },
];

export const ERROR_CODES = {
  TOKEN_EXPIRED: 83023,
  PASSWORD_DONT_MATCH: 83026,
  PASSWORD_RESET_REQUIRED: 83015,
  PASSWORD_EXPIRED: 83008,
  INVALID_LOGIN: 83011,
  PASSWORD_ALREADY_USED: 83017,
  EMAIL_NOT_REGISTERED: 83043,
};

export const RESPONSE_CODES = responseCodes;

export const ERROR_CODE_TITLE = {
  '83023': 'Token Expired',
  '83026': 'Password Error',
  '83015': 'Password Reset Required',
  '83008': 'Password Expired',
  '83011': 'Invalid Login',
  '83017': 'Password Already Used',
  '83043': 'Invaild Email Address',
  '83016': 'Too Many Login Attempts',
  '82001': 'Internal Error',
};

export const PASSWORD = {
  UPPER_CASE: /(?=(?:.*[A-Z]){1,})/,
  LOWER_CASE: /(?=(?:.*[a-z]){1,})/,
  SPECIAL_CHARACTERS: /(?=(?:.*[`~!<>€£@#$%^&*()_\-|'+=]){1,})/,
  LENGTH: /^.{8,15}$/,
  NUMBER: /(?=(?:.*[0-9]){1,})/,
};

// sandbox.checkout.com
// qa.ckotech.co
export const setupAPI = () => {
  const endpoint =
    window.location.origin.indexOf('localhost') >= 0
      ? 'https://qa.ckotech.co'
      : window.location.origin;
  setUrl(endpoint);
  setApiToken();
};

export const setApiToken = () => {
  if (isAuthenticated()) {
    const token = getToken();
    setToken(token);
  }
};

export const getAppVersion = () => {
  return `v${window.__ckoHub__.version}`;
};

export const ENTITY_TYPE: {
  GATEWAY: number,
  ACCOUNT: number,
  PROPERTY: number,
  BUSINESS: number,
  CHANNEL: number,
} = {
  GATEWAY: 1,
  ACCOUNT: 2,
  PROPERTY: 3,
  BUSINESS: 3,
  CHANNEL: 4,
};

export const ACTIONS_ENUMS = {
  CAPTURE: 1,
  VOID: 2,
  BLACKLIST: 4,
  REFUND: 8,
};

export const ACCOUNT_TYPE: {
  GOD: number,
  SUPER_ADMIN: number,
  MERCHANT_ADMIN: number,
  MERCHANT_USER: number,
} = {
  GOD: 1,
  SUPER_ADMIN: 2,
  MERCHANT_ADMIN: 3,
  MERCHANT_USER: 4,
};

export const OPERATION = {
  CREATE: 1,
  READ: 2,
  UPDATE: 4,
  DELETE: 8,
};

export const SMALL_VIEW = 1700;
