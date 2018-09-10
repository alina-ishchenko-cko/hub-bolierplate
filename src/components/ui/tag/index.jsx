// @flow
import * as React from 'react';
import { TagStyled } from './styled/CkoTag.sc';

type Props = {
  value: string | number,
  plain?: boolean,
  yellow?: boolean,
  green?: boolean,
  red?: boolean,
  className?: string,
};

export default class CkoTag extends React.Component<Props> {
  static defaultProps = {
    value: '',
    plain: false,
    yellow: false,
    green: false,
    red: false,
    margin: true,
  };

  render() {
    const props = {
      ...this.props,
      className: `cko-tag ${this.props.className || ''}`,
    };
    return <TagStyled {...props}>{this.props.value}</TagStyled>;
  }
}
