import { text } from 'styles/common.sc';
import { toEm } from 'utils/ui.util';
import styled from 'react-emotion';

export const FieldsWrapStyled = styled('div')`
  h3 {
    position: relative;
    margin: 30px -40px;
    padding: 0 0 0 40px;
    color: #1e242e;
    font-size: ${toEm(text['15'])};

    span {
      background: #fff;
      position: relative;
      padding: 0 30px 0 20px;
      margin-left: -20px;
    }

    &:before {
      content: ' ';
      height: 1px;
      background: #dfe1ea;
      position: absolute;
      top: 50%;
      width: 100%;
      left: 0;
    }
  }
`;

export const MoreStyled = styled('span')`
  display: inline-block;
  color: #366bcf;
  font-size: 1em;
  margin-top: 5px;
  cursor: pointer;
  user-select: none;

  .flaticon-up-chevron,
  .flaticon-down-chevron {
    margin-right: 10px;

    &:before {
      font-size: 10px;
    }
  }
`;

export const ContainerStyled = styled('div')`
  label {
    display: block;
    color: #1e242e;
    font-weight: ${text.medium};
    margin-bottom: 10px;
  }
`;
