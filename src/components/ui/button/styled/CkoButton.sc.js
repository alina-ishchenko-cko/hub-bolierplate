import { text } from 'styles/common.sc';
import { toEm, toRem } from 'utils/ui.util';
import styled, { css } from 'react-emotion';

/**
 * Common theme styles
 */
const commonStyles = {
  padding({ size }) {
    if (size === 'small') {
      return `0 ${toRem(10)}`;
    } else if (size === 'large') {
      return `0 ${toRem(20)}`;
    }
    return `0 ${toRem(15)}`;
  },
  fontSize({ size }) {
    if (size === 'small') {
      return toEm(text['12']);
    }
    return toEm(text['13']);
  },
  lineHeight({ size }) {
    if (size === 'small') {
      return '26px';
    } else if (size === 'large') {
      return '42px';
    }
    return '32px';
  },
  iconMargin({ size }) {
    if (size === 'large') {
      return '15px';
    }
    return '10px';
  },
};

/**
 * Styled Button Component
 */
export const ButtonStyled = styled('button')`
  margin: 0;
  font-weight: 400;
  user-select: none;
  appearance: button;
  border-radius: 3px;
  text-align: center;
  border: solid 1px transparent;
  padding: ${commonStyles.padding};
  font-size: ${commonStyles.fontSize};
  line-height: ${commonStyles.lineHeight};
  width: ${props => (props.block ? '100%' : 'auto')};
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  ${createtheme};

  .cko-icon {
    margin-right: ${commonStyles.iconMargin};
  }
`;

/**
 * Creates the button themes
 * based on the prop.type
 */
function createtheme(props) {
  // Disabled
  if (props.disabled) {
    return disabledTheme(props);
  }

  // Primary
  if (props.type === 'primary') {
    return primaryTheme(props);
  }

  // Success
  if (props.type === 'success') {
    return successTheme(props);
  }

  // Light
  if (props.type === 'light') {
    return lightTheme(props);
  }

  // Default
  return defaultTheme(props);
}

/**
 * Disabled theme
 */
function disabledTheme() {
  return css`
    color: #ffffff;
    background: #dadee5;
    box-shadow: none;
  `;
}

/**
 * Default theme
 */
function defaultTheme(props) {
  return css`
    color: #366bcf;
    background: #fff;
    box-shadow: 0px 1px 3px 0 rgba(121, 131, 149, 0.15);
    border-color: #dfe1ea;
    .cko-icon svg * {
      fill: #366bcf;
    }

    &:hover {
      box-shadow: 0px 2px 5px 0 rgba(121, 131, 149, 0.25);
      border-color: #4780ec;
    }

    &:active {
      background-color: #f5f8ff;
      box-shadow: inset 0px 2px 5px 0 rgba(121, 131, 149, 0.2);
      border-color: #4780ec;
    }

    &:focus {
      outline: none;
    }
  `;
}

/**
 * Primary theme
 */
function primaryTheme(props) {
  return css`
    color: #fff;
    background: linear-gradient(to top, #4179e4, #4780ec);
    box-shadow: 0 1px 3px 0 rgba(58, 128, 232, 0.45);
    .cko-icon svg * {
      fill: #fff;
    }

    &:hover {
      background: linear-gradient(to top, #5993ff, #558ffa);
      box-shadow: 0 2px 5px 0 rgba(58, 128, 232, 0.45);
    }

    &:active,
    &:focus {
      background: linear-gradient(to bottom, #4179e4, #4780ec);
      box-shadow: inset 0 2px 5px 0 rgba(44, 91, 179, 0.45);
    }
  `;
}

/**
 * Success theme
 */
function successTheme(props) {
  return css`
    color: #fff;
    background: linear-gradient(to top, #2a997b, #30a283);
    box-shadow: 0px 1px 3px 0 rgba(46, 170, 136, 0.45);
    .cko-icon svg * {
      fill: #fff;
    }

    &:hover {
      background: linear-gradient(to top, #39b392, #40bd9b);
      box-shadow: 0px 2px 5px 0 rgba(46, 170, 136, 0.45);
    }

    &:active,
    &:focus {
      background: linear-gradient(to bottom, #2a997b, #30a283);
      box-shadow: inset 0px 2px 5px 0 rgba(30, 108, 87, 0.35);
    }
  `;
}

/**
 * Light theme
 */
function lightTheme(props) {
  return css`
    color: #798395;
    border-color: #dfe1ea;
    background: #ffffff;
    box-shadow: 0px 1px 3px 0 rgba(121, 131, 149, 0.15);
    .cko-icon svg * {
      fill: #798395;
    }

    &:hover {
      box-shadow: 0px 2px 5px 0 rgba(121, 131, 149, 0.25);
      border-color: #d0d3db;
      color: #464f60;
    }

    &:active,
    &:focus {
      background: #fafbfc;
      box-shadow: inset 0px 2px 5px 0 rgba(121, 131, 149, 0.2);
      border-color: #d0d3db;
    }
  `;
}
