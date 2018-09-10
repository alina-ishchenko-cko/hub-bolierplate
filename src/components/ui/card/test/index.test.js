import * as React from 'react';
import CkoCard from '../index';
import CkoSwitch from 'components/ui/switch/';

describe('CkoCard', () => {
  let AppComp, mockProps;

  beforeEach(() => {
    mockProps = {
      title: 'Revenue',
      subTitle: 'Sum of Captured Transactions',
      currency: 'GBP',
      value: '43.35',
    };
  });

  afterEach(() => {
    mockProps = null;
    AppComp = null;
  });

  it('should render loader', () => {
    AppComp = render(<CkoCard loading />);
    expect(AppComp.find('.cko-app-loading')).toHaveLength(1);
    expect(AppComp.find('.amount')).toHaveLength(0);
    expect(AppComp.find('.currency')).toHaveLength(0);
    expect(AppComp.find('.title')).toHaveLength(0);
    expect(AppComp.find('.sub-title')).toHaveLength(0);
  });

  it('should render the values', () => {
    AppComp = render(<CkoCard {...mockProps} />);
    expect(AppComp.find('.cko-app-loading')).toHaveLength(0);
    expect(AppComp.find('.amount').text()).toEqual('43.35');
    expect(AppComp.find('.currency').text()).toEqual('GBP');
    expect(AppComp.find('.title').text()).toEqual('Revenue');
    expect(AppComp.find('.sub-title').text()).toEqual(
      'Sum of Captured Transactions'
    );
    expect(AppComp.find('.cko-switch')).toHaveLength(0);
  });

  it('should include toggle switch', () => {
    mockProps = {
      title: 'Revenue',
      subTitle: 'Sum of Captured Transactions',
      currency: 'GBP',
      value: '43.35',
      switchBtn: {
        btnLabel: ['on', 'off'],
        defaultChecked: 0,
        onToggleBtn: jest.fn(),
      },
    };
    AppComp = render(<CkoCard {...mockProps} />);
    expect(AppComp.find('GBP 50')).toBeTruthy();
    expect(AppComp.find('GBP 20.00')).toBeTruthy();
    expect(AppComp.find('.cko-switch')).toHaveLength(1);
  });

  it('should include toggle the card - off', () => {
    mockProps = {
      id: 'revenue',
      title: 'Revenue',
      subTitle: 'Sum of Captured Transactions',
      currency: 'GBP',
      value: '43.35',
      switchBtn: {
        btnLabel: ['on', 'off'],
        defaultChecked: true,
        onToggleBtn: jest.fn(),
      },
    };
    AppComp = mount(<CkoCard {...mockProps} />);
    AppComp.find('span#off').simulate('click');
    expect(mockProps.switchBtn.onToggleBtn).toHaveBeenCalledTimes(1);
    expect(mockProps.switchBtn.onToggleBtn).toHaveBeenCalledWith(
      false,
      undefined
    );
  });

  it('should include toggle the card - on', () => {
    mockProps = {
      id: 'revenue',
      title: 'Revenue',
      subTitle: 'Sum of Captured Transactions',
      currency: 'GBP',
      value: '43.35',
      switchBtn: {
        btnLabel: ['on', 'off'],
        defaultChecked: false,
        onToggleBtn: jest.fn(),
      },
    };
    AppComp = mount(<CkoCard {...mockProps} />);
    AppComp.find('span#on').simulate('click');
    expect(mockProps.switchBtn.onToggleBtn).toHaveBeenCalledTimes(1);
    expect(mockProps.switchBtn.onToggleBtn).toHaveBeenCalledWith(
      true,
      undefined
    );
  });
});
