// @flow
import React from 'react';
import Form from 'antd/lib/form';
import CkoModal from 'components/ui/modal/';
import CkoSelect from 'components/ui/form/CkoSelect';
import CkoDatePicker from 'components/ui/form/CkoDatePicker';
import CkoCardSelector from 'components/ui/form/cko-card-selector';
import {
  currencyService,
  getCurrencyByName,
} from 'services/currency/currencyService';
import { getFrequencyString } from 'utils';
import ChannelSelector from 'components/ui/form/channel-selector';

type Props = {
  cards: Array<Object>,
  form: Object,
  defaultCard: Object,
  paymentPlans: Array<Object>,
  customerId: string,
  accounts: {
    accountId: number,
    businessId: number,
    channelId: number,
  },
  businesses: Array<Object>,
  addPaymentPlan: Function,
  getPaymentPlanOptions: Function,
  onOk: Function,
  onCancel: Function,
};

export class AddPaymentPlan extends React.Component<Props> {
  componentDidMount() {
    this.props.getPaymentPlanOptions(this.props.accounts);
  }

  handleSubmit = (e: Object) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (err) return;
      const channelId = values.channelId || this.props.accounts.channelId;
      this.props.addPaymentPlan(
        this.props.customerId,
        values.cardId,
        channelId,
        values.paymentPlan
      );
      this.props.onOk();
    });
  };

  getPaymentPlanOptions = () => {
    const { paymentPlans } = this.props;
    return paymentPlans.map(plan => {
      const currencyObj = getCurrencyByName(plan.currency);
      const currency = currencyService.wrap(currencyObj.currencyId);
      return {
        key: plan.planId,
        value: plan.planId,
        label: `${plan.name} - ${currency.format(plan.value)} ${
          currency.name
        } - ${getFrequencyString(plan.cycle)}`,
      };
    });
  };

  render() {
    const { form, onCancel, accounts } = this.props;
    return (
      <div>
        <Form>
          <CkoModal
            visible={true}
            title="Add plan"
            okText="Add plan"
            cancelText="Cancel"
            titleIcon="modal-payment"
            onCancel={onCancel}
            onOk={this.handleSubmit}>
            <ChannelSelector
              form={form}
              businesses={this.props.businesses}
              accountId={accounts.accountId}
              channelId={accounts.channelId}
              businessId={accounts.businessId}
            />
            <CkoSelect
              data={this.getPaymentPlanOptions()}
              id="paymentPlan"
              form={form}
              label="Payment Plan"
              required
              style={{ width: '100%' }}
              size="large"
            />
            <CkoCardSelector form={form} cards={this.props.cards} />
            <CkoDatePicker
              id="planStartDate"
              form={form}
              label="Optional Start Date"
              className="full-width-date-picker"
              size="large"
            />
          </CkoModal>
        </Form>
      </div>
    );
  }
}

export default Form.create()(AddPaymentPlan);
