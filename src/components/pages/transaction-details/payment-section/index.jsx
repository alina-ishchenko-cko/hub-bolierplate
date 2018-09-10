// @flow
import * as React from 'react';
import CkoIcon from 'components/ui/icon/';
import ContentList from 'components/ui/layout/ContentList';
import { FlexItem, FlexRow } from 'components/ui/flex/';
import { SubStyled } from 'components/ui/layout/styled/ContentList.sc';
import * as payment from 'services/payment/cardService';
import { blankValue } from 'utils/ui.util';

type Props = {
  scheme: string,
  cardHolderName: string,
  issuingCountryIso: string,
  issuingCountry: string,
  issuingBank: string,
  cardNumber: string,
  cvvCheck: string,
  expiryDate: string,
  avsCheck: string,
};

export default class PaymentSection extends React.PureComponent<Props> {
  formatCardNumber() {
    const { cardNumber } = this.props;
    if (cardNumber) {
      const card = payment.cardFromNumber(cardNumber);
      if (card && card.type === 'amex') {
        return cardNumber;
      }
      return this.props.cardNumber.replace(/(.{1,4})/g, '$1 ');
    }
    return '';
  }
  renderCvvCheck() {
    if (this.props.cvvCheck === 'Y') {
      return (
        <p>
          <CkoIcon name="tick" /> Yes{' '}
          <SubStyled>Card verification was done and CVD was valid</SubStyled>
        </p>
      );
    }
    return (
      <p>
        <CkoIcon name="close" /> No
      </p>
    );
  }
  render() {
    return (
      <ContentList title="Payment Details">
        <FlexRow margin="0 0 30px 0">
          <FlexItem>
            <label>Card Holder Name</label>
            <p>{this.props.cardHolderName || blankValue}</p>
          </FlexItem>
          <FlexItem>
            <FlexRow>
              <FlexItem>
                <label>Issuing Country</label>
                <p>
                  <CkoIcon
                    className="cko-flag"
                    type="flag"
                    name={this.props.issuingCountryIso}
                  />
                  {this.props.issuingCountry || blankValue}
                </p>
              </FlexItem>
              <FlexItem>
                <label>Issuing Bank</label>
                <p className="text-capitalize">
                  {this.props.issuingBank.toLowerCase() || blankValue}
                </p>
              </FlexItem>
            </FlexRow>
          </FlexItem>
        </FlexRow>
        <FlexRow margin="0 0 30px 0">
          <FlexItem>
            <label>Card Number</label>
            <p className="ocr-font">
              <CkoIcon
                className="cko-scheme"
                type="scheme"
                name={this.props.scheme}
              />
              {this.formatCardNumber()}
            </p>
          </FlexItem>
          <FlexItem>
            <label>CCV Check</label>
            {this.renderCvvCheck()}
          </FlexItem>
        </FlexRow>
        <FlexRow>
          <FlexItem>
            <label>Card Expiry Date</label>
            <p className="ocr-font">{this.props.expiryDate}</p>
          </FlexItem>
          <FlexItem>
            <label>AVS Check</label>
            <p>{this.props.avsCheck}</p>
          </FlexItem>
        </FlexRow>
      </ContentList>
    );
  }
}
