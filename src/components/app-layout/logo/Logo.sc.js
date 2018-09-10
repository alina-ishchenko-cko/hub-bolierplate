import { toRem } from 'utils/ui.util';
import styled from 'react-emotion';

export const Logo = styled('div')`
  text-align: center;
  width: 100%;
  margin-top: ${toRem(7)};
  margin-bottom: ${toRem(20)};

  .cko-icon {
    width: 35px;
  }
`;
