import { clearfix } from 'styles/common.sc';
import styled from 'react-emotion';

export const CkoAddressStyled = styled('div')`
  ${clearfix};

  .col {
    display: block;
    clear: both;

    &.col-6 {
      float: left;
      width: 46.8%;
      display: block;
      clear: none;
    }

    &.col-left {
      margin-right: 20px;
    }
  }
`;
