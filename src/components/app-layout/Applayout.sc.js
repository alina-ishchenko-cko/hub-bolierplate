import { general, fluidFixedWidth, SMALL_VIEW } from 'styles/common.sc.js';
import { toRem } from 'utils/ui.util';
import styled, { css } from 'react-emotion';

const collapseSidebar = css`
  width: 70px;
  padding-left: 15px;
  padding-right: 15px;

  .inner-sider {
    overflow: inherit;
  }

  .menu-item {
    padding: 0;
    position: relative;
    text-align: center;

    .menu-title {
      display: none;
      position: absolute;
      top: 13px;
      width: auto;
      background: rgba(0, 0, 0, 0.75);
      padding: 0 8px;
      border-radius: 5px;
      line-height: 24px;
      color: white;
      min-width: 65px;
      left: 38px;

      &:before {
        content: ' ';
        display: block;
        position: absolute;
        top: 6.5px;
        left: -10px;
        margin-left: 0;
        width: 0;
        border-top: 5px solid transparent;
        height: 0;
        border-bottom: 5px solid transparent;
        border-right: 5px solid rgba(0, 0, 0, 0.75);
        border-left: 5px solid transparent;
      }
    }

    &:hover {
      .menu-title {
        display: inline-block;
      }
    }

    .cko-icon {
      margin: 0;
    }
  }

  .side-info,
  .menu-footer {
    display: none;
  }

  .selected-business {
    height: 35px;
    line-height: 40px;
    display: block;
    padding: 0;
    text-align: center;

    .parent-title,
    .child-title {
      display: none;
    }

    i {
      top: 0;
      text-align: center;
      right: 40%;
      font-size: 10px;
      font-weight: bold;
    }
  }
`;

const expandSideBar = css`
  width: 270px;
  padding: 25px 20px;
  margin-left: 20px;

  .inner-sider {
    overflow: auto;
  }

  .menu-item {
    padding: 0 0 0 30px;
    text-align: left;

    .menu-title {
      display: inline-block;
      position: relative;
      top: auto;
      width: auto;
      background: transparent;
      padding: 0;
      border-radius: 0px;
      line-height: inherit;
      color: inherit;

      min-width: 65px;
      left: auto;
      &:before {
        display: none;
      }
    }

    .cko-icon {
      margin-right: ${toRem(general.gutter)};
    }
  }

  .side-info,
  .menu-footer {
    display: block;
  }

  .selected-business {
    height: auto;
    line-height: inherit;
    display: block;
    padding: 14px 20px;
    text-align: left;

    .parent-title,
    .child-title {
      display: block;
    }

    i {
      top: 25px;
      right: 20px;
      font-size: 13px;
      font-weight: normal;
    }
  }
`;

const contentAreaDefault = css`
  width: calc(100vw - 270px);
  margin: 0 20px 0 290px;
  padding: 86px 20px 25px 20px;
`;

const contentAreaSmall = css`
  width: calc(100vw - 90px);
  margin-left: 90px;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: 20px;
`;

export const AppContainerStyled = styled('div')`
  background: transparent;
  width: 100%;
  height: 100%;
  padding: 0;
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  justify-content: flex-start;
  align-items: stretch;
  max-width: 1920px;
  margin: 0 auto;

  .fix-wrap-width {
    ${fluidFixedWidth()};
  }

  #app-content {
    transition: width 300ms;
    ${contentAreaDefault};
  }

  #sidebar {
    transition: width 200ms;
    ${expandSideBar};
  }

  &.show-menu {
    #sidebar {
      ${expandSideBar};
    }
    #app-content {
      ${contentAreaDefault};
    }
    .fix-wrap-width {
      ${fluidFixedWidth()};
    }
  }

  &.hide-menu {
    #sidebar {
      ${collapseSidebar};
    }
    #app-content {
      ${contentAreaSmall};
    }
    .fix-wrap-width {
      ${fluidFixedWidth({
        collapsed: true,
      })};
    }
  }

  /* Small Screens */
  @media (max-width: ${SMALL_VIEW}) {
    #sidebar {
      ${collapseSidebar};
    }
    #app-content {
      ${contentAreaSmall};
    }
    .fix-wrap-width {
      ${fluidFixedWidth({
        collapsed: true,
      })};
    }
  }
`;

export const ContentStyled = styled('section')`
  height: 100%;
  position: relative;

  .scroll-ref {
    display: block;
    height: 0px;
    background: transparent;
    opacity: 0;
  }
`;

export const ContentWrapStyled = styled('div')`
  width: 100%;
  height: 100%;
`;
