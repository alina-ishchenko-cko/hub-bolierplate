import { colors } from 'styles/common.sc';
import { toRem } from 'utils/ui.util';
import styled from 'react-emotion';

export const FormWrapStyled = styled('div')`
  margin-top: ${toRem(36)};

  .login-password {
    .ant-input-suffix {
      padding: 0 ${toRem(20)};

      &:before {
        content: '';
        position: absolute;
        top: 27%;
        left: 0;
        width: 1px;
        height: 50%;
        background: ${colors.borders};
      }
    }
  }
`;
