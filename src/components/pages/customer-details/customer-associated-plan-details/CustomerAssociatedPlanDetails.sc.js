import styled from 'react-emotion';
import { FlexItem, FlexColumn, FlexRow } from 'components/ui/flex';

export const PlanInfoStyled = styled(FlexItem)`
  .plan-info-title {
  }

  .plan-info {
    color: #000;
  }
`;

export const PlanSummaryStyled = styled(FlexRow)`
  margin-bottom: 25px;
`;

export const PlanInfoContainerStyled = styled(FlexColumn)`
  .plan-info-container {
    margin-bottom: 10px;
    margin-right: 15px;
  }

  .plan-id,
  .customer-plan-id {
    margin-right: 5px;
  }
`;
