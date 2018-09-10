// @flow
import * as React from 'react';
import CkoInput from 'components/ui/form/CkoInput';
import CkoModal from 'components/ui/modal/';
import isEmpty from 'lodash/isEmpty';
import CkoConfirm from 'components/ui/confirm/';
import { formatToCents } from 'utils/ui.util';
import trim from 'lodash/trim';
import { FlexColumn, FlexItem } from 'components/ui/flex/';
import CkoCurrencyFormat from 'components/ui/CkoCurrencyFormat';
import { WrapStyled } from './VoidTransaction.sc';
import BatchActions from '../batch-actions/';
import withBatchActions from '../withBatchActions';

type Props = {
  activeRow: Object,
  actionKey: string,
  actionType: string,
  transactions: Object,
  loading: boolean,
  visible: boolean,
  selectedRows: Array<Object>,
  originalAmount: number,
  currencySymbol: string,
  action: Object,
  transactionId: string,
  currencyId: number,
  onOk: Function,
  onCancel: Function,
  getTransactionDetails: Function,
  processSingleAction: Function,
  processBatchActions: Function,
  onConfirm: Function,
  isBatchTransaction: boolean,
  showConfirm?: Function,
};

type State = {
  inputValue: string,
};

export class Void extends React.Component<Props, State> {
  state = {
    inputValue: '',
  };

  handleSubmit = (e: SyntheticEvent<any>) => {
    e.preventDefault();
    if (!this.props.isBatchTransaction) {
      const params = {};
      params.amount = formatToCents(
        this.props.currencyId,
        this.props.originalAmount
      );

      if (!isEmpty(trim(this.state.inputValue))) {
        params.note = this.state.inputValue;
      }
      this.props.onOk(params);
    } else {
      this.props.onOk(null);
    }
    this.resetState();
  };

  handleInputChange = (e: SyntheticEvent<any>) => {
    this.setState({
      inputValue: e.currentTarget.value,
    });
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

  resetState() {
    this.setState({
      inputValue: '',
    });
  }

  handleOnCancel = () => {
    this.resetState();
    this.props.onCancel();
  };

  render() {
    if (this.props.showConfirm) {
      return (
        <CkoConfirm
          title="Confirm voiding transaction"
          loading={this.isLoading()}
          titleIcon="modal-payment"
          okText="Yes, void transaction"
          cancelText="NO, don't void it"
          message="Voiding a transaction is permanent. Are you sure you want to void this transaction?"
          onCancel={this.handleOnCancel}
          onOk={this.props.onConfirm}
        />
      );
    }

    return (
      <CkoModal
        title="Void Transaction"
        titleIcon="modal-payment"
        visible={this.props.visible}
        onOk={this.handleSubmit}
        onCancel={this.handleOnCancel}
        type="danger"
        okText="Void"
        className="void-transaction"
        loading={this.isLoading()}>
        {!this.props.isBatchTransaction ? (
          <WrapStyled>
            <FlexColumn>
              <FlexItem>
                <label>Transaction amount</label>
                <CkoCurrencyFormat
                  value={this.props.originalAmount}
                  currencyName={this.props.currencySymbol}
                  suffix={this.props.currencySymbol}
                />
              </FlexItem>
              <FlexItem>
                <label>Reason</label>
                <CkoInput
                  size="large"
                  placeholder="Enter reason"
                  onChange={this.handleInputChange}
                />
              </FlexItem>
            </FlexColumn>
          </WrapStyled>
        ) : (
          <BatchActions
            actionType={this.props.actionType.toLowerCase()}
            currencyId={this.props.currencyId}
            transactions={this.props.transactions.list}
          />
        )}
      </CkoModal>
    );
  }
}

export default withBatchActions(Void);
