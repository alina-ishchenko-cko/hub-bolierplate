import React from 'react';
import CustomerTransactions from './CustomerTransactions';
import CreatePaymentContainer from 'components/pages/create-payment/';
import CkoTable from 'components/ui/table';
import {
  TableContainerStyled,
  ShowMoreContainerStyled,
} from '../styled/CustomerDetailesTables.sc';

describe('Customer Transactions', () => {
  let wrapper;
  let instance;
  let mockProps;
  let mockState;
  let mockCustomerTransactionParams;

  beforeAll(() => {
    mockProps = {
      customerId: 1,
      onCreatePayment: jest.fn(), //?
      pushToRowDetailStack: jest.fn(),
      transactions: {
        data: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }],
        loading: false,
        error: false,
      },
      email: 'a@a.com',
      createCharges: jest.fn(),
      clearCharges: jest.fn(),
      isReadOnly: false,
      accounts: {
        accountId: 1,
        businessId: 1,
        channelId: 1,
      },
      getCustomerTransactions: jest.fn(),
      actions: {
        createPayment: {
          loading: false,
          error: false,
        },
      },
    };
    mockState = {
      isCreatePaymentDialogVisible: false,
      selectedChargeId: 1,
      blacklistId: '',
      refundId: '',
      voidId: '',
      captureId: '',
      areAllTransactionsLoaded: false,
    };

    wrapper = shallow(<CustomerTransactions {...mockProps} />);
    instance = wrapper.instance();

    mockCustomerTransactionParams = {
      ...mockProps.accounts,
      customerId: mockProps.customerId,
      limit: instance.step,
      startIndex: 0,
    };
  });

  beforeEach(() => {
    wrapper.setProps(mockProps);
    wrapper.setState(mockState);
    mockProps.getCustomerTransactions.mockClear();
  });

  it('renders without crashing', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('renders all required components', () => {
    expect(wrapper.find(TableContainerStyled)).toHaveLength(1);
    expect(wrapper.find('.customer-transactions-table')).toHaveLength(1);
    expect(wrapper.find(ShowMoreContainerStyled)).toHaveLength(1);
    expect(wrapper.find(CreatePaymentContainer)).toHaveLength(1);
  });

  it('loads all the data in componentDidMount', () => {
    instance.componentDidMount();
    expect(mockProps.getCustomerTransactions).toHaveBeenCalledTimes(1);
    expect(mockProps.getCustomerTransactions).toHaveBeenCalledWith(
      mockCustomerTransactionParams,
      true
    );
  });

  it('reloads all the data if customerId changes', () => {
    const newCustomerId = 2;
    wrapper.setProps({ customerId: newCustomerId });

    expect(mockProps.getCustomerTransactions).toHaveBeenCalledTimes(1);
    expect(mockProps.getCustomerTransactions).toHaveBeenCalledWith(
      { ...mockCustomerTransactionParams, customerId: newCustomerId },
      true
    );
  });

  it('reloads customer transactions after creating payment', () => {
    wrapper.setProps({
      actions: {
        ...mockProps.actions,
        createPayment: {
          loading: true,
        },
      },
    });
    wrapper.setProps({
      actions: {
        ...mockProps.actions,
        createPayment: {
          success: true,
        },
      },
    });
    expect(mockProps.getCustomerTransactions).toHaveBeenCalledTimes(1);
    expect(mockProps.getCustomerTransactions).toHaveBeenCalledWith(
      mockCustomerTransactionParams,
      true
    );
  });

  it('passed the vaild chargeId', () => {
    const onRow = wrapper.find('.customer-transactions-table').prop('onRow');
    onRow({ id: 'test-ID' }).onClick();
    expect(mockProps.pushToRowDetailStack).toHaveBeenCalledTimes(1);
    expect(mockProps.pushToRowDetailStack).toHaveBeenCalledWith({
      type: 'transaction',
      id: 'test-ID',
    });
  });

  it('calls fetchMoreTransactions on ShowMoreContainerStyled click', () => {
    wrapper.find(ShowMoreContainerStyled).simulate('click');
    expect(mockProps.getCustomerTransactions).toHaveBeenCalledTimes(1);
  });

  it('does not show button for loading transacions if there are no more transactions to load', () => {
    wrapper.setState({ areAllTransactionsLoaded: true });
    expect(wrapper.find(ShowMoreContainerStyled)).toHaveLength(0);
  });

  it('toggles isCreatePaymentDialogVisible on CreatePaymentContainer cancel', () => {
    wrapper.find(CreatePaymentContainer).prop('onCancel')();
    expect(wrapper.state('isCreatePaymentDialogVisible')).toBeTruthy();
  });

  it('toggles isCreatePaymentDialogVisible on CreatePaymentContainer ok', () => {
    wrapper.find(CreatePaymentContainer).prop('onOk')();
    expect(wrapper.state('isCreatePaymentDialogVisible')).toBeTruthy();
  });
});
