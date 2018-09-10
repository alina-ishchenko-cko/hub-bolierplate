import React from 'react';
import CustomerSummary from './CustomerSummary';
import ContentList from 'components/ui/layout/ContentList';
import { FlexRow } from 'components/ui/flex';
import * as cs from 'services/currency/currencyService';
import CustomerDetailsValueSummary from '../customer-details-value-summary/';

describe('Customer Summary', () => {
  let wrapper;
  let mockProps;

  beforeAll(() => {
    const mockCurrencies = [
      {
        currencyId: 1,
        name: 'AED',
      },
      {
        currencyId: 2,
        name: 'GBP',
      },
      {
        currencyId: 3,
        name: 'USD',
      },
    ];
    cs.setCurrency(mockCurrencies, 1);

    mockProps = {
      ltv: '5',
      orderHistory: 6,
      currencyName: 'USD',
    };
    wrapper = shallow(<CustomerSummary {...mockProps} />);
  });

  it('renders without crashing', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('renders correctly', () => {
    const tree = renderer.create(<CustomerSummary {...mockProps} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('contains all required components', () => {
    expect(wrapper.find(CustomerDetailsValueSummary)).toHaveLength(2);
    expect(wrapper.find(FlexRow)).toHaveLength(1);
    expect(wrapper.find(ContentList)).toHaveLength(1);
  });

  it('contains summary component for lvt', () => {
    expect(
      wrapper
        .find(CustomerDetailsValueSummary)
        .at(0)
        .props().value
    ).toBe(mockProps.ltv);
  });

  it('contains summary component for order history', () => {
    expect(
      wrapper
        .find(CustomerDetailsValueSummary)
        .at(1)
        .props().value
    ).toBe(mockProps.orderHistory);
  });
});
