import { colors } from 'styles/common.sc';
import { toRem } from 'utils/ui.util';
import styled from 'react-emotion';

export const DividerStyled = styled('span')`
  width: 1px;
  height: 17px;
  opacity: 0.5;
  background-color: ${colors.borders};
  margin: 0 ${toRem(10)};
  display: inline-block;
  vertical-align: middle;
`;
