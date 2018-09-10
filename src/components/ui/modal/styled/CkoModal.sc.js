import { text, colors, clearfix } from 'styles/common.sc';
import { toEm, toRem } from 'utils/ui.util';
import styled, { css } from 'react-emotion';

// Button Styled Component
export const ModalWrapStyled = styled('div')`
  .ant-modal-mask {
    background-color: rgba(30, 36, 46, 0.7);
  }

  .ant-modal-header {
    margin-bottom: ${toRem(40)};
  }

  .ant-modal-content {
    border-top: solid 3px
      ${({ type }) =>
        type === 'danger' || type === 'confirm'
          ? colors.alertBg
          : colors.buttonBg};
    border-radius: 3px;
    padding: ${toRem(40)};
    position: relative;

    &:before {
      content: ' ';
      top: 0;
      left: 0;
      position: absolute;
      width: 100%;
      height: 100%;
      background: rgba(255, 255, 255, 0.5);
      z-index: 3;
      display: ${props => (props.loading ? 'block' : 'none')};
    }
  }

  .ant-modal-body {
    position: relative;
  }

  .ant-modal-footer {
    margin-top: ${toRem(30)};
  }

  .loader-wrap {
    width: 100%;
    position: absolute;
    left: 0;
    height: 100%;
    z-index: 8888;
    top: 0;
    text-align: center;
    padding-top: 20%;
  }
`;

export const ModalTitleStyled = styled('div')`
  position: relative;

  .title {
    color: ${colors.text.primary};
    font-size: ${toEm(text['18'])};
    display: inline-block;
    vertical-align: middle;
  }

  .cko-icon {
    width: 18px;
    margin-right: 10px;
  }

  .close-btn {
    cursor: pointer;
    position: absolute;
    top: 3px;
    right: 0;
    width: 16px;
    height: 16px;

    svg * {
      fill: ${colors.icons};
    }
  }
`;

export const ModalFooterStyled = styled('div')`
  ${clearfix};
  .or-divider {
    color: #adb0b8;
    display: inline-block;
    vertical-align: middle;
    margin: 0 ${toRem(20)};
  }

  .cancel-btn {
    cursor: pointer;
    color: ${colors.link};
    display: inline-block;
    vertical-align: middle;

    &.confirm-cancel {
      float: right;
      box-shadow: 0px 1px 3px 0 rgba(121, 131, 149, 0.15);
      background-color: #ffffff;
      border: solid 1px #dfe1ea;
      line-height: 42px;
      padding: 0 ${toRem(20)};
      border-radius: 3px;
    }
  }

  ${footerTheme};
`;

function footerTheme(props) {
  if (props.type === 'danger' || props.type === 'confirm') {
    return css`
      .cko-button:enabled {
        background-image: linear-gradient(to bottom, #cb5454, #be4343);
        box-shadow: 0 1px 3px 0 rgba(207, 88, 88, 0.45);

        &:hover {
          border-color: #be4343;
        }

        &:active:enabled {
          box-shadow: inset 0 1px 3px 0 rgba(58, 23, 23, 0.55);
          background-image: linear-gradient(to bottom, #cb5454, #a54848);
        }
      }
    `;
  }
}
