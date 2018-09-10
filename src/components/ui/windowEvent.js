// @flow
import * as React from 'react';

type State = {
  deviceWidth: number,
};

type Config = {
  resize?: boolean,
  minWidth?: number,
};

export default function(
  WrappedComponent: React.ComponentType<any>,
  config?: Config
) {
  return class Component extends React.Component<void, State> {
    constructor(props: void) {
      super(props);
      this.state = {
        deviceWidth: 0,
      };
    }

    componentDidMount() {
      if (config && config.resize) {
        this.setContentWidth();
        window.addEventListener('resize', this.setContentWidth);
      }
    }

    componentWillUnmount() {
      if (config && config.resize) {
        window.removeEventListener('resize', this.setContentWidth);
      }
    }

    setContentWidth = () => {
      const { innerWidth } = window;
      const { minWidth } = config || {};
      if (!minWidth) {
        this.setWidth(innerWidth);
      } else {
        if (
          !this.state.deviceWidth ||
          (innerWidth <= minWidth && this.state.deviceWidth > minWidth) ||
          (innerWidth >= minWidth && this.state.deviceWidth < minWidth)
        ) {
          this.setWidth(innerWidth);
        }
      }
    };

    setWidth(deviceWidth: number) {
      this.setState({ deviceWidth });
    }

    render() {
      return (
        <WrappedComponent
          deviceWidth={this.state.deviceWidth}
          {...this.props}
        />
      );
    }
  };
}
