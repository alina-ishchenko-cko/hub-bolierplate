import { colors } from 'styles/common.sc';
import { toRem, toEm } from 'utils/ui.util';
import { FlexRow } from 'components/ui/flex';
import styled from 'react-emotion';

export const WrapperStyled = styled('div')`
  width: 100%;
  padding-bottom: 30px;
`;

export const CustomerNameWrapperStyled = styled(FlexRow)`
  padding: ${toRem(30)};

  .customer-name {
    line-height: 1;
    color: ${colors.link};
    font-size: ${toEm(46)};
  }

  .actions {
    text-align: right;
  }
`;

export const CustomerInfoWrapperStyled = styled(FlexRow)`
  color: ${colors.text.tertiary};
  padding-left: 30px;

  .customer-info-column {
    margin-right: 50px;
  }

  .email-icon {
    margin-right: 3px;
  }

  .date-icon {
    margin-right: 6px;
  }

  .phone-icon {
    margin-right: 6px;
  }

  .id-icon {
    margin-right: 6px;
  }

  .id-text {
    margin-right: 10px;
  }
`;
