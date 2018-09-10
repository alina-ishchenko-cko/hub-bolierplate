import * as React from 'react';
import isEqual from 'lodash/isEqual';
import { connect } from 'react-redux';

class PaymentPlansContainer extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return !isEqual(nextProps, this.props) || !isEqual(nextState, this.state);
  }

  render() {
    console.log('=======PaymentPlansContainer');
    return <h1>PaymentPlansContainer</h1>;
  }
}

export default connect()(PaymentPlansContainer);
