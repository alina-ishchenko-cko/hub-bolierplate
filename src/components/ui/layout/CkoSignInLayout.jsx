// @flow
import * as React from 'react';
import CkoLoading from 'components/ui/loading/';
import { ContainerWrap, InnerWrap } from './styled/CkoSignInLayout.sc';

type Props = {
  loading: boolean,
  children: React.Node,
};

export default class CkoSignInLayout extends React.Component<Props> {
  render() {
    return (
      <ContainerWrap className="cko-signin-layout">
        <InnerWrap>
          {this.props.loading && (
            <div className="loading-wrap">
              <CkoLoading />
            </div>
          )}
          {this.props.children}
        </InnerWrap>
      </ContainerWrap>
    );
  }
}
