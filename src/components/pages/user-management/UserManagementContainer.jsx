import * as React from 'react';
import { connect } from 'react-redux';

class UserManagementContainer extends React.Component {
  render() {
    console.log('=======TransactionsContainer');
    return <h1>UserManagementContainer</h1>;
  }
}

export default connect()(UserManagementContainer);
