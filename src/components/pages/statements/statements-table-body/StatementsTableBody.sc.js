import styled from 'react-emotion';

import { text, colors } from 'styles/common.sc.js';

export const StatementsTableBodyContainer = styled('div')`
  /* display: flex; */
  width: 100%;
  margin-top: 36px;
`;

export const MonthTableBodyGroup = styled('div')`
  width: ${props => props.dimensions.large.collapsed}px;
  background: ${colors.bg};

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

export const DataTableBodyGroup = styled('div')`
  width: ${props => `calc(100% - ${props.monthDimensions.large.collapsed}px)`};
  background: ${colors.white};
  justify-content: space-between;

  @media (min-width: 1280px) and (max-width: 1439px) {
    width: ${props =>
      `calc(100% - ${
        props.isSidebarCollapsed
          ? props.monthDimensions.laptop.collapsed
          : props.monthDimensions.laptop.uncollapsed
      }px)`};
  }

  @media (min-width: 1440px) and (max-width: 1500px) {
    width: ${props =>
      `calc(100% - ${
        props.isSidebarCollapsed
          ? props.monthDimensions.largeLaptop.collapsed
          : props.monthDimensions.largeLaptop.uncollapsed
      }px)`};
  }
`;

export const DataContainerOne = styled('div')`
  display: flex;
`;

export const DataContainerTwo = styled('div')`
  display: flex;
`;

export const StatementRow = styled('div')`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid rgba(223, 225, 234, 0.3);

  &:last-child {
    border: none;
  }
`;

export const StatementsTableBodyGroup = styled('div')`
  width: ${props => props.width}%;
  background: ${props => (props.bgColor ? props.bgColor : colors.white)};
`;

export const MonthSection = styled('div')`
  display: flex;
  border-bottom: 2px solid #eff0f4;

  /* needed to offset the fixed footer to enable the desired scroll */
  &:last-child {
    padding-bottom: 45px;
  }
`;

const Column = styled('div')`
  box-sizing: border-box;
  padding: 30px 0 30px 30px;

  @media (min-width: 1280px) and (max-width: 1500px) {
    word-break: break-word;
  }
`;

export const MonthColumn = styled(Column)`
  position: relative;
`;

export const MonthLabel = styled('span')`
  font-size: ${text['18']}px;
  color: ${colors.text.tertiary};
`;

export const MonthIndicator = styled('div')`
  position: absolute;
  box-sizing: border-box;
  left: -8px;
  top: 36px;
  width: 16px;
  height: 16px;
  border-radius: 100%;
  background: ${colors.bg};
  box-shadow: inset 0px 1px 3px 0 rgba(121, 131, 149, 0.2),
    inset 0px 1px 3px 0 rgba(121, 131, 149, 0.2);
  z-index: 2;
`;

export const MonthIndicatorContent = styled('div')`
  position: relative;
  height: 100%;
  width: 100%;
`;

export const MonthIndicatorTopRightCurtain = styled('span')`
  position: absolute;
  top: 0;
  left: 8px;
  width: 8px;
  height: 8px;
  background: ${colors.bg};
`;

export const MonthIndicatorBottomRightCurtain = styled('span')`
  position: absolute;
  top: 8px;
  left: 8px;
  width: 8px;
  height: 8px;
  background: ${colors.bg};
`;

export const MonthIndicatorDot = styled('span')`
  position: absolute;
  top: 4px;
  left: 4px;
  width: 8px;
  height: 8px;
  border-radius: 100%;
  display: inline-block;
  background: ${colors.primary};
`;

export const DayCreatedColumn = styled(Column)`
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

export const DayCreatedLabel = styled('span')`
  font-size: 16px;
  color: ${colors.text.primary};
`;

export const StatementPeriodColumn = styled(Column)`
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
export const StatementPeriodLabel = styled('span')`
  font-size: 16px;
  color: ${colors.text.tertiary};
`;

export const StatusColumn = styled(Column)`
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

export const StatusList = styled('div')`
  display: flex;
  flex-direction: column;
`;

export const AmountColumn = styled(Column)`
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

export const AmountList = styled('div')`
  display: flex;
  flex-direction: column;
`;

export const AmountItem = styled('div')`
  text-align: right;
`;

export const AmountItemValue = styled('span')`
  font-size: 16px;
  color: ${colors.text.secondary};
  margin-right: 7px;
`;

export const AmountItemCurrency = styled('span')`
  font-size: 12px;
  color: ${colors.text.tertiary};
`;

export const StatementIdColumn = styled(Column)`
  width: ${props => props.dimensions.large.collapsed}px;
  text-align: right;

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

export const StatementIdLabel = styled('span')`
  font-size: 13px;
  color: ${colors.text.tertiary};
`;

export const DownloadColumn = styled(Column)`
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
