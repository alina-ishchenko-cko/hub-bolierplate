import React from 'react';
import ContentDetails from './ContentDetails';
import TransactionDetails from 'components/pages/transaction-details/';
import CustomerDetails from 'components/pages/customer-details/';
import TransactionActionsModals from 'components/pages/transaction-actions-modals/';

describe('ContentDetails', () => {
  let AppComp;
  let mockProps = {};

  beforeEach(() => {
    mockProps = {
      activeRow: {},
      activeAction: {},
      isReadOnly: false,
      selectedRows: [],
      rowDetailStack: [],
      sliceRowDetailStack: jest.fn(),
      setActiveRow: jest.fn(),
      clearBatch: jest.fn(),
      setTransactionAction: jest.fn(),
      refreshData: jest.fn(),
    };
    AppComp = shallow(<ContentDetails {...mockProps} />);
  });

  afterEach(() => {
    AppComp = null;
  });

  it('renders without crashing', () => {
    expect(AppComp.exists()).toBe(true);
  });

  it('should not render Transaction Details', () => {
    expect(AppComp.find(TransactionDetails)).toHaveLength(0);
  });

  it('should not render Customer Details', () => {
    expect(AppComp.find(CustomerDetails)).toHaveLength(0);
  });

  it('should include Transaction Actions Modals', () => {
    expect(AppComp.find(TransactionActionsModals)).toHaveLength(1);
  });

  it('should render transaction details', () => {
    const rowData = {
      type: 'transaction',
      id: '1',
      customerEmail: 'test@test.com',
    };
    mockProps.rowDetailStack.push(rowData);
    AppComp = shallow(<ContentDetails {...mockProps} />);
    expect(AppComp.find(TransactionDetails)).toHaveLength(1);
    expect(AppComp.find(CustomerDetails)).toHaveLength(0);
  });

  it('should close transaction details - trigger setActiveRow and sliceRowDetailStack', () => {
    const rowData = {
      type: 'transaction',
      id: '1',
      customerEmail: 'test@test.com',
    };
    mockProps.activeRow = rowData;
    mockProps.rowDetailStack.push(rowData);
    AppComp = shallow(<ContentDetails {...mockProps} />);
    AppComp.find(TransactionDetails).prop('onClose')(rowData);
    expect(mockProps.setActiveRow).toHaveBeenCalledTimes(1);
    expect(mockProps.sliceRowDetailStack).toHaveBeenCalledTimes(1);
    expect(mockProps.sliceRowDetailStack).toHaveBeenCalledWith(rowData);
  });

  it('should render customer details', () => {
    const rowData = {
      type: 'customer',
      id: '1',
    };
    mockProps.rowDetailStack.push(rowData);
    AppComp = shallow(<ContentDetails {...mockProps} />);
    expect(AppComp.find(CustomerDetails)).toHaveLength(1);
    expect(AppComp.find(TransactionDetails)).toHaveLength(0);
  });

  it('should close transaction details - trigger setActiveRow and sliceRowDetailStack', () => {
    const rowData = {
      type: 'customer',
      id: '1',
    };
    mockProps.activeRow = rowData;
    mockProps.rowDetailStack.push(rowData);
    AppComp = shallow(<ContentDetails {...mockProps} />);
    AppComp.find(CustomerDetails).prop('onClose')(rowData);
    expect(mockProps.setActiveRow).toHaveBeenCalledTimes(1);
    expect(mockProps.sliceRowDetailStack).toHaveBeenCalledTimes(1);
    expect(mockProps.sliceRowDetailStack).toHaveBeenCalledWith(rowData);
  });
});
