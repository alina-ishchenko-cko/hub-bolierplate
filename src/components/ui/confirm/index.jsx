// @flow
import * as React from 'react';
import CkoModal from 'components/ui/modal/';

type Props = {
  title?: string,
  titleIcon?: string,
  loading?: boolean,
  message?: string,
  okText?: string,
  cancelText?: string,
  onOk: Function,
  onCancel: Function,
};

export default class CkoConfirm extends React.PureComponent<Props> {
  render() {
    return (
      <CkoModal
        title={this.props.title || 'Please confirm'}
        titleIcon={this.props.titleIcon}
        visible={true}
        loading={this.props.loading || false}
        type="confirm"
        okText={this.props.okText || 'Ok'}
        cancelText={this.props.cancelText || 'Cancel'}
        onOk={this.props.onOk}
        onCancel={this.props.onCancel}
        className="cko-confirm">
        <p>{this.props.message || 'Are you sure?'}</p>
      </CkoModal>
    );
  }
}
