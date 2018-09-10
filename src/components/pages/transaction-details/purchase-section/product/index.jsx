// @flow
import * as React from 'react';
import {
  ImgWrapStyled,
  TitleStyled,
  LabelStyled,
  ValueStyled,
} from './Product.sc';
import { FlexItem, FlexRow, FlexColumn } from 'components/ui/flex/';
import { assetsPath } from 'utils/ui.util';

type Props = {
  imgSrc: string,
  title: string,
  sku: string,
  quantity: string,
  total: string,
};

export default class ProductSection extends React.PureComponent<Props> {
  render() {
    return (
      <FlexRow margin="0 0 15px 0" alignItems="center">
        <FlexItem grow="0" basis="0">
          <ImgWrapStyled>
            <img
              src={this.props.imgSrc || `${assetsPath}/prod-img.jpg`}
              alt={this.props.title}
            />
          </ImgWrapStyled>
        </FlexItem>

        <FlexColumn>
          <FlexItem margin="0 0 12px 0">
            <TitleStyled>{this.props.title}</TitleStyled>
          </FlexItem>
          <FlexRow>
            <FlexItem>
              <LabelStyled>SKU:</LabelStyled>{' '}
              <ValueStyled>{this.props.sku.toUpperCase()}</ValueStyled>
            </FlexItem>
            <FlexItem>
              <LabelStyled>QTY:</LabelStyled>{' '}
              <ValueStyled>{this.props.quantity}</ValueStyled>
            </FlexItem>
            <FlexItem>
              <LabelStyled>TOTAL:</LabelStyled>{' '}
              <ValueStyled>{this.props.total}</ValueStyled>
            </FlexItem>
          </FlexRow>
        </FlexColumn>
      </FlexRow>
    );
  }
}
