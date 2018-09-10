import styled from 'react-emotion';
import { toEm } from 'utils/ui.util';
import { text, colors } from 'styles/common.sc';

export const ImgWrapStyled = styled('div')`
  width: 60px;
  height: 60px;
  background-color: #ffffff;
  box-shadow: 0 1px 3px 0 rgba(121, 131, 149, 0.15);
  border: solid 1px ${colors.borders};
  margin-right: 14px;
  white-space: nowrap;

  &:before {
    content: '';
    display: inline-block;
    height: 100%;
    vertical-align: middle;
  }
`;

export const TitleStyled = styled('span')`
  color: ${colors.text.secondary};
  font-size: ${toEm(text['14'])};
`;

export const LabelStyled = styled('span')`
  color: ${colors.text.tertiary};
  font-size: ${toEm(text['13'])};
`;

export const ValueStyled = styled('span')`
  color: ${colors.text.secondary};
  font-size: ${toEm(text['13'])};
`;
