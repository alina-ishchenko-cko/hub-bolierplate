// @flow
import * as React from 'react';
import {
  FilterListStyled,
  FilterActionsStyled,
  FilterFieldStyled,
  ClearBtnStyled,
  ResultsStyled,
} from './TableFilter.sc';
import find from 'lodash/find';
import isEmpty from 'lodash/isEmpty';
import classNames from 'classnames';
import debounce from 'lodash/debounce';
import CkoInput from 'components/ui/form/CkoInput';
import CkoButton from 'components/ui/button';
import CkoSelect from 'components/ui/form/CkoSelect';
import { FILTER_ACTIONS } from 'utils/ui.util';

interface IFieldsData {
  key?: string;
  value?: string;
  type?: string;
  label?: string;
  actions?: Array<string>;
  selectionOptions?: Array<Object>;
}

type Props = {
  label: string,
  totalRows: number,
  filterIndex: number,
  onDelete: Function,
  onChange: Function,
  filters: Array<Object>,
};

type State = {
  selectedField: IFieldsData,
  filterParams: {
    action?: string,
    field: string,
    operator: string,
    value: string,
    type: string,
  },
};

export default class TableFilter extends React.PureComponent<Props, State> {
  state = {
    selectedField: {},
    filterParams: {
      action: FILTER_ACTIONS.SHOW,
      field: '',
      operator: '',
      value: '',
      type: 'string',
    },
  };
  keywordHandler = debounce(this.keywordHandler, 300);

  /**
   * Filter state operations
   */
  getSelectionOptions(): Array<any> {
    const { selectedField } = this.state;

    // if selected filter already has selection options
    // then show them instead of showing actions
    if (selectedField.selectionOptions) {
      return selectedField.selectionOptions;
    }

    const defaultActions = ['CONTAINS', 'EQUALS', 'BEGINS', 'ENDS'];
    const actions = [
      {
        key: 'CONTAINS',
        value: FILTER_ACTIONS.CONTAINS,
        label: 'Containing',
      },
      {
        key: 'EQUALS',
        value: FILTER_ACTIONS.EQUALS,
        label: selectedField.type === 'number' ? 'Equals' : 'Exactly matching',
      },
      {
        key: 'BEGINS',
        value: FILTER_ACTIONS.BEGINS,
        label: 'Begins with',
      },
      {
        key: 'ENDS',
        value: FILTER_ACTIONS.ENDS,
        label: 'Ends with',
      },
      {
        key: 'GT',
        value: FILTER_ACTIONS.GT,
        label: 'Greater than',
      },
      {
        key: 'GTE',
        value: FILTER_ACTIONS.GTE,
        label: 'Greater than equal',
      },
      {
        key: 'LT',
        value: FILTER_ACTIONS.LT,
        label: 'Less than',
      },
      {
        key: 'LTE',
        value: FILTER_ACTIONS.LTE,
        label: 'Less than equal',
      },
    ];
    const selectedActions = selectedField.actions || defaultActions;

    return actions.filter(
      action => !!(selectedActions && selectedActions.includes(action.key))
    );
  }

  /**
   * Handle the action button event
   * Set the filterParams UI state { action }
   */
  handleFilterAction = (action: string) => {
    this.setState(
      prvState => ({
        filterParams: {
          ...prvState.filterParams,
          action,
        },
      }),
      this.callOnChangeProps
    );
  };

  /**
   * Handle the filter field event
   * Set the filterParams UI state { field and type }
   */
  handleFilterField = (fieldKey: string): void => {
    const selectedField =
      find(this.props.filters, x => x.key === fieldKey) || {};

    if (!isEmpty(selectedField)) {
      this.setState(prvState => {
        const filterParams = { ...prvState.filterParams };
        filterParams.field = selectedField.key || '';
        filterParams.type = selectedField.type || '';
        filterParams.operator = '';
        filterParams.value = '';

        return {
          selectedField,
          filterParams,
        };
      });
    }
  };

  /**
   * Handles the filter operator field change
   */
  updateStateFilterParams = (selectedOption: string) => {
    this.setState(prvState => {
      const filterParams = { ...prvState.filterParams };
      const selectedField = prvState.selectedField;

      // if selectedOption is not an action
      // but the value from filter selectionOptions
      // then we filter table by this value
      if (selectedField.selectionOptions) {
        filterParams.value = selectedOption;
        // set operator to EQUALS because
        // we search table rows where
        // filtered column value equals selectedOption
        filterParams.operator = FILTER_ACTIONS.EQUALS;
      } else {
        filterParams.operator = selectedOption;
      }

      return { filterParams };
    }, this.callOnChangeProps);
  };

