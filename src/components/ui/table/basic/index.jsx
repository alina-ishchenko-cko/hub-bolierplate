// @flow
import * as React from 'react';
import Table from 'antd/lib/table';
import {
  TableWrapStyled,
  TableHeaderStyled,
  HeaderLeftStyled,
  HeaderRightStyled,
} from './CkoTable.sc';
import isEqual from 'lodash/isEqual';

type Props = {
  loading?: boolean,
  title?: string,
  columns: Array<Object>,
  dataSource: Array<Object>,
  headerLeft?: React.Node,
  headerRight?: React.Node,
  tabs?: {
    activeTab: string,
    data: Array<Object>,
  },
  onTabChange?: Function,
  expandedRowRender?: Function,
  onExpand?: Function,
  onRow?: Function,
};

export default class CkoTable extends React.Component<Props> {
  shouldComponentUpdate(nextProps: Props) {
    return this.hasPropsChanged(nextProps);
  }

  hasPropsChanged(nextProps: Props): boolean {
    return !isEqual(this.props, nextProps);
  }

  render() {
    const { title, headerLeft, headerRight, tabs } = this.props;
    return (
      <TableWrapStyled className="cko-table">
        <TableHeaderStyled>
          {(title || tabs || headerLeft) && (
            <HeaderLeftStyled>
              {title && <span className="title">{title}</span>}
              <div className="content">{headerLeft}</div>
            </HeaderLeftStyled>
          )}

          {headerRight && <HeaderRightStyled>{headerRight}</HeaderRightStyled>}
        </TableHeaderStyled>
        <Table
          dataSource={this.props.dataSource}
          pagination={false}
          columns={this.props.columns}
          expandedRowRender={this.props.expandedRowRender}
          expandRowByClick={!!this.props.expandedRowRender}
          onExpand={this.props.onExpand}
          onRow={this.props.onRow}
        />
      </TableWrapStyled>
    );
  }
}
