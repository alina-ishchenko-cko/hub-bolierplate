// @flow
import * as React from 'react';
import TableHeader from './table-header';
import cloneDeep from 'lodash/cloneDeep';
import TableBody from './table-body';
import TableFooter from './table-footer';
import isEqual from 'lodash/isEqual';
import {
  TableWrapStyled,
  HeaderContainerStyled,
  ActionsStyled,
  LeftActionStyled,
  RightActionStyled,
  FilterWrapStyled,
  DividerStyled,
} from './Advanced.sc';
import { isUndefined } from 'utils/';
import { formatNumber } from 'utils/ui.util';
import classNames from 'classnames';
import CkoButton from 'components/ui/button';
import { FlexRow, FlexItem } from 'components/ui/flex/';
import TableFilterList from './table-filter-list';
import TableSearch from './table-search';
import { CkoLoadingBar } from 'components/ui/loading';
import withBrowserHistory from './withBrowserHistory';
import windowEvent from 'components/ui/windowEvent';
//export { default as TableContainer } from './table-container/';

type Props = {
  title: string,
  deviceWidth: number,
  isSidebarCollapsed: boolean,
  loading: boolean,
  isReadOnly: boolean,
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
  onPagination: Function,
  onCreatePayment: Function,
  onSort: Function,
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
  onSearch: Function,
  searchPlaceholder: string,
  relatedRowsParam: string,
  tableHeaderRight?: React.Node,
  isSearchable: boolean,
  onRowMouseEnter?: Function,
  onRowMouseLeave?: Function,
};

type State = {
  columnsList: Array<Object>,
  relatedRows: Array<Object>,
  headerFixed: boolean,
  valColumnWidth: number,
  filterActive: boolean,
  footerFixed: boolean,
  hoverIndex: number,
  contentWidth: number,
};

export class CkoAdvancedTable extends React.Component<Props, State> {
  static defaultProps = {
    title: '',
  };

  colValueNode: ?HTMLElement;
  state = {
    headerFixed: false,
    footerFixed: false,
    valColumnWidth: 0,
    columnsList: [],
    relatedRows: [],
    filterActive: false,
    hoverIndex: -1,
    contentWidth: 0,
  };
  wrapperRef: ?HTMLElement;

  /**
   * Add event listener
   */
  componentDidMount() {
    // For transaction only
    // Detect when then column value has changed and get the width
    if (this.colValueNode && this.colValueNode.addEventListener) {
      this.colValueNode.addEventListener(
        'DOMSubtreeModified',
        this.setValColumnWidth
      );
    }

    window.addEventListener('scroll', this.handleScroll);
  }

  componentDidUpdate(prevProps: Props) {
    if (
      !isEqual(prevProps.deviceWidth, this.props.deviceWidth) ||
      !isEqual(prevProps.isSidebarCollapsed, this.props.isSidebarCollapsed)
    ) {
      this.setContentWidth();
      return;
    }

    if (
      !this.shouldResizeByValue() &&
      !isEqual(prevProps.dataSource, this.props.dataSource)
    ) {
      this.setColumnsList(this.props);
    } else if (
      this.props.selectableTableParams &&
      !this.props.selectableTableParams.selectedRows.length
    ) {
      // Clear related row if selected rows is empty
      this.clearRelatedRows();
    }
  }

  shouldComponentUpdate(nextProps: Props, nextState: State) {
    const states = !isEqual(nextState, this.state);
    const props = !isEqual(nextProps, this.props);
    return states || props;
  }

