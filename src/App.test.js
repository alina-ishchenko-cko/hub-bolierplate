import * as React from 'react';
import App from './App';
import RoutesConfig from './routes/';
import LocaleProvider from 'antd/lib/locale-provider';
import { BrowserRouter } from 'react-router-dom';
import enUS from 'antd/lib/locale-provider/en_US';
import * as localApi from './services/localDataApi';

describe('App', () => {
  let Container, mockProps, AppComp;

  beforeAll(() => {
    mockProps = {
      store: {
        dispatch: jest.fn(),
        subscribe: jest.fn(),
      },
    };
    localApi.userSession.save();
    AppComp = shallow(<App {...mockProps} />);
  });

  afterEach(() => {
    mockProps.store.dispatch.mockClear();
    localApi.clearData();
  });

  it('should render App', () => {
    expect(AppComp).toBeDefined();
  });

  it('should contain LocaleProvider', () => {
    expect(AppComp.find(LocaleProvider)).toHaveLength(1);
  });

  it('should contain LocaleProvider prop locale', () => {
    let LocaleComp = AppComp.find(LocaleProvider);
    expect(LocaleComp.props().locale).toEqual(enUS);
  });

  it('should contain BrowserRouter', () => {
    expect(AppComp.find(BrowserRouter)).toHaveLength(1);
  });

  it('should contain basename / ', () => {
    let LocaleComp = AppComp.find(BrowserRouter);
    expect(LocaleComp.props().basename).toEqual('/');
  });

  it('should contain RoutesConfig', () => {
    expect(AppComp.find(RoutesConfig)).toHaveLength(1);
  });

  it('should logout user if not authenticated', () => {
    const AppComp = shallow(<App {...mockProps} />);
    expect(mockProps.store.dispatch).toHaveBeenCalledTimes(1);
    expect(mockProps.store.dispatch).toHaveBeenCalledWith({
      type: 'SIGN_OUT',
      sessionEnd: true,
    });
  });

  it('should load cached login and account user if is authenticated', () => {
    localApi.user.save({
      data: {
        email: 'test@test.com',
        token: '1234',
      },
    });
    localApi.accounts.save({
      fromDate: '2018-01-01',
    });
    const AppComp = shallow(<App {...mockProps} />);
    expect(mockProps.store.dispatch).toHaveBeenCalledTimes(2);
    expect(mockProps.store.dispatch.mock.calls[0]).toEqual([
      {
        payload: { data: { data: { email: 'test@test.com', token: '1234' } } },
        type: 'LOAD_LOGIN_CACHED_DATA',
      },
    ]);
    expect(mockProps.store.dispatch.mock.calls[1]).toEqual([
      {
        payload: { data: { fromDate: '2018-01-01' } },
        type: 'LOAD_ACCOUNTS_CACHED_DATA',
      },
    ]);
  });
});
