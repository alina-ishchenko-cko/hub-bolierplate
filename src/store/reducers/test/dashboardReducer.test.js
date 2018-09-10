import dashboardReducer from '../dashboardReducer';
import {
  LOGIN_TYPE,
  INDICATORS_TYPE,
  SUMMARY_TYPE,
  ACCOUNTS_TYPE,
} from 'store/constants';

describe('dashboardReducer', () => {
  const DEFAULT_STATE = {
    indicators: {
      loading: false,
      error: false,
    },
    summary: {
      loading: false,
      error: false,
      currencies: [],
      paymentMethods: [],
    },
    refresh: false,
  };
  let prevState = {};

  it('should return the initial state', () => {
    expect(dashboardReducer()).toEqual(DEFAULT_STATE);
    prevState = { ...DEFAULT_STATE };
  });

  it('should handle INDICATORS_TYPE PENDING', () => {
    const expectedState = {
      ...prevState,
      indicators: {
        ...DEFAULT_STATE.indicators,
        loading: true,
      },
    };

    let action = {
      type: INDICATORS_TYPE.PENDING,
    };

    expect(dashboardReducer(prevState, action)).toEqual(expectedState);
    prevState = { ...expectedState };
  });

  it('should handle INDICATORS_TYPE ERROR', () => {
    const expectedState = {
      ...prevState,
      indicators: {
        ...DEFAULT_STATE.indicators,
        error: true,
      },
    };

    let action = {
      type: INDICATORS_TYPE.ERROR,
    };

    expect(dashboardReducer(prevState, action)).toEqual(expectedState);
    prevState = { ...expectedState };
  });

  it('should handle INDICATORS_TYPE SUCCESS', () => {
    const expectedState = {
      ...prevState,
      indicators: {
        ...DEFAULT_STATE.indicators,
        email: 'test@exmaple.com',
        loading: false,
      },
    };

    let action = {
      type: INDICATORS_TYPE.SUCCESS,
      payload: {
        data: { email: 'test@exmaple.com' },
      },
    };

    expect(dashboardReducer(prevState, action)).toEqual(expectedState);
    prevState = { ...expectedState };
  });

  it('should handle SUMMARY_TYPE SUCCESS', () => {
    const expectedState = {
      ...prevState,
      summary: {
        loading: false,
        error: false,
        currencies: [1, 2, 3, 4],
        paymentMethods: [6, 7, 8, 9],
      },
    };

    let action = {
      type: SUMMARY_TYPE.SUCCESS,
      payload: {
        data: {
          currencies: [1, 2, 3, 4],
          paymentMethods: [6, 7, 8, 9],
        },
      },
    };

    expect(dashboardReducer(prevState, action)).toEqual(expectedState);
    prevState = { ...expectedState };
  });

  it('should handle SUMMARY_TYPE ERROR', () => {
    const expectedState = {
      ...prevState,
      summary: {
        loading: false,
        error: true,
        currencies: [1, 2, 3, 4],
        paymentMethods: [6, 7, 8, 9],
      },
    };

    let action = {
      type: SUMMARY_TYPE.ERROR,
      payload: {
        data: {
          loading: false,
          error: true,
          currencies: [1, 2, 3, 4],
          paymentMethods: [6, 7, 8, 9],
        },
      },
    };

    expect(dashboardReducer(prevState, action)).toEqual(expectedState);
    prevState = { ...expectedState };
  });

  it('should handle ACCOUNTS_TYPE REFRESH_DATA', () => {
    const expectedState = {
      ...prevState,
      refresh: true,
    };

    let action = {
      type: ACCOUNTS_TYPE.REFRESH_DATA,
    };

    expect(dashboardReducer(prevState, action)).toEqual(expectedState);
    prevState = { ...expectedState };
  });
});
