import { clearfix } from 'styles/common.sc';
import { toRem } from 'utils/ui.util';
import styled from 'react-emotion';

export const AppHeaderStyled = styled('header')`
  height: 86px;
  background: #f7f8fa;
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  left: inherit;
  z-index: 9;

  &:before,
  &:after {
    content: ' ';
    position: absolute;
    top: 0;
    width: 5px;
    height: 100%;
    background: #f7f8fa;
  }

  &:before {
    left: -5px;
  }

  &:after {
    right: -5px;
  }

  .btm-border {
    position: absolute;
    bottom: -2px;
    left: -10px;
    height: 5px;
    width: calc(100% + 20px);
    opacity: 0;
    transition: opacity 0.3s;
    z-index: 1;
  }

  &.show-border {
    .btm-border {
      opacity: 1;
    }
  }
`;

export const DatePickerStyled = styled('div')`
  position: relative;
  background: #fff;
  padding: 0 ${toRem(5)};
  height: 42px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 3px;
  box-shadow: 0px 2px 5px 0px rgba(121, 131, 149, 0.2);
  ${clearfix};

  & .date-range {
    margin-right: ${toRem(10)};
  }
`;