  /**
   * Handle the keyword input
   */
  handleFilterKeyword = (event: SyntheticEvent<HTMLInputElement>) => {
    this.keywordHandler(event.currentTarget.value);
  };

  /**
   * Adds a delay to keypress event and then update
   * Set the filterParams state { value }
   */
  keywordHandler(value: string) {
    this.setState(prvState => {
      return {
        filterParams: {
          ...prvState.filterParams,
          value,
        },
      };
    }, this.callOnChangeProps);
  }

  /**
   * Delete filter and then reset
   */
  handleFilterDelete = (e: SyntheticEvent<HTMLButtonElement>) => {
    e.preventDefault();
    this.props.onDelete(this.props.filterIndex);
    this.resetFilter();
  };

  /**
   * Trigger the onChange callback
   * and passes the filter params as array param
   */
  callOnChangeProps(): void {
    const { filterParams } = this.state;

    if (
      !isEmpty(filterParams.value) &&
      (filterParams.field && filterParams.field !== 'Select field') &&
      (filterParams.operator && filterParams.operator !== 'Select state')
    ) {
      this.props.onChange(this.props.filterIndex, filterParams);
    }
  }

  /**
   * Reset to default values
   */
  resetFilter() {
    this.setState({
      filterParams: {
        action: FILTER_ACTIONS.SHOW,
        field: 'Select field',
        operator: 'Select state',
        value: '',
        type: 'string',
      },
    });
  }

  /**
   * Disable keyword input if selected filter
   * already provided selection options (values to filter by)
   */
  disableKeywordField() {
    return !!this.state.selectedField.selectionOptions;
  }

  /**
   * Render the total results returned
   */
  renderTotalResults(): string {
    const { totalRows } = this.props;
    if (!totalRows) {
      return 'No results';
    }
    return `${totalRows} results`;
  }

  getKeywordInputPlaceholder() {
    return this.state.selectedField.type === 'number'
      ? '0000.00'
      : 'Enter keyword';
  }

  render() {
    const { filterParams } = this.state;
    const showBtnClass = classNames({
      'in-active': !!(filterParams.action !== FILTER_ACTIONS.SHOW),
    });
    const hideBtnClass = classNames({
      'in-active': !!(filterParams.action !== FILTER_ACTIONS.HIDE),
    });

    return (
      <FilterListStyled>
        <div className="filter-fields clearfix">
          <FilterActionsStyled className="filter-inline filter-actions">
            <CkoButton
              size="large"
              type="primary"
              value="Show"
              className={showBtnClass}
              dataIndex={FILTER_ACTIONS.SHOW}
              onClick={this.handleFilterAction}
            />
            <CkoButton
              size="large"
              value="Hide"
              className={hideBtnClass}
              type="primary"
              dataIndex={FILTER_ACTIONS.HIDE}
              onClick={this.handleFilterAction}
            />
          </FilterActionsStyled>

          <FilterFieldStyled className="filter-inline filter-field">
            <CkoSelect
              size="large"
              placeholder="Select field"
              data={this.props.filters}
              onChange={this.handleFilterField}
            />
          </FilterFieldStyled>

          <FilterFieldStyled className="filter-inline filter-field">
            <CkoSelect
              showSearch={true}
              size="large"
              placeholder="Select state"
              data={this.getSelectionOptions()}
              onChange={this.updateStateFilterParams}
            />
          </FilterFieldStyled>

          <FilterFieldStyled className="filter-inline filter-field">
            <CkoInput
              size="large"
              placeholder={this.getKeywordInputPlaceholder()}
              onChange={this.handleFilterKeyword}
              disabled={this.disableKeywordField()}
            />
          </FilterFieldStyled>

          <ResultsStyled className="filter-inline filter-results">
            <span>{this.renderTotalResults()}</span>
          </ResultsStyled>
        </div>
        <ClearBtnStyled className="clear-btn" onClick={this.handleFilterDelete}>
          {this.props.label}
        </ClearBtnStyled>
      </FilterListStyled>
    );
  }
}
