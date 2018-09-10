// @flow
import * as React from 'react';
import Alert from 'antd/lib/alert';
import { AlertStyled } from './styled/CkoAlert.sc';

type Props = {
  banner?: boolean,
  closable?: boolean,
  type?: string,
  showIcon?: boolean,
  onClose?: Function,
  closeText?: string | React.Node,
  description: string | React.Node,
  message: string | React.Node,
};

export default class CkoAlert extends React.PureComponent<Props> {
  static defaultProps = {
    type: 'info',
  };

  render() {
    return (
      <AlertStyled className="cko-alert">
        <Alert {...this.props} />
      </AlertStyled>
    );
  }
}
