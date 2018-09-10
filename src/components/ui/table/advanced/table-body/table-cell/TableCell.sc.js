import { text, colors } from 'styles/common.sc';
import { toEm } from 'utils/ui.util';
import styled from 'react-emotion';

export const TdStyled = styled('div')`
  padding: 0;
  border: none;
  line-height: 50px;
  color: ${colors.text.tertiary};
  font-size: ${toEm(text['13'])};
  position: relative;
  width: ${({ width }) => width};
  max-width: ${({ width }) => width};
  float: left;

  & > div {
    width: 100%;
    display: inline-block;
    vertical-align: middle;
  }

  .td-with-checkbox {
    overflow: hidden;
    display: block;
    width: 100%;
    position: relative;
  }

  /* Transaction details */
  &.trans-details {
    overflow: hidden;
    text-overflow: clip;

    .details-wrap {
      display: inline-block;
      vertical-align: middle;
      text-align: right;
      margin: 0;
      padding: 0;
      width: 100%;
    }

    .cardNum,
    .value-wrap {
      display: inline-block;
    }

    .value-wrap {
      transition: margin-right 0.2s ease-in-out;
      margin-right: 30px;
    }

    .cardNum {
      width: 66px;
      padding: 0;
      text-align: left;
      margin-right: 50px;

      .cko-icon {
        width: 26px;
        height: 16px;
        background: #eee;
      }
    }

    .cko-currency-format {
      display: inline-block;
      font-weight: ${text.medium};
      color: ${colors.text.primary};
    }

    .currency {
      width: 25px;
      display: inline-block;
      margin-left: 5px;
      white-space: nowrap;
    }
  }
`;
