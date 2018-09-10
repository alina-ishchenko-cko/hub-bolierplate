import { colors, calendarStyle } from 'styles/common.sc';
import { toRem } from 'utils/ui.util';
import styled from 'react-emotion';
import { inputTheme } from './';
export { FormItemStyled } from './';

export const DatePickerStyled = styled('div')`
  ${inputTheme};

  .ant-calendar-picker > div {
    width: 100%;
    height: 100%;
  }

  .ant-calendar-picker-input {
    padding-left: 40px;
  }

  .ant-calendar-picker-clear {
    display: none;
  }

  .ant-calendar-picker-input {
    cursor: pointer;
  }

  .ant-calendar-picker-icon {
    zoom: 1;
    font-family: Flaticon;
    width: 32px;
    text-align: center;
    color: ${colors.text.adiacent};
    border: solid 1px transparent;
    margin: 0;
    padding: 0;
    line-height: inherit;
    height: 100%;
    border-radius: 3px 3px 0 0;
    position: absolute;
    top: 0;
    right: 0;
    text-transform: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    &:before {
      content: '\f102';
      transition: transform 0.2s ease;
      font-size: 4px;
      vertical-align: middle;
      margin-right: -1px;
    }
  }

  .calender-wrap {
    width: 100%;

    ${calendarStyle(false)};

    .ant-calendar {
      width: 100%;
      padding: ${toRem(10)};
    }
  }
`;
