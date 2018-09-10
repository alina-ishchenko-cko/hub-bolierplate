// @flow
import React from 'react';
import moment from 'moment';
import reduce from 'lodash/reduce';

import CkoTag from 'components/ui/tag';
import CkoButton from 'components/ui/button';
import { formatNumber, elemInView } from 'utils/ui.util';
import * as localApi from 'services/localDataApi';
import type {
  Statement,
  MonthSectionMap,
} from 'store/reducers/statementsReducer';
import type { ColumnDimensionMap } from '../types';

import {
  StatementsTableBodyContainer,
  MonthTableBodyGroup,
  DataTableBodyGroup,
  DataContainerOne,
  DataContainerTwo,
  MonthSection,
  MonthColumn,
  MonthLabel,
  MonthIndicator,
  MonthIndicatorContent,
  MonthIndicatorTopRightCurtain,
  MonthIndicatorBottomRightCurtain,
  MonthIndicatorDot,
  StatementRow,
  DayCreatedColumn,
  DayCreatedLabel,
  StatementPeriodColumn,
  StatementPeriodLabel,
  StatusColumn,
  StatusList,
  AmountColumn,
  AmountList,
  AmountItem,
  AmountItemValue,
  AmountItemCurrency,
  StatementIdColumn,
  StatementIdLabel,
  DownloadColumn,
} from './StatementsTableBody.sc';

type Props = {
  statementsMap: { [string]: { [string]: Statement[] } },
  streamMonthSectionMap: (monthSectionMap: MonthSectionMap) => void,
  isSidebarCollapsed: boolean,
  columnDimensions: ColumnDimensionMap,
};

// key should be `${year}${month}`
type MonthSectionRefMap = { [key: string]: ?HTMLElement };

export default class StatementsTableBody extends React.Component<Props> {
  monthSectionRefMap: MonthSectionRefMap;

  constructor(props: Props) {
    super(props);
    this.monthSectionRefMap = {};
  }

