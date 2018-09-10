// @flow
import * as React from 'react';
import CkoInput from 'components/ui/form/CkoInput';
import * as payment from 'services/payment/cardService';

type Props = {
  form?: any,
  rules?: {
    validator: Function,
  },
  cardDetailsId?: string,
  onKeyUp?: Function,
  onKeyPress?: Function,
  id?: string,
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

export default class CkoCVV extends React.Component<Props> {
  getCardType = () => {
    if (this.props.form) {
      const values = this.props.form.getFieldValue(this.props.cardDetailsId);
      return payment.cardFromNumber(values);
    }
    return null;
  };

  handleKeyPress = (e: SyntheticKeyboardEvent<any>) => {
    // Prevents non-numeric characters entered
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

  handleValidation = (rule: any, value: string, callback: Function) => {
    if (value) {
      const cardField = this.getCardType();

      if (!cardField) {
        return callback();
      }

      const cardType = cardField.type;
      if (
        (!cardType && value.length < 3) ||
        !payment.validateCardCVC(value, cardType)
      ) {
        return callback('CVV invalid');
      }
    }
    return callback();
  };

  render() {
    const props = {
      ...this.props,
      onKeyPress: this.handleKeyPress,
      rules: { validator: this.handleValidation },
    };

    delete props.cardDetailsId;

    return <CkoInput {...props} />;
  }
}
