import styled from 'react-emotion';
import { toEm } from 'utils/ui.util';
import { text } from 'styles/common.sc';

export const DropdownStyled = styled('div')`
  .cko-dropdown-wrap {
    .icon-prefix {
      margin-right: 10px;
    }

    .icon-suffix {
      margin-left: 10px;
    }

    .list-title {
      padding: 0 20px;
      color: #a9aab0;
      text-transform: uppercase;
      font-size: ${toEm(text['10'])};
    }
  }
`;
