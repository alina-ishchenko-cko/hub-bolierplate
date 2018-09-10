import { clearfix } from 'styles/common.sc';
//import { toRem, toEm } from 'utils/ui.util';
import styled from 'react-emotion';

export const FilterWrapStyled = styled('div')`
  width: 100%;
  height: auto;
  position: relative;
  line-height: 1;
  ${clearfix};
`;

export const AddFilterStyled = styled('button')`
  width: 32px;
  height: 32px;
  border-radius: 2px;
  background-color: #2eaa88;
  box-shadow: 0 1px 3px 0 rgba(30, 36, 46, 0.15);
  border: none;
  margin: 10px 0 0 20px;
  position: relative;
  cursor: pointer;

  &:focus {
    outline: none;
  }

  &:before {
    content: ' ';
    width: 1px;
    background: #9098ac;
    height: 10px;
    top: -10px;
    left: 50%;
    position: absolute;
  }

  span {
    width: 100%;
    height: 100%;
    position: relative;
    display: block;

    &:after,
    &:before {
      content: ' ';
      border-radius: 2px;
      background: #fff;
      position: absolute;
    }

    &:before {
      top: 10px;
      left: 15px;
      width: 2px;
      height: 12px;
    }

    &:after {
      top: 15px;
      left: 10px;
      width: 12px;
      height: 2px;
    }
  }
`;
