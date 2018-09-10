// @flow
import * as React from 'react';
import { FlexColumn, FlexRow, FlexItem } from 'components/ui/flex/';
import TransactionTable from './transaction-table';
import TransactionsKPI from './transactions-kpi';

export default class Transactions extends React.Component<{}> {
  render() {
    return (
      <FlexColumn className="transactions">
        <FlexItem clear>
          <TransactionsKPI />
        </FlexItem>
        <FlexRow>
          <TransactionTable />
        </FlexRow>
      </FlexColumn>
    );
  }
}
