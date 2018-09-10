import styled from 'react-emotion';
import { colors, fluidFixedWidth } from 'styles/common.sc.js';

export const StatementsContainer = styled('div')`
  display: flex;
  width: 100%;
`;

export const StaticBlock = styled('div')`
  position: fixed;
  bottom: 0;
  height: 45px;
  background: ${colors.bg};
  z-index: 2;
  ${props =>
    fluidFixedWidth({
      collapsed: props.isSidebarCollapsed,
    })};
`;

export const FakeShadow = styled('div')`
  position: fixed;
  bottom: 45px;
  height: 1px;
  background: transparent;
  box-shadow: 0px 2px 5px 0 rgba(121, 131, 149, 0.2);
  z-index: 3;
  ${props =>
    fluidFixedWidth({
      collapsed: props.isSidebarCollapsed,
    })};
`;
