import { text, colors } from 'styles/common.sc';
import { toEm, toRem } from 'utils/ui.util';
import styled from 'react-emotion';

export const RangeWrapStyled = styled('div')`
  cursor: pointer;

  & .calendarWrap {
    position: absolute;
    right: 0;
    top: 55px;
    background-color: #ffffff;
    box-shadow: 0px 4px 10px 0px rgba(142, 152, 168, 0.25);
    width: 720px;
    height: 344px;
    border-top: solid 3px ${colors.primary};
    display: none;
    z-index: 888;
    border-radius: 3px;
  }

  & .calendarWrap:before {
    content: ' ';
    position: absolute;
    bottom: 100%;
    right: 18%;
    margin-left: -8px;
    width: 0;
    height: 0;
    border-bottom: 8px solid ${colors.primary};
    border-right: 8px solid transparent;
    border-left: 8px solid transparent;
  }

  & .calendarWrap > div {
    height: 100%;
  }

  & .calendarWrap > div > div {
    position: relative;
    width: 100%;
    height: 100%;
    padding: ${toRem(30)};
  }
`;

export const PlaceHolderStyled = styled('div')`
  display: inline-block;
  background: transparent;
  line-height: 32px;
  height: 32px;
  vertical-align: middle;
  border-radius: 3px;
  padding: 0 ${toRem(18)} 0 ${toRem(10)};

  & .cko-icon {
    font-size: ${toEm(4)};
    margin-right: ${toRem(10)};
    color: ${colors.icons};
  }

  & span {
    display: inline-block;
    vertical-align: middle;
  }

  & .label {
    font-size: ${toEm(text['14'])};
    color: ${colors.text.secondary};
    font-weight: 400;
    margin-right: ${toRem(25)};
  }

  & .selected-date {
    font-size: ${toEm(text['13'])};
    color: ${colors.text.tertiary};

    .cko-icon {
      margin-top: -3px;
      margin-right: ${toRem(15)};
      margin-left: ${toRem(15)};

      & * {
        fill: ${colors.text.tertiary};
      }
    }
  }

  &:hover {
    background: ${colors.bg};

    .label,
    .selected-date {
      color: ${colors.text.secondary};
    }

    .cko-icon * {
      fill: ${colors.text.tertiary};
    }
  }

  &.calendar-active {
    background: ${colors.bg};

    & .label {
      color: ${colors.link};
    }
    & .icon-calendar * {
      fill: ${colors.link};
    }
  }
`;
