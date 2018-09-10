import * as React from 'react';
import { connect } from 'react-redux';
import { updateTwoFactorStatus, logout } from 'store/actions/loginActions';
import { clearData } from 'services/localDataApi';
import CkoSignInLayout from 'components/ui/layout/CkoSignInLayout';
import TwoFactorForm from './TwoFactorForm';

class TwoFactorVerifyContainer extends React.Component {
  componentDidMount() {
    if (!this.props.userData.data) {
      this.props.history.push('/login');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.userData.data.twoFactorPassed) {
      nextProps.history.push('/dashboard');
    } else {
      clearData();
      this.props.logout();
      nextProps.history.push('/login');
    }
  }

  verifyCode = authCode => {
    if (authCode) {
      this.props.updateTwoFactorStatus();
    }
  };

  render() {
    return (
      <CkoSignInLayout title="Two-Factor Authentication">
        <TwoFactorForm onSubmit={this.verifyCode} />
      </CkoSignInLayout>
    );
  }
}

const mapActionsToProps = {
  updateTwoFactorStatus,
  logout
};

const mapStateToProps = ({ login }) => {
  const { userData = {} } = login;
  return {
    userData
  };
};

export default connect(mapStateToProps, mapActionsToProps)(
  TwoFactorVerifyContainer
);
