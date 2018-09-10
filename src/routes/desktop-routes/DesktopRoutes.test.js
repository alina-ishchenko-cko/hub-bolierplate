import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import DesktopRoutes from './';

const expectedPaths = [
  '/dashboard',
  '/transactions',
  '/payment-plans',
  '/user-management',
  '/customers',
  '/statements',
  '/reports',
  '/settings',
  '/settings/user',
  undefined,
];

describe('DesktopRoutes', () => {
  let AppComp;

  beforeEach(() => {
    AppComp = shallow(<DesktopRoutes />);
  });

  it('should render without issues', () => {
    expect(AppComp).toBeDefined();
  });

  it('should contain Switch, Route, Redirect', () => {
    expect(AppComp.find(Switch)).toHaveLength(1);
    expect(AppComp.find(Route).exists()).toBeTruthy();
    expect(AppComp.find(Redirect)).toHaveLength(3);
  });

  it('should contain the paths', () => {
    let paths = AppComp.find(Route).map(n => {
      return n.prop('path');
    });
    expect(paths).toEqual(expectedPaths);
  });
});
