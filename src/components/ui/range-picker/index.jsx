// @flow
import * as React from 'react';
import classNames from 'classnames';
import moment from 'moment';
import DatePicker from 'antd/lib/date-picker';
import { RangeStyled, CalendarStyled } from './styled/CkoRangePicker.sc';
const { RangePicker } = DatePicker;

type Props = {
  format: string,
  open: boolean,
  defaultValue: Array<moment>,
  ranges: Object,
  onChange: Function,
};

type State = {
  maxToDate: ?moment,
};

export default class CkoRangePicker extends React.Component<Props, State> {
  state = {
    maxToDate: null,
  };

  calendarWrap: ?HTMLElement;

  addSixMonths(dateValue: moment) {
    return moment(dateValue)
      .add(6, 'M')
      .startOf('day');
  }

  isOutOfRange(current: moment): boolean {
    const defaultToDate = this.addSixMonths(this.props.defaultValue[0]);
    const maxToDate: moment = this.state.maxToDate || defaultToDate;
    return !!current.isAfter(maxToDate);
  }

  disabledDate = (current: moment) => {
    return this.isOutOfRange(current);
  };

  onCalendarChange = (dates: Array<moment>) => {
    const maxToDate = this.addSixMonths(dates[0]);
    this.setState({ maxToDate });
  };

  dateRender = (current: moment) => {
    const showToolTip = this.isOutOfRange(current);
    return (
      <div className="ant-calendar-date">
        {showToolTip && (
          <span className="error-tip">Maximum 6 month exceeded</span>
        )}
        {current.date()}
      </div>
    );
  };

  render() {
    const calendarClass = classNames({
      calendarWrap: true,
      show: this.props.open,
    });

    const props = {
      ...this.props,
      disabledDate: this.disabledDate,
      onCalendarChange: this.onCalendarChange,
      dateRender: this.dateRender,
      getCalendarContainer: () => this.calendarWrap,
    };

    return (
      <RangeStyled className="cko-range-picker">
        <CalendarStyled>
          <div
            className={calendarClass}
            ref={node => (this.calendarWrap = node)}
          />
        </CalendarStyled>
        <RangePicker {...props} />
      </RangeStyled>
    );
  }
}
