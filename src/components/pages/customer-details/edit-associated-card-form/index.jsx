// @flow
import * as React from 'react';
import CkoModal from 'components/ui/modal/';
import CkoInput from 'components/ui/form/CkoInput';
import CkoCountries from 'components/ui/form/CkoCountries';
import Form from 'antd/lib/form';
import * as helpers from 'utils/ui.util';

type Props = {
  billingDetails: Object,
  countries: Array<Object>,
  name: string,
  onOk: Function,
  onCancel: Function,
  form: Object,
};

class EditAssociatedCardForm extends React.PureComponent<Props> {
  /**
   * Creates the form UI
   * @param {object} fields
   * @returns {React}
   */
  createFormUI(fields) {
    const { form } = this.props;
    return fields.map(field => {
      // CkoCountries
      if (field.type === 'ckoCountries') {
        return (
          <CkoCountries form={form} key={field.id} {...field} size="large" />
        );
      }
      // Default CkoInput
      return <CkoInput form={form} key={field.id} {...field} size="large" />;
    });
  }

  /**
   * Creates the form field props
   * @returns {React}
   */
  createNewAddressForm() {
    const { countries = [], billingDetails = {}, name } = this.props;
    const { formErrorMsg } = helpers;

    const fieldOptions = [
      {
        required: true,
        id: 'name',
        label: 'Cardholder name',
        message: formErrorMsg.cardholder,
        defaultValue: name,
      },
      {
        required: true,
        id: 'addressLine1',
        label: 'Address 1',
        message: formErrorMsg.address,
        defaultValue: billingDetails.addressLine1,
      },
      {
        id: 'addressLine2',
        label: 'Address 2',
        defaultValue: billingDetails.addressLine2,
      },
      {
        required: true,
        id: 'country',
        label: 'Country',
        type: 'ckoCountries',
        countries: countries,
        message: formErrorMsg.country,
        initialValue: billingDetails.country,
      },
      {
        required: true,
        id: 'city',
        label: 'City',
        message: formErrorMsg.city,
        defaultValue: billingDetails.city,
      },
      {
        required: true,
        id: 'postcode',
        label: 'Postcode',
        message: formErrorMsg.postcode,
        defaultValue: billingDetails.postcode,
      },
    ];
    return this.createFormUI(fieldOptions);
  }

  /**
   * Handles the submit event
   * @param {object} e
   */
  handleSubmit = e => {
    e.preventDefault();
    const { form } = this.props;
    form.validateFields((err, fieldValues) => {
      if (!err) {
        this.props.onOk(fieldValues);
      }
    });
  };

  /** Handles the cancel event */
  handleCancel = () => {
    this.props.onCancel();
  };

  /**
   * Renders the component
   * @returns {React}
   */
  render() {
    return (
      <CkoModal
        okText="Save"
        title="Edit card"
        titleIcon="modal-payment"
        visible={true}
        loading={false}
        onOk={this.handleSubmit}
        onCancel={this.handleCancel}>
        <Form onSubmit={this.handleSubmit} autoComplete="off">
          {this.createNewAddressForm()}
        </Form>
      </CkoModal>
    );
  }
}

const WrappedForm = Form.create()(EditAssociatedCardForm);
export default WrappedForm;
