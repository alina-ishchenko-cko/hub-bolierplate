import React from 'react';
import moment from 'moment';
import DateRange from './';
import { RangeWrapStyled, PlaceHolderStyled } from './DateRange.sc';
import CkoRangePicker from 'components/ui/range-picker';

describe('DateRange', () => {
  let AppComp;
  let mockProps = {};

  beforeEach(() => {
    mockProps = {
      className: 'date-range',
      defaultFrom: moment('2017-01-01'),
      defaultTo: moment('2017-01-03'),
      onChange: jest.fn(),
    };
    AppComp = shallow(<DateRange {...mockProps} />);
  });

  afterEach(() => {
    AppComp = null;
    mockProps.onChange.mockClear();
  });

  it('renders without crashing', () => {
    expect(AppComp.exists()).toBe(true);
  });

  it('should load the default props and state', () => {
    AppComp = mount(<DateRange />);
    const defaultProps = {
      className: 'date-range',
      defaultFrom: moment().startOf('day'),
      defaultTo: moment().endOf('day'),
    };
    expect(AppComp.props()).toEqual(defaultProps);
    expect(AppComp.state('isOpen')).toEqual(false);
  });

  it('should contain styled components', () => {
    expect(AppComp.find(RangeWrapStyled)).toHaveLength(1);
    expect(AppComp.find(PlaceHolderStyled)).toHaveLength(1);
  });

  it('should Not load the CkoRangePicker on mount', () => {
    expect(AppComp.find(CkoRangePicker)).toHaveLength(0);
  });

  it('should load the CkoRangePicker on mount', () => {
    AppComp.setState({ isOpen: true });
    expect(AppComp.find(CkoRangePicker)).toHaveLength(1);
  });

  it('should contain the defined date ranges', () => {
    const dateRange = AppComp.instance().getDateRanges();

    // Today
    const expectedToday = [
      new moment().startOf('day'),
      new moment().endOf('day'),
    ];

    // Yesterday
    const expectedYesterday = [
      new moment().subtract(1, 'day').startOf('day'),
      new moment().subtract(1, 'day').endOf('day'),
    ];

    // This Week
    const expectedThisWeek = [
      new moment().startOf('isoWeek'),
      new moment().endOf('day'),
    ];

    // Past Week
    const expectedPastWeek = [
      new moment().subtract(1, 'weeks').startOf('isoWeek'),
      new moment().subtract(1, 'weeks').endOf('isoWeek'),
    ];

    // This Month
    const expectedThisMonth = [
      new moment().startOf('month'),
      new moment().endOf('day'),
    ];

    // Past Month
    const expectedPastMonth = [
      new moment().subtract(1, 'month').startOf('month'),
      new moment().subtract(1, 'months').endOf('month'),
    ];

    expect(dateRange['Today']).toEqual(expectedToday);
    expect(dateRange['This Week']).toEqual(expectedThisWeek);
    expect(dateRange['Past Week']).toEqual(expectedPastWeek);
    expect(dateRange['This Month']).toEqual(expectedThisMonth);
    expect(dateRange['Past Month']).toEqual(expectedPastMonth);
  });

  it('should show toggle calendar visibility', () => {
    AppComp.find(PlaceHolderStyled).simulate('click');
    expect(AppComp.state('isOpen')).toEqual(true);

    AppComp.find(PlaceHolderStyled).simulate('click');
    expect(AppComp.state('isOpen')).toEqual(false);
  });

  it('should call the onChange when date changed', () => {
    AppComp.find(PlaceHolderStyled).simulate('click');
    expect(AppComp.state('isOpen')).toEqual(true);

    AppComp.find(CkoRangePicker).simulate('change');
    expect(mockProps.onChange).toHaveBeenCalledTimes(1);
    expect(AppComp.state('isOpen')).toEqual(false);
  });
});
