// @flow
import * as React from 'react';
import CkoModal from 'components/ui/modal/';
import Form from 'antd/lib/form';
import CkoInput from 'components/ui/form/CkoInput';
import ChannelSelector from 'components/ui/form/channel-selector';
import CkoCardDetails from 'components/ui/form/CkoCardDetails';
import CkoAddress from 'components/ui/form/cko-address/';
import CkoPhoneNumber from 'components/ui/form/CkoPhoneNumber';

type Props = {
  customerId: string,
  form: Object,
  businesses: Array<Object>,
  channelId: number,
  accountId: number,
  businessId: number,
  onSubmit: Function,
  onCancel: Function,
  countries: Array<Object>,
  addCreditCard: Function,
};

export class AddNewCard extends React.Component<Props> {
  countUserFields: number = 1;

  handleSubmit = (e: SyntheticEvent<any>) => {
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      if (!err) {
        const cardExp = values.cardExpDate.split('/');
        const cardNumber = values.cardDetails.replace(/\s/g, '');
        const countryCode = values.phoneCountryCode || '';

        const card = {
          billingDetails: {
            addressLine1: values.addressLine1 || '',
            addressLine2: values.addressLine1 || '',
            city: values.city || '',
            country: values.country || '',
            state: values.state || '',
            postcode: values.postcode || '',
            phone: {
              number: values.cardCvv.phoneNumber || '',
              countryCode,
            },
          },
          cvv: values.cardCvv,
          expiryMonth: cardExp[0],
          expiryYear: cardExp[1],
          name: values.cardName,
          number: cardNumber,
        };
        const channelId = this.props.channelId || values.channelId;

        this.props.addCreditCard(this.props.customerId, card, channelId);
        this.props.onSubmit && this.props.onSubmit();
      }
    });
  };

  render() {
    const { form } = this.props;
    return (
      <CkoModal
        okText="Add"
        titleIcon="modal-payment"
        title="Add New Card"
        visible={true}
        onOk={this.handleSubmit}
        onCancel={this.props.onCancel}
        className="add-new-card">
        <Form onSubmit={this.handleSubmit} autoComplete="off">
          <ChannelSelector
            form={form}
            businesses={this.props.businesses}
            accountId={this.props.accountId}
            channelId={this.props.channelId}
            businessId={this.props.businessId}
          />
          <CkoInput
            required
            id="cardName"
            form={form}
            size="large"
            label="Cardholder name"
            placeholder="Enter cardholder name"
            message="Please enter cardholder name"
          />
          <CkoCardDetails
            required
            id="cardDetails"
            form={form}
            label="Card details"
          />
          <CkoAddress form={form} countries={this.props.countries} />
          <CkoPhoneNumber
            id="customerPhone"
            size="large"
            form={form}
            label="Customer phone number"
            countries={this.props.countries}
          />
        </Form>
      </CkoModal>
    );
  }
}
const WrappedRegistrationForm = Form.create()(AddNewCard);
export default WrappedRegistrationForm;
