import React from 'react';
import BusinessList from './';
import AccountList from '../account-list/';

describe('BusinessList', () => {
  let AppComp;
  let mockProps = {};

  beforeEach(() => {
    mockProps = {
      isGodUser: false,
      accounts: [
        {
          accountId: 1000,
          name: 'account demo',
        },
      ],
      businesses: {
        '1000': [
          {
            propertyId: 1002,
            propertyName: 'business demo',
            channels: [
              {
                channelId: 1003,
                channelName: 'channel demo',
              },
            ],
          },
        ],
      },
      selectedAccountId: 1000,
      selectedChannelId: 0,
      selectedBusinessId: 0,
      onClick: jest.fn(),
    };
    AppComp = shallow(<BusinessList {...mockProps} />);
  });

  afterEach(() => {
    AppComp = null;
    mockProps.onClick.mockClear();
  });

  it('renders without crashing', () => {
    expect(AppComp.exists()).toBe(true);
  });

  it('should load the default props and state', () => {
    AppComp = mount(<BusinessList />);
    const defaultProps = {
      showSearch: false,
      accounts: [],
      businesses: {},
      selectedAccountId: 0,
      selectedChannelId: 0,
      selectedBusinessId: 0,
    };
    expect(AppComp.props()).toEqual(defaultProps);
    expect(AppComp.state('keyword')).toEqual('');
    expect(AppComp.state('filteredAccounts')).toEqual([]);
  });

  it('should contain AccountList', () => {
    expect(AppComp.find(AccountList)).toHaveLength(1);
  });

  it('should update the filteredAccounts state on mount', () => {
    const { accounts } = mockProps;
    expect(AppComp.state('filteredAccounts')).toEqual(accounts);
  });

  it('should not contain search input', () => {
    expect(AppComp.find('input')).toHaveLength(0);
  });

  it('should contain search input', () => {
    mockProps.showSearch = true;
    AppComp = shallow(<BusinessList {...mockProps} />);
    expect(AppComp.find('input')).toHaveLength(1);
  });

  it('should account, business and channel list', () => {
    AppComp = mount(<BusinessList {...mockProps} />);
    expect(AppComp.find('.account-list')).toHaveLength(1);
    expect(AppComp.find('.business-list')).toHaveLength(1);
    expect(AppComp.find('.channel-list')).toHaveLength(1);
  });

  it('should filter the account list', () => {
    mockProps.showSearch = true;
    mockProps.accounts = [
      {
        accountId: 1000,
        name: 'account demo',
      },
      {
        accountId: 1000,
        name: 'other demo',
      },
    ];
    AppComp = shallow(<BusinessList {...mockProps} />);
    AppComp.find('.list-search').simulate('change', {
      currentTarget: {
        value: 'ot',
      },
    });

    const expectAccounts = [
      {
        accountId: 1000,
        name: 'other demo',
      },
    ];
    expect(AppComp.state('keyword')).toEqual('ot');
    expect(AppComp.state('filteredAccounts')).toEqual(expectAccounts);
  });
});
