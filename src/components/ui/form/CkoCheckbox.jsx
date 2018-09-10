// @flow
import * as React from 'react';
import { FormItemStyled } from './styled';
import Checkbox from 'antd/lib/checkbox';
import Form from 'antd/lib/form';
const FormItem = Form.Item;

type Props = {
  id?: string,
  checkValue?: string,
  form?: {
    getFieldDecorator: Function,
    getFieldError: Function,
    setFieldsValue: Function,
  },
  initialValue?: string | number,
  noFormItem?: boolean,
  required?: boolean,
  disabled?: boolean,
  className?: string,
  placeholder?: string,
  label?: string,
  message?: string,
  addonBefore?: string | number | React.Node | Function,
  onChange: Function,
};

export default class CkoCheckbox extends React.Component<Props> {
  getFormElement() {
    if (!this.props.form) {
      return null;
    }

    const inputTag = this.props.form.getFieldDecorator(this.props.id, {
      valuePropName: 'checked',
      initialValue: this.props.initialValue,
      rules: [
        {
          required: this.props.required,
          message: this.props.message,
        },
      ],
    })(
      <Checkbox onChange={this.props.onChange} disabled={this.props.disabled}>
        {this.props.label}
      </Checkbox>
    );
    return inputTag;
  }

  render() {
    const { checkValue } = this.props;

    // Render the Checkbox tag without form
    if (!this.props.form) {
      return (
        <Checkbox {...this.props} className="cko-checkbox">
          {this.props.label}
        </Checkbox>
      );
    }

    // Render without FormItem wrap
    if (this.props.noFormItem) {
      return this.getFormElement();
    }

    // Wrap Input in FormItem
    return (
      <FormItemStyled>
        <FormItem className={`cko-checkbox ${this.props.className || ''}`}>
          {this.getFormElement()}
          {checkValue && <div className="labelValue">{checkValue}</div>}
        </FormItem>
      </FormItemStyled>
    );
  }
}
