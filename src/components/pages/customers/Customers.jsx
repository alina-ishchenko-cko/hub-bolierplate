import * as React from 'react';
import TableContainer from 'components/pages/table-container/';
import CustomerProfileInfo from './customer-profile-info';
import CkoIcon from 'components/ui/icon/';
import { FlexItem } from 'components/ui/flex/';
import getCustomerFilters from './CustomerFilters';
// import CustomerDetails from 'components/pages/customer-details/';
import { CustomerHeaderCellStyled } from './styled/CustomersHeader.sc';
import { formatNumber } from 'utils/ui.util';

type Props = {
  selected: Object,
  fromDate: Object,
  toDate: Object,
  list: Object,
  refresh: boolean,
  currencyName: string,
  setPageTitle: Function,
  getAll: Function,
};

export default class Customers extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: 'Name / Email',
        fluidWidth: 25,
        dataField: 'customerEmail',
        key: 'customerEmail',
        render: (customerEmail: string) => {
          return (
            <div className="td-value" title={customerEmail}>
              {/* pass real initials and name when API will be ready */}
              <CustomerProfileInfo
                initials={''}
                name={''}
                email={customerEmail}
              />
            </div>
          );
        },
      },
      {
        title: 'Usual payment method',
        fluidWidth: 15,
        dataField: 'scheme',
        key: 'scheme',
        render: (scheme: string) => {
          return (
            <CkoIcon type="scheme" name={`${scheme.toLowerCase()}-small`} />
          );
        },
      },
      {
        title: (
          <CustomerHeaderCellStyled>
            {/*Add key to title and currency spans, because otherwise 
              we get an error in the console about unique keys. 
              It is an unknown (yet) bug in table header component*/}
            <span key={`ltvTitle`} className="title">
              Life time value
            </span>
            <span key={`ltvCurrency`} className="currency">
              {this.props.currencyName}
            </span>
          </CustomerHeaderCellStyled>
        ),
        fluidWidth: 15,
        dataField: 'ltv',
        key: 'ltv',
      },
      {
        title: 'No. of orders',
        fluidWidth: 10,
        dataField: 'orderHistory',
        key: 'orderHistory',
      },
      {
        title: (
          <CustomerHeaderCellStyled>
            <span key={`lastOrderValueTitle`} className="title">
              Last order value
            </span>
            <span key={`lastOrderValueCurrency`} className="currency">
              {this.props.currencyName}
            </span>
          </CustomerHeaderCellStyled>
        ),
        fluidWidth: 15,
        dataField: 'lastOrderValue',
        key: 'lastOrderValue',
      },
      {
        title: 'User ID',
        fluidWidth: 20,
        dataField: 'id',
        key: 'id',
        render: (id: string) => {
          return (
            <div className="td-value" title={id}>
              {id}
            </div>
          );
        },
      },
    ];
  }

  componentDidMount() {
    this.props.setPageTitle('Customers');
  }

  getTableSourceData() {
    const { datas, headers } = this.props.list;
    const getIndexForHeader = header => headers.indexOf(header);

    if (!datas) {
      return [];
    }

    return datas.map((customerInfo, index) => {
      const customerId = customerInfo[getIndexForHeader('id')];
      return {
        type: 'customer',
        key: customerId,
        customerEmail: customerInfo[getIndexForHeader('email')],
        orderHistory: customerInfo[getIndexForHeader('orderHistory')],
        ltv: formatNumber(
          customerInfo[getIndexForHeader('ltv')],
          this.props.currencyName
        ),
        lastPurchase: customerInfo[getIndexForHeader('lastPurchase')],
        lastOrderValue: formatNumber(
          customerInfo[getIndexForHeader('lastOrderValue')],
          this.props.currencyName
        ),
        scheme: customerInfo[getIndexForHeader('scheme')],
        id: customerId,
      };
    });
  }

  render() {
    const filterableTableParams = {
      filters: getCustomerFilters(),
    };

    return (
      <FlexItem>
        <TableContainer
          isSearchable
          fetchData={this.props.getAll}
          loading={this.props.list.loading}
          dataSource={this.getTableSourceData()}
          columns={this.columns}
          totalRows={this.props.list.totalRows || 0}
          filterableTableParams={filterableTableParams}
          searchPlaceholder="Search"
          relatedRowsParam="status"
        />
      </FlexItem>
    );
  }
}
/*

 {this.props.activeRow.id ? (
          <CustomerDetails
            customerId={this.props.activeRow.id}
            onClose={this.props.setActiveRow}
          />
        ) : null} */
