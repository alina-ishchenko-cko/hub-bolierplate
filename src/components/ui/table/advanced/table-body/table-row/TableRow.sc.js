import { colors, clearfix } from 'styles/common.sc';
import styled from 'react-emotion';

export const TrStyled = styled('div')`
  padding: 0 20px;
  border: none;
  margin: 0;
  line-height: 50px;
  background-color: transparent;
  position: relative;
  border-radius: 3px;
  cursor: pointer;
  display: block;
  width: 100%;
  ${clearfix};

  &:hover,
  &.show-checkbox {
    background-color: ${colors.bg};

    .td-tag {
      background: #fff;
    }

    .ant-dropdown-trigger {
      border-color: ${colors.borders};
      box-shadow: 0 1px 3px 0 rgba(121, 131, 149, 0.15);
    }

    .trans-details {
      .value-wrap {
        margin-right: 10px;
      }
    }
    .checkbox-wrap {
      left: 0;
    }
  }

  &:hover {
    /* Show Inline Filter Btn */
    .td-filter-btn {
      display: inline-block;
    }
  }

  &:before {
    content: '';
    background: #f7f8fa;
    position: absolute;
    width: 20px;
    top: 0;
    left: -14px;
    height: 100%;
    z-index: 1;
    border-left: solid 4px #4780ec;
    border-radius: 3px 0px 0px 3px;
    display: none;
  }

  /* Active Row */
  &.active-row {
    background: #f7f8fa;

    &:before {
      display: block;
    }

    .cko-flex-item {
      color: #1e242e;

      &.trans-details {
        .cko-currency-format {
          color: #366bcf;
        }
        .currency {
          color: #1e242e;
        }
      }
    }

    .td-tag {
      background: #fff;
    }

    .tag-wrap {
      span:first-child {
        color: #1e242e;
      }
    }
  }

  &.active-row,
  &.hide-checkbox {
    &:hover {
      .trans-details {
        .value-wrap {
          margin-right: 30px;
        }
      }
      .checkbox-wrap {
        left: -22px;
      }
    }
  }
`;
