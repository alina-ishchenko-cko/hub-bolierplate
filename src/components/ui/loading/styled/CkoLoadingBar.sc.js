import { colors } from 'styles/common.sc';
import styled from 'react-emotion';

export const LoaderWrapStyled = styled('div')`
  width: 100%;
  height: 2px;
  display: block;
  position: absolute;
  bottom: -2px;

  > div {
    width: 100%;
    height: 100%;
  }

  .loading-bar {
    background: ${colors.buttonBg};
    height: 2px;
    position: absolute;

    &:after {
      content: ' ';
      display: block;
      position: absolute;
      right: 0px;
      width: 100px;
      height: 100%;
      box-shadow: 0 0 10px #4e80e0, 0 0 5px #4e80e0;
      opacity: 1;
      transform: rotate(2deg) translate(0px, -2px);
    }
  }
`;
