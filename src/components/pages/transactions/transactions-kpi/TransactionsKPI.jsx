// @flow
import * as React from 'react';
import CkoKPI from 'components/ui/kpi/';
import isEqual from 'lodash/isEqual';
import { formatNumber } from 'utils/ui.util';

type Props = {
  selected: Object,
  fromDate: Object,
  toDate: Object,
  indicators: Object,
  refresh: boolean,
  currentUser: Object,
  getIndicators: Function,
  assetsLoading: boolean,
  setPageTitle: Function,
};

type State = {
  refundToggle: boolean,
  chargebacksToggle: boolean,
};

export default class TranKPI extends React.Component<Props, State> {
  state = {
    refundToggle: true,
    chargebacksToggle: false,
  };

  componentDidMount() {
    this.props.setPageTitle('Transactions');
    this.getKPIData();
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    if (this.hasDataChanged(prevProps) || this.props.refresh) {
      this.getKPIData();
    }
  }

  isLoading(): boolean {
    return !!(this.props.indicators.loading || this.props.assetsLoading);
  }

  /**
   * Checks if the accountsData props value has updated
   */
  hasDataChanged(prevProps: Props) {
    return (
      !isEqual(this.props.selected, prevProps.selected) ||
      !isEqual(this.props.fromDate, prevProps.fromDate) ||
      !isEqual(this.props.toDate, prevProps.toDate)
    );
  }

  getKPIData() {
    const { toDate, fromDate, selected } = this.props;

    const params = {
      toDate,
      fromDate,
      accountId: selected.account.id,
      businessId: selected.business.id,
      channelId: selected.channel.id,
    };

    // accountId is required
    if (params.accountId) {
      this.props.getIndicators(params);
    }
  }

  /**
   * Checks if the accountsData props value has updated
   * @return {boolean}
   */
  mapRefundsOrChargebacks(
    toggleValue: boolean,
    currencyName: string,
    objProp: Object
  ) {
    const dataObj = {};
    if (toggleValue) {
      // Value
      dataObj.value = formatNumber(objProp.totalAmount, currencyName, true);

      // subInfo
      dataObj.subInfo = `${
        objProp ? objProp.revenuePercentage : 0
      }% of Revenue`;

      // currency
      dataObj.currency = currencyName;
    } else {
      // Value
      dataObj.value = formatNumber(objProp.totalCount);

      // subInfo
      dataObj.subInfo = `${
        objProp ? objProp.salesPercentage : 0
      }% of approved sales`;

      // currency
      dataObj.currency = '';
    }
    return dataObj;
  }

  onToggleBtn = (type: string) => {
    return () => {
      this.setState(prevState => ({
        [type]: !prevState[type],
      }));
    };
  };

  /**
   * Maps the indicators values to require props for CkoCard
   * @return {array}
   */
  getCardData() {
    const onClickRefund = this.onToggleBtn('refundToggle');
    const onClickChargebacks = this.onToggleBtn('chargebacksToggle');

    const { indicators } = this.props;
    const currencyName = this.props.currentUser.displayCurrencyName;

    const refundsData = this.mapRefundsOrChargebacks(
      this.state.refundToggle,
      currencyName,
      indicators.refunds
    );
    const chargebksData = this.mapRefundsOrChargebacks(
      this.state.chargebacksToggle,
      currencyName,
      indicators.chargebacks
    );

    return [
      {
        id: 'kpi-revenue',
        title: 'Revenue',
        subTitle: 'Sum of captured transactions',
        value: formatNumber(indicators.totalRevenueAmount, currencyName, true),
        currency: currencyName,
      },
      {
        id: 'kpi-approved',
        title: 'Approved sales',
        subTitle: 'Sum of captured transactions',
        value: formatNumber(indicators.totalSalesCount),
      },
      {
        id: 'kpi-refunds',
        title: 'Refunds',
        subTitle: 'Sum of total refunds',
        value: refundsData.value,
        currency: refundsData.currency,
        switchBtn: {
          btnLabel: ['value', 'count'],
          defaultChecked: false,
          onToggleBtn: onClickRefund,
        },
      },
      {
        id: 'kpi-chargeback',
        title: 'Chargebacks',
        subTitle: 'Count of individual chargeback',
        currency: chargebksData.currency,
        value: chargebksData.value,
        switchBtn: {
          btnLabel: ['value', 'count'],
          defaultChecked: true,
          onToggleBtn: onClickChargebacks,
        },
      },
    ];
  }

  render() {
    return <CkoKPI data={this.getCardData()} loading={this.isLoading()} />;
  }
}
