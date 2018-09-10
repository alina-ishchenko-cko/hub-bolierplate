// @flow
import * as React from 'react';
import classNames from 'classnames';
import { SwitchStyled } from './styled/CkoSwitch.sc';

type Props = {
  dataIndex?: string,
  type: string,
  disabled?: boolean,
  btnLabel: Array<string>,
  defaultChecked: boolean,
  onToggleBtn: Function,
};

type State = {
  isChecked: boolean,
};

export default class CkoSwitch extends React.Component<Props, State> {
  static defaultProps = {
    type: 'rec',
    btnLabel: [],
    defaultChecked: false,
    disabled: false,
  };

  state = {
    isChecked: this.props.defaultChecked || false,
  };

  onToggle = (e: SyntheticEvent<HTMLSpanElement>) => {
    const id = e.currentTarget.id;
    const isChecked = id === 'on' ? true : false;
    if (this.props.type !== 'circle' && isChecked !== this.state.isChecked) {
      this.setState(
        {
          isChecked,
        },
        this.handleBtnToggle
      );
    } else if (this.props.type === 'circle') {
      this.setState(
        prevState => ({
          isChecked: !prevState.isChecked,
        }),
        this.handleBtnToggle
      );
    }
  };

  handleBtnToggle() {
    if (!this.props.disabled) {
      this.props.onToggleBtn(this.state.isChecked, this.props.dataIndex);
    }
  }

  render() {
    const { btnLabel } = this.props;
    const className = classNames({
      'cko-switch': true,
      'circle-switch': this.props.type === 'circle',
    });

    const wrapClassName = classNames({
      'inner-wrap': true,
      'checked-switch': this.state.isChecked,
    });

    const onClassName = classNames({
      switch: true,
      active: !this.state.isChecked,
    });

    const offClassName = classNames({
      switch: true,
      active: this.state.isChecked,
    });

    return (
      <SwitchStyled className={className} disabled={this.props.disabled}>
        <span className={wrapClassName}>
          <span className={onClassName} onClick={this.onToggle} id="off">
            {btnLabel[0] || ''}
          </span>
          <span className={offClassName} onClick={this.onToggle} id="on">
            {btnLabel[1] || ''}
          </span>
        </span>
      </SwitchStyled>
    );
  }
}
