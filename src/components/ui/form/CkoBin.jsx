import * as React from 'react';
import { formErrorMsg } from 'utils/ui.util';
import Input from 'antd/lib/input';
import Form from 'antd/lib/form';
const FormItem = Form.Item;

class CkoBin extends React.PureComponent {
  restrictBinNumber = e => {
    if (e.target.value.length > 5) e.preventDefault();
    const digit = String.fromCharCode(e.which);
    if (!/^\d+$/.test(digit)) e.preventDefault();
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
          len: 6
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
