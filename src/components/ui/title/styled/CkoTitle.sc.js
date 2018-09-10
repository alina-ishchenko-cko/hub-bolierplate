import { text, colors } from 'styles/common.sc';
import { toEm } from 'utils/ui.util';
import styled from 'react-emotion';

export const AppTitleStyled = styled('div')`
  font-size: ${props => (props.size ? toEm(text[props.size]) : 24)};
  font-weight: ${props => (props.size <= 15 ? 400 : 500)};
  display: inline-block;
  color: ${colors.text.primary};
`;
