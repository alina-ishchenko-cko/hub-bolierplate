import React from 'react';
import CustomerAssociatedPlans from './CustomerAssociatedPlans';
import { initAuthorisation, auth } from 'services/security/authorisation';
import { TableContainerStyled } from '../styled/CustomerDetailesTables.sc';
import CkoTable from 'components/ui/table';
import AddPaymentPlan from 'components/pages/add-payment-plan';

describe('Customer Associated Plans', () => {
  let wrapper;
  let mockProps;
  let instance;
  let mockState;
  let mockCustomerAssociatedPlansParams;
  let setupAuth;
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
    mockProps = {
      accounts: {
        accountId: 1,
        businessId: 1,
        channelId: 1,
      },
      associatedPaymentPlans: {
        loading: false,
        error: false,
      },
      cards: {
        data: [{ cardId: 'card_1' }],
        loading: false,
        error: false,
      },
      isReadOnly: false,
      customerId: 1,
      editPaymentPlan: jest.fn(),
      deletePaymentPlan: jest.fn(),
      getAssociatedPaymentPlans: jest.fn(),
      actions: {
        edit: {
          loading: false,
          error: false,
        },
        delete: {
          loading: false,
          error: false,
        },
        addPaymentPlan: {
          loading: false,
          error: false,
        },
      },
    };

    mockState = {
      isAddPaymentPlanDialogVisible: false,
      expandedRows: [],
    };
    // authorisation shoul be initialized BEFORE component shallow copy,
    // otherwise permissions in cache will be overridden
    initAuthorisation(mockUser);

    wrapper = shallow(<CustomerAssociatedPlans {...mockProps} />);
    instance = wrapper.instance();

    mockCustomerAssociatedPlansParams = mockProps.customerId;
  });

  beforeEach(() => {
    wrapper.setProps(mockProps);
    wrapper.setState(mockState);
    mockProps.getAssociatedPaymentPlans.mockClear();
  });

  it('renders without crashing', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('contains all required components', () => {
    expect(wrapper.find(TableContainerStyled)).toHaveLength(1);
    expect(wrapper.find(CkoTable)).toHaveLength(1);
  });

  it('does not render anything if there is no associated plans', () => {
    wrapper.setProps({ associatedPaymentPlans: null });
    expect(wrapper.find(TableContainerStyled)).toHaveLength(0);
    expect(wrapper.find(CkoTable)).toHaveLength(0);
  });

  it('toggles AddPaymentPlan if state changes', () => {
    wrapper.setState({ isAddPaymentPlanDialogVisible: false });
    expect(wrapper.find(AddPaymentPlan)).toHaveLength(0);

    wrapper.setState({ isAddPaymentPlanDialogVisible: true });
    expect(wrapper.find(AddPaymentPlan)).toHaveLength(1);
  });

  it('loads all the data in componentDidMount', () => {
    instance.componentDidMount();

    if (auth.canRead('subscriptions')) {
      expect(mockProps.getAssociatedPaymentPlans).toHaveBeenCalledTimes(1);
      expect(mockProps.getAssociatedPaymentPlans).toHaveBeenCalledWith(
        mockCustomerAssociatedPlansParams
      );
    }
  });

  it('reloads all the data if customerId changes', () => {
    const newCustomerId = 2;
    wrapper.setProps({ customerId: newCustomerId });

    if (auth.canRead('subscriptions')) {
      expect(mockProps.getAssociatedPaymentPlans).toHaveBeenCalledTimes(1);
      expect(mockProps.getAssociatedPaymentPlans).toHaveBeenCalledWith(
        newCustomerId
      );
    }
  });

  it('reloads associated plans after editing plan', () => {
    wrapper.setProps({
      actions: {
        ...mockProps.actions,
        edit: {
          loading: true,
        },
      },
    });
    wrapper.setProps({
      actions: {
        ...mockProps.actions,
        edit: {
          success: true,
        },
      },
    });
    if (auth.canRead('subscriptions')) {
      expect(mockProps.getAssociatedPaymentPlans).toHaveBeenCalledTimes(1);
      expect(mockProps.getAssociatedPaymentPlans).toHaveBeenCalledWith(
        mockCustomerAssociatedPlansParams
      );
    }
  });

  it('reloads associated plans after deleting plan', () => {
    wrapper.setProps({
      actions: {
        ...mockProps.actions,
        delete: {
          loading: true,
        },
      },
    });
    wrapper.setProps({
      actions: {
        ...mockProps.actions,
        delete: {
          success: true,
        },
      },
    });
    if (auth.canRead('subscriptions')) {
      expect(mockProps.getAssociatedPaymentPlans).toHaveBeenCalledTimes(1);
      expect(mockProps.getAssociatedPaymentPlans).toHaveBeenCalledWith(
        mockCustomerAssociatedPlansParams
      );
    }
  });
});
