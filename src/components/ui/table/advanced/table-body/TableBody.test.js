import * as React from 'react';
import TableBody from './index';
import {
  TableContainerStyled,
  TableWrapStyled,
  CheckBoxWrapStyled,
  DividerTitleStyled,
} from './TableBody.sc';

describe('TableBody', () => {
  let AppComp, mockProps;

  beforeEach(() => {
    mockProps = {
      loading: false,
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
      dataSource: [
        {
          actions: [
            { id: 1, name: 'Capture', supportBatch: true },
            { id: 2, name: 'Void', supportBatch: true },
            { id: 4, name: 'Blacklist', requiresReadPermissionOnly: true },
          ],
          ccName: '',
          ccNumber: '',
          currencySymbol: 'EUR',
          customerEmail: 'q57vpg7727kuhghhga4372uyne@auto.cko',
          id: '8989EB09DE642U54E129',
          key: '8989EB09DE642U54E129',
          responseCode: '10000',
          scheme: 'SEPA',
          status: 'Deferred Capture - APM : Success',
          timestamp: '26/03/2018 14:17:48',
          trackId: '',
          value: 12,
        },
        {
          actions: [
            { id: 4, name: 'Blacklist', requiresReadPermissionOnly: true },
          ],
          ccName: 'Chakram MasterCard Customer',
          ccNumber: '543603******6378',
          currencySymbol: 'USD',
          customerEmail: '.n9yyp6f75bk@checkout.com',
          id: 'test_CCEC6AF9DE642Z54E13D',
          key: 'test_CCEC6AF9DE642Z54E13D',
          responseCode: '10000',
          scheme: 'MASTERCARD',
          status: 'Void - 3D : Success',
          timestamp: '26/03/2018 14:08:10',
          trackId: 'TRK12345',
          value: 1,
        },
      ],
      relatedRows: [],
      setRelatedRows: jest.fn(),
      selectableTableParams: {
        onRowSelect: jest.fn(),
        selectedRows: [],
      },
      clickableTableParams: {
        activeRow: {},
        onRowClick: jest.fn(),
      },
      clearRelatedRows: jest.fn(),
      isReadOnly: false,
      hasCheckBox: true,
      onCellMouseEnter: jest.fn(),
      onCellMouseLeave: jest.fn(),
      onRowMouseEnter: jest.fn(),
      onRowMouseLeave: jest.fn(),
    };
    AppComp = mount(<TableBody {...mockProps} />);
  });

  afterEach(() => {
    AppComp = null;
  });

  it('should render and contain styled components', () => {
    expect(AppComp.find('div.cko-table-wrap')).toHaveLength(1);
    expect(AppComp.find(TableContainerStyled)).toHaveLength(1);
    expect(AppComp.find(TableWrapStyled)).toHaveLength(1);
  });

  it('should show loading component', () => {
    mockProps.loading = true;
    AppComp = mount(<TableBody {...mockProps} />);
    expect(AppComp.find('div.cko-app-loading')).toHaveLength(1);
    expect(AppComp.find('div.cko-app-loading').text()).toEqual(
      'We are loading new data.Please be patient'
    );
  });

  it('should clear related row when dataSource props changes', () => {
    AppComp = mount(<TableBody {...mockProps} />);
    const dataSource = mockProps.dataSource.map(data => ({ ...data }));
    dataSource[0].ccName = 'test user';
    AppComp.setProps({ dataSource });
    expect(mockProps.clearRelatedRows).toHaveBeenCalledTimes(1);
  });

  it('should render the rows', () => {
    expect(AppComp.find('div.cko-table-tr')).toHaveLength(2);
    expect(AppComp.find('div.cko-table-td')).toHaveLength(4);
  });

  it('should trigger onRowMouseEnter event', () => {
    AppComp.find('div.cko-table-tr')
      .at(0)
      .simulate('mouseenter');
    expect(mockProps.onRowMouseEnter).toHaveBeenCalledTimes(1);
    expect(mockProps.onRowMouseEnter).toHaveBeenCalledWith(0);
  });

  it('should trigger onRowMouseLeave event', () => {
    AppComp.find('div.cko-table-tr')
      .at(0)
      .simulate('mouseleave');
    expect(mockProps.onRowMouseLeave).toHaveBeenCalledTimes(1);
  });

  it('should trigger onClick event', () => {
    AppComp.find('div.cko-table-tr')
      .at(0)
      .simulate('click');
    const { onRowClick } = mockProps.clickableTableParams;
    expect(onRowClick).toHaveBeenCalledTimes(1);
    expect(onRowClick).toHaveBeenCalledWith(mockProps.dataSource[0]);
  });

  it('should trigger onCellMouseEnter event', () => {
    AppComp.find('div.cko-table-td')
      .at(0)
      .simulate('mouseenter');
    expect(mockProps.onCellMouseEnter).toHaveBeenCalledTimes(1);
    expect(mockProps.onCellMouseEnter).toHaveBeenCalledWith(0);
  });

  it('should trigger onCellMouseLeave event', () => {
    AppComp.find('div.cko-table-td')
      .at(0)
      .simulate('mouseleave');
    expect(mockProps.onCellMouseLeave).toHaveBeenCalledTimes(1);
    expect(mockProps.onCellMouseLeave).toHaveBeenCalledWith(0);
  });

  it('should include Checkbox', () => {
    expect(AppComp.find('div.td-with-checkbox')).toHaveLength(2);
  });

  it('should Not include Checkbox', () => {
    mockProps.hasCheckBox = false;
    AppComp = mount(<TableBody {...mockProps} />);
    expect(AppComp.find('div.td-with-checkbox')).toHaveLength(0);
  });

  it('should render the columns components', () => {
    expect(mockProps.columns[0].render).toHaveBeenCalledTimes(2);
    expect(mockProps.columns[1].render).toHaveBeenCalledTimes(2);
  });
});
