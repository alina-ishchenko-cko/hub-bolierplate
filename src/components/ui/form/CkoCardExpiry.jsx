// @flow
import * as React from 'react';
import CkoInput from 'components/ui/form/CkoInput';
import {
  validateCardNumber,
  isCardDateValid,
} from 'services/payment/cardService';

type Props = {
  form?: Object,
  rules?: {
    validator: Function,
  },
  onKeyUp?: Function,
  onKeyPress?: Function,
  id: string,
  cardNumberId: string,
  cardCvvId: string,
  defaultValue?: string,
  size?: string,
  type?: string,
  initialValue?: string,
  noFormItem?: boolean,
  required?: boolean,
  className?: string,
  placeholder?: string,
  label?: string,
  message?: string,
  hasFeedback?: boolean,
  onEnter?: Function,
  addonBefore?: string | number | React.Node | Function,
};

export default class CkoCardExpiry extends React.Component<Props> {
  validateInput = (rule: Object, value: string, callback: Function) => {
    if (value) {
      const cardExp = value.split('/');
      let month = cardExp[0];
      let year = cardExp[1];
      if (!isCardDateValid(month, year)) {
        return callback('Expiry details invalid');
      }
    }
    return callback();
  };

  handleKeyPress = (e: SyntheticKeyboardEvent<any>) => {
    // Prevents non-numeric characters entered
    if (e.currentTarget.value.length > 4) {
      e.preventDefault();
      // Focus on the next element
      this.focusOnCardExpField();
      return;
    }

    if (
      e.metaKey ||
      e.ctrlKey ||
      e.which === 0 ||
      e.which < 33 ||
      e.which === 37
    ) {
      e.preventDefault();
    }

    if (e.which === 45) {
      e.preventDefault();
    } else if (/[\d\s]/.test(String.fromCharCode(e.which)) === false) {
      e.preventDefault();
    }
  };

  focusOnCardExpField = () => {
    const doc: Object = document;
    const cardNumberElement = doc.getElementById(this.props.cardNumberId);
    const cardCvvElement = doc.getElementById(this.props.cardCvvId);
    if (!cardCvvElement.value && validateCardNumber(cardNumberElement.value)) {
      cardCvvElement.focus();
    } else {
      cardNumberElement.focus();
    }
  };

  handleKeyUp = (e: Object) => {
    // Handles the formatting
    const { value } = e.target;
    e.target.value = value
      .replace(/^([1-9]\/|[2-9])$/g, '0$1/') // 3 > 03/
      .replace(/^(0[1-9]|1[0-2])$/g, '$1/') // 11 > 11/
      .replace(/^1([3-9])$/g, '01/$1') // 13 > 01/3
      .replace(/^0\/|0+$/g, '0') // 0/ > 0 and 00 > 0
      .replace(/[^\d|^/]*/g, '') // To allow only digits and `/`
      .replace(/\/\//g, '/'); // Prevent entering more than 1 `/'
  };

  render() {
    const { cardNumberId, cardCvvId, ...props } = {
      ...this.props,
      onKeyUp: this.handleKeyUp,
      onKeyPress: this.handleKeyPress,
      rules: { validator: this.validateInput },
    };

    return <CkoInput {...props} />;
  }
}
