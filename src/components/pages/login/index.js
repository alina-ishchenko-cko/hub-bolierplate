import { connect } from 'react-redux';
import { loginUser, clearLoginState, logout } from 'store/actions/loginActions';
import { clearPassword, verifyToken } from 'store/actions/passwordActions.js';
import Login from './Login';

const mapActionsToProps = {
  verifyToken,
  clearPassword,
  loginUser,
  logout,
  clearLoginState,
};

const mapStateToProps = ({ currentUser, password }) => ({
  currentUser: currentUser.data,
  newPasswordData: password.newPasswordData,
  requestPasswordData: password.requestPasswordData,
  verifyTokenData: password.verifyTokenData,
});

export default connect(mapStateToProps, mapActionsToProps)(Login);
