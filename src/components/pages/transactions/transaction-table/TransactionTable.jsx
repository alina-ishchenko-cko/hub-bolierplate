// @flow
import React from 'react';
import TableContainer from 'components/pages/table-container/';
import CkoTag from 'components/ui/tag/';
import CkoTooltip from 'components/ui/tooltip';
import moment from 'moment';
import { FlexItem } from 'components/ui/flex/';
import isEmpty from 'lodash/isEmpty';
import CkoIcon from 'components/ui/icon/';
import CkoDropdown from 'components/ui/dropdown/';
import { getBusinessById } from 'services/business/businessService';
import CreatePayment from 'components/pages/create-payment/';
import {
  isActionAllowed,
  getTransactionStatusClass,
  formatNumber,
} from 'utils/ui.util';
import { ACTIONS_OVERVIEW, RESPONSE_CODES } from 'config';
import getTransactionFilters from './transactionFilters';
import TransactionTableActions from '../transaction-table-actions/';
import { trimStatus } from 'utils/transactions';

type State = {
  showPaymentForm: boolean,
};

type Props = {
  selected: Object,
  fromDate: Object,
  toDate: Object,
  list: Object,
  refresh: boolean,
  currentUser: Object,
  lookups: Object,
  selectedRows: Array<Object>,
  setTableRow: Function,
  setTableSearch: Function,
  getAll: Function,
  setActiveRow: Function,
  refreshData: Function,
  assetsLoading: boolean,
  createCharges: Function,
  clearCharges: Function,
  pushToRowDetailStack: Function,
  setTransactionAction: Function,
};

export default class TransactionTable extends React.Component<Props, State> {
  state = {
    showPaymentForm: false,
  };

  isLoading(): boolean {
    return this.props.list.loading || this.props.assetsLoading;
  }

  /**
   * Check if create payment is enabled fo
   * for the business selected
   * @return {boolean}
   */
  canCreatePayment(): boolean {
    const { account, business } = this.props.selected;
    const selectedBusiness = getBusinessById(account.id, business.id);
    return !!(!isEmpty(selectedBusiness) && selectedBusiness.allowMoto);
  }

  resetState() {
    this.props.setTableRow();
  }

  searchByFilterValue = (e: SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const value = e.currentTarget.getAttribute('data-value');
    this.props.setTableSearch(value);
  };

  allowedActions = (
    actions: Array<Object>,
    transactionAction: number
  ): Array<Object> => {
    const { currentUser } = this.props;
    const hasPermission: boolean =
      currentUser.isMerchantAdmin ||
      currentUser.isSuperAdmin ||
      currentUser.isGodUser;

    const availableActions = actions.filter((action: Object) => {
      return isActionAllowed(transactionAction, action, hasPermission);
    });

    return availableActions;
  };

  shouldHideResponseCodeOrFlag() {
    const columns = this.props.list.datas.filter(column => {
      return !column[2].toLowerCase().includes('success');
    });
    return !(columns.length > 0);
  }

  isStatusChargebackOr3D() {
    const statusWith3d = this.props.list.datas.filter(column => {
      const status = column[2].toLowerCase();
      return status.includes('3d') || status.includes('chargeback');
    });
    return !!(statusWith3d.length > 0);
  }

  handleActionChange = (data: Object) => {
    const { key } = data;
    if (key.includes('{')) {
      const rowData = JSON.parse(key);
      const params = { type: 'transaction', ...rowData };
      this.props.setActiveRow(params);
      this.props.pushToRowDetailStack(params);
    } else {
      const dataArray = key.split('|');
      if (dataArray.length === 2) {
        const type = dataArray[0];
        const value = dataArray[1];
        this.props.setTransactionAction({ type, value });
      }
    }
  };

  getTipPlacement(rowIndex: number): string {
    return rowIndex === 0 ? 'bottom' : 'top';
  }

  getSearchStatus(status: string): string {
    if (status.startsWith('Chargeback')) {
      return 'Chargeback';
    }
    return status;
  }

