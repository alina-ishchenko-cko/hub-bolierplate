// @flow
import * as React from 'react';
import moment from 'moment';

import type { Statement, MonthSectionMap } from 'store/reducers/statementsReducer';
import {
  DateColumnContainer,
  YearSection,
  YearLabel,
  MonthList,
  MonthItem,
  ListDot,
} from './DateColumn.sc';

type Props = {
  statementsMap: { [string]: { [string]: Statement[] } },
  monthSectionMap: MonthSectionMap,
};

export default class DateColumn extends React.Component<Props> {
  get orderedYears(): string[] {
    return this.numericSort(Object.keys(this.props.statementsMap));
  }

  getOrderedMonths = (year: string): string[] => {
    return this.numericSort(Object.keys(this.props.statementsMap[year]));
  }

  scrollToHandler = (year: string, month: string) => () => {
    const key = `${year}${month}`;
    const element = this.props.monthSectionMap[key];

    if (element && element.rect) {
      // get absolute scroll from top, then offset static header
      const top = window.scrollY + element.rect.top - 122;

      window.scrollTo({
        top,
        behavior: 'smooth',
      });
    }
  };

  // harder to determine just the first one in view
  getActiveMonthSection = (year: string, month: string) => {
    const key = `${year}${month}`;
    const monthSection = this.props.monthSectionMap[key];

    if (!monthSection) {
      return false;
    }

    return monthSection.inView;
  };

  getFirstActiveMonthSection = (year: string, month: string): boolean => {
    const targetKey = `${year}${month}`;
    for (const year of this.orderedYears) {
      const orderedMonths = this.getOrderedMonths(year);
      for (const month of orderedMonths) {
        const isActive = this.getActiveMonthSection(year, month);
        if (isActive) {
          const currentKey = `${year}${month}`;
          return currentKey === targetKey;
        }
      }
    }

    // there should always be a firstActiveMonthSection
    return false;
  };

  getFirstActiveYear = (): string => {
    for (const year of this.orderedYears) {
      const orderedMonths = this.getOrderedMonths(year)
      for (const month of orderedMonths) {
        const isActive = this.getActiveMonthSection(year, month);
        if (isActive) {
          return year;
        }
      }
    }

    // there should always be a firstActiveYear
    return '';
  };

  getFirstMonthOfYear = (year: string) => {
    // the month map will have at least a single key, or something has gone terribly wrong
    return this.numericSort(Object.keys(this.props.statementsMap[year]))[0];
  };

  // sorts years and months from statementsMap is decs order as per design
  numericSort = (arr: string[]): string[] => {
    const arrCopy = [...arr];
    return arrCopy.sort((a, b) => +b - +a);
  };

  renderMonthItem = (year: string) => (month: string, i: number) => {
    const firstActiveMonthSection = this.getFirstActiveMonthSection(
      year,
      month
    );
    return (
      <MonthItem
        key={i}
        onClick={this.scrollToHandler(year, month)}
        active={firstActiveMonthSection}>
        <ListDot active={firstActiveMonthSection} />
        {moment.months()[+month]}
      </MonthItem>
    );
  }

  render() {
    const firstActiveYear = this.getFirstActiveYear();

    return (
      <DateColumnContainer>
        {this.orderedYears.map(
          (year, i) => (
            <YearSection key={i}>
              <YearLabel
                onClick={this.scrollToHandler(
                  year,
                  this.getFirstMonthOfYear(year)
                )}>
                {year}
              </YearLabel>
              {year === firstActiveYear ? (
                <MonthList>
                  {this.getOrderedMonths(year).map(this.renderMonthItem(year))}
                </MonthList>
              ) : null}
            </YearSection>
          )
        )}
      </DateColumnContainer>
    );
  }
}
