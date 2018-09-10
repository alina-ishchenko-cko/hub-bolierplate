import React from 'react';
import CustomerDetails from './CustomerDetails';
import CkoSideContent from 'components/ui/layout/CkoSideContent';
import CustomerDetailsHeader from './customer-details-header/';
import CustomerSummary from './customer-summary/';
import CustomerTransactions from './customer-transactions/';
import CustomerCards from './customer-cards/';
import CustomerAssociatedPlans from './customer-associated-plans/';
import { initAuthorisation, auth } from 'services/security/authorisation';

describe('Customer Details', () => {
  let wrapper;
  let mockProps;
  let instance;
  let mockCustomerDetailsRequestParams;

  const mockUser = {
    permissions: [
      {
        name: 'Subscriptions::Indicators',
        permission: 2,
      },
      {
        name: 'Subscriptions::Plans',
        permission: 15,
      },
      {
        name: 'Subscriptions::Customers',
        permission: 15,
      },
    ],
  };

  beforeAll(() => {
    initAuthorisation(mockUser);
    mockProps = {
      accounts: {
        accountId: 1,
        businessId: 1,
        channelId: 1,
      },
      details: {
        name: 'Alice',
        email: 'a@a.com',
        cards: {
          data: [],
          loading: false,
          error: false,
        },
      },
      cardActions: {
        update: {
          loading: false,
          error: false,
        },
        delete: {
          loading: false,
          error: false,
        },
        default: {
          loading: false,
          error: false,
        },
      },
      updateDetailsActions: {
        loading: false,
        error: false,
      },
      addCreditCardActions: {
        loading: false,
        error: false,
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
      getCustomerDetails: jest.fn(),
      updateCustomerDetails: jest.fn(),
      onClose: jest.fn(),
    };

    wrapper = shallow(<CustomerDetails {...mockProps} />);
    instance = wrapper.instance();

    mockCustomerDetailsRequestParams = {
      ...mockProps.accounts,
      customerId: mockProps.customerId,
    };
  });

  beforeEach(() => {
    wrapper.setProps(mockProps);
    mockProps.getCustomerDetails.mockClear();
  });

  it('renders without crashing', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('contains all required components', () => {
    expect(wrapper.find(CkoSideContent)).toHaveLength(1);
    expect(wrapper.find(CustomerSummary)).toHaveLength(1);
    expect(wrapper.find(CustomerTransactions)).toHaveLength(1);
    expect(wrapper.find(CustomerCards)).toHaveLength(1);
    expect(wrapper.find(CustomerAssociatedPlans)).toHaveLength(1);
  });

  it('passes Customer Details Header to CkoSideContent', () => {
    const CustomerDetailsHeaderWrapper = <CustomerDetailsHeader />;
    expect(
      wrapper
        .find(CkoSideContent)
        .at(0)
        .props().header
    ).toEqual(CustomerDetailsHeaderWrapper);
  });

  it('loads all the data in componentDidMount', () => {
    instance.componentDidMount();

    expect(mockProps.getCustomerDetails).toHaveBeenCalledTimes(1);
    expect(mockProps.getCustomerDetails).toHaveBeenCalledWith(
      mockCustomerDetailsRequestParams
    );
  });

  it('reloads all the data if customerId changes', () => {
    const newCustomerId = 2;
    wrapper.setProps({ customerId: newCustomerId });

    expect(mockProps.getCustomerDetails).toHaveBeenCalledTimes(1);
    expect(mockProps.getCustomerDetails).toHaveBeenCalledWith({
      ...mockCustomerDetailsRequestParams,
      customerId: newCustomerId,
    });
  });

  it('reloads customer details after updating card', () => {
    wrapper.setProps({
      cardActions: {
        ...mockProps.cardActions,
        update: {
          loading: true,
        },
      },
    });
    wrapper.setProps({
      cardActions: {
        ...mockProps.cardActions,
        update: {
          success: true,
        },
      },
    });
    expect(mockProps.getCustomerDetails).toHaveBeenCalledTimes(1);
    expect(mockProps.getCustomerDetails).toHaveBeenCalledWith(
      mockCustomerDetailsRequestParams
    );
  });

  it('reloads customer details after deleting card', () => {
    wrapper.setProps({
      cardActions: {
        ...mockProps.cardActions,
        delete: {
          loading: true,
        },
      },
    });
    wrapper.setProps({
      cardActions: {
        ...mockProps.cardActions,
        delete: {
          success: true,
        },
      },
    });
    expect(mockProps.getCustomerDetails).toHaveBeenCalledTimes(1);
    expect(mockProps.getCustomerDetails).toHaveBeenCalledWith(
      mockCustomerDetailsRequestParams
    );
  });

  it('reloads customer details after set default card', () => {
    wrapper.setProps({
      cardActions: {
        ...mockProps.cardActions,
        default: {
          loading: true,
        },
      },
    });
    wrapper.setProps({
      cardActions: {
        ...mockProps.cardActions,
        default: {
          success: true,
        },
      },
    });
    expect(mockProps.getCustomerDetails).toHaveBeenCalledTimes(1);
    expect(mockProps.getCustomerDetails).toHaveBeenCalledWith(
      mockCustomerDetailsRequestParams
    );
  });

  it('reloads customer details after updating customer details', () => {
    wrapper.setProps({
      updateDetailsActions: {
        loading: true,
      },
    });
    wrapper.setProps({
      updateDetailsActions: {
        success: true,
      },
    });
    expect(mockProps.getCustomerDetails).toHaveBeenCalledTimes(1);
    expect(mockProps.getCustomerDetails).toHaveBeenCalledWith(
      mockCustomerDetailsRequestParams
    );
  });
});
