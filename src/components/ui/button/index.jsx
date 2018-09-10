// @flow
import * as React from 'react';
import { isUndefined } from 'utils';
import CkoIcon from 'components/ui/icon/';
import { ButtonStyled } from './styled/CkoButton.sc';

type Props = {
  type?: string,
  dataIndex?: any,
  size?: string,
  link?: string,
  icon?: string,
  state?: string,
  disabled?: boolean,
  className?: string,
  block?: boolean,
  value: string,
  children?: React.Node,
  onClick: Function,
  target?: string,
};

export default class CkoButton extends React.PureComponent<Props> {
  static defaultProps = {
    onClick: () => {},
  };

  handleClick = (e: SyntheticEvent<any>) => {
    e.preventDefault();
    e.stopPropagation();

    this.props.onClick(this.props.dataIndex);
  };

  goToLink = () => {
    window.open(this.props.link, this.props.target || '_blank');
  };

  render() {
    const { value, children, icon } = this.props;
    const btnProps = { ...this.props };
    btnProps.className = `cko-button ${this.props.className || ''}`;

    if (!isUndefined(this.props.link)) {
      btnProps.onClick = this.goToLink;
    } else if (!isUndefined(this.props.dataIndex) && !this.props.disabled) {
      btnProps.onClick = this.handleClick;
    }

    return (
      <ButtonStyled {...btnProps}>
        {icon && <CkoIcon name={icon} />}
        {value && <span className="value">{value}</span>}
        {children && children}
      </ButtonStyled>
    );
  }
}
