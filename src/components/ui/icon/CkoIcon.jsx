// @flow
import * as React from 'react';
import { AppIconStyled } from './styled/CkoIcon.sc';
import SVG from 'react-inlinesvg';
import { assetsPath } from 'utils/ui.util';

type Props = {
  name: string,
  type?: string,
  width?: number | string,
  className?: string,
};

export default class CkoIcon extends React.PureComponent<Props> {
  static defaultProps = {
    type: '',
    width: 0,
  };

  render() {
    const { type } = this.props;
    if (!this.props.name) {
      return <AppIconStyled className="cko-icon placeholder" />;
    }

    let rootDir = `svgs`;
    const iconName = this.props.name.toLowerCase();
    if (type === 'scheme') {
      rootDir += '/schemes';
    } else if (type === 'flag') {
      rootDir += '/flags';
    }
    const svgSrc = `${assetsPath}/${rootDir}/${iconName}.svg`;
    return (
      <AppIconStyled className={`cko-icon ${this.props.className || ''}`}>
        {type && type === 'flag' ? (
          <img src={svgSrc} alt={`${iconName} flag`} />
        ) : (
          <SVG src={svgSrc} />
        )}
      </AppIconStyled>
    );
  }
}
