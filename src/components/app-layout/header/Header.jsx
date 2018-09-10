// @flow
import * as React from 'react';
import moment from 'moment';
import classNames from 'classnames';
import * as localApi from 'services/localDataApi';
import DateRange from '../date-range/';
import CkoTitle from 'components/ui/title/';
import CkoButton from 'components/ui/button/';
import CkoIcon from 'components/ui/icon/';
import { AppHeaderStyled, DatePickerStyled } from './Header.sc';

type Props = {
  title: string,
  currentPath: string,
  fromDate: moment,
  toDate: moment,
  setDates: Function,
  refreshData: Function,
};

type State = {
  isScroll: boolean,
};

export default class Header extends React.Component<Props, State> {
  static defaultProps = {
    currentPath: '',
  };

  state = {
    isScroll: false,
  };
  viewExceptions: Array<string> = ['statements', 'reports'];

  componentDidMount() {
    this.setInitData();
    window.addEventListener('scroll', this.handleScroll);
  }

  /**
   * Remove event listener
   */
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = (e: SyntheticEvent<any>) => {
    const domNode: ?HTMLElement = document.querySelector('#app-content');
    if (domNode) {
      const rect = domNode.getBoundingClientRect();
      if (rect.top <= -1 && !this.state.isScroll) {
        this.setState({ isScroll: true });
      } else if (rect.top >= 0 && this.state.isScroll) {
        this.setState({ isScroll: false });
      }
    }
  };

  setInitData(): void {
    const params = this.getDateRange();
    this.props.setDates(params);
  }

  getDateRange() {
    const cachedDate = localApi.dateRange.get();
    if (cachedDate.fromDate && cachedDate.toDate) {
      return {
        fromDate: moment(cachedDate.fromDate),
        toDate: moment(cachedDate.toDate),
      };
    }
    return {
      fromDate: moment().startOf('day'),
      toDate: moment().endOf('day'),
    };
  }

  /**
   * Handles the date range change
   * @param {array} dates
   */
  onDateChange = (dates: Array<moment>) => {
    let fromDate = dates[0];
    let toDate = dates[1];

    // Cache last selected date
    localApi.dateRange.save({
      fromDate: fromDate.format(),
      toDate: toDate.format(),
    });

    // Update the date state
    this.props.setDates({ fromDate, toDate });
  };

  get shouldShowDateFilter(): boolean {
    return !this.viewExceptions.includes(this.props.currentPath.split('/')[1]);
  }

  render() {
    const defaultDates = this.getDateRange();
    const className = classNames({
      'fix-wrap-width': true,
      'show-border': this.shouldShowDateFilter && this.state.isScroll,
    });
    return (
      <AppHeaderStyled id="app-header" className={className}>
        <CkoTitle size="h1" value={this.props.title} />
        {this.shouldShowDateFilter && (
          <DatePickerStyled>
            <DateRange
              className="date-range"
              defaultFrom={defaultDates.fromDate}
              defaultTo={defaultDates.toDate}
              onChange={this.onDateChange}
            />
            <CkoButton
              type="primary"
              value="Refresh"
              onClick={this.props.refreshData}
            />
          </DatePickerStyled>
        )}
        <CkoIcon name="header-bar" className="btm-border" />
      </AppHeaderStyled>
    );
  }
}
