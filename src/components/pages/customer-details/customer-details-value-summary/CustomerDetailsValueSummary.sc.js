import { text, colors } from 'styles/common.sc';
import { toEm } from 'utils/ui.util';
import { FlexItem } from 'components/ui/flex';
import styled from 'react-emotion';

const getSummaryStyleBySize = ({ size }) => {
  const styleBySize = {
    small: {
      marginRight: 15,
      valueFontSize: 32,
      unitsFontSize: 12,
    },
    default: {
      marginRight: 25,
      valueFontSize: 40,
      unitsFontSize: 16,
    },
  };

  return styleBySize[size || 'default'];
};

export const SummaryValueContainerStyled = styled(FlexItem)`
  margin-right: ${props => getSummaryStyleBySize(props).marginRight}px;

  .summary-value {
    line-height: 1;
    color: ${colors.link};
    font-size: ${props => toEm(getSummaryStyleBySize(props).valueFontSize)};
    margin-bottom: 5px;
    margin-right: 5px;
  }

  .summary-value-title {
    color: ${colors.text.tertiary};
    font-weight: ${text.medium};
    margin-bottom: 5px;
  }

  .summary-value-description {
    color: ${colors.text.adiacent};
    white-space: nowrap;
  }

  .summary-value-units {
    font-size: ${props => toEm(getSummaryStyleBySize(props).unitsFontSize)};
    color: ${colors.text.tertiary};
  }

  .summary-value-title-container {
    margin-top: 15px;
  }
`;
