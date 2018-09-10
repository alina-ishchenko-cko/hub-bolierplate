import * as React from 'react';
import CkoTooltip from '../index';

describe('CkoTooltip', () => {
  let ChildComp, mockProps;

  beforeAll(() => {
    mockProps = {
      title: 'Tip Message',
      className: 'test-tip',
    };
    ChildComp = () => <div className="child-comp">Hello world!</div>;
  });

  it('should render default', () => {
    const AppComp = mount(
      <CkoTooltip {...mockProps}>
        <ChildComp />
      </CkoTooltip>
    );
    expect(AppComp.find('div.test-tip')).toHaveLength(1);
    expect(AppComp.find('div.child-comp')).toHaveLength(1);
    expect(AppComp.find('div.cko-tooltip')).toHaveLength(1);
  });

  it('should display tooltip on hover', () => {
    mockProps.visible = true;
    const AppComp = mount(
      <CkoTooltip {...mockProps}>
        <ChildComp />
      </CkoTooltip>
    );
    AppComp.find(ChildComp).simulate('mouseover');
    expect(AppComp.find('div.tip-container')).toHaveLength(1);
    expect(AppComp.find('div.tip-container').text()).toEqual('Tip Message');
  });
});
