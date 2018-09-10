// @flow
import * as React from 'react';
import CkoTable from 'components/ui/table';
import CkoIcon from 'components/ui/icon/';
import classNames from 'classnames';
import { IconWrapStyled, TabStyled } from './DashboardTable.sc';
import CkoCurrencyFormat from 'components/ui/CkoCurrencyFormat';

type Props = {
  currencyName: string,
  currencies: Array<Object>,
  loading: boolean,
  paymentMethods: Array<Object>,
};

type State = {
  tabs: {
    activeTab: string,
    data: Array<Object>,
  },
};

interface TableData {
  key: string;
  name: React.Element<'span'>;
  revenue: string | React.Node;
  netRevenue: string | React.Node;
  approvedSales: number;
  customers: number;
}

interface TableHeader {
  title: string;
  dataIndex: string;
  key: string;
  width: number;
}

export default class DashboardTable extends React.Component<Props, State> {
  state = {
    tabs: {
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
    },
  };

  static defaultProps = {
    currencies: {},
    loading: false,
    paymentMethods: [],
  };

  /**
   * Checks if currency tab
   */
  isActiveTabCurrency(): boolean {
    return !!(this.state.tabs.activeTab === 'currencies');
  }

  /**
   * Map the data to the table keys
   */
  createTableData(
    arrayData: Array<Object>,
    isCurrencies: boolean
  ): Array<TableData> {
    // Return object map with user data
    return arrayData.map((data, index) => {
      const dataName = data.name.toLowerCase();
      const prefix = isCurrencies ? data.name : this.props.currencyName;
      const iconName = isCurrencies ? dataName.substring(0, 2) : dataName;
      const iconProps = {
        name: iconName,
        type: isCurrencies ? 'flag' : 'scheme',
      };

      return {
        key: `detailInd-${index.toString()}`,
        name: (
          <span>
            <IconWrapStyled isCurrencies={isCurrencies}>
              <CkoIcon {...iconProps} />
            </IconWrapStyled>
            {data.name}
          </span>
        ),
        revenue: (
          <CkoCurrencyFormat
            prefix={prefix}
            value={data.revenue}
            currencyName={prefix}
          />
        ),
        netRevenue: (
          <CkoCurrencyFormat
            prefix={prefix}
            value={data.netRevenue}
            currencyName={prefix}
          />
        ),
        approvedSales: data.approvedSales,
        customers: data.customers,
      };
    });
  }

  getTableDataSource(): Array<TableData> {
    const { currencies, paymentMethods } = this.props;

    // Check if currency tab
    if (currencies.length > 0 && this.isActiveTabCurrency()) {
      return this.createTableData(currencies, true);
    } else if (paymentMethods.length > 0 && !this.isActiveTabCurrency()) {
      return this.createTableData(paymentMethods, false);
    }

    return [];
  }

  /**
   * Tab event handler
   */
  handleTabChange = (e: SyntheticEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    const activeTab = e.currentTarget.id;
    if (activeTab) {
      this.setState(prevState => {
        return {
          tabs: {
            ...prevState.tabs,
            activeTab,
          },
        };
      });
    }
  };

  /**
   * Create table headers
   */
  getTableHeaders(): Array<TableHeader> {
    return [
      {
        title: this.isActiveTabCurrency() ? 'Currency' : 'Payment method',
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
  }

  renderTab = () => {
    const { tabs } = this.state;
    return (
      <TabStyled>
        {tabs.data.map(tab => (
          <a
            className={classNames({
              tableTab: true,
              active: tab.id === tabs.activeTab,
            })}
            key={tab.id}
            id={tab.id}
            onClick={this.handleTabChange}>
            {tab.title}
          </a>
        ))}
      </TabStyled>
    );
  };

  render() {
    return (
      <CkoTable
        tabs={this.state.tabs}
        pagination={false}
        loading={this.props.loading}
        dataSource={this.getTableDataSource()}
        columns={this.getTableHeaders()}
        headerLeft={this.renderTab()}
      />
    );
  }
}
