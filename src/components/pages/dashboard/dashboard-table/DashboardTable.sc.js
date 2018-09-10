import { text, colors } from 'styles/common.sc';
import { toRem, toEm } from 'utils/ui.util';
import styled from 'react-emotion';

export const IconWrapStyled = styled('span')`
  .cko-icon {
    border-radius: 3px;
    background-color: #fafafa;
    overflow: hidden;
    box-shadow: 0 2px 5px 0 rgba(121, 131, 149, 0.2);
    height: ${props => (props.isCurrencies ? '20px' : '22px')};
    width: ${props => (props.isCurrencies ? '28px' : '36px')} !important;
  }
`;

export const TabStyled = styled('div')`
  & .tableTab {
    font-size: ${toEm(text['15'])};
    margin-right: ${toRem(20)};
    color: ${colors.text.tertiary};
  }

  & .tableTab:hover,
  & .tableTab.active {
    color: ${colors.link};
  }
`;
