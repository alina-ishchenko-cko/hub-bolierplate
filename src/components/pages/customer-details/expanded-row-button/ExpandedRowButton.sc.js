import styled from 'react-emotion';
import { colors } from 'styles/common.sc';

export const ExpandedRowButtonStyled = styled('div')`
  .close {
    color: ${colors.link};
    margin-right: 10px;
    visibility: ${props => (props.isRowExpanded ? 'visible' : 'hidden')};
  }

  & i {
    font-style: normal;
    color: ${colors.text.tertiary};

    &:before {
      font-family: Flaticon;
      content: ${props => (props.isRowExpanded ? "'\f103'" : "'\f104'")};
    }
  }
`;
