// @flow
import * as React from 'react';
import ContentList from 'components/ui/layout/ContentList';
import { FlexItem, FlexRow } from 'components/ui/flex/';

type Props = {
  chargeId: string,
  trackID: string,
  authCode: string,
  indicator: string,
  billingDesc: string,
  customerIp: string,
  currencySymbol: string,
  acquirer: string,
};

export default class LogsSection extends React.PureComponent<Props> {
  render() {
    return (
      <ContentList title="Transaction Details">
        <FlexItem margin="0 0 30px 0">
          <label>Transaction ID</label>
          <p>{this.props.chargeId.replace('charge_', '')}</p>
        </FlexItem>
        <FlexRow margin="0 0 30px 0">
          <FlexItem>
            <label>Track ID </label>
            <p>{this.props.trackID}</p>
          </FlexItem>
          <FlexItem>
            <label>Authorization Code</label>
            <p>{this.props.authCode}</p>
          </FlexItem>
        </FlexRow>
        <FlexRow margin="0 0 30px 0">
          <FlexItem>
            <label>Transaction Indicator</label>
            <p>{this.props.indicator}</p>
          </FlexItem>
          <FlexItem>
            <label>Billing Descriptor</label>
            <p>{this.props.billingDesc || `N/A`}</p>
          </FlexItem>
        </FlexRow>
        <FlexRow>
          <FlexItem>
            <label>Customer Location</label>
            <p>
              {this.props.currencySymbol} {this.props.customerIp}
            </p>
          </FlexItem>
          <FlexItem>
            <label>Acquirer Reference number</label>
            <p>{this.props.acquirer}</p>
          </FlexItem>
        </FlexRow>
      </ContentList>
    );
  }
}
