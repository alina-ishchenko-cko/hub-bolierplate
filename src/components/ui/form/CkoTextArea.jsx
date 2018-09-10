// @flow
import * as React from 'react';
import Input from 'antd/lib/input';
import Form from 'antd/lib/form';
import { FormItemStyled, TextareaWrapStyled } from './styled';
const FormItem = Form.Item;
const { TextArea } = Input;

type Props = {
  id?: string,
  form?: {
    getFieldDecorator: Function,
    getFieldError: Function,
    setFieldsValue: Function,
  },
  defaultValue?: string | number,
  size?: string,
  type?: string,
  rules?: any,
  noFormItem?: boolean,
  required?: boolean,
  className?: string,
  placeholder?: string,
  label?: string,
  message?: string,
  hasFeedback?: boolean,
  onEnter?: Function,
  addonBefore?: string | number | React.Node | Function,
};

export default class CkoTextArea extends React.Component<Props> {
  renderTextareaElement() {
    const inputProps = {
      ...this.props,
      rows: 4,
      className: this.props.noFormItem ? this.props.className : '',
    };
    delete inputProps.noFormItem;
    delete inputProps.rules;
    delete inputProps.form;

    if (!this.props.form) {
      return null;
    }

    return this.props.form.getFieldDecorator(this.props.id, {
      rules: [
        {
          required: this.props.required,
          message: this.props.message,
        },
      ],
    })(<TextArea {...inputProps} />);
  }

  render() {
    // Render the Input tag without form
    if (!this.props.form) {
      return (
        <TextareaWrapStyled size={this.props.size} className="cko-textarea">
          <TextArea {...this.props} />
        </TextareaWrapStyled>
      );
    }

    // Wrap Input in FormItem
    const renderWithFormItem = (
      <FormItemStyled>
        <FormItem
          label={this.props.label}
          className={this.props.className}
          hasFeedback={this.props.hasFeedback}
        >
          <TextareaWrapStyled size={this.props.size} className="cko-textarea">
            {this.renderTextareaElement()}
          </TextareaWrapStyled>
        </FormItem>
      </FormItemStyled>
    );

    // Render without FormItem wrap
    if (this.props.noFormItem) {
      return this.renderTextareaElement();
    }

    return renderWithFormItem;
  }
}
