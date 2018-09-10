// @flow
import {
  ACCOUNT_DETAILS,
  BANK_ACCOUNTS,
  ACCOUNT_SETTINGS,
  PROCESSING_CURRENCIES,
  APPLE_PAY,
  PROCESSING_SETTINGS,
  PAYMENT_METHODS,
  SERVICE_SETTINGS,
  DISPLAY_CURRENCY,
  COUNTRY_CITIES,
  COUNTRY_TIMEZONES,
  FREQUENCIES,
  API_KEYS,
} from 'store/constants';
import { buildReducer } from 'utils/reducer.util';

const DEFAULT_STATE = {
  accountDetails: {
    loading: false,
    error: false,
    success: false,
  },
  bankAccounts: {
    list: {
      loading: false,
      error: false,
      success: false,
    },
    update: {
      loading: false,
      error: false,
      success: false,
    },
  },
  accountSettings: {
    loading: false,
    error: false,
    success: false,
  },
  processingCurrencies: {
    loading: false,
    error: false,
    success: false,
  },
  applePay: {
    signingRequest: {
      loading: false,
      error: false,
    },
    certificates: {
      loading: false,
      error: false,
    },
  },
  processingSettings: {
    loading: false,
    error: false,
  },
  paymentMethods: {
    loading: false,
    error: false,
  },
  serviceSettings: {
    loading: false,
    error: false,
  },
  displayCurrency: {
    update: {
      loading: false,
      error: false,
      success: false,
    },
  },
  timezones: {
    loading: false,
    error: false,
    data: [],
  },
  cities: {
    loading: false,
    error: false,
    data: [],
  },
  frequencies: {
    loading: false,
    error: false,
    success: false,
    data: [],
  },
  bankDetails: {
    loading: false,
    error: false,
    success: false,
    data: [],
  },
  bankFields: {
    loading: false,
    error: false,
    success: false,
    data: [],
  },
  apiKeys: {
    loading: false,
    error: false,
    success: false,
    data: [],
  },
};

