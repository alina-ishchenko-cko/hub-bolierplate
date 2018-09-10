import * as React from 'react';
import TableHeader from './index';
import {
  ThStyled,
  TableHeaderStyled,
  SortStyled,
  ThRowStyled,
} from './TableHeader.sc';

describe('TableHeader', () => {
  let AppComp, mockProps;

  beforeEach(() => {
    mockProps = {
      hoverIndex: -1,
      hasCheckBox: false,
      columns: [
        {
          columnClassName: 'trans-details',
          dataField: 'value',
          key: 'value',
          render: jest.fn(),
          resizeByValue: true,
          title: 'Transaction details',
          width: '226px',
        },
        {
          dataField: 'ccName',
          fluidWidth: 25,
          key: 'ccName',
          render: jest.fn(),
          title: 'Customer',
          width: '291px',
        },
      ],
      selectableTableParams: {
        onRowSelect: jest.fn(),
        selectedRows: [],
      },
      tableOptions: {
        filter: [],
        pagination: { pageSize: 10, startIndex: 0 },
        search: '',
        sort: { sortColumn: 'timestamp', sortOrder: 'desc' },
      },
      relatedRows: [],
      clearRelatedRows: jest.fn(),
      onSort: jest.fn(),
      isReadOnly: false,
    };
    AppComp = mount(<TableHeader {...mockProps} />);
  });

  afterEach(() => {
    AppComp = null;
  });

  it('should render and contain styled components', () => {
    expect(AppComp.find(TableHeaderStyled)).toHaveLength(1);
    expect(AppComp.find(ThRowStyled)).toHaveLength(1);
    expect(AppComp.find(ThStyled)).toHaveLength(2);
    expect(AppComp.find(SortStyled)).toHaveLength(2);
  });

  it('should render table header labels', () => {
    const thValues = AppComp.find('div.th-value');
    expect(thValues.at(0).text()).toEqual('Transaction details');
    expect(thValues.at(1).text()).toEqual('Customer');
  });

  it('should render table header labels', () => {
    const thValues = AppComp.find('div.th-value');
    expect(thValues.at(0).text()).toEqual('Transaction details');
    expect(thValues.at(1).text()).toEqual('Customer');
  });

  it('should show sort icon based on column index', () => {
    mockProps.hoverIndex = 0;
    AppComp = mount(<TableHeader {...mockProps} />);
    expect(AppComp.find('span.active-sort')).toHaveLength(1);
  });

  it('should trigger onSort()', () => {
    mockProps.hoverIndex = 0;
    AppComp = mount(<TableHeader {...mockProps} />);
    AppComp.find('span.active-sort').simulate('click');
    expect(mockProps.onSort).toHaveBeenCalledTimes(1);
    expect(mockProps.onSort).toHaveBeenCalledWith({
      sortColumn: 'value',
      sortOrder: 'desc',
    });
  });

  it('should should select all checkbox', () => {
    mockProps.hasCheckBox = true;
    mockProps.relatedRows = [{ id: 1 }, { id: 2 }, { id: 3 }];
    AppComp = mount(<TableHeader {...mockProps} />);
    expect(AppComp.find('div.show-checkbox-header')).toHaveLength(1);
  });

  it('should trigger onRowSelect', () => {
    mockProps.hasCheckBox = true;
    mockProps.relatedRows = [{ id: 1 }, { id: 2 }, { id: 3 }];
    AppComp = mount(<TableHeader {...mockProps} />);
    const Checkbox = AppComp.find('div.show-checkbox-header input');
    Checkbox.simulate('change', { target: { checked: true } });
    const { onRowSelect } = mockProps.selectableTableParams;
    expect(onRowSelect).toHaveBeenCalledTimes(1);
    expect(onRowSelect).toHaveBeenCalledWith([{ id: 1 }, { id: 2 }, { id: 3 }]);

    // Uncheck the box
    Checkbox.simulate('change', { target: { checked: false } });
    expect(mockProps.clearRelatedRows).toHaveBeenCalledTimes(1);
  });

  it('should hide checkbox for readonly users', () => {
    mockProps.hasCheckBox = true;
    mockProps.isReadOnly = true;
    mockProps.relatedRows = [{ id: 1 }, { id: 2 }, { id: 3 }];
    AppComp = mount(<TableHeader {...mockProps} />);
    expect(AppComp.find('div.show-checkbox-header')).toHaveLength(0);
  });
});
