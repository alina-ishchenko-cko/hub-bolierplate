// @flow
import * as React from 'react';
import CkoInput from './CkoInput';
import CkoSelect from './CkoSelect';
import CkoIcon from 'components/ui/icon/';
import { CkoCol } from 'components/ui/grid';
import { CkoFormGroup } from './styled';
import { ContainerStyled } from './styled/CkoPhoneNumber.sc';

type Props = {
  required?: boolean,
  form: Object,
  label: string,
  countries: Array<Object>,
  defaultValue: {
    number: string,
    countryCode: string,
  },
};

export default class CkoPhoneNumber extends React.Component<Props> {
  static defaultProps = {
    countries: [],
  };

  static defaultProps = {
    defaultValue: {
      number: '',
      countryCode: '',
    },
  };

  composeValueForCountrySelect = (country: any) => {
    return `${country.countryPhoneCode || ''}-${country.countryIso2Code}`;
  };

  mapCountriesToData() {
    const exceptions = ['QZ', 'VC', 'AC', 'TA', 'AN'];
    return this.props.countries
      .filter(
        data =>
          data.countryPhoneCode && !exceptions.includes(data.countryIso2Code)
      )
      .map((data, key) => {
        return {
          key,
          value: this.composeValueForCountrySelect(data),
          countryName: data.name,
          label: (
            <span>
              <CkoIcon type="flag" name={data.countryIso2Code} />
              <span>{data.countryPhoneCode}</span>
            </span>
          ),
        };
      });
  }

  render() {
    const { form } = this.props;
    let initialValue = void 0;
    const { countryCode } = this.props.defaultValue;

    if (countryCode) {
      const initialCountry = this.props.countries.find(
        country => country.countryPhoneCode === countryCode
      );
      initialValue = this.composeValueForCountrySelect(initialCountry);
    }

    return (
      <ContainerStyled>
        <label>{this.props.label}</label>
        <CkoFormGroup>
          <CkoCol span={9}>
            <CkoSelect
              noFormItem
              showSearch
              form={form}
              size="large"
              initialValue={initialValue}
              id="phoneCountryCode"
              data={this.mapCountriesToData()}
              optionFilterProp="countryName"
              placeholder={
                <span>
                  <CkoIcon name="" />
                  <span className="placeholder-value">XX</span>
                </span>
              }
            />
          </CkoCol>
          <CkoCol span={15}>
            <CkoInput
              required={this.props.required}
              id="phoneNumber"
              min="5"
              type="number"
              placeholder="7912345110"
              size="large"
              form={form}
              defaultValue={this.props.defaultValue.number}
            />
          </CkoCol>
        </CkoFormGroup>
      </ContainerStyled>
    );
  }
}
