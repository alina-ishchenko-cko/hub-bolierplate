// @flow
import * as React from 'react';
import { ContentWrap } from './ContentDetails.sc';
import TransactionDetails from 'components/pages/transaction-details/';
import CustomerDetails from 'components/pages/customer-details/';
import TransactionActionsModals from 'components/pages/transaction-actions-modals/';

type Props = {
  activeRow: Object,
  activeAction: Object,
  isReadOnly: boolean,
  selectedRows: Array<Object>,
  rowDetailStack: Array<Object>,
  sliceRowDetailStack: Function,
  setActiveRow: Function,
  clearBatch: Function,
  setTransactionAction: Function,
  refreshData: Function,
};

export default class ContentDetails extends React.Component<Props> {
  handleModalHide = (actionType: string, refreshTable: boolean) => {
    this.props.setTransactionAction({ type: actionType, value: '' });
    this.props.clearBatch();
    if (refreshTable) {
      this.props.refreshData();
    }
  };

  clearActiveRow = (rowData: Object) => {
    const { rowDetailStack, activeRow } = this.props;
    const lastDataInStack = rowDetailStack[rowDetailStack.length - 1];
    if (activeRow.id && lastDataInStack.id === activeRow.id) {
      this.props.setActiveRow();
    }
    if (rowData.type) {
      this.props.sliceRowDetailStack(rowData);
    }
  };

  renderContent = () => {
    const { rowDetailStack } = this.props;
    const showBackBtn = !!(rowDetailStack.length >= 2);
    return rowDetailStack.map((row, index) => {
      const className = showBackBtn && index === 0 ? 'last-view' : '';
      if (row.type === 'transaction') {
        return (
          <TransactionDetails
            key={row.key || `${index}-trans-details`}
            chargeId={row.id}
            customerEmail={row.customerEmail}
            onClose={this.clearActiveRow}
            showBackBtn={showBackBtn}
            className={className}
          />
        );
      } else {
        return (
          <CustomerDetails
            key={row.key || `${index}-cust-details`}
            customerId={row.id}
            onClose={this.clearActiveRow}
            showBackBtn={showBackBtn}
            className={className}
          />
        );
      }
    });
  };

  render() {
    return (
      <ContentWrap>
        <TransactionActionsModals
          blacklistId={this.props.activeAction.blacklistId}
          refundId={this.props.activeAction.refundId}
          voidId={this.props.activeAction.voidId}
          captureId={this.props.activeAction.captureId}
          onCancel={this.handleModalHide}
          onOk={this.handleModalHide}
          selectedRows={this.props.selectedRows}
          isReadOnly={this.props.isReadOnly}
        />
        {this.renderContent()}
      </ContentWrap>
    );
  }
}
