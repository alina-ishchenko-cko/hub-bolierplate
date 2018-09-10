import * as React from 'react';
import { formErrorMsg } from 'utils/ui.util';
import Input from 'antd/lib/input';
import Form from 'antd/lib/form';
const FormItem = Form.Item;

const IP_VALIDATOR = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

class CkoBin extends React.PureComponent {
  restrictBinNumber = e => {
    if (e.target.value.length > 14) e.preventDefault();
    const digitOrDot = String.fromCharCode(e.which);
    if (!/^\d+$/.test(digitOrDot) && digitOrDot !== '.') e.preventDefault();
  };

  getInputElement() {
    const { form, id, required, message, placeholder } = this.props;
    const { getFieldDecorator } = form;

    const input = getFieldDecorator(id, {
      rules: [
        {
          type: 'string',
          required,
          message: message || formErrorMsg.bin,
          max: 15
        },
        {
          validator: this.validateInput
        }
      ],
      validateTrigger: 'onBlur'
    })(
      <div className="cko-bin-input">
        <Input
          placeholder={placeholder}
          autoComplete="off"
          onKeyPress={this.restrictBinNumber}
        />
      </div>
    );

    return input;
  }

  validateInput = (rule, value, callback) =>
    IP_VALIDATOR.test(value) ? callback() : callback('Ip Address invalid');

  render() {
    const { noFormItem, label, formItemLayout } = this.props;

    if (noFormItem) return this.getInputElement();
    const renderWithFormItem = (
      <FormItem label={label} {...formItemLayout}>
        {this.getInputElement()}
      </FormItem>
    );
    return renderWithFormItem;
  }
}

export default CkoBin;
