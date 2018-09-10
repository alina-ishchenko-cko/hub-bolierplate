import * as React from 'react';
import FormWrapper from '__mocks__/FormWrapper';
import CkoCardDetails from '../CkoCardDetails';

describe('CkoCardDetails', () => {
  let AppComp, mockProps;

  // Clear console warning
  console.warn = null;

  beforeEach(() => {
    mockProps = {
      id: 'cardDetails',
      label: 'Card details',
    };
    const Wrapper = FormWrapper(CkoCardDetails);
    AppComp = mount(<Wrapper {...mockProps} />);
  });

  afterEach(() => {
    AppComp = null;
  });

  it('should contain input tag', () => {
    expect(AppComp.find('input.ant-input')).toHaveLength(3);
  });

  it('should contain label', () => {
    expect(AppComp.find('label')).toHaveLength(1);
    expect(AppComp.find('label').text()).toEqual('Card details');
  });

  it('should format card number and show card scheme icon', () => {
    const inputField = AppComp.find('input#cardDetails');
    inputField.simulate('change', { target: { value: '4242424242424242' } });
    expect(inputField.instance().value).toEqual('4242424242424242');
  });

  it('should show error if card number is invalid', () => {
    const inputField = AppComp.find('input#cardDetails');
    inputField.simulate('blur', { target: { value: '4242' } });
    const inputWrap = AppComp.find('div.ant-form-item-control').at(0);
    expect(inputWrap.hasClass('has-error')).toEqual(true);
  });

  it('should not allow non-numeric characters onKeypress', () => {
    const keyEventObj = {
      which: 'a'.charCodeAt(),
      target: { value: 'a' },
      preventDefault: jest.fn(),
    };
    const inputWrap = AppComp.find('.ant-form-item-control-wrapper').at(0);
    const inputField = inputWrap.find('input');
    inputField.simulate('keypress', keyEventObj);
    expect(keyEventObj.preventDefault).toHaveBeenCalledTimes(1);
  });

  it('should allow numeric characters onKeypress', () => {
    const keyEventObj = {
      which: '5'.charCodeAt(),
      target: { value: '5' },
      preventDefault: jest.fn(),
    };
    const inputWrap = AppComp.find('.ant-form-item-control-wrapper').at(0);
    const inputField = inputWrap.find('input');
    inputField.simulate('keypress', keyEventObj);
    expect(keyEventObj.preventDefault).toHaveBeenCalledTimes(0);
  });

  it('should allow valid expiry date', () => {
    // Should fail after 40 years :)
    const inputField = AppComp.find('input#cardExpDate');
    inputField.simulate('blur', { target: { value: '01/60' } });
    expect(inputField.instance().value).toEqual('01/60');
  });

  it('should show error invalid expiry date', () => {
    const inputField = AppComp.find('input#cardExpDate');
    inputField.simulate('blur', { target: { value: '01/01' } });
    const inputWrap = AppComp.find('div.ant-form-item-control').at(1);
    expect(inputWrap.hasClass('has-error')).toEqual(true);
  });

  it('should show error if expiry date is empty on blur', () => {
    const inputField = AppComp.find('input#cardExpDate');
    inputField.simulate('blur', { target: { value: '' } });
    const inputWrap = AppComp.find('div.ant-form-item-control').at(1);
    expect(inputWrap.hasClass('has-error')).toEqual(true);
  });

  it('should allow numeric characters onKeypress - expiry date field', () => {
    const keyEventObj = {
      which: '5'.charCodeAt(),
      target: { value: '5' },
      preventDefault: jest.fn(),
    };
    const inputField = AppComp.find('input#cardExpDate');
    inputField.simulate('keypress', keyEventObj);
    expect(keyEventObj.preventDefault).toHaveBeenCalledTimes(0);
  });

  it('should not allow non-numeric characters onKeypress - expiry date field', () => {
    const keyEventObj = {
      which: 'a'.charCodeAt(),
      target: { value: 'a' },
      preventDefault: jest.fn(),
    };
    const inputField = AppComp.find('input#cardExpDate');
    inputField.simulate('keypress', keyEventObj);
    expect(keyEventObj.preventDefault).toHaveBeenCalledTimes(1);
  });

  it('should not allow non-numeric characters onKeypress - cvv field', () => {
    const keyEventObj = {
      which: '3'.charCodeAt(),
      target: { value: '3' },
      preventDefault: jest.fn(),
    };
    const inputField = AppComp.find('input#cardCvv');
    inputField.simulate('keypress', keyEventObj);
    expect(keyEventObj.preventDefault).toHaveBeenCalledTimes(0);
  });

  it('should show error if cvv value is invalid', () => {
    const cardDetails = AppComp.find('input#cardDetails');
    cardDetails.simulate('change', { target: { value: '4242424242424242' } });

    const inputField = AppComp.find('input#cardCvv');
    inputField.simulate('blur', { target: { value: '33' } });
    const inputWrap = AppComp.find('div.ant-form-item-control').at(2);
    expect(inputWrap.hasClass('has-error')).toEqual(true);
  });

  it('should not show error if cvv value is valid', () => {
    const cardDetails = AppComp.find('input#cardDetails');
    cardDetails.simulate('change', { target: { value: '4242424242424242' } });

    const inputField = AppComp.find('input#cardCvv');
    inputField.simulate('blur', { target: { value: '333' } });
    const inputWrap = AppComp.find('div.ant-form-item-control').at(2);
    expect(inputWrap.hasClass('has-error')).toEqual(false);
  });
});
