// @flow
import * as React from 'react';
import isEqual from 'lodash/isEqual';
import CkoIcon from 'components/ui/icon';
import classNames from 'classnames';
import { getMenuArray } from 'utils/ui.util';
import * as localApi from 'services/localDataApi';
import { FlexItem, FlexColumn } from 'components/ui/flex/';
import { AppSidebarStyled } from './Sidebar.sc';
import * as typed from 'store/reducers/flow-type';
import AccountSelector from '../account-selector/';
import MainMenu from '../main-menu/';
import AppFooter from '../footer/';
import Logo from '../logo/';
import { auth } from 'services/security/authorisation';

type Props = {
  currentUser: typed.LoginData,
  global: typed.Account,
  selected: typed.Selected,
  history: {
    push: Function,
  },
  location: {
    pathname: string,
  },
  getAccountAssets: Function,
  setSelection: Function,
  getAccounts: Function,
  globalLookUp: Function,
  logout: Function,
  toggleSideBar: Function,
};

type State = {
  disableMenu: boolean,
  openSidebar: number,
};

export default class Sidebar extends React.Component<Props, State> {
  static defaultProps = {
    history: {},
    location: {},
    global: {},
    currentUser: {},
  };

  state = {
    disableMenu: false,
    openSidebar: 0,
  };

  componentDidMount() {
    this.setInitData();
  }

  shouldComponentUpdate(nextProps: Props, nextState: State) {
    return !isEqual(this.props, nextProps) || !isEqual(this.state, nextState);
  }

  componentDidUpdate(prevProps: Props) {
    const { accounts, businesses } = this.props.global;
    const { permissions } = this.props.currentUser;

    if (permissions && permissions.length > 0) {
      this.checkViewPermission();
    }

    // Check if data has been updated and only single accounts
    // Get the selected account assets
    if (this.isSingleAccount(accounts)) {
      const accBusiness = businesses[accounts[0].accountId];
      if (
        this.hasDataChanged(prevProps) &&
        !this.props.global.assetsLoading &&
        !accBusiness
      ) {
        this.props.getAccountAssets(accounts[0].accountId);
        return;
      }

      // Check account has businesses
      if (
        accBusiness &&
        accBusiness.length > 0 &&
        !this.props.selected.account.id
      ) {
        this.initSelector(accounts[0], accBusiness);
      }
    }
  }

  /** Sets the inital data for date range and global configs */
  setInitData() {
    // Check if data is cached
    const accountsData = localApi.accounts.get();

    if (accountsData.data === void 0) {
      this.props.getAccounts();
      this.props.globalLookUp();
    }
  }

  initSelector(account: Object, businesses: Array<Object>) {
    const params = {
      ...this.props.selected,
      account: {
        id: parseInt(account.accountId, 10),
        title: account.name,
      },
    };

    if (businesses.length === 1) {
      const business = businesses[0];
      const isSingleChannel = !!(business.channels.length === 1);
      params.business = {
        id: business.propertyId,
        title: business.propertyName,
      };
      params.channel = {
        id: isSingleChannel ? business.channels[0].channelId : null,
        title: isSingleChannel ? business.channels[0].channelName : '',
      };
    }

    // Pass selection to setSelection() action
    this.props.setSelection(params);
  }

  checkViewPermission() {
    const currentPage = this.props.location.pathname;
    const hasNoTransactionsAccess =
      currentPage.includes('/transactions') && !auth.canView('transactions');
    const hasNoStatementsAccess =
      currentPage.includes('/statements') && !auth.canView('Deposits::Viewing');

    if (hasNoTransactionsAccess || hasNoStatementsAccess) {
      this.props.logout();
    }
  }

  /**
   * Checks if NOT multiple accounts
   * @returns {boolean}
   */
  isSingleAccount(accounts: Array<Object>): boolean {
    return !!(accounts.length === 1);
  }

  isSingleBusiness(businesses: Array<Object>): boolean {
    return !!(businesses.length === 1);
  }

  /**
   * Checks if the state or props has changed
   * @param {Object} nextProps
   * @returns {boolean}
   */
  hasDataChanged(prevProps: Props): boolean {
    return !isEqual(prevProps.global, this.props.global);
  }

  /** Handles the logout
   * - Clears the store state
   * - redirects to the login page
   * - refreshes the page
   */
  handleLogout = (e: SyntheticEvent<HTMLLIElement>) => {
    e.preventDefault();
    e.stopPropagation();
    // Clear the store states
    this.props.logout();

    // Redirect to login page
    this.props.history.push('/login');

    // Refresh the whole page
    window.location.reload();
  };

  /** Get the selected account|business|channel */
  getSelected() {
    return this.props.selected;
  }

  /** Handles the account change */
  onAccountChange = (selected: Object) => {
    const businesses = this.props.global.businesses[selected.account.id];
    // Check if accountId Set and
    // The accounts asset does not exist
    if (selected.account.id && !businesses) {
      this.props.getAccountAssets(selected.account.id);
    }

    this.props.setSelection(selected);
  };

  handleSelectorOpen = (disableMenu: boolean) => {
    this.setState({ disableMenu });
  };

  expandSidebar = () => {
    this.setState({ openSidebar: 2 });
    this.handleSidebarToggle(2);
  };

  collapseSidebar = () => {
    this.setState({ openSidebar: 1 });
    this.handleSidebarToggle(1);
  };

  handleSidebarToggle(openSidebar: number) {
    this.props.toggleSideBar(openSidebar);
  }

  render() {
    const { global, currentUser } = this.props;
    const className = {
      openBtn: classNames({
        'collapse-btn': true,
        'open-trigger': true,
        show: this.state.openSidebar === 1,
        hide: this.state.openSidebar === 2,
      }),
      closeBtn: classNames({
        'collapse-btn': true,
        'close-trigger': true,
        show: this.state.openSidebar === 2,
        hide: this.state.openSidebar === 1,
      }),
    };
    return (
      <AppSidebarStyled id="sidebar" className="sidebar-menu">
        <FlexColumn className="inner-sider">
          <FlexItem grow="0">
            <Logo />
          </FlexItem>
          <FlexItem grow="0">
            <AccountSelector
              expandSidebar={this.expandSidebar}
              assetsLoading={global.assetsLoading}
              selected={this.getSelected()}
              onChange={this.onAccountChange}
              loading={global.loading}
              businesses={global.businesses}
              accounts={global.accounts}
              onOpen={this.handleSelectorOpen}
              isGodUser={currentUser.isGodUser || currentUser.isSuperAdmin}
            />
          </FlexItem>
          <FlexItem grow="0">
            <MainMenu
              disable={this.state.disableMenu}
              currentPath={this.props.location.pathname}
              onLogout={this.handleLogout}
              menuData={getMenuArray()}
              username={currentUser.name}
            />
            <button className={className.openBtn} onClick={this.expandSidebar}>
              <CkoIcon name="right" />
            </button>
            <button
              className={className.closeBtn}
              onClick={this.collapseSidebar}>
              <CkoIcon name="left" />
            </button>
          </FlexItem>
          <FlexColumn justify="flex-end">
            <FlexItem grow="0">
              <AppFooter />
            </FlexItem>
          </FlexColumn>
        </FlexColumn>
      </AppSidebarStyled>
    );
  }
}
