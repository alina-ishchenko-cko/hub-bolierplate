// @flow
import * as React from 'react';
import {
  ThStyled,
  TableHeaderStyled,
  SortStyled,
  CheckBoxWrapStyled,
  ThRowStyled,
} from './TableHeader.sc';
import isEqual from 'lodash/isEqual';
import classNames from 'classnames';
import CkoCheckbox from 'components/ui/form/CkoCheckbox';
import CkoIcon from 'components/ui/icon/';

type Props = {
  hoverIndex: number,
  hasCheckBox: boolean,
  isReadOnly: boolean,
  columns: Array<Object>,
  tableOptions: Object,
  relatedRows: Array<Object>,
  clearRelatedRows: Function,
  onSort: Function,
  selectableTableParams: {
    selectedRows: Array<Object>,
    onRowSelect: Function,
  },
};

export default class TableHeader extends React.Component<Props> {
  shouldComponentUpdate(nextProps: Props) {
    return !isEqual(nextProps, this.props);
  }

  /**
   * Handles the table header checkbox event
   */
  handleSelectAll = (e: Object) => {
    let selectedRows = [];
    if (e.target.checked) {
      selectedRows = [...this.props.relatedRows];
    } else {
      this.props.clearRelatedRows();
    }
    this.props.selectableTableParams.onRowSelect(selectedRows);
  };

  onSortChange = (event: SyntheticEvent<any>) => {
    event.stopPropagation();
    const { sort } = this.props.tableOptions;
    let sortColumn = event.currentTarget.id;
    let sortOrder = 'desc';

    if (sort.sortColumn === sortColumn) {
      if (sort.sortOrder === 'desc') sortOrder = 'asc';
    }

    this.props.onSort({ sortColumn, sortOrder });
  };

  renderTable = () => {
    const { columns, tableOptions } = this.props;
    const showCheckBox = !!(
      this.props.selectableTableParams &&
      !this.props.isReadOnly &&
      !!(this.props.relatedRows.length > 2)
    );

    const checkBoxClassName = classNames({
      'checkbox-header': true,
      'show-checkbox-header': showCheckBox,
    });

    // Create Th with sort icon
    return columns.map((thData, thIndex) => {
      const isActiveSort = !!(
        thData.dataField === tableOptions.sort.sortColumn
      );

      const sortClassName = classNames({
        'th-sort': true,
        'active-sort': isActiveSort || this.props.hoverIndex === thIndex,
        desc: !!(isActiveSort && tableOptions.sort.sortOrder === 'desc'),
        asc: !!(isActiveSort && tableOptions.sort.sortOrder === 'asc'),
      });

      const width = thData.width || `${thData.fluidWidth}%`;

      return (
        <ThStyled
          className="cko-th"
          key={thData.key}
          width={width}
          align={thData.dataField === 'actions' ? 'right' : 'left'}>
          {/* Checkbox */}
          {this.props.hasCheckBox &&
            thIndex === 0 && (
              <CheckBoxWrapStyled className={checkBoxClassName}>
                <CkoCheckbox
                  label="Select all"
                  onChange={this.handleSelectAll}
                />
              </CheckBoxWrapStyled>
            )}

          {thData.title && <div className="th-value">{thData.title}</div>}
          {thData.dataField !== 'actions' &&
            thData.title && (
              <SortStyled
                className={sortClassName}
                onClick={this.onSortChange}
                id={thData.dataField}>
                <CkoIcon name="sort" />
              </SortStyled>
            )}
        </ThStyled>
      );
    });
  };

  render() {
    return (
      <TableHeaderStyled hasCheckBox={this.props.hasCheckBox}>
        <ThRowStyled>{this.renderTable()}</ThRowStyled>
      </TableHeaderStyled>
    );
  }
}
