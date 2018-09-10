// @flow
import * as React from 'react';
import { withRouter } from 'react-router';
import classNames from 'classnames';
import isEqual from 'lodash/isEqual';
import {
  AppContainerStyled,
  ContentStyled,
  ContentWrapStyled,
} from './Applayout.sc';
import Sidebar from './sidebar/';
import Header from './header/';
import ContentDetails from './content-details';
import windowEvent from 'components/ui/windowEvent';
import { SMALL_VIEW } from 'config';

type Props = {
  deviceWidth: number,
  location: Object,
  history: Object,
  children: React.Node,
  collapseSidebar: Function,
};

type State = {
  collapsed: number,
};

export class AppLayout extends React.Component<Props, State> {
  static defaultProps = {
    location: {},
    history: {},
  };

  state = {
    collapsed: 0,
  };

  componentDidUpdate(prevProps: Props) {
    if (!isEqual(prevProps.deviceWidth, this.props.deviceWidth)) {
      this.props.collapseSidebar(!!(this.props.deviceWidth <= SMALL_VIEW));
    }
  }

  toggleSideBar = (collapsed: number) => {
    this.setState({ collapsed });
    this.props.collapseSidebar(collapsed === 2 ? false : true);
  };

  render() {
    const className = classNames({
      'show-menu': this.state.collapsed === 2,
      'hide-menu': this.state.collapsed === 1,
    });
    return (
      <AppContainerStyled className={className}>
        <Sidebar
          location={this.props.location}
          history={this.props.history}
          toggleSideBar={this.toggleSideBar}
        />
        <ContentStyled id="app-content">
          <Header currentPath={this.props.location.pathname} />
          <ContentWrapStyled>
            <div className="flex-container">{this.props.children}</div>
          </ContentWrapStyled>
        </ContentStyled>
        <ContentDetails />
      </AppContainerStyled>
    );
  }
}
const wrapWithDevice = windowEvent(AppLayout, {
  resize: true,
  minWidth: SMALL_VIEW,
});
export default withRouter(wrapWithDevice);
