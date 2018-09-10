// @flow
import * as React from 'react';
import CkoIcon from 'components/ui/icon/';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { MenuStyled } from './MainMenu.sc';

type Props = {
  disable: boolean,
  menuData: Array<any>,
  currentPath: string,
  username: string,
  onLogout: Function,
};

export default class MainMenu extends React.Component<Props> {
  static defaultProps = {
    disable: false,
    menuData: [],
    currentPath: '',
    username: '',
  };

  /**
   * Create menu link list
   */
  createMenuList(): Array<React.Element<'li'>> {
    const { menuData, currentPath } = this.props;
    const filteredMenu = menuData.filter(menu => menu.isAuthorised);

    // return React Element
    return filteredMenu.map((menu, mIndex) => {
      const menuClass = classNames({
        'menu-item': !menu.sideInfo,
        'side-info': menu.sideInfo,
        logout: menu.logout,
        'active-menu': menu.link === currentPath,
      });

      // Side Info
      if (menu.sideInfo) {
        return (
          <li className="side-info" key="side-info">
            <p className="title">Account configurations</p>
            <p className="username">{this.props.username}</p>
          </li>
        );
      }

      // Logout
      if (menu.logout) {
        return (
          <li className={menuClass} key="side-logout">
            <a id={menu.id} onClick={this.props.onLogout} href="/login">
              <CkoIcon name={menu.icon} />
              <span className="menu-title">{menu.label}</span>
            </a>
          </li>
        );
      }

      return (
        <li className={menuClass} key={menu.link}>
          <Link to={menu.link} id={menu.id}>
            <CkoIcon name={menu.icon} />
            <span className="menu-title">{menu.label}</span>
          </Link>
        </li>
      );
    });
  }

  render() {
    const { disable } = this.props;
    const className = classNames({
      'menu-list': true,
      disable,
    });
    return (
      <MenuStyled>
        {disable && <div className="overlay" />}
        <ul className={className}>{this.createMenuList()}</ul>
      </MenuStyled>
    );
  }
}
