import { text, colors } from 'styles/common.sc';
import { toEm, toRem } from 'utils/ui.util';
import styled, { css } from 'react-emotion';

const primaryColor = '#4780ec';
const warningColor = '#de9a4b';
const dangerColor = '#CF5858';
const darkColor = '#464f60';
const whiteColor = '#FFF';

const theme = props => {
  let border;

  if (props.bgFill) {
    return css`
      background-color: ${getColour(props, '#464f60')};
      border: none;
      color: ${props.white ? colors.text.secondary : `#FFF`};
      padding: ${toRem(5)} ${toRem(10)};
      border-radius: 2px;
    `;
  }

  if (props.placement === 'bottom') {
    border = `border-bottom: solid 2px ${getColour(props, '#464f60')}`;
  } else {
    border = `border-top: solid 2px ${getColour(props, '#464f60')}`;
  }

  return css`
    background-color: #fff;
    color: ${colors.text.secondary};
    padding: ${toRem(8)} ${toRem(15)};
    border-radius: 3px;
    ${border};
  `;
};

const getColour = (props, defaultColor) => {
  if (props.danger) {
    return '#CF5858';
  } else if (props.warning) {
    return '#de9a4b';
  } else if (props.primary) {
    return '#4780ec';
  } else if (props.white) {
    return '#FFFFFF';
  } else {
    return defaultColor || '#FFF';
  }
};

const getTipColor = (props, defaultColor) => {
  if (!props.bgFill) {
    return '#FFF';
  }

  if (props.danger) {
    return dangerColor;
  } else if (props.warning) {
    return warningColor;
  } else if (props.primary) {
    return primaryColor;
  } else if (props.white) {
    return whiteColor;
  } else {
    return darkColor;
  }
};

export const TipWrapStyled = styled('div')`
  display: inline-block;

  .tip-container {
    position: relative;
    text-align: center;

    .ant-tooltip {
      line-height: 1.5;
      color: ${colors.text.secondary};
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      list-style: none;
      position: absolute;
      z-index: 1060;
      display: block;
      visibility: visible;
    }
    .ant-tooltip-hidden {
      display: none;
    }

    .ant-tooltip-placement-top,
    .ant-tooltip-placement-topLeft,
    .ant-tooltip-placement-topRight {
      padding-bottom: 8px;
    }
    .ant-tooltip-placement-right,
    .ant-tooltip-placement-rightTop,
    .ant-tooltip-placement-rightBottom {
      padding-left: 8px;
    }
    .ant-tooltip-placement-bottom,
    .ant-tooltip-placement-bottomLeft,
    .ant-tooltip-placement-bottomRight {
      padding-top: 8px;
    }
    .ant-tooltip-placement-left,
    .ant-tooltip-placement-leftTop,
    .ant-tooltip-placement-leftBottom {
      padding-right: 8px;
    }

    .ant-tooltip-inner {
      position: relative;
      font-size: ${toEm(text['12'])};
      max-width: 250px;
      text-align: center;
      text-decoration: none;
      ${theme};

      &:after,
      &:before {
        display: block;
        content: '';
        position: absolute;
        z-index: -100;
        top: 0;
        bottom: 0;
        width: 50%;
        box-shadow: 0 2px 5px 0 rgba(121, 131, 149, 0.3);
      }

      &:after {
        right: 0;
        border-top-right-radius: 3px;
        border-bottom-right-radius: 3px;
      }

      &:before {
        left: 0;
        border-top-left-radius: 3px;
        border-bottom-left-radius: 3px;
      }
    }

    .ant-tooltip-placement-top {
      .ant-tooltip-inner {
        &:after,
        &:before {
          width: 45%;
        }
      }
    }

    .ant-tooltip-arrow {
      position: absolute;
      z-index: -100;
      display: block;
      width: 1rem;
      height: 1rem;
      left: auto;
      bottom: -0.5rem;
      transform: translateX(-50%) rotate(45deg);
      box-shadow: 0 2px 5px 0 rgba(121, 131, 149, 0.3);
      background: ${getTipColor};
    }

    .ant-tooltip-placement-topLeft {
      .ant-tooltip-inner {
        &:before {
          width: 15%;
        }
        &:after {
          width: 75%;
        }
      }
    }

    .ant-tooltip-placement-topRight {
      .ant-tooltip-inner {
        &:before {
          width: 75%;
        }
        &:after {
          width: 15%;
        }
      }
    }

    .ant-tooltip-placement-left {
      .ant-tooltip-arrow {
        box-shadow: 2px -1px 5px 0 rgba(121, 131, 149, 0.3);
        -webkit-box-shadow: 2px -1px 5px 0 rgba(121, 131, 149, 0.3);
      }

      .ant-tooltip-inner {
        &:before {
          right: 0;
          width: 100%;
          border-radius: 0px 3px 3px 0px;
          left: auto;
          height: 30%;
          box-shadow: 0px -2px 5px 0 rgba(121, 131, 149, 0.3);
          -webkit-box-shadow: 0px -2px 5px 0 rgba(121, 131, 149, 0.3);
        }
        &:after {
          right: 0;
          width: 100%;
          border-radius: 3px 0px 0px 3px;
          left: auto;
          height: 30%;
          bottom: 0;
          top: auto;
          box-shadow: 0px 2px 5px 0 rgba(121, 131, 149, 0.3);
          -webkit-box-shadow: 0px 2px 5px 0 rgba(121, 131, 149, 0.3);
        }
      }
    }

    .ant-tooltip-placement-right {
      .ant-tooltip-arrow {
        box-shadow: 0 0 5px 0 rgba(121, 131, 149, 0.3);
        -webkit-box-shadow: 0 0 5px 0 rgba(121, 131, 149, 0.3);
      }

      .ant-tooltip-inner {
        &:before {
          left: 0;
          width: 100%;
          border-radius: 0px 3px 3px 0px;
          right: auto;
          height: 30%;
          box-shadow: 0px -2px 5px 0 rgba(121, 131, 149, 0.3);
          -webkit-box-shadow: 0px -2px 5px 0 rgba(121, 131, 149, 0.3);
        }
        &:after {
          right: auto;
          width: 100%;
          border-radius: 3px 0px 0px 3px;
          left: 0;
          height: 30%;
          bottom: 0;
          top: auto;
          box-shadow: 0px 2px 5px 0 rgba(121, 131, 149, 0.3);
          -webkit-box-shadow: 0px 2px 5px 0 rgba(121, 131, 149, 0.3);
        }
      }
    }

    .ant-tooltip-placement-top .ant-tooltip-arrow,
    .ant-tooltip-placement-topLeft .ant-tooltip-arrow,
    .ant-tooltip-placement-topRight .ant-tooltip-arrow {
      bottom: 6px;
    }

    .ant-tooltip-placement-top .ant-tooltip-arrow {
      left: 50%;
    }

    .ant-tooltip-placement-topLeft .ant-tooltip-arrow {
      left: 16px;
    }
    .ant-tooltip-placement-topRight .ant-tooltip-arrow {
      right: 0;
      left: auto;
    }
    .ant-tooltip-placement-right .ant-tooltip-arrow,
    .ant-tooltip-placement-rightTop .ant-tooltip-arrow,
    .ant-tooltip-placement-rightBottom .ant-tooltip-arrow {
      left: 10px;
      right: auto;
    }
    .ant-tooltip-placement-right .ant-tooltip-arrow {
      top: 50%;
      margin-top: -5px;
    }
    .ant-tooltip-placement-rightTop .ant-tooltip-arrow {
      top: 8px;
    }
    .ant-tooltip-placement-rightBottom .ant-tooltip-arrow {
      bottom: 8px;
    }
    .ant-tooltip-placement-left .ant-tooltip-arrow,
    .ant-tooltip-placement-leftTop .ant-tooltip-arrow,
    .ant-tooltip-placement-leftBottom .ant-tooltip-arrow {
      right: -3px;
      left: auto;
    }
    .ant-tooltip-placement-left .ant-tooltip-arrow {
      top: 50%;
      margin-top: -5px;
    }
    .ant-tooltip-placement-leftTop .ant-tooltip-arrow {
      top: 38%;
    }
    .ant-tooltip-placement-leftBottom .ant-tooltip-arrow {
      bottom: 8px;
    }
    .ant-tooltip-placement-bottom .ant-tooltip-arrow,
    .ant-tooltip-placement-bottomLeft .ant-tooltip-arrow,
    .ant-tooltip-placement-bottomRight .ant-tooltip-arrow {
      top: 6px;
    }
    .ant-tooltip-placement-bottom .ant-tooltip-arrow {
      left: 50%;
      margin-left: -5px;
    }
    .ant-tooltip-placement-bottomLeft .ant-tooltip-arrow {
      left: 16px;
    }
    .ant-tooltip-placement-bottomRight .ant-tooltip-arrow {
      right: 16px;
    }
  }
`;
