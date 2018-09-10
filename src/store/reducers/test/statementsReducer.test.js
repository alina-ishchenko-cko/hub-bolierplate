import statementsReducer from '../statementsReducer';
import { STATEMENTS } from 'store/constants';

describe('statementsReducer', () => {
  const DEFAULT_STATE = {
    list: {
      loading: false,
      error: false,
      startIndex: 0,
      totalRows: 0,
      statements: [],
    },
    groups: {},
    monthSectionMap: {},
  };
  let prevState = {};

  it('should return the initial state', () => {
    expect(statementsReducer()).toEqual(DEFAULT_STATE);
    prevState = { ...DEFAULT_STATE };
  });

  it('should handle STATEMENTS.PENDING', () => {
    const action = {
      type: STATEMENTS.PENDING,
    };
    const expectedState = {
      ...prevState,
      list: {
        ...DEFAULT_STATE.list,
        loading: true,
      },
    };
    expect(statementsReducer(prevState, action)).toEqual(expectedState);
  });

  it('should handle STATEMENTS.SUCCESS', () => {
    const prevState = {
      list: {
        loading: true,
        error: false,
        data: {},
      },
    };
    const data = {
      startIndex: 0,
      statements: [{ displayId: '15' }],
      totalRows: 15,
    };
    const action = {
      type: STATEMENTS.SUCCESS,
      payload: { data },
    };
    const expectedState = {
      list: {
        loading: false,
        error: false,
        ...data,
      },
    };
    expect(statementsReducer(prevState, action)).toEqual(expectedState);
  });

  it('should handle STATEMENTS.ERROR', () => {
    const prevState = {
      list: {
        loading: true,
        error: false,
        data: {},
      },
    };
    const action = {
      type: STATEMENTS.ERROR,
    };
    const expectedState = {
      list: {
        loading: false,
        error: true,
        data: {},
      },
    };
    expect(statementsReducer(prevState, action)).toEqual(expectedState);
  });

  it('should handle STATEMENTS.GROUP.SUCCESS', () => {
    const prevState = {
      groups: {},
    };

    const data = {
      startIndex: 0,
      statements: [{ displayId: '15' }],
      totalRows: 15,
    };

    const action = {
      type: STATEMENTS.GROUP.SUCCESS,
      statementId: '22',
      payload: { data },
    };

    const expectedState = {
      groups: {
        '22': {
          ...data,
        },
      },
    };
    expect(statementsReducer(prevState, action)).toEqual(expectedState);
  });
});
