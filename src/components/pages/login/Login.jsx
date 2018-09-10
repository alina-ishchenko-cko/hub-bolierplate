// @flow
import * as React from 'react';
import moment from 'moment';
import { isUndefined, urlParamsToJson } from 'utils';
import feedback from 'components/ui/feedback/';
import { ERROR_CODE_TITLE } from 'config';
import { Column, Title } from 'components/ui/layout/styled/CkoSignInLayout.sc';
import LoginForm from './login-form/';
import NewsUpdate from './news-update/';
import CkoIcon from 'components/ui/icon/';
import CkoSignInLayout from 'components/ui/layout/CkoSignInLayout';

interface IAlert {
  type?: string;
  message?: string | React.Node;
  description?: string | React.Node;
}

type Props = {
  location: {
    search: string,
  },
  currentUser: Object,
  newPasswordData: Object,
  requestPasswordData: Object,
  verifyTokenData: Object,
  verifyToken: Function,
  clearPassword: Function,
  loginUser: Function,
  clearLoginState: Function,
  logout: Function,
  history: Object,
};

export default class Login extends React.Component<Props> {
  componentDidMount() {
    this.checkStatus();
    this.reset();
  }

  componentWillReceiveProps(nextProps: Props) {
    this.redirectTo(nextProps);
  }

  reset() {
    this.props.clearPassword();
    this.props.clearLoginState();
    this.props.logout();
  }

  getUrlParams() {
    return urlParamsToJson(this.props.location.search);
  }

  checkStatus() {
    const urlParams = this.getUrlParams();
    const { history } = this.props;

    // Show Session expire
    if (urlParams.s === '1') {
      feedback.error('Session expired');
      history.push({
        search: '',
        pathname: history.location.pathname,
      });
    } else if (this.props.requestPasswordData.success) {
      feedback.success('New Password Sent!');
    } else if (this.props.verifyTokenData.error) {
      feedback.error('Reset password token expired');
    } else if (this.props.requestPasswordData.success) {
      feedback.success('New Password Sent!');
    }

    if (urlParams.verify) {
      this.props.verifyToken(urlParams.verify);
    }
  }

  // Check if User is Logged In
  redirectTo(nextProps: Props) {
    const { currentUser, history } = nextProps;

    if (currentUser.twoFactorEnabled) {
      history.push('/auth-2fa');
    } else if (currentUser.token) {
      history.push('/dashboard');
    } else if (nextProps.verifyTokenData.success) {
      const urlParams = this.getUrlParams();
      history.push(`/reset-password/${urlParams.verify}`);
    } else if (nextProps.newPasswordData.email) {
      history.push('/reset-password');
    }
  }

  // Return string - The login error title
  getErrorTitle(error: Object): string {
    return ERROR_CODE_TITLE[error.errorCode] || 'Account Blocked';
  }

  // Login error body message
  // Return JSX
  getErrorDesc(error: Object): React.Node {
    let attemptsLeft, formattedLoginDate, hideLastLogin;
    const { lastLoginDate, remainingLoginAttempts } = error;

    // Check if remainingLoginAttempts & lastLoginDate props exist
    if (!isUndefined(lastLoginDate) && !isUndefined(remainingLoginAttempts)) {
      attemptsLeft = remainingLoginAttempts;
      formattedLoginDate = moment(lastLoginDate).format('DD/MM/YYYY HH:MM:SS');
    } else {
      hideLastLogin = true;
    }

    // ErrorMsgBody Component
    const ErrorMsgBody = () => {
      let msg = error.message;

      // Onyl show the message - Hide Last successful login
      if (hideLastLogin) {
        return <p>{msg}</p>;
      }

      if (attemptsLeft > 0) {
        msg = `${attemptsLeft} more attempts remaining`;
      }

      return (
        <p>
          {msg} <br /> Last successful login: {formattedLoginDate}
        </p>
      );
    };

    return <ErrorMsgBody />;
  }

  // Show Alert Box
  getErrorMsgs(): IAlert {
    const { currentUser } = this.props;

    const errorObj: IAlert = {
      type: 'error',
    };

    if (currentUser.error) {
      errorObj.message = this.getErrorTitle(currentUser.errorData);
      errorObj.description = this.getErrorDesc(currentUser.errorData);
    } else if (this.props.newPasswordData.success) {
      errorObj.type = 'success';
      errorObj.message = 'Password Update Successful';
      errorObj.description = 'Please login with your new password';
    }

    return errorObj;
  }

  // Render HTML
  render() {
    return (
      <CkoSignInLayout loading={this.props.currentUser.loading}>
        <Column align="center">
          <CkoIcon name="logo" className="logo" />
          <Title>Login in to The Hub</Title>
          <LoginForm
            onSubmit={this.props.loginUser}
            currentUser={this.props.currentUser}
            alert={this.getErrorMsgs()}
          />
        </Column>
        <Column align="center">
          <NewsUpdate />
        </Column>
      </CkoSignInLayout>
    );
  }
}
