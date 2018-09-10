// @flow
import * as React from 'react';
import CkoButton from 'components/ui/button/';
import { SideFooterStyled, FooterLinkStyled } from './AppFooter.sc';

export default class AppFooter extends React.Component<{}> {
  render() {
    return (
      <SideFooterStyled className="menu-footer">
        <CkoButton
          size="large"
          type="primary"
          value="Docs"
          link="https://docs.checkout.com/docs/getting-started"
        />
        <FooterLinkStyled className="footer-about">
          <a target="_blank">About Checkout</a>
          <a target="_blank">Privacy Policy</a>
        </FooterLinkStyled>
      </SideFooterStyled>
    );
  }
}
