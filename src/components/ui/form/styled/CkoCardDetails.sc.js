import { colors, ocrFont, clearfix } from 'styles/common.sc';
import styled, { css } from 'react-emotion';

export const ContainerStyled = styled('div')`
  ${clearfix};

  .ant-input,
	.has-error .ant-input {
    ${ocrFont};
    box-shadow: none;
  }

  .ant-input-affix-wrapper {
    .ant-input-prefix {
      padding-left: 16px;
    }

    .cko-icon {
      width: 26px;
    }

    .ant-input:not(:first-child) {
      padding-left: 52px;
    }
  }

  .card-details-wrap {
    /* border: solid 1px ${colors.borders}; */
    box-shadow: 0 1px 3px 0 rgba(121, 131, 149, 0.15);
    width: 100%;
    height: 42px;
    line-height: 42px;
    /* overflow: hidden; */
    border-radius: 3px;
    margin-bottom: 15px;

    .ant-row {
      margin: 0;
    }

    .ant-form-explain {
      display: none;
    }
  }
`;

const commonStyles = props => css`
  .ant-input {
    border: none;
    border-radius: 0;
  }

  .cko-input {
    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    border: solid 1px #dfe1ea;
    overflow: hidden;
  }

  .has-error {
    .cko-input {
      border-color: #cf5858;
    }
  }
`;

export const CardNumStyled = styled('div')`
  float: left;
  width: 75%;
  width: ${props => (props.collapse ? '50%' : '75%')};
  transition: all 0.3s;
  overflow: hidden;
  margin-right: -1px;

  ${commonStyles};

  .ant-input-prefix {
    background: #fff;
  }

  .cko-input {
    border-radius: 3px 0px 0px 3px;
    border-right-color: transparent;

    input {
      width: ${props => (props.collapse ? 'calc(100% + 82px)' : '100%')};
      margin-left: ${props => (props.collapse ? '-76%' : '0%')};
    }
  }
`;

export const CardExpStyled = styled('div')`
  float: left;
  width: calc(25% + 1px);
  transition: all 0.3s;
  overflow: hidden;
  margin-right: -1px;

  ${commonStyles};

  .ant-input {
    padding: 0 16px 0px 20px;
  }

  .cko-input {
    border-radius: ${props => (props.collapse ? '0px' : '0px 3px 3px 0px')};
    border-left-color: transparent;
    border-right-color: ${props =>
      props.collapse ? 'transparent' : '#DFE1EA'};
  }
`;

export const CardCVVStyled = styled('div')`
  float: left;
  width: ${props => (props.collapse ? 'calc(25% + 1px)' : '0%')};
  transition: all 0.3s;
  overflow: hidden;

  ${commonStyles};

  .ant-input {
    text-align: center;
  }

  .cko-input {
    border-radius: ${props => (props.collapse ? '0px 3px 3px 0px' : '0px')};
    border-left-color: transparent;
  }
`;
