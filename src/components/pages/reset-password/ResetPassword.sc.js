import { colors, text } from 'styles/common.sc';
import { toEm } from 'utils/ui.util';
import styled from 'react-emotion';
import { Title } from 'components/ui/layout/styled/CkoSignInLayout.sc';

export { Title };

export const ListStyled = styled('div')`
  p {
    font-size: ${toEm(text['15'])};
    color: ${colors.text.primary};
    margin-bottom: 30px;
    text-align: left;
  }

  ul {
    text-align: left;
  }

  li {
    color: ${colors.text.tertiary};
    margin-bottom: 10px;
    font-size: ${toEm(text['13'])};
    transition: all 0.3s;

    svg * {
      fill: ${colors.text.tertiary};
    }

    .cko-icon {
      margin-right: 16px;
    }

    &.passed {
      color: ${colors.greenBg};
      svg * {
        fill: ${colors.greenBg};
      }
    }
  }
`;
