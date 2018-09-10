// @flow
import * as React from 'react';
import LocaleProvider from 'antd/lib/locale-provider';
import { BrowserRouter } from 'react-router-dom';
import * as localApi from 'services/localDataApi';
import { loadCachedLogin, logout } from 'store/actions/loginActions';
import { loadCachedAccounts } from 'store/actions/accountsActions';
import enUS from 'antd/lib/locale-provider/en_US';
import RoutesConfig from './routes/';
import WelcomeModal from 'components/ui/welcome-modal/';

// CSS
import './styles/app.css';

const basePath = process.env.NODE_ENV === 'production' ? '/v2/' : '/';

type State = {
  accountLoading: boolean,
  assetsLoading: boolean,
};

type Props = {
  store: {
    dispatch: Function,
    subscribe: Function,
    getState: Function,
  },
};

export default class App extends React.Component<Props, State> {
  state = {
    accountLoading: false,
    assetsLoading: false,
  };

  unsubscribeStore: Function = () => {};

  componentDidMount() {
    if (this.isUserAuthenticated() && !this.hasSessionExpired()) {
      const userData = localApi.user.get();
      const accountsData = localApi.accounts.get();
      this.props.store.dispatch(loadCachedLogin(userData));
      this.props.store.dispatch(loadCachedAccounts(accountsData));
    } else {
      this.unsubscribeStore = this.props.store.subscribe(this.setLoadingState);
      this.logoutUser();
    }
  }

  langs = {
    en_US: enUS,
  };

  hasSessionExpired(): boolean {
    const ONE_HOUR = 60 * 60 * 1000;
    const userSession = localApi.userSession.get();

    // Check user last date session exist
    if (userSession.lastDate) {
      const lastSessionDate = new Date(userSession.lastDate);
      const currentDate = new Date();

      // Check last session is > an hour
      return currentDate - lastSessionDate > ONE_HOUR;
    }
    return false;
  }

  logoutUser() {
    this.props.store.dispatch(logout(true));
  }

  isUserAuthenticated(): boolean {
    const accountsData = localApi.accounts.get();
    const localDataUpdated = !!(accountsData.fromDate !== void 0);
    return !!(localApi.isAuthenticated() && localDataUpdated);
  }

  setLoadingState = () => {
    const { global, currentUser } = this.props.store.getState();
    const { loading: accountLoading, assetsLoading } = global.data;
    const isMerchantUser = !!(
      !currentUser.data.isSuperAdmin && !currentUser.data.isGodUser
    );

    if (isMerchantUser) {
      if (accountLoading && !this.state.accountLoading) {
        this.setState({ accountLoading });
      } else if (assetsLoading && !this.state.assetsLoading) {
        this.setState({ assetsLoading });
      } else if (this.state.assetsLoading && !assetsLoading) {
        this.setState({ assetsLoading, accountLoading });
        this.unsubscribeStore();
      }
    }
  };

  get showWelcomeModal(): boolean {
    return this.state.assetsLoading || this.state.accountLoading;
  }

  render() {
    return (
      <LocaleProvider locale={this.langs.en_US}>
        <div className="app-wrap fluid-height">
          {this.showWelcomeModal && <WelcomeModal />}
          <BrowserRouter basename={basePath}>
            <RoutesConfig />
          </BrowserRouter>
        </div>
      </LocaleProvider>
    );
  }
}
