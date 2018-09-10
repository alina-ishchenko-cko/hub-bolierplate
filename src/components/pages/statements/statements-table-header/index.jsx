// @flow
import React from 'react';

import {
  StatementsTableHeaderContainer,
  StatementsTableHeaderGroup,
  StatementsTableHeaderItemTitle,
  MonthHeaderItem,
  DayCreatedItem,
  StatementPeriodItem,
  StatusItem,
  AmountItem,
  StatementIdItem,
  DownloadItem,
} from './StatementsTableHeader.sc';
import type { ColumnDimensionMap } from '../types';

type Props = {
  isSidebarCollapsed: boolean,
  columnDimensions: ColumnDimensionMap,
};

export default class StatementsTableHeader extends React.Component<Props> {
  render() {
    return (
      <StatementsTableHeaderContainer
        isSidebarCollapsed={this.props.isSidebarCollapsed}>
        <StatementsTableHeaderGroup>
          <MonthHeaderItem
            dimensions={this.props.columnDimensions.month}
            isSidebarCollapsed={this.props.isSidebarCollapsed}>
            <StatementsTableHeaderItemTitle>
              Month
            </StatementsTableHeaderItemTitle>
          </MonthHeaderItem>
          <DayCreatedItem
            dimensions={this.props.columnDimensions.dayCreated}
            isSidebarCollapsed={this.props.isSidebarCollapsed}>
            <StatementsTableHeaderItemTitle>
              Day created
            </StatementsTableHeaderItemTitle>
          </DayCreatedItem>
          <StatementPeriodItem
            dimensions={this.props.columnDimensions.statementPeriod}
            isSidebarCollapsed={this.props.isSidebarCollapsed}>
            <StatementsTableHeaderItemTitle>
              Period of statement
            </StatementsTableHeaderItemTitle>
          </StatementPeriodItem>
          <StatusItem
            dimensions={this.props.columnDimensions.status}
            isSidebarCollapsed={this.props.isSidebarCollapsed}>
            <StatementsTableHeaderItemTitle>
              Status
            </StatementsTableHeaderItemTitle>
          </StatusItem>
          <AmountItem
            dimensions={this.props.columnDimensions.amount}
            isSidebarCollapsed={this.props.isSidebarCollapsed}>
            <StatementsTableHeaderItemTitle>
              Amount
            </StatementsTableHeaderItemTitle>
          </AmountItem>
        </StatementsTableHeaderGroup>
        <StatementsTableHeaderGroup>
          <StatementIdItem
            dimensions={this.props.columnDimensions.statementId}
            isSidebarCollapsed={this.props.isSidebarCollapsed}>
            <StatementsTableHeaderItemTitle>
              Statement ID
            </StatementsTableHeaderItemTitle>
          </StatementIdItem>
          <DownloadItem
            dimensions={this.props.columnDimensions.download}
            isSidebarCollapsed={this.props.isSidebarCollapsed}>
            <StatementsTableHeaderItemTitle>
              Download
            </StatementsTableHeaderItemTitle>
          </DownloadItem>
        </StatementsTableHeaderGroup>
      </StatementsTableHeaderContainer>
    );
  }
}
