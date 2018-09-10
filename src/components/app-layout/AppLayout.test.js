import React from 'react';
import { AppLayout } from './AppLayout';
import {
  AppContainerStyled,
  ContentStyled,
  ContentWrapStyled,
} from './Applayout.sc';
import Sidebar from './sidebar/';
import Header from './header/';

describe('AppLayout', () => {
  let AppComp;
  let mockProps;
  beforeAll(() => {
    mockProps = {
      location: {},
      history: {},
    };
    AppComp = shallow(<AppLayout {...mockProps} />);
  });

  afterAll(() => {
    AppComp = null;
  });

  it('renders without crashing', () => {
    expect(AppComp.exists()).toBe(true);
  });

  it('renders contains the styled components', () => {
    expect(AppComp.find(AppContainerStyled)).toHaveLength(1);
    expect(AppComp.find(ContentStyled)).toHaveLength(1);
    expect(AppComp.find(ContentWrapStyled)).toHaveLength(1);
  });

  it('renders contains the required components', () => {
    expect(AppComp.find(Sidebar)).toHaveLength(1);
    expect(AppComp.find(Header)).toHaveLength(1);
  });
});
