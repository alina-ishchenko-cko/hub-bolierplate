import * as React from 'react';
import TableRow from './index';
import { TrStyled } from './TableRow.sc';

describe('TableRow', () => {
  let AppComp, ChildComp, mockProps;

  beforeEach(() => {
    ChildComp = () => <div className="td-with-checkbox">child value</div>;
    mockProps = {
      index: 3,
      width: '200px',
      className: 'mock-table-cell',
    };
    AppComp = mount(
      <TableRow {...mockProps}>
        <ChildComp />
      </TableRow>
    );
  });

  afterEach(() => {
    AppComp = null;
  });

  it('should render and contain styled component', () => {
    expect(AppComp.find('div.cko-table-tr')).toHaveLength(1);
    expect(AppComp.find('div.td-with-checkbox')).toHaveLength(1);
    expect(AppComp.find(TrStyled)).toHaveLength(1);
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

  it('should call onMouseEnter() with index props', () => {
    mockProps.onMouseEnter = jest.fn();
    AppComp = mount(
      <TableRow {...mockProps}>
        <ChildComp />
      </TableRow>
    );
    AppComp.simulate('mouseenter');
    expect(mockProps.onMouseEnter).toHaveBeenCalledTimes(1);
    expect(mockProps.onMouseEnter).toHaveBeenCalledWith(3);
  });

  it('should call onMouseLeave() with index props', () => {
    mockProps.onMouseLeave = jest.fn();
    AppComp = mount(
      <TableRow {...mockProps}>
        <ChildComp />
      </TableRow>
    );
    AppComp.simulate('mouseleave');
    expect(mockProps.onMouseLeave).toHaveBeenCalledTimes(1);
  });

  it('should call onClick() with index and data props', () => {
    mockProps.data = { id: 1, title: 'test' };
    mockProps.onClick = jest.fn();
    AppComp = mount(
      <TableRow {...mockProps}>
        <ChildComp />
      </TableRow>
    );
    AppComp.simulate('click');
    expect(mockProps.onClick).toHaveBeenCalledTimes(1);
    expect(mockProps.onClick).toHaveBeenCalledWith(3, {
      id: 1,
      title: 'test',
    });
  });

  it('should NOT call onClick() on input target', () => {
    mockProps.onClick = jest.fn();
    AppComp = mount(
      <TableRow {...mockProps}>
        <ChildComp />
      </TableRow>
    );
    AppComp.simulate('click', {
      target: {
        nodeName: 'INPUT',
      },
    });
    expect(mockProps.onClick).toHaveBeenCalledTimes(0);
  });
});
