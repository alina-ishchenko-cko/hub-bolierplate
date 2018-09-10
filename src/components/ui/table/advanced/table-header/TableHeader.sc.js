import { text, colors, clearfix } from 'styles/common.sc';
import { toEm } from 'utils/ui.util';
import styled from 'react-emotion';

export const TableHeaderStyled = styled('div')`
  width: 100%;
  height: 36px;
  line-height: 36px;
  position: relative;
  z-index: 1;
  background: #fff;
  box-shadow: 0 1px 3px 0 rgba(121, 131, 149, 0.2);

  &:before {
    content: ' ';
    position: absolute;
    background: #fff;
    width: 100%;
    height: 2px;
    top: -2px;
    left: 0;
    z-index: 1;
  }
`;

export const ThRowStyled = styled('div')`
  width: 100%;
  display: block;
  padding: 0 30px;
  margin: 0;
  ${clearfix};
  height: 36px;
  overflow: hidden;
`;
/**
 * Table data style
 */
export const ThStyled = styled('div')`
  width: ${({ width }) => width};
  max-width: ${({ width }) => width};
  /* overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap; */
  height: 36px;
  line-height: 36px;
  z-index: 1;
  text-align: ${props => props.align || 'left'};
  padding: 0;
  color: ${colors.text.primary};
  font-size: ${toEm(text['12'])};
  font-weight: ${text.medium};
  position: relative;
  /* word-break: break-word; */
  float: left;

  .th-value {
    display: inline-block;
    max-width: calc(100% - 32px);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: middle;
  }

  .checkbox-header {
    width: 100%;
    position: absolute;
    vertical-align: middle;
    line-height: 36px;
    text-align: left;
    display: inline-block;
    background: #fff;
    overflow: hidden;

    .ant-checkbox-wrapper + span,
    .ant-checkbox + span {
      padding-left: 9px;
      padding-right: 0;
      position: relative;
      top: -1px;
      color: #366bcf;
    }

    &.show-checkbox-header {
      top: 0px;
      opacity: 1;
      z-index: 8;
    }
  }

  &:hover,
  &.show-sort {
    .th-sort {
      opacity: 1;
    }
  }
`;

/**
 * Checkbox style
 */
export const CheckBoxWrapStyled = styled('div')`
  position: absolute;
  top: -36px;
  left: 0;
  opacity: 0;
  width: 30px;
  overflow: hidden;
  z-index: 1;
  transition: all 0.2s;

  /* .tip-container > div {
    width: 200px !important;
  } */
`;

/**
 * Th Sort
 */
export const SortStyled = styled('span')`
  display: inline-block;
  padding: 0 10px;
  opacity: 0;
  cursor: pointer;
  transition: all 0.3s;

  &:before {
    content: ' ';
    width: 100%;
    height: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    background: transparent;
    z-index: 3;
  }

  &.active-sort {
    opacity: 1;
  }

  svg * {
    fill: #acb2bf;
  }

  &.desc {
    .cls-1 {
      fill: #366bcf;
    }
  }

  &.asc {
    .cls-2 {
      fill: #366bcf;
    }
  }
`;
