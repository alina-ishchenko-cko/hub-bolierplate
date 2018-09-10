import styled from 'react-emotion';

import { text, colors, fluidFixedWidth } from 'styles/common.sc.js';

export const StatementsTableHeaderContainer = styled('div')`
  display: flex;
  justify-content: space-between;
  position: fixed;
  height: 36px;
  background: ${colors.white};
  box-shadow: 0px 1px 3px 0 rgba(121, 131, 149, 0.2);
  z-index: 3;

  &:before {
    content: '';
    position: absolute;
    height: 100%;
    width: 15px;
    left: -15px;
    background: ${colors.white};
  }

  ${props =>
    fluidFixedWidth({
      width: 160,
      collapsed: props.isSidebarCollapsed,
    })};

  @media (min-width: 1280px) and (max-width: 1500px) {
    ${props =>
      fluidFixedWidth({
        width: 120,
        collapsed: props.isSidebarCollapsed,
      })};
  }
`;

export const StatementsTableHeaderGroup = styled('div')`
  display: flex;
`;

const StatementsTableHeaderItem = styled('div')`
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding-left: 30px;
`;

export const MonthHeaderItem = styled(StatementsTableHeaderItem)`
  width: ${props => props.dimensions.large.collapsed}px;

  @media (min-width: 1280px) and (max-width: 1439px) {
    width: ${props =>
      props.isSidebarCollapsed
        ? props.dimensions.laptop.collapsed
        : props.dimensions.laptop.uncollapsed}px;
  }

  @media (min-width: 1440px) and (max-width: 1500px) {
    width: ${props =>
      props.isSidebarCollapsed
        ? props.dimensions.largeLaptop.collapsed
        : props.dimensions.largeLaptop.uncollapsed}px;
  }
`;

export const DayCreatedItem = styled(StatementsTableHeaderItem)`
  width: ${props => props.dimensions.large.collapsed}px;

  @media (min-width: 1280px) and (max-width: 1439px) {
    width: ${props =>
      props.isSidebarCollapsed
        ? props.dimensions.laptop.collapsed
        : props.dimensions.laptop.uncollapsed}px;
  }

  @media (min-width: 1440px) and (max-width: 1500px) {
    width: ${props =>
      props.isSidebarCollapsed
        ? props.dimensions.largeLaptop.collapsed
        : props.dimensions.largeLaptop.uncollapsed}px;
  }
`;

export const StatementPeriodItem = styled(StatementsTableHeaderItem)`
  width: ${props => props.dimensions.large.collapsed}px;

  @media (min-width: 1280px) and (max-width: 1439px) {
    width: ${props =>
      props.isSidebarCollapsed
        ? props.dimensions.laptop.collapsed
        : props.dimensions.laptop.uncollapsed}px;
  }

  @media (min-width: 1440px) and (max-width: 1500px) {
    width: ${props =>
      props.isSidebarCollapsed
        ? props.dimensions.largeLaptop.collapsed
        : props.dimensions.largeLaptop.uncollapsed}px;
  }
`;

export const StatusItem = styled(StatementsTableHeaderItem)`
  width: ${props => props.dimensions.large.collapsed}px;

  @media (min-width: 1280px) and (max-width: 1439px) {
    width: ${props =>
      props.isSidebarCollapsed
        ? props.dimensions.laptop.collapsed
        : props.dimensions.laptop.uncollapsed}px;
  }

  @media (min-width: 1440px) and (max-width: 1500px) {
    width: ${props =>
      props.isSidebarCollapsed
        ? props.dimensions.largeLaptop.collapsed
        : props.dimensions.largeLaptop.uncollapsed}px;
  }
`;

export const AmountItem = styled(StatementsTableHeaderItem)`
  width: ${props => props.dimensions.large.collapsed}px;
  justify-content: flex-end;

  @media (min-width: 1280px) and (max-width: 1439px) {
    width: ${props =>
      props.isSidebarCollapsed
        ? props.dimensions.laptop.collapsed
        : props.dimensions.laptop.uncollapsed}px;
  }

  @media (min-width: 1440px) and (max-width: 1500px) {
    width: ${props =>
      props.isSidebarCollapsed
        ? props.dimensions.largeLaptop.collapsed
        : props.dimensions.largeLaptop.uncollapsed}px;
  }
`;

export const StatementIdItem = styled(StatementsTableHeaderItem)`
  width: ${props => props.dimensions.large.collapsed}px;
  justify-content: flex-end;

  @media (min-width: 1280px) and (max-width: 1439px) {
    width: ${props =>
      props.isSidebarCollapsed
        ? props.dimensions.laptop.collapsed
        : props.dimensions.laptop.uncollapsed}px;
  }

  @media (min-width: 1440px) and (max-width: 1500px) {
    width: ${props =>
      props.isSidebarCollapsed
        ? props.dimensions.largeLaptop.collapsed
        : props.dimensions.largeLaptop.uncollapsed}px;
  }
`;

export const DownloadItem = styled(StatementsTableHeaderItem)`
  width: ${props => props.dimensions.large.collapsed}px;
  padding-right: 20px;
  justify-content: flex-end;

  @media (min-width: 1440px) and (max-width: 1500px) {
    width: ${props =>
      props.isSidebarCollapsed
        ? props.dimensions.largeLaptop.collapsed
        : props.dimensions.largeLaptop.uncollapsed}px;
  }
`;

export const StatementsTableHeaderItemTitle = styled('span')`
  font-size: ${text['12']}px;
  color: ${colors.text.primary};
  font-weight: ${text.medium};
`;
