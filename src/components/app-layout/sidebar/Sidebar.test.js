import React from 'react';
import MainMenu from '../main-menu/';
import Sidebar from './Sidebar';
import { MemoryRouter } from 'react-router-dom';
import * as localApi from 'services/localDataApi';
import AppLogo from '../logo/';
import AppFooter from '../footer/';
import AccountSelector from '../account-selector/';
import { AppSidebarStyled } from './Sidebar.sc';

describe('Sidebar', () => {
  let AppComp, mockProps;

  beforeEach(() => {
    mockProps = {
      currentUser: {
        permissions: [],
      },
      global: {
        assetsLoading: false,
        accounts: [
          {
            accountId: 1000,
          },
        ],
        businesses: {},
      },
      selected: {
        account: {
          id: null,
          title: 'account title',
        },
        business: {
          id: null,
          title: '',
        },
        channel: {
          id: null,
          title: '',
        },
      },
      history: {
        push: jest.fn(),
      },
      location: {
        pathname: '/dashboard',
      },
      getAccountAssets: jest.fn(),
      setSelection: jest.fn(),
      getAccounts: jest.fn(),
      globalLookUp: jest.fn(),
      logout: jest.fn(),
      toggleSideBar: jest.fn(),
    };
    AppComp = shallow(<Sidebar {...mockProps} />);
  });

  afterEach(() => {
    AppComp = null;
    localApi.clearData();
  });

  it('renders without crashing', () => {
    expect(AppComp.exists()).toBe(true);
  });

  it('renders correctly', () => {
    const tree = renderer
      .create(
        <MemoryRouter>
          <Sidebar {...mockProps} />
        </MemoryRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should contain required styled components', () => {
    expect(AppComp.find(AppSidebarStyled)).toHaveLength(1);
  });

  it('should contain required components', () => {
    expect(AppComp.find(AccountSelector)).toHaveLength(1);
    expect(AppComp.find(MainMenu)).toHaveLength(1);
    expect(AppComp.find(AppLogo)).toHaveLength(1);
    expect(AppComp.find(AppFooter)).toHaveLength(1);
  });

  it('should setup the data on mount', () => {
    mockProps.globalLookUp.mockClear();
    mockProps.getAccounts.mockClear();
    mockProps.currentUser = { token: '234567890' };
    AppComp = shallow(<Sidebar {...mockProps} />);
    expect(mockProps.getAccounts).toHaveBeenCalledTimes(1);
    expect(mockProps.globalLookUp).toHaveBeenCalledTimes(1);
  });

  it('should load assets and set selection on refresh', () => {
    mockProps.globalLookUp.mockClear();
    mockProps.getAccounts.mockClear();
    mockProps.getAccountAssets.mockClear();
    mockProps.setSelection.mockClear();

    const selection = {
      account: { id: 1000, title: 'account title' },
      business: { id: 1003, title: 'business name' },
      channel: { id: 10004, title: 'channel title' },
    };
    mockProps.global.accounts = [];
    mockProps.currentUser = { token: '234567890' };
    AppComp = shallow(<Sidebar {...mockProps} />);
    expect(mockProps.getAccounts).toHaveBeenCalledTimes(1);
    expect(mockProps.globalLookUp).toHaveBeenCalledTimes(1);

    // Create prop change when account response
    AppComp.setProps({
      global: {
        assetsLoading: false,
        accounts: [
          {
            accountId: 1000,
          },
        ],
        businesses: {},
      },
    });

    expect(mockProps.getAccountAssets).toHaveBeenCalledTimes(1);

    // Create prop for business asset resposnse
    AppComp.setProps({
      global: {
        assetsLoading: false,
        accounts: [
          {
            accountId: 1000,
            name: 'account title',
          },
        ],
        businesses: {
          '1000': [
            {
              propertyId: 1003,
              propertyName: 'business name',
              channels: [
                {
                  channelId: 10004,
                  channelName: 'channel title',
                },
              ],
            },
          ],
        },
      },
    });

    expect(mockProps.setSelection).toHaveBeenCalledTimes(1);
    expect(mockProps.getAccountAssets).toHaveBeenCalledWith(
      selection.account.id
    );
    expect(mockProps.setSelection).toHaveBeenCalledWith(selection);
  });

  it('should logout user', () => {
    const tempMenu = AppComp.find(MainMenu).prop('onLogout');
    tempMenu({
      preventDefault: () => {},
      stopPropagation: () => {},
    });
    //
    expect(mockProps.logout).toHaveBeenCalledTimes(1);
    expect(mockProps.history.push).toHaveBeenCalledTimes(1);
    expect(mockProps.history.push).toHaveBeenCalledWith('/login');
  });

  it('should expand sidebar', () => {
    AppComp.setState({
      openSidebar: 1,
    });
    const Btn = AppComp.find('button').at(0);
    Btn.simulate('click');
    expect(AppComp.state('openSidebar')).toBe(2);
    expect(mockProps.toggleSideBar).toHaveBeenCalledWith(2);
    expect(mockProps.toggleSideBar).toHaveBeenCalledTimes(1);
  });

  it('should collapse sidebar', () => {
    AppComp.setState({
      openSidebar: 2,
    });
    const Btn = AppComp.find('button').at(1);
    Btn.simulate('click');
    expect(AppComp.state('openSidebar')).toBe(1);
    expect(mockProps.toggleSideBar).toHaveBeenCalledWith(1);
    expect(mockProps.toggleSideBar).toHaveBeenCalledTimes(1);
  });
});
