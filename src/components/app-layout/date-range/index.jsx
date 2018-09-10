// @flow
import * as React from 'react';
import moment from 'moment';
import Locale from 'locales';
import classNames from 'classnames';
import { RangeWrapStyled, PlaceHolderStyled } from './DateRange.sc';
import CkoIcon from 'components/ui/icon/';
import CkoRangePicker from 'components/ui/range-picker';

type Props = {
  className: string,
  defaultFrom: moment,
  defaultTo: moment,
  onChange: Function,
};

type State = {
  isOpen: boolean,
};

export default class DateRange extends React.Component<Props, State> {
  state = { isOpen: false };
  wrapperRef: ?HTMLElement;

  static defaultProps = {
    className: 'date-range',
    defaultFrom: moment().startOf('day'),
    defaultTo: moment().endOf('day'),
  };

  componentDidMount() {
    (document: any).addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    (document: any).removeEventListener('mousedown', this.handleClickOutside);
  }

  /**
   * Calendar visibility toggle
   */
  toggleCalendar(isOpen: boolean = false): void {
    this.setState({ isOpen });
  }

  hideCalendar(): void {
    this.toggleCalendar();
  }

  showCalendar(): void {
    this.toggleCalendar(true);
  }

  getDateRanges(): Object {
    const dateRanges = {};

    // Today
    dateRanges[Locale.get('Today')] = [
      new moment().startOf('day'),
      new moment().endOf('day'),
    ];

    // Yesterday
    dateRanges[Locale.get('Yesterday')] = [
      new moment().subtract(1, 'day').startOf('day'),
      new moment().subtract(1, 'day').endOf('day'),
    ];

    // This Week
    dateRanges[Locale.get('This Week')] = [
      new moment().startOf('isoWeek'),
      new moment().endOf('day'),
    ];

    // Past Week
    dateRanges[Locale.get('Past Week')] = [
      new moment().subtract(1, 'weeks').startOf('isoWeek'),
      new moment().subtract(1, 'weeks').endOf('isoWeek'),
    ];

    // This Month
    dateRanges[Locale.get('This Month')] = [
      new moment().startOf('month'),
      new moment().endOf('day'),
    ];

    // Past Month
    dateRanges[Locale.get('Past Month')] = [
      new moment().subtract(1, 'month').startOf('month'),
      new moment().subtract(1, 'months').endOf('month'),
    ];
    return dateRanges;
  }

  handleClickOutside = (e: any) => {
    if (this.wrapperRef && !this.wrapperRef.contains(e.target)) {
      this.hideCalendar();
    }
  };

  handleClick = (e: SyntheticEvent<HTMLElement>) => {
    this.toggleCalendar(!this.state.isOpen);
  };

  handleChange = (e: SyntheticEvent<>) => {
    this.props.onChange(e);
    this.toggleCalendar();
  };

  /**
   * Create a formatted selected date
   */
  renderSelectedDate(): React.Node {
    const { defaultFrom, defaultTo } = this.props;

    // Check if default from date exist
    // if Not, return empty string
    if (!defaultFrom) {
      return '';
    }

    const dateFormat = 'MMM D, YYYY';
    const fromDate = defaultFrom.format(dateFormat);
    const toDate = defaultTo.format(dateFormat);

    // Check if same day.
    if (toDate === fromDate) {
      return fromDate;
    }

    return (
      <span>
        {fromDate}
        <CkoIcon name="right-arrow" />
        {toDate}
      </span>
    );
  }

  render() {
    const { isOpen } = this.state;
    const holderClassName = classNames({
      'calendar-active': isOpen,
    });

    return (
      <div
        ref={node => {
          this.wrapperRef = node;
        }}>
        <RangeWrapStyled className={this.props.className}>
          <PlaceHolderStyled
            className={holderClassName}
            onClick={this.handleClick}
            id="range-placeholder">
            <CkoIcon name="calendar" />
            <span className="label">Date Filter</span>
            <span className="selected-date">{this.renderSelectedDate()}</span>
          </PlaceHolderStyled>
          {isOpen && (
            <CkoRangePicker
              onChange={this.handleChange}
              defaultValue={[this.props.defaultFrom, this.props.defaultTo]}
              ranges={this.getDateRanges()}
              format="DD-MM-YYYY"
              open={isOpen}
            />
          )}
        </RangeWrapStyled>
      </div>
    );
  }
}
