import styled from 'react-emotion';
import { toEm, toRem } from 'utils/ui.util';
import { colors, text, clearfix } from 'styles/common.sc';

export const CardWrapStyled = styled('div')`
  width: 100%;
  margin: 0;
  ${clearfix};

  & span {
    display: block;
  }

  .cko-switch {
    display: inline-block;
    float: right;
    margin-top: 0;
  }
`;

export const ValueWrapStyled = styled('p')`
  display: block;
  margin: 0;
  padding: 0;
  float: left;
  margin-bottom: 15px;
  word-break: break-all;

  & span {
    display: inline-block;
  }
`;

export const CardValueStyled = styled('span')`
  display: block;
  font-size: ${toEm(text['40'])};
  color: ${colors.link};
`;

export const CurrencyStyled = styled('span')`
  display: inline-block;
  margin-left: ${toRem(5)};
  font-size: ${toEm(text['16'])};
  color: ${colors.text.tertiary};
`;

export const TitleStyled = styled('p')`
  font-size: ${toEm(text['14'])};
  color: ${colors.successTxt};
`;

export const SubTitleStyled = styled('p')`
  font-size: ${toEm(text['12'])};
  color: ${colors.text.adiacent};
  margin-top: 5px;
`;
