import { text, colors } from 'styles/common.sc';
import { toRem, toEm } from 'utils/ui.util';
import styled from 'react-emotion';
import { FlexColumn, FlexItem } from 'components/ui/flex/';

/**
 * Table Wrap
 */
export const TableWrapStyled = styled('div')`
  width: 100%;
  height: auto;
  border-radius: 3px;
  background-color: #fff;
  box-shadow: 0px 2px 5px 0px rgba(121, 131, 149, 0.2);
  position: relative;

  /* DO NOT REMOVE THIS */
  .hideColValue {
    position: absolute;
    height: auto;
    overflow: hidden;
    opacity: 0;
    z-index: -1;

    .temp-wrap {
      display: inline-block;
    }

    .cko-currency-format {
      display: inline-block;
      font-weight: ${text.medium};
    }

    .currency {
      width: 25px;
      display: inline-block;
      margin-left: 5px;
      white-space: nowrap;
    }
  }

  .cko-table-inner {
    width: 100%;
    height: 100%;
    position: relative;
    min-height: 500px;
  }
`;

/**
 * Header Container
 */
export const HeaderContainerStyled = styled('div')`
  position: relative;
  display: block;
  border-radius: 3px 3px 0 0;
  background: #fff;
  padding-bottom: 0;
  z-index: 8;

  &.th-fixed {
    position: fixed;
    top: 86px;
    z-index: 8;
    left: inherit;
    right: auto;
  }
`;

/**
 * Header Actions
 */
export const ActionsStyled = styled(FlexColumn)`
  position: relative;
  width: 100%;
  height: 52px;
  line-height: 52px;
  overflow: hidden;
  padding-top: ${toRem(10)};
  padding-right: ${toRem(20)};
  padding-left: ${toRem(20)};

  &.filter-active {
    height: 100%;
    overflow: initial;
  }
`;

/**
 * Header - Left
 */
export const LeftActionStyled = styled(FlexItem)`
  flex-basis: auto;
  user-select: none;

  .title {
    margin-right: ${toRem(37)};
    font-size: ${toEm(text['15'])};
  }

  .title,
  .cko-input,
  .cko-button {
    display: inline-block;
    vertical-align: middle;
  }

  .cko-input {
    width: 290px;
  }

  .clear-search {
    cursor: pointer;
    color: ${colors.link};
  }

  .cko-filter-btn {
    position: relative;

    .close-text {
      display: none;
      color: #fff;
      font-size: 1em;
      text-align: center;
      position: absolute;
      width: 100%;
      z-index: 1;
      top: 0;
      left: 0;
    }

    &:before {
      content: ' ';
      background: #7a8393;
      width: 102%;
      height: 52px;
      position: absolute;
      top: -11px;
      left: -1px;
      border-radius: 5px 5px 0 0;
      display: none;
    }

    &.filter-active {
      .close-text {
        display: inline-block;
      }

      &:before {
        display: block;
      }
    }
  }
`;

/**
 * Header - Right
 */
export const RightActionStyled = styled(FlexItem)`
  flex-basis: auto;
  text-align: right;

  .action-btns {
    display: inline-block;
    vertical-align: middle;
    line-height: 34px;
  }

  .divider.lg {
    margin: 0 ${toRem(30)};
  }

  .cko-button[type='success'] {
    margin-left: ${toRem(10)};
  }

  .items-selected {
    margin-right: ${toRem(20)};
    color: ${colors.text.adiacent};
  }
`;

/**
 * Header - Filter
 */
export const FilterWrapStyled = styled('div')`
  width: 100%;
  height: 0;
  overflow: hidden;
  margin: 8px auto 0 auto;
  position: relative;
  z-index: 2;

  &:before {
    content: ' ';
    width: calc(100% + 60px);
    height: 100%;
    border-radius: 2px;
    background-color: #7a8393;
    position: absolute;
    top: 0;
    left: -30px;
  }

  .cko-table-filter {
    opacity: 0;
    transition: opacity ease-in 0.3s;
  }

  &.filter-active {
    height: 100%;
    overflow: initial;

    .cko-table-filter {
      opacity: 1;
      padding: 10px 0;
    }
  }
`;

export const DividerStyled = styled('span')`
  width: 1px;
  height: 17px;
  opacity: 0.5;
  background-color: ${colors.borders};
  margin: 0 ${toRem(10)};
  display: inline-block;
  vertical-align: middle;
`;
