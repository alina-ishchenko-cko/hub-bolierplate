import styled from 'react-emotion';

export const AppSidebarStyled = styled('aside')`
  background: transparent;
  height: 100vh;
  position: fixed;
  z-index: 9;

  & .inner-sider {
    width: 100%;
    height: 100%;
    position: relative;
  }

  .collapse-btn {
    border: none;
    width: 90%;
    display: none;
    margin: 30px auto;
    border-radius: 3px;
    line-height: 30px;
    background: rgba(186, 192, 206, 0.25);
  }

  /* Small screens ----------- */
  @media only screen and (max-width: 1700px) {
    .open-trigger {
      display: block;
    }
  }

  /* Large screens ----------- */
  @media only screen and (min-width: 1700px) {
    .close-trigger {
      display: block;
    }
  }
`;
