import appReducer from '../appReducer';
import { APP_TYPE, TABLE_TYPE } from 'store/constants';

describe('accountsReducer', () => {
  const DEFAULT_STATE = {
    isSidebarCollapsed: false,
    pageTitle: '',
    tableOptions: {
      search: '',
      sort: {
        sortColumn: 'timestamp',
        sortOrder: 'desc',
      },
      filter: [],
      pagination: {
        pageSize: 10,
        startIndex: 0,
      },
    },
    selectedRows: [],
    rowDetailStack: [],
    activeRow: {},
  };
  let prevState = {};

  it('should return the initial state', () => {
    expect(appReducer()).toEqual(DEFAULT_STATE);
    prevState = { ...DEFAULT_STATE };
  });

  it('should handle COLLAPSE_SIDEBAR', () => {
    const expectedState = {
      ...prevState,
      isSidebarCollapsed: true,
    };

    const action = {
      type: APP_TYPE.COLLAPSE_SIDEBAR,
      collapse: true,
    };

    expect(appReducer(prevState, action)).toEqual(expectedState);
    prevState = { ...expectedState };
  });

  it('should handle SET_ACTIVE_ROW', () => {
    const expectedState = {
      ...prevState,
      activeRow: { id: 1 },
    };

    const action = {
      type: APP_TYPE.SET_ACTIVE_ROW,
      activeRow: { id: 1 },
    };

    expect(appReducer(prevState, action)).toEqual(expectedState);
    prevState = { ...expectedState };
  });

  it('should handle PUSH_ROW_DETAILS_STACK', () => {
    const expectedState = {
      ...prevState,
      rowDetailStack: [{ type: 'transaction', id: 1 }],
    };

    const action = {
      type: APP_TYPE.PUSH_ROW_DETAILS_STACK,
      rowData: { type: 'transaction', id: 1 },
    };

    expect(appReducer(prevState, action)).toEqual(expectedState);
    prevState = { ...expectedState };
  });

  it('should avoid adding existing data to details stack', () => {
    const expectedState = {
      ...prevState,
      rowDetailStack: [{ type: 'transaction', id: 1 }],
    };

    const action = {
      type: APP_TYPE.PUSH_ROW_DETAILS_STACK,
      rowData: { type: 'transaction', id: 1 },
    };

    expect(appReducer(prevState, action)).toEqual(expectedState);
    prevState = { ...expectedState };
  });

  it('should handle SLICE_ROW_DETAILS', () => {
    prevState.rowDetailStack = [
      { type: 'transaction', id: 1 },
      { type: 'transaction', id: 2 },
    ];
    const expectedState = {
      ...prevState,
      rowDetailStack: [{ type: 'transaction', id: 2 }],
    };

    const action = {
      type: APP_TYPE.SLICE_ROW_DETAILS,
      rowData: { type: 'transaction', id: 1 },
    };

    expect(appReducer(prevState, action)).toEqual(expectedState);
    prevState = { ...expectedState };
  });

  it('should handle CLEAR_ROW_DETAILS_STACK', () => {
    prevState.rowDetailStack = [
      { type: 'transaction', id: 1 },
      { type: 'transaction', id: 2 },
    ];
    const expectedState = {
      ...prevState,
      rowDetailStack: [],
    };

    const action = {
      type: APP_TYPE.CLEAR_ROW_DETAILS_STACK,
    };

    expect(appReducer(prevState, action)).toEqual(expectedState);
    prevState = { ...expectedState };
  });

  it('should handle SET_TITLE', () => {
    const expectedState = {
      ...prevState,
      pageTitle: 'Dashboard',
    };

    const action = {
      type: APP_TYPE.SET_TITLE,
      pageTitle: 'Dashboard',
    };

    expect(appReducer(prevState, action)).toEqual(expectedState);
    prevState = { ...expectedState };
  });

  it('should handle SELECTED_ROWS', () => {
    const expectedState = {
      ...prevState,
      selectedRows: [1, 2, 3, 4],
    };

    const action = {
      type: TABLE_TYPE.SELECTED_ROWS,
      options: [1, 2, 3, 4],
    };

    expect(appReducer(prevState, action)).toEqual(expectedState);
    prevState = { ...expectedState };
  });

  it('should handle PAGINATION', () => {
    const expectedState = {
      ...prevState,
      tableOptions: {
        ...prevState.tableOptions,
        pagination: {
          page: 1,
        },
      },
    };

    const action = {
      type: TABLE_TYPE.PAGINATION,
      pagination: {
        page: 1,
      },
    };

    expect(appReducer(prevState, action)).toEqual(expectedState);
    prevState = { ...expectedState };
  });

  it('should handle SEARCH', () => {
    const expectedState = {
      ...prevState,
      tableOptions: {
        ...prevState.tableOptions,
        pagination: {
          ...prevState.tableOptions.pagination,
          startIndex: 0,
        },
        search: 'testing search',
      },
    };

    const action = {
      type: TABLE_TYPE.SEARCH,
      search: 'testing search',
    };

    expect(appReducer(prevState, action)).toEqual(expectedState);
    prevState = { ...expectedState };
  });

  it('should handle FILTER', () => {
    const expectedState = {
      ...prevState,
      tableOptions: {
        ...prevState.tableOptions,
        filter: [1, 2, 3, 4],
      },
    };

    const action = {
      type: TABLE_TYPE.FILTER,
      filter: [1, 2, 3, 4],
    };

    expect(appReducer(prevState, action)).toEqual(expectedState);
    prevState = { ...expectedState };
  });

  it('should handle CLEAR_FILTER', () => {
    const expectedState = {
      ...prevState,
      tableOptions: {
        ...prevState.tableOptions,
        filter: [],
      },
    };

    const action = {
      type: TABLE_TYPE.CLEAR_FILTER,
    };

    expect(appReducer(prevState, action)).toEqual(expectedState);
    prevState = { ...expectedState };
  });

  it('should handle SORT', () => {
    const expectedState = {
      ...prevState,
      tableOptions: {
        ...prevState.tableOptions,
        sort: {
          order: 'asc',
        },
      },
    };

    const action = {
      type: TABLE_TYPE.SORT,
      options: {
        order: 'asc',
      },
    };

    expect(appReducer(prevState, action)).toEqual(expectedState);
    prevState = { ...expectedState };
  });

  it('should handle RESET', () => {
    const expectedState = {
      ...prevState,
      selectedRows: [],
      activeRow: {},
      tableOptions: {
        ...DEFAULT_STATE.tableOptions,
        sort: {
          order: 'asc',
        },
      },
    };

    const action = {
      type: TABLE_TYPE.RESET,
      options: {
        sort: {
          order: 'asc',
        },
      },
    };

    expect(appReducer(prevState, action)).toEqual(expectedState);
    prevState = { ...expectedState };
  });
});
