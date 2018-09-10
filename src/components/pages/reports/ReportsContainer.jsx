import * as React from 'react';
import { connect } from 'react-redux';
import CkoTooltip from 'components/ui/tooltip';

class ReportsContainer extends React.Component {
  render() {
    return (
      <div>
        <CkoTooltip title="test" danger>
          <div>ReportsContainer</div>
        </CkoTooltip>
      </div>
    );
  }
}

export default connect()(ReportsContainer);
