import { text, colors, animation, clearfix } from 'styles/common.sc';
import { toEm, toRem } from 'utils/ui.util';
import styled, { css } from 'react-emotion';
import Checkbox from 'antd/lib/checkbox';
import Radio from 'antd/lib/radio';

/**
 * Form wrap
 */
export const FormWrap = styled('div')`
  width: 300px;

  & .ant-form-item {
    margin-bottom: ${toEm(14)};
  }

  & .ant-input-group-wrapper {
    background-color: #fff;
    border-radius: 3px;
    border-style: solid;
    border-width: 1px;
    border-color: ${colors.borders};
    box-shadow: 0px 1px 3px 0px rgba(121, 131, 149, 0.15);
    overflow: hidden;
  }

  & .ant-input {
    border: none;
    background-color: #fff;
    width: 100%;
    height: 42px;
    box-shadow: none;
  }

  & .ant-input-group-addon {
    border: none;
    background: transparent;

    & .anticon {
      color: #000;
      font-size: 1em;
    }
  }
`;

/**
 * Form Item
 */
export const FormItemStyled = styled('div')`
  & .ant-row {
    margin-bottom: 15px;
  }

  .ant-form-item-label {
    color: ${colors.text.primary};
    font-weight: ${text.medium};
    margin-bottom: 10px;
  }

  & .has-error {
    .ant-select,
    .ant-input {
      border-color: ${colors.alertBg};
      box-shadow: 0 1px 3px 0 rgba(233, 109, 109, 0.45);
    }
  }

  & .ant-form-explain {
    font-size: ${toEm(12)};
    color: ${colors.alertBg};
    margin-top: 5px;
    margin-left: 5px;
  }
`;

/**
 * Select field
 */
export const SelectStyled = styled('div')`
  width: 100%;
  position: relative;

  .placeholder-value {
    color: ${colors.text.tertiary};
  }

  .cko-icon {
    width: 17px;
    height: 12px;
    border-radius: 3px;
    box-shadow: 0 2px 5px 0 rgba(121, 131, 149, 0.2);
    overflow: hidden;
    margin-right: 10px;

    &.placeholder {
      box-shadow: none;
    }
  }

  & .ant-select {
    ${fieldCommonStyles};
    ${fieldTheme};
    overflow: hidden;

    cursor: pointer;
    padding-right: 0;

    .ant-select-selection-selected-value,
    .ant-select-selection__placeholder {
      padding: 0 ${toRem(16)};
      width: 92%;

      span {
        display: inline-block;
        vertical-align: middle;
      }
    }

    .ant-select-selection__placeholder {
      color: ${colors.text.tertiary};
    }

    &.ant-select-open {
      border-top-color: #d0d3db;
      border-right-color: #d0d3db;
      border-left-color: #d0d3db;
      border-bottom-color: #eff0f4;
      box-shadow: 0 2px 5px 0 rgba(121, 131, 149, 0.25);
      border-radius: 3px 3px 0 0;
    }

    &.ant-select-disabled {
      ${disabledStyle};
    }

    & .ant-select-search {
      position: absolute;
      top: 0;
      z-index: 888;
      width: 100%;
      overflow: hidden;
      border-bottom: solid 1px #eff0f4;
      ${fieldTheme};

      & .ant-select-search__field__wrap {
        height: inherit;
        line-height: inherit;
      }

      & .ant-select-search__field {
        width: 100%;
        padding: 0 ${toRem(16)};
        color: ${colors.text.secondary};
        height: inherit;
        line-height: inherit;
        border: none;

        &:focus,
        &:active {
          outline: none;
        }
      }
    }
  }

  & .ant-select-arrow {
    text-align: center;
    color: ${colors.text.adiacent};
    border: solid 1px transparent;
    margin: 4px 5px 0 0;

    ${selectArrowTheme};
    border-radius: 3px 3px 0 0;

    &:before {
      font-size: 4px;
      margin-top: -3px;
      margin-right: -1px;
    }
  }

  & .ant-select-open {
    & .ant-select-arrow {
      color: ${colors.buttonBg};
      border-color: #eff0f4;
      border-bottom-color: #fff;
    }
  }

  .listContainer {
    width: 100%;
    background: white;
    position: absolute;
    top: 0px;
    left: 0;

    .ant-select-dropdown {
      border: solid 1px #d0d3db;
      border-top: none;
      border-radius: 0 0 3px 3px;
      box-shadow: 0 2px 5px 0 rgba(121, 131, 149, 0.25);
      ${dropDownTheme};
    }
  }

  .ant-select-dropdown-menu {
    li {
      padding: 0 ${toRem(16)};
      ${selectListTheme} &:hover {
        background-color: #fafbfc;
        color: ${colors.link};
      }

      &.ant-select-dropdown-menu-item-selected {
        background-color: ${colors.buttonBg};
        color: #fff;
      }
    }
  }
`;

