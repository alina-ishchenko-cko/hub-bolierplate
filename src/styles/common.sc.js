import { css } from 'react-emotion';
import { toEm, toRem } from 'utils/ui.util';
import { SMALL_VIEW as C_SMALL_VIEW } from 'config';

export const BASE = 13;
export const SMALL_VIEW = `${C_SMALL_VIEW}px`;

/**
 * GENERAL
 */
export const general = {
  gutter: 20,
};

/**
 * COLORS
 */
export const colors = {
  primary: '#4780EC',
  text: {
    primary: '#1E242E',
    secondary: '#464F60',
    tertiary: '#798395',
    adiacent: '#ADB0B8',
  },
  icons: '#ACB2BF',
  borders: '#DFE1EA',
  darkBorder: '#EFF0F4',
  bg: '#F7F8FA',
  link: '#366BCF',
  white: '#ffffff',
  buttonBg: '#4780EC',
  successTxt: '#2F9378',
  greenBg: '#2EAA88',
  warningTxt: '#D67F1C',
  warningBg: '#DE9A4B',
  alertTxt: '#BE4343',
  alertBg: '#CF5858',
  sideLink: '#3A6FD2',
};

/**
 * FONT FAMILIES
 */
export const sourceSanFont = (props: Object) => css`
  font-family: 'Source Sans Pro', sans-serif;
`;

export const ocrFont = (props: Object) => css`
  font-family: 'OCR A Extended';
`;

/**
 * TYPOGRAPHY
 */
export const text = {
  h1: 24,
  h2: 21,
  h3: 16,
  h4: 15,
  base: BASE,
  '10': 10,
  '11': 11,
  '12': 12,
  '13': 13,
  '14': 14,
  '15': 15,
  '16': 16,
  '18': 18,
  '40': 40,
  medium: 500,
  semiBold: 600,
};

export const clearfix = props => css`
  &:before,
  &:after {
    display: table;
    content: ' ';
  }
  &:after {
    clear: both;
  }
`;

/**
 * Animations
 */
export const animation = {
  cubic: 'transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1)',
  ease: 'transition: all 0.3s ease-in-out',
  easeBg: 'transition: background .3s ease',
};

/**
 * Calendar
 */
