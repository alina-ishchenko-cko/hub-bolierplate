// @flow
import * as React from 'react';
import { TdStyled } from './TableCell.sc';

type Props = {
  index: number,
  className?: string,
  onMouseEnter?: Function,
  onMouseLeave?: Function,
  children: React.Node,
};

export default class TableCell extends React.Component<Props> {
  handleMouseLeave = (e: SyntheticEvent<any>) => {
    e.stopPropagation();
    if (this.props.onMouseLeave) {
      this.props.onMouseLeave(this.props.index);
    }
  };

  handleMouseEnter = (e: SyntheticEvent<any>) => {
    e.stopPropagation();
    if (this.props.onMouseEnter) {
      this.props.onMouseEnter(this.props.index);
    }
  };

  render() {
    const props = {
      ...this.props,
      className: `cko-table-td ${this.props.className || ''}`,
      onMouseEnter: this.handleMouseEnter,
      onMouseLeave: this.handleMouseLeave,
    };

    return <TdStyled {...props}>{this.props.children}</TdStyled>;
  }
}
