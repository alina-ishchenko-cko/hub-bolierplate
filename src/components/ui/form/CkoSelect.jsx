// @flow
import * as React from 'react';
// import isEqual from 'lodash/isEqual';
import classNames from 'classnames';
import CkoLoading from 'components/ui/loading/';
import { FormItemStyled } from './styled';
import { FormRowStyled, SelectStyled } from './styled/CkoSelect.sc';

type Props = {
  id?: string,
  form?: {
    setFieldsValue: Function,
    getFieldDecorator: Function,
    getFieldError: Function,
    getFieldValue: Function,
  },
  loading?: boolean,
  showSearch?: boolean,
  data: Array<Object>,
  optionFilterProp?: string,
  size?: string,
  checkAgainst?: string,
  initialValue?: string,
  rules?: Object,
  noFormItem?: boolean,
  required?: boolean,
  className?: string,
  placeholder?: string | React.Node,
  label?: string,
  message?: string,
  onChange?: Function,
  disabled?: boolean,
};

type State = {
  filteredData: Array<any>,
  toIndex: number,
  showDropDown: boolean,
  optionValue: string,
  hasError: boolean,
};

export default class CkoSelect extends React.Component<Props, State> {
  wrapperRef: ?HTMLElement;
  state = {
    filteredData: [],
    toIndex: 20,
    showDropDown: false,
    optionValue: '',
    hasError: false,
  };

  /**
   * Init the form field with key
   */
  setUpFormField() {
    if (this.props.form) {
      this.props.form.getFieldDecorator(this.props.id, {
        initialValue: this.props.initialValue,
        rules: [
          {
            required: this.props.required,
            message: this.props.message,
          },
        ],
      });
    }
  }

