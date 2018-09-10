// @flow
import * as React from 'react';
import ContentList from 'components/ui/layout/ContentList';
import { FlexItem, FlexRow } from 'components/ui/flex/';
import CkoButton from 'components/ui/button';
import { CustomerNameStyled } from './CustomerSection.sc';

type Props = {
  name: string,
  email: string,
  customerId: string,
  pushToRowDetailStack: Function,
};

export default class CustomerSection extends React.PureComponent<Props> {
  openCustomerDetails = () => {
    this.props.pushToRowDetailStack({
      type: 'customer',
      id: this.props.customerId,
    });
  };

  render() {
    return (
      <ContentList title="Customer details">
        <FlexRow>
          <CustomerNameStyled>
            <label>Customer name</label>
            <p>{this.props.name || 'N/A'}</p>
            <CkoButton
              value="View profile"
              size="small"
              onClick={this.openCustomerDetails}
            />
          </CustomerNameStyled>
          <FlexItem>
            <label>Customer Email</label>
            <p>{this.props.email || 'N/A'}</p>
          </FlexItem>
        </FlexRow>
      </ContentList>
    );
  }
}