/**
 * Input field
 */
export const InputWrapStyled = styled('div')`
  ${inputTheme};
`;

/**
 * Textarea field
 */
export const TextareaWrapStyled = styled('div')`
  ${inputTheme};
  min-height: 84px;
  max-width: 100%;
  line-height: auto;

  .ant-input,
  textarea {
    resize: none;
    padding-top: ${toRem(12)};
  }
`;

/**
 * Checkbox field
 */
export const CheckboxStyled = styled(Checkbox)``;

/**
 * Radio field
 */
export const RadioStyled = styled(Radio)`
  display: block;
  height: 32px;
  line-height: 32px;
`;

/**
 * Form Group
 */
export const CkoFormGroup = styled('div')`
  position: relative;
  margin-left: auto;
  margin-right: auto;
  zoom: 1;
  display: block;
  /* padding: 0 1px;
  border-radius: 3px;
  border: solid 1px #dfe1ea;
  box-shadow: 0 1px 3px 0 rgba(121, 131, 149, 0.25);
  margin-bottom: 20px; */
  ${clearfix};

  .cko-column {
    padding: 0;

    .cko-input,
    .ant-input,
    .ant-select {
      border-left-color: transparent;
      border-radius: 0px 3px 3px 0px;
    }

    .has-error {
      .cko-input,
      .ant-input,
      .ant-select {
        border-left-color: #cf5858;
      }
    }

    &:first-child {
      .ant-input,
      .ant-select {
        border-left-color: ${colors.borders};
        border-radius: 3px 0px 0px 3px;
      }
    }

    .ant-form-explain {
      display: none;
    }
  }
`;

/**
 * Helpers
 */
function fieldTheme(props) {
  if (props.size === 'large') {
    return css`
      height: 42px;
      line-height: 42px;
    `;
  } else {
    return css`
      height: 32px;
      line-height: 32px;
    `;
  }
}

function selectArrowTheme(props) {
  if (props.size === 'large') {
    return css`
      width: 32px;
      height: 37px;
      line-height: 37px;
    `;
  } else {
    return css`
      width: 32px;
      height: 27px;
      line-height: 27px;
    `;
  }
}

function selectListTheme(props) {
  if (props.size === 'large') {
    return css`
      height: 42px;
      line-height: 42px;
    `;
  } else {
    return css`
      line-height: 32px;
      height: 32px;
    `;
  }
}

function dropDownTheme(props) {
  if (props.size === 'large') {
    return css`
      top: 42px !important;
    `;
  } else {
    return css`
      top: 32px !important;
    `;
  }
}

function fieldCommonStyles() {
  return css`
    width: 100%;
    background-color: #fff;
    color: ${colors.text.secondary};
    border: solid 1px ${colors.borders};
    font-size: ${toEm(text['13'])};
    font-weight: 400;
    box-shadow: 0 1px 3px 0 rgba(121, 131, 149, 0.15);
    border-radius: 3px;
    ${animation.cubic};

    &:hover,
    &:focus {
      outline: none;
      border-color: #d0d3db;
      box-shadow: 0 1px 3px 0 rgba(121, 131, 149, 0.25);
    }
  `;
}

function disabledStyle() {
  return css`
    box-shadow: none;
    background-color: ${colors.bg};
    border-color: rgba(223, 225, 234, 0.5);
    cursor: not-allowed;
    color: rgba(121, 131, 149, 0.5);

    ::-webkit-input-placeholder {
      color: rgba(121, 131, 149, 0.5);
    }
  `;
}

export function inputTheme(props) {
  let inputLeftPad = 33;
  let prefixPad = 10;

  if (props.size === 'large') {
    inputLeftPad = 43;
    prefixPad = 15;
  }

  return css`
    width: 100%;
    ${fieldTheme(props)};

    .ant-input {
      padding: 0 ${toRem(16)};
      ${fieldCommonStyles};
      height: 100%;

      &.ant-input-disabled {
        ${disabledStyle};
      }
    }

    .ant-input-affix-wrapper {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      list-style: none;
      position: relative;
      display: inline-block;
      width: inherit;
      height: inherit;

      .ant-input:not(:first-child) {
        padding-left: ${toRem(inputLeftPad)};
      }

      .ant-input:not(:last-child) {
        padding-right: ${toRem(inputLeftPad)};
      }

      .ant-input-prefix,
      .ant-input-suffix {
        position: absolute;
        top: 0;
        z-index: 2;
        height: inherit;
        line-height: inherit;
        color: #798395;
      }

      .ant-input-prefix {
        left: 0;
        padding-left: ${toRem(prefixPad)};
      }

      .ant-input-suffix {
        right: 0;
        padding-right: ${toRem(prefixPad)};
      }
    }
  `;
}
