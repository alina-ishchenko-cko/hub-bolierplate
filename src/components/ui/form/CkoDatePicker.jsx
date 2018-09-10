// @flow
import * as React from 'react';
import DatePicker from 'antd/lib/date-picker';
import CkoIcon from 'components/ui/icon/';
import Form from 'antd/lib/form';
import { FormItemStyled, DatePickerStyled } from './styled/CkoDatePicker.sc';
const FormItem = Form.Item;

type Props = {
  id?: string,
  form?: {
    getFieldDecorator: Function,
    getFieldError: Function,
    setFieldsValue: Function,
  },
  format?: string,
  size?: string,
  type?: string,
  rules?: Object,
  noFormItem?: boolean,
  required?: boolean,
  className?: string,
  placeholder?: string,
  label?: string,
  message?: string,
};

type State = {
  inputValue: string,
};

export default class CkoDatePicker extends React.Component<Props, State> {
  defaultDateProps = {
    showToday: false,
    format: this.props.format || 'MMM D, YYYY',
    getCalendarContainer: () => this.refs.calenderWrap,
  };

  renderElement() {
    if (!this.props.form) {
      return null;
    }

    const { form, ...dateProps } = {
      ...this.props,
      ...this.defaultDateProps,
      className:
        this.props.noFormItem && this.props.className
          ? this.props.className
          : '',
    };

    return form.getFieldDecorator(this.props.id, {
      rules: [
        {
          required: this.props.required,
          message: this.props.message || 'Field is required',
        },
      ],
    })(<DatePicker {...dateProps} />);
  }

  renderDatePicker = () => {
    return (
      <DatePickerStyled size={this.props.size} className="cko-date-picker">
        <div className="calender-wrap" ref="calenderWrap" />
        <div className="ant-input-affix-wrapper">
          <div className="ant-input-prefix">
            <CkoIcon name="calendar" />
          </div>
          {this.props.form ? (
            this.renderElement()
          ) : (
            <DatePicker {...this.props} {...this.defaultDateProps} />
          )}
        </div>
      </DatePickerStyled>
    );
  };

  render() {
    if (this.props.form && !this.props.noFormItem) {
      return (
        <FormItemStyled>
          <FormItem label={this.props.label} className={this.props.className}>
            {this.renderDatePicker()}
          </FormItem>
        </FormItemStyled>
      );
    }

    return this.renderDatePicker();
  }
}
