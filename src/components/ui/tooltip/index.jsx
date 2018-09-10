// @flow
import * as React from 'react';
import { TipWrapStyled } from './styled/CkoTooltip.sc';
import Tooltip from 'antd/lib/tooltip';

type Props = {
  visible?: boolean,
  primary?: boolean,
  warning?: boolean,
  white?: boolean,
  danger?: boolean,
  title: React.Node,
  placement?: string,
  className?: string,
  children: React.Node,
};

export default class CkoTooltip extends React.Component<Props> {
  tipContainer: ?HTMLElement;

  render() {
    const { placement, title, ...props } = {
      ...this.props,
      className: `cko-tooltip ${this.props.className || ''}`,
    };
    return (
      <TipWrapStyled {...props}>
        <div
          ref={node => {
            this.tipContainer = node;
          }}
          className="tip-container"
        />
        <Tooltip
          {...this.props}
          autoAdjustOverflow={false}
          getPopupContainer={() => this.tipContainer}
          className="tool-tip-wrap">
          {this.props.children}
        </Tooltip>
      </TipWrapStyled>
    );
  }
}
