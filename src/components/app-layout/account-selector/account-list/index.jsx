// @flow
import * as React from 'react';

type Props = {
  id: number | string,
  title: string,
  dataType: string,
  className?: string,
  hasChildren: boolean,
  childList?: React.Element<'ul'>,
  onClick: Function,
};

export default class AccountList extends React.PureComponent<Props> {
  static defaultProps = {
    id: '',
    title: '',
    dataType: '',
    hasChildren: false,
  };

  render() {
    const { title, dataType } = this.props;
    return (
      <li
        id={this.props.id}
        title={title}
        data-type={dataType}
        onClick={this.props.onClick}
        className={this.props.className}>
        {dataType === 'channel' && <span>{title}</span>}
        {(dataType === 'business' || dataType === 'account') && (
          <p className="title">{title}</p>
        )}
        {this.props.hasChildren && this.props.childList}
      </li>
    );
  }
}
