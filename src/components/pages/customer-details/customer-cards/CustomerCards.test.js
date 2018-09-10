import React from 'react';
import CustomerCards from './CustomerCards';
import { TableContainerStyled } from '../styled/CustomerDetailesTables.sc';
import CkoTable from 'components/ui/table';

describe('Customer Cards', () => {
  let wrapper;
  let mockProps;
  let instance;

  beforeAll(() => {
    mockProps = {
      cards: {
        data: [{ cardId: 'card_1' }],
        loading: false,
        error: false,
      },
      accounts: {
        accountId: 1,
        businessId: 1,
        channelId: 1,
      },
      countries: [
        {
          countryId: 1,
          countryIso2Code: 'AF',
          countryPhoneCode: '93',
          name: 'Afghanistan',
        },
        {
          countryId: 239,
          countryIso2Code: 'AX',
          countryPhoneCode: '358 18',
          name: 'Aland',
        },
      ],
      customerId: 1,
      deleteCard: jest.fn(),
      setDefaultCard: jest.fn(),
      updateCardDetails: jest.fn(),
    };

    wrapper = shallow(<CustomerCards {...mockProps} />);
    instance = wrapper.instance();
  });

  beforeEach(() => {
    wrapper.setProps(mockProps);
  });

  it('renders without crashing', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('contains all required components', () => {
    expect(wrapper.find(TableContainerStyled)).toHaveLength(1);
    expect(wrapper.find(CkoTable)).toHaveLength(1);
  });

  it('does not render anything if there is no cards data', () => {
    wrapper.setProps({ cards: null });
    expect(wrapper.find(TableContainerStyled)).toHaveLength(0);
    expect(wrapper.find(CkoTable)).toHaveLength(0);
  });
});
