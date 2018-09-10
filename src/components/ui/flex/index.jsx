import * as React from 'react';
import styled, { css } from 'react-emotion';

/**
 * Flex Column
 */
const Column = styled('div')`
  display: flex;
  flex-direction: column;
  line-height: 1;
  flex-shrink: ${props => props.shrink || 0};
  flex-basis: ${props => (!isNaN(props.basis) ? props.basis : 'auto')};
  flex-grow: ${props => (!isNaN(props.grow) ? props.grow : 1)};
  margin: ${props => props.margin || 0};
  padding: ${props => props.padding || 0};
  flex-wrap: ${props => props.wrap || 'nowrap'};
  justify-content: ${props => props.justify || 'flex-start'};
  align-items: ${props => props.alignItems || 'stretch'};
  align-content: ${props => props.alignContent || 'stretch'};
  width: ${props => props.width || 'auto'};
`;
export const FlexColumn = props => (
  <Column {...props} className={`cko-flex-column ${props.className || ''}`}>
    {props.children}
  </Column>
);

/**
 * Flex Row
 */
const Row = styled('div')`
  display: flex;
  flex-direction: row;
  line-height: 1;
  flex-shrink: ${props => props.shrink || 0};
  flex-basis: ${props => (!isNaN(props.basis) ? props.basis : 'auto')};
  flex-grow: ${props => (!isNaN(props.grow) ? props.grow : 1)};
  margin: ${props => props.margin || 0};
  padding: ${props => props.padding || 0};
  flex-wrap: ${props => props.wrap || 'nowrap'};
  justify-content: ${props => props.justify || 'flex-start'};
  align-items: ${props => props.alignItems || 'stretch'};
  align-content: ${props => props.alignContent || 'stretch'};
  width: ${props => props.width || 'auto'};
`;
export const FlexRow = props => (
  <Row {...props} className={`cko-flex-row ${props.className || ''}`}>
    {props.children}
  </Row>
);

/**
 * Flex Item
 */
const Item = styled('div')`
  ${flexItemBuilder};
`;

function flexItemBuilder(props) {
  if (props.clear) {
    return css`
      margin: ${props.margin || '0 0 20px 0'};
    `;
  }

  return css`
    flex-basis: ${props.basis || 0};
    flex-grow: ${!isNaN(props.grow) ? props.grow : 1};
    margin: ${props.margin || '0'};
    padding: ${props.padding || 0};
  `;
}
export const FlexItem = props => (
  <Item {...props} className={`cko-flex-item ${props.className || ''}`}>
    {props.children}
  </Item>
);