  /**
   * Remove event listener
   */
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);

    if (this.colValueNode && this.shouldResizeByValue()) {
      this.colValueNode.removeEventListener(
        'DOMSubtreeModified',
        this.setValColumnWidth
      );
    }
  }

  setContentWidth = (e?: Object) => {
    // maximum container width = 1920
    const paddings = 80;
    const isInit = e === null;
    const sideBarWidth = this.props.isSidebarCollapsed ? 70 : 270;
    // 15px = Scrollbar
    const withoutScrollBar = this.props.deviceWidth - 15;
    const deviceWidth = withoutScrollBar <= 1920 ? withoutScrollBar : 1920;
    const contentWidth = deviceWidth - sideBarWidth - paddings;
    if (this.state.contentWidth !== contentWidth) {
      if (isInit === true && this.shouldResizeByValue()) {
        this.setState({ contentWidth }, this.setValColumnWidth);
      } else {
        this.setState({ contentWidth }, this.setColumnsList);
      }
    }
  };

  setValColumnWidth = () => {
    let valColumnWidth = 0;
    const { dataSource } = this.props;
    const nodeList = this.colValueNode
      ? this.colValueNode.querySelectorAll('.temp-wrap')
      : [];

    if (nodeList.length > 0 && dataSource.length === nodeList.length) {
      nodeList.forEach(node => {
        const nodeWidth = Math.ceil(node.offsetWidth / 10) * 10;
        if (nodeWidth > valColumnWidth) {
          valColumnWidth = nodeWidth;
        }
      });

      if (this.state.valColumnWidth !== valColumnWidth) {
        this.setState({ valColumnWidth }, this.setColumnsList);
      } else {
        this.setColumnsList();
      }
    }
  };

  getHiddenColumnsIndexes = (
    arr: Array<any> = [],
    val: any,
    key: string = ''
  ) => {
    const indexList = [];
    arr.forEach((data, index) => {
      if (data[key] === val) {
        indexList.push(index);
      }
    });
    return indexList;
  };

  /**
   * Get the fluidWidth value
   * objects with hide props
   * @param {array} indexList list index of object with hide props
   * @param {array} columns list of columns
   */
  getHiddenColumnsFluidWidth = (
    indexList: Array<any> = [],
    columns: Array<any> = []
  ) => {
    let totalWidth = 0;

    if (indexList.length === 1) {
      return columns[indexList[0]].fluidWidth;
    } else {
      indexList.forEach(index => {
        totalWidth += columns[index].fluidWidth;
      });
      return totalWidth;
    }
  };

  /**
   * Removes the columns with Hide props
   * @param {array} indexList list index of object with hide props
   * @param {array} columns list of columns
   */
  removeHiddenColumns = (
    indexList: Array<any> = [],
    columns: Array<any> = []
  ) => {
    const updatedColumns = [...columns];
    if (indexList.length === 1) {
      updatedColumns.splice(indexList[0], 1);
    } else {
      indexList.forEach(index => {
        updatedColumns.splice(index, 1);
      });
    }
    return updatedColumns;
  };

  removeColumnOnSmallScreen = (columnsList: Array<Object>): Array<Object> => {
    let columns = [...columnsList];
    const numOfFluidWith = columns.filter(
      data => !!(data.fluidWidth !== void 0 && !data.hide)
    ).length;
    const indexList = this.getHiddenColumnsIndexes(columns, true, 'hide');
    const totalWidth = this.getHiddenColumnsFluidWidth(indexList, columns);
    const width = totalWidth / numOfFluidWith;
    columns = this.removeHiddenColumns(indexList, columns);

    columns = columns.map(data => {
      if (data.fluidWidth) {
        data.fluidWidth += width;
      }
      return data;
    });
    return columns;
  };

  setColumnsList(nextProps?: Props) {
    const { contentWidth } = this.state;
    const { columns, dataSource } = nextProps || this.props;

    // Check if columns or dataSource exist
    if (columns.length || dataSource.length) {
      // Clone the object to avoid mutating the props directly
      let columnsList = cloneDeep(columns);

      // Remove columns with hide property
      // when device width is less then 1090px
      if (contentWidth <= 1090) {
        columnsList = this.removeColumnOnSmallScreen(columnsList);
      }

      // Update the first colum width (only for transaction)
      if (columnsList[0].resizeByValue) {
        columnsList[0].width = this.getDetailsColumnWidth();
      }

      // Get total width of the columns defined Px width
      const totalColumnsPxWidth = this.getColumnsPxWidth(columnsList);
      // Check if any columns has defined width in Px
      if (totalColumnsPxWidth > 0) {
        columnsList = this.convertFluidWidthToPx(
          columnsList,
          contentWidth,
          totalColumnsPxWidth
        );
      }
      this.setState(
        { columnsList, footerFixed: false },
        this.updateFooterPosition
      );
    }
  }

  updateFooterPosition() {
    const appFooter = document
      ? document.querySelector('#cko-table-footer')
      : null;
    if (appFooter) {
      const footerNode = appFooter.getBoundingClientRect();
      if (footerNode.bottom > window.innerHeight && !this.state.footerFixed) {
        this.setState({ footerFixed: true });
      }
    }
  }

  hasCheckBox(): boolean {
    return !!(
      !isUndefined(this.props.selectableTableParams) && !this.props.isReadOnly
    );
  }

  shouldResizeByValue(): boolean {
    const { columns } = this.props;
    if (!columns.length) {
      return false;
    }
    const hasResizeByValue = columns.filter(data => data.resizeByValue);
    return !!hasResizeByValue.length;
  }

  convertFluidWidthToPx(
    columnsList: Array<Object>,
    contentWidth: number,
    totalColumnsPxWidth: number
  ): Array<Object> {
    let count = 0;
    let widthRemaining = 0;
    // Subtract the contentWidth, total defined Px width and padding (60)
    // To get the remaining width left
    const contentWidthLeft = contentWidth - totalColumnsPxWidth - 60;
    const numOfFluidWidth = columnsList.filter(
      data => data.fluidWidth !== void 0
    );
    return columnsList.map(row => {
      // Get the percentage values from the container width
      if (row.fluidWidth !== void 0) {
        count++;

        // Get the percentage
        const rowWidth = row.fluidWidth / 100;
        // Convert to Int
        let width = parseInt((contentWidthLeft * rowWidth).toFixed(0), 10);
        if (count === numOfFluidWidth.length) {
          width = contentWidthLeft - widthRemaining - 1;
        } else {
          widthRemaining += width;
        }
        row.width = `${width}px`;
      }
      return row;
    });
  }

  getDetailsColumnWidth = () => {
    const paddings = 35;
    const scheme = 66 + 50; // 50 margin-right
    const totalWidth = this.state.valColumnWidth + scheme + paddings;
    return `${totalWidth}px`;
  };

  getColumnsPxWidth = (columns: Array<Object>): number => {
    const columnsWithPx = columns.filter(
      data => !!(data.fluidWidth === void 0)
    );

    if (!columnsWithPx.length) {
      return 0;
    }

    return columnsWithPx
      .map(data => parseInt(data.width.replace('px', ''), 10))
      .reduce((a, b) => a + b);
  };

  /**
   * Clears the relatedRows UI state
   */
  clearRelatedRows = () => {
    this.setState({ relatedRows: [] });
  };

  /**
   * Checks for related request status
   * and updates the relatedRows UI state
   */
  setRelatedRows = (selectedRow: Object) => {
    const { relatedRowsParam } = this.props;
    const relatedRows = this.props.dataSource.filter(
      row => row[relatedRowsParam] === selectedRow[relatedRowsParam]
    );
    this.setState({ relatedRows });
  };

  handleScroll = () => {
    const appHeader = document ? document.querySelector('#app-header') : null;
    const headerHeight = appHeader ? appHeader.offsetHeight : 0;
    const rect = this.wrapperRef ? this.wrapperRef.getBoundingClientRect() : {};

    if (rect.top <= headerHeight - 50 && !this.state.headerFixed) {
      this.setState({ headerFixed: true });
    } else if (rect.top >= headerHeight + 50 && this.state.headerFixed) {
      this.setState({ headerFixed: false });
    }
  };

  handleFilterChange = (options: Array<Object>) => {
    this.props.filterableTableParams.onFilter(options);
  };

  handleCellMouseEnter = (hoverIndex: number) => {
    if (this.state.hoverIndex !== hoverIndex) {
      this.setState({ hoverIndex });
    }
  };

  toggleFilter = () => {
    this.setState(
      prevState => ({
        filterActive: !prevState.filterActive,
      }),
      this.props.filterableTableParams.clearFilter
    );
  };

  renderColResizeWidth = () => {
    const { dataSource } = this.props;
    if (!dataSource.length) return '';
    return dataSource.map(data => (
      <span className="temp-wrap" key={data.id}>
        <span className="cko-currency-format">
          {formatNumber(data.value, data.currencySymbol)}
        </span>
        <span className="currency">{data.currencySymbol}</span>
      </span>
    ));
  };

  render() {
    const className = {
      action: classNames({
        'filter-active': this.state.filterActive,
      }),
      filter: classNames({
        'cko-filter-wrap': true,
        'filter-active': this.state.filterActive,
      }),
      filterBtn: classNames({
        'cko-filter-btn': true,
        'filter-active': this.state.filterActive,
      }),
      header: classNames({
        'cko-table-header': true,
        'th-fixed': this.state.headerFixed,
        'fix-wrap-width': this.state.headerFixed,
      }),
    };

    return (
      <TableWrapStyled className="cko-advanced-table">
        {this.shouldResizeByValue() && (
          <span
            className="hideColValue"
            ref={node => (this.colValueNode = node)}>
            {this.renderColResizeWidth()}
          </span>
        )}
        <div className="cko-table-inner" ref={node => (this.wrapperRef = node)}>
          <HeaderContainerStyled className={className.header}>
            {this.props.isSearchable && (
              <ActionsStyled className={className.action}>
                <FlexItem>
                  <FlexRow>
                    <LeftActionStyled>
                      {this.props.title && (
                        <span className="title">{this.props.title}</span>
                      )}

                      <TableSearch
                        placeholder={this.props.searchPlaceholder}
                        defaultValue={this.props.tableOptions.search || ''}
                        onSearch={this.props.onSearch}
                      />

                      <DividerStyled className="divider" />

                      {/* -- Filter Btn -- */}
                      {this.props.filterableTableParams && (
                        <CkoButton
                          icon="filter"
                          value="Filters"
                          onClick={this.toggleFilter}
                          className={className.filterBtn}>
                          <span className="close-text">Close</span>
                        </CkoButton>
                      )}
                    </LeftActionStyled>
                    {this.props.tableHeaderRight && (
                      <RightActionStyled>
                        {this.props.tableHeaderRight}
                      </RightActionStyled>
                    )}
                  </FlexRow>
                </FlexItem>

                <FlexItem>
                  <FilterWrapStyled className={className.filter}>
                    {this.state.filterActive && (
                      <TableFilterList
                        totalRows={this.props.totalRows}
                        onChange={this.handleFilterChange}
                        filters={this.props.filterableTableParams.filters}
                      />
                    )}
                  </FilterWrapStyled>
                </FlexItem>
              </ActionsStyled>
            )}
            <TableHeader
              hoverIndex={this.state.hoverIndex}
              hasCheckBox={this.hasCheckBox()}
              columns={this.state.columnsList}
              tableOptions={this.props.tableOptions}
              relatedRows={this.state.relatedRows}
              clearRelatedRows={this.clearRelatedRows}
              onSort={this.props.onSort}
              isReadOnly={this.props.isReadOnly}
              selectableTableParams={this.props.selectableTableParams}
            />
            {<CkoLoadingBar />}
          </HeaderContainerStyled>
          <TableBody
            loading={this.props.loading}
            columns={this.state.columnsList}
            dataSource={this.props.dataSource}
            relatedRows={this.state.relatedRows}
            setRelatedRows={this.setRelatedRows}
            selectableTableParams={this.props.selectableTableParams}
            clickableTableParams={this.props.clickableTableParams}
            clearRelatedRows={this.clearRelatedRows}
            isReadOnly={this.props.isReadOnly}
            hasCheckBox={this.hasCheckBox()}
            onCellMouseEnter={this.handleCellMouseEnter}
            onRowMouseEnter={this.props.onRowMouseEnter}
            onRowMouseLeave={this.props.onRowMouseLeave}
          />
          <TableFooter
            isFixed={!!this.state.footerFixed}
            tableOptions={this.props.tableOptions}
            totalRows={this.props.totalRows}
            onPagination={this.props.onPagination}
          />
        </div>
      </TableWrapStyled>
    );
  }
}

const wrapWindow = windowEvent(CkoAdvancedTable, {
  resize: true,
});
export default withBrowserHistory(wrapWindow);
