import { text, colors, clearfix } from 'styles/common.sc';
import { toEm, toRem } from 'utils/ui.util';
import styled from 'react-emotion';

export const ContainerStyled = styled('div')`
  ul {
    display: inline-block;
    text-align: center;
    ${clearfix};
  }
  li {
    padding-top: 1px;
    box-shadow: none;
    line-height: 26px;
    cursor: pointer;
    user-select: none;
    text-align: center;
    list-style: none;
    outline: 0;
    display: block;
    vertical-align: middle;
    border-radius: 3px;
    background: transparent;
    font-size: ${toEm(text['13'])};
    color: ${colors.text.tertiary};
    float: left;

    .icon-right-arrow *,
    .icon-left-arrow * {
      fill: ${colors.text.tertiary};
    }

    &.pagination-item {
      width: 26px;
      height: 26px;
    }

    &:hover {
      background: rgb(247, 248, 250);
      color: ${colors.text.secondary};
      background: ${colors.bg};

      .icon-right-arrow *,
      .icon-left-arrow * {
        fill: ${colors.text.secondary};
      }
    }

    &.pagination-item-active {
      color: rgb(255, 255, 255);
      box-shadow: rgba(58, 128, 232, 0.45) 0px 1px 3px 0px;
      background: linear-gradient(to top, rgb(65, 121, 228), rgb(71, 128, 236));
    }

    &.pagination-prev,
    &.pagination-next {
      padding: 0 ${toRem(10)};
    }

    &.pagination-prev {
      margin-right: ${toRem(25)};
    }

    &.pagination-next {
      margin-left: ${toRem(25)};
    }

    &.pagination-disabled {
      opacity: 0.4;
      cursor: default;
    }
  }
`;
