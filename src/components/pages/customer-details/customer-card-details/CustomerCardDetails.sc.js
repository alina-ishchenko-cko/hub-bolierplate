import styled from 'react-emotion';
import { FlexItem } from 'components/ui/flex';

export const CardInfoStyled = styled(FlexItem)`
  margin-right: 10px;

  .card-info {
    color: #000;
    max-width: 270px;
  }

  .card-info-id {
    display: inline-block;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    width: calc(100% - 70px);
    mergin-right: 5px;
  }

  .card-id {
    margin-bottom: 15px;
  }
`;