  mapTableColumns = () => {
    const includes3DStatus = this.isStatusChargebackOr3D();
    return [
      {
        width: '100px',
        title: 'Transaction details',
        dataField: 'value',
        key: 'value',
        resizeByValue: true,
        columnClassName: 'trans-details',
        render: (cell: number, rowData: Object) => {
          const value = rowData.value;
          const cardName = rowData.scheme;
          return (
            <div className="details-wrap">
              <div className="value-wrap">
                <span className="cko-currency-format">
                  {formatNumber(value, rowData.currencySymbol)}
                </span>
                <span className="currency">{rowData.currencySymbol}</span>
              </div>
              <div className="cardNum">
                <CkoIcon
                  type="scheme"
                  name={`${cardName.toLowerCase()}-small`}
                />
                {rowData.ccNumber.substr(-4) || 'APM'}
              </div>
            </div>
          );
        },
      },
      {
        width: this.shouldHideResponseCodeOrFlag()
          ? includes3DStatus
            ? '130px'
            : '100px'
          : includes3DStatus
            ? '250px'
            : '220px',
        title: 'Request',
        dataField: 'status',
        key: 'status',
        render: (status: string, rowData: Object, rowIndex: number) => {
          const { responseCode } = rowData;
          const tagStatus = getTransactionStatusClass(status);
          const statusResult = status
            .split(':')[1]
            .trim()
            .toLowerCase();
          const isNotSuccessStatus = statusResult !== 'success';
          return (
            <div className="tag-wrap">
              <CkoTag plain value={trimStatus(status)} />
              {isNotSuccessStatus && (
                <CkoTag
                  red={tagStatus === 'red'}
                  green={tagStatus === 'green'}
                  yellow={tagStatus === 'yellow'}
                  value={statusResult}
                  className="td-tag"
                />
              )}
              {isNotSuccessStatus &&
                responseCode && (
                  <CkoTooltip
                    danger={tagStatus === 'red'}
                    warning={tagStatus === 'yellow'}
                    placement={this.getTipPlacement(rowIndex)}
                    title={RESPONSE_CODES[responseCode]}>
                    <CkoTag className="td-tag" value={responseCode} />
                  </CkoTooltip>
                )}
              <CkoTooltip
                primary
                placement={this.getTipPlacement(rowIndex)}
                title="Filter by request">
                <button
                  className="td-filter-btn"
                  onClick={this.searchByFilterValue}
                  data-value={this.getSearchStatus(status)}>
                  <CkoIcon name="filter" />
                </button>
              </CkoTooltip>
            </div>
          );
        },
      },
      {
        title: 'Customer',
        dataField: 'ccName',
        key: 'ccName',
        fluidWidth: 25,
        hide: true,
        render: (ccName: string, rowData: Object, rowIndex: number) => {
          return (
            <div title={ccName}>
              <span className="td-value">{ccName || 'N/A'}</span>
              <CkoTooltip
                primary
                placement={this.getTipPlacement(rowIndex)}
                title="Filter by customer">
                <button
                  className="td-filter-btn"
                  onClick={this.searchByFilterValue}
                  data-value={ccName}>
                  <CkoIcon name="filter" />
                </button>
              </CkoTooltip>
            </div>
          );
        },
      },
      {
        title: 'Customer Email',
        dataField: 'customerEmail',
        key: 'customerEmail',
        fluidWidth: 25,
        render: (customerEmail: string, rowData: Object, rowIndex: number) => {
          return (
            <div title={customerEmail}>
              <span className="td-value">{customerEmail || 'N/A'}</span>
              <CkoTooltip
                primary
                placement={this.getTipPlacement(rowIndex)}
                title="Filter by email">
                <button
                  className="td-filter-btn"
                  onClick={this.searchByFilterValue}
                  data-value={customerEmail}>
                  <CkoIcon name="filter" />
                </button>
              </CkoTooltip>
            </div>
          );
        },
      },
      {
        title: 'Track ID',
        dataField: 'trackId',
        key: 'trackId',
        fluidWidth: 20,
      },
      {
        title: 'Timestamp',
        dataField: 'timestamp',
        key: 'timestamp',
        fluidWidth: 20,
      },
      {
        title: 'Actions',
        dataField: 'actions',
        key: 'actions',
        fluidWidth: 10,
        columnClassName: 'text-right',
        render: (rowData: Array<Object>, data: Object) => {
          const menuData = [
            {
              label: 'Transaction details',
              iconRight: 'right-arrow',
              key: JSON.stringify(data),
              className: 'transaction-link',
            },
            {
              listTitle: 'Actions',
            },
          ];

          rowData.forEach(row => {
            if (row.name === 'Blacklist') {
              menuData.push({ divider: true });
              menuData.push({
                key: `blacklistId|${data.id}`,
                label: row.name,
                iconLeft: row.name.toLowerCase(),
              });
            } else {
              menuData.push({
                key: `${row.name.toLowerCase()}Id|${data.id}`,
                label: row.name,
                iconLeft: row.name.toLowerCase(),
              });
            }
          });

          return (
            <CkoDropdown
              label={<CkoIcon name="more" />}
              data={menuData}
              onClick={this.handleActionChange}
            />
          );
        },
      },
    ];
  };

