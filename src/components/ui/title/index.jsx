// @flow
import * as React from 'react';
import { AppTitleStyled } from './styled/CkoTitle.sc';

type Props = {
  size?: string,
  value: string,
  id?: string,
};

export default class CkoTitle extends React.Component<Props> {
  render() {
    const props = {};
    if (this.props.id) {
      props.id = this.props.id;
    }

    return (
      <AppTitleStyled {...props} className="cko-title" size={this.props.size}>
        {this.props.value}
      </AppTitleStyled>
    );
  }
}
