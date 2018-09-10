import * as React from 'react';
import CkoTable from 'components/ui/table';
import DashboardTable from './';

describe('DashboardTable', () => {
  let AppComp;
  let mockProps;

  beforeEach(() => {
    mockProps = {
      currencyName: 'GBP',
      loading: false,
      currencies: [
        {
          name: 'EUR',
          revenue: 11,
          netRevenue: 11,
          approvedSales: 11,
          customers: 11,
        },
        {
          name: 'USD',
          revenue: 321.5,
          netRevenue: 262.7,
          approvedSales: 346,
          customers: 190,
        },
      ],
      paymentMethods: [
        {
          name: 'MasterCard',
          revenue: 95.85,
          netRevenue: 83.93,
          approvedSales: 142,
          customers: 127,
        },
        {
          name: 'Visa',
          revenue: 142.03,
          netRevenue: 112.23,
          approvedSales: 215,
          customers: 74,
        },
      ],
    };
    AppComp = shallow(<DashboardTable {...mockProps} />);
  });

  afterEach(() => {
    AppComp = null;
  });

  it('renders without crashing', () => {
    expect(AppComp.exists()).toBe(true);
  });

  it('should contain the required components', () => {
    expect(AppComp.find(CkoTable)).toHaveLength(1);
  });

  it('should contain default state', () => {
    const defaultState = {
      activeTab: 'payment-methods',
      data: [
        {
          id: 'payment-methods',
          title: 'Payment methods',
        },
        {
          id: 'currencies',
          title: 'Currencies',
        },
      ],
    };
    expect(AppComp.state('tabs')).toEqual(defaultState);
  });

  it('should contain CkoTable props', () => {
    const tableHead = [
      {
        title: 'Payment method',
        dataIndex: 'name',
        key: 'name',
        width: 150,
      },
      {
        title: 'Revenue',
        dataIndex: 'revenue',
        key: 'revenue',
        width: 150,
      },
      {
        title: 'Net Revenue',
        dataIndex: 'netRevenue',
        key: 'netRevenue',
        width: 150,
      },
      {
        title: 'Approved Sales',
        dataIndex: 'approvedSales',
        key: 'approvedSales',
        width: 150,
      },
      {
        title: 'Customers',
        dataIndex: 'customers',
        key: 'customers',
        width: 150,
      },
    ];
    const Table = AppComp.find(CkoTable);
    expect(Table.prop('loading')).toEqual(false);
    expect(Table.prop('columns')).toEqual(tableHead);
  });
});
