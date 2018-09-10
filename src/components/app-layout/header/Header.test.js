import * as React from 'react';
import CkoTitle from 'components/ui/title/';
import CkoButton from 'components/ui/button/';
import CkoIcon from 'components/ui/icon/';
import Header from './Header';
import DateRange from '../date-range/';
import { clearData } from 'services/localDataApi';
import { AppHeaderStyled, DatePickerStyled } from './Header.sc';

describe('Header', () => {
  let AppComp;
  let mockProps;
  beforeAll(() => {
    mockProps = {
      refreshData: jest.fn(),
      title: 'Dashboard test',
      setDates: jest.fn(),
    };
    AppComp = shallow(<Header {...mockProps} />);
  });

  afterAll(() => {
    AppComp = null;
    clearData();
  });

  it('renders without crashing', () => {
    expect(AppComp.exists()).toBe(true);
  });

  it('should called init methods', () => {
    expect(mockProps.setDates).toHaveBeenCalledTimes(1);
  });

  it('renders contains the styled components', () => {
    expect(AppComp.find(AppHeaderStyled)).toHaveLength(1);
    expect(AppComp.find(DatePickerStyled)).toHaveLength(1);
  });

  it('should have the correct page title', () => {
    const PageTitle = AppComp.find(CkoTitle);
    expect(PageTitle.prop('size')).toEqual('h1');
    expect(PageTitle.prop('value')).toEqual('Dashboard test');
  });

  it('should call the refreshData props', () => {
    AppComp.find(CkoButton).simulate('click');
    expect(mockProps.refreshData).toHaveBeenCalledTimes(1);
  });

  it('renders contains the required components', () => {
    expect(AppComp.find(CkoTitle)).toHaveLength(1);
    expect(AppComp.find(DateRange)).toHaveLength(1);
    expect(AppComp.find(CkoButton)).toHaveLength(1);
    expect(AppComp.find(CkoIcon)).toHaveLength(1);
  });
});
