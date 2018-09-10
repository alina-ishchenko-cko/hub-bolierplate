// @flow
import * as React from 'react';
import classNames from 'classnames';
import CkoLoading from 'components/ui/loading/';
import {
  WrapStyled,
  SelectedStyled,
  BusinessListStyled,
} from './AccountSelector.sc';
import isEqual from 'lodash/isEqual';
import BusinessList from './business-list/';
import { getDevice } from 'utils/ui.util';

type Props = {
  selected: Object,
  onChange: Function,
  accounts: Array<Object>,
  businesses: Object,
  loading: boolean,
  assetsLoading: boolean,
  onOpen: Function,
  isGodUser: boolean,
  expandSidebar: Function,
};

type State = {
  isOpen: boolean,
};

interface ISelectedName {
  subTitle: string;
  title: string;
}

export default class AccountSelector extends React.Component<Props, State> {
  static defaultProps = {
    selected: {
      account: {
        id: 0,
        title: '',
      },
      business: {
        id: 0,
        title: '',
      },
      channel: {
        id: 0,
        title: '',
      },
    },
    accounts: [],
    businesses: {},
    loading: false,
    isGodUser: false,
  };
  wrapperRef: ?HTMLElement;
  state = { isOpen: false };

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  shouldComponentUpdate(nextProps: Props, nextState: State) {
    return !isEqual(nextProps, this.props) || !isEqual(nextState, this.state);
  }

  /**
   * Gets the business or channel title
   */
  getSelectedName() {
    const { selected } = this.props;
    const data: ISelectedName = {
      subTitle: 'Select Account',
      title: selected.account.title || 'Select Account',
    };

    if (selected.channel.title) {
      data.title = selected.channel.title;
      data.subTitle = selected.business.title;
    } else if (selected.business.title) {
      data.title = selected.business.title;
      data.subTitle = selected.account.title;
    }
    return data;
  }

  /**
   * Checks if the data is loading
   */
  isLoading(): boolean {
    return !!(
      this.props.loading ||
      (!this.props.isGodUser &&
        !this.props.businesses[this.props.selected.account.id])
    );
  }

  /**
   * Checks if single channel
   * - must be single account
   * - single business
   * - and single channel
   */
  isSingleChannel() {
    const { selected, businesses } = this.props;
    return !!(
      this.props.accounts.length === 1 &&
      Object.keys(businesses).length === 1 &&
      businesses[selected.account.id] !== void 0 &&
      businesses[selected.account.id].length === 1 &&
      businesses[selected.account.id][0].channels.length === 1
    );
  }

  hasMultipleBusiness(): boolean {
    return !!(this.props.businesses[this.props.selected.account.id].length > 1);
  }

  /**
   * Account selector visibility toggle
   * - sets the isOpen state
   * - calls onOpen props callback
   */
  toggleMenu(isOpen: boolean = false): void {
    this.setState({ isOpen });
    this.props.onOpen(isOpen);
  }

  handleClickOutside = (e: Object) => {
    if (this.wrapperRef && !this.wrapperRef.contains(e.target)) {
      this.toggleMenu();
    }
  };

  handleToggle = (e: SyntheticEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    // Avoid showing the menu
    // for merchants with single business and channel
    if (!this.isSingleChannel()) {
      const sidebarElement = document.getElementById('sidebar');
      const sideBarWidth = sidebarElement ? sidebarElement.clientWidth : 0;
      if (sideBarWidth === 70) {
        this.props.expandSidebar();
      }
      this.toggleMenu(!this.state.isOpen);
    }
  };

  handleSelection = (e: SyntheticEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const target = e.currentTarget;
    const type = target.getAttribute('data-type');
    const title = target.title;
    const id = parseInt(target.id, 10);
    const { selected } = this.props;
    const params = { ...selected };
    const shouldHide = target.getAttribute('data-hide');

    // Update the selected state
    params[type] = { id, title };

    // If account selected
    // reset the business and channel
    if (type === 'account') {
      params.business = { id: null, title: '' };
      params.channel = { id: null, title: '' };
    } else if (type === 'business') {
      if (!shouldHide && selected.business.id === params.business.id) {
        params.business = { id: null, title: '' };
      }
      params.channel = { id: null, title: '' };
    }

    this.props.onChange(params);

    if (type === 'channel' || shouldHide) {
      this.toggleMenu();
    }
  };

  render() {
    const { selected, accounts, isGodUser, assetsLoading } = this.props;
    const label: ISelectedName = this.getSelectedName();
    const className = classNames({ 'list-active': this.state.isOpen });

    return (
      <div ref={node => (this.wrapperRef = node)} className="account-selector">
        <WrapStyled
          className={className}
          id="accountSelect"
          disableDropDown={this.isSingleChannel()}>
          <SelectedStyled
            className="selected-business"
            onClick={this.handleToggle}>
            {this.isLoading() && <CkoLoading className="text-center" />}
            {!this.isLoading() &&
              label.subTitle && (
                <span className="parent-title">{label.subTitle}</span>
              )}
            {!this.isLoading() &&
              label.title && <div className="child-title">{label.title}</div>}
            {!this.isLoading() && label.title && <i />}
          </SelectedStyled>
          {!this.isLoading() && (
            <BusinessListStyled
              className="channel-wrap"
              deviceHeight={getDevice.height}
              isGodUser={isGodUser}
              assetsLoading={assetsLoading}>
              {assetsLoading && (
                <div className="business-loading-wrap">
                  <CkoLoading className="text-center" />
                </div>
              )}
              {accounts.length > 0 && (
                <BusinessList
                  isGodUser={isGodUser}
                  showSearch={isGodUser}
                  accounts={accounts}
                  businesses={this.props.businesses}
                  selectedAccountId={selected.account.id}
                  selectedChannelId={selected.channel.id}
                  selectedBusinessId={selected.business.id}
                  onClick={this.handleSelection}
                />
              )}
            </BusinessListStyled>
          )}
        </WrapStyled>
      </div>
    );
  }
}
