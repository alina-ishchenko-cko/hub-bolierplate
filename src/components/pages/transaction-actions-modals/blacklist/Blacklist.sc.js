import styled from 'react-emotion';
import { colors, text } from 'styles/common.sc';
import { toEm, toRem } from 'utils/ui.util';

export const WrapStyled = styled('div')`
  width: 100%;

  .sub-text {
    color: ${colors.text.tertiary};
    margin-bottom: ${toRem(30)};
  }

  .label {
    font-size: ${toEm(text['12'])};
    color: ${colors.text.primary};
    font-weight: ${text.medium};

    .label-caption {
      display: block;
      color: ${colors.text.tertiary};
    }
  }
`;
