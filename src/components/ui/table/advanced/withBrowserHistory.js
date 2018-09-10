// @flow
import * as React from 'react';
import isEqual from 'lodash/isEqual';
import isEmpty from 'lodash/isEmpty';
import toInteger from 'lodash/toInteger';
import { urlParamsToJson } from 'utils';

type Props = {
  title: string,
  selectable?: boolean,
  pathname: string,
  isReadOnly: boolean,
  disablePayment: boolean,
  loading: boolean,
  location: Object,
  history: Object,
  rowDetailStack: Array<Object>,
  activeRow: Object,
  selected: Object,
  fromDate: Object,
  toDate: Object,
  selectedRows: Array<Object>,
  refresh: boolean,
  fetchData: Function,
  setActiveRow: Function,
  pushToRowDetailStack: Function,
  sliceRowDetailStack: Function,
  clearRowDetailStack: Function,
  setTableRow: Function,
  onSearch: Function,
  setTableFilter: Function,
  onSort: Function,
  clearTableFilter: Function,
  onPagination: Function,
  resetTable: Function,
  setPageTitle: Function,
  dataSource: Array<Object>,
  columns: Array<Object>,
  tableOptions: {
    search: string,
    sort: Object,
    filter: Array<Object>,
    pagination: {
      pageSize: number,
      startIndex: number,
    },
  },
  onCreatePayment: Function,
  totalRows: number,
  onClickAction: Function,
  selectableTableParams: {
    selectedRows: Array<Object>,
    onRowSelect: Function,
  },
  clickableTableParams: {
    onRowClick: Function,
    activeRow: Object,
  },
  filterableTableParams: {
    filters: Array<Object>,
    onFilter: Function,
    clearFilter: Function,
  },
  searchPlaceholder: string,
  relatedRowsParam: string,
  tableHeaderRight?: React.Node,
  isSearchable: boolean,
  onRowMouseEnter?: Function,
  onRowMouseLeave?: Function,
  resetTableSelections: Function,
};

