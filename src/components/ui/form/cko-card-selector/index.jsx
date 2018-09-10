// @flow
import * as React from 'react';
import CkoSelect from 'components/ui/form/CkoSelect';
import CkoIcon from 'components/ui/icon';
import moment from 'moment';
import { CardLabelStyled } from './CkoCardSelector.sc';

type Props = {
  form: Object,
  cards: Array<Object>,
  onChange?: Function,
  initialValue?: string,
};

export default class CkoCardSelector extends React.Component<Props> {
  getCardOptions(): Array<Object> {
    const { cards = [] } = this.props;
    return cards.map(card => {
      return {
        key: `${card.id}`,
        label: this.renderLabel(card),
        value: card.id.toLowerCase(),
      };
    });
  }

  renderLabel = (card: Object) => {
    return (
      <CardLabelStyled>
        <div className="card-number">
          <CkoIcon type="scheme" name={`${card.paymentMethod}-small`} />
          {card.last4}
        </div>
        <div className="card-expiry-date">
          {moment(`01/${card.expiryMonth}/${card.expiryYear}`, 'DD/MM/YYYY')
            .format('DD/MM/YY')
            .substring(3)}
        </div>
      </CardLabelStyled>
    );
  };

  render() {
    const { form } = this.props;
    return (
      <CkoSelect
        data={this.getCardOptions()}
        id="cardId"
        form={form}
        label="Card"
        required
        size="large"
        onChange={this.props.onChange}
        initialValue={this.props.initialValue || void 0}
      />
    );
  }
}
