// @flow
import * as React from 'react';
import debounce from 'lodash/debounce';
import CkoIcon from 'components/ui/icon/';
import CkoInput from 'components/ui/form/CkoInput';

type Props = {
  onSearch: Function,
  placeholder: string,
  defaultValue: string,
};

export default class TableSearch extends React.PureComponent<Props> {
  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.defaultValue === '') {
      this.clearInputValue();
    }
  }

  clearInputValue = () => {
    const searchInput: any = document.querySelector('#search');
    if (searchInput) {
      searchInput.value = '';
    }
  };

  onSearch = (e: SyntheticEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    this.handleSearch(value);
  };

  clearSearch = () => {
    this.handleSearch('');
  };

  renderClear = () => {
    if (!this.props.defaultValue) {
      return null;
    }
    return (
      <span className="clear-search" onClick={this.clearSearch}>
        clear
      </span>
    );
  };

  /**
   * Creates a debounced function that delays invoking handleSearch() method
   * @returns Returns the new debounced function.
   */
  handleSearch = debounce((value: string) => {
    this.props.onSearch(value);
  }, 300);

  render() {
    return (
      <CkoInput
        id="search"
        prefix={<CkoIcon name="search" />}
        suffix={this.renderClear()}
        placeholder={this.props.placeholder}
        defaultValue={this.props.defaultValue}
        onChange={this.onSearch}
      />
    );
  }
}