export const calendarStyle = isRange => {
  return css`
    .ant-calendar {
      font-size: 1em;
    }

    .ant-calendar-input-wrap,
    .ant-calendar-range-middle,
    .ant-calendar-prev-year-btn {
      display: none;
    }

    .ant-calendar-picker-container {
      left: auto !important;
      top: auto !important;
      right: auto;
      position: relative;
      width: 100%;
      height: 100%;
    }

    .ant-calendar-range {
      width: 100%;
      box-shadow: none;
      border: none;
    }

    .ant-calendar-panel {
      ${clearfix};
    }

    .ant-calendar-date-panel {
      width: ${isRange ? '80%' : '100%'};
      float: ${isRange ? 'right' : 'none'};
    }

    .ant-calendar-range-part {
      width: 47%;
    }

    .ant-calendar-range-left {
      margin-right: ${toRem(30)};
    }

    /* Navs */
    .ant-calendar-prev-month-btn,
    .ant-calendar-next-month-btn,
    .ant-calendar-month-panel-prev-year-btn,
    .ant-calendar-month-panel-next-year-btn,
    .ant-calendar-year-panel-prev-decade-btn,
    .ant-calendar-year-panel-next-decade-btn,
    .ant-calendar-decade-panel-prev-century-btn,
    .ant-calendar-decade-panel-next-century-btn {
      position: absolute;
      top: 0;
      background-color: #fff;
      border: solid 1px ${colors.borders};
      padding: 0 ${toRem(8)};
      font-size: ${toEm(12)};
      color: ${colors.icons};
      height: 30px;
      line-height: 29px;
      border-radius: 3px;
      box-shadow: 0 1px 3px 0 rgba(121, 131, 149, 0.15);
      ${animation.ease};

      &:before,
      &:before,
      &:after,
      &:after {
        font-family: Flaticon;
        font-style: normal;
      }

      &:hover {
        box-shadow: 0 1px 3px 0 rgba(121, 131, 149, 0.25);
        border-color: #d0d3db;
        color: ${colors.text.tertiary};
      }
    }

    .ant-calendar-prev-month-btn,
    .ant-calendar-month-panel-prev-year-btn,
    .ant-calendar-year-panel-prev-decade-btn,
    .ant-calendar-decade-panel-prev-century-btn {
      left: 0;

      &:after {
        content: '\f106';
      }
    }

    .ant-calendar-next-month-btn,
    .ant-calendar-month-panel-next-year-btn,
    .ant-calendar-year-panel-next-decade-btn,
    .ant-calendar-decade-panel-next-century-btn {
      right: 0;
      &:after {
        content: '\f105';
      }
    }

    /* Title */
    .ant-calendar-my-select,
    .ant-calendar-month-panel-year-select,
    .ant-calendar-year-panel-decade-select {
      color: ${colors.text.primary};
    }

    .ant-calendar-my-select {
      font-size: ${toEm(text['15'])};
    }

    .ant-calendar-month-select {
      font-weight: ${text['semiBold']};

      &:hover {
        color: ${colors.link};
      }
    }

    .ant-calendar-month-panel-year-select,
    .ant-calendar-year-panel-decade-select,
    .ant-calendar-decade-panel-century {
      font-size: ${toEm(text['16'])};
      &:hover {
        color: ${colors.link};
      }
    }

    /* Body */
    .ant-calendar-column-header {
      font-size: ${toEm(text['12'])};
      color: ${colors.text.tertiary};
    }

    .ant-calendar-cell .ant-calendar-date,
    .ant-calendar-month-panel-cell .ant-calendar-month-panel-month,
    .ant-calendar-decade-panel-cell .ant-calendar-decade-panel-decade {
      color: ${colors.text.secondary};
    }

    .ant-calendar-cell.ant-calendar-last-month-cell .ant-calendar-date,
    .ant-calendar-cell.ant-calendar-next-month-btn-day .ant-calendar-date {
      color: ${colors.text.adiacent};
    }

    .ant-calendar-cell.ant-calendar-disabled-cell {
      position: relative;

      &:before {
        content: '';
        display: block;
        background: rgba(207, 88, 88, 0.03);
        border-radius: 0;
        border: 0;
        position: absolute;
        top: 2px;
        bottom: 0px;
        left: 0;
        right: 0;
        height: 30px;
      }
      .ant-calendar-date {
        color: #be4343;
      }
    }

    .ant-calendar-date,
    .ant-calendar-decade-panel-cell .ant-calendar-decade-panel-decade {
      &:hover {
        background: #f5f9ff;
        cursor: pointer;
        color: #366bcf;
      }
    }

    .ant-calendar-selected-date .ant-calendar-date,
    .ant-calendar-range-part .ant-calendar-selected-day .ant-calendar-date,
    .ant-calendar-month-panel-selected-cell .ant-calendar-month-panel-month,
    .ant-calendar-year-panel-selected-cell .ant-calendar-year-panel-year {
      background-color: #3a81e8;
      color: #fff;
    }

    .ant-calendar-today .ant-calendar-date {
      background: #f5f9ff;
      color: #366bcf;
    }

    .ant-calendar-cell {
      .error-tip {
        position: absolute;
        border-radius: 2px;
        background-color: #cf5858;
        box-shadow: 0 2px 5px 0 rgba(207, 88, 88, 0.45);
        color: #fff;
        font-size: 12px;
        width: 160px;
        padding: 0;
        z-index: 1;
        text-align: center;
        display: none;
        top: 100%;
        left: -50%;
      }

      &:hover {
        .error-tip {
          display: block;
        }
      }
    }

    .ant-calendar-month-panel-month,
    .ant-calendar-year-panel-year {
      font-size: ${toEm(text['13'])};
      color: ${colors.text.secondary};
      display: block;
      margin: 0 auto;
      width: 48px;
      height: 32px;
      line-height: 32px;
      border: none;
      padding: 0;
      background: transparent;
      text-align: center;
      ${animation.easeBg};
      box-radius: 2px;

      &:hover {
        background: #f5f9ff;
        cursor: pointer;
        color: #366bcf;
      }
    }

    .ant-calendar-year-panel > div {
      height: 100%;
      top: 0;
      position: absolute;
      background: white;
      width: 100%;
    }

    /* Side Links */
    .ant-calendar-footer {
      width: 20%;
      float: left;
      border: none;

      a {
        display: block;
        font-weight: 500;
        font-size: ${toEm(text['13'])};
        color: ${colors.text.tertiary};

        &:hover {
          color: ${colors.link};
        }
      }
    }
  `;
};

type FluidFixedWidthOptions = {
  width?: number,
  collapsed?: boolean,
};

export const fluidFixedWidth = (options?: FluidFixedWidthOptions = {}) => {
  /** 
	sidebar width (270px) + 
	sidebar margin left (20px) + 
	contentArea padding (40px) + 
	contentArea margin right (20px) = 350px
*/
  const optionalWidth = options.width ? options.width : 0;

  if (options.collapsed) {
    const width = `${optionalWidth + 140}px`;
    return css`
      width: calc(100% - ${width});
      max-width: 1780px;
      max-width: ${`${1780 - optionalWidth}px`};
    `;
  }

  const width = `${optionalWidth + 350}px`;
  return css`
    width: calc(100% - ${width});
    max-width: ${`${1570 - optionalWidth}px`};
  `;
};
