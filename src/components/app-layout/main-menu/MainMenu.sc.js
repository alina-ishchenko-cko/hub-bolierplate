import { text, general, colors } from 'styles/common.sc';
import { toEm, toRem } from 'utils/ui.util';
import styled from 'react-emotion';

export const MenuStyled = styled('div')`
  border: none;
  background: transparent;
  position: relative;

  & .overlay {
    position: absolute;
    background: transparent;
    width: 100%;
    height: 100%;
    z-index: 1;
  }

  & .menu-list {
    margin: 0;
    padding: 0;

    &.disable {
      opacity: 0.3;
    }
  }

  & .menu-item {
    margin: 0;
    height: 46px;
    line-height: 46px;
    color: ${colors.text.tertiary};

    .cko-icon {
      max-width: 18px;
      max-height: 16px;
    }
  }

  & .menu-item a {
    font-weight: 400;
    color: ${colors.text.tertiary};
    display: inline-block;
  }

  & .menu-item.active-menu a,
  & .menu-item a:hover,
  & .menu-item:hover {
    color: ${colors.sideLink};
  }

  & .menu-item.active-menu {
    & .cko-icon svg .dark {
      fill: #5b91e3;
    }

    & .cko-icon svg .light {
      fill: #a1c6ff;
    }
  }

  & .menu-item:hover {
    & .cko-icon svg .dark {
      fill: #464f60;
    }

    & .cko-icon svg .light {
      fill: #b2b8c6;
    }
  }

  & .menu-item span {
    vertical-align: middle;
    font-size: ${toEm(text['14'])};
  }

  & .menu-item .cko-icon {
    font-size: ${toEm(16.5)};
  }

  & .logout {
    cursor: pointer;
  }

  & .side-info {
    margin-top: ${toRem(general.gutter)};
    margin-bottom: ${toRem(10)};
    padding: 0 0 0 ${toRem(general.gutter)};
    font-weight: 500;
    text-overflow: ellipsis;

    p {
      width: 100%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    & .title {
      font-size: ${toEm(text['10'])};
      text-transform: uppercase;
      color: ${colors.text.adiacent};
    }

    & .username {
      font-size: ${toEm(text['14'])};
      color: ${colors.text.secondary};
    }
  }
`;
