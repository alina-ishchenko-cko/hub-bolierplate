import * as React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'react-emotion';
import { clearfix, general } from 'styles/common.sc';
import { toRem } from 'utils/ui.util';

/**
 * CkoCol (24 Grid Column)
 */
const getWidth = props => {
  // Divides the span by 24
  let colwidth = props.span ? `${props.span / 24 * 100}%` : 'auto';
  return css`
    width: ${colwidth};
  `;
};

const addPadding = props => {
  if (props.noPadding) {
    return css`
      padding-left: 0;
      padding-right: 0;
    `;
  }

  return css`
    padding-left: ${toRem(30)};
    padding-right: ${toRem(30)};
  `;
};

const ColWrap = styled('div')`
  float: left;
  -ms-flex: 0 0 auto;
  flex: 0 0 auto;
  position: relative;
  min-height: 1px;
  ${addPadding};
  ${getWidth};
`;

export const CkoCol = props => {
  return (
    <ColWrap
      span={props.span}
      className={`cko-column cko-col-${props.span}`}
      noPadding={props.noPadding}
    >
      {props.children}
    </ColWrap>
  );
};

/**
 * CkoRow
 */
const RowWrap = styled('div')`
  position: relative;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: ${toRem(general.gutter)};
  height: auto;
  zoom: 1;
  display: block;
  ${clearfix};

  & div > div.cko-row {
    margin-bottom: 0;
  }
`;
export const CkoRow = props => (
  <RowWrap className="cko-row">{props.children}</RowWrap>
);

// Set the prop type for validation
CkoCol.propTypes = {
  span: PropTypes.number,
};
