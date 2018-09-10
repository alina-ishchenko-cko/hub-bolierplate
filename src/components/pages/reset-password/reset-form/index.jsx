// @flow
import * as React from 'react';
import Form from 'antd/lib/form';
import CkoAlert from 'components/ui/alert/';
import CkoIcon from 'components/ui/icon/';
import CkoInput from 'components/ui/form/CkoInput';
import CkoButton from 'components/ui/button';
import { isUndefined } from 'utils';

type Props = {
  form: Object,
  error: {
    type: string,
    message: string | React.Node,
    description?: string | React.Node,
  },
  hasToken: boolean,
  tempPassword: string,
  onSubmit: Function,
  onChangeCheckList: Function,
};

export class ResetForm extends React.Component<Props> {
  getValue(id: string) {
    return this.props.form.getFieldValue(id);
  }

  // Validate Current Password
  validateCurrentPassword = (
    rule: Object,
    value: string,
    callback: Function
  ) => {
    const { tempPassword } = this.props;
    if (value && !isUndefined(tempPassword) && value !== tempPassword) {
      callback('Password does not match');
    } else {
      callback();
    }
  };

  // Validates the new password
  validateNewPassword = (rule: Object, value: string, callback: Function) => {
    if (value) {
      if (!this.props.onChangeCheckList(value)) {
        callback('Password does not match requirements');
      } else if (value === this.getValue('currentPassword')) {
        callback('You cannot use the old password');
      } else {
        callback();
      }
    } else {
      callback();
    }
  };

  // Check if the passwords match
  validatePasswordConfirm = (
    rule: Object,
    value: string,
    callback: Function
  ) => {
    if (value && value !== this.getValue('newPassword')) {
      callback('Password does not match');
    } else {
      callback();
    }
  };

  handleSubmit = (e: SyntheticEvent<any>) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onSubmit({ ...values });
      }
    });
  };

  disableBtn(): boolean {
    const newPassVal = this.getValue('newPassword');
    const confirmPassVal = this.getValue('confirmPassword');
    const otherVal = this.props.hasToken
      ? this.getValue('email')
      : this.getValue('currentPassword');

    return !otherVal || !newPassVal || !confirmPassVal;
  }

  render() {
    const { form, error, hasToken } = this.props;
    return (
      <Form onSubmit={this.handleSubmit}>
        {!hasToken && (
          <CkoInput
            required
            id="currentPassword"
            type="password"
            form={form}
            placeholder="Current Password"
            message="Please enter your current password"
            size="large"
            prefix={<CkoIcon name="lock" />}
            rules={{
              validator: this.validateCurrentPassword,
            }}
          />
        )}
        {hasToken && (
          <CkoInput
            required
            id="email"
            type="email"
            form={form}
            placeholder="Email address"
            message="Please enter a valid email"
            size="large"
            prefix={<CkoIcon name="email" />}
          />
        )}
        <CkoInput
          required
          id="newPassword"
          type="password"
          form={form}
          placeholder="New Password"
          message="Please enter a new password"
          size="large"
          prefix={<CkoIcon name="lock" />}
          rules={{
            validator: this.validateNewPassword,
          }}
        />
        <CkoInput
          required
          id="confirmPassword"
          type="password"
          form={form}
          placeholder="Confirmation password"
          message="Please confirm your new password"
          size="large"
          prefix={<CkoIcon name="lock" />}
          rules={{
            validator: this.validatePasswordConfirm,
          }}
        />
        {error && error.message && <CkoAlert {...error} />}
        <CkoButton
          block
          size="large"
          type="primary"
          htmlType="submit"
          value="Reset password and login"
          disabled={this.disableBtn()}
        />
      </Form>
    );
  }
}

export default Form.create()(ResetForm);
