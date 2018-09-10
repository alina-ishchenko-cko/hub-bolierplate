import React from 'react';
import AccountList from './';

describe('AccountList', () => {
  let AppComp;
  let mockProps = {};

  beforeEach(() => {
    mockProps = {
      key: 10000,
      id: 10000,
      title: 'Test title',
      type: 'channel',
      onClick: jest.fn(),
      className: 'testing-class',
    };
    AppComp = shallow(<AccountList {...mockProps} />);
  });

  afterEach(() => {
    AppComp = null;
    mockProps.onClick.mockClear();
  });

  it('renders without crashing', () => {
    expect(AppComp.exists()).toBe(true);
  });

  it('should handle the click event with the right data - channel', () => {
    AppComp.simulate('click');
    expect(mockProps.id).toEqual(10000);
    expect(mockProps.title).toEqual('Test title');
    expect(mockProps.type).toEqual('channel');
    expect(mockProps.onClick).toHaveBeenCalledTimes(1);
  });

  it('should handle the click event with the right data - business', () => {
    mockProps.type = 'business';
    AppComp = shallow(<AccountList {...mockProps} />);
    AppComp.simulate('click');
    expect(mockProps.id).toEqual(10000);
    expect(mockProps.title).toEqual('Test title');
    expect(mockProps.type).toEqual('business');
    expect(mockProps.onClick).toHaveBeenCalledTimes(1);
  });
});
