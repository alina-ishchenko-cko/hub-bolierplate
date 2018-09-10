// @flow
import * as React from 'react';
import CkoInput from 'components/ui/form/CkoInput';
import CkoPhoneNumber from 'components/ui/form/CkoPhoneNumber';
import CkoTextArea from 'components/ui/form/CkoTextArea';
import { FieldsWrapStyled } from '../CreatePayment.sc';

type Props = {
  form: Object,
  countries: Array<Object>,
};

export default class Miscellaneous extends React.Component<Props> {
  render() {
    const { form } = this.props;
    return (
      <FieldsWrapStyled>
        <h3>
          <span>Miscellaneous</span>
        </h3>
        <div className="form-group-wrap">
          <CkoPhoneNumber
            id="customerPhone"
            size="large"
            form={form}
            label="Customer phone number"
            countries={this.props.countries}
          />
          <CkoInput
            id="trackingId"
            size="large"
            form={form}
            label="Tracking ID"
            placeholder="Enter track Id"
          />
          <CkoTextArea
            id="description"
            size="large"
            form={form}
            label="Tracking description"
            placeholder="Enter description"
          />
          <CkoInput
            id="userField1"
            size="large"
            form={form}
            label="Custom Field"
            placeholder="Enter keyword"
          />
        </div>
      </FieldsWrapStyled>
    );
  }
}
