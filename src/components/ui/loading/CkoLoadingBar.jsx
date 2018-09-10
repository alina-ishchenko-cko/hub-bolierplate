import * as React from 'react';
import { LoaderWrapStyled } from './styled/CkoLoadingBar.sc';
import LoadingBar from 'react-redux-loading-bar';

export default class CkoLoadingBar extends React.Component {
  render() {
    return (
      <LoaderWrapStyled className="cko-loading-bar">
        <LoadingBar className="loading-bar" />
      </LoaderWrapStyled>
    );
  }
}
