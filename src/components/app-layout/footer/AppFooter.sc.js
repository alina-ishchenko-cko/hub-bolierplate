import { text, general, colors } from 'styles/common.sc';
import { toEm, toRem } from 'utils/ui.util';
import styled from 'react-emotion';

export const SideFooterStyled = styled('div')`
  padding: 0;
  margin-top: 30px;
  width: 100%;
`;

export const FooterLinkStyled = styled('div')`
  display: inline-block;
  vertical-align: middle;
  margin-left: ${toRem(general.gutter)};
  padding-bottom: 2px;
  margin-bottom: 1px;

  & a {
    font-size: ${toEm(text['12'])};
    display: block;
    color: ${colors.text.adiacent};
    margin: 0;
    padding: 0;
  }
`;
