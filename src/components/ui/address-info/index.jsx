// @flow
import React from 'react';

type Props = {
  address: {
    addressLine1: ?string,
    addressLine2: ?string,
    city: ?string,
    postcode: ?string,
    state: ?string,
    country: ?string,
  },
};

export default class AddressInfo extends React.PureComponent<Props> {
  static defaultProps = {
    address: {},
  };

  render() {
    const {
      addressLine1,
      addressLine2,
      city,
      postcode,
      state,
      country,
    } = this.props.address;

    return (
      <div className="address">
        <div>{addressLine1 || ''}</div>
        <div>{addressLine2 || ''}</div>
        <div>{`${city || ''}, ${postcode || ''}`}</div>
        <div>{state || ''}</div>
        <div>{country || ''}</div>
      </div>
    );
  }
}
