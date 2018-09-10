// @flow
import { APP_TYPE, TABLE_TYPE } from 'store/constants';
import { IAction } from './flow-type';

export function setPageTitle(pageTitle: string = ''): IAction {
  return {
    type: APP_TYPE.SET_TITLE,
    pageTitle,
  };
}

export function setTableRow(options: Array<Object> = []): IAction {
  return {
    type: TABLE_TYPE.SELECTED_ROWS,
    options,
  };
}

export function setTableSearch(search: string = ''): IAction {
  return {
    type: TABLE_TYPE.SEARCH,
    search,
  };
}

export function setTableFilter(filter: Array<Object> = []): IAction {
  return {
    type: TABLE_TYPE.FILTER,
    filter,
  };
}

export function setTableSort(options: Object = {}): IAction {
  return {
    type: TABLE_TYPE.SORT,
    options,
  };
}

export function setTablePagination(pagination: Object = {}): IAction {
  return {
    type: TABLE_TYPE.PAGINATION,
    pagination: {
      pageSize: pagination.pageSize > 250 ? 250 : pagination.pageSize,
      startIndex: pagination.startIndex,
    },
  };
}

export function clearTableFilter(filter: Array<Object> = []): IAction {
  return {
    type: TABLE_TYPE.CLEAR_FILTER,
  };
}

export function resetTable(options: Object = {}): IAction {
  return {
    type: TABLE_TYPE.RESET,
    options,
  };
}

export function resetTableSelections(options: Object = {}): IAction {
  return {
    type: TABLE_TYPE.RESET_SELECTION,
    options,
  };
}

export function setActiveRow(activeRow: Object = {}): IAction {
  return {
    type: APP_TYPE.SET_ACTIVE_ROW,
    activeRow,
  };
}

export function pushToRowDetailStack(rowData: Object): IAction {
  return {
    type: APP_TYPE.PUSH_ROW_DETAILS_STACK,
    rowData,
  };
}

export function clearRowDetailStack(): IAction {
  return {
    type: APP_TYPE.CLEAR_ROW_DETAILS_STACK,
  };
}

export function sliceRowDetailStack(rowData: Object): IAction {
  return {
    type: APP_TYPE.SLICE_ROW_DETAILS,
    rowData,
  };
}

export function collapseSidebar(collapse: boolean = false): IAction {
  return {
    type: APP_TYPE.COLLAPSE_SIDEBAR,
    collapse,
  };
}
