import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import PublicRoutes from './';

const expectedPublicPaths = [
  '/login',
  '/auth-2fa',
  '/reset-password',
  '/reset-password/:token',
  '/forgot-password',
  undefined,
];

describe('PublicRoutes', () => {
  let AppComp;

  beforeEach(() => {
    AppComp = shallow(<PublicRoutes />);
  });

  it('should render without issues', () => {
    expect(AppComp).toBeDefined();
  });

  it('should contain Switch, Route, Redirect', () => {
    expect(AppComp.find(Switch)).toHaveLength(1);
    expect(AppComp.find(Route).exists()).toBeTruthy();
    expect(AppComp.find(Redirect)).toHaveLength(1);
  });

  it('should contain the paths', () => {
    let paths = AppComp.find(Route).map(n => {
      return n.prop('path');
    });
    expect(paths).toEqual(expectedPublicPaths);
  });
});
