// @flow
import * as React from 'react';
import CkoInput from 'components/ui/form/CkoInput';
import CkoCountries from 'components/ui/form/CkoCountries';
import { CkoAddressStyled } from './CkoAddress.sc';

type Props = {
  form: Object,
  countries: Array<Object>,
  fieldIds: {
    addressLine1: string,
    addressLine2: string,
    country: string,
    city: string,
    state: string,
    postcode: string,
  },
  className: string,
  address: Object,
};

export default class CkoAddress extends React.Component<Props> {
  static defaultProps = {
    countries: [],
    fieldIds: {
      addressLine1: 'addressLine1',
      addressLine2: 'addressLine2',
      country: 'country',
      city: 'city',
      state: 'state',
      postcode: 'postcode',
    },
    className: '',
    address: {},
  };

  render() {
    const { form, address } = this.props;
    return (
      <CkoAddressStyled className={this.props.className}>
        <div className="col">
          <CkoInput
            id={this.props.fieldIds.addressLine1}
            size="large"
            form={form}
            label="Address 1"
            placeholder="Enter your address"
            defaultValue={address.addressLine1 || ''}
          />
        </div>
        <div className="col">
          <CkoInput
            id={this.props.fieldIds.addressLine2}
            size="large"
            form={form}
            label="Address 2"
            placeholder="Enter your address"
            defaultValue={address.addressLine2 || ''}
          />
        </div>
        <div className="col col-6 col-left">
          <CkoCountries
            id={this.props.fieldIds.country}
            size="large"
            form={form}
            label="Country"
            countries={this.props.countries}
            placeholder="Select your country"
            defaultValue={address.country || ''}
          />
        </div>
        <div className="col col-6">
          <CkoInput
            id={this.props.fieldIds.city}
            size="large"
            form={form}
            label="City"
            placeholder="Enter your city"
            defaultValue={address.city || ''}
          />
        </div>
        <div className="col col-6 col-left">
          <CkoInput
            id={this.props.fieldIds.state}
            size="large"
            form={form}
            label="State"
            placeholder="Enter your state"
            defaultValue={address.state || ''}
          />
        </div>
        <div className="col col-6">
          <CkoInput
            id={this.props.fieldIds.postcode}
            size="large"
            form={form}
            label="Postcode/Zipcode"
            placeholder="Enter your postcode"
            defaultValue={address.postcode || ''}
          />
        </div>
      </CkoAddressStyled>
    );
  }
}
