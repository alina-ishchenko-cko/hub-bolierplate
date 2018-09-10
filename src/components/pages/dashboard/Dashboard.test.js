import React from 'react';
import Dashboard from './Dashboard';
import CkoKPI from 'components/ui/kpi/';
import { CkoRow, CkoCol } from 'components/ui/grid';
import * as cs from 'services/currency/currencyService';
import DashboardTable from './dashboard-table/';

describe('Dashboard', () => {
  let AppComp;
  let mockProps;

  beforeAll(() => {
    const mockCurrencies = [
      {
        currencyId: 1,
        name: 'AED',
      },
      {
        currencyId: 2,
        name: 'GBP',
      },
      {
        currencyId: 3,
        name: 'USD',
      },
    ];
    cs.setCurrency(mockCurrencies, 2);
  });

  beforeEach(() => {
    mockProps = {
      currentUser: {
        displayCurrencyName: 'GBP',
      },
      setPageTitle: jest.fn(),
      getSummary: jest.fn(),
      getIndicators: jest.fn(),
      global: {
        selected: {
          account: { id: 1000, title: 'account title' },
          business: { id: 1003, title: 'business name' },
          channel: { id: 10004, title: 'channel title' },
        },
        fromDate: '2018-02-16T00:00:00.000Z',
        toDate: '2018-02-16T23:59:59.999Z',
      },
      indicators: {
        loading: false,
        revenue: 0.0,
        netRevenue: 0.0,
        approvedSales: 0.0,
        customers: 0.0,
        currencyId: 106,
      },
    };
    AppComp = shallow(<Dashboard {...mockProps} />);
  });

  afterEach(() => {
    AppComp = null;
    mockProps.setPageTitle.mockClear();
    mockProps.getSummary.mockClear();
    mockProps.getIndicators.mockClear();
  });

  it('renders without crashing', () => {
    expect(AppComp.exists()).toBe(true);
  });

  it('should contain the required components', () => {
    expect(AppComp.find(CkoKPI)).toHaveLength(1);
    expect(AppComp.find(DashboardTable)).toHaveLength(1);
  });

  it('should contain the styled components', () => {
    expect(AppComp.find(CkoRow)).toHaveLength(2);
    expect(AppComp.find(CkoCol)).toHaveLength(1);
  });

  it('should call the required methods on mount', () => {
    const indictorData = {
      accountId: 1000,
      businessId: 1003,
      channelId: 10004,
      fromDate: '2018-02-16T00:00:00.000Z',
      toDate: '2018-02-16T23:59:59.999Z',
    };
    expect(mockProps.setPageTitle).toHaveBeenCalledTimes(1);
    expect(mockProps.setPageTitle).toHaveBeenCalledWith('Dashboard');

    expect(mockProps.getIndicators).toHaveBeenCalledTimes(1);
    expect(mockProps.getIndicators).toHaveBeenCalledWith(indictorData);

    expect(mockProps.getSummary).toHaveBeenCalledTimes(1);
    expect(mockProps.getSummary).toHaveBeenCalledWith(indictorData);
  });

  it('should call the required methods on update', () => {
    mockProps.getSummary.mockClear();
    mockProps.getIndicators.mockClear();

    const indictorData = {
      accountId: 1001,
      businessId: 1003,
      channelId: 10004,
      fromDate: '2018-02-16T00:00:00.000Z',
      toDate: '2018-02-16T23:59:59.999Z',
    };

    AppComp.setProps({
      global: {
        selected: {
          account: { id: 1001, title: 'account title' },
          business: { id: 1003, title: 'business name' },
          channel: { id: 10004, title: 'channel title' },
        },
        fromDate: '2018-02-16T00:00:00.000Z',
        toDate: '2018-02-16T23:59:59.999Z',
      },
    });

    expect(mockProps.getIndicators).toHaveBeenCalledTimes(1);
    expect(mockProps.getIndicators).toHaveBeenCalledWith(indictorData);

    expect(mockProps.getSummary).toHaveBeenCalledTimes(1);
    expect(mockProps.getSummary).toHaveBeenCalledWith(indictorData);
  });

  it('should contain valid CkoKPI props', () => {
    AppComp = mount(<Dashboard {...mockProps} />);
    const Comp = AppComp.find(CkoKPI);
    const { indicators } = mockProps;
    const currencyName = mockProps.currentUser.displayCurrencyName;
    const data = [
      {
        id: 'kpi-revenue',
        title: 'Revenue',
        subTitle: 'Sum of Captured Transactions',
        value: `${indicators.revenue}`,
        currency: currencyName,
      },
      {
        id: 'kpi-net-revenue',
        title: 'Net Revenue',
        subTitle: 'Revenue minus refunds and chargebacks',
        value: `${indicators.netRevenue}`,
        currency: currencyName,
      },
      {
        id: 'kpi-approved-sales',
        title: 'Approved Sales',
        subTitle: 'Count of Captured Transactions',
        value: indicators.approvedSales,
      },
      {
        id: 'kpi-customers',
        title: 'Customers',
        value: indicators.customers,
      },
    ];
    expect(Comp.prop('loading')).toEqual(false);
    expect(Comp.prop('data')).toEqual(data);
  });
});
