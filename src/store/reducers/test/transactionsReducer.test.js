import transactionsReducer from '../transactionsReducer';
import {
  LOGIN_TYPE,
  TRANSACTIONS,
  CHARGES,
  ACCOUNTS_TYPE,
} from 'store/constants';

describe('transactionsReducer', () => {
  const initState = {
    refresh: false,
    indicators: {
      loading: false,
      error: false,
      success: false,
      averageSaleAmount: 0,
      totalRevenueAmount: 0,
      totalSalesCount: 0,
      chargebacks: {
        revenuePercentage: 0,
        salesPercentage: 0,
        totalAmount: 0,
        totalCount: 0,
      },
      refunds: {
        revenuePercentage: 0,
        salesPercentage: 0,
        totalAmount: 0,
        totalCount: 0,
      },
    },
    list: {
      loading: false,
      error: false,
      success: false,
      startIndex: 0,
      totalRows: 0,
      headers: [],
      datas: [],
    },
    paymentCharge: {
      loading: false,
      error: false,
      errorMsg: '',
      success: false,
    },
    logs: {},
    activeAction: {
      blacklistId: '',
      refundId: '',
      voidId: '',
      captureId: '',
    },
  };
  let prevState = {};

  it('should return the initial state', () => {
    expect(transactionsReducer(undefined, {})).toEqual(initState);
    prevState = { ...initState };
  });

  it('should handle INDICATORS PENDING', () => {
    const expectedState = {
      ...prevState,
      indicators: {
        ...initState.indicators,
        loading: true,
      },
    };

    let action = {
      type: TRANSACTIONS.INDICATORS.PENDING,
    };

    expect(transactionsReducer(prevState, action)).toEqual(expectedState);
    prevState = { ...expectedState };
  });

  it('should handle INDICATORS ERROR', () => {
    const expectedState = {
      ...prevState,
      indicators: {
        ...initState.indicators,
        error: true,
      },
    };

    let action = {
      type: TRANSACTIONS.INDICATORS.ERROR,
      payload: { data: 'Oops error' },
    };

    expect(transactionsReducer(prevState, action)).toEqual(expectedState);
    prevState = { ...expectedState };
  });

  it('should handle INDICATORS SUCCESS', () => {
    const expectedState = {
      ...prevState,
      indicators: {
        ...initState.indicators,
        success: true,
        title: 2,
      },
    };

    let action = {
      type: TRANSACTIONS.INDICATORS.SUCCESS,
      payload: { data: { title: 2 } },
    };

    expect(transactionsReducer(prevState, action)).toEqual(expectedState);
    prevState = { ...expectedState };
  });

  it('should handle TRANSACTIONS LIST PENDING', () => {
    const expectedState = {
      ...prevState,
      list: {
        ...initState.list,
        loading: true,
      },
    };

    let action = {
      type: TRANSACTIONS.ALL.PENDING,
    };

    expect(transactionsReducer(prevState, action)).toEqual(expectedState);
    prevState = { ...expectedState };
  });

  it('should handle TRANSACTIONS LIST ERROR', () => {
    const expectedState = {
      ...prevState,
      list: {
        ...initState.list,
        error: true,
      },
    };

    let action = {
      type: TRANSACTIONS.ALL.ERROR,
    };

    expect(transactionsReducer(prevState, action)).toEqual(expectedState);
    prevState = { ...expectedState };
  });

  it('should handle TRANSACTIONS LIST SUCCESS', () => {
    const expectedState = {
      ...prevState,
      list: {
        ...initState.list,
        success: true,
        title: 1,
      },
    };

    let action = {
      type: TRANSACTIONS.ALL.SUCCESS,
      payload: { data: { title: 1 } },
    };

    expect(transactionsReducer(prevState, action)).toEqual(expectedState);
    prevState = { ...expectedState };
  });

  it('should handle CHARGES CREATE PENDING', () => {
    const expectedState = {
      ...prevState,
      paymentCharge: {
        ...initState.paymentCharge,
        loading: true,
      },
    };

    let action = {
      type: CHARGES.CREATE.PENDING,
    };

    expect(transactionsReducer(prevState, action)).toEqual(expectedState);
    prevState = { ...expectedState };
  });

  it('should handle CHARGES CREATE ERROR', () => {
    const expectedState = {
      ...prevState,
      paymentCharge: {
        ...initState.paymentCharge,
        errorMsg: 'Oops',
        error: true,
      },
    };

    let action = {
      type: CHARGES.CREATE.ERROR,
      payload: { data: 'Oops' },
    };

    expect(transactionsReducer(prevState, action)).toEqual(expectedState);
    prevState = { ...expectedState };
  });

  it('should handle CHARGES CREATE SUCCESS', () => {
    const expectedState = {
      ...prevState,
      paymentCharge: {
        ...initState.paymentCharge,
        title: 1,
        success: true,
      },
    };

    let action = {
      type: CHARGES.CREATE.SUCCESS,
      payload: { data: { title: 1 } },
    };

    expect(transactionsReducer(prevState, action)).toEqual(expectedState);
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

    expect(transactionsReducer(prevState, action)).toEqual(expectedState);
    prevState = { ...expectedState };
  });

  it('should handle TRANSACTIONS LOGS SUCCESS', () => {
    const expectedState = {
      ...prevState,
      logs: {
        ...prevState.logs,
        test_A9880FF9AF149Q5C2022: [{ key: '1', id: '1' }],
      },
    };

    let action = {
      type: TRANSACTIONS.LOGS.SUCCESS,
      chargeId: 'test_A9880FF9AF149Q5C2022',
      payload: { data: [{ id: '1' }] },
    };

    expect(transactionsReducer(prevState, action)).toEqual(expectedState);
    prevState = { ...expectedState };
  });

  it('should handle SET_TRANSACTION_ACTION', () => {
    const expectedState = {
      ...prevState,
      activeAction: {
        ...prevState.activeAction,
        blacklistId: 'asdasdad123123123',
      },
    };

    let action = {
      type: TRANSACTIONS.SET_TRANSACTION_ACTION,
      data: {
        type: 'blacklistId',
        value: 'asdasdad123123123',
      },
    };

    expect(transactionsReducer(prevState, action)).toEqual(expectedState);
    prevState = { ...expectedState };
  });

  // it('should handle TRANSACTIONS RESPONSECODES PENDING', () => {
  //   const expectedState = {
  //     ...prevState,
  //     responseCodes: {
  //       ...initState.responseCodes,
  //       loading: true,
  //     },
  //   };

  //   let action = {
  //     type: TRANSACTIONS.RESPONSECODES.PENDING,
  //   };

  //   expect(transactionsReducer(prevState, action)).toEqual(expectedState);
  //   prevState = { ...expectedState };
  // });

  // it('should handle TRANSACTIONS RESPONSECODES SUCCESS', () => {
  //   const expectedState = {
  //     ...prevState,
  //     responseCodes: {
  //       ...prevState.responseCodes,
  //       success: true,
  //       loading: false,
  //       data: [{ id: '1' }, { id: '2' }],
  //     },
  //   };

  //   let action = {
  //     type: TRANSACTIONS.RESPONSECODES.SUCCESS,
  //     payload: { data: [{ id: '1' }, { id: '2' }] },
  //   };

  //   expect(transactionsReducer(prevState, action)).toEqual(expectedState);
  //   prevState = { ...expectedState };
  // });
});
