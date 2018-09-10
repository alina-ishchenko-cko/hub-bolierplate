// @flow
import * as React from 'react';
import Blacklist from './blacklist/';
import Refund from './refund/';
import Capture from './capture/';
import Void from './void/';

type Props = {
  isReadOnly: boolean,
  blacklistId: string,
  refundId: string | Array<Object>,
  voidId: string,
  captureId: string,
  selectedRows: Array<Object>,
  onCancel: Function,
  onOk: Function,
};

export default class TransactionActionsModals extends React.Component<Props> {
  static defaultProps = {
    selectedRows: [],
  };

  render() {
    const { isReadOnly, blacklistId, refundId, voidId, captureId } = this.props;
    return (
      <div>
        <Blacklist
          visible={!!(blacklistId !== '')}
          chargeId={blacklistId}
          onCancel={this.props.onCancel}
        />
        {!isReadOnly && (
          <Refund
            visible={!!(refundId !== '')}
            chargeId={refundId}
            onCancel={this.props.onCancel}
            selectedRows={this.props.selectedRows}
            onOk={this.props.onOk}
          />
        )}
        {!isReadOnly && (
          <Void
            visible={!!(voidId !== '')}
            chargeId={voidId}
            onCancel={this.props.onCancel}
            selectedRows={this.props.selectedRows}
            onOk={this.props.onOk}
          />
        )}
        {!isReadOnly && (
          <Capture
            visible={!!(captureId !== '')}
            chargeId={captureId}
            onCancel={this.props.onCancel}
            selectedRows={this.props.selectedRows}
            onOk={this.props.onOk}
          />
        )}
      </div>
    );
  }
}
/*

*/
