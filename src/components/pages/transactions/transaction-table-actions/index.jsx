// @flow
import * as React from 'react';
import CkoButton from 'components/ui/button';
import { DividerStyled } from './TransactionTableActions.sc';

type Props = {
  selectedRows: Array<Object>,
  onCreatePayment: Function,
  onActionClick: Function,
  isReadOnly: boolean,
};

export default class TransactionTableActions extends React.Component<Props> {
  shouldShowCreateBtn(): boolean {
    const { selectedRows } = this.props;
    return !this.props.isReadOnly && !selectedRows.length;
  }

  containsAction(actionName: string): boolean {
    const { selectedRows } = this.props;
    const { actions } = selectedRows[0];

    if (selectedRows.length > 1) {
      return !!(
        actions.findIndex(a => a.name === actionName && a.supportBatch) >= 0
      );
    }
    return !!(actions.findIndex(a => a.name === actionName) >= 0);
  }

  renderActionBtns = () => {
    const { selectedRows } = this.props;
    const numOfRows = selectedRows.length;

    if (numOfRows === 0) {
      return null;
    }

    const itemLabel = numOfRows === 1 ? `item` : `items`;
    const showBlackList = this.containsAction('Blacklist');
    const showVoid = this.containsAction('Void');
    const showRefund = this.containsAction('Refund');
    const showCapture = this.containsAction('Capture');
    const showDivider = !!(
      showBlackList &&
      (showVoid || showRefund || showCapture)
    );

    return (
      <div className="action-btns">
        <span className="items-selected">{`${numOfRows} ${itemLabel} selected`}</span>
        {showBlackList && (
          <CkoButton
            type="light"
            icon="blacklist"
            value="Blacklist"
            dataIndex="blacklistId"
            onClick={this.props.onActionClick}
          />
        )}
        {showDivider && <DividerStyled className="divider" />}
        {showVoid && (
          <CkoButton
            icon="void"
            value="Void"
            dataIndex="voidId"
            onClick={this.props.onActionClick}
          />
        )}
        {showRefund && (
          <CkoButton
            icon="void"
            value="Refund"
            dataIndex="refundId"
            onClick={this.props.onActionClick}
          />
        )}
        {showCapture && (
          <CkoButton
            type="success"
            icon="capture"
            value="Capture"
            dataIndex="captureId"
            onClick={this.props.onActionClick}
          />
        )}
        {this.shouldShowCreateBtn() && <DividerStyled className="divider lg" />}
      </div>
    );
  };

  render() {
    return (
      <div className="transaction-actions">
        {this.renderActionBtns()}
        {this.shouldShowCreateBtn() && (
          <CkoButton
            type="primary"
            icon="create-payment"
            value="Create Payment"
            onClick={this.props.onCreatePayment}
          />
        )}
      </div>
    );
  }
}
