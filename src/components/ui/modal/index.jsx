// @flow
import * as React from 'react';
import Modal from 'antd/lib/modal';
import CkoIcon from 'components/ui/icon/';
import CkoLoading from 'components/ui/loading/';
import CkoButton from 'components/ui/button';
import classNames from 'classnames';
import {
  ModalWrapStyled,
  ModalTitleStyled,
  ModalFooterStyled,
} from './styled/CkoModal.sc';

type Props = {
  type?: string,
  loading?: boolean,
  okText?: string,
  cancelText?: string,
  titleIcon?: string,
  closable?: boolean,
  okButtonDisabled?: boolean,
  title?: string,
  afterClose?: Function,
  onCancel: Function,
  onOk: Function,
  children: React.Node,
};

export default class CkoModal extends React.Component<Props> {
  static DefaultProps = {
    okButtonDisabled: false,
  };

  handleOnCancel = (e: SyntheticEvent<any>) => {
    const antModal = this.refs.modalParent.querySelector('.ant-modal-wrap');
    this.props.onCancel(e);
    antModal.scrollTop = 0;
  };

  renderModalTitle = () => {
    const { titleIcon } = this.props;
    return (
      <ModalTitleStyled>
        {titleIcon && <CkoIcon name={titleIcon} />}
        <span className="title">{this.props.title}</span>
        <CkoIcon
          type="close"
          className="close-btn"
          onClick={this.handleOnCancel}
        />
      </ModalTitleStyled>
    );
  };

  renderModalFooter = () => {
    const { onCancel, type } = this.props;
    const isConfirm = !!(type === 'confirm');
    const className = classNames({
      'cancel-btn': true,
      'confirm-cancel': isConfirm,
    });
    return (
      <ModalFooterStyled type={type}>
        <CkoButton
          type="primary"
          size="large"
          value={this.props.okText || 'Ok'}
          onClick={this.props.onOk}
          disabled={this.props.okButtonDisabled}
        />
        {!isConfirm && onCancel && <span className="or-divider">or</span>}
        {onCancel && (
          <span className={className} onClick={this.handleOnCancel}>
            {this.props.cancelText || 'Cancel'}
          </span>
        )}
      </ModalFooterStyled>
    );
  };

  createModalDivWrap = () => {
    const modalChild = document.createElement('div');
    this.refs.modalParent.appendChild(modalChild);
    return modalChild;
  };
  render() {
    const { loading } = this.props;
    const props = {
      ...this.props,
      width: 400,
      closable: false,
      maskClosable: false,
      destroyOnClose: true,
      title: this.renderModalTitle(),
      footer: this.renderModalFooter(),
      getContainer: () => this.createModalDivWrap(),
    };

    return (
      <div className="cko-modal">
        <ModalWrapStyled type={this.props.type} loading={loading}>
          <div ref="modalParent" />
        </ModalWrapStyled>
        <Modal {...props}>
          {loading && (
            <div className="loader-wrap">
              <CkoLoading />
            </div>
          )}
          {this.props.children}
        </Modal>
      </div>
    );
  }
}
