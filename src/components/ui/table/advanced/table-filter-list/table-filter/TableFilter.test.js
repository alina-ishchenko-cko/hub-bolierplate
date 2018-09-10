import * as React from 'react';
import TableFilter from './index';
import {
  FilterListStyled,
  FilterActionsStyled,
  FilterFieldStyled,
  ClearBtnStyled,
  ResultsStyled,
} from './TableFilter.sc';

describe('TableFilter', () => {
  let AppComp, ChildComp, mockProps;

  beforeEach(() => {
    ChildComp = () => <div className="td-with-checkbox">child value</div>;
    mockProps = {
      filterIndex: 0,
      onChange: jest.fn(),
      onDelete: jest.fn(),
      label: 'Filter test',
      totalRows: 100,
      filters: [
        {
          key: 'ccName',
          value: 'ccName',
          type: 'string',
          actions: ['CONTAINS', 'EQUALS', 'BEGINS', 'ENDS'],
          label: 'Customer',
        },
        {
          key: 'ccNumber',
          value: 'ccNumber',
          type: 'card_number',
          actions: ['CONTAINS', 'BEGINS', 'ENDS'],
          label: 'Card Number',
        },
      ],
    };
    AppComp = mount(<TableFilter {...mockProps} />);
  });

  afterEach(() => {
    AppComp = null;
  });

  it('should render and contain styled component', () => {
    expect(AppComp.find(FilterListStyled)).toHaveLength(1);
    expect(AppComp.find('div.filter-inline')).toHaveLength(5);
  });

  it('should toggle show/hide', () => {
    const btns = AppComp.find('button.cko-button');
    const showBtn = btns.at(0);
    const hideBtn = btns.at(1);
    hideBtn.simulate('click');
    expect(
      AppComp.find('button.cko-button')
        .at(0)
        .hasClass('in-active')
    ).toEqual(true);

    showBtn.simulate('click');
    expect(
      AppComp.find('button.cko-button')
        .at(0)
        .hasClass('in-active')
    ).toEqual(false);
  });
});
