// @flow
import * as React from 'react';
//import isEqual from 'lodash/isEqual';
import Input from 'antd/lib/input';
import Form from 'antd/lib/form';
import { FormItemStyled, InputWrapStyled } from './styled';
const FormItem = Form.Item;

type Props = {
  id?: string,
  form?: {
    getFieldDecorator: Function,
    getFieldError: Function,
    setFieldsValue: Function,
  },
  ref?: Function,
  loading?: boolean,
  defaultValue?: string | number,
  size?: string,
  type?: string,
  min?: number | string,
  rules?: Object,
  noFormItem?: boolean,
  required?: boolean,
  className?: string,
  placeholder?: string,
  label?: string,
  message?: string,
  onEnter?: Function,
  addonBefore?: string | number | React.Node | Function,
  onBlur?: Function,
  onKeyUp?: Function,
  onFocus?: Function,
  onKeyPress?: Function,
  onPaste?: Function,
};

export default class CkoInput extends React.Component<Props> {
  inputNode: ?HTMLInputElement;

  static defaultProps = {
    type: 'text',
    size: 'default',
    required: false,
  };

  renderInputField() {
    const { type } = this.props;
    const { form, rules, defaultValue, onEnter, loading, ...inputProps } = {
      ...this.props,
      type: type === 'email' || type === 'password' ? type : 'text',
      onKeyPress: this.props.onKeyPress || this.handleKeyPress,
      className:
        this.props.noFormItem && this.props.className
          ? this.props.className
          : '',
    };

    if (!form) {
      return null;
    }

    return form.getFieldDecorator(this.props.id, {
      initialValue: defaultValue || undefined,
      rules: [
        {
          type: type === 'email' ? type : 'string',
          required: this.props.required,
          message: this.props.message,
        },
        {
          validator: (rules && rules.validator) || this.handleInputValidation,
        },
      ],
      validateTrigger: 'onBlur',
    })(<Input {...inputProps} />);
  }

  handleInputValidation = (rule: Object, value: string, callback: Function) => {
    if (this.props.type === 'number') {
      const inputValue = parseInt(value, 10);
      const fieldMinLength = parseInt(this.props.min, 10);
      // If input type is number, check if value is valid
      if (isNaN(inputValue)) {
        callback('Please enter valid number');
        return;
      } else if (value && value.length < fieldMinLength) {
        // If minimum length set, check if valid
        callback(`Number is too smal, minimum ${fieldMinLength}`);
        return;
      }
    }
    callback();
    return;
  };

  handleKeyPress = (e: SyntheticKeyboardEvent<any>) => {
    if (e.key === 'Enter' && this.props.onEnter) {
      this.props.onEnter(e);
    }
    // Only allow number input
    if (this.props.type === 'number' || this.props.type === 'amount') {
      if (this.props.type === 'amount' && e.which === 46) {
        return;
      }

      if (
        e.metaKey ||
        e.ctrlKey ||
        e.which === 0 ||
        e.which < 33 ||
        e.which === 37
      ) {
        e.preventDefault();
      }

      if (e.which === 45) {
        e.preventDefault();
      } else if (/[\d\s]/.test(String.fromCharCode(e.which)) === false) {
        e.preventDefault();
      }
    }
  };

  render() {
    const inputClassName = 'cko-input';
    if (!this.props.form) {
      const props = { ...this.props };
      props.ref = node => {
        this.inputNode = node ? node.input : null;
      };

      // Bug with Antd Input component - it does not update when you set default value
      // Temp fix - Access the input node and set the value
      if (props.defaultValue && this.inputNode) {
        this.inputNode.value = props.defaultValue
          ? props.defaultValue.toString()
          : '';
      }

      return (
        <InputWrapStyled size={this.props.size} className={inputClassName}>
          <Input {...props} />
        </InputWrapStyled>
      );
    }

    if (this.props.noFormItem) {
      return (
        <InputWrapStyled size={this.props.size} className={inputClassName}>
          {this.renderInputField()}
        </InputWrapStyled>
      );
    }

    // Wrap Input in FormItem
    return (
      <FormItemStyled>
        <FormItem label={this.props.label} className={this.props.className}>
          <InputWrapStyled size={this.props.size} className={inputClassName}>
            {this.renderInputField()}
          </InputWrapStyled>
        </FormItem>
      </FormItemStyled>
    );
  }
}
