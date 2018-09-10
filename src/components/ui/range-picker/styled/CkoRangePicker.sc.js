import { calendarStyle } from 'styles/common.sc';
import styled from 'react-emotion';

export const RangeStyled = styled('div')`
  & .ant-calendar-picker,
  & .ant-calendar-month-panel-year-select-arrow,
  & .ant-calendar-year-panel-decade-select-arrow {
    display: none;
  }
`;

export const CalendarStyled = styled('div')`
  ${calendarStyle(true)};
`;
