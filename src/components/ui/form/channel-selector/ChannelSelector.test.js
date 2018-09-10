import * as React from 'react';
import FormWrapper from '__mocks__/FormWrapper';
import ChannelSelector from './';

describe('Channel Selector', () => {
  let mockProps, wrapper;

  beforeEach(() => {
    mockProps = {
      form: {
        setFieldsValue: jest.fn(),
        getFieldDecorator: jest.fn(),
        getFieldError: jest.fn(),
      },
      businesses: {
        '1000': [
          {
            propertyId: 100001,
            propertyName: 'DemoBusiness',
            channels: [
              {
                channelId: 100002,
                channelName: 'Checkout.com',
              },
            ],
          },
          {
            propertyId: 100003,
            propertyName: 'Demo2Business',
            channels: [
              {
                channelId: 100004,
                channelName: 'Checkout',
              },
            ],
          },
        ],
      },
      accountId: 1000,
      channelId: null,
      businessId: null,
      onChange: jest.fn(),
    };
    wrapper = mount(<ChannelSelector {...mockProps} />);
  });

  it('should show both channel and business dropdown', () => {
    expect(
      wrapper
        .find('label')
        .at(0)
        .text()
    ).toBe('Business');

    expect(
      wrapper
        .find('label')
        .at(1)
        .text()
    ).toBe('Channel');
  });

  it('should show only channel dropdown', () => {
    mockProps.businessId = 100001;
    wrapper = mount(<ChannelSelector {...mockProps} />);
    expect(
      wrapper
        .find('label')
        .at(0)
        .text()
    ).toBe('Channel');
  });

  it('should set channel based on selected business', () => {
    const Business = wrapper.find('.cko-select').at(0);
    // selectedBusinessId should be zero
    expect(wrapper.state('selectedBusinessId')).toBe(0);
    Business.simulate('click');
    Business.find('li.ant-select-dropdown-menu-item')
      .at(0)
      .simulate('click');

    // Set the selectedBusinessId state
    expect(wrapper.state('selectedBusinessId')).toBe(100001);

    // Set the channels state
    expect(wrapper.state('channels')).toEqual([
      {
        channelId: 100002,
        channelName: 'Checkout.com',
      },
    ]);
  });
});
