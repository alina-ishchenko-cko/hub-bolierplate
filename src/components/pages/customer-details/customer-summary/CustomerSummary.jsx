// @ flow
import * as React from 'react';
import { FlexRow } from 'components/ui/flex';
import ContentList from 'components/ui/layout/ContentList';
import CustomerDetailsValueSummary from '../customer-details-value-summary';
import { formatNumber } from 'utils/ui.util';

type Props = {
  ltv: number,
  orderHistory: number,
  currencyName: string,
};

export default class CustomerSummary extends React.Component<Props> {
  render() {
    return (
      <ContentList title="Summary">
        <FlexRow>
          <CustomerDetailsValueSummary
            value={formatNumber(this.props.ltv || 0, this.props.currencyName)}
            units={this.props.currencyName}
            title="Life time value"
            description="Sum of captured transactions"
          />
          <CustomerDetailsValueSummary
            value={this.props.orderHistory}
            title="Order history"
            description="Number of orders placed so far"
          />
        </FlexRow>
      </ContentList>
    );
  }
}
