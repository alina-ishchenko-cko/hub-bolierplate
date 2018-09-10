import * as React from 'react';
import TableCell from './index';
import { TdStyled } from './TableCell.sc';

describe('TableCell', () => {
  let AppComp, ChildComp, mockProps;

  beforeEach(() => {
    ChildComp = () => <div className="td-with-checkbox">child value</div>;
    mockProps = {
      index: 3,
      width: '200px',
      className: 'mock-table-cell',
    };
    AppComp = mount(
      <TableCell {...mockProps}>
        <ChildComp />
      </TableCell>
    );
  });

  afterEach(() => {
    AppComp = null;
  });

  it('should render and contain styled component', () => {
    expect(AppComp.find('div.cko-table-td')).toHaveLength(1);
    expect(AppComp.find('div.mock-table-cell')).toHaveLength(1);
    expect(AppComp.find(TdStyled)).toHaveLength(1);
  });

  it('should contain the child component', () => {
    const Child = AppComp.find('div.td-with-checkbox');
    expect(Child).toHaveLength(1);
    expect(Child.text()).toEqual('child value');
  });

  it('should contain not include the mouse event callbacks', () => {
    expect(AppComp.prop('onMouseEnter')).toBeUndefined();
    expect(AppComp.prop('onMouseLeave')).toBeUndefined();
  });

  it('should contain styled component', () => {
    expect(AppComp.find(TdStyled)).toHaveLength(1);
  });

  it('should call onMouseEnter() with index props', () => {
    mockProps.onMouseEnter = jest.fn();
    AppComp = mount(
      <TableCell {...mockProps}>
        <ChildComp />
      </TableCell>
    );
    AppComp.simulate('mouseenter');
    expect(mockProps.onMouseEnter).toHaveBeenCalledTimes(1);
    expect(mockProps.onMouseEnter).toHaveBeenCalledWith(3);
  });

  it('should call onMouseLeave() with index props', () => {
    mockProps.onMouseLeave = jest.fn();
    AppComp = mount(
      <TableCell {...mockProps}>
        <ChildComp />
      </TableCell>
    );
    AppComp.simulate('mouseleave');
    expect(mockProps.onMouseLeave).toHaveBeenCalledTimes(1);
    expect(mockProps.onMouseLeave).toHaveBeenCalledWith(3);
  });
});
