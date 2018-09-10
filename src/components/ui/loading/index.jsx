// @flow
import * as React from 'react';
import classNames from 'classnames';
import {
  DotsLoaderStyled,
  InfoLoaderStyled,
  SpinLoader,
  LoadingWrapStyled,
} from './styled/CkoLoading.sc';
export { default as CkoLoadingBar } from './CkoLoadingBar';

type Props = {
  show?: boolean,
  opacity?: string,
  withInfo?: boolean,
  className?: string,
  size?: string,
  full?: boolean,
};

export default class CkoLoading extends React.PureComponent<Props> {
  render() {
    const Dots = () => (
      <DotsLoaderStyled
        size={this.props.size}
        className={`cko-app-loading ${this.props.className || ''}`}>
        <div className="dots">
          <div />
          <div />
          <div />
        </div>
      </DotsLoaderStyled>
    );

    if (this.props.withInfo) {
      const className = classNames({
        'cko-app-loading': true,
        'show-spin': true,
        'hide-spin': !this.props.show,
      });

      return (
        <InfoLoaderStyled className={className}>
          <div className="loader-inner">
            <SpinLoader className="spinner" />
            <p>We are loading new data.</p>
            <p>Please be patient</p>
          </div>
        </InfoLoaderStyled>
      );
    }

    if (this.props.full) {
      return (
        <LoadingWrapStyled
          className="cko-app-loading-full"
          opacity={this.props.opacity}>
          <Dots />
        </LoadingWrapStyled>
      );
    }
    return <Dots />;
  }
}
