// @flow
import { ACCOUNT_TYPE } from 'config';
import { buildReducer } from 'utils/reducer.util';
import { LOGIN_TYPE, LOOKUPS_TYPE, PROFILE_UPDATE } from 'store/constants';
import { setToken, setCurrencyId } from 'services/appRequest';
import * as currencyService from 'services/currency/currencyService';
import { initAuthorisation } from 'services/security/authorisation';
import * as typed from './flow-type';

type State = {
  data: typed.LoginData,
  lookups: typed.LoginLookUps,
};

const DEFAULT_STATE: State = {
  data: {
    loading: false,
    success: false,
    error: false,
    accountId: 0,
    accountTypeId: 0,
    accountTypeName: '',
    displayCurrencyId: 0,
    displayCurrencyName: '',
    displayCurrencySymbol: '',
    email: '',
    isActive: false,
    lastLoginDate: '',
    name: '',
    permissions: [],
    phone: {
      countryCode: '',
      number: '',
    },
    timezone: '',
    token: '',
    userId: 0,
    isReadOnly: false,
    isMerchantAdmin: false,
    isSuperAdmin: false,
    isGodUser: false,
    twoFactorEnabled: false,
  },
  lookups: {
    loading: false,
    success: false,
    error: false,
    countries: [],
    currencies: [],
    paymentMethods: [],
  },
};

const handlers = {
  /**
   * Login Load Cache Data
   */
  [LOGIN_TYPE.CACHED_DATA]: (state: Object, action: Object) => {
    const cachedData = { ...action.payload.data };
    setupCurrency(cachedData.lookups, cachedData.data.displayCurrencyId);
    initAuthorisation(cachedData.data);
    return cachedData;
  },
  /**
   * Login type - Pending
   */
  [LOGIN_TYPE.PENDING]: (state: Object, action: Object) => ({
    ...DEFAULT_STATE,
    data: {
      ...state.data,
      loading: true,
    },
  }),

  /**
   * Login type - Success
   */
  [LOGIN_TYPE.SUCCESS]: (state: Object, action: Object) => {
    // Set the token for API use
    const { data } = action.payload;

    // Temp 2F
    data.twoFactorEnabled = false;
    data.twoFactorPassed = false;

    // Map the Accountyppe Id to props flags
    data.isReadOnly = data.accountTypeId === ACCOUNT_TYPE.MERCHANT_USER;
    data.isMerchantAdmin = data.accountTypeId === ACCOUNT_TYPE.MERCHANT_ADMIN;
    data.isSuperAdmin = data.accountTypeId === ACCOUNT_TYPE.SUPER_ADMIN;
    data.isGodUser = data.accountTypeId === ACCOUNT_TYPE.GOD;

    // Store the token and currencyId to be used when making Ajax request
    setToken(data.token);
    setCurrencyId(data.displayCurrencyId);

    // Initalise the User Authorisation Permissions
    initAuthorisation(data);

    return {
      ...state,
      data: {
        ...DEFAULT_STATE.data,
        ...data,
        success: true,
      },
    };
  },

  /**
   * Login type - Error
   */
  [LOGIN_TYPE.ERROR]: (state, action) => ({
    ...state,
    data: {
      ...DEFAULT_STATE.data,
      error: true,
      errorData: { ...action.payload.data },
    },
  }),

  /**
   * Login 2FA - Success
   */
  [LOGIN_TYPE.TWO_FACTOR]: (state, action) => {
    const data = { ...state.data };
    data.twoFactorPassed = action.payload.data.success;
    data.success = true;

    return {
      ...state,
      data,
    };
  },

  /**
   * Look Ups - Success
   */
  [LOOKUPS_TYPE.SUCCESS]: (state: Object, action: Object) => {
    const payloadData = action.payload.data;
    const userData = state.data;
    const currency = setupCurrency(payloadData, userData.displayCurrencyId);
    return {
      ...state,
      lookups: {
        ...payloadData,
      },
      data: {
        ...userData,
        displayCurrencyName: currency ? currency.name : '',
        displayCurrencySymbol: currency ? currency.symbol : '',
      },
    };
  },

  /**
   * Profile Update - Pending
   */
  [PROFILE_UPDATE.PENDING]: (state: Object, action: Object) => {
    return {
      ...state,
      data: {
        ...state.data,
        loading: true,
        success: false,
      },
    };
  },

  /**
   * Profile Update - Error
   */
  [PROFILE_UPDATE.ERROR]: (state: Object, action: Object) => ({
    ...state,
    data: {
      ...state.data,
      loading: false,
      success: false,
      error: true,
      errorData: { ...action.payload.data },
    },
  }),

  /**
   * Profile Update - Success
   */
  [PROFILE_UPDATE.SUCCESS]: (state: Object, action: Object) => {
    const newData = { ...state.data };
    const { data } = action.payload;

    newData.name = data.name;
    newData.email = data.email;
    newData.timeZone = data.timeZone;

    return {
      ...state,
      data: {
        ...newData,
        loading: false,
        success: true,
      },
    };
  },

  [LOGIN_TYPE.CLEAR]: (state: Object, action: Object) => ({
    ...DEFAULT_STATE,
  }),
};

export default buildReducer(handlers, DEFAULT_STATE);

/**
 * Helper
 */
function setupCurrency(lookups, displayCurrencyId) {
  const data = currencyService.setCurrency(
    lookups.currencies,
    displayCurrencyId
  );
  //Set payment method in currency services
  if (data !== null) {
    currencyService.setPaymentMethod(lookups.paymentMethods);
  }
  return data;
}
