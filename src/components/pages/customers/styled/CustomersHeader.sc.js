import styled from 'react-emotion';
import { colors } from 'styles/common.sc';
import { toEm } from 'utils/ui.util';

export const CustomerHeaderCellStyled = styled('div')`
  .title {
    margin-right: 5px;
  }

  .currency {
    font-size: ${props => toEm(12)};
    color: ${colors.text.tertiary};
  }
`;
