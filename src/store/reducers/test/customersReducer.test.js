import customersReducer from '../customersReducer';
import { CUSTOMERS, LOGIN_TYPE, ACCOUNTS_TYPE } from 'store/constants';

describe('customersReducer', () => {
  const DEFAULT_STATE = {
    indicators: {
      loading: false,
      error: false,
      uniqueCustomers: 0,
      returningCustomers: 0,
      averageSpend: 0,
    },
    list: {
      loading: false,
      error: false,
    },
    refresh: false,
  };
  let prevState = {};

  it('should return the initial state', () => {
    expect(customersReducer()).toEqual(DEFAULT_STATE);
    prevState = { ...DEFAULT_STATE };
  });

  it('should handle INDICATORS PENDING', () => {
    const expectedState = {
      ...prevState,
      indicators: {
        ...DEFAULT_STATE.indicators,
        loading: true,
      },
    };

    let action = {
      type: CUSTOMERS.INDICATORS.PENDING,
    };

    expect(customersReducer(prevState, action)).toEqual(expectedState);
    prevState = { ...expectedState };
  });

  it('should handle INDICATORS ERROR', () => {
    const expectedState = {
      ...prevState,
      indicators: {
        ...DEFAULT_STATE.indicators,
        error: true,
      },
    };

    let action = {
      type: CUSTOMERS.INDICATORS.ERROR,
      payload: { data: 'Oops error' },
    };

    expect(customersReducer(prevState, action)).toEqual(expectedState);
    prevState = { ...expectedState };
  });

  it('should handle INDICATORS SUCCESS', () => {
    const expectedState = {
      ...prevState,
      indicators: {
        loading: false,
        error: false,
        uniqueCustomers: 607,
        returningCustomers: 0.0,
        averageSpend: 120.94,
      },
    };
    const action = {
      type: CUSTOMERS.INDICATORS.SUCCESS,
      payload: {
        data: {
          data: {
            uniqueCustomers: 607,
            returningCustomers: 0.0,
            averageSpend: 120.94,
          },
        },
      },
    };

    expect(customersReducer(prevState, action)).toEqual(expectedState);
    prevState = { ...expectedState };
  });

  it('should handle ALL PENDING', () => {
    const expectedState = {
      ...prevState,
      list: {
        loading: true,
        error: false,
      },
    };

    let action = {
      type: CUSTOMERS.ALL.PENDING,
    };
    expect(customersReducer(prevState, action)).toEqual(expectedState);
  });

  it('should handle ALL SUCCESS', () => {
    const expectedState = {
      ...prevState,
      list: {
        ...DEFAULT_STATE.list,
        headers: [1, 2, 3],
      },
    };

    let action = {
      type: CUSTOMERS.ALL.SUCCESS,
      payload: { data: { headers: [1, 2, 3] } },
    };
    expect(customersReducer(prevState, action)).toEqual(expectedState);
  });

  it('should handle ALL ERROR', () => {
    const expectedState = {
      ...prevState,
      list: {
        ...prevState.list,
        loading: false,
        error: true,
        errorMsg: 'Ooops!',
      },
    };

    let action = {
      type: CUSTOMERS.ALL.ERROR,
      payload: { data: 'Ooops!' },
    };
    expect(customersReducer(prevState, action)).toEqual(expectedState);
  });

  it('should handle ACCOUNTS_TYPE REFRESH_DATA', () => {
    const expectedState = {
      ...prevState,
      refresh: true,
    };

    let action = {
      type: ACCOUNTS_TYPE.REFRESH_DATA,
    };
    expect(customersReducer(prevState, action)).toEqual(expectedState);
  });
});
