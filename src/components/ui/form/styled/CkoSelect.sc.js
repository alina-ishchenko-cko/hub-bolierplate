import { text, colors, animation } from 'styles/common.sc';
import { toEm, toRem } from 'utils/ui.util';
import styled from 'react-emotion';

export const FormRowStyled = styled('div')``;

export const SelectStyled = styled('div')`
  width: 100%;
  vertical-align: middle;
  display: inline-block;
  height: ${({ size }) => (size === 'large' ? '42px' : '32px')};
  line-height: ${({ size }) => (size === 'large' ? '42px' : '32px')};

  .select-container {
    width: 100%;
    background-color: #fff;
    color: ${colors.text.secondary};
    border: solid 1px ${colors.borders};
    font-size: ${toEm(text['13'])};
    font-weight: 400;
    box-shadow: 0 1px 3px 0 rgba(121, 131, 149, 0.15);
    border-radius: 3px;
    position: relative;
    height: inherit;
    line-height: inherit;
    cursor: pointer;
    ${animation.cubic};

    .cko-app-loading {
      position: absolute;
      z-index: 1;
      background: #fff;
      width: 100%;
      height: 100%;
      overflow: hidden;
      margin: 0;
      text-align: center;
      padding-top: 2px;
    }

    &:hover,
    &:focus {
      outline: none;
      border-color: #d0d3db;
      box-shadow: 0 1px 3px 0 rgba(121, 131, 149, 0.25);
    }

    .value-wrap {
      display: block;
      width: 100%;
      height: 100%;
      position: absolute;
    }

    .search-field-wrap {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }

    .select-search-field {
      width: 100%;
      padding: 0 ${toRem(16)};
      color: ${colors.text.secondary};
      height: 100%;
      line-height: inherit;
      border: none;

      &:focus,
      &:active {
        outline: none;
      }
    }

    .option-value,
    .ant-select-arrow {
      display: inline-block;
    }

    .option-value {
      width: 90%;
      color: ${colors.text.tertiary};
      padding: 0 ${toRem(16)};
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      max-width: 90%;
    }

    .ant-select-arrow {
      width: 32px;
      text-align: center;
      color: ${colors.text.adiacent};
      border: solid 1px transparent;
      margin: 4px 5px 0 0;
      border-radius: 3px 3px 0 0;
      position: absolute;
      top: 0;
      right: 0;

      &:before {
        font-size: 4px;
        margin-top: -3px;
        margin-right: -1px;
      }
    }

    &.select-open {
      .ant-select-arrow {
        color: ${colors.buttonBg};
        border-color: #eff0f4;
        border-bottom-color: #fff;
      }
    }

    .cko-icon {
      width: 17px;
      height: 12px;
      border-radius: 3px;
      box-shadow: 0 2px 5px 0 rgba(121, 131, 149, 0.2);
      overflow: hidden;
      margin-right: 10px;

      &.placeholder {
        box-shadow: none;
      }
    }

    input {
      width: 100%;
      height: 100%;
      border: none;
    }

    .listContainer {
      width: 100%;
      background: #fff;
      position: absolute;
      top: 100%;
      left: 0;

      .ant-select-dropdown {
        border: solid 1px #d0d3db;
        border-top-color: rgba(208, 211, 219, 0.5);
        border-radius: 0 0 3px 3px;
        box-shadow: 0 2px 5px 0 rgba(121, 131, 149, 0.25);
      }

      .ant-select-dropdown-menu {
        li {
          position: relative;
          user-select: none;
          padding: 0 ${toRem(16)};
          height: inherit;
          line-height: inherit;

          &::before {
            content: '';
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
          }

          &:hover {
            background-color: #fafbfc;
            color: ${colors.link};
          }

          &.ant-select-dropdown-menu-item-selected {
            background-color: ${colors.buttonBg};
            color: #fff;
          }
        }
      }
    }
  }
`;
