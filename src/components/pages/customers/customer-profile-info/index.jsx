// @flow
import * as React from 'react';
import {
  Initials,
  CustomerName,
  CustomerEmail,
} from './CustomerProfileInfo.sc';

type Props = {
  initials: string,
  name: string,
  email: string,
};

export default class CustomerProfileInfo extends React.PureComponent<Props> {
  render() {
    return (
      <div>
        {this.props.initials ? (
          <Initials>{this.props.initials}</Initials>
        ) : null}
        {this.props.name ? (
          <CustomerName>{this.props.name}</CustomerName>
        ) : null}
        <CustomerEmail>{this.props.email}</CustomerEmail>
      </div>
    );
  }
}
