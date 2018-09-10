import { text, colors } from 'styles/common.sc';
import styled from 'react-emotion';

export const ContainerStyled = styled('div')`
  label {
    display: block;
    color: ${colors.text.primary};
    font-weight: ${text.medium};
    margin-bottom: 10px;
  }
`;
