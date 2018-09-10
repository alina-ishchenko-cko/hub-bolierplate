// @flow
import * as React from 'react';
import CkoIcon from 'components/ui/icon/';
import * as Styled from './Logo.sc';
export default class Logo extends React.Component<{}> {
  render() {
    return (
      <Styled.Logo className="menu-logo">
        <CkoIcon name="logo" />
      </Styled.Logo>
    );
  }
}
