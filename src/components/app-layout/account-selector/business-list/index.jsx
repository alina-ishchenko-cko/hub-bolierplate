// @flow
import * as React from 'react';
import classNames from 'classnames';
import AccountList from '../account-list/';
import CkoIcon from 'components/ui/icon/';

type Props = {
  showSearch: boolean,
  isGodUser: boolean,
  accounts: Array<Object>,
  businesses: Object,
  selectedAccountId: number,
  selectedChannelId: number,
  selectedBusinessId: number,
  onClick: Function,
};

type State = {
  keyword: string,
  filteredAccounts: Array<Object>,
  toIndex: number,
};

export default class BusinessList extends React.Component<Props, State> {
  listScroll: ?HTMLElement;
  state = {
    keyword: '',
    filteredAccounts: this.props.accounts || [],
    toIndex: 30,
  };

  static defaultProps = {
    showSearch: false,
    accounts: [],
    businesses: {},
    selectedAccountId: 0,
    selectedChannelId: 0,
    selectedBusinessId: 0,
  };

  componentDidMount() {
    if (this.listScroll) {
      this.listScroll.addEventListener('scroll', this.infiniteScroll);
    }
  }

  componentWillUnmount() {
    if (this.listScroll) {
      this.listScroll.removeEventListener('scroll', this.infiniteScroll);
    }
  }

  /**
   * Infinite Scroll
   * Increment the toIndex by 20 in the list scroll
   */
  infiniteScroll = (e: any) => {
    const ulNode = e.target;
    const dataLength = this.props.accounts.length;

    if (ulNode && this.state.toIndex < dataLength) {
      const { scrollHeight, clientHeight, scrollTop } = ulNode;
      const breakPoint = scrollHeight * 0.2;
      const isEndOfScroll =
        scrollHeight - scrollTop - breakPoint <= clientHeight;

      if (isEndOfScroll) {
        // Increment toIndex by 20
        this.setState(prevState => {
          let toIndex = prevState.toIndex + 20;
          if (toIndex >= dataLength) {
            toIndex = dataLength;
          }
          return { toIndex };
        });
      }
    }
  };

  filterAccounts = (e: SyntheticEvent<HTMLInputElement>) => {
    let keyword = e.currentTarget.value.replace(/\s+/g, ' ').toLowerCase();
    const filteredAccounts = this.props.accounts.filter(account => {
      let accountName = account.name.toLowerCase();
      return accountName.startsWith(keyword);
    });

    this.setState({
      keyword: e.currentTarget.value,
      filteredAccounts,
    });
  };

  /**
   * Create the channel list element
   */
  renderChannelList(
    businessId: string,
    businessName: string,
    channels: Array<any>
  ): React.Element<'ul'> {
    const { onClick, selectedChannelId, selectedBusinessId } = this.props;
    const channelList = channels.map(({ channelId, channelName }) => {
      const className = classNames({
        channel: true,
        active: selectedChannelId === channelId,
      });

      return (
        <AccountList
          key={channelId}
          id={channelId}
          title={channelName}
          dataType="channel"
          onClick={onClick}
          className={className}
        />
      );
    });

    const isActive = !selectedChannelId && selectedBusinessId === businessId;
    const className = classNames({ channel: true, active: isActive });
    return (
      <ul className="channel-list">
        <li
          id={businessId}
          title={businessName}
          data-type="business"
          className={className}
          data-hide="true"
          onClick={onClick}>
          All
        </li>
        {channelList}
      </ul>
    );
  }

  /**
   * Create the business list element
   */
  renderBusinessList(businesses: Array<any>): React.Element<'ul'> {
    if (!businesses) {
      return <ul />;
    }

    const { accounts } = this.props;
    const businessList = businesses.map(
      ({ channels, propertyId, propertyName }) => {
        let isActive = false;

        if (
          this.props.selectedBusinessId === propertyId ||
          (accounts.length === 1 && businesses.length === 1)
        ) {
          isActive = true;
        }

        const hasChannels = !!(channels && channels.length > 0);

        let className = classNames({
          list: true,
          active: isActive,
          'parent-list': hasChannels,
        });

        return (
          <AccountList
            key={propertyId}
            id={propertyId}
            title={propertyName}
            dataType="business"
            onClick={this.props.onClick}
            hasChildren={hasChannels}
            childList={this.renderChannelList(
              propertyId,
              propertyName,
              channels
            )}
            className={className}
          />
        );
      }
    );

    let ulClassName = classNames({
      'business-list': true,
      'single-business': !!(accounts.length === 1 && businesses.length === 1),
    });
    return (
      <ul className={ulClassName}>
        {this.props.showSearch && (
          <li className="list-sub-title">Businesses</li>
        )}
        {businessList}
      </ul>
    );
  }

  /**
   * Create the account list element
   */
  renderAccountList() {
    const filteredAccounts = [...this.state.filteredAccounts];
    if (!filteredAccounts.length) {
      return null;
    }

    let accounts = filteredAccounts;
    if (accounts.length > 30) {
      accounts = filteredAccounts.splice(0, this.state.toIndex);
    }

    const isMerchantUser = !this.props.isGodUser;

    const accountList = accounts.map(account => {
      const extraProps = {};
      const accountId: number = account.accountId;
      const isActiveAccount = accountId === this.props.selectedAccountId;

      const className = classNames({
        list: true,
        active: isMerchantUser || (!isMerchantUser && isActiveAccount),
        'parent-list': true,
      });
      const businessList: Array<Object> = this.props.businesses[accountId];

      //if (this.props.isGodUser) {
      extraProps.dataType = 'account';
      extraProps.onClick = this.props.onClick;
      //}

      return (
        <AccountList
          key={accountId}
          id={accountId}
          title={account.name}
          hasChildren={true}
          childList={this.renderBusinessList(businessList)}
          className={className}
          {...extraProps}
        />
      );
    });

    // return list without select All option
    return <ul className="account-list">{accountList}</ul>;
  }

  render() {
    return (
      <div
        className="account-list-wrap"
        ref={node => {
          this.listScroll = node;
        }}>
        {this.props.showSearch && (
          <div className="input-wrap">
            <CkoIcon name="search" />
            <input
              type="text"
              value={this.state.keyword}
              onChange={this.filterAccounts}
              placeholder="Beginning with..."
              className="list-search"
            />
          </div>
        )}
        {this.renderAccountList()}
      </div>
    );
  }
}
