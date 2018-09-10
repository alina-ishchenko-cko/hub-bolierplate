import { clearfix } from 'styles/common.sc';
import styled from 'react-emotion';

export const ContainerStyled = styled('div')`
  ${clearfix};

  .currencies-wrap {
    width: 30%;
    float: left;
  }

  .amount-wrap {
    width: 70%;
    float: left;
  }
`;