const handlers = {
  /**
   * Account Details - Pending
   */
  [ACCOUNT_DETAILS.PENDING]: (state: Object, action: Object) => ({
    ...state,
    accountDetails: {
      ...DEFAULT_STATE.accountDetails,
      loading: true,
    },
  }),
  /**
   * Account Details - Success
   */
  [ACCOUNT_DETAILS.SUCCESS]: (state: Object, action: Object) => ({
    ...state,
    accountDetails: {
      ...DEFAULT_STATE.accountDetails,
      success: true,
      ...action.payload.data,
    },
  }),
  /**
   * Account Details - Error
   */
  [ACCOUNT_DETAILS.ERROR]: (state: Object, action: Object) => ({
    ...state,
    accountDetails: {
      ...state.accountDetails,
      error: true,
    },
  }),
  /**
   * Bank Acounts List - Pending
   */
  [BANK_ACCOUNTS.LIST.PENDING]: (state: Object, action: Object) => ({
    ...state,
    bankAccounts: {
      ...state.bankAccounts,
      list: {
        ...DEFAULT_STATE.bankAccounts.list,
        loading: true,
      },
    },
  }),
  /**
   * Bank Acounts List - Success
   */
  [BANK_ACCOUNTS.LIST.SUCCESS]: (state: Object, action: Object) => ({
    ...state,
    bankAccounts: {
      ...state.bankAccounts,
      list: {
        ...state.bankAccounts.list,
        success: true,
        data: action.payload.data,
      },
    },
  }),
  /**
   * Bank Acounts List - Error
   */
  [BANK_ACCOUNTS.LIST.ERROR]: (state: Object, action: Object) => ({
    ...state,
    bankAccounts: {
      ...state.bankAccounts,
      list: {
        ...state.bankAccounts.list,
        error: true,
      },
    },
  }),
  /**
   * Bank Acounts Update - Pending
   */
  [BANK_ACCOUNTS.UPDATE.PENDING]: (state: Object, action: Object) => ({
    ...state,
    bankAccounts: {
      ...state.bankAccounts,
      update: {
        ...DEFAULT_STATE.bankAccounts.update,
        loading: true,
      },
    },
  }),
  /**
   * Bank Acounts Update - Success
   */
  [BANK_ACCOUNTS.UPDATE.SUCCESS]: (state: Object, action: Object) => ({
    ...state,
    bankAccounts: {
      ...state.bankAccounts,
      update: {
        ...DEFAULT_STATE.bankAccounts.update,
        success: true,
      },
    },
  }),
  /**
   * Bank Acounts Update - Error
   */
  [BANK_ACCOUNTS.UPDATE.ERROR]: (state: Object, action: Object) => ({
    ...state,
    bankAccounts: {
      ...state.bankAccounts,
      update: {
        ...DEFAULT_STATE.bankAccounts.update,
        error: true,
      },
    },
  }),
  /**
   * Acount Settings - Pending
   */
  [ACCOUNT_SETTINGS.PENDING]: (state: Object, action: Object) => ({
    ...state,
    accountSettings: {
      ...DEFAULT_STATE.accountSettings,
      loading: true,
    },
  }),
  /**
   * Acount Settings - Success
   */
  [ACCOUNT_SETTINGS.SUCCESS]: (state: Object, action: Object) => ({
    ...state,
    accountSettings: {
      ...DEFAULT_STATE.accountSettings,
      ...action.payload.data,
      success: true,
    },
  }),
  /**
   * Acount Settings - Error
   */
  [ACCOUNT_SETTINGS.ERROR]: (state: Object, action: Object) => ({
    ...state,
    accountSettings: {
      ...state.accountSettings,
      error: true,
    },
  }),
  /**
   * Processing Currencies - Pending
   */
  [PROCESSING_CURRENCIES.PENDING]: (state: Object, action: Object) => ({
    ...state,
    processingCurrencies: {
      ...DEFAULT_STATE.processingCurrencies,
      loading: true,
    },
  }),
  /**
   * Processing Currencies - Success
   */
  [PROCESSING_CURRENCIES.SUCCESS]: (state: Object, action: Object) => ({
    ...state,
    processingCurrencies: {
      ...DEFAULT_STATE.processingCurrencies,
      success: true,
      list: [...action.payload.data],
    },
  }),
  /**
   * Processing Currencies - Error
   */
  [PROCESSING_CURRENCIES.ERROR]: (state: Object, action: Object) => ({
    ...state,
    processingCurrencies: {
      ...DEFAULT_STATE.processingCurrencies,
      error: true,
    },
  }),
  /**
   * Apple Pay Signing - Pending
   */
  [APPLE_PAY.SIGNING_REQUEST.PENDING]: (state: Object, action: Object) => ({
    ...state,
    applePay: {
      ...state.applePay,
      signingRequest: {
        loading: true,
        error: false,
      },
    },
  }),
  /**
   * Apple Pay Signing - Success
   */
  [APPLE_PAY.SIGNING_REQUEST.SUCCESS]: (state: Object, action: Object) => ({
    ...state,
    applePay: {
      ...state.applePay,
      signingRequest: {
        loading: false,
        error: false,
        ...action.payload.data,
      },
    },
  }),
  /**
   * Apple Pay Signing - Error
   */
  [APPLE_PAY.SIGNING_REQUEST.ERROR]: (state: Object, action: Object) => ({
    ...state,
    applePay: {
      ...state.applePay,
      signingRequest: {
        loading: false,
        error: true,
      },
    },
  }),
  /**
   * Apple Pay Cert - Pending
   */
  [APPLE_PAY.CERTIFICATES.PENDING]: (state: Object, action: Object) => ({
    ...state,
    applePay: {
      ...state.applePay,
      certificates: {
        loading: true,
        error: false,
      },
    },
  }),
  /**
   * Apple Pay Cert - Success
   */
  [APPLE_PAY.CERTIFICATES.SUCCESS]: (state: Object, action: Object) => ({
    ...state,
    applePay: {
      ...state.applePay,
      certificates: {
        loading: false,
        error: false,
        list: action.payload.data,
      },
    },
  }),
  /**
   * Apple Pay Cert - Error
   */
  [APPLE_PAY.CERTIFICATES.ERROR]: (state: Object, action: Object) => ({
    ...state,
    applePay: {
      ...state.applePay,
      certificates: {
        loading: false,
        error: true,
      },
    },
  }),
  /**
   * Processing settings - Pending
   */
  [PROCESSING_SETTINGS.PENDING]: (state: Object, action: Object) => ({
    ...state,
    processingSettings: {
      loading: true,
      error: false,
    },
  }),
  /**
   * Processing settings - Success
   */
  [PROCESSING_SETTINGS.SUCCESS]: (state: Object, action: Object) => ({
    ...state,
    processingSettings: {
      loading: false,
      error: false,
      ...action.payload.data,
    },
  }),
  /**
   * Processing settings - Error
   */
  [PROCESSING_SETTINGS.ERROR]: (state: Object, action: Object) => ({
    ...state,
    processingSettings: {
      loading: false,
      error: true,
    },
  }),
  /**
   * Payment methods - Pending
   */
  [PAYMENT_METHODS.PENDING]: (state: Object, action: Object) => ({
    ...state,
    paymentMethods: {
      loading: true,
      error: false,
    },
  }),
  /**
   * Payment methods - Success
   */
  [PAYMENT_METHODS.SUCCESS]: (state: Object, action: Object) => ({
    ...state,
    paymentMethods: {
      loading: false,
      error: false,
      ...action.payload.data,
    },
  }),
  /**
   * Payment methods - Error
   */
  [PAYMENT_METHODS.ERROR]: (state: Object, action: Object) => ({
    ...state,
    paymentMethods: {
      loading: false,
      error: true,
    },
  }),
  /**
   * Service settings - Pending
   */
  [SERVICE_SETTINGS.PENDING]: (state: Object, action: Object) => ({
    ...state,
    serviceSettings: {
      loading: true,
      error: false,
    },
  }),
  /**
   * Service settings - Success
   */
  [SERVICE_SETTINGS.SUCCESS]: (state: Object, action: Object) => ({
    ...state,
    serviceSettings: {
      loading: false,
      error: false,
      ...action.payload.data,
    },
  }),
  /**
   * Service settings - Error
   */
  [SERVICE_SETTINGS.ERROR]: (state: Object, action: Object) => ({
    ...state,
    serviceSettings: {
      loading: false,
      error: true,
    },
  }),
  /**
   * Display currency update - Pending
   */
  [DISPLAY_CURRENCY.UPDATE.PENDING]: (state: Object, action: Object) => ({
    ...state,
    displayCurrency: {
      ...state.displayCurrency,
      update: {
        loading: true,
        error: false,
        success: false,
      },
    },
  }),
  /**
   * Display currency update - Success
   */
  [DISPLAY_CURRENCY.UPDATE.SUCCESS]: (state: Object, action: Object) => ({
    ...state,
    displayCurrency: {
      ...state.displayCurrency,
      update: {
        loading: false,
        error: false,
        success: true,
      },
    },
  }),
  /**
   * Display currency update - Error
   */
  [DISPLAY_CURRENCY.UPDATE.ERROR]: (state: Object, action: Object) => ({
    ...state,
    displayCurrency: {
      ...state.displayCurrency,
      update: {
        loading: false,
        error: true,
        success: false,
      },
    },
  }),
  /**
   * Country Cities - Pending
   */
  [COUNTRY_CITIES.PENDING]: (state: Object, action: Object) => ({
    ...state,
    cities: {
      loading: true,
      error: false,
      data: [],
    },
  }),
  /**
   * Country Cities - Success
   */
  [COUNTRY_CITIES.SUCCESS]: (state: Object, action: Object) => ({
    ...state,
    cities: {
      loading: false,
      error: false,
      data: action.payload.data,
    },
  }),
  /**
   * Country Cities - Error
   */
  [COUNTRY_CITIES.ERROR]: (state: Object, action: Object) => ({
    ...state,
    cities: {
      loading: false,
      error: true,
      data: [],
    },
  }),
  /**
   * Country Timezone - Pending
   */
  [COUNTRY_TIMEZONES.PENDING]: (state: Object, action: Object) => ({
    ...state,
    timezones: {
      loading: true,
      error: false,
      data: [],
    },
  }),
  /**
   * Country Timezone - Success
   */
  [COUNTRY_TIMEZONES.SUCCESS]: (state: Object, action: Object) => ({
    ...state,
    timezones: {
      loading: false,
      error: false,
      data: action.payload.data,
    },
  }),
  /**
   * Country Timezone - Error
   */
  [COUNTRY_TIMEZONES.ERROR]: (state: Object, action: Object) => ({
    ...state,
    timezones: {
      loading: false,
      error: true,
      data: [],
    },
  }),
  /**
   * Frequencies- Pending
   */
  [FREQUENCIES.PENDING]: (state: Object, action: Object) => ({
    ...state,
    frequencies: {
      ...DEFAULT_STATE.frequencies,
      loading: true,
    },
  }),
  /**
   * Frequencies- Success
   */
  [FREQUENCIES.SUCCESS]: (state: Object, action: Object) => ({
    ...state,
    frequencies: {
      ...DEFAULT_STATE.frequencies,
      data: [...action.payload.data],
      success: true,
    },
  }),
  /**
   * Bank account details - Pending
   */
  [BANK_ACCOUNTS.DETAILS.PENDING]: (state: Object, action: Object) => ({
    ...state,
    bankDetails: {
      ...DEFAULT_STATE.bankDetails,
      loading: true,
    },
  }),
  /**
   * Bank account details - Success
   */
  [BANK_ACCOUNTS.DETAILS.SUCCESS]: (state: Object, action: Object) => ({
    ...state,
    bankDetails: {
      ...state.bankDetails,
      data: [...action.payload.data],
      success: true,
    },
  }),
  /**
   * Bank account details - Error
   */
  [BANK_ACCOUNTS.DETAILS.ERROR]: (state: Object, action: Object) => ({
    ...state,
    bankDetails: {
      ...state.bankDetails,
      errorMsg: { ...action.payload },
      error: true,
    },
  }),
  /**
   * Bank account Fields - Pending
   */
  [BANK_ACCOUNTS.FIELDS.PENDING]: (state: Object, action: Object) => ({
    ...state,
    bankFields: {
      ...DEFAULT_STATE.bankFields,
      loading: true,
    },
  }),
  /**
   * Bank account Fields - Success
   */
  [BANK_ACCOUNTS.FIELDS.SUCCESS]: (state: Object, action: Object) => ({
    ...state,
    bankFields: {
      ...state.bankFields,
      data: [...action.payload.data],
      success: true,
    },
  }),
  /**
   * Bank account Fields - Error
   */
  [BANK_ACCOUNTS.FIELDS.ERROR]: (state: Object, action: Object) => ({
    ...state,
    bankFields: {
      ...state.bankFields,
      errorMsg: { ...action.payload },
      error: true,
    },
  }),
  /**
   * API Keys - Pending
   */
  [API_KEYS.PENDING]: (state: Object, action: Object) => ({
    ...state,
    apiKeys: {
      ...DEFAULT_STATE.apiKeys,
      loading: true,
    },
  }),
  /**
   * API Keys - Success
   */
  [API_KEYS.SUCCESS]: (state: Object, action: Object) => ({
    ...state,
    apiKeys: {
      ...state.apiKeys,
      data: [...action.payload.data],
      success: true,
    },
  }),
  /**
   * API Keys - Error
   */
  [API_KEYS.ERROR]: (state: Object, action: Object) => ({
    ...state,
    apiKeys: {
      ...state.apiKeys,
      errorMsg: { ...action.payload },
      error: true,
    },
  }),
};

export default buildReducer(handlers, DEFAULT_STATE);
