// @flow
import * as React from 'react';
import CkoIcon from 'components/ui/icon/';
import CkoSignInLayout from 'components/ui/layout/CkoSignInLayout';
import ForgotPasswordForm from './forgot-password-form/';
import { Column, Title } from 'components/ui/layout/styled/CkoSignInLayout.sc';

type Props = {
  history: {
    push: Function,
  },
  requestPasswordData: Object,
  clearPassword: Function,
  requestResetPassword: Function,
};

export default class ForgotPassword extends React.Component<Props> {
  componentDidMount() {
    this.props.clearPassword();
  }

  componentWillUpdate(nextProps: Props) {
    if (nextProps.requestPasswordData.success) {
      this.props.history.push('/login');
    }
  }

  render() {
    const { requestPasswordData } = this.props;
    const errorData: {
      type: string,
      message: string,
      description: string,
    } = {
      type: 'error',
      message: 'Error',
      description: requestPasswordData.message,
    };

    return (
      <CkoSignInLayout loading={requestPasswordData.loading}>
        <Column align="center">
          <CkoIcon name="logo" className="logo" />
          <Title>Locked yourself out?</Title>
          <div className="forgot-password-container">
            <p className="form-info">
              Don't worry, we will send you help. Just enter your e-mail below
              to receive password reset instructions.
            </p>
            <ForgotPasswordForm
              onSubmit={this.props.requestResetPassword}
              error={requestPasswordData.error && errorData}
            />
          </div>
        </Column>
      </CkoSignInLayout>
    );
  }
}
