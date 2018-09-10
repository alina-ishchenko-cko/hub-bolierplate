import * as React from 'react';
import CkoAmount from '../CkoAmount';
import { setCurrency } from 'services/currency/currencyService';

describe('CkoAmount', () => {
  let AppComp, mockProps;

  beforeAll(() => {
    const currencies = [
      {
        currencyId: 106,
        name: 'GBP',
        symbol: '£',
        isCommon: true,
        isSettlement: true,
        coefficient: 2,
      },
      {
        currencyId: 107,
        name: 'USD',
        symbol: '$',
        isCommon: true,
        isSettlement: true,
        coefficient: 2,
      },
    ];
    setCurrency(currencies);
  });

  beforeEach(() => {
    mockProps = {
      currencyName: 'GBP',
      onChange: jest.fn(),
      onBlur: jest.fn(),
    };
    AppComp = mount(<CkoAmount {...mockProps} />);
  });

  afterEach(() => {
    AppComp = null;
  });

  it('should contain input tag', () => {
    expect(AppComp.find('input')).toHaveLength(1);
  });

  it('should handle onChange event', () => {
    const inputField = AppComp.find('input.ant-input');
    inputField.simulate('change', { target: { value: '1' } });
    expect(mockProps.onChange).toHaveBeenCalledTimes(1);
    expect(mockProps.onChange).toHaveBeenCalledWith(
      expect.objectContaining({
        target: {
          value: '1',
        },
      })
    );
  });

  it('should handle onBlur event', () => {
    const inputField = AppComp.find('input.ant-input');
    inputField.simulate('blur', { target: { value: '1' } });
    expect(mockProps.onBlur).toHaveBeenCalledTimes(1);
    expect(mockProps.onBlur).toHaveBeenCalledWith('1.00');
  });

  it('should format thousand seperator', () => {
    const inputField = AppComp.find('input.ant-input');
    inputField.simulate('blur', { target: { value: '25000' } });
    expect(mockProps.onBlur).toHaveBeenCalledTimes(1);
    expect(mockProps.onBlur).toHaveBeenCalledWith('25,000.00');
  });

  it('should set empty value to 0.00', () => {
    const inputField = AppComp.find('input.ant-input');
    inputField.simulate('blur', { target: { value: '' } });
    expect(mockProps.onBlur).toHaveBeenCalledTimes(1);
    expect(mockProps.onBlur).toHaveBeenCalledWith('0.00');
  });

  it('should contain cko-currencies component', () => {
    mockProps.currencyIds = [106];
    AppComp = mount(<CkoAmount {...mockProps} />);
    expect(AppComp.find('div.cko-select')).toHaveLength(1);
  });

  it('should contain currency dropdown', () => {
    mockProps.currencyIds = [106, 107];
    AppComp = mount(<CkoAmount {...mockProps} />);
    AppComp.find('div.ant-select').simulate('click');
    const liElement = AppComp.find('li.ant-select-dropdown-menu-item');
    expect(liElement).toHaveLength(2);

    expect(liElement.at(0).text()).toEqual('GBP');
    expect(liElement.at(0).find('span.cko-icon')).toHaveLength(1);
    expect(liElement.at(1).text()).toEqual('USD');
    expect(liElement.at(1).find('span.cko-icon')).toHaveLength(1);
  });
});
