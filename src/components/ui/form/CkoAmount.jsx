// @flow
import * as React from 'react';
import CkoInput from 'components/ui/form/CkoInput';
import CkoCurrencies from 'components/ui/form/CkoCurrencies';
import { ContainerStyled } from './styled/CkoAmount.sc';
import numeral from 'numeral';
import { isUndefined } from 'utils';
import isEmpty from 'lodash/isEmpty';
import { CkoCol } from 'components/ui/grid';
import { CkoFormGroup } from './styled';
import { currencyService } from 'services/currency/currencyService';

type Props = {
  id: string,
  size?: string,
  form?: Object,
  loading?: boolean,
  currencyIds?: Array<number>,
  currencyName: string,
  maxValue?: number,
  defaultValue?: string | number,
  onBlur?: Function,
};
export default class CkoAmount extends React.Component<Props> {
  currency: Object = {};
  hasCurrencyIds(): boolean {
    return !!(this.props.currencyIds !== void 0);
  }

  setCurrency(): void {
    const { form } = this.props;
    let currencyName = this.props.currencyName;
    if (form && !currencyName) {
      currencyName = form.getFieldValue('currency');
    }
    this.currency = currencyService.wrap(currencyName);
  }

  addCommas(nStr: string): string {
    return nStr.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  removeCommas(value: string): string {
    return value.replace(/,\s?/g, '');
  }

  handleInputBlur = (e: any) => {
    this.setCurrency();

    const value = e.target.value;
    const format = this.currency ? this.currency.getFormatter() : null;
    if (!isEmpty(value) && !isUndefined(value) && format) {
      let formatWithDecimals = numeral(value).format(format);
      let formattedValue = this.addCommas(formatWithDecimals);

      if (this.props.form !== void 0) {
        this.props.form.setFieldsValue({
          [this.props.id]: formattedValue,
        });
      }
      e.target.value = formattedValue;
    } else {
      e.target.value = '0.00';
    }

    if (this.props.onBlur) {
      this.props.onBlur(e.target.value);
    }
  };

  clearInputField = (e: any) => {
    const value = e.target.value;
    if (value === '0.00') {
      e.target.value = '';
    }
  };

  compareMaxValue = (rule: Object, value: string, callback: Function) => {
    this.setCurrency();

    const { defaultValue } = this.props;
    const inputValue = parseFloat(this.removeCommas(value));
    const maxValue = this.currency.convertToCents(this.props.maxValue);
    const valueToCents = this.currency.convertToCents(inputValue);

    //If input type is number, check if value is valid
    if (isNaN(inputValue)) {
      callback('Please enter valid number');
      return;
    } else if (valueToCents > maxValue && defaultValue) {
      callback(
        `Max amount is ${this.props.currencyName || ''} ${defaultValue}`
      );
    } else if (valueToCents !== maxValue && valueToCents === 0) {
      callback('Invalid amount');
      return;
    }
    callback();
  };

  render() {
    const inputProps: Object = {
      ...this.props,
      type: 'amount',
      placeholder: '0.00',
      onBlur: this.handleInputBlur,
      onFocus: this.clearInputField,
    };

    if (!isUndefined(this.props.maxValue)) {
      inputProps.rules = {
        validator: this.compareMaxValue,
      };
    }

    // Remove props after to avoid DOM error
    delete inputProps.maxValue;
    delete inputProps.currencyIds;
    delete inputProps.currencyName;
    delete inputProps.isPartial;

    // Only return the amount field
    // when currencyIds does not exist
    if (!this.hasCurrencyIds()) {
      return <CkoInput {...inputProps} />;
    }

    return (
      <ContainerStyled className="cko-amount">
        <CkoFormGroup>
          <CkoCol span={9}>
            <CkoCurrencies
              id="currency"
              label="Currency"
              form={this.props.form}
              size={this.props.size}
              loading={this.props.loading}
              currencyIds={this.props.currencyIds}
              initialValue={this.props.currencyName}
            />
          </CkoCol>
          <CkoCol span={15}>
            <CkoInput {...inputProps} />
          </CkoCol>
        </CkoFormGroup>
      </ContainerStyled>
    );
  }
}
