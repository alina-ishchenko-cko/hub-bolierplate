import { clearfix } from 'styles/common.sc';
import { toRem } from 'utils/ui.util';
import styled from 'react-emotion';

export const FilterListStyled = styled('div')`
  width: 100%;
  display: block;
  margin-top: 10px;
  ${clearfix};

  .filter-fields {
    width: 95%;
    height: 52px;
    line-height: 52px;
    float: left;
    border-radius: 2px;
    padding: 0;
    box-shadow: 0 1px 3px 0 rgba(30, 36, 46, 0.15);
  }

  .filter-inline {
    float: left;
    display: block;
    position: relative;
    height: 100%;
    background: #f7f8fa;

    &:after {
      content: ' ';
      width: 1px;
      height: 52px;
      background: #e0e1e9;
      position: absolute;
      top: 0;
      right: -1px;
      z-index: 1;
    }

    &:before {
      content: '\f100';
      font-family: 'Flaticon';
      width: 25px;
      height: 25px;
      line-height: 25px;
      text-align: center;
      color: #e0e1e9;
      border: solid 1px #e0e1e9;
      background: #f7f8fa;
      border-radius: 50%;
      position: absolute;
      top: 14px;
      right: -13px;
      z-index: 2;
    }
  }

  .filter-actions {
    width: 11.98%;
  }

  .filter-field {
    width: 25.25%;
  }

  .filter-results {
    width: 12.27%;

    &:before,
    &:after {
      display: none;
    }
  }
`;

export const FilterActionsStyled = styled('div')`
  padding-left: ${toRem(10)};
  border-radius: 2px 0 0 2px;

  .cko-button {
    display: inline-block;
    width: 42%;
    vertical-align: middle;
    margin-right: 5px;
    padding: 0;
  }

  .in-active {
    background: transparent;
    color: #7a8393;
    box-shadow: none;
  }
`;

export const FilterFieldStyled = styled('div')`
  padding: 0 ${toRem(28)};

  .cko-input,
  .cko-select {
    vertical-align: middle;
    display: inline-block;
    height: 42px;
    line-height: 42px;
  }

  .ant-select-selection-selected-value {
    display: inline-block !important;
    vertical-align: middle;
    float: none;
    width: 100%;
  }
`;

export const ClearBtnStyled = styled('button')`
  width: 5%;
  display: block;
  background: #f7f8fa;
  height: 42px;
  border-radius: 0 2px 2px 0;
  border: none;
  color: #aaafb9;
  font-size: 1em;
  margin-top: 5px;
`;

export const ResultsStyled = styled('div')`
  color: #aeb0b7;
  padding: 0 ${toRem(10)} 0 ${toRem(30)};
  border-radius: 0 2px 2px 0;

  &.filter-inline {
    background: #fff;
  }

  span {
    vertical-align: middle;
    display: inline-block;
  }
`;
