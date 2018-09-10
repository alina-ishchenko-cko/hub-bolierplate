// @flow
import * as React from 'react';
import { TrStyled } from './TableRow.sc';

type Props = {
  index: number,
  data: any,
  className?: string,
  onClick: Function,
  children: React.Node,
  onMouseLeave?: Function,
  onMouseEnter?: Function,
};

export default class TableRow extends React.Component<Props> {
  handleMouseLeave = (e: SyntheticEvent<any>) => {
    e.stopPropagation();
    if (this.props.onMouseLeave !== void 0) {
      this.props.onMouseLeave();
    }
  };

  handleMouseEnter = (e: SyntheticEvent<any>) => {
    e.stopPropagation();
    if (this.props.onMouseEnter !== void 0) {
      this.props.onMouseEnter(this.props.index);
    }
  };

  handleMouseClick = (e: Object) => {
    e.stopPropagation();
    const ignoreElements = ['INPUT', 'BUTTON'];
    if (!ignoreElements.includes(e.target.nodeName)) {
      this.props.onClick(this.props.index, this.props.data);
    }
  };

  render() {
    const props = {
      ...this.props,
      className: `cko-table-tr ${this.props.className || ''}`,
      onClick: this.props.onClick ? this.handleMouseClick : void 0,
      onMouseLeave: this.props.onMouseLeave ? this.handleMouseLeave : void 0,
      onMouseEnter: this.props.onMouseEnter ? this.handleMouseEnter : void 0,
    };
    delete props.data;

    return <TrStyled {...props}>{this.props.children}</TrStyled>;
  }
}
