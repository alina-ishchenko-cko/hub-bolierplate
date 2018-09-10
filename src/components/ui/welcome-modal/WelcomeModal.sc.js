import styled, { keyframes } from 'react-emotion';
import { colors, text } from 'styles/common.sc';
import { toEm } from 'utils/ui.util';

const fadeIn = keyframes`
	from { opacity:0; } 
	to { opacity:1; }
`;

const fadeOut = keyframes`
	from { opacity:1; } 
	to { opacity:0; }
`;

/*

animation-delay: 2s;

*/
export const WrapStyled = styled('div')`
  position: fixed;
  background: #f7f8fa;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 88888;
  text-align: center;

  .cko-flex-column {
    width: 100%;
    height: 100%;
  }

  .update-wrap {
    position: relative;
    width: 300px;
    margin-bottom: 20px;
    text-align: center;
  }

  .main-title {
    color: ${colors.link};
    font-size: ${toEm(text['40'])};
    margin-bottom: 10px;
  }

  .sub-title {
    font-size: ${toEm(text['18'])};
    color: ${colors.text.tertiary};
    animation: ${fadeOut} ease-out 0.3s;
    animation-fill-mode: forwards;
    animation-delay: 5s;
  }

  .update-info {
    opacity: 0;
    opacity: 1 \9;
    animation: ${fadeIn} ease-in 0.3s;
    animation-fill-mode: forwards;
    margin-top: -18px;
    animation-delay: 5s;
  }

  .fade-in {
    opacity: 0;
    opacity: 1 \9;
    animation: ${fadeIn} ease-in;
    animation-fill-mode: forwards;
    animation-duration: 0.5s;
  }
`;
