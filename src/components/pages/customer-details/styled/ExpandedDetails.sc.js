import styled from 'react-emotion';
import { FlexColumn, FlexRow } from 'components/ui/flex';

export const ExpandedRowStyled = styled(FlexRow)`
  padding-top: 20px;
  padding-bottom: 25px;
`;

export const ExpandedActionsStyled = styled(FlexColumn)`
  text-align: right;
  flex-grow: 0;

  .action-container {
    width: 100%;
    margin-bottom: 5px;
  }

  .cko-button {
    width: 100%;
  }

  .switcher-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-shadow: 0px 1px 3px 0 rgba(121, 131, 149, 0.15);
    border: solid 1px #dfe1ea;
    border-radius: 3px;
    line-height: 26px;
    padding: 0 4px;
  }
`;
