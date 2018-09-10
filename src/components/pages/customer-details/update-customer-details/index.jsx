// @flow
import * as React from 'react';
import Form from 'antd/lib/form';
import CkoModal from 'components/ui/modal/';
import CkoInput from 'components/ui/form/CkoInput';
import CkoPhoneNumber from 'components/ui/form/CkoPhoneNumber';

type Props = {
  name: string,
  email: string,
  phone: Object,
  customerId: string,
  updateCustomerDetails: Function,
  onCancel: Function,
  form: Object, // passes by antd library
  countries: Array<Object>,
};

class UpdateCustomerDetails extends React.Component<Props> {
  submitCustomerDetails = e => {
    e.preventDefault();
    const { form } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        this.props.updateCustomerDetails(
          this.props.customerId,
          values.email,
          values.fullName,
          {
            number: values.phoneNumber,
            countryCode: values.phoneCountryCode,
          }
        );
        this.props.onCancel();
      }
    });
  };

  render() {
    return (
      <CkoModal
        visible={true}
        title="Edit customer details"
        okText="Save changes"
        cancelText="Cancel"
        onCancel={this.props.onCancel}
        onOk={this.submitCustomerDetails}>
        <Form>
          <CkoInput
            id="fullName"
            form={this.props.form}
            label="Customer Name"
            defaultValue={this.props.name}
            size="large"
          />
          <CkoInput
            id="email"
            type="email"
            form={this.props.form}
            label="Email"
            defaultValue={this.props.email}
            size="large"
          />
          <CkoPhoneNumber
            id="phone"
            form={this.props.form}
            label="Phone Number"
            required
            countries={this.props.countries}
            defaultValue={this.props.phone}
          />
        </Form>
      </CkoModal>
    );
  }
}

export default Form.create()(UpdateCustomerDetails);
