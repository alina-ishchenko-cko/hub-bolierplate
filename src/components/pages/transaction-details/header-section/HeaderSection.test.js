import React from 'react';
import HeaderSection from './';
import * as cs from 'services/currency/currencyService';

describe('HeaderSection', () => {
  let wrapper, mockProps;
  beforeAll(() => {
    const mockCurrencies = [
      {
        currencyId: 2,
        name: 'GBP',
      },
    ];
    cs.setCurrency(mockCurrencies, 1);
    mockProps = {
      chargeId: 'charge_test_9EEF29AE842T76BD2FC9',
      value: 10,
      currencyName: 'GBP',
      transactionDate: '2018-03-28T14:55:38.87Z',
      transactionStatus: 'Refund : Success',
      responseCode: '10000',
      logs: [
        {
          timestamp: '2018-03-28T14:55:38.87Z',
          id: 'charge_test_9EEF29AE842T76BD2FC9',
          status: 'Refund : Success',
          trackId: '12334',
          responseCode: '10000',
          value: 10,
          currencySymbol: 'GBP',
        },
        {
          timestamp: '2018-03-08T09:01:31.243Z',
          id: 'charge_test_DBFE7A687C842KD7FB5C',
          status: 'Capture : Success',
          trackId: '12334',
          responseCode: '10000',
          value: 10,
          currencySymbol: 'GBP',
        },
        {
          timestamp: '2018-03-08T09:01:31.05Z',
          id: 'charge_test_D0EE7A687C842RD7FB5D',
          status: 'Authorisation : Success',
          trackId: '12334',
          responseCode: '10000',
          value: 10,
          currencySymbol: 'GBP',
        },
      ],
      allowedActions: 4,
      isReadOnlyUser: false,
    };
    wrapper = shallow(<HeaderSection {...mockProps} />);
  });

  it('renders without crashing', () => {
    expect(wrapper.exists()).toBe(true);
  });

  // should contain only blacklist button
  // should contain only capture, refund button
  // should contain only void, blacklist button
  // should not contain show more button
  // should show the correct number of logs
  // should change transaction detials on log click
});
