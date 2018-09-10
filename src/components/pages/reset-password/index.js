import { connect } from 'react-redux';
import { changePassword, verifyToken } from 'store/actions/passwordActions.js';
import ResetPassword from './ResetPassword';

const mapActionsToProps = {
  changePassword,
  verifyToken,
};

const mapStateToProps = ({ password }) => ({
  newPasswordData: password.newPasswordData,
  verifyTokenData: password.verifyTokenData,
});

export default connect(mapStateToProps, mapActionsToProps)(ResetPassword);
