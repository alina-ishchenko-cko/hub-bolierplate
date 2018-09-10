// @flow
import * as React from 'react';
import ContentList from 'components/ui/layout/ContentList';
import { blankValue } from 'utils/ui.util';
import { FlexItem, FlexRow } from 'components/ui/flex/';

type Props = {
  isChargeBack: boolean,
  chargeId: string,
  trackID: string,
  authCode: string,
  indicator: string,
  billingDesc: string,
  customerIp: string,
  customerLocation: string,
  acquirer: string,
};

export default class TransactionSection extends React.PureComponent<Props> {
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
            <p>{this.props.trackID || blankValue}</p>
          </FlexItem>
          <FlexItem>
            <label>Authorization Code</label>
            <p>{this.props.authCode || blankValue}</p>
          </FlexItem>
        </FlexRow>
        <FlexRow margin="0 0 30px 0">
          <FlexItem>
            <label>Transaction Indicator</label>
            <p>{this.props.indicator || blankValue}</p>
          </FlexItem>
          <FlexItem>
            <label>Billing Descriptor</label>
            <p>{this.props.billingDesc || blankValue}</p>
          </FlexItem>
        </FlexRow>
        <FlexRow>
          <FlexItem>
            <label>Customer Location</label>
            <p>
              {!this.props.customerLocation && !this.props.customerIp && 'N/A'}
              {this.props.customerLocation} {this.props.customerIp}
            </p>
          </FlexItem>
          {this.props.isChargeBack && (
            <FlexItem>
              <label>Acquirer Reference number</label>
              <p>{this.props.acquirer || blankValue}</p>
            </FlexItem>
          )}
        </FlexRow>
      </ContentList>
    );
  }
}
