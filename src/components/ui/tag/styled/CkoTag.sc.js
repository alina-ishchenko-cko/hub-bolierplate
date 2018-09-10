import { toEm } from 'utils/ui.util';
import styled, { css } from 'react-emotion';

const getColor = (props, defaultColour) => {
  if (props.red) {
    return '#be4343';
  } else if (props.yellow) {
    return '#d67f1c';
  } else if (props.green) {
    return '#2f9378';
  }

  return defaultColour || '#464f60';
};

const theme = props => {
  if (props.plain) {
    return css`
      background-color: transparent;
      color: ${getColor(props, '#798395')};
      padding: 0;
      font-size: ${toEm(12)};
    `;
  }

  return css`
    color: ${getColor(props)};
    background-color: #f7f8fa;
    padding: 3px 10px 2px 10px;
    font-size: ${toEm(11)};
  `;
};

export const TagStyled = styled('span')`
  border-radius: 3px;
  font-family: 'Source Code Pro', monospace;
  text-transform: uppercase;
  display: inline-block;
  width: fit-content;
  font-weight: 600;
  margin: ${props => (props.margin ? '0 5px 10px 5px' : 0)};
  line-height: 1.5;
  ${theme};
`;
