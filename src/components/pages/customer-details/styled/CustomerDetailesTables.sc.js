import { text, colors } from 'styles/common.sc';
import { toEm } from 'utils/ui.util';
import styled from 'react-emotion';

export const TableContainerStyled = styled('div')`
  background-color: #fff;
  box-shadow: 0 1px 3px 0 rgba(121, 131, 149, 0.2);
  margin-bottom: 10px;
  position: relative;

  .value-wrap {
    display: inline-block;
    margin-right: 20px;
  }

  .value {
    margin-right: 3px;
  }

  .card-number {
    display: inline-block;
  }

  .cko-table {
    box-shadow: none;
  }

  .ant-table-expanded-row {
    background-color: #f7f8fa;
  }
`;

export const ShowMoreContainerStyled = styled('div')`
  text-align: center;
  padding-bottom: 20px;
  cursor: pointer;

  .show-more-link {
    color: ${colors.link};
    font-size: ${toEm(text['14'])};
    margin-right: 3px;
  }
`;
