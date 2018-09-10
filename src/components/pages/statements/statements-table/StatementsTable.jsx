// @flow
import * as React from 'react';

import type { Statement } from 'store/reducers/statementsReducer';

import StatementsTableHeader from '../statements-table-header';
import StatementsTableBody from '../statements-table-body';
import { StatementsTableContainer } from './StatementsTable.sc';
import type { ColumnDimensionMap } from '../types';

type Props = {
  statementsMap: { [string]: { [string]: Statement[] } },
  isSidebarCollapsed: boolean,
};

export default class StatementsTable extends React.Component<Props> {
  get columnDimensions(): ColumnDimensionMap {
    return {
      month: {
        large: {
          collapsed: 160,
          uncollapsed: 160,
        },
        laptop: {
          collapsed: 130,
          uncollapsed: 130,
        },
        largeLaptop: {
          collapse: 130,
          uncollapsed: 130,
        },
      },
      dayCreated: {
        large: {
          collapsed: 160,
          uncollapsed: 160,
        },
        laptop: {
          collapsed: 120,
          uncollapsed: 100,
        },
        largeLaptop: {
          collapsed: 130,
          uncollapsed: 130,
        },
      },
      statementPeriod: {
        large: {
          collapsed: 220,
          uncollapsed: 220,
        },
        laptop: {
          collapsed: 155,
          uncollapsed: 130,
        },
        largeLaptop: {
          collapsed: 180,
          uncollapsed: 180,
        },
      },
      status: {
        large: {
          collapsed: 160,
          uncollapsed: 160,
        },
        laptop: {
          collapsed: 160,
          uncollapsed: 110,
        },
        largeLaptop: {
          collapsed: 160,
          uncollapsed: 110,
        },
      },
      amount: {
        large: {
          collapsed: 220,
          uncollapsed: 220,
        },
        laptop: {
          collapsed: 185,
          uncollapsed: 100,
        },
        largeLaptop: {
          collapsed: 200,
          uncollapsed: 150,
        },
      },
      statementId: {
        large: {
          collapsed: 160,
          uncollapsed: 160,
        },
        laptop: {
          collapsed: 130,
          uncollapsed: 100,
        },
        largeLaptop: {
          collapsed: 130,
          uncollapsed: 130,
        },
      },
      download: {
        large: {
          collapsed: 130,
          uncollapsed: 130,
        },
        laptop: {
          collapsed: 130,
          uncollapsed: 130,
        },
        largeLaptop: {
          collapsed: 130,
          uncollapsed: 130,
        },
      },
    };
  }

  render() {
    return (
      <StatementsTableContainer>
        <StatementsTableHeader
          isSidebarCollapsed={this.props.isSidebarCollapsed}
          columnDimensions={this.columnDimensions}
        />
        <StatementsTableBody
          isSidebarCollapsed={this.props.isSidebarCollapsed}
          columnDimensions={this.columnDimensions}
          statementsMap={this.props.statementsMap}
        />
      </StatementsTableContainer>
    );
  }
}
