// @flow
import * as React from 'react';
import Form from 'antd/lib/form';
import CkoModal from 'components/ui/modal/';
import CkoInput from 'components/ui/form/CkoInput';
import CkoAmount from 'components/ui/form/CkoAmount';
import { formatNumber, formatToCents } from 'utils/ui.util';
import BatchActions from '../batch-actions/';
import CkoConfirm from 'components/ui/confirm/';
import withBatchActions from '../withBatchActions';

type Props = {
  form: Object,
  loading: boolean,
  captureId: string,
  transactions: Object,
  activeRow: Object,
  actionKey: string,
  actionType: string,
  selectedRows: Array<Object>,
  currencyId: number,
  chargeId: string | Array<Object>,
  detailsList: Array<Object>,
  maxRefundAmount: number,
  currencySymbol: string,
  visible: boolean,
  action: Object,
  onOk: Function,
  onCancel: Function,
  getTransactionDetails: Function,
  processSingleAction: Function,
  processBatchActions: Function,
  onConfirm: Function,
  isBatchTransaction: boolean,
  showConfirm: boolean,
};

type State = {
  isPartial: boolean,
  partialValue: string | number,
};

export class Refund extends React.Component<Props, State> {
  state = {
    isPartial: false,
    partialValue: '',
  };

  isLoading(): boolean {
    const { action } = this.props;
    return (
      this.props.loading ||
      action.loading ||
      action.batch.loading ||
      this.props.transactions.loading
    );
  }

  /**
   * Verify the validity of the fields
   * If the fields are valid, submit the form with the data
   */
  handleSubmit = (e: SyntheticEvent<any>) => {
    e.preventDefault();

    if (!this.props.isBatchTransaction) {
      this.props.form.validateFields((err, values) => {
        const params = {};
        if (err !== null) return;
        params.amount = formatToCents(this.props.currencyId, values.amount);
        if (values.note !== void 0) params.note = values.note;
        this.props.onOk(params);
      });
    } else {
      this.props.onOk(null);
    }
    this.resetState();
  };

  resetState() {
    this.setState({
      isPartial: false,
      partialValue: '',
    });
  }

  handlePartialCheck = (partialValue: number) => {
    let isPartial = false;
    const intValue = parseInt(
      formatNumber(this.props.maxRefundAmount, '', false),
      10
    );
    const maxValue = formatToCents(this.props.currencyId, intValue);
    const newValue = formatToCents(this.props.currencyId, partialValue);
    if (newValue !== maxValue && newValue <= maxValue) {
      isPartial = true;
    }

    this.setState({
      isPartial,
      partialValue,
    });
  };

  renderOkText(): string {
    return this.state.isPartial
      ? `Partial refund - ${this.props.currencySymbol} ${
          this.state.partialValue
        }`
      : 'Refund transaction';
  }

  handleOnCancel = () => {
    this.resetState();
    this.props.onCancel();
  };

  render() {
    const { form } = this.props;
    if (this.props.showConfirm) {
      return (
        <CkoConfirm
          title="Confirm refunding transaction"
          titleIcon="modal-payment"
          okText="Yes, refund"
          cancelText="NO, don't refund it"
          message="Refunding a transaction is permanent. Are you sure you want to void this transaction?"
          loading={this.isLoading()}
          onCancel={this.handleOnCancel}
          onOk={this.props.onConfirm}
        />
      );
    }

    return (
      <CkoModal
        title="Refund Transaction"
        titleIcon="modal-payment"
        visible={this.props.visible}
        onOk={this.handleSubmit}
        onCancel={this.handleOnCancel}
        okText={this.renderOkText()}
        cancelText="Cancel"
        className="refund-transaction"
        loading={this.isLoading()}>
        {this.props.visible &&
          (!this.props.isBatchTransaction ? (
            <Form>
              <CkoAmount
                required
                id="amount"
                form={form}
                size="large"
                label="Refund amount"
                placeholder="Enter an amount"
                message="Please enter an amount"
                defaultValue={formatNumber(
                  this.props.maxRefundAmount,
                  this.props.currencySymbol
                )}
                prefix={this.props.currencySymbol}
                maxValue={this.props.maxRefundAmount}
                currencyName={this.props.currencySymbol}
                onBlur={this.handlePartialCheck}
              />
              <CkoInput
                id="note"
                form={form}
                size="large"
                label="Refund description"
                placeholder="Enter refund description"
                message="Please enter an amount"
              />
            </Form>
          ) : (
            <BatchActions
              actionType="refund"
              currencyId={this.props.currencyId}
              transactions={this.props.transactions.list}
            />
          ))}
      </CkoModal>
    );
  }
}

const wrapped = withBatchActions(Refund);
const wrappedWithForm = Form.create()(wrapped);
export default wrappedWithForm;
