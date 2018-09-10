import styled from 'react-emotion';

import { text, colors } from 'styles/common.sc.js';

export const DateColumnContainer = styled('div')`
  position: fixed;
  background: ${colors.white};
  width: 160px;
  box-sizing: border-box;
  height: calc(100% - 132px);
  padding-left: 30px;
  box-shadow: 0px 2px 6px 0 rgba(121, 131, 149, 0.2);
  z-index: 2;

  @media (min-width: 1280px) and (max-width: 1440px) {
    width: 120px;
  }
`;

export const YearSection = styled('div')``;

export const YearLabel = styled('h2')`
  font-size: ${text.h2}px;
  color: ${colors.text.primary};
  font-weight: ${text.semiBold};
  margin-top: 20px;
  cursor: pointer;
`;

export const MonthList = styled('ul')`
  list-style: none;
  /* list-style-type: circle; */
`;

export const MonthItem = styled('li')`
  display: flex;
  align-items: center;
  font-size: ${text['14']}px;
  color: ${props =>
    props.active ? colors.text.primary : colors.text.tertiary};
  line-height: 2.57;
  user-select: none;
  cursor: pointer;
`;

export const ListDot = styled('div')`
  width: 4px;
  height: 4px;
  border-radius: 100%;
  background-color: ${props => (props.active ? colors.primary : colors.icons)};
  margin-right: 10px;
`;
