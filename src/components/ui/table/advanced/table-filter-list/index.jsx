// @flow
import * as React from 'react';
import { FilterWrapStyled, AddFilterStyled } from './TableFilterList.sc';
import last from 'lodash/last';
import findIndex from 'lodash/findIndex';
import isEqual from 'lodash/isEqual';
import TableFilter from './table-filter';

type Props = {
  totalRows: number,
  onChange: Function,
  filters: Array<Object>,
};

type State = {
  numOfFilters: Array<number>,
  selectedFilters: Array<Object>,
  resultsCounts: Array<number>,
  lastIndex: number,
  defaultIndex: number,
};

export default class TableFilterList extends React.Component<Props, State> {
  state = {
    numOfFilters: [0],
    selectedFilters: [],
    resultsCounts: [],
    lastIndex: -1,
    defaultIndex: 0,
  };

  componentWillUpdate(nextProps: Props, nextState: State) {
    /**
     * Set the totalResults based on the last index
     */
    if (
      this.hasSelectedFilters() &&
      (this.totalRowsHasChanged(nextProps) ||
        this.hasLastIndexChanged(nextState))
    ) {
      this.setTotalRows(nextProps);
    }
  }

  hasSelectedFilters(nextState?: State): boolean {
    const { selectedFilters } = nextState || this.state;
    return !!(selectedFilters.length > 0);
  }

  setTotalRows(nextProps: Props) {
    this.setState(prvState => {
      const resultsCounts = [...prvState.resultsCounts];
      const lastIndex = prvState.lastIndex;
      resultsCounts[lastIndex] = nextProps.totalRows;
      return { resultsCounts };
    });
  }

  hasFilterOrTotalRowsChanged(nextProps: Props, nextState: State) {
    const filterChanged = isEqual(
      nextState.selectedFilters,
      this.state.selectedFilters
    );
    const totalRowsChanged = isEqual(nextProps.totalRows, this.props.totalRows);
    return filterChanged || totalRowsChanged;
  }

  hasFilterChanged(nextState: State) {
    return !isEqual(nextState.selectedFilters, this.state.selectedFilters);
  }

  hasLastIndexChanged(nextState: State) {
    return !isEqual(nextState.lastIndex, this.state.lastIndex);
  }

  hasResultsCountChanged(nextState: State) {
    return !isEqual(nextState.resultsCounts, this.state.resultsCounts);
  }

  totalRowsHasChanged(nextProps: Props) {
    return !isEqual(nextProps.totalRows, this.props.totalRows);
  }

  addMoreFilter = (e: SyntheticEvent<any>) => {
    e.preventDefault();
    this.setState(prvState => {
      const prvFilters = prvState.numOfFilters;
      const lastNum = last(prvFilters);
      return {
        numOfFilters: [...prvFilters, lastNum + 1],
      };
    });
  };

  removeFilter = (filterIndex: number) => {
    this.setState(prvState => {
      let defaultIndex;
      const selectedFilters = [...prvState.selectedFilters];
      let numOfFilters = [...prvState.numOfFilters];
      let resultsCounts = [...prvState.resultsCounts];
      if (numOfFilters.length > 1) {
        numOfFilters.splice(numOfFilters.indexOf(filterIndex), 1);
      } else {
        resultsCounts = [];
        defaultIndex = filterIndex === 1 ? 0 : 1;
        numOfFilters = [defaultIndex];
      }

      selectedFilters.splice(this.getFilterIndex(filterIndex), 1);

      return {
        defaultIndex,
        numOfFilters,
        selectedFilters,
        resultsCounts,
      };
    }, this.sendCompliedList);
  };

  getFilterIndex(filterIndex: number) {
    return findIndex(this.state.selectedFilters, filter => {
      return filter.filterIndex === filterIndex;
    });
  }

  addToFilterToList = (filterIndex: number, filterOptions: Object) => {
    this.setState(prvState => {
      const selectedFilters = [...prvState.selectedFilters];
      filterOptions.changed = true;
      const lastIndex = filterIndex;
      const isFilterUndefined = !!(this.getFilterIndex(filterIndex) === -1);
      const data = { ...filterOptions, filterIndex };
      if (isFilterUndefined) {
        selectedFilters.push(data);
      } else {
        selectedFilters[filterIndex] = data;
      }

      return { selectedFilters, lastIndex };
    }, this.sendCompliedList);
  };

  sendCompliedList() {
    this.props.onChange(this.state.selectedFilters);
  }

  renderFilterOptions() {
    const { numOfFilters } = this.state;
    const label = numOfFilters.length === 1 ? 'Clear' : 'Delete';
    return numOfFilters.map(x => (
      <TableFilter
        key={x}
        filterIndex={x}
        onChange={this.addToFilterToList}
        onDelete={this.removeFilter}
        label={label}
        totalRows={this.state.resultsCounts[x]}
        filters={this.props.filters}
      />
    ));
  }

  render() {
    return (
      <FilterWrapStyled className="cko-table-filter">
        {this.renderFilterOptions()}
        <AddFilterStyled onClick={this.addMoreFilter}>
          <span />
        </AddFilterStyled>
      </FilterWrapStyled>
    );
  }
}
