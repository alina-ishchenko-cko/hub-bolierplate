// @flow
import * as React from 'react';
import CkoModal from 'components/ui/modal/';
import Form from 'antd/lib/form';
import { formatNumber, formatToCents } from 'utils/ui.util';
import CkoInput from 'components/ui/form/CkoInput';
import CkoAmount from 'components/ui/form/CkoAmount';
import BatchActions from '../batch-actions/';
import withBatchActions from '../withBatchActions';

type Props = {
  form: Object,
  actionType: string,
  transactions: Object,
  activeRow: string,
  visible: boolean,
  loading: boolean,
  selectedRows: Array<Object>,
  originalAmount: number,
  currencyId: number,
  chargeId: string,
  currencySymbol: string,
  action: Object,
  onOk: Function,
  onCancel: Function,
  getTransactionDetails: Function,
  processSingleAction: Function,
  processBatchActions: Function,
  isBatchTransaction: boolean,
};

type State = {
  isPartial: boolean,
  partialValue: string | number,
};

export class Capture extends React.Component<Props, State> {
  state = {
    isPartial: false,
    partialValue: '',
  };

  formatOriginalAmount(): string | number {
    return formatNumber(
      this.props.originalAmount,
      this.props.currencySymbol,
      false
    );
  }

  isLoading(): boolean {
    const { action } = this.props;
    return (
      this.props.loading ||
      action.loading ||
      action.batch.loading ||
      this.props.transactions.loading
    );
  }

  handleSubmit = (e: SyntheticEvent<any>) => {
    e.preventDefault();
    if (!this.props.isBatchTransaction) {
      this.props.form.validateFields((err, values) => {
        const params = {};
        if (err !== null) return;
        params.amount = formatToCents(this.props.currencyId, values.amount);
        if (values.note !== void 0) params.note = values.note;
        this.props.onOk(params, false);
      });
    } else {
      this.props.onOk(null, false);
    }
    this.resetState();
  };

  handlePartialCheck = (partialValue: number) => {
    let isPartial = false;
    const intValue = parseInt(this.formatOriginalAmount(), 10);
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
      ? `Partial capture - ${this.props.currencySymbol} ${
          this.state.partialValue
        }`
      : 'Capture transaction';
  }

  resetState() {
    this.setState({
      isPartial: false,
      partialValue: '',
    });
  }

  handleOnCancel = () => {
    this.resetState();
    this.props.onCancel();
  };

  render() {
    const { form } = this.props;
    return (
      <CkoModal
        title="Capture Transaction"
        titleIcon="modal-payment"
        visible={this.props.visible}
        onOk={this.handleSubmit}
        onCancel={this.handleOnCancel}
        okText={this.renderOkText()}
        cancelText="Cancel"
        className="capture-transaction"
        loading={this.isLoading()}>
        {this.props.visible &&
          (!this.props.isBatchTransaction ? (
            <Form>
              <CkoAmount
                required
                id="amount"
                form={form}
                size="large"
                label="Capture amount"
                placeholder="Enter an amount"
                message="Please enter an amount"
                defaultValue={this.formatOriginalAmount()}
                prefix={this.props.currencySymbol}
                maxValue={this.props.originalAmount}
                currencyName={this.props.currencySymbol}
                onBlur={this.handlePartialCheck}
              />
              <CkoInput
                id="note"
                form={form}
                size="large"
                label="Capture description"
                placeholder="Enter description"
                message="Please enter an amount"
              />
            </Form>
          ) : (
            <BatchActions
              actionType={this.props.actionType.toLowerCase()}
              currencyId={this.props.currencyId}
              transactions={this.props.transactions.list}
            />
          ))}
      </CkoModal>
    );
  }
}

const wrapped = withBatchActions(Capture);
const wrappedWithForm = Form.create()(wrapped);
export default wrappedWithForm;
