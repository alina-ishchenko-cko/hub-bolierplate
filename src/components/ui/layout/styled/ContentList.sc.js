import { text, colors, ocrFont } from 'styles/common.sc';
import { toEm } from 'utils/ui.util';
import { FlexColumn, FlexRow, FlexItem } from 'components/ui/flex/';
import styled from 'react-emotion';

export const WrapStyled = styled(FlexColumn)`
  background-color: #ffffff;
  box-shadow: 0 1px 3px 0 rgba(121, 131, 149, 0.2);
  border-radius: 2px;
  margin-bottom: 10px;
`;

export const TitleStyled = styled(FlexRow)`
  position: relative;
  padding: 20px;
  color: #1e242e;
  font-size: ${toEm(text['15'])};
  box-shadow: 0 1px 3px 0 rgba(121, 131, 149, 0.2);
`;

export const ContentStyled = styled(FlexItem)`
  padding: 25px 30px;
  color: #464f60;

  label {
    color: ${colors.text.tertiary};
    font-size: ${toEm(text['13'])};
    margin-bottom: 10px;
    font-weight: 400;
  }

  p {
    font-size: ${toEm(text['14'])};
  }

  address {
    line-height: 1.5;
    font-style: normal;
  }

  .ocr-font {
    color: #464f60;
    ${ocrFont};
  }

  .cko-flag {
    border-radius: 3px;
    box-shadow: 0 2px 5px 0 rgba(121, 131, 149, 0.2);
    width: 17px;
    overflow: hidden;
    display: inline-block;
    margin-right: 5px;
  }

  .cko-scheme {
    width: 26px;
    margin-right: 5px;
  }

  .text-capitalize {
    text-transform: capitalize;
  }
`;

export const SubStyled = styled('span')`
  color: #adb0b8;
  font-size: 1em;
`;
