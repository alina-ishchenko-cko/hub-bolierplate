import { text, colors } from 'styles/common.sc';
import { toEm, toRem } from 'utils/ui.util';
import styled from 'react-emotion';

export const SwitchStyled = styled('span')`
  margin: 0;
  padding: 0;
  position: relative;
  display: inline-block;
  vertical-align: middle;
  text-transform: uppercase;
  min-width: 10px;
  background-color: #f7f8fa;
  cursor: ${props => (props.disabled ? 'no-drop' : 'pointer')};
  transition: all 0.36s;
  user-select: none;
  border-radius: 3px;

  span {
    user-select: none;
  }

  .inner-wrap {
    display: block;
    width: auto;
    margin: 2px;
    position: relative;

    &:before,
    &:after {
      content: ' ';
      position: absolute;
      top: 0;
      left: 0;
      background-color: #fff;
      border: solid 1px #dfe1ea;
      line-height: 26px;
      width: 50%;
      height: 100%;
      transition: all 0.36s cubic-bezier(0.78, 0.14, 0.15, 0.86);
      box-shadow: 0 1px 3px 0 rgba(121, 131, 149, 0.15);
      border-radius: 3px;
    }

    &:before {
      background: transprent;
      z-index: 1;
      display: none;
    }

    &.checked-switch {
      &:before,
      &:after {
        left: 100%;
        margin-left: -50%;
      }
    }
  }

  .switch {
    cursor: ${props => (props.disabled ? 'no-drop' : 'pointer')};
    width: 47.8%;
    display: inline-block;
    font-size: ${toEm(text['10'])};
    padding: 0 ${toRem(8)};
    margin: 0 1px;
    background-color: transparent;
    border: solid 1px transparent;
    line-height: 26px;
    position: relative;
    z-index: 8;
    color: ${colors.text.tertiary};
    text-align: center;
    transition: all 0.5s ease-in-out;
  }

  .active {
    cursor: default;
    color: ${colors.link};
  }

  &.circle-switch {
    width: 41px;
    height: 22px;
    background-color: transparent;
    border: none;

    .inner-wrap {
      width: 100%;
      height: 100%;
      margin: 0;
      overflow: hidden;
      background-color: #dfe1ea;
      border: solid 1px #dfe1ea;
      transition: all 0.36s cubic-bezier(0.78, 0.14, 0.15, 0.86);
      border-radius: 11px

      &:after {
        top: 1px;
        left: 2px;
        width: 18px;
        height: 18px;
        border-color: #fff;
        line-height: 22px;
        border-radius: 11px;
      }

      &.checked-switch {
        border-color: #4780ec;
        background-color: #4780ec;
        &:before,
        &:after {
          left: 100%;
          margin-left: -50%;
        }
      }
    }

    .switch {
      width: 44%;
      margin: 0 0.5px;
      height: 100%;
      line-height: 22px;

      &.active {
        cursor: pointer;
      }
    }
  }
`;
