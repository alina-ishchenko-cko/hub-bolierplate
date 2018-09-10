// @flow
import * as React from 'react';
import moment from 'moment';
import isEqual from 'lodash/isEqual';
import groupBy from 'lodash/groupBy';

import type { Statement } from 'store/reducers/statementsReducer';
import DateColumn from './date-column';
import StatementsTable from './statements-table/index.js';
import { StatementsContainer, StaticBlock, FakeShadow } from './Statements.sc';

type Props = {
  isSidebarCollapsed: boolean,
  currentUser: Object,
  getAll: Function,
  setPageTitle: Function,
  assetsLoading: boolean,
  selected: Object,
  toDate: Object,
  list: Object,
  tableOptions: {
    search: string,
    sort: Object,
    filter: Array<Object>,
    pagination: {
      pageSize: number,
      startIndex: number,
    },
  },
};

export default class Statements extends React.Component<Props> {
  componentDidMount() {
    this.props.setPageTitle('Statements');
    this.fetchStatements();
  }

  componentDidUpdate(prevProps: Props) {
    // refresh if business/channel changed
    if (!isEqual(this.props.selected, prevProps.selected)) {
      this.fetchStatements();
    }
  }

  fetchStatements = () => {
    const params = {
      toDate: this.props.toDate,
      fromDate: this.props.toDate,
      accountId: this.props.selected.account.id,
      businessId: this.props.selected.business.id,
      channelId: this.props.selected.channel.id,
      startIndex: 0,
      pageSize: 1000,
      ...this.props.tableOptions.sort,
    };

    if (params.accountId) {
      this.props.getAll(params);
    }
  };

  get statementsMap(): { [string]: { [string]: Statement[] } } {
    let statementMap = {};

    const statementsByYear = groupBy(this.props.list.statements, statement => {
      return moment(statement.settlementDate).year();
    });

    for (const year of Object.keys(statementsByYear)) {
      statementMap[year] = groupBy(statementsByYear[year], statement => {
        return moment(statement.settlementDate).month();
      });
    }

    return statementMap;
  }

  render() {
    return (
      <StatementsContainer>
        <DateColumn statementsMap={this.statementsMap} />
        <StatementsTable statementsMap={this.statementsMap} />
        <StaticBlock isSidebarCollapsed={this.props.isSidebarCollapsed} />
        <FakeShadow
          isSidebarCollapsed={this.props.isSidebarCollapsed}
        />
      </StatementsContainer>
    );
  }
}
