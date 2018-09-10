// @flow
import * as React from 'react';
import Dropdown from 'antd/lib/dropdown';
import Menu from 'antd/lib/menu';
import CkoIcon from 'components/ui/icon/';
import { DropdownStyled } from './styled/CkoDropdown.sc';

type MenuOption = {
  key?: string,
  label?: string,
  iconLeft?: string,
  iconRight?: string,
  href?: string,
  className?: string,
  divider?: boolean,
  listTitle?: string,
};

type Props = {
  data: Array<MenuOption>,
  label: string | React.Node,
  onClick: Function,
};

export default class CkoDropdown extends React.Component<Props> {
  dropdwnNode: ?HTMLDivElement;

  renderMenuItems = () => {
    return (
      <Menu onClick={this.props.onClick}>
        {this.props.data.map((menu, index) => {
          if (menu.divider) {
            return <Menu.Divider key={menu.key || index} />;
          }

          if (menu.listTitle) {
            return (
              <Menu.Item key={menu.key || index} className="list-title">
                {menu.listTitle}
              </Menu.Item>
            );
          }

          return (
            <Menu.Item key={menu.key || index} className={menu.className || ''}>
              {!menu.href && (
                <span className="ant-dropdown-click">
                  {menu.iconLeft && (
                    <CkoIcon name={menu.iconLeft} className="icon-prefix" />
                  )}
                  {menu.label}
                  {menu.iconRight && (
                    <CkoIcon name={menu.iconRight} className="icon-suffix" />
                  )}
                </span>
              )}

              {menu.href && (
                <a href={menu.href}>
                  {menu.iconLeft && (
                    <CkoIcon name={menu.iconLeft} className="icon-prefix" />
                  )}
                  {menu.label}
                  {menu.iconRight && (
                    <CkoIcon name={menu.iconRight} className="icon-suffix" />
                  )}
                </a>
              )}
            </Menu.Item>
          );
        })}
      </Menu>
    );
  };

  render() {
    return (
      <DropdownStyled
        className="cko-dropdown"
        onClick={e => {
          e.stopPropagation();
        }}>
        <div
          ref={node => (this.dropdwnNode = node)}
          className="cko-dropdown-wrap"
        />
        <Dropdown
          getPopupContainer={() => this.dropdwnNode}
          overlay={this.renderMenuItems()}
          trigger={['click']}>
          <button>{this.props.label}</button>
        </Dropdown>
      </DropdownStyled>
    );
  }
}
