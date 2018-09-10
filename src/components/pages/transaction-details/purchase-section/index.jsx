// @flow
import * as React from 'react';
import Product from './product/';
import ContentList from 'components/ui/layout/ContentList';
import { FlexItem, FlexRow } from 'components/ui/flex/';
import { formatNumber, blankValue } from 'utils/ui.util';

type Props = {
  addressLineOne: string,
  addressLineTwo: string,
  currencyName: string,
  city: string,
  country: string,
  postCode: string,
  description: string,
  products: Array<Object>,
};

export default class PurchaseSection extends React.PureComponent<Props> {
  renderProducts() {
    return this.props.products.map((prod, key) => {
      const total = formatNumber(prod.totalPrice, this.props.currencyName);
      return (
        <Product
          key={`prod-${key}`}
          imgSrc={prod.productImage}
          title={prod.productName}
          sku={prod.sku}
          quantity={`${prod.quantity} x ${total}`}
          total={total}
        />
      );
    });
  }

  renderAddress() {
    if (!this.props.addressLineOne) {
      return <address>{blankValue}</address>;
    }

    return (
      <address>
        {this.props.addressLineOne} {this.props.addressLineTwo} <br />
        {this.props.city} {this.props.country},{' '}
        {this.props.postCode.toUpperCase()}
      </address>
    );
  }
  render() {
    return (
      <ContentList title="Purchase Details">
        <FlexRow margin="0 0 30px 0">
          <FlexItem>
            <label>Shipping Address</label>
            {this.renderAddress()}
          </FlexItem>
          <FlexItem>
            <label>Description</label>
            <p>{this.props.description}</p>
          </FlexItem>
        </FlexRow>
        <FlexItem>{this.renderProducts()}</FlexItem>
      </ContentList>
    );
  }
}
