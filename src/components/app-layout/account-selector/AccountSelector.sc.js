import { text, colors } from 'styles/common.sc.js';
import { toEm, toRem } from 'utils/ui.util';
import styled, { css } from 'react-emotion';

const activeIcon = () => {
  return css`
    font-family: Flaticon;
    content: '\f101';
    position: absolute;
    top: 0;
    right: 10px;
    font-size: 16px;
    display: none;
  `;
};

export const WrapStyled = styled('div')`
  cursor: ${showCursorInWrap};
  position: relative;
  width: 100%;
  height: auto;
  margin-bottom: ${toEm(11)};
  z-index: 8;
  user-select: none;

  &.list-active {
    & .selected-business {
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    }
    & .channel-wrap {
      display: block;
    }
  }

  & .selected-business {
    i {
      display: ${showDropDwnIcon};
    }
  }
`;

export const SelectedStyled = styled('div')`
  width: 100%;
  overflow: hidden;
  font-weight: 500;
  background-color: #fff;
  position: relative;
  z-index: 1;

  border-radius: 3px;
  box-shadow: 0px 2px 5px 0px rgba(121, 131, 149, 0.2);

  & .parent-title {
    display: block;
    text-transform: uppercase;
    color: ${colors.text.adiacent};
    font-size: ${toEm(text['10'])};
    padding: 0;
    margin: 0;
    width: 86%;
    text-overflow: ellipsis;
    overflow: hidden;
    height: 15px;
    white-space: nowrap;
  }

  & .child-title {
    color: ${colors.text.primary};
    font-size: ${toEm(text['16'])};
    width: 86%;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  & i {
    position: absolute;
    font-style: normal;
    top: 25px;
    right: 20px;
    color: ${colors.text.tertiary};

    &:before {
      font-family: Flaticon;
      content: '\f104';
      position: absolute;
      top: 0;
      right: 0;
    }
  }
`;

export const BusinessListStyled = styled('div')`
  width: 100%;
  height: auto;
  background-color: #fff;
  position: absolute;
  top: 100%;
  display: none;
  border-radius: 0 0 3px 3px;
  box-shadow: 0 2px 5px 0 rgba(121, 131, 149, 0.25);

  & .list {
    position: relative;

    ul {
      display: none;
      margin: 0;
      padding: 0;
    }

    .channel-list {
      padding: 0 ${toRem(10)} ${toRem(20)} ${toRem(20)};
    }

    padding-right: ${toRem(20)};
    padding-left: ${toRem(20)};
    position: relative;
    border-top: solid 1px rgba(223, 225, 234, 0.5);
    color: #798395;

    &:before {
      content: '';
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      background: transparent;
      z-index: 2;
    }

    &:first-child {
      border-top-color: transparent;
    }

    /* Parent List */
    &.parent-list {
      padding-right: 0;
      padding-left: 0;

      & > .title {
        padding-left: ${toRem(20)};
      }

      &:after {
        font-family: Flaticon;
        content: '\f104';
        position: absolute;
        top: 17px;
        right: 20px;
      }

      &.active {
        color: #1f242f;

        &:after {
          content: '\f103';
          font-weight: bold;
        }

        & > ul {
          display: block;
        }
      }
    }
  }

  & .title {
    font-size: ${toEm(text['14'])};
    font-weight: ${text.medium};
    line-height: 50px;
    height: 50px;
    width: 80%;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  & .channel {
    background-color: transparent;
    line-height: 32px;
    height: 32px;
    font-size: ${toEm(text['14'])};
    color: ${colors.text.tertiary};
    padding: 0 ${toRem(10)};
    position: relative;
    border-radius: 3px;

    &:before {
      content: '';
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      background: transparent;
      z-index: 2;
    }

    &:after {
      ${activeIcon()};
    }

    &:hover {
      background-color: #f7f8fa;
      &:after {
        display: block;
      }
    }

    &.active {
      background-color: #f5f9ff;
      color: ${colors.link};
      &:after {
        display: block;
      }
    }

    span {
      width: 89%;
      text-overflow: ellipsis;
      overflow: hidden;
      display: block;
    }
  }

  & .account-list-wrap {
    width: 100%;
    height: auto;
    position: relative;
    overflow: ${getOverFlow};
    max-height: ${getListHeight};

    .input-wrap {
      width: 100%;
      background: #f6f7f9;
      height: 52px;
      overflow: hidden;
      padding: ${toRem(20)};

      input {
        margin-left: ${toRem(10)};
        width: auto;
        background: transparent;
        border: none;
        font-size: 1em;
      }
    }
  }

  & .business-list {
    li {
      border: none;
    }
  }

  & .single-business,
  & .account-list {
    .list.parent-list.active {
      background: #fff;
    }

    /* .list.parent-list.active li.active {
      background: #fafbfc;
    border-bottom: solid 2px rgba(223, 225, 234, 0.5); 
    } */

    & > li {
      &:after,
      & > .title {
        display: ${checkUserLevel};
      }
    }

    .all-label {
      .title {
        display: inline-block;
      }
      &:after {
        ${activeIcon()};
        display: block;
        line-height: 50px;
      }
      &.active {
        color: #366bcf;
      }
    }
  }

  & .list-sub-title {
    color: #adb0b8;
    font-size: ${toEm(10)};
    line-height: 30px;
    padding-top: ${toRem(10)};
    padding-left: ${toRem(20)};
    text-transform: uppercase;

    & + li {
      border-top-color: transparent;
    }
  }

  .business-loading-wrap {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding-top: 30%;
    background: rgba(255, 255, 255, 0.65);
    z-index: 8;
    cursor: default;
  }
`;

/* ------------------------------ HELPERS */
function showCursorInWrap({ disableDropDown }) {
  if (disableDropDown) {
    return 'default';
  }
  return 'pointer';
}

function showDropDwnIcon({ disableDropDown }) {
  if (disableDropDown) {
    return 'none';
  }
  return 'block';
}

function checkUserLevel({ isGodUser }) {
  if (isGodUser) {
    return 'block';
  }
  return 'none';
}

function getListHeight({ deviceHeight }) {
  if (deviceHeight) {
    return `${deviceHeight * 0.8}px`;
  }
  return 'auto';
}

function getOverFlow({ assetsLoading }) {
  if (assetsLoading) {
    return 'hidden';
  }
  return 'auto';
}
