import { text, colors } from 'styles/common.sc';
import { toRem, toEm } from 'utils/ui.util';
import { FlexRow } from 'components/ui/flex/';
import styled from 'react-emotion';

export const AmountWrapStyled = styled(FlexRow)`
  padding: ${toRem(30)};
  border-bottom: solid 1px ${colors.bg};

  .amount-info {
    line-height: 1;
    span {
      display: inline-block;
    }

    .value {
      color: ${colors.link};
      font-size: ${toEm(46)};
    }

    .currency {
      margin-left: 10px;
      font-size: ${toEm(text['16'])};
      color: ${colors.text.tertiary};
    }
  }

  .actions {
    text-align: right;

    .cko-button[value='Void'],
    .cko-button[value='Refund'] {
      margin-right: 10px;
    }
  }
`;

export const DividerStyled = styled('span')`
  width: 1px;
  height: 17px;
  opacity: 0.5;
  background-color: ${colors.borders};
  margin: 0 ${toRem(20)};
  display: inline-block;
  vertical-align: middle;
`;

export const LogsWrapStyled = styled('div')`
  width: 100%;
  height: auto;
  position: relative;
  max-height: ${props => (props.showLogs ? '100%' : '136px')};

  .show-more {
    position: ${props => (props.showLogs ? 'relative' : 'absolute')};
    bottom: 0;
    left: 0;
    width: 100%;
    height: auto;
    padding: 20px 40px 20px 78px;
    background: linear-gradient(
      to top,
      rgb(255, 255, 255),
      rgba(255, 255, 255, 0.72)
    );

    .more-btn {
      color: ${colors.link};

      cursor: pointer;

      svg * {
        fill: ${colors.icons};
      }
    }
  }
`;