  mapDataToTableProps() {
    const { datas, headers } = this.props.list;

    if (!datas) {
      return [];
    }

    // Map the values the table props
    return datas.map(iData => {
      const chargeId = iData[headers.indexOf('id')];
      const timestamp = moment(iData[headers.indexOf('timestamp')]).format(
        'DD/MM/YYYY HH:mm:ss'
      );

      return {
        type: 'transaction',
        key: chargeId,
        timestamp,
        id: chargeId,
        status: iData[headers.indexOf('status')],
        ccName: iData[headers.indexOf('ccName')],
        customerEmail: iData[headers.indexOf('customerEmail')],
        trackId: iData[headers.indexOf('trackId')],
        responseCode: iData[headers.indexOf('responseCode')],
        value: iData[headers.indexOf('value')],
        scheme: iData[headers.indexOf('scheme')],
        actions: this.allowedActions(
          ACTIONS_OVERVIEW,
          iData[headers.indexOf('allowedActions')]
        ),
        currencySymbol: iData[headers.indexOf('currencySymbol')],
        ccNumber: iData[headers.indexOf('ccNumber')],
      };
    });
  }

  togglePaymentForm = () => {
    this.setState(prevState => ({
      showPaymentForm: !prevState.showPaymentForm,
    }));
  };

  handleTransactionActionsClick = (action: string, chargeID?: string) => {
    const { selectedRows } = this.props;
    let actionParams;

    if (chargeID) {
      actionParams = chargeID;
    } else {
      actionParams =
        selectedRows.length === 1 ? selectedRows[0].id : selectedRows;
    }

    this.props.setTransactionAction({
      type: action,
      value: actionParams,
    });
  };

  renderTransactionActions = () => {
    return (
      <TransactionTableActions
        selectedRows={this.props.selectedRows}
        onCreatePayment={this.togglePaymentForm}
        onActionClick={this.handleTransactionActionsClick}
        isReadOnly={this.props.currentUser.isReadOnly}
      />
    );
  };

  render() {
    const filterableTableParams = {
      filters: getTransactionFilters(
        this.props.lookups.currencies,
        this.props.lookups.paymentMethods
      ),
    };

    return (
      <FlexItem className="transactions">
        <CreatePayment
          isVisible={this.state.showPaymentForm}
          onCancel={this.togglePaymentForm}
          onOk={this.props.refreshData}
          createCharges={this.props.createCharges}
          clearCharges={this.props.clearCharges}
        />
        <TableContainer
          selectable
          isSearchable
          fetchData={this.props.getAll}
          refresh={this.props.refresh}
          loading={this.isLoading()}
          dataSource={this.mapDataToTableProps()}
          columns={this.mapTableColumns()}
          totalRows={this.props.list.totalRows || 0}
          onCreatePayment={this.togglePaymentForm}
          onClickAction={this.handleTransactionActionsClick}
          filterableTableParams={filterableTableParams}
          searchPlaceholder="Begins with..."
          relatedRowsParam="status"
          tableHeaderRight={this.renderTransactionActions()}
        />
      </FlexItem>
    );
  }
}
