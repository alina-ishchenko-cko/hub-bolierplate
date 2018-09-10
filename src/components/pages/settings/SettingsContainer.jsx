import * as React from 'react';
import { connect } from 'react-redux';

class SettingsContainer extends React.Component {
  render() {
    return <h1>SettingsContainer</h1>;
  }
}

export default connect()(SettingsContainer);
