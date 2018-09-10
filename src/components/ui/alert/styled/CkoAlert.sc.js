import { text } from 'styles/common.sc';
import { toEm, toRem } from 'utils/ui.util';
import styled from 'react-emotion';

// Button Styled Component
export const AlertStyled = styled('div')`
  width: 100%;
  color: #fff;
  text-align: left;
  padding: ${toRem(10)};
  font-size: ${toEm(text['12'])};
  background-color: #cf5858;
  border-radius: 3px;
  box-shadow: 0 2px 5px 0 rgba(207, 88, 88, 0.45);

  .ant-alert {
    width: 100%;
    height: 100%;
  }

  .ant-alert-message,
  .ant-alert-description {
    display: block;
  }

  .ant-alert-message {
    font-size: ${toEm(text['14'])};
  }
`;
