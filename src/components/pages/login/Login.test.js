import * as React from 'react';
import { MemoryRouter } from 'react-router-dom';
import Login from './Login';
import LoginForm from './login-form/';
import NewsUpdate from './news-update/';
import { Column, Title } from 'components/ui/layout/styled/CkoSignInLayout.sc';
import CkoSignInLayout from 'components/ui/layout/CkoSignInLayout';
import { hideFeedback } from 'components/ui/feedback/';

describe('Login', () => {
  // Hide console warnings
  console.warn = null;

  let AppComp;
  let mockProps;
  beforeEach(() => {
    mockProps = {
      history: {
        push: jest.fn(),
      },
      location: {
        search: '',
      },
      currentUser: {
        loading: false,
      },
      verifyTokenData: {
        success: false,
        error: false,
      },
      requestPasswordData: {
        success: false,
        error: false,
      },
      newPasswordData: {
        success: false,
        error: false,
      },
      verifyToken: jest.fn(),
      clearPassword: jest.fn(),
      loginUser: jest.fn(),
      logout: jest.fn(),
      clearLoginState: jest.fn(),
    };
    AppComp = shallow(<Login {...mockProps} />);
  });

  afterEach(() => {
    AppComp = null;
    mockProps = null;
    hideFeedback();
  });

  it('renders without crashing', () => {
    expect(AppComp.exists()).toBe(true);
  });

  it('should contain the required components', () => {
    expect(AppComp.find(LoginForm)).toHaveLength(1);
    expect(AppComp.find(CkoSignInLayout)).toHaveLength(1);
    expect(AppComp.find(NewsUpdate)).toHaveLength(1);
    expect(AppComp.find(Column)).toHaveLength(2);
  });

  it('should called the init methods on mount', () => {
    expect(mockProps.clearPassword).toHaveBeenCalledTimes(1);
    expect(mockProps.logout).toHaveBeenCalledTimes(1);
    expect(mockProps.clearLoginState).toHaveBeenCalledTimes(1);
  });

  it('should redirect to the dashboard', () => {
    AppComp.setProps({
      currentUser: {
        loading: false,
        token: '234567890aasdasdasd',
      },
    });
    expect(mockProps.history.push).toHaveBeenCalledTimes(1);
    expect(mockProps.history.push).toHaveBeenCalledWith('/dashboard');
  });

  it('should redirect to the reset-password', () => {
    const token = 'asd5a5s7s7d7s7d7s';
    mockProps.location.search = `?verify=${token}`;
    AppComp.setProps({
      verifyTokenData: {
        success: true,
      },
    });
    expect(mockProps.history.push).toHaveBeenCalledTimes(1);
    expect(mockProps.history.push).toHaveBeenCalledWith(
      `/reset-password/${token}`
    );
  });

  it('should redirect to the dashboard', () => {
    AppComp.setProps({
      newPasswordData: {
        email: 'test@test.com',
      },
    });
    expect(mockProps.history.push).toHaveBeenCalledTimes(1);
    expect(mockProps.history.push).toHaveBeenCalledWith('/reset-password');
  });

  it('should verify token on mount if in URL params', () => {
    const token = 'asd5a5s7s7d7s7d7s';
    mockProps.location.search = `?verify=${token}`;
    AppComp = shallow(<Login {...mockProps} />);
    expect(mockProps.verifyToken).toHaveBeenCalledTimes(1);
    expect(mockProps.verifyToken).toHaveBeenCalledWith('asd5a5s7s7d7s7d7s');
  });

  it('should call the login user callback', () => {
    const data = {
      email: 'test@test.com',
      password: '123123123',
    };
    const Form = AppComp.find(LoginForm);
    const formSubmit = Form.prop('onSubmit');
    formSubmit(data);
    expect(mockProps.loginUser).toHaveBeenCalledTimes(1);
    expect(mockProps.loginUser).toHaveBeenCalledWith(data);
  });
});
