import * as React from 'react';
import AppFooter from './';
import { SideFooterStyled, FooterLinkStyled } from './AppFooter.sc';
import CkoButton from 'components/ui/button/';

describe('AppFooter', () => {
  let AppComp;
  let mockProps;
  beforeAll(() => {
    AppComp = shallow(<AppFooter />);
  });

  afterAll(() => {
    AppComp = null;
  });

  it('renders without crashing', () => {
    expect(AppComp.exists()).toBe(true);
  });

  it('renders contains the styled components', () => {
    expect(AppComp.find(SideFooterStyled)).toHaveLength(1);
    expect(AppComp.find(FooterLinkStyled)).toHaveLength(1);
  });

  it('renders contains the required components', () => {
    expect(AppComp.find(CkoButton)).toHaveLength(1);
  });

  it('renders contains the links', () => {
    expect(AppComp.find('a')).toHaveLength(2);
  });

  it('renders contains button link', () => {
    const Btn = AppComp.find(CkoButton);
    expect(Btn.prop('link')).toEqual(
      'https://docs.checkout.com/docs/getting-started'
    );
  });
});
