// @flow
import { buildReducer } from 'utils/reducer.util';
import { APP_TYPE, TABLE_TYPE } from 'store/constants';

type State = {
  pageTitle: string,
  isSidebarCollapsed: boolean,
  tableOptions: {
    search: string,
    sort: Object,
    filter: Array<Object>,
    pagination: {
      pageSize: number,
      startIndex: number,
    },
  },
  selectedRows: Array<Object>,
  rowDetailStack: Array<Object>,
  activeRow: Object,
};

const DEFAULT_STATE: State = {
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

const handlers = {
  /**
   * Set Table active row
   */
  [APP_TYPE.COLLAPSE_SIDEBAR]: (state: Object, action: Object) => ({
    ...state,
    isSidebarCollapsed: action.collapse,
  }),
  /**
   * Set Table active row
   */
  [APP_TYPE.SET_ACTIVE_ROW]: (state: Object, action: Object) => ({
    ...state,
    activeRow: action.activeRow,
  }),
  /**
   * Set Row Details
   */
  [APP_TYPE.PUSH_ROW_DETAILS_STACK]: (state: Object, action: Object) => {
    const rowData = action.rowData;
    const rowDetailStack = [...state.rowDetailStack];
    const dataExist = rowDetailStack.findIndex(data => {
      return data.id === rowData.id && data.type === rowData.type;
    });

    if (rowDetailStack.length >= 2 && matchesPrevRow(rowDetailStack, rowData)) {
      rowDetailStack.splice(rowDetailStack.length - 1, 1);
    } else if (dataExist === -1) {
      rowDetailStack.push(rowData);
    }
    return {
      ...state,
      rowDetailStack,
    };
  },
  /**
   * Clear Single Row Details
   */
  [APP_TYPE.SLICE_ROW_DETAILS]: (state: Object, action: Object) => {
    const rowData = action.rowData;
    const rowDetailStack = [...state.rowDetailStack].filter(
      data => data.id !== rowData.id
    );
    return {
      ...state,
      rowDetailStack,
    };
  },
  /**
   * Clear All Row Details
   */
  [APP_TYPE.CLEAR_ROW_DETAILS_STACK]: (state: Object) => ({
    ...state,
    rowDetailStack: [],
  }),
  /**
   * Set view title
   */
  [APP_TYPE.SET_TITLE]: (state: Object, { pageTitle }) => ({
    ...state,
    pageTitle,
  }),
  /**
   * Set Selected rows
   */
  [TABLE_TYPE.SELECTED_ROWS]: (state: Object, action: Object) => ({
    ...state,
    selectedRows: [...action.options],
  }),
  /**
   * Set pagination
   */
  [TABLE_TYPE.PAGINATION]: (state: Object, action: Object) => ({
    ...state,
    tableOptions: {
      ...state.tableOptions,
      pagination: { ...action.pagination },
    },
  }),
  /**
   * Set table search
   */
  [TABLE_TYPE.SEARCH]: (state: Object, action: Object) => ({
    ...state,
    tableOptions: {
      ...state.tableOptions,
      pagination: {
        ...state.tableOptions.pagination,
        startIndex: 0,
      },
      search: action.search,
    },
  }),
  /**
   * Set table filter
   */
  [TABLE_TYPE.FILTER]: (state: Object, action: Object) => ({
    ...state,
    tableOptions: {
      ...state.tableOptions,
      filter: [...action.filter],
    },
  }),
  /**
   * clear table filter
   */
  [TABLE_TYPE.CLEAR_FILTER]: (state: Object, action: Object) => ({
    ...state,
    tableOptions: {
      ...state.tableOptions,
      filter: [],
    },
  }),
  /**
   * Set table sort
   */
  [TABLE_TYPE.SORT]: (state: Object, action: Object) => ({
    ...state,
    tableOptions: {
      ...state.tableOptions,
      sort: { ...action.options },
    },
  }),
  /**
   * Reset Table Row Selection
   */
  [TABLE_TYPE.RESET_SELECTION]: (state: Object, action: Object) => ({
    ...state,
    selectedRows: [],
    activeRow: {},
  }),
  /**
   * Reset table
   */
  [TABLE_TYPE.RESET]: (state: Object, action: Object) => ({
    ...state,
    selectedRows: [],
    activeRow: {},
    tableOptions: {
      ...DEFAULT_STATE.tableOptions,
      ...action.options,
    },
  }),
};

function matchesPrevRow(activeRows: Array<Object>, rowData: Object) {
  const lastActiveRow = activeRows[activeRows.length - 2];
  return !!(
    lastActiveRow.id === rowData.id && lastActiveRow.type === rowData.type
  );
}

export default buildReducer(handlers, DEFAULT_STATE);
