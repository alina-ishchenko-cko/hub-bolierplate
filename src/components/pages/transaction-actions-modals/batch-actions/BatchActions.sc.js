import { colors, text } from 'styles/common.sc';
import { toRem, toEm } from 'utils/ui.util';
import styled from 'react-emotion';

export const DividerStyled = styled('span')`
  width: 1px;
  height: 17px;
  opacity: 0.5;
  background-color: ${colors.borders};
  margin: 0 ${toRem(10)};
  display: inline-block;
  vertical-align: middle;
`;

export const ActionListStyled = styled('div')`
  ul {
    border: solid 1px #dfe1ea;
    border-radius: 3px;
    overflow: hidden;
    min-height: 150px;
    background-color: #f7f8fa;
  }

  li {
    border-top: solid 1px #dfe1ea;
    padding: ${toRem(17)};

    &:first-child {
      border-top: none;
    }

    .prod-id,
    .prod-info {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .prod-value,
    .prod-info {
      color: #464f60;
      font-size: ${toEm(text['14'])};
      display: inline-block;
      vertical-align: top;
      font-weight: ${text.medium};
    }

    .prod-info {
      width: 60%;
    }

    .prod-value {
      text-align: right;
      width: 40%;

      span {
        color: #adb0b8;
        font-size: 12px;
      }
    }

    .prod-id {
      display: block;
      color: #adb0b8;
      font-size: 1em;
      max-width: 95%;
    }
  }

  .sub-text {
    color: ${colors.text.tertiary};
    margin-bottom: ${toRem(30)};
  }
`;
