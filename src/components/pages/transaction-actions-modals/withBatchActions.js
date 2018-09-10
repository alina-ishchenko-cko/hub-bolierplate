// @flow
import * as React from 'react';
import isEqual from 'lodash/isEqual';
import isEmpty from 'lodash/isEmpty';
import isArray from 'lodash/isArray';
import { formatToCents } from 'utils/ui.util';
import feedback from 'components/ui/feedback/';

type Props = {
  actionKey: string,
  actionType: string,
  activeRow: Object,
  transactions: Object,
  loading: boolean,
  visible: boolean,
  captureId?: string,
  selectedRows: Array<Object>,
  originalAmount: number,
  currencySymbol: string,
  action: Object,
  transactionId: string,
  chargeId: string,
  currencyId: number,
  onOk: Function,
  onCancel: Function,
  getTransactionDetails: Function,
  processSingleAction: Function,
  processBatchActions: Function,
};

type State = {
  showConfirm: boolean,
  params: Object,
  batchParams: Array<any>,
};

export default function withBatchActions(WrappComponent: any) {
  return class Void extends React.Component<Props, State> {
    state = {
      showConfirm: false,
      params: {},
      batchParams: [],
    };

    componentWillReceiveProps(nextProps: Props) {
      // Make request to get details
      if (
        nextProps.visible &&
        !isEqual(nextProps.chargeId, this.props.chargeId) &&
        !isEqual(nextProps.chargeId, nextProps.activeRow.id)
      ) {
        this.resetState();
        this.getActionDetails(nextProps);
        return;
      }

      //Show Notification
      if (
        !isEqual(nextProps.action, this.props.action) &&
        !nextProps.action.loading
      ) {
        this.handleNotification(nextProps.action);
      }
    }

    isBatchTransaction(): boolean {
      return !!(this.props.selectedRows.length > 1);
    }

    getActionDetails(nextProps: Props) {
      if (isArray(nextProps.chargeId)) {
        nextProps.chargeId.forEach(data => {
          this.props.getTransactionDetails(data.id, true);
        });
      } else {
        this.props.getTransactionDetails(nextProps.chargeId);
      }
    }

    handleNotification(action: Object) {
      if (action.error || action.batch.error) {
        const errorMsg = action.errorMsg || `${this.props.actionType} failed!`;
        feedback.error(errorMsg);
      } else if (action.success || action.batch.success) {
        feedback.success(`${this.props.actionType} successful`);
        this.resetState();
        this.props.onOk(this.props.actionKey, true);
      }
    }

    handleSubmit = (formData?: Object) => {
      const isRefund = !!(this.props.actionType === 'Refund');
      if (this.isBatchTransaction()) {
        const batchParams = [];
        this.props.transactions.list.forEach(data => {
          const { purchases, details, indicators } = data;
          const id = isRefund
            ? purchases.captureTransactionId
            : details.chargeId;
          const value = isRefund
            ? purchases.maxRefundAmount
            : indicators.transactionValue;
          batchParams.push([
            id,
            {
              amount: formatToCents(data.purchases.currencySymbol, value),
            },
          ]);
        });
        this.props.processBatchActions(batchParams);
      } else {
        const id = isRefund ? this.props.captureId : this.props.chargeId;
        const params =
          formData && !isEmpty(formData) && formData.amount !== void 0
            ? formData
            : this.state.params;

        this.props.processSingleAction(id, params);
      }
    };

    handleOnOK = (params: Object = {}, showConfirm: boolean = true) => {
      if (showConfirm) {
        this.setState({ showConfirm, params });
      } else {
        this.handleSubmit(params);
      }
    };

    resetState() {
      this.setState({
        showConfirm: false,
        params: {},
        batchParams: [],
      });
    }

    hideModal = () => {
      this.resetState();
      this.props.onCancel(this.props.actionKey);
    };

    render() {
      const props = {
        ...this.props,
        onCancel: this.hideModal,
        onOk: this.handleOnOK,
        showConfirm: this.state.showConfirm,
        onConfirm: this.handleSubmit,
        isBatchTransaction: this.isBatchTransaction(),
      };
      return <WrappComponent {...props} />;
    }
  };
}
