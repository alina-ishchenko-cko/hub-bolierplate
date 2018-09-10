// @flow
import * as React from 'react';
import CkoButton from 'components/ui/button';

type Props = {
  text: string,
};

export default class CopyToClipboardBtn extends React.PureComponent<Props> {
  copyTextToClipboard = () => {
    const doc: Object = document;
    const textArea: Object = document.createElement('textarea');
    textArea.value = this.props.text;
    doc.body.appendChild(textArea);
    textArea.focus({ preventScroll: true });
    textArea.select();

    try {
      doc.execCommand('copy');
    } catch (err) {
      console.error('Unable to copy', err);
    }
    doc.body.removeChild(textArea);
  };

  render() {
    return (
      <CkoButton value="Copy" size="small" onClick={this.copyTextToClipboard} />
    );
  }
}
