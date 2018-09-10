import { initAuthorisation, auth } from '../authorisation';

describe('Authorisation', () => {
  let setupAuth;
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

  beforeEach(() => {
    setupAuth = initAuthorisation;
  });

  it('should allow the user to read subscriptions', () => {
    setupAuth(mockUser);
    expect(auth.canRead('subscriptions')).toEqual(true);
  });

  it('should allow the user to read dashboard', () => {
    setupAuth(mockUser);
    expect(auth.canRead('dashboard')).toEqual(true);
  });

  it('should allow the user to update transaction', () => {
    setupAuth(mockUser);
    expect(auth.canUpdate('transaction')).toEqual(true);
  });

  it('should allow the user to read risk', () => {
    setupAuth(mockUser);
    expect(auth.canUpdate('risk')).toEqual(true);
  });
});
