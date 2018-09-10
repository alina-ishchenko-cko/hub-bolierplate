// @flow
import * as React from 'react';
import findIndex from 'lodash/findIndex';
import isEqual from 'lodash/isEqual';
import CkoCheckbox from 'components/ui/form/CkoCheckbox';
import CkoLoading from 'components/ui/loading/';
import {
  TableContainerStyled,
  TableWrapStyled,
  CheckBoxWrapStyled,
  DividerTitleStyled,
} from './TableBody.sc';
import TableCell from './table-cell';
import TableRow from './table-row';

type Props = {
  loading: boolean,
  columns: Array<Object>,
  dataSource: Array<Object>,
  relatedRows: Array<Object>,
  setRelatedRows: Function,
  clearRelatedRows: Function,
  selectableTableParams: {
    selectedRows: Array<Object>,
    onRowSelect: Function,
  },
  clickableTableParams: {
    onRowClick: Function,
    activeRow: Object,
  },
  isReadOnly: boolean,
  hasCheckBox: boolean,
  onCellMouseEnter?: Function,
  onCellMouseLeave?: Function,
  onRowMouseEnter?: Function,
  onRowMouseLeave?: Function,
};

export default class TableBody extends React.Component<Props> {
  componentWillReceiveProps(nextProps: Props) {
    if (!isEqual(nextProps.dataSource, this.props.dataSource)) {
      this.props.clearRelatedRows();
    }
  }

  shouldComponentUpdate(nextProps: Props) {
    return !isEqual(nextProps, this.props);
  }

  getTrDataByIndex(rowIndex: number) {
    return this.props.dataSource[rowIndex];
  }

  /**
   * Handles table checkout events
   */
  handleRowSelect = (e: any) => {
    const trIndex = e.target['data-index'];
    const row = this.getTrDataByIndex(trIndex);
    const selectedRows = [...this.props.selectableTableParams.selectedRows];
    const selectedRowIndex = findIndex(
      selectedRows,
      selectedRow => selectedRow.id === row.id
    );
    // Check if row exist in selectedRows
    if (selectedRowIndex === -1) {
      // Add row to the selectedRows store state
      selectedRows.push(row);
      this.props.setRelatedRows(row);
    } else {
      //If checkox is unchecked remove the row from the selectedRows
      selectedRows.splice(selectedRowIndex, 1);
      //this.props.clearRelatedRows();
    }
    // Update the selectedRows store state
    this.props.selectableTableParams.onRowSelect(selectedRows);
  };

  /**
   * Row click event handler
   */
  onRowClick = (index: number, data: any) => {
    if (this.props.clickableTableParams) {
      this.props.clickableTableParams.onRowClick(
        this.props.clickableTableParams.activeRow.id === data.id ? {} : data
      );
    }
  };

  /**
   * Add CSS selector to table rows
   */
  trClassFormat = (row: any) => {
    if (this.props.clickableTableParams) {
      if (
        this.props.clickableTableParams.activeRow.id &&
        this.props.clickableTableParams.activeRow.id === row.id
      ) {
        return 'active-row';
      }

      if (
        this.props.clickableTableParams.activeRow.id ||
        !this.props.hasCheckBox
      ) {
        return 'hide-checkbox';
      }
    }

    if (this.props.selectableTableParams) {
      const {
        selectableTableParams: { selectedRows },
        relatedRows,
      } = this.props;
      const rowFound = findIndex(
        selectedRows,
        selectedRow => selectedRow.id === row.id
      );
      const inRelatedRows = findIndex(relatedRows, data => data.id === row.id);
      if (rowFound >= 0 || inRelatedRows >= 0) {
        return 'show-checkbox';
      }
    }

    return '';
  };

  renderCheckbox = (rowIndex: number): React.Node => {
    const { relatedRows } = this.props;

    // Table body checkbox
    const rowData = this.getTrDataByIndex(rowIndex);
    const isChecked = !!(
      findIndex(
        this.props.selectableTableParams.selectedRows,
        data => data.id === rowData.id
      ) >= 0
    );
    const inRelated = !!(
      findIndex(relatedRows, data => data.id === rowData.id) >= 0
    );

    return (
      <CheckBoxWrapStyled className="checkbox-wrap">
        <CkoCheckbox
          checked={isChecked}
          disabled={!!(relatedRows.length > 0 && !inRelated)}
          onChange={this.handleRowSelect}
          data-index={rowIndex}
        />
      </CheckBoxWrapStyled>
    );
  };

  /**
   * Return TableHeaderColumns
   */
  renderTableColumns(): Array<React.Node> {
    const { columns, dataSource } = this.props;

    // Check if columns or dataSource exist
    if (columns.length === 0 || dataSource.length === 0) {
      return [];
    }

    return dataSource.map((row, rowIndex) => (
      <TableRow
        key={row.key}
        data={row}
        index={rowIndex}
        onClick={this.onRowClick}
        onMouseEnter={this.props.onRowMouseEnter}
        onMouseLeave={this.props.onRowMouseLeave}
        className={this.trClassFormat(row)}>
        {row.dividerTitle && (
          <DividerTitleStyled>{row.dividerTitle}</DividerTitleStyled>
        )}

        {/* Td */}
        {!row.dividerTitle &&
          columns.map((column, columnIndex) => {
            const width = column.width || `${column.fluidWidth}%`;
            return (
              <TableCell
                key={column.key}
                index={columnIndex}
                width={width}
                onMouseEnter={this.props.onCellMouseEnter}
                onMouseLeave={this.props.onCellMouseLeave}
                className={column.columnClassName || ''}>
                {/* With Checkbox */}
                {this.props.hasCheckBox && columnIndex === 0 ? (
                  <div className="td-with-checkbox">
                    {this.renderCheckbox(rowIndex)}
                    {column.render ? (
                      column.render(row[column.dataField], row, rowIndex)
                    ) : (
                      <div className="td-value">{row[column.key]}</div>
                    )}
                  </div>
                ) : column.render ? (
                  column.render(row[column.dataField], row, rowIndex)
                ) : (
                  <div className="td-value">{row[column.key] || 'N/A'}</div>
                )}
              </TableCell>
            );
          })}
      </TableRow>
    ));
  }

  render() {
    const hasData = !!this.props.dataSource.length;
    return (
      <TableContainerStyled className="cko-table-body">
        {this.props.loading && (
          <CkoLoading withInfo show={this.props.loading} />
        )}
        {!this.props.loading && (
          <TableWrapStyled
            className="cko-table-wrap"
            hasCheckBox={this.props.hasCheckBox}>
            {hasData && this.renderTableColumns()}
            {!hasData && <div className="no-data">No results</div>}
          </TableWrapStyled>
        )}
      </TableContainerStyled>
    );
  }
}
