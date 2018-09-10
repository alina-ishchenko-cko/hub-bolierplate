import { colors, animation } from 'styles/common.sc';
import styled from 'react-emotion';

const shade1 = '#8b94a9';
const shade2 = '#bac0ce';
const shade3 = '#8b94a9';

export const AppIconStyled = styled('span')`
  display: inline-block;
  vertical-align: middle;
  text-align: center;
  text-transform: none;
  line-height: 1px;
  width: ${props => (props.width > 0 ? `${props.width}px` : 'auto')};
  border-radius: 3px;

  &.placeholder {
    background-color: #dfe1ea;
  }

  svg {
    width: auto !important;
    height: auto !important;
    max-width: 100%;
  }

  .white {
    fill: #fff;
  }

  .dark {
    fill: ${shade3};
  }
  .light {
    fill: ${shade2};
  }

  .dark,
  .light,
  .dark,
  .grey {
    ${animation.ease};
  }

  & .icon-sidebar-transactions,
  & .icon-sidebar-dashboard {
    .dark {
      fill: ${shade1};
    }
    .light {
      fill: ${shade2};
    }
  }

  /* Plans */
  & .icon-sidebar-plans {
    .grey {
      fill: #fff;
    }
  }

  .icon-calendar * {
    fill: ${colors.icons};
  }

  .icon-right-arrow *,
  .icon-left-arrow *,
  .icon-down-arrow * {
    fill: #abb3c4;
  }

  .icon-paypal-full * {
    fill: #2464b4;
  }
`;