  componentDidMount() {
    window.addEventListener('scroll', this.scrollHandler);
    window.addEventListener('resize', this.resizeHandler);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.scrollHandler);
    window.removeEventListener('resize', this.resizeHandler);
  }

  scrollHandler = () => {
    this.streamMonthSectionMap();
  };

  // identical to scrollHandler now, but may diverge in the future
  resizeHandler = () => {
    this.streamMonthSectionMap();
  };

  getMonth(index: number): string {
    return moment.months()[index];
  }

  getDayCreated = (statement: Statement) => {
    return moment(statement.settlementDate).format('DD dddd');
  };

  getStatementPeriod = (statement: Statement) => {
    const startMoment = moment(statement.startDate);
    const endMoment = moment(statement.endDate);

    if (startMoment.month() !== endMoment.month()) {
      return `${startMoment.format('DD MMM')} -${endMoment.format(
        'DD MMM YYYY'
      )}`;
    } else {
      return `${startMoment.format('DD')} -${endMoment.format('DD MMM YYYY')}`;
    }
  };

  getStatusList = (statement: Statement) => {
    return statement.deposits.map(deposit => {
      switch (deposit.status) {
        case 'Paid Out':
          return {
            value: deposit.status,
            green: true,
          };
        default:
          return {
            value: deposit.status,
          };
      }
    });
  };

  getStatementId(statement: Statement): string {
    return '180228M100005';
  }

  getPDFUrl = (statement: Statement): string => {
    const token = localApi.user.get().data.token;
    return `${statement.url}?X-AuthToken=${token}`;
  };

  get totalMonthSections(): number {
    return Object.keys(this.props.statementsMap).reduce((total, year) => {
      return total + Object.keys(this.props.statementsMap[year]).length;
    }, 0);
  }

  registerMonthSection = (year: string, month: string) => (
    el: ?HTMLDivElement
  ) => {
    const key = `${year}${month}`;
    this.monthSectionRefMap[key] = el;

    // stream the monthSectionMap once all the map's are registed
    if (
      Object.keys(this.monthSectionRefMap).length === this.totalMonthSections
    ) {
      this.streamMonthSectionMap();
    }
  };

  streamMonthSectionMap = () => {
    function update(
      result: MonthSectionMap,
      monthSectionRef: ?HTMLDivElement,
      key: string
    ) {
      const rect = monthSectionRef
        ? monthSectionRef.getBoundingClientRect()
        : null;
      // 124 is to offset the header and section border
      return {
        ...result,
        [key]: {
          rect,
          inView: elemInView(monthSectionRef, rect, 124),
        },
      };
    }

    const monthSectionMap = reduce(this.monthSectionRefMap, update, {});

    this.props.streamMonthSectionMap(monthSectionMap);
  };

  // sorts years and months from statementsMap is decs order as per design
  numericSort = (arr: string[]): string[] => {
    const arrCopy = [...arr];
    return arrCopy.sort((a, b) => +b - +a);
  };

  render() {
    return (
      <StatementsTableBodyContainer>
        {this.numericSort(Object.keys(this.props.statementsMap)).map(year =>
          this.numericSort(Object.keys(this.props.statementsMap[year])).map(
            (month, i) => (
              <MonthSection
                key={i}
                innerRef={this.registerMonthSection(year, month)}>
                <MonthTableBodyGroup
                  dimensions={this.props.columnDimensions.month}
                  isSidebarCollapsed={this.props.isSidebarCollapsed}>
                  <MonthColumn>
                    <MonthIndicator>
                      <MonthIndicatorContent>
                        <MonthIndicatorTopRightCurtain />
                        <MonthIndicatorBottomRightCurtain />
                        <MonthIndicatorDot />
                      </MonthIndicatorContent>
                    </MonthIndicator>
                    <MonthLabel>{this.getMonth(+month)}</MonthLabel>
                  </MonthColumn>
                </MonthTableBodyGroup>
                <DataTableBodyGroup
                  monthDimensions={this.props.columnDimensions.month}
                  isSidebarCollapsed={this.props.isSidebarCollapsed}>
                  {this.props.statementsMap[year][month].map((statement, i) => (
                    <StatementRow key={i}>
                      <DataContainerOne>
                        <DayCreatedColumn
                          dimensions={this.props.columnDimensions.dayCreated}
                          isSidebarCollapsed={this.props.isSidebarCollapsed}>
                          <DayCreatedLabel>
                            {this.getDayCreated(statement)}
                          </DayCreatedLabel>
                        </DayCreatedColumn>
                        <StatementPeriodColumn
                          dimensions={
                            this.props.columnDimensions.statementPeriod
                          }
                          isSidebarCollapsed={this.props.isSidebarCollapsed}>
                          <StatementPeriodLabel>
                            {this.getStatementPeriod(statement)}
                          </StatementPeriodLabel>
                        </StatementPeriodColumn>
                        <StatusColumn
                          dimensions={this.props.columnDimensions.status}
                          isSidebarCollapsed={this.props.isSidebarCollapsed}>
                          <StatusList>
                            {this.getStatusList(statement).map((status, i) => (
                              <CkoTag key={i} margin={false} {...status} />
                            ))}
                          </StatusList>
                        </StatusColumn>
                        <AmountColumn
                          dimensions={this.props.columnDimensions.amount}
                          isSidebarCollapsed={this.props.isSidebarCollapsed}>
                          <AmountList>
                            {statement.deposits.map(
                              ({ amount, currencySymbol }, i) => (
                                <AmountItem key={i}>
                                  <AmountItemValue>
                                    {formatNumber(amount, currencySymbol)}
                                  </AmountItemValue>
                                  <AmountItemCurrency>
                                    {currencySymbol}
                                  </AmountItemCurrency>
                                </AmountItem>
                              )
                            )}
                          </AmountList>
                        </AmountColumn>
                      </DataContainerOne>

                      <DataContainerTwo>
                        <StatementIdColumn
                          dimensions={this.props.columnDimensions.statementId}
                          isSidebarCollapsed={this.props.isSidebarCollapsed}>
                          <StatementIdLabel>
                            {this.getStatementId(statement)}
                          </StatementIdLabel>
                        </StatementIdColumn>
                        <DownloadColumn
                          dimensions={this.props.columnDimensions.download}
                          isSidebarCollapsed={this.props.isSidebarCollapsed}>
                          <CkoButton
                            icon="download"
                            value="PDF"
                            target="_self"
                            link={this.getPDFUrl(statement)}
                          />
                        </DownloadColumn>
                      </DataContainerTwo>
                    </StatementRow>
                  ))}
                </DataTableBodyGroup>
              </MonthSection>
            )
          )
        )}
      </StatementsTableBodyContainer>
    );
  }
}
