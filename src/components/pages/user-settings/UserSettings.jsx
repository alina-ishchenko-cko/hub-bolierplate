import * as React from 'react';
import { connect } from 'react-redux';

class UserSettings extends React.Component {
  render() {
    console.log('=======TransactionsContainer');
    return <h1>UserSettings</h1>;
  }
}

export default connect()(UserSettings);
