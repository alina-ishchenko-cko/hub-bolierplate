// @flow
import * as React from 'react';
import {
  WrapStyled,
  TitleStyled,
  ContentStyled,
} from './styled/ContentList.sc';
type Props = {
  title?: string,
  className?: string,
  children: React.Node,
};

export default class ContentList extends React.Component<Props> {
  render() {
    return (
      <WrapStyled className={`content-wrap ${this.props.className || ''}`}>
        {this.props.title && (
          <TitleStyled>
            <p>{this.props.title}</p>
          </TitleStyled>
        )}
        <ContentStyled>{this.props.children}</ContentStyled>
      </WrapStyled>
    );
  }
}
