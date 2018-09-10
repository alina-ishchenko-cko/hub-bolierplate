// @flow
import * as React from 'react';
import {
  FooterWrapStyled,
  FootLeftStyled,
  FootCenterStyled,
  FootRightStyled,
} from './TableFooter.sc';
import classNames from 'classnames';
import isEqual from 'lodash/isEqual';
import Input from 'antd/lib/input';
import debounce from 'lodash/debounce';
import CkoPagination from 'components/ui/pagination/';
import Dropdown from 'antd/lib/dropdown';
import Menu from 'antd/lib/menu';

type Props = {
  isFixed: boolean,
  tableOptions: {
    pagination: {
      pageSize: number,
      startIndex: number,
    },
  },
  totalRows: number,
  onPagination: Function,
};

export default class TableFooter extends React.Component<Props> {
  shouldComponentUpdate(nextProps: Props) {
    return !isEqual(nextProps, this.props);
  }

  dropdwnNode: ?HTMLDivElement;
  inputHandler = debounce(this.inputHandler, 300);

  getCurrentPage() {
    const { pageSize, startIndex } = this.props.tableOptions.pagination;
    return startIndex / pageSize + 1;
  }

  /**
   * Pagination quick type handler
   */
  onChangePagination = (e: SyntheticEvent<HTMLInputElement>) => {
    const value = parseInt(e.currentTarget.value, 10);
    this.inputHandler(value);
  };

  inputHandler(startIndex: number): void {
    this.onClickPagination(startIndex);
  }

  /**
   * Pagination click handler
   */
  onClickPagination = (startIndex: number) => {
    const value = startIndex - 1;
    const { pageSize } = this.props.tableOptions.pagination;
    const newIndex = pageSize * value;
    this.props.onPagination({ startIndex: newIndex });
  };

  /**
   * Handles the number of rows to show change
   * calls the props.onChange()
   */
  onChangePageSize = (menuOption: Object): void => {
    const pageSize = parseInt(menuOption.key, 10);
    this.props.onPagination({
      pageSize,
      startIndex: 0,
    });
  };

  /**
   * Creates the dropdown options
   * for the number of rows to show
   * @returns {React}
   */
  renderNumOfRowsOptions(): React.Node {
    return (
      <Menu onClick={this.onChangePageSize}>
        {[10, 25, 50, 100, 250].map(rowNum => (
          <Menu.Item key={rowNum}>Showing {rowNum} rows</Menu.Item>
        ))}
      </Menu>
    );
  }

  render() {
    const { tableOptions, totalRows } = this.props;
    const className = classNames({
      'footer-fixed': true,
      'fix-wrap-width': this.props.isFixed,
    });
    return (
      <FooterWrapStyled
        className={className}
        isFixed={this.props.isFixed}
        id="cko-table-footer">
        {totalRows > 0 && (
          <div className="fixed-wrap clearfix">
            <FootLeftStyled>
              <div
                className="drop-down-wrap"
                ref={node => (this.dropdwnNode = node)}
              />
              <Dropdown.Button
                trigger={['click']}
                placement="topCenter"
                overlay={this.renderNumOfRowsOptions()}
                getPopupContainer={() => this.dropdwnNode}>
                Showing {tableOptions.pagination.pageSize} rows
              </Dropdown.Button>
            </FootLeftStyled>

            <FootCenterStyled>
              <CkoPagination
                current={this.getCurrentPage()}
                pageSize={tableOptions.pagination.pageSize}
                onChange={this.onClickPagination}
                total={totalRows}
              />
            </FootCenterStyled>

            <FootRightStyled>
              <div>
                <span>Go to page </span>
                <Input
                  defaultValue={this.getCurrentPage()}
                  onChange={this.onChangePagination}
                />
              </div>
            </FootRightStyled>
          </div>
        )}
      </FooterWrapStyled>
    );
  }
}
