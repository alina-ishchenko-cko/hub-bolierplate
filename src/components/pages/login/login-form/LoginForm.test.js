import * as React from 'react';
import Form from 'antd/lib/form';
import { MemoryRouter } from 'react-router-dom';
import LoginForm from './';
import CkoAlert from 'components/ui/alert/';
import CkoIcon from 'components/ui/icon/';
import CkoInput from 'components/ui/form/CkoInput';
import CkoButton from 'components/ui/button/';
import { FormWrapStyled } from './LoginForm.sc';

describe('LoginForm', () => {
  // Hide console warnings
  console.warn = null;

  let AppComp;
  let mockProps;
  beforeEach(() => {
    mockProps = {
      currentUser: {
        error: false,
        errorData: {},
      },
      onSubmit: jest.fn(),
    };
    AppComp = mount(
      <MemoryRouter>
        <LoginForm {...mockProps} />
      </MemoryRouter>
    );
  });

  afterEach(() => {
    AppComp = null;
    mockProps = null;
  });

  it('renders without crashing', () => {
    expect(AppComp.exists()).toBe(true);
  });

  it('should contain the required components', () => {
    expect(AppComp.find(FormWrapStyled)).toHaveLength(1);
    expect(AppComp.find(CkoInput)).toHaveLength(2);
    expect(AppComp.find(CkoButton)).toHaveLength(1);
  });

  it('should contain email field', () => {
    expect(AppComp.find('input[type="email"]')).toHaveLength(1);
  });

  it('should contain password field', () => {
    expect(AppComp.find('input[type="password"]')).toHaveLength(1);
  });

  it('should contain button', () => {
    expect(AppComp.find('button')).toHaveLength(1);
  });

  it('should not submit blank fields', () => {
    AppComp.find('button').simulate('click');
    expect(mockProps.onSubmit).not.toHaveBeenCalled();
  });

  it('should throw error for invaild email', () => {
    const field = AppComp.find('input[type="email"]');
    field.simulate('blur', { target: { value: 'test' } });
    const fieldError = AppComp.find('.ant-form-explain');
    expect(fieldError.text()).toEqual('Please enter your email');
  });

  it('should NOT throw error for valid email', () => {
    const field = AppComp.find('input[type="email"]');
    field.simulate('blur', { target: { value: 'test@example.com' } });
    expect(AppComp.find('.ant-form-explain')).toHaveLength(0);
  });

  it('should throw error for blank password', () => {
    const field = AppComp.find('input[type="password"]');
    field.simulate('blur', { target: { value: '' } });
    const fieldError = AppComp.find('.ant-form-explain');
    expect(fieldError.text()).toEqual('Please enter your password');
  });

  it('should NOT throw error for valid password', () => {
    const field = AppComp.find('input[type="password"]');
    field.simulate('blur', { target: { value: 'asdasdasd' } });
    expect(AppComp.find('.ant-form-explain')).toHaveLength(0);
  });

  it('should submit form with valid fields', () => {
    AppComp.find('input[type="email"]').simulate('blur', {
      target: { value: 'test@example.com' },
    });
    AppComp.find('input[type="password"]').simulate('change', {
      target: { value: '2hshSasd68' },
    });
    AppComp.find('form').simulate('submit');
    expect(mockProps.onSubmit).toHaveBeenCalledTimes(1);
    expect(mockProps.onSubmit).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: '2hshSasd68',
    });
  });
});
