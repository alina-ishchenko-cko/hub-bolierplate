import { colors, ocrFont, text } from 'styles/common.sc';
import { toRem, toEm } from 'utils/ui.util';
import styled from 'react-emotion';

/**
 * Table body style
 */
export const TableContainerStyled = styled('div')`
  display: block;
  width: 100%;
`;

export const TableWrapStyled = styled('div')`
  padding-top: ${toRem(10)};
  padding-right: ${toRem(10)};
  padding-bottom: ${toRem(74)};
  padding-left: ${toRem(10)};
  margin: 0 auto;
  position: relative;
  z-index: 2;

  .no-data {
    text-align: center;
    color: #adb0b8;
    margin-top: 5%;
    font-size: ${toEm(text['14'])};
  }

  .td-value {
    display: inline-block;
    max-width: calc(100% - 32px);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: middle;

    & > div {
      display: inline;
    }
  }

  *:focus {
    outline: none;
  }

  /* Card Number */
  .cardNum {
    ${ocrFont};
    .cko-icon {
      width: 26px;
      margin-right: ${toRem(8)};
    }
  }

  .cko-tooltip {
    position: relative;
    z-index: 1;
  }

  /* Tags */
  .tag-wrap {
    display: block;
    white-space: nowrap;
    margin-left: -5px;
  }

  /* Inline Filter Btn */
  .td-filter-btn {
    border: none;
    width: 22px;
    height: 22px;
    background: transparent;
    display: none;
    position: relative;
    margin-left: 5px;

    svg * {
      fill: ${colors.icons};
    }

    &:before {
      content: '';
      width: 100%;
      height: 100%;
      background: transparent;
      position: absolute;
      top: 0;
      left: 0;
    }

    &:hover {
      background: #fff;
      svg * {
        fill: ${colors.primary};
      }
    }
  }

  /* Dropdown */
  .cko-dropdown {
    display: inline-block;
    vertical-align: middle;
    position: relative;

    .ant-dropdown-trigger {
      width: 24px;
      height: 24px;
      border-radius: 3px;
      background: #fff;
      border: solid 1px transparent;
      display: inline-block;
      vertical-align: middle;
      line-height: 22px;
      transtition: all 0.3s;
      box-shadow: none;

      svg {
        vertical-align: middle;
      }
    }

    .cko-dropdown-wrap {
      position: absolute;
      left: -40px;
      top: 30px;

      .transaction-link {
        a {
          color: #366bcf;
        }
        .cko-icon {
          margin-top: -1px;
          svg * {
            fill: #366bcf;
          }
        }
      }
    }
  }
`;

/**
 * Checkbox style
 */
export const CheckBoxWrapStyled = styled('div')`
  width: 22px;
  overflow: hidden;
  z-index: 1;
  transition: left 0.2s ease-in-out;
  vertical-align: middle;
  display: inline-block;
  position: absolute;
  left: -22px;
`;

/**
 * Table Data Divider
 */
export const DividerTitleStyled = styled('div')`
  margin: 0 -30px;
  padding: 0 30px;
  background-color: #fbfbfc;
  height: 38px;
  line-height: 38px;
  border-bottom: solid 1px #f7f8fa;
  color: #adb0b8;
  font-weight: 500;
  text-align: left;
  clear: both;

  &:first-child {
    margin-top: -8px;
  }
`;
