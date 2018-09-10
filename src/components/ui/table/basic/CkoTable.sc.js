import { text, colors, clearfix } from 'styles/common.sc';
import { toRem, toEm } from 'utils/ui.util';
import styled from 'react-emotion';

/* ------- Table Wrap ------- */
export const TableWrapStyled = styled('div')`
  width: 100%;
  height: 100%;
  border-radius: 3px;
  background-color: #ffffff;
  box-shadow: 0px 2px 5px 0px rgba(121, 131, 149, 0.2);
  position: relative;

  .cko-app-loading {
    text-align: center;
  }

  .ant-table-placeholder {
    text-align: center;
    padding: ${toRem(25)};
    color: ${colors.text.tertiary};
  }

  .ant-table-row-expand-icon-cell,
  .ant-table-expand-icon-th,
  & .ant-table-wrapper .ant-pagination {
    display: none;
  }

  & .ant-table-thead tr {
    box-shadow: 0 1px 3px 0 rgba(121, 131, 149, 0.2);

    & th {
      line-height: 36px;
      padding: 0;
      color: ${colors.text.primary};
      font-size: ${toEm(text['12'])};
      font-weight: ${text.medium};
    }

    .ant-table-expand-icon-th + th,
    & > th:first-child {
      padding-left: 30px;
    }

    & > th:last-child {
      padding-right: 30px;
    }
  }

  & .ant-table-tbody tr {
    &:first-child {
      height: 60px;
      vertical-align: bottom;
    }

    &:last-child {
      height: 60px;
      vertical-align: top;
    }

    td {
      line-height: 50px;
      padding: 0;
      color: ${colors.text.tertiary};
      font-size: ${toEm(text['13'])};
    }

    td.trans-details {
      text-align: right;

      .cko-currency-format {
        font-weight: ${text.medium};
        color: ${colors.text.primary};
      }

      .currency {
        margin-left: 5px;
      }
    }

    td.padding {
      padding: 0 30px;
    }

    .ant-table-row-expand-icon-cell + td,
    & > td:first-child {
      border-radius: 5px 0 5px 0;
      padding-left: 30px;
    }

    & > td:last-child {
      padding-right: 30px;
    }

    .cko-icon {
      width: 26px;
      margin-right: 8px;
    }

    .cardNum {
      font-family: 'OCR A Extended';
    }

    .tag-wrap {
      margin-left: -5px;
    }

    .cutText {
      word-break: normal;
      span {
        width: 90%;
        display: block;
        text-overflow: ellipsis;
        overflow: hidden;
      }
    }

    .cko-checkbox {
      display: none;
    }

    &:hover {
      cursor: pointer;
      background-color: #f7f8fa;
    }
  }

  .ant-table-thead tr,
  .ant-table-tbody tr {
    .text-right {
      text-align: right;
    }
  }
`;

/* ------- Header Wrap  ------- */
export const TableHeaderStyled = styled('div')`
  height: 52px;
  line-height: 52px;
  overflow: hidden;
  padding-right: ${toRem(20)};
  padding-left: ${toRem(20)};
  ${clearfix};
`;

/* ------- Header - Left  ------- */
export const HeaderLeftStyled = styled('div')`
  width: 50%;
  float: left;
  user-select: none;

  .title {
    margin-right: ${toRem(20)};
    font-size: ${toEm(text['15'])};
  }

  .title,
  .cko-input,
  .divider,
  .cko-button,
  .content {
    display: inline-block;
    vertical-align: middle;
  }

  .cko-input {
    width: 290px;
  }

  .divider {
    width: 1px;
    height: 17px;
    opacity: 0.5;
    background-color: #dfe1ea;
    margin: 0 ${toRem(10)};
  }
`;

/* ------- Header - Right  ------- */
export const HeaderRightStyled = styled('div')`
  width: 50%;
  float: right;
  text-align: right;
`;
