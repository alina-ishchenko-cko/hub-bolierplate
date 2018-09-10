import { text, colors } from 'styles/common.sc';
import { toRem, toEm } from 'utils/ui.util';
import { FlexItem } from 'components/ui/flex/';
import styled from 'react-emotion';

export const StatusWrapStyled = styled(FlexItem)`
  padding: ${toRem(15)} ${toRem(40)};
  border-bottom: solid 1px ${colors.bg};
  user-select: none;
  cursor: ${({ isSingleLog }) => (isSingleLog ? 'default' : 'pointer')};

  .status-wrap {
    .info,
    .more-info {
      display: inline-block;
    }

    .info {
      vertical-align: middle;

      .text {
        margin-bottom: 10px;
        font-size: ${toEm(text['14'])};
        color: ${colors.text.secondary};
      }

      .date {
        font-size: ${toEm(text['13'])};
        color: ${colors.text.adiacent};
      }
    }

    .more-info {
      margin-left: 20px;
      vertical-align: top;
    }

    .cko-icon {
      margin-right: 20px;
      max-width: 18px;
    }
  }

  &.in-active {
    .status-wrap {
      .text {
        color: #798395;
      }
      svg {
        .dark-shade {
          fill: #8b94a9;
        }
        .light-shade {
          fill: #dfe2eb;
        }
      }
    }

    &:hover {
      .status-wrap {
        .text {
          color: ${colors.text.secondary};
        }
        .icon-success,
        .icon-captured-payment {
          .dark-shade {
            fill: #5dc5a8;
          }
          .light-shade {
            fill: #bceddf;
          }
        }
        .icon-refund {
          .dark-shade {
            fill: #4780ec;
          }
          .light-shade {
            fill: #d7e4fd;
          }
        }
        .icon-flag {
          .dark-shade {
            fill: #eaa002;
          }
          .light-shade {
            fill: #ffe7b5;
          }
        }
        .icon-fail {
          .dark-shade {
            fill: #e25252;
          }
          .light-shade {
            fill: #ffd2d2;
          }
        }
      }
    }
  }
`;
