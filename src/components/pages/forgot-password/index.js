// @flow
import { connect } from 'react-redux';
import {
  clearPassword,
  requestResetPassword,
} from 'store/actions/passwordActions';
import ForgotPassword from './ForgotPassword';

const mapActionsToProps = {
  clearPassword,
  requestResetPassword,
};

const mapStateToProps = ({ password }) => ({
  requestPasswordData: password.requestPasswordData,
});

export default connect(mapStateToProps, mapActionsToProps)(ForgotPassword);
