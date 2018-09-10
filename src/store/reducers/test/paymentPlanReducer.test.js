import paymentPlanReducer from '../paymentPlanReducer';
import { PAYMENT_TYPE, PAYMENT_PLAN } from 'store/constants';

describe('PaymentPlanReducer', () => {
  let prevState = {};
  const initState = {
    list: {
      loading: false,
      success: false,
      error: false,
      data: [],
    },
    options: {
      data: [],
      loading: false,
      success: false,
      error: false,
    },
  };

  afterAll(() => {
    prevState = null;
  });

  it('should return the initial state', () => {
    expect(paymentPlanReducer(initState, {})).toEqual(initState);
    prevState = { ...initState };
  });

  it('should handle PENDING', () => {
    const expectedState = {
      ...prevState,
      options: {
        ...initState.options,
        loading: true,
      },
    };

    let action = {
      type: PAYMENT_TYPE.OPTIONS.PENDING,
    };

    expect(paymentPlanReducer(prevState, action)).toEqual(expectedState);
    prevState = { ...expectedState };
  });

  it('should handle SUCCESS', () => {
    const expectedState = {
      ...prevState,
      options: {
        ...initState.options,
        data: [{ name: '1', value: '1' }],
        success: true,
      },
    };

    let action = {
      type: PAYMENT_TYPE.OPTIONS.SUCCESS,
      payload: { data: { name: '1', value: '1' } },
    };

    expect(paymentPlanReducer(prevState, action)).toEqual(expectedState);
    prevState = { ...expectedState };
  });

  it('should handle ERROR', () => {
    const expectedState = {
      ...prevState,
      options: {
        ...initState.options,
        email: 'test@example.com',
        error: true,
      },
    };

    let action = {
      type: PAYMENT_TYPE.OPTIONS.ERROR,
      payload: { data: { email: 'test@example.com' } },
    };

    expect(paymentPlanReducer(prevState, action)).toEqual(expectedState);
    prevState = { ...expectedState };
  });

  it('should handle PAYMENT_PLAN.ALL PENDING', () => {
    const expectedState = {
      ...prevState,
      list: {
        ...initState.list,
        loading: true,
      },
    };

    let action = {
      type: PAYMENT_PLAN.ALL.PENDING,
    };

    expect(paymentPlanReducer(prevState, action)).toEqual(expectedState);
    prevState = { ...expectedState };
  });

  it('should handle PAYMENT_PLAN.ALL SUCCESS', () => {
    const expectedState = {
      ...prevState,
      list: {
        ...initState.list,
        success: true,
        data: [{ name: '1', value: '1' }, { name: '2', value: '2' }],
      },
    };

    let action = {
      type: PAYMENT_PLAN.ALL.SUCCESS,
      payload: { data: [{ name: '1', value: '1' }, { name: '2', value: '2' }] },
    };

    expect(paymentPlanReducer(prevState, action)).toEqual(expectedState);
    prevState = { ...expectedState };
  });

  it('should handle PAYMENT_PLAN.ALL ERROR', () => {
    const expectedState = {
      ...prevState,
      list: {
        ...initState.list,
        error: true,
        message: 'Ooops!',
      },
    };

    let action = {
      type: PAYMENT_PLAN.ALL.ERROR,
      payload: { data: { message: 'Ooops!' } },
    };

    expect(paymentPlanReducer(prevState, action)).toEqual(expectedState);
    prevState = { ...expectedState };
  });
});