export default function(CkoAdvancedTable: any) {
  return class TableWithAction extends React.Component<Props> {
    componentDidMount() {
      const urlParams = this.getUrlParams();
      const tableOptionsParams = this.getTableOptionsParams();
      // Clear the active row
      this.props.clearRowDetailStack();

      // Make request to get the table data is urlParms is empty
      // Or if urlParms is Not empty and the params are the same
      if (isEmpty(urlParams) || isEqual(urlParams, tableOptionsParams)) {
        this.getTableData();
      } else {
        this.updateTableOptions(urlParams);
      }
    }

    componentDidUpdate(prevProps: Props) {
      const urlParams = this.getUrlParams();
      const tableOptionsParams = this.getTableOptionsParams();
      // Refresh the page if refresh OR default Params has changed
      const hasDateOrEntityIDChanged =
        this.props.refresh || this.hasDefaultParamsChanged(prevProps);

      if (hasDateOrEntityIDChanged) {
        // If URL Params is empty OR startIndex is 0
        // Fetch table data
        if (
          isEmpty(urlParams) ||
          (urlParams.startIndex === 0 && urlParams.search === '')
        ) {
          this.getTableData();
        } else {
          // If browser history startIndex is > 0 then reset it back to zero
          this.updateTableOptions({ startIndex: 0, search: '' });
        }
        return;
      }

      if (this.hasTableOptionsChanged(prevProps)) {
        // When detech URL params changed,
        // update the URL params and Fetch table data
        this.updateUrlParamsAndGetTableData();
      } else if (this.hasHistoryChanged(prevProps)) {
        if (isEmpty(this.props.location.search)) {
          // If browser history is empty, then reset startIndex to zero
          this.updateTableOptions({ startIndex: 0 });
        } else if (!isEqual(urlParams, tableOptionsParams)) {
          // If browser history and tableOptions are different
          // Update the tableOptions with browser history params
          this.updateTableOptions(urlParams);
        }
      }
    }

    componentWillUnmount() {
      this.props.resetTable();
      this.props.clearRowDetailStack();
    }

    hasTableOptionsChanged(prevProps: Props) {
      return !isEqual(prevProps.tableOptions, this.props.tableOptions);
    }

    /**
     * Checks if the required props value has updated
     */
    hasDefaultParamsChanged(prevProps: Props) {
      return (
        !isEqual(this.props.selected, prevProps.selected) ||
        !isEqual(this.props.fromDate, prevProps.fromDate) ||
        !isEqual(this.props.toDate, prevProps.toDate)
      );
    }

    hasHistoryChanged(prevProps: Props) {
      return !isEqual(prevProps.location.search, this.props.location.search);
    }

    updateTableOptions(urlParams: Object) {
      const { sort, pagination, search } = this.props.tableOptions;
      const { sortColumn, sortOrder, pageSize, startIndex } = urlParams;
      const searchKeyword =
        urlParams.search !== void 0 ? urlParams.search : search;
      const sortParams = {
        sortColumn: sortColumn !== void 0 ? sortColumn : sort.sortColumn,
        sortOrder: sortOrder !== void 0 ? sortOrder : sort.sortOrder,
      };
      const paginationParams = {
        pageSize: pageSize !== void 0 ? pageSize : pagination.pageSize,
        startIndex: startIndex !== void 0 ? startIndex : pagination.startIndex,
      };

      this.props.onSearch(searchKeyword);
      this.props.onSort(sortParams);
      this.props.onPagination(paginationParams);
    }

    getUrlParams() {
      const { location } = this.props;
      if (!isEmpty(location.search)) {
        const urlParams = urlParamsToJson(location.search);
        if (urlParams.pageSize) {
          urlParams.pageSize = toInteger(urlParams.pageSize);
        }
        if (urlParams.startIndex) {
          urlParams.startIndex = toInteger(urlParams.startIndex);
        }

        return urlParams;
      }
      return {};
    }

    getTableData() {
      const { toDate, fromDate, selected, tableOptions } = this.props;

      const params = {
        toDate,
        fromDate,
        accountId: selected.account.id,
        businessId: selected.business.id,
        channelId: selected.channel.id,
        ...tableOptions.pagination,
        ...tableOptions.sort,
      };

      // Search
      if (tableOptions.search !== '') {
        params.search = tableOptions.search;
      }

      // Filter
      if (tableOptions.filter.length > 0) {
        params.filter = tableOptions.filter;
      }

      this.clearSelectedRows();

      // accountId is required
      if (params.accountId) {
        this.props.fetchData(params);
      }
    }

    getTableOptionsParams() {
      const { tableOptions } = this.props;
      return {
        search: tableOptions.search,
        ...tableOptions.sort,
        ...tableOptions.pagination,
      };
    }

    updateUrlParamsAndGetTableData(): void {
      const urlParams = this.getTableOptionsParams();
      const search = Object.keys(urlParams)
        .map(key => `${key}=${urlParams[key]}`)
        .join('&');

      this.props.history.push({
        search: `?${search}`,
        pathname: this.props.location.pathname,
      });

      this.getTableData();
    }

    handlePagination = (options: Object) => {
      const params = {
        ...this.props.tableOptions.pagination,
        ...options,
      };
      this.props.onPagination(params);
    };

    handleRowClick = (data: Object) => {
      this.clearSelectedRows();
      this.props.clearRowDetailStack();
      this.props.setActiveRow(data);
      if (data.id) {
        this.props.pushToRowDetailStack(data);
      }
    };

    clearSelectedRows() {
      this.props.resetTableSelections();
      this.props.clearRowDetailStack();
    }

    render() {
      const props = {
        ...this.props,
        clickableTableParams: {
          onRowClick: this.handleRowClick,
          activeRow: this.props.activeRow,
        },
        onPagination: this.handlePagination,
      };

      if (props.selectable) {
        props.selectableTableParams = {
          selectedRows: this.props.selectedRows,
          onRowSelect: this.props.setTableRow,
        };
      }

      if (props.filterableTableParams) {
        props.filterableTableParams = {
          ...this.props.filterableTableParams,
          onFilter: this.props.setTableFilter,
          clearFilter: this.props.clearTableFilter,
        };
      }

      return <CkoAdvancedTable {...props} />;
    }
  };
}
