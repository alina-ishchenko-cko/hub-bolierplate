// @flow
import * as React from 'react';
import CkoInput from 'components/ui/form/CkoInput';
import { FieldsWrapStyled } from '../CreatePayment.sc';
import CkoAddress from 'components/ui/form/cko-address';

type Props = {
  form: Object,
  countries: Array<Object>,
};

export default class ShippingAddress extends React.Component<Props> {
  render() {
    const { form } = this.props;
    const addressFieldIds = {
      addressLine1: 'newAddressLine1',
      addressLine2: 'newAddressLine2',
      country: 'newAddressCountry',
      city: 'newAddressCity',
      state: 'newAddressState',
      postcode: 'newAddressPostcode',
    };
    return (
      <FieldsWrapStyled>
        <h3>
          <span>Shipping Address</span>
        </h3>
        <div className="form-group-wrap">
          <div className="col">
            <CkoInput
              id="newAddressName"
              size="large"
              form={form}
              label="Recipient Name"
              placeholder="Enter name"
            />
          </div>
          <CkoAddress
            form={this.props.form}
            countries={this.props.countries}
            fieldIds={addressFieldIds}
            className="shipping-address"
          />
        </div>
      </FieldsWrapStyled>
    );
  }
}
