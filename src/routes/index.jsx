// @flow
import * as React from 'react';
import Loadable from 'react-loadable';
import { isAuthenticated } from 'services/localDataApi';
import PublicRoutes from './public-routes/';

// Code Splitting
const DesktopRoutes = Loadable({
  loader: () => import('./desktop-routes/'),
  loading: () => null,
});

const AppLayout = Loadable({
  loader: () => import('components/app-layout/'),
  loading: () => null,
});

export default class Routes extends React.Component<{}> {
  render() {
    return (
      <div className="app-wrap fluid-height">
        {!isAuthenticated() && <PublicRoutes />}
        {isAuthenticated() && (
          <AppLayout>
            <DesktopRoutes />
          </AppLayout>
        )}
      </div>
    );
  }
}
