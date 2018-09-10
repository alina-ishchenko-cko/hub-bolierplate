// @flow
import * as React from 'react';
import CkoLoading from 'components/ui/loading/';
import CkoSwitch from 'components/ui/switch/';
import {
  CardWrapStyled,
  ValueWrapStyled,
  CardValueStyled,
  CurrencyStyled,
  TitleStyled,
  SubTitleStyled,
} from './styled/CkoCard.sc';

type Props = {
  loading: boolean,
  title: string,
  subTitle?: string,
  currency?: string,
  value: string,
  switchBtn: {
    btnLabel: Array<string>,
    defaultChecked: boolean,
    onToggleBtn: Function,
  },
  id: string,
  className: string,
};

export default class CkoCard extends React.Component<Props> {
  render() {
    const { switchBtn, title, subTitle, currency, loading } = this.props;
    const props = {};
    if (this.props.id) props.id = this.props.id;
    if (this.props.className) props.className = this.props.className;

    return (
      <CardWrapStyled {...props}>
        {/* Loading */}
        {loading && <CkoLoading circle />}

        {/* Values eg. 2000 eur */}
        {!loading && (
          <ValueWrapStyled switchBtn={switchBtn !== void 0}>
            <CardValueStyled className="amount">
              {this.props.value}
            </CardValueStyled>
            {currency && (
              <CurrencyStyled className="currency">{currency}</CurrencyStyled>
            )}
          </ValueWrapStyled>
        )}

        {/* Switch button */}
        {!loading && switchBtn && <CkoSwitch {...switchBtn} />}
        <div className="clear" />

        {/* Title and Sub-title */}
        {!loading &&
          title && <TitleStyled className="title">{title}</TitleStyled>}
        {!loading &&
          subTitle && (
            <SubTitleStyled className="sub-title">{subTitle}</SubTitleStyled>
          )}
      </CardWrapStyled>
    );
  }
}
