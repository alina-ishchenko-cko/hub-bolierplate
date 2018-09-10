import passwordReducer from '../passwordReducer';
import { CHANGE_PASSWORD_TYPE, REQUEST_PASSWORD_TYPE } from 'store/constants';

describe('PasswordReducer', () => {
  let prevState = {};
  const initState = {
    newPasswordData: {
      loading: false,
      success: false,
      error: false,
    },
    requestPasswordData: {
      loading: false,
      success: false,
      error: false,
    },
    verifyTokenData: {
      success: false,
      error: false,
    },
  };

  afterAll(() => {
    prevState = null;
  });

  it('should return the initial state', () => {
    expect(passwordReducer(initState, {})).toEqual(initState);
    prevState = { ...initState };
  });

  it('should handle RESET', () => {
    const expectedState = {
      ...prevState,
      newPasswordData: {
        ...initState.newPasswordData,
        email: 'test@example.com',
      },
    };

    let action = {
      type: CHANGE_PASSWORD_TYPE.RESET,
      payload: {
        data: { email: 'test@example.com' },
      },
    };

    expect(passwordReducer(prevState, action)).toEqual(expectedState);
    prevState = { ...expectedState };
  });

  it('should handle PENDING', () => {
    const expectedState = {
      ...prevState,
      newPasswordData: {
        ...prevState.newPasswordData,
        loading: true,
      },
    };

    let action = {
      type: CHANGE_PASSWORD_TYPE.PENDING,
    };

    expect(passwordReducer(prevState, action)).toEqual(expectedState);
    prevState = { ...expectedState };
  });

  it('should handle SUCCESS', () => {
    const expectedState = {
      ...prevState,
      newPasswordData: {
        ...prevState.newPasswordData,
        loading: false,
        success: true,
      },
    };

    let action = {
      type: CHANGE_PASSWORD_TYPE.SUCCESS,
    };

    expect(passwordReducer(prevState, action)).toEqual(expectedState);
    prevState = { ...expectedState };
  });

  it('should handle ERROR', () => {
    const expectedState = {
      ...prevState,
      newPasswordData: {
        ...prevState.newPasswordData,
        email: 'test@example.com',
        loading: false,
        success: false,
        error: true,
      },
    };

    let action = {
      type: CHANGE_PASSWORD_TYPE.ERROR,
      payload: { data: { email: 'test@example.com' } },
    };

    expect(passwordReducer(prevState, action)).toEqual(expectedState);
    prevState = { ...expectedState };
  });

  it('should handle REQUEST PASSWORD PENDING', () => {
    const expectedState = {
      ...initState,
      requestPasswordData: {
        loading: true,
      },
    };

    let action = {
      type: REQUEST_PASSWORD_TYPE.PENDING,
    };

    expect(passwordReducer(prevState, action)).toEqual(expectedState);
    prevState = { ...expectedState };
  });

  it('should handle REQUEST PASSWORD SUCCESS', () => {
    const expectedState = {
      ...prevState,
      requestPasswordData: {
        loading: false,
        success: true,
      },
    };

    let action = {
      type: REQUEST_PASSWORD_TYPE.SUCCESS,
    };

    expect(passwordReducer(prevState, action)).toEqual(expectedState);
    prevState = { ...expectedState };
  });

  it('should handle REQUEST PASSWORD ERROR', () => {
    const expectedState = {
      ...prevState,
      requestPasswordData: {
        error: true,
        success: false,
        loading: false,
        email: 'test@example.com',
      },
    };

    let action = {
      type: REQUEST_PASSWORD_TYPE.ERROR,
      payload: { data: { email: 'test@example.com' } },
    };

    expect(passwordReducer(prevState, action)).toEqual(expectedState);
    prevState = { ...expectedState };
  });

  it('should handle CLEAR', () => {
    const expectedState = { ...initState };

    let action = {
      type: CHANGE_PASSWORD_TYPE.CLEAR,
    };

    expect(passwordReducer(prevState, action)).toEqual(expectedState);
  });
});
