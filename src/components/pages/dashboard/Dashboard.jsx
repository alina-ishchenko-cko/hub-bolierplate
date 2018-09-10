// @flow
import * as React from 'react';
import isEqual from 'lodash/isEqual';
import { CkoRow, CkoCol } from 'components/ui/grid';
import { formatNumber } from 'utils/ui.util';
import CkoKPI from 'components/ui/kpi/';
import DashboardTable from './dashboard-table';
import feedback from 'components/ui/feedback/';

type Props = {
  indicators: Object,
  currentUser: Object,
  summary: {
    error: boolean,
    loading: boolean,
    currencies: Array<Object>,
    paymentMethods: Array<Object>,
  },
  refresh: boolean,
  global: Object,
  getIndicators: Function,
  getSummary: Function,
  setPageTitle: Function,
  assetsLoading: boolean,
};

interface CardData {
  title: string;
  subTitle?: string;
  currency?: string;
  value: React.Node;
}

export default class Dashboard extends React.Component<Props> {
  static defaultProps = {
    indicators: {},
    refresh: false,
    global: {},
    summary: {
      currencies: [],
      paymentMethods: [],
    },
  };

  componentDidMount() {
    this.props.setPageTitle('Dashboard');
    this.updateData(this.props.global);
  }

  componentWillReceiveProps(nextProps: Props) {
    if (this.hasDataChanged(nextProps) || nextProps.refresh) {
      this.updateData(nextProps.global);
      return;
    }

    if (nextProps.summary.error || nextProps.indicators.error) {
      feedback.error('Error getting dashboard list');
    }
  }

  hasDataChanged(nextProps: Props): boolean {
    return !isEqual(this.props.global, nextProps.global);
  }

  updateData = (global: Object) => {
    const { selected } = global;

    const params: {
      accountId: number,
      businessId: number,
      channelId: number,
      fromDate: string,
      toDate: string,
    } = {
      accountId: selected.account.id,
      businessId: selected.business.id,
      channelId: selected.channel.id,
      fromDate: global.fromDate,
      toDate: global.toDate,
    };

    if (
      (params.accountId || params.businessId || params.channelId) &&
      params.fromDate &&
      params.toDate
    ) {
      this.props.getIndicators(params);
      this.props.getSummary(params);
    }
  };

  /** Map the indicators data the object*/
  getCardData(): Array<CardData> {
    const { indicators } = this.props;
    const currencyName = this.props.currentUser.displayCurrencyName;
    return [
      {
        id: 'kpi-revenue',
        title: 'Revenue',
        subTitle: 'Sum of Captured Transactions',
        value: formatNumber(indicators.revenue, currencyName, true),
        currency: currencyName,
      },
      {
        id: 'kpi-net-revenue',
        title: 'Net Revenue',
        subTitle: 'Revenue minus refunds and chargebacks',
        value: formatNumber(indicators.netRevenue, currencyName, true),
        currency: currencyName,
      },
      {
        id: 'kpi-approved-sales',
        title: 'Approved Sales',
        subTitle: 'Count of Captured Transactions',
        value: indicators.approvedSales || 0,
      },
      {
        id: 'kpi-customers',
        title: 'Customers',
        value: indicators.customers || 0,
      },
    ];
  }

  isDataLoading() {
    return !!(this.props.indicators.loading || this.props.assetsLoading);
  }

  render() {
    return (
      <div className="dashboard fade-in">
        <CkoRow>
          <CkoKPI
            id="dashboard-kpi"
            data={this.getCardData()}
            loading={this.isDataLoading()}
          />
        </CkoRow>
        <CkoRow>
          <CkoCol noPadding span={24}>
            <DashboardTable
              id="dashboard-table"
              currencyName={this.props.currentUser.displayCurrencyName}
              currencies={this.props.summary.currencies}
              loading={this.isDataLoading()}
              paymentMethods={this.props.summary.paymentMethods}
            />
          </CkoCol>
        </CkoRow>
      </div>
    );
  }
}
