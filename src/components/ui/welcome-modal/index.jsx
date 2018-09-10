// @flow
import * as React from 'react';
import CkoLoading from 'components/ui/loading/';
import { WrapStyled } from './WelcomeModal.sc';
import { FlexItem, FlexColumn } from 'components/ui/flex/';

export default class WelcomeModal extends React.Component<{}> {
  render() {
    return (
      <WrapStyled>
        <FlexColumn justify="center" alignItems="center">
          <FlexItem grow="0" className="fade-in">
            <p className="main-title">Welcome </p>
            <div className="update-wrap">
              <p className="sub-title">Setting up your account</p>
              <p className="sub-title update-info">Almost there</p>
            </div>
            <CkoLoading />
          </FlexItem>
        </FlexColumn>
      </WrapStyled>
    );
  }
}
