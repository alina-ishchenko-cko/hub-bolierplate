import * as React from 'react';
import CkoButton from '../index';
import CkoIcon from 'components/ui/icon/';
import renderer from 'react-test-renderer';
import { ButtonStyled } from '../styled/CkoButton.sc';

describe('CkoButton', () => {
  let AppComp, mockProps;

  beforeEach(() => {
    mockProps = {
      dataIndex: 'mockIndex',
      onClick: jest.fn(),
      value: 'click me',
    };
    AppComp = mount(<CkoButton {...mockProps} />);
  });

  it('should contained the styled component', () => {
    expect(AppComp.find(ButtonStyled)).toHaveLength(1);
  });

  it('should contain button tag', () => {
    expect(AppComp.find('button')).toHaveLength(1);
  });

  it('should contain child component', () => {
    const MockApp = () => <div>Hello</div>;
    AppComp = shallow(
      <CkoButton value="click me">
        <MockApp />
      </CkoButton>
    );
    expect(AppComp.find(MockApp)).toHaveLength(1);
  });

  it('should handle click event', () => {
    AppComp.simulate('click');
    expect(mockProps.onClick).toHaveBeenCalledTimes(1);
  });

  it('should pass dataIndex as value onClick', () => {
    AppComp.simulate('click');
    expect(mockProps.onClick).toHaveBeenCalledTimes(1);
    expect(mockProps.onClick).toHaveBeenCalledWith('mockIndex');
  });

  it('should open link in new tab', () => {
    mockProps = {
      link: 'docs.checkout.com',
      onClick: jest.fn(),
      value: 'click me',
    };
    AppComp = mount(<CkoButton {...mockProps} />);
    AppComp.simulate('click');
    expect(mockProps.onClick).toHaveBeenCalledTimes(0);
    expect(window.open).toHaveBeenCalledTimes(1);
    expect(window.open).toHaveBeenCalledWith('docs.checkout.com', '_blank');
  });
});
