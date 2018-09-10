import * as React from 'react';
import FormWrapper from '__mocks__/FormWrapper';
import CkoInput from '../CkoInput';

describe('CkoInput', () => {
  let AppComp, inputField, mockProps;

  // Clear warning
  console.warn = null;

  beforeEach(() => {
    mockProps = {
      id: 'ckoInput',
      label: 'Test label',
    };
    const Wrapper = FormWrapper(CkoInput);
    AppComp = mount(<Wrapper {...mockProps} />);
    inputField = AppComp.find('input.ant-input');
  });

  afterAll(() => {
    mockProps = null;
    AppComp = null;
    inputField = null;
  });

  it('should render', () => {
    expect(AppComp.find('div.cko-input')).toHaveLength(1);
  });

  it('should contain input tag', () => {
    expect(inputField).toHaveLength(1);
  });

  it('should contain id attribute', () => {
    expect(inputField.instance().id).toEqual('ckoInput');
  });

  it('should contain label value', () => {
    expect(AppComp.find('label').text()).toEqual('Test label');
  });

  it('should contain label value', () => {
    expect(AppComp.find('label').text()).toEqual('Test label');
  });

  it('should contain valid value', () => {
    inputField.simulate('change', { target: { value: 'hello world' } });
    expect(inputField.instance().value).toEqual('hello world');
  });

  it('should contain default value', () => {
    mockProps.defaultValue = 'Hello default';
    const Wrapper = FormWrapper(CkoInput);
    AppComp = mount(<Wrapper {...mockProps} />);
    inputField = AppComp.find('input.ant-input');
    expect(inputField.instance().value).toEqual('Hello default');
  });

  it('should set input type of email', () => {
    mockProps.type = 'email';
    const Wrapper = FormWrapper(CkoInput);
    AppComp = mount(<Wrapper {...mockProps} />);
    inputField = AppComp.find('input.ant-input');
    expect(inputField.instance().type).toEqual('email');
  });

  it('should show error for invalid email', () => {
    mockProps.type = 'email';
    const Wrapper = FormWrapper(CkoInput);
    AppComp = mount(<Wrapper {...mockProps} />);
    inputField = AppComp.find('input.ant-input');

    inputField.simulate('blur', { target: { value: 'hello@test' } });
    const inputWrap = AppComp.find('div.ant-form-item-control');
    expect(inputWrap.hasClass('has-error')).toEqual(true);
  });

  it('should not show error for valid email', () => {
    mockProps.type = 'email';
    const Wrapper = FormWrapper(CkoInput);
    AppComp = mount(<Wrapper {...mockProps} />);
    inputField = AppComp.find('input.ant-input');

    inputField.simulate('blur', { target: { value: 'hello@test.com' } });
    const inputWrap = AppComp.find('div.ant-form-item-control');
    expect(inputWrap.hasClass('has-error')).toEqual(false);
  });

  it('should not allow non-numeric input for number type', () => {
    mockProps.type = 'number';

    const keyEventObj = {
      which: 'a'.charCodeAt(),
      target: { value: 'a' },
      preventDefault: jest.fn(),
    };

    const Wrapper = FormWrapper(CkoInput);
    AppComp = mount(<Wrapper {...mockProps} />);
    inputField = AppComp.find('input.ant-input');

    inputField.simulate('keypress', keyEventObj);
    expect(keyEventObj.preventDefault).toHaveBeenCalledTimes(1);
  });

  it('should not allow non-numeric input for amount type', () => {
    mockProps.type = 'amount';

    const keyEventObj = {
      which: 'a'.charCodeAt(),
      target: { value: 'a' },
      preventDefault: jest.fn(),
    };

    const Wrapper = FormWrapper(CkoInput);
    AppComp = mount(<Wrapper {...mockProps} />);
    inputField = AppComp.find('input.ant-input');

    inputField.simulate('keypress', keyEventObj);
    expect(keyEventObj.preventDefault).toHaveBeenCalledTimes(1);
  });

  it('should call change event', () => {
    mockProps = {
      onChange: jest.fn(),
    };
    AppComp = mount(<CkoInput {...mockProps} />);
    inputField = AppComp.find('input.ant-input');
    inputField.simulate('change', { target: { value: 'hello world' } });
    expect(mockProps.onChange).toHaveBeenCalledTimes(1);
    expect(mockProps.onChange).toHaveBeenCalledWith(
      expect.objectContaining({
        target: { value: 'hello world' },
      })
    );
  });

  it('should call blur event', () => {
    mockProps = {
      onBlur: jest.fn(),
    };
    AppComp = mount(<CkoInput {...mockProps} />);
    inputField = AppComp.find('input.ant-input');
    inputField.simulate('blur', { target: { value: 'hello world' } });
    expect(mockProps.onBlur).toHaveBeenCalledTimes(1);
    expect(mockProps.onBlur).toHaveBeenCalledWith(
      expect.objectContaining({
        target: { value: 'hello world' },
      })
    );
  });

  it('should call keypress event', () => {
    mockProps = {
      onKeyPress: jest.fn(),
    };
    AppComp = mount(<CkoInput {...mockProps} />);
    inputField = AppComp.find('input.ant-input');
    inputField.simulate('keypress', { target: { value: 'hello world' } });
    expect(mockProps.onKeyPress).toHaveBeenCalledTimes(1);
    expect(mockProps.onKeyPress).toHaveBeenCalledWith(
      expect.objectContaining({
        target: { value: 'hello world' },
      })
    );
  });

  it('should call focus event', () => {
    mockProps = {
      onFocus: jest.fn(),
    };
    AppComp = mount(<CkoInput {...mockProps} />);
    inputField = AppComp.find('input.ant-input');
    inputField.simulate('focus', { target: { value: 'hello world' } });
    expect(mockProps.onFocus).toHaveBeenCalledTimes(1);
    expect(mockProps.onFocus).toHaveBeenCalledWith(
      expect.objectContaining({
        target: { value: 'hello world' },
      })
    );
  });
});
