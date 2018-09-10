// @flow
import * as React from 'react';
import CkoSelect from './CkoSelect';

type Props = {
  id?: string,
  form?: any,
  required: boolean,
  countries: Array<Object>,
};
export default class CkoCountries extends React.Component<Props> {
  static defaultProps = {
    required: false,
    countries: [],
  };

  // getFieldDependantValue(nextProps) {
  //   const { form, checkAgainst } = nextProps || this.props;

  //   // Check if it is depenedant on form field
  //   const field = form.getFieldValue(checkAgainst);
  //   return field;
  // }

  render() {
    const data = this.props.countries
      .filter(country => country.countryIso2Code !== '')
      .map(country => ({
        key: country.countryIso2Code,
        value: country.countryIso2Code,
        countryName: country.name,
        label: country.name,
      }));

    const props = {
      ...this.props,
      data,
      showSearch: true,
      className: 'min-select-width',
      placeholder: 'Select Country',
      message: 'Please select a country',
      optionFilterProp: 'countryName',
    };

    return <CkoSelect {...props} />;
  }
}
