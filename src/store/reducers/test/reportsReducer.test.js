import reportsReducer from '../reportsReducer';
import { REPORTS } from 'store/constants';

describe('reportsReducer', () => {
  const initState = {
    list: {
      loading: false,
      error: false,
      data: [],
    },
    generate: {
      loading: false,
      error: false,
    },
  };

  it('should return the initial state', () => {
    expect(reportsReducer()).toEqual(initState);
  });

  it('should handle REPORTS.ALL.PENDING', () => {
    const prevState = {
      list: {
        loading: false,
        error: false,
        data: [],
      },
    };
    const action = {
      type: REPORTS.ALL.PENDING,
    };
    const expected = {
      list: {
        loading: true,
        error: false,
        data: [],
      },
    };
    const received = reportsReducer(prevState, action);
    expect(received).toEqual(expected);
  });

  it('should handle REPORTS.ALL.SUCCESS', () => {
    const prevState = {
      list: {
        loading: true,
        error: false,
        data: [],
      },
    };
    const data = ['report1', 'report2'];
    const action = {
      type: REPORTS.ALL.SUCCESS,
      payload: { data },
    };
    const expected = {
      list: {
        loading: false,
        error: false,
        data,
      },
    };
    const received = reportsReducer(prevState, action);
    expect(received).toEqual(expected);
  });

  it('should handle REPORTS.ALL.ERROR', () => {
    const prevState = {
      list: {
        loading: true,
        error: false,
        data: [],
      },
    };
    const action = {
      type: REPORTS.ALL.ERROR,
    };
    const expected = {
      list: {
        loading: false,
        error: true,
        data: [],
      },
    };
    const received = reportsReducer(prevState, action);
    expect(received).toEqual(expected);
  });

  it('should handle REPORTS.GENERATE.PENDING', () => {
    const prevState = {
      generate: {
        loading: false,
        error: false,
      },
    };
    const action = {
      type: REPORTS.GENERATE.PENDING,
    };
    const expected = {
      generate: {
        loading: true,
        error: false,
      },
    };
    const received = reportsReducer(prevState, action);
    expect(received).toEqual(expected);
  });

  it('should handle REPORTS.GENERATE.SUCCESS', () => {
    const prevState = {
      generate: {
        loading: true,
        error: false,
      },
    };
    const data = { received: 'received' };
    const action = {
      type: REPORTS.GENERATE.SUCCESS,
      payload: { data },
    };
    const expected = {
      generate: {
        loading: false,
        error: false,
        ...data,
      },
    };
    const received = reportsReducer(prevState, action);
    expect(received).toEqual(expected);
  });

  it('should handle REPORTS.GENERATE.ERROR', () => {
    const prevState = {
      generate: {
        loading: true,
        error: false,
      },
    };
    const action = {
      type: REPORTS.GENERATE.ERROR,
    };
    const expected = {
      generate: {
        loading: false,
        error: true,
      },
    };
    const received = reportsReducer(prevState, action);
    expect(received).toEqual(expected);
  });
});
