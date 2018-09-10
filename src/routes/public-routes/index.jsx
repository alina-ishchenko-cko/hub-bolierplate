import * as React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from 'components/pages/login/';
import ResetPassword from 'components/pages/reset-password/';
import ForgotPassword from 'components/pages/forgot-password/';
import TwoFactorVerify from 'components/pages/auth-2fa';
import NoMatch from 'components/NoMatch';

export default class PublicRoutes extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/auth-2fa" component={TwoFactorVerify} />
        <Route exact path="/reset-password" component={ResetPassword} />
        <Route path="/reset-password/:token" component={ResetPassword} />
        <Route path="/forgot-password" component={ForgotPassword} />
        <Redirect from="/" to="/login" />
        {/* 404 */}
        <Route component={NoMatch} />
      </Switch>
    );
  }
}
