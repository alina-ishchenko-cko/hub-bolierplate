import { colors } from 'styles/common.sc';
import { toRem } from 'utils/ui.util';
import styled, { keyframes } from 'react-emotion';

const fadeScroll = keyframes`
	50% {
		opacity: .2;
		-webkit-transform: scale(.75);
		transform: scale(.75);
	}

	100% {
		opacity: 1;
		-webkit-transform: scale(1);
		transform: scale(1);
	}
`;

const spinAnimation = keyframes`
	from { transform: rotate(0); }
	to { transform: rotate(360deg); }
`;

export const DotsLoaderStyled = styled('div')`
  width: 100%;
  margin: 5% auto;

  & .dots {
    width: 100%;

    & > div {
      background-color: ${colors.text.adiacent};
      border-radius: 100%;
      width: ${({ size }) => (size === 'small' ? '8px' : '12px')};
      height: ${({ size }) => (size === 'small' ? '8px' : '12px')};
      margin: 2px;
      display: inline-block;
      -webkit-animation: ${fadeScroll} 0.7s 0s infinite linear;
      animation: ${fadeScroll} 0.7s 0s infinite linear;
    }

    & > div:nth-child(2n-1) {
      -webkit-animation-delay: -0.35s;
      animation-delay: -0.35s;
    }
  }
`;

export const LoadingWrapStyled = styled('div')`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(
    255,
    255,
    255,
    ${props => (props.opacity ? props.opacity : '0.65')}
  );
  z-index: 8;
  cursor: default;
  text-align: center;
`;

export const InfoLoaderStyled = styled('div')`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
  transition: all 0.3s ease-in-out;

  &.show-spin {
    opacity: 1;
    z-index: 1;
  }

  &.show-spin.hide-spin {
    opacity: 0;
    z-index: -1;
  }

  .loader-inner {
    max-width: 300px;
    width: 80%;
    border-radius: 3px;
    background: #fff;
    padding: ${toRem(40)} 0;
    color: #5d6574;
    margin: 0 auto;
    box-shadow: 0 2px 5px 0 rgba(121, 131, 149, 0.3);
  }

  .spinner {
    margin-bottom: ${toRem(20)};
  }
`;

export const SpinLoader = styled('div')`
  width: 16px;
  height: 16px;
  border: #4e80e0 2px solid;
  border-top: transparent 2px solid;
  border-radius: 30px;
  animation: ${spinAnimation} 0.8s infinite linear;
  margin: 0 auto;
`;

/* Safari */
