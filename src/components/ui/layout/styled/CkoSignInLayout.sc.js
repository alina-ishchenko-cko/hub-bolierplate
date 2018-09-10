import { colors } from 'styles/common.sc';
import { toEm, toRem } from 'utils/ui.util';
import styled, { css } from 'react-emotion';

const textAlign = props => css`
  text-align: ${props.align ? props.align : 'left'};
`;

const checkColumn = props => {
  if (!props.columnTwo) {
    return css`
      max-width: 400px;
    `;
  }
};

export const ContainerWrap = styled('div')`
  display: -webkit-flex;
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  -webkit-align-items: center;
  justify-content: center;
  -webkit-justify-content: center;
`;

export const InnerWrap = styled('div')`
  position: relative;
  display: flex;
  border-radius: 3px;
  background-color: #ffffff;
  box-shadow: 1px 2px 5px 0px rgba(121, 131, 149, 0.2);
  width: ${toRem(820)};
  min-height: ${toRem(403)};
  padding: ${toRem(60)} ${toRem(50)};
  border-top: solid 3px ${colors.buttonBg};
  text-align: center;

  .logo {
    margin-bottom: ${toRem(22)};
  }

  .cko-alert {
    margin-bottom: ${toRem(20)};
  }

  .ant-form-item-control {
    text-align: left;
  }

  .loading-wrap {
    display: flex;
    align-items: center;
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.6);
    top: 0;
    left: 0;
    z-index: 8;
    text-align: center;

    .cko-app-loading {
      flex: 1;
      -webkit-flex: 1;
    }
  }

  .form-info {
    margin-bottom: 15px;
  }

  .flex-item {
    padding: 0 30px;
    margin: 0;
  }
`;

export const Column = styled('div')`
  width: 50%;
  padding: 0 ${toRem(30)};
  margin: 0 auto;
  color: ${colors.text.tertiary};
  ${textAlign};
  ${checkColumn};
`;

export const Title = styled('div')`
  color: #000;
  font-size: ${toEm(21)};
`;
