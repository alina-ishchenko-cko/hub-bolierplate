// @flow
import * as React from 'react';
import { formatNumber } from 'utils/ui.util';
import { WrapStyled } from './styled/CkoCurrencyFormat.sc';

type Props = {
  prefix?: string | React.Node,
  suffix?: string | React.Node,
  value: number,
  currencyName?: string,
  shorten?: boolean,
};

export default class CkoCurrencyFormat extends React.Component<Props> {
  render() {
    return (
      <WrapStyled className="cko-currency-format">
        {this.props.prefix && (
          <span className="prefix">{this.props.prefix}&nbsp;</span>
        )}
        {formatNumber(
          this.props.value,
          this.props.currencyName,
          this.props.shorten
        )}
        {this.props.suffix && (
          <span className="suffix">&nbsp;{this.props.suffix}</span>
        )}
      </WrapStyled>
    );
  }
}
