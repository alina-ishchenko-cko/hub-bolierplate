import settingsReducer from '../settingsReducer';
import {
  ACCOUNT_DETAILS,
  BANK_ACCOUNTS,
  ACCOUNT_SETTINGS,
  PROCESSING_CURRENCIES,
  APPLE_PAY,
  PROCESSING_SETTINGS,
  PAYMENT_METHODS,
  SERVICE_SETTINGS,
  COUNTRY_CITIES,
  COUNTRY_TIMEZONES,
  FREQUENCIES,
  API_KEYS,
} from 'store/constants';

describe('settingsReducer', () => {
  let prevState = {};
  const initState = {
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

  afterAll(() => {
    prevState = null;
  });

  it('should return the initial state', () => {
    expect(settingsReducer()).toEqual(initState);
    prevState = { ...initState };
  });

  it('should handle ACCOUNT_DETAILS.PENDING', () => {
    const expectedState = {
      ...prevState,
      accountDetails: {
        ...initState.accountDetails,
        loading: true,
      },
    };

    const action = {
      type: ACCOUNT_DETAILS.PENDING,
    };

    const received = settingsReducer(prevState, action);
    expect(received).toEqual(expectedState);
    prevState = { ...expectedState };
  });

  it('should handle ACCOUNT_DETAILS.SUCCESS', () => {
    const data = {
      account: {
        accountId: 100101,
        companyName: '3raqny9rhwsx2s67833di',
        companyIndustryId: 1,
        supportPhone: { countryCode: '44', number: '771199011' },
      },
      user: {
        userId: 188,
        accountId: 100101,
      },
    };

    const expectedState = {
      ...prevState,
      accountDetails: {
        ...initState.accountDetails,
        success: true,
        ...data,
      },
    };

    const action = {
      type: ACCOUNT_DETAILS.SUCCESS,
      payload: { data },
    };

    const received = settingsReducer(prevState, action);
    expect(received).toEqual(expectedState);
    prevState = { ...expectedState };
  });

  it('should handle ACCOUNT_DETAILS.ERROR', () => {
    const expectedState = {
      ...prevState,
      accountDetails: {
        ...prevState.accountDetails,
        error: true,
      },
    };
    const action = {
      type: ACCOUNT_DETAILS.ERROR,
    };
    const received = settingsReducer(prevState, action);
    expect(received).toEqual(expectedState);
    prevState = { ...expectedState };
  });

  it('should handle BANK_ACCOUNTS.LIST.PENDING', () => {
    const expectedState = {
      ...prevState,
      bankAccounts: {
        ...prevState.bankAccounts,
        list: {
          ...initState.bankAccounts.list,
          loading: true,
        },
      },
    };
    const action = {
      type: BANK_ACCOUNTS.LIST.PENDING,
    };
    const received = settingsReducer(prevState, action);
    expect(received).toEqual(expectedState);
    prevState = { ...expectedState };
  });

  it('should handle BANK_ACCOUNTS.LIST.SUCCESS', () => {
    const data = [
      {
        bankAccountId: 101,
        accountId: 100101,
        name: 'GBP - HSBC - 678',
        pricingCurrencyId: 98,
        businessName: ['5n4kg6upy1ydta5ah5mi'],
      },
    ];

    const expectedState = {
      ...prevState,
      bankAccounts: {
        ...prevState.bankAccounts,
        list: {
          ...prevState.bankAccounts.list,
          success: true,
          data,
        },
      },
    };

    const action = {
      type: BANK_ACCOUNTS.LIST.SUCCESS,
      payload: { data },
    };
    const received = settingsReducer(prevState, action);
    expect(received).toEqual(expectedState);
    prevState = { ...expectedState };
  });

  it('should handle BANK_ACCOUNTS.LIST.ERROR', () => {
    const expectedState = {
      ...prevState,
      bankAccounts: {
        ...prevState.bankAccounts,
        list: {
          ...prevState.bankAccounts.list,
          error: true,
        },
      },
    };
    const action = {
      type: BANK_ACCOUNTS.LIST.ERROR,
    };
    const received = settingsReducer(prevState, action);
    expect(received).toEqual(expectedState);
    prevState = { ...expectedState };
  });

  it('should handle BANK_ACCOUNTS.UPDATE.PENDING', () => {
    const expectedState = {
      ...prevState,
      bankAccounts: {
        ...prevState.bankAccounts,
        update: {
          ...initState.bankAccounts.update,
          loading: true,
        },
      },
    };
    const action = {
      type: BANK_ACCOUNTS.UPDATE.PENDING,
    };
    const received = settingsReducer(prevState, action);
    expect(received).toEqual(expectedState);
    prevState = { ...expectedState };
  });

  it('should handle BANK_ACCOUNTS.UPDATE.SUCCESS', () => {
    const expectedState = {
      ...prevState,
      bankAccounts: {
        ...prevState.bankAccounts,
        update: {
          ...initState.bankAccounts.update,
          success: true,
        },
      },
    };
    const action = {
      type: BANK_ACCOUNTS.UPDATE.SUCCESS,
    };
    const received = settingsReducer(prevState, action);
    expect(received).toEqual(expectedState);
    prevState = { ...expectedState };
  });

  it('should handle BANK_ACCOUNTS.UPDATE.ERROR', () => {
    const expectedState = {
      ...prevState,
      bankAccounts: {
        ...prevState.bankAccounts,
        update: {
          ...initState.bankAccounts.update,
          error: true,
        },
      },
    };
    const action = {
      type: BANK_ACCOUNTS.UPDATE.ERROR,
    };
    const received = settingsReducer(prevState, action);
    expect(received).toEqual(expectedState);
    prevState = { ...expectedState };
  });

  it('should handle ACCOUNT_SETTINGS.PENDING', () => {
    const expectedState = {
      ...prevState,
      accountSettings: {
        ...initState.accountSettings,
        loading: true,
      },
    };
    const action = {
      type: ACCOUNT_SETTINGS.PENDING,
    };
    const received = settingsReducer(prevState, action);
    expect(received).toEqual(expectedState);
    prevState = { ...expectedState };
  });

  it('should handle ACCOUNT_SETTINGS.SUCCESS', () => {
    const data = {
      currencyId: 98,
      settings: {
        administrationFeesInitial: { enabled: false, value: 0.0 },
        administrationFeesMonthly: { enabled: false, value: 0.0 },
        statementFee: { enabled: false, value: 0.0 },
      },
    };
    const expectedState = {
      ...prevState,
      accountSettings: {
        ...initState.accountSettings,
        ...data,
        success: true,
      },
    };
    const action = {
      type: ACCOUNT_SETTINGS.SUCCESS,
      payload: { data },
    };
    const received = settingsReducer(prevState, action);
    expect(received).toEqual(expectedState);
    prevState = { ...expectedState };
  });

  it('should handle ACCOUNT_SETTINGS.ERROR', () => {
    const expectedState = {
      ...prevState,
      accountSettings: {
        ...prevState.accountSettings,
        error: true,
      },
    };
    const action = {
      type: ACCOUNT_SETTINGS.ERROR,
    };
    const received = settingsReducer(prevState, action);
    expect(received).toEqual(expectedState);
    prevState = { ...expectedState };
  });

  it('should handle PROCESSING_CURRENCIES.PENDING', () => {
    const expectedState = {
      ...prevState,
      processingCurrencies: {
        ...initState.processingCurrencies,
        loading: true,
      },
    };
    const action = {
      type: PROCESSING_CURRENCIES.PENDING,
    };
    const received = settingsReducer(prevState, action);
    expect(received).toEqual(expectedState);
    prevState = { ...expectedState };
  });

  it('should handle PROCESSING_CURRENCIES.SUCCESS', () => {
    const data = [1, 2, 160];
    const expectedState = {
      ...prevState,
      processingCurrencies: {
        ...initState.processingCurrencies,
        success: true,
        list: data,
      },
    };
    const action = {
      type: PROCESSING_CURRENCIES.SUCCESS,
      payload: { data },
    };
    const received = settingsReducer(prevState, action);
    expect(received).toEqual(expectedState);
    prevState = { ...expectedState };
  });

  it('should handle PROCESSING_CURRENCIES.ERROR', () => {
    const expectedState = {
      ...prevState,
      processingCurrencies: {
        ...initState.processingCurrencies,
        error: true,
      },
    };
    const action = {
      type: PROCESSING_CURRENCIES.ERROR,
    };
    const received = settingsReducer(prevState, action);
    expect(received).toEqual(expectedState);
    prevState = { ...expectedState };
  });

  it('should handle APPLE_PAY.SIGNING_REQUEST.PENDING', () => {
    const expectedState = {
      ...prevState,
      applePay: {
        ...prevState.applePay,
        signingRequest: {
          loading: true,
          error: false,
        },
      },
    };
    const action = {
      type: APPLE_PAY.SIGNING_REQUEST.PENDING,
    };
    const received = settingsReducer(prevState, action);
    expect(received).toEqual(expectedState);
    prevState = { ...expectedState };
  });

  it('should handle APPLE_PAY.SIGNING_REQUEST.SUCCESS', () => {
    const data = { id: 1 };
    const expectedState = {
      ...prevState,
      applePay: {
        ...prevState.applePay,
        signingRequest: {
          loading: false,
          error: false,
          ...data,
        },
      },
    };
    const action = {
      type: APPLE_PAY.SIGNING_REQUEST.SUCCESS,
      payload: { data },
    };
    const received = settingsReducer(prevState, action);
    expect(received).toEqual(expectedState);
    prevState = { ...expectedState };
  });

  it('should handle APPLE_PAY.SIGNING_REQUEST.ERROR', () => {
    const prevState = {
      applePay: {
        signingRequest: {
          loading: true,
          error: false,
        },
      },
    };
    const action = {
      type: APPLE_PAY.SIGNING_REQUEST.ERROR,
    };
    const expected = {
      applePay: {
        signingRequest: {
          loading: false,
          error: true,
        },
      },
    };
    const received = settingsReducer(prevState, action);
    expect(received).toEqual(expected);
  });

  it('should handle APPLE_PAY.CERTIFICATES.PENDING', () => {
    const prevState = {
      applePay: {
        certificates: {
          loading: false,
          error: false,
        },
      },
    };
    const action = {
      type: APPLE_PAY.CERTIFICATES.PENDING,
    };
    const expected = {
      applePay: {
        certificates: {
          loading: true,
          error: false,
        },
      },
    };
    const received = settingsReducer(prevState, action);
    expect(received).toEqual(expected);
  });

  it('should handle APPLE_PAY.CERTIFICATES.SUCCESS', () => {
    const prevState = {
      applePay: {
        certificates: {
          loading: true,
          error: false,
        },
      },
    };
    const data = [];
    const action = {
      type: APPLE_PAY.CERTIFICATES.SUCCESS,
      payload: { data },
    };
    const expected = {
      applePay: {
        certificates: {
          loading: false,
          error: false,
          list: data,
        },
      },
    };
    const received = settingsReducer(prevState, action);
    expect(received).toEqual(expected);
  });

  it('should handle APPLE_PAY.CERTIFICATES.ERROR', () => {
    const prevState = {
      applePay: {
        certificates: {
          loading: true,
          error: false,
        },
      },
    };
    const action = {
      type: APPLE_PAY.CERTIFICATES.ERROR,
    };
    const expected = {
      applePay: {
        certificates: {
          loading: false,
          error: true,
        },
      },
    };
    const received = settingsReducer(prevState, action);
    expect(received).toEqual(expected);
  });

  it('should handle PROCESSING_SETTINGS.PENDING', () => {
    const prevState = {
      processingSettings: {
        loading: false,
        error: false,
      },
    };
    const action = {
      type: PROCESSING_SETTINGS.PENDING,
    };
    const expected = {
      processingSettings: {
        loading: true,
        error: false,
      },
    };
    const received = settingsReducer(prevState, action);
    expect(received).toEqual(expected);
  });

  it('should handle PROCESSING_SETTINGS.SUCCESS', () => {
    const prevState = {
      processingSettings: {
        loading: true,
        error: false,
      },
    };
    const data = {
      isAutoCascading: false,
      processors: {
        cards: [
          {
            id: 34,
            name: 'EBS Live',
            paymentMethods: [
              {
                paymentMethodId: 1,
                currencyIds: [134, 107, 160],
                is3d: true,
              },
            ],
          },
        ],
        localPayments: [
          {
            id: 9,
            localPaymentType: 'Online Banking',
            currencyIds: [141, 106],
          },
        ],
      },
    };
    const action = {
      type: PROCESSING_SETTINGS.SUCCESS,
      payload: { data },
    };
    const expected = {
      processingSettings: {
        loading: false,
        error: false,
        ...action.payload.data,
      },
    };
    const received = settingsReducer(prevState, action);
    expect(received).toEqual(expected);
  });

  it('should handle PROCESSING_SETTINGS.ERROR', () => {
    const prevState = {
      processingSettings: {
        loading: true,
        error: false,
      },
    };
    const action = {
      type: PROCESSING_SETTINGS.ERROR,
    };
    const expected = {
      processingSettings: {
        loading: false,
        error: true,
      },
    };
    const received = settingsReducer(prevState, action);
    expect(received).toEqual(expected);
  });

  it('should handle PAYMENT_METHODS.PENDING', () => {
    const prevState = {
      paymentMethods: {
        loading: false,
        error: false,
      },
    };
    const action = {
      type: PAYMENT_METHODS.PENDING,
    };
    const expected = {
      paymentMethods: {
        loading: true,
        error: false,
      },
    };
    const received = settingsReducer(prevState, action);
    expect(received).toEqual(expected);
  });

  it('should handle PAYMENT_METHODS.SUCCESS', () => {
    const prevState = {
      paymentMethods: {
        loading: true,
        error: false,
      },
    };
    const data = {
      currencyId: 98,
      cardSchemes: [
        {
          paymentMethodId: 1,
          isActive: true,
        },
      ],
      localPaymentSchemes: {
        regions: [
          {
            localPayments: [
              {
                surcharge: null,
                discounts: 0.0,
              },
            ],
            id: 3,
          },
        ],
        isReconciliationFee: true,
        reconciliationFee: 0.07,
      },
      isTest: false,
    };
    const action = {
      type: PAYMENT_METHODS.SUCCESS,
      payload: { data },
    };
    const expected = {
      paymentMethods: {
        loading: false,
        error: false,
        ...data,
      },
    };
    const received = settingsReducer(prevState, action);
    expect(received).toEqual(expected);
  });

  it('should handle PAYMENT_METHODS.ERROR', () => {
    const prevState = {
      paymentMethods: {
        loading: true,
        error: false,
      },
    };
    const action = {
      type: PAYMENT_METHODS.ERROR,
    };
    const expected = {
      paymentMethods: {
        loading: false,
        error: true,
      },
    };
    const received = settingsReducer(prevState, action);
    expect(received).toEqual(expected);
  });

  it('should handle SERVICE_SETTINGS.PENDING', () => {
    const prevState = {
      serviceSettings: {
        loading: false,
        error: false,
      },
    };
    const action = {
      type: SERVICE_SETTINGS.PENDING,
    };
    const expected = {
      serviceSettings: {
        loading: true,
        error: false,
      },
    };
    const received = settingsReducer(prevState, action);
    expect(received).toEqual(expected);
  });

  it('should handle SERVICE_SETTINGS.SUCCESS', () => {
    const prevState = {
      serviceSettings: {
        loading: true,
        error: false,
      },
    };
    const data = {
      allowMultipleBusinesses: true,
      allowMultipleChannels: true,
      allowCheckoutServerApi: false,
      allowMoto: false,
    };
    const action = {
      type: SERVICE_SETTINGS.SUCCESS,
      payload: { data },
    };
    const expected = {
      serviceSettings: {
        loading: false,
        error: false,
        ...action.payload.data,
      },
    };
    const received = settingsReducer(prevState, action);
    expect(received).toEqual(expected);
  });

  it('should handle SERVICE_SETTINGS.ERROR', () => {
    const prevState = {
      serviceSettings: {
        loading: true,
        error: false,
      },
    };
    const action = {
      type: SERVICE_SETTINGS.ERROR,
    };
    const expected = {
      serviceSettings: {
        loading: false,
        error: true,
      },
    };
    const received = settingsReducer(prevState, action);
    expect(received).toEqual(expected);
  });

  it('should handle COUNTRY_CITIES.PENDING', () => {
    const prevState = {
      cities: {
        loading: false,
        error: false,
        data: [],
      },
    };
    const action = {
      type: COUNTRY_CITIES.PENDING,
    };
    const expected = {
      cities: {
        loading: true,
        error: false,
        data: [],
      },
    };
    const received = settingsReducer(prevState, action);
    expect(received).toEqual(expected);
  });

  it('should handle COUNTRY_CITIES.SUCCESS', () => {
    const prevState = {
      cities: {
        loading: true,
        error: false,
        data: [],
      },
    };
    const data = [
      { cityId: 52, name: 'Helsinki', countryId: 59, timeZone: 'UTC +2' },
      {
        cityId: 1400,
        name: 'Ahvenanmaan  Laani',
        countryId: 59,
        timeZone: null,
      },
    ];
    const action = {
      type: COUNTRY_CITIES.SUCCESS,
      payload: { data },
    };
    const expected = {
      cities: {
        loading: false,
        error: false,
        data,
      },
    };
    const received = settingsReducer(prevState, action);
    expect(received).toEqual(expected);
  });

  it('should handle COUNTRY_CITIES.ERROR', () => {
    const prevState = {
      cities: {
        loading: true,
        error: false,
        data: [],
      },
    };
    const action = {
      type: COUNTRY_CITIES.ERROR,
    };
    const expected = {
      cities: {
        loading: false,
        error: true,
        data: [],
      },
    };
    const received = settingsReducer(prevState, action);
    expect(received).toEqual(expected);
  });

  it('should handle COUNTRY_TIMEZONES.PENDING', () => {
    const prevState = {
      timezones: {
        loading: false,
        error: false,
        data: [],
      },
    };
    const action = {
      type: COUNTRY_TIMEZONES.PENDING,
    };
    const expected = {
      timezones: {
        loading: true,
        error: false,
        data: [],
      },
    };
    const received = settingsReducer(prevState, action);
    expect(received).toEqual(expected);
  });

  it('should handle COUNTRY_TIMEZONES.SUCCESS', () => {
    const prevState = {
      timezones: {
        loading: true,
        error: false,
        data: [],
      },
    };
    const data = [
      {
        timezoneId: 60,
        countryId: 59,
        timezone: 'Europe/Helsinki',
        timezoneLabel: 'UTC +3.00',
      },
    ];
    const action = {
      type: COUNTRY_TIMEZONES.SUCCESS,
      payload: { data },
    };
    const expected = {
      timezones: {
        loading: false,
        error: false,
        data,
      },
    };
    const received = settingsReducer(prevState, action);
    expect(received).toEqual(expected);
  });

  it('should handle COUNTRY_TIMEZONES.ERROR', () => {
    const prevState = {
      timezones: {
        loading: true,
        error: false,
        data: [],
      },
    };
    const action = {
      type: COUNTRY_TIMEZONES.ERROR,
    };
    const expected = {
      timezones: {
        loading: false,
        error: true,
        data: [],
      },
    };
    const received = settingsReducer(prevState, action);
    expect(received).toEqual(expected);
  });

  it('should handle FREQUENCIES.PENDING', () => {
    const prevState = {
      frequencies: {
        loading: false,
        error: false,
        success: false,
        data: [],
      },
    };
    const action = {
      type: FREQUENCIES.PENDING,
    };
    const expected = {
      frequencies: {
        loading: true,
        error: false,
        success: false,
        data: [],
      },
    };
    const received = settingsReducer(prevState, action);
    expect(received).toEqual(expected);
  });

  it('should handle FREQUENCIES.SUCCESS', () => {
    const data = [
      {
        payoutCycleId: 1,
        frequency: '1 time a week',
        isActive: true,
      },
      {
        payoutCycleId: 2,
        frequency: '1 time a week',
        isActive: true,
      },
    ];

    const prevState = {
      frequencies: {
        loading: true,
        error: false,
        success: false,
        data,
      },
    };
    const action = {
      type: FREQUENCIES.SUCCESS,
      payload: {
        data,
      },
    };
    const expected = {
      frequencies: {
        loading: false,
        error: false,
        success: true,
        data,
      },
    };
    const received = settingsReducer(prevState, action);
    expect(received).toEqual(expected);
  });

  it('should handle BANK_ACCOUNTS.DETAILS.PENDING', () => {
    const expectedState = {
      ...prevState,
      bankDetails: {
        ...initState.bankDetails,
        loading: true,
      },
    };
    const action = {
      type: BANK_ACCOUNTS.DETAILS.PENDING,
    };
    const received = settingsReducer(prevState, action);
    expect(received).toEqual(expectedState);
    prevState = { ...expectedState };
  });

  it('should handle BANK_ACCOUNTS.DETAILS.SUCCESS', () => {
    const data = [
      {
        bankAccountId: 4,
        accountId: 100003,
      },
    ];

    const expectedState = {
      ...prevState,
      bankDetails: {
        ...prevState.bankDetails,
        data,
        success: true,
      },
    };
    const action = {
      type: BANK_ACCOUNTS.DETAILS.SUCCESS,
      payload: { data },
    };
    const received = settingsReducer(prevState, action);
    expect(received).toEqual(expectedState);
    prevState = { ...expectedState };
  });

  it('should handle BANK_ACCOUNTS.DETAILS.ERROR', () => {
    const expectedState = {
      ...prevState,
      bankDetails: {
        ...prevState.bankDetails,
        errorMsg: { message: 'Ooops!' },
        error: true,
      },
    };
    const action = {
      type: BANK_ACCOUNTS.DETAILS.ERROR,
      payload: {
        message: 'Ooops!',
      },
    };
    const received = settingsReducer(prevState, action);
    expect(received).toEqual(expectedState);
    prevState = { ...expectedState };
  });

  it('should handle BANK_ACCOUNTS.FIELDS.PENDING', () => {
    const expectedState = {
      ...prevState,
      bankFields: {
        ...initState.bankFields,
        loading: true,
      },
    };
    const action = {
      type: BANK_ACCOUNTS.FIELDS.PENDING,
    };
    const received = settingsReducer(prevState, action);
    expect(received).toEqual(expectedState);
    prevState = { ...expectedState };
  });

  it('should handle BANK_ACCOUNTS.FIELDS.SUCCESS', () => {
    const data = [
      {
        bankAccountId: 4,
        accountId: 100003,
      },
    ];

    const expectedState = {
      ...prevState,
      bankFields: {
        ...prevState.bankFields,
        data,
        success: true,
      },
    };
    const action = {
      type: BANK_ACCOUNTS.FIELDS.SUCCESS,
      payload: { data },
    };
    const received = settingsReducer(prevState, action);
    expect(received).toEqual(expectedState);
    prevState = { ...expectedState };
  });

  it('should handle BANK_ACCOUNTS.FIELDS.ERROR', () => {
    const expectedState = {
      ...prevState,
      bankFields: {
        ...prevState.bankFields,
        errorMsg: { message: 'Ooops!' },
        error: true,
      },
    };
    const action = {
      type: BANK_ACCOUNTS.FIELDS.ERROR,
      payload: {
        message: 'Ooops!',
      },
    };
    const received = settingsReducer(prevState, action);
    expect(received).toEqual(expectedState);
    prevState = { ...expectedState };
  });

  it('should handle API_KEYS.PENDING', () => {
    const expectedState = {
      ...prevState,
      apiKeys: {
        ...initState.apiKeys,
        loading: true,
      },
    };
    const action = {
      type: API_KEYS.PENDING,
    };
    const received = settingsReducer(prevState, action);
    expect(received).toEqual(expectedState);
    prevState = { ...expectedState };
  });

  it('should handle API_KEYS.SUCCESS', () => {
    const data = [
      {
        bankAccountId: 4,
        accountId: 100003,
      },
    ];

    const expectedState = {
      ...prevState,
      apiKeys: {
        ...prevState.apiKeys,
        data,
        success: true,
      },
    };
    const action = {
      type: API_KEYS.SUCCESS,
      payload: { data },
    };
    const received = settingsReducer(prevState, action);
    expect(received).toEqual(expectedState);
    prevState = { ...expectedState };
  });

  it('should handle API_KEYSERROR', () => {
    const expectedState = {
      ...prevState,
      apiKeys: {
        ...prevState.apiKeys,
        errorMsg: { message: 'Ooops!' },
        error: true,
      },
    };
    const action = {
      type: API_KEYS.ERROR,
      payload: {
        message: 'Ooops!',
      },
    };
    const received = settingsReducer(prevState, action);
    expect(received).toEqual(expectedState);
    prevState = { ...expectedState };
  });
});
