import * as actions from '../appActions';
import { APP_TYPE, TABLE_TYPE } from '../../constants';

describe('AppActions', () => {
  it('should handle setPageTitle()', () => {
    // Exepected Actions
    const expectedActions = {
      type: APP_TYPE.SET_TITLE,
      pageTitle: 'Dashboard',
    };

    expect(actions.setPageTitle('Dashboard')).toEqual(expectedActions);
  });

  it('should handle setTableRow()', () => {
    // Exepected Actions
    const expectedActions = {
      type: TABLE_TYPE.SELECTED_ROWS,
      options: [{ id: 1, title: 'test' }],
    };

    expect(actions.setTableRow([{ id: 1, title: 'test' }])).toEqual(
      expectedActions
    );
  });

  it('should handle setTableSearch()', () => {
    // Exepected Actions
    const expectedActions = {
      type: TABLE_TYPE.SEARCH,
      search: 'test',
    };

    expect(actions.setTableSearch('test')).toEqual(expectedActions);
  });

  it('should handle setTableFilter()', () => {
    // Exepected Actions
    const expectedActions = {
      type: TABLE_TYPE.FILTER,
      filter: [{ id: 1, title: 'test' }, { id: 2, title: 'test 2' }],
    };

    expect(
      actions.setTableFilter([
        { id: 1, title: 'test' },
        { id: 2, title: 'test 2' },
      ])
    ).toEqual(expectedActions);
  });

  it('should handle setTableSort()', () => {
    // Exepected Actions
    const expectedActions = {
      type: TABLE_TYPE.SORT,
      options: {
        order: 'des',
      },
    };

    expect(
      actions.setTableSort({
        order: 'des',
      })
    ).toEqual(expectedActions);
  });

  it('should handle setTablePagination()', () => {
    // Exepected Actions
    const expectedActions = {
      type: TABLE_TYPE.PAGINATION,
      pagination: {
        pageSize: 10,
        startIndex: 50,
      },
    };

    expect(
      actions.setTablePagination({
        pageSize: 10,
        startIndex: 50,
      })
    ).toEqual(expectedActions);
  });

  it('should handle setTablePagination() max pageSize', () => {
    // Exepected Actions
    const expectedActions = {
      type: TABLE_TYPE.PAGINATION,
      pagination: {
        pageSize: 250,
        startIndex: 50,
      },
    };

    expect(
      actions.setTablePagination({
        pageSize: 1000,
        startIndex: 50,
      })
    ).toEqual(expectedActions);
  });

  it('should handle clearTableFilter()', () => {
    // Exepected Actions
    const expectedActions = {
      type: TABLE_TYPE.CLEAR_FILTER,
    };

    expect(actions.clearTableFilter()).toEqual(expectedActions);
  });

  it('should handle resetTable()', () => {
    // Exepected Actions
    const expectedActions = {
      type: TABLE_TYPE.RESET,
      options: {
        sort: 'des',
      },
    };

    expect(
      actions.resetTable({
        sort: 'des',
      })
    ).toEqual(expectedActions);
  });

  it('should handle resetTableSelections()', () => {
    // Exepected Actions
    const expectedActions = {
      type: TABLE_TYPE.RESET_SELECTION,
      options: {
        sort: 'des',
      },
    };

    expect(
      actions.resetTableSelections({
        sort: 'des',
      })
    ).toEqual(expectedActions);
  });

  it('should handle setActiveRow()', () => {
    // Exepected Actions
    const expectedActions = {
      type: APP_TYPE.SET_ACTIVE_ROW,
      activeRow: {
        id: 1,
        title: 'test',
      },
    };

    expect(
      actions.setActiveRow({
        id: 1,
        title: 'test',
      })
    ).toEqual(expectedActions);
  });

  it('should handle pushToRowDetailStack()', () => {
    // Exepected Actions
    const expectedActions = {
      type: APP_TYPE.PUSH_ROW_DETAILS_STACK,
      rowData: {
        id: 1,
        type: 'test',
      },
    };

    expect(
      actions.pushToRowDetailStack({
        id: 1,
        type: 'test',
      })
    ).toEqual(expectedActions);
  });

  it('should handle clearRowDetailStack()', () => {
    // Exepected Actions
    const expectedActions = {
      type: APP_TYPE.CLEAR_ROW_DETAILS_STACK,
    };
    expect(actions.clearRowDetailStack()).toEqual(expectedActions);
  });

  it('should handle sliceRowDetailStack()', () => {
    // Exepected Actions
    const expectedActions = {
      type: APP_TYPE.SLICE_ROW_DETAILS,
      rowData: {
        id: 1,
        type: 'test',
      },
    };

    expect(
      actions.sliceRowDetailStack({
        id: 1,
        type: 'test',
      })
    ).toEqual(expectedActions);
  });

  it('should handle collapseSidebar()', () => {
    // Exepected Actions
    const expectedActions = {
      type: APP_TYPE.COLLAPSE_SIDEBAR,
      collapse: true,
    };

    expect(actions.collapseSidebar(true)).toEqual(expectedActions);
  });
});
