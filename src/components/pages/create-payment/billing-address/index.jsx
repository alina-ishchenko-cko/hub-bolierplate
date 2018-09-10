// @flow
import * as React from 'react';
import CkoAddress from 'components/ui/form/cko-address';
import AddressInfo from 'components/ui/address-info';
import { FlexItem } from 'components/ui/flex/';
import CkoButton from 'components/ui/button';
import { FieldsWrapStyled } from '../CreatePayment.sc';
import CkoSwitch from 'components/ui/switch/';
import { BillingAddressInfoStyled } from './billing-address.sc';

type Props = {
  form: Object,
  countries: Array<Object>,
  onToggleBtn: Function,
  billingAddress?: Object,
  onChangeAddressClick?: Function,
};

type State = {
  isAddressFormVisible: boolean,
};

export default class BillingAddress extends React.Component<Props, State> {
  state = { isAddressFormVisible: false };

  onChangeAddressClick = () => {
    this.setState(() => ({
      isAddressFormVisible: true,
    }));
    this.props.onChangeAddressClick && this.props.onChangeAddressClick();
  };

  render() {
    return (
      <FieldsWrapStyled>
        <h3>
          <span>Billing Address</span>
        </h3>
        {this.props.billingAddress && !this.state.isAddressFormVisible ? (
          <BillingAddressInfoStyled>
            <FlexItem>
              <AddressInfo address={this.props.billingAddress} />
            </FlexItem>
            <FlexItem className="change-address">
              <CkoButton
                value="Change address"
                size="small"
                onClick={this.onChangeAddressClick}
              />
            </FlexItem>
          </BillingAddressInfoStyled>
        ) : (
          <CkoAddress
            form={this.props.form}
            countries={this.props.countries}
            className="billing-address"
            address={
              this.props.billingAddress ? this.props.billingAddress : void 0
            }
          />
        )}

        <label>Different shipping address</label>
        <CkoSwitch type="circle" onToggleBtn={this.props.onToggleBtn} />
      </FieldsWrapStyled>
    );
  }
}
