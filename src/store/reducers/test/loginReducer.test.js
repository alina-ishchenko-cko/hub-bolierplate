import loginReducer from '../loginReducer';
import { LOGIN_TYPE, LOOKUPS_TYPE, PROFILE_UPDATE } from 'store/constants';
import * as AppRequest from 'services/appRequest';

describe('LoginReducer', () => {
  let prevState = {};
  const DEFAULT_STATE = {
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

  afterAll(() => {
    prevState = null;
  });

  it('should return the initial state', () => {
    expect(loginReducer()).toEqual(DEFAULT_STATE);
    prevState = { ...DEFAULT_STATE };
  });

  it('should handle LOGIN CACHED_DATA', () => {
    const expectedState = {
      ...DEFAULT_STATE,
    };

    let action = {
      type: LOGIN_TYPE.CACHED_DATA,
      payload: {
        data: {
          ...DEFAULT_STATE,
        },
      },
    };

    expect(loginReducer(prevState, action)).toEqual(expectedState);
    prevState = { ...expectedState };
  });

  it('should handle LOGIN_USER_PENDING', () => {
    const expectedState = {
      ...DEFAULT_STATE,
      data: {
        ...DEFAULT_STATE.data,
        loading: true,
      },
    };

    let action = {
      type: LOGIN_TYPE.PENDING,
    };

    expect(loginReducer(prevState, action)).toEqual(expectedState);
    prevState = { ...expectedState };
  });

  it('should handle LOGIN_USER_SUCCESS', () => {
    const expectedState = {
      ...prevState,
      data: {
        ...DEFAULT_STATE.data,
        loading: false,
        success: false,
        error: false,
        accountId: 0,
        accountTypeId: 4,
        accountTypeName: '',
        displayCurrencyId: 0,
        displayCurrencyName: '',
        displayCurrencySymbol: '',
        email: 'test@exmaple.com',
        isActive: false,
        lastLoginDate: '',
        name: 'test user',
        permissions: [],
        phone: {
          countryCode: '',
          number: '',
        },
        timeZone: 'London',
        token: '',
        userId: 0,
        isReadOnly: true,
        isMerchantAdmin: false,
        isSuperAdmin: false,
        isGodUser: false,
        twoFactorEnabled: false,
        twoFactorPassed: false,
        success: true,
      },
    };

    let action = {
      type: LOGIN_TYPE.SUCCESS,
      payload: {
        data: {
          email: 'test@exmaple.com',
          accountTypeId: 4,
          name: 'test user',
          timeZone: 'London',
        },
      },
    };

    expect(loginReducer(prevState, action)).toEqual(expectedState);
    prevState = { ...expectedState };
  });

  it('should handle LOGIN_TYPE.ERROR', () => {
    const expectedState = {
      ...prevState,
      data: {
        ...DEFAULT_STATE.data,
        error: true,
        errorData: { message: 'Oops!' },
      },
    };

    let action = {
      type: LOGIN_TYPE.ERROR,
      payload: {
        data: {
          message: 'Oops!',
        },
      },
    };
    expect(loginReducer(prevState, action)).toEqual(expectedState);
    prevState = { ...expectedState };
  });

  it('should handle LOGIN_TYPE.TWO_FACTOR', () => {
    const expectedState = {
      ...prevState,
      data: {
        ...prevState.data,
        twoFactorPassed: true,
        success: true,
      },
    };

    let action = {
      type: LOGIN_TYPE.TWO_FACTOR,
      payload: {
        data: {
          success: true,
        },
      },
    };
    expect(loginReducer(prevState, action)).toEqual(expectedState);
    prevState = { ...expectedState };
  });

  it('should handle LOOKUPS_TYPE.SUCCESS', () => {
    const expectedState = {
      ...prevState,
      lookups: {
        currencies: [1, 2, 3, 4, 5, 6, 7],
      },
      data: {
        ...prevState.data,
        displayCurrencyName: '',
        displayCurrencySymbol: '',
      },
    };

    const action = {
      type: LOOKUPS_TYPE.SUCCESS,
      payload: {
        data: {
          currencies: [1, 2, 3, 4, 5, 6, 7],
        },
      },
    };
    expect(loginReducer(prevState, action)).toEqual(expectedState);
    prevState = { ...expectedState };
  });

  it('should handle PROFILE_UPDATE_PENDING', () => {
    const expectedState = {
      ...prevState,
      data: {
        ...prevState.data,
        loading: true,
        success: false,
      },
    };

    let action = {
      type: PROFILE_UPDATE.PENDING,
    };

    expect(loginReducer(prevState, action)).toEqual(expectedState);
    prevState = { ...expectedState };
  });

  it('should handle PROFILE_UPDATE_ERROR', () => {
    const expectedState = {
      ...prevState,
      data: {
        ...prevState.data,
        loading: false,
        success: false,
        error: true,
        errorData: { message: 'Ooops!' },
      },
    };

    let action = {
      type: PROFILE_UPDATE.ERROR,
      payload: {
        data: { message: 'Ooops!' },
      },
    };

    expect(loginReducer(prevState, action)).toEqual(expectedState);
    prevState = { ...expectedState };
  });

  it('should handle PROFILE_UPDATE_SUCCESS', () => {
    const newData = prevState.data;
    newData.name = 'Will smith';
    newData.email = 'test@exmaple.com';
    newData.timeZone = 'China';

    const expectedState = {
      ...prevState,
      data: {
        ...prevState.data,
        ...newData,
        loading: false,
        success: true,
      },
    };

    let action = {
      type: PROFILE_UPDATE.SUCCESS,
      payload: {
        data: {
          email: 'test@exmaple.com',
          name: 'Will smith',
          timeZone: 'China',
        },
      },
    };

    expect(loginReducer(prevState, action)).toEqual(expectedState);
    prevState = { ...expectedState };
  });

  it('should handle CLEAR', () => {
    const expectedState = { ...DEFAULT_STATE };
    let action = { type: LOGIN_TYPE.CLEAR };
    expect(loginReducer(prevState, action)).toEqual(expectedState);
  });
});
