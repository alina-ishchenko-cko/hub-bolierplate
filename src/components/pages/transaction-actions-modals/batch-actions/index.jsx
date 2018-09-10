// @flow
import * as React from 'react';
import { formatNumber } from 'utils/ui.util';
import { ActionListStyled } from './BatchActions.sc';

type Props = {
  currencyId: number,
  actionType: string,
  transactions: Array<Object>,
};

export default class BatchActions extends React.Component<Props> {
  renderList() {
    return this.props.transactions.map(data => {
      const { purchases, details, paymentMethods, indicators } = data;
      const id = purchases.captureTransactionId || details.chargeId;
      const value =
        this.props.actionType === 'refund'
          ? purchases.maxRefundAmount
          : indicators.transactionValue;
      return (
        <li key={id}>
          <span className="prod-info">
            {paymentMethods.cardHolder || 'N/A'}
          </span>
          <span className="prod-value">
            {formatNumber(value, purchases.currencySymbol, true)}
            <span> {purchases.currencySymbol}</span>
          </span>
          <span className="prod-id">{id}</span>
        </li>
      );
    });
  }

  render() {
    return (
      <ActionListStyled>
        <p className="sub-text">
          You are about to {this.props.actionType} multiple transactions. <br />
          If this was intended, please proceed, otherwise click Cancel to go
          back to the previous screen.
        </p>
        <ul>{this.renderList()}</ul>
      </ActionListStyled>
    );
  }
}