  componentDidMount() {
    this.refs.listScroll.addEventListener('scroll', this.infiniteScroll);
    window.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    this.refs.listScroll.removeEventListener('scroll', this.infiniteScroll);
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.form && this.props.required && !this.state.hasError) {
      const errorField = nextProps.form.getFieldError(this.props.id);
      if (errorField !== void 0) {
        this.updateErrorStatus(true);
      }
    }
  }

  handleClickOutside = (e: Object) => {
    if (
      this.state.showDropDown &&
      this.wrapperRef &&
      !this.wrapperRef.contains(e.target)
    ) {
      this.resetState();
    }
  };

  /**
   * Reset the UI state
   */
  resetState = () => {
    this.setState({
      filteredData: [],
      toIndex: 20,
      showDropDown: false,
    });
  };

  /**
   * Infinite Scroll
   * Increment the toIndex by 20 in the list scroll
   */
  infiniteScroll = (e: any) => {
    const ulNode = e.target;
    const dataLength = this.props.data.length;

    if (ulNode && this.state.toIndex < dataLength) {
      const { scrollHeight, clientHeight, scrollTop } = ulNode;
      const breakPoint = scrollHeight * 0.2;
      const isEndOfScroll =
        scrollHeight - scrollTop - breakPoint <= clientHeight;

      if (isEndOfScroll) {
        // Increment toIndex by 20
        this.setState(prevState => {
          let toIndex = prevState.toIndex + 20;
          if (toIndex >= dataLength) {
            toIndex = dataLength;
          }
          return { toIndex };
        });
      }
    }
  };

  //Only update the component if props or state changes
  // shouldComponentUpdate(nextProps: Props, nextState: State) {
  //   return (
  //     !isEqual(nextProps.data, this.props.data) ||
  //     !isEqual(nextState, this.state)
  //   );
  // }

  handleFilterData = (e: SyntheticEvent<HTMLInputElement>) => {
    const { optionFilterProp } = this.props;
    const keyword = e.currentTarget.value.toLowerCase();
    let filteredData = [];
    if (keyword !== '') {
      filteredData = this.props.data.filter(
        data =>
          data[optionFilterProp || 'value'].toLowerCase().search(keyword) > -1
      );
    }
    this.setState({ filteredData, toIndex: 20 });
  };

  /**
   * Sort array
   */
  sortList(list: Array<Object>, sortOption?: string = 'asc') {
    const sortedList = [...list];

    if (!sortedList.length) {
      return [];
    }

    sortedList.sort((a, b) => {
      const valueA = a.value.toLowerCase();
      const valueB = b.value.toLowerCase();
      if (sortOption === 'asc') {
        if (valueA < valueB) return -1;
        if (valueA > valueB) return 1;
      } else {
        if (valueA > valueB) return -1;
        if (valueA < valueB) return 1;
      }
      return 0;
    });
    return sortedList;
  }

  /**
   * Handle option click event
   * Set the selection value
   */
  setSelectionValue = (e: Object) => {
    e.preventDefault();
    e.stopPropagation();
    const optionValue = e.target.getAttribute('data-value');
    this.toggleDropDown(null);

    this.setState({ optionValue });

    if (this.props.form) {
      const data = {};
      if (this.props.id) {
        data[this.props.id] = optionValue;
        this.updateErrorStatus(false);
      }
      this.props.form.setFieldsValue(data);
    }

    // Check if onChange exist and pass the value
    if (this.props.onChange) {
      this.props.onChange(optionValue);
    }
  };

  updateErrorStatus(hasError: boolean = false) {
    this.setState({ hasError });
  }

  /**
   * Get the select value
   */
  getDefaultValue() {
    const { optionValue } = this.state;

    // Check for default value or placeholder value
    const value = optionValue ? optionValue : this.props.initialValue || '';
    if (!value) {
      return this.props.placeholder || 'Select option';
    }

    const optionSelected = this.props.data.filter(data => {
      return data.value.toLowerCase() === value.toLowerCase();
    });

    // Show selected value label
    return !optionSelected.length ? '' : optionSelected[0].label;
  }

  /**
   * Toggle dropdown state
   */
  toggleDropDown = (e: ?Object) => {
    if (e && e.preventDefault) {
      e.preventDefault();
      e.stopPropagation();
    }
    this.setState(prevState => {
      const showDropDown = !prevState.showDropDown;
      if (showDropDown && this.props.showSearch) {
        this.focusOnInputField();
      }
      return { showDropDown };
    });
  };

  /**
   * Focus on input field
   */
  focusOnInputField() {
    setTimeout(() => {
      this.refs.inputNode.focus();
    }, 100);
  }

  /**
   * Create select options
   */
  renderOptions = () => {
    const { filteredData, optionValue } = this.state;
    let list = !filteredData.length ? [...this.props.data] : [...filteredData];
    if (!list.length) {
      return null;
    }

    // For performance reasons, show the first toIndex
    // E.g 0,20 will show the first 20
    list = this.sortList(list).splice(0, this.state.toIndex);
    return list.map(data => {
      const listClassName = classNames({
        'ant-select-dropdown-menu-item': true,
        'ant-select-dropdown-menu-item-selected': data.value === optionValue,
      });
      return (
        <li
          key={data.key}
          data-value={data.value}
          onClick={this.setSelectionValue}
          role="menuitem"
          unselectable="unselectable"
          className={listClassName}>
          {data.label}
        </li>
      );
    });
  };

  renderSelect = () => {
    const className = {
      selectContainer: classNames({
        'select-container': true,
        'ant-select': true,
        'select-open': this.state.showDropDown,
      }),
      valueWrap: classNames({
        'value-wrap': true,
        hide: false,
      }),
      searchFieldWrap: classNames({
        'search-field-wrap': true,
        hide: !this.state.showDropDown,
      }),
      listContainer: classNames({
        listContainer: true,
        hide: !this.state.showDropDown,
      }),
    };

    return (
      <SelectStyled
        size={this.props.size || 'default'}
        disabled={this.props.disabled || false}
        className="cko-select">
        <div
          className={className.selectContainer}
          ref={node => (this.wrapperRef = node)}>
          {/* Loader */}
          {this.props.loading && <CkoLoading size="small" />}

          {/* Value */}
          <div className={className.valueWrap} onClick={this.toggleDropDown}>
            <span className="option-value">{this.getDefaultValue()}</span>
            <span className="ant-select-arrow" unselectable="unselectable">
              <b />
            </span>
          </div>

          {/* Input field */}
          {this.props.showSearch && (
            <div className={className.searchFieldWrap}>
              <input
                ref="inputNode"
                type="text"
                className="select-search-field"
                onChange={this.handleFilterData}
              />
            </div>
          )}

          {/* List */}
          <div className={className.listContainer}>
            <div className="ant-select-dropdown">
              <ul
                ref="listScroll"
                className="ant-select-dropdown-menu ant-select-dropdown-menu-vertical">
                {this.renderOptions()}
              </ul>
            </div>
          </div>
        </div>
      </SelectStyled>
    );
  };

  render() {
    // This is required to add the key to the form data
    this.setUpFormField();

    const { label } = this.props;
    const withError = this.state.hasError ? 'has-error' : '';
    const className = `ant-row ant-form-item ${withError} ${this.props
      .className || ''}`;

    // Render the Select tag without form
    if (!this.props.form) {
      return this.renderSelect();
    }

    // Render without FormItem wrap
    if (this.props.noFormItem === true) {
      return this.renderSelect();
    }

    return (
      <FormItemStyled>
        <FormRowStyled className={className}>
          {label && (
            <div className="ant-form-item-label">
              <label htmlFor={this.props.id} title={label}>
                {label}
              </label>
            </div>
          )}
          <div className="ant-form-item-control-wrapper">
            <div className="ant-form-item-control">{this.renderSelect()}</div>
          </div>
        </FormRowStyled>
      </FormItemStyled>
    );
  }
}
