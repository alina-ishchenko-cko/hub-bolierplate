// @flow
import * as React from 'react';
import CkoInput from 'components/ui/form/CkoInput';
import CkoCVV from 'components/ui/form/CkoCVV';
import CkoCardExpiry from 'components/ui/form/CkoCardExpiry';
import CkoIcon from 'components/ui/icon/';
import * as payment from 'services/payment/cardService';
import {
  ContainerStyled,
  CardCVVStyled,
  CardNumStyled,
  CardExpStyled,
} from './styled/CkoCardDetails.sc';

type Props = {
  required: boolean,
  id: string,
  label?: string,
  form: Object,
};

type State = {
  cardType: string,
  cardNumValid: boolean,
};

const CARD_DATE_ID = 'cardExpDate';
const CARD_CVV_ID = 'cardCvv';

export default class CkoCardDetails extends React.Component<Props, State> {
  state = { cardType: '', cardNumValid: false };

  handleFocus = () => {
    this.setState({ cardNumValid: false });
  };

  // Format the card number
  setCardType = (e: Object) => {
    const { value } = e.target;
    const card = payment.cardFromNumber(value);
    if (card && this.state.cardType !== card.type) {
      this.setState({ cardType: card.type });
    }
  };

  formatCardNumber = (e: Object) => {
    let card,
      digit,
      length,
      re,
      upperLength = 16,
      value;

    digit = String.fromCharCode(e.which);
    if (!/^\d+$/.test(digit)) {
      return;
    }

    const element = e.target;
    value = e.target.value;
    card = payment.cardFromNumber(value + digit);

    length = (value.replace(/\D/g, '') + digit).length;

    if (card) {
      upperLength = card.length[card.length.length - 1];
    }
    if (length >= upperLength) {
      return;
    }
    if (
      element.selectionStart !== null &&
      element.selectionStart !== value.length
    ) {
      return;
    }
    if (card && card.type === 'amex') {
      re = /^(\d{4}|\d{4}\s\d{6})$/;
    } else {
      re = /(?:^|\s)(\d{4})$/;
    }

    if (re.test(value)) {
      e.preventDefault();
      element.value = value + ' ' + digit;
    } else if (re.test(value + digit)) {
      e.preventDefault();
      element.value = value + digit + ' ';
    }
  };

  handleKeyPress = (e: Object) => {
    this.restrictCardNumber(e);
    this.setCardType(e);
  };

  // Limit the input
  restrictCardNumber = (e: Object) => {
    let card, value;
    const digit = String.fromCharCode(e.which);
    const element = e.target;

    if (!/^\d+$/.test(digit)) {
      e.preventDefault();
    }
    if (payment.hasTextSelected(element)) {
      e.preventDefault();
    }

    value = (element.value + digit).replace(/\D/g, '');
    card = payment.cardFromNumber(value);
    if (card && value.length > card.length[card.length.length - 1]) {
      e.preventDefault();
      this.focusOnCardDateField();
    }
  };

  focusOnCardDateField = () => {
    const doc: Object = document;
    const cardNumberElement = doc.getElementById(this.props.id);
    if (payment.validateCardNumber(cardNumberElement.value)) {
      const cardDateElement = doc.getElementById(CARD_DATE_ID);
      const cardCvvElement = doc.getElementById(CARD_CVV_ID);
      const cardExp = cardDateElement.value.split('/');
      if (!payment.isCardDateValid(cardExp[0], cardExp[1])) {
        cardDateElement.focus();
      } else if (!cardCvvElement.value) {
        cardCvvElement.focus();
      }
    }
  };

  // Validate card number
  validateInput = (rule: Object, value: string, callback: Function) => {
    if (value) {
      if (!payment.validateCardNumber(value)) {
        this.setState({ cardNumValid: false });
        return callback('Card details invalid');
      } else {
        this.setState({ cardNumValid: true });
        return callback();
      }
    }
    return callback();
  };

  // Get the card scheme icon
  get renderCardIcon() {
    if (!this.state.cardType) {
      return null;
    }
    return <CkoIcon type="scheme" name={`${this.state.cardType}-small`} />;
  }

  reFormatCardNumber = (e: Object) => {
    const element = e.target;
    setTimeout(() => {
      let value = element.value;
      value = payment.formatCardNumber(value);
      element.value = value;
    });
  };

  handleBlur = (e: Object) => {
    this.setCardType(e);
  };

  render() {
    const { form } = this.props;
    const props = {
      ...this.props,
      rules: { validator: this.validateInput },
      size: 'large',
      prefix: this.renderCardIcon,
      onKeyPress: this.handleKeyPress,
      onKeyDown: this.formatCardNumber,
      placeholder: 'xxxx xxxx xxxx xxxx',
      onPaste: this.reFormatCardNumber,
      onFocus: this.handleFocus,
      onBlur: this.handleBlur,
    };
    props.label = '';

    const collapse = this.state.cardNumValid;

    return (
      <ContainerStyled className="cko-card-details">
        <label>{this.props.label}</label>
        <div className="card-details-wrap">
          <CardNumStyled collapse={collapse}>
            <CkoInput {...props} />
          </CardNumStyled>
          <CardExpStyled collapse={collapse}>
            <CkoCardExpiry
              required
              id={CARD_DATE_ID}
              cardNumberId={this.props.id}
              cardCvvId={CARD_CVV_ID}
              form={form}
              size="large"
              placeholder="MM/YY"
              className="exp-field"
            />
          </CardExpStyled>
          <CardCVVStyled collapse={collapse}>
            <CkoCVV
              required
              id={CARD_CVV_ID}
              cardDetailsId={this.props.id}
              form={form}
              placeholder="CVV"
              size="large"
              className="cvv-field"
            />
          </CardCVVStyled>
        </div>
      </ContainerStyled>
    );
  }
}
