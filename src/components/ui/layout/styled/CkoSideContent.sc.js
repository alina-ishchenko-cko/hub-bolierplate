import { toRem } from 'utils/ui.util';
import styled from 'react-emotion';
import { FlexItem } from 'components/ui/flex/';

// const slideIn = keyframes`
// 	100% { right: 0%; }
// `;

export const ContainerStyled = styled('div')`
  position: fixed;
  top: 0;
  width: 50%;
  min-width: 700px;
  max-width: 850px;
  height: 100%;
  right: 0%;
  z-index: 10;
  padding: 0;
  background-color: #f7f8fa;
  box-shadow: -10px 0 35px 0 rgba(121, 131, 149, 0.35);

  /*animation-delay: 0.1s; */
  .cko-content-wrap {
    width: 100%;
    height: 100%;
  }
`;

export const CloseBtnStyled = styled('div')`
  width: 44px;
  height: 44px;
  border-radius: 2px 0 0 2px;
  background: #fff;
  line-height: 43px;
  text-align: center;
  position: absolute;
  top: 10px;
  left: -44px;
  cursor: pointer;
  box-shadow: -10px 0 35px 0 rgba(121, 131, 149, 0.35);

  svg * {
    fill: #798395;
  }
`;

export const HeaderStyled = styled('div')`
  width: 100%;
  height: auto;
  min-height: 173px;
  background-color: #fff;
  box-shadow: 0 1px 4px 0 rgba(121, 131, 149, 0.2);
  position: relative;
  z-index: 1;
`;

export const ContentStyled = styled('div')`
  width: 100%;
  height: 100%;
  padding: ${toRem(20)} ${toRem(30)} 0 ${toRem(30)};

  .content-wrap {
    &:last-child {
      margin-bottom: 20px;
    }
  }
`;

export const ColStyled = styled(FlexItem)``;
