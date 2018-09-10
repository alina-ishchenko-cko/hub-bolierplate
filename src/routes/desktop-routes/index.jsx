// @flow
import * as React from 'react';
import Loadable from 'react-loadable';
import { Switch, Route, Redirect } from 'react-router-dom';
import NoMatch from 'components/NoMatch';
import { hideFeedback } from 'components/ui/feedback/';

// Code Splitting
const Dashboard = Loadable({
  loader: () => import('components/pages/dashboard/'),
  loading: () => null,
});
const Transactions = Loadable({
  loader: () => import('components/pages/transactions/'),
  loading: () => null,
});
const Reports = Loadable({
  loader: () => import('components/pages/reports/ReportsContainer'),
  loading: () => null,
});
const Statements = Loadable({
  loader: () => import('components/pages/statements'),
  loading: () => null,
});
const PaymentPlans = Loadable({
  loader: () => import('components/pages/payment-plans/PaymentPlansContainer'),
  loading: () => null,
});
const UserManagement = Loadable({
  loader: () =>
    import('components/pages/user-management/UserManagementContainer'),
  loading: () => null,
});
const UserSettings = Loadable({
  loader: () => import('components/pages/user-settings/UserSettings'),
  loading: () => null,
});
const Customers = Loadable({
  loader: () => import('components/pages/customers/'),
  loading: () => null,
});
const Settings = Loadable({
  loader: () => import('components/pages/settings/SettingsContainer'),
  loading: () => null,
});

type Props = {
  location: Object,
};

export default class DesktopRoutes extends React.Component<Props> {
  componentDidMount() {
    hideFeedback();
  }

  render() {
    return (
      <Switch location={this.props.location}>
        {/* Redirects */}
        <Redirect from="/login" to="/dashboard" />
        <Redirect path="/auth-2fa" to="/dashboard" />
        <Redirect exact path="/" to="/dashboard" />
        {/* Routes */}
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/transactions" component={Transactions} />
        <Route path="/payment-plans" component={PaymentPlans} />
        <Route path="/user-management" component={UserManagement} />
        <Route exact path="/customers" component={Customers} />
        <Route path="/statements" component={Statements} />
        <Route path="/reports" component={Reports} />
        <Route exact path="/settings" component={Settings} />
        <Route path="/settings/user" component={UserSettings} />
        {/* 404 */}
        <Route component={NoMatch} />
      </Switch>
    );
  }
}
