import styled from 'react-emotion';
import { colors, text } from 'styles/common.sc';
import { toEm } from 'utils/ui.util';

export const WrapStyled = styled('div')`
  width: 100%;

  .cko-currency-format {
    font-size: ${toEm(text['18'])};
    font-weight: ${text.medium};
    color: ${colors.text.secondary};

    .suffix {
      font-size: 12px;
      color: ${colors.text.adiacent};
      margin-left: 5px;
    }
  }
`;
