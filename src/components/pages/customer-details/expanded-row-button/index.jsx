// @flow
import * as React from 'react';
import { ExpandedRowButtonStyled } from './ExpandedRowButton.sc';

type Props = {
  isRowExpanded: boolean,
};

export default class ExpandedRowButton extends React.PureComponent<Props> {
  render() {
    return (
      <ExpandedRowButtonStyled isRowExpanded={this.props.isRowExpanded}>
        <span className="close">Close</span>
        <i />
      </ExpandedRowButtonStyled>
    );
  }
}
