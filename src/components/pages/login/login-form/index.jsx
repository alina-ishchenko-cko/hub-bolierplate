// @flow
import * as React from 'react';
import Form from 'antd/lib/form';
import { Link } from 'react-router-dom';
import CkoAlert from 'components/ui/alert/';
import CkoIcon from 'components/ui/icon/';
import CkoInput from 'components/ui/form/CkoInput';
import CkoButton from 'components/ui/button';
import { FormWrapStyled } from './LoginForm.sc';

type Props = {
  form: Object,
  onSubmit: Function,
  currentUser: Object,
  alert?: {
    type: string,
    message: string | React.Node,
    description: string | React.Node,
  },
};

class LoginForm extends React.Component<Props> {
  static defaultProps = {
    alert: {
      type: 'info',
      message: null,
      description: null,
    },
  };

  disableBtn(): boolean {
    const values = this.props.form.getFieldsValue(['email', 'password']);
    return !values.email || !values.password;
  }

  forgotOrUnblockLabel(): string {
    const { currentUser } = this.props;
    const attemptsLeft =
      currentUser.error &&
      parseInt(currentUser.errorData.remainingLoginAttempts, 10);

    return attemptsLeft === 0 ? 'Unblock account' : 'Forgot?';
  }

  handleSubmit = (e: SyntheticEvent<any>) => {
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onSubmit({
          email: values.email,
          password: values.password,
        });
      }
    });
  };

  render() {
    const { alert, form } = this.props;

    return (
      <FormWrapStyled>
        <Form onSubmit={this.handleSubmit} className="loginform">
          <CkoInput
            required
            id="email"
            type="email"
            form={form}
            placeholder="Email address"
            message="Please enter your email"
            size="large"
            prefix={<CkoIcon name="email" />}
            onEnter={this.handleSubmit}
          />
          <CkoInput
            required
            id="password"
            form={form}
            type="password"
            placeholder="Password"
            message="Please enter your password"
            size="large"
            className="login-password"
            prefix={<CkoIcon name="lock" />}
            onEnter={this.handleSubmit}
            suffix={
              <Link to="/forgot-password">{this.forgotOrUnblockLabel()} </Link>
            }
          />
          {alert && alert.message && <CkoAlert {...alert} />}
          <CkoButton
            block
            disabled={this.disableBtn()}
            size="large"
            type="primary"
            htmlType="submit"
            className="login-btn"
            value="Sign In"
            id="login-btn"
          />
        </Form>
      </FormWrapStyled>
    );
  }
}

export default Form.create()(LoginForm);
