import React from 'react';
import CustomerSection from './';

describe('CustomerSection', () => {
  let wrapper, mockProps;

  beforeAll(() => {
    mockProps = {
      email: 'test@test.com',
      name: 'Test User',
    };
    wrapper = shallow(<CustomerSection {...mockProps} />);
  });

  it('renders without crashing', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('renders valid labels', () => {
    const labels = wrapper.find('label');
    expect(labels.at(0).text()).toBe('Customer name');
    expect(labels.at(1).text()).toBe('Customer Email');
  });

  it('renders valid info', () => {
    const info = wrapper.find('p');
    expect(info.at(0).text()).toBe('Test User');
    expect(info.at(1).text()).toBe('test@test.com');
  });
});
