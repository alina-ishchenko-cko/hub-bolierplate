// @flow
import * as React from 'react';
import CkoIcon from 'components/ui/icon/';
import CkoLoading from 'components/ui/loading/';
import isEqual from 'lodash/isEqual';
import { Scrollbars } from 'react-custom-scrollbars';
import { FlexItem, FlexColumn } from 'components/ui/flex/';
import {
  ContentStyled,
  ContainerStyled,
  CloseBtnStyled,
  HeaderStyled,
} from './styled/CkoSideContent.sc';

type Props = {
  loading?: boolean,
  className?: string,
  header: React.Node,
  onClose: Function,
  children: React.Node,
  showBackBtn: boolean,
};

type State = {
  uiLoading: boolean,
};

export default class CkoSideContent extends React.Component<Props, State> {
  timer: any;
  state = {
    uiLoading: false,
  };

  componentWillReceiveProps(nextProps: Props) {
    if (!isEqual(this.props.header, nextProps.header)) {
      this.showUiLoading();
    }
  }

  showUiLoading() {
    // Clear the previous time
    clearTimeout(this.timer);

    // Show Loader
    this.setUiLoading(true);

    // Scroll the content area to the top
    //this.refs.scrollWrap.scrollTop(0);

    // Add 300ms delay to show loader
    this.timer = setTimeout(this.setUiLoading, 300);
  }

  setUiLoading = (uiLoading?: boolean = false) => {
    this.setState({ uiLoading });
  };

  handleClose = (e: SyntheticEvent<any>) => {
    e.preventDefault();
    e.stopPropagation();
    this.props.onClose();
  };

  isLoading() {
    return this.props.loading || this.state.uiLoading;
  }

  render() {
    const iconType = this.props.showBackBtn ? 'right' : 'close';
    return (
      <ContainerStyled
        className={`cko-side-content ${this.props.className || ''}`}>
        <CloseBtnStyled onClick={this.handleClose}>
          <CkoIcon name={iconType} />
        </CloseBtnStyled>
        {this.props.loading && <CkoLoading full opacity="1" />}
        <FlexColumn className="cko-content-wrap">
          <FlexItem grow="0">
            <HeaderStyled>{this.props.header}</HeaderStyled>
          </FlexItem>
          <Scrollbars>
            <ContentStyled>{this.props.children}</ContentStyled>
          </Scrollbars>
        </FlexColumn>
      </ContainerStyled>
    );
  }
}
