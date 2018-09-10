import * as React from 'react';
import { getMenuArray } from 'utils/ui.util';
import CkoIcon from 'components/ui/icon/';
import { MemoryRouter } from 'react-router-dom';
import MainMenu from './';
import { MenuStyled } from './MainMenu.sc';
import { initAuthorisation } from 'services/security/authorisation';

describe('MainMenu', () => {
  let AppComp;
  let mockProps = {};

  beforeAll(() => {
    const mockUser = {
      permissions: [
        {
          name: 'Customers::CreditCard',
          permission: 13,
        },
        {
          name: 'Customers::Details',
          permission: 6,
        },
        {
          name: 'Customers::Graph::Customers',
          permission: 2,
        },
        {
          name: 'Customers::Indicators',
          permission: 2,
        },
        {
          name: 'Customers::Overview',
          permission: 2,
        },
        {
          name: 'Dashboard::GraphRevenue',
          permission: 2,
        },
        {
          name: 'Dashboard::GraphSales',
          permission: 2,
        },
        {
          name: 'Dashboard::KPI',
          permission: 2,
        },
        {
          name: 'Reports::Run',
          permission: 3,
        },
        {
          name: 'Transaction::Detail',
          permission: 6,
        },
        {
          name: 'Transactions::Action::Blacklist',
          permission: 6,
        },
        {
          name: 'Transactions::Action::Capture',
          permission: 1,
        },
        {
          name: 'Transactions::Action::CreatePayment',
          permission: 1,
        },
        {
          name: 'Transactions::Action::Refund',
          permission: 1,
        },
        {
          name: 'Transactions::Action::Void',
          permission: 1,
        },
        {
          name: 'Transactions::Graph',
          permission: 2,
        },
        {
          name: 'Transactions::Indicators',
          permission: 2,
        },
        {
          name: 'Transactions::Sales',
          permission: 2,
        },
        {
          name: 'UserProfileManagement',
          permission: 15,
        },
        {
          name: 'Risk::Settings',
          permission: 15,
        },
        {
          name: 'ManagedEntities',
          permission: 7,
        },
        {
          name: 'Miscellaneous',
          permission: 15,
        },
        {
          name: 'ManagedEntities::Account',
          permission: 2,
        },
        {
          name: 'ManagedEntities::Business',
          permission: 2,
        },
        {
          name: 'Subscriptions::Indicators',
          permission: 2,
        },
        {
          name: 'Subscriptions::Plans',
          permission: 15,
        },
        {
          name: 'Subscriptions::Customers',
          permission: 15,
        },
        {
          name: 'SystemAdmin::PricingProfile',
          permission: 2,
        },
        {
          name: 'ManagedEntities::Channel',
          permission: 6,
        },
        {
          name: 'Deposits::Viewing',
          permission: 2,
        },
        {
          name: 'Deposits::Adjustment',
          permission: 4,
        },
        {
          name: 'ProcessingSettings::Processors',
          permission: 2,
        },
        {
          name: 'Admin::Settings',
          permission: 3,
        },
        {
          name: 'Deposits::Indicators',
          permission: 0,
        },
        {
          name: 'Deposits::Reviewing',
          permission: 0,
        },
        {
          name: 'SystemAdmin::ServiceStatus',
          permission: 0,
        },
        {
          name: 'SystemAdmin::IPSP',
          permission: 0,
        },
        {
          name: 'SystemAdmin::LPManagement',
          permission: 0,
        },
        {
          name: 'ProcessingSettings::TDM',
          permission: 0,
        },
        {
          name: 'Transactions::Action::Blacklist::isLocalBlacklist',
          permission: 0,
        },
        {
          name: 'Deposits::ForceWire',
          permission: 0,
        },
        {
          name: 'Deposits::Regenerate',
          permission: 0,
        },
        {
          name: 'Deposits::ForceCF',
          permission: 0,
        },
        {
          name: 'Deposits::Realign',
          permission: 0,
        },
      ],
    };
    initAuthorisation(mockUser);
  });

  beforeEach(() => {
    mockProps = {
      disable: false,
      currentPath: './dashboard',
      onLogout: jest.fn(),
      menuData: getMenuArray(),
      username: 'tosin-ekolie',
    };
    AppComp = mount(
      <MemoryRouter>
        <MainMenu {...mockProps} />
      </MemoryRouter>
    );
  });

  afterAll(() => {
    AppComp = null;
  });

  it('renders without crashing', () => {
    expect(AppComp.exists()).toBe(true);
  });

  it('should contains the style component', () => {
    expect(AppComp.find(MenuStyled)).toHaveLength(1);
  });

  it('should match the links labels', () => {
    const menuArray = getMenuArray();
    const expectedLabelList = [];

    menuArray.forEach(list => {
      if (list.label) {
        expectedLabelList.push(list.label);
      }
    });

    const labelList = AppComp.find('ul.menu-list li a .menu-title').map(list =>
      list.text()
    );

    labelList.push('Log out');
    expect(labelList).toEqual(expect.arrayContaining(expectedLabelList));
  });

  it('should call logout handler', () => {
    AppComp.find('li.logout a').simulate('click');
    expect(mockProps.onLogout).toHaveBeenCalledTimes(1);
  });

  it('should contain the menu icons', () => {
    expect(AppComp.find(CkoIcon)).toHaveLength(7);
  });
});
