import { text, colors, clearfix } from 'styles/common.sc';
import { toRem, toEm } from 'utils/ui.util';
import styled, { css } from 'react-emotion';

const footerPositionStyle = ({ isFixed }) => {
  if (isFixed) {
    return css`
      position: fixed;
      bottom: 20px;
    `;
  }

  return css`
    position: absolute;
    bottom: 0;
    width: 100%;
  `;
};

/**
 * Footer
 */
export const FooterWrapStyled = styled('div')`
  height: 52px;
  line-height: 52px;

  .fixed-wrap {
    width: 100%;
    height: 100%;
    background: #fff;
    border-radius: 0 0 3px 3px;
    padding-right: ${toRem(20)};
    padding-left: ${toRem(20)};
    ${clearfix};
  }

  &.footer-fixed {
    z-index: 8;
    left: inherit;
    right: auto;
    overflow: visible;
    padding: 0;
    ${footerPositionStyle};

    &:after {
      content: ' ';
      background: #f7f8fa;
      width: 101%;
      position: absolute;
      bottom: -20px;
      height: 20px;
      left: -5px;
    }

    .fixed-wrap {
      box-shadow: 0px -1px 3px 0 rgba(121, 131, 149, 0.2);
      position: relative;
      z-index: 1;

      &:after {
        content: ' ';
        background: #fff;
        width: 100%;
        position: absolute;
        bottom: 0px;
        height: 90%;
        left: 0px;
        border-radius: 0 0 3px 3px;
        z-index: -1;
        box-shadow: 0px 2px 5px 0 rgba(121, 131, 149, 0.1);
      }
    }
  }
`;

/**
 * Footer - Left
 */
export const FootLeftStyled = styled('div')`
  line-height: 52px;
  min-height: 1px;
  float: left;
  position: relative;
  z-index: 2;

  .ant-dropdown-button {
    position: relative;
    overflow: hidden;
    width: 174px;
    background-color: #fff;
    height: 32px;
    line-height: 32px;
    margin-top: 10px;
    padding: 0 ${toRem(15)};
    border: solid 1px ${colors.borders};
    box-shadow: 0 1px 3px 0 rgba(121, 131, 149, 0.15);
    border-radius: 3px;
  }

  .drop-down-wrap {
    width: 174px;
    position: relative;

    .ant-dropdown {
      width: 100% !important;
      left: 0 !important;
    }

    .ant-dropdown-menu-item,
    .ant-dropdown-menu-submenu-title {
      padding: 0 ${toRem(15)};
    }
  }

  button {
    border: none;
    font-size: ${toEm(text['13'])};
    color: ${colors.text.secondary};
  }

  .ant-dropdown-trigger {
    line-height: 32px;
    position: absolute;
    right: 10px;
    font-size: 5px;
    color: ${colors.icons};
    padding-right: ${toRem(15)};

    &:after {
      content: '';
      background: transparent;
      width: 174px;
      height: 100%;
      left: -142px;
      right: 100%;
      position: absolute;
    }

    &:before {
      font-family: Flaticon;
      top: 15%;
      content: '\f102';
    }
  }
`;

/**
 * Footer - Centre
 */
export const FootCenterStyled = styled('div')`
  width: 100%;
  text-align: center;
  line-height: 52px;
  min-height: 1px;
  position: absolute;
  top: 10px;
  left: 0px;
  z-index: 1;
`;

/**
 * Footer - Right
 */
export const FootRightStyled = styled('div')`
  text-align: right;
  line-height: 52px;
  font-size: ${toEm(text['13'])};
  min-height: 1px;
  float: right;
  position: relative;
  z-index: 2;

  & span {
    color: ${colors.text.tertiary};
    margin-right: ${toRem(15)};
  }

  & input {
    width: 32px;
    height: 32px;
    border-radius: 3px;
    background-color: #fff;
    box-shadow: 0 1px 3px 0 rgba(121, 131, 149, 0.15);
    border: solid 1px ${colors.borders};
    color: ${colors.text.secondary};
    text-align: center;
  }
`;
