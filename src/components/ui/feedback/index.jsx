// @flow
import * as React from 'react';
import CkoIcon from 'components/ui/icon/';
import message from 'antd/lib/message';

// Hide after 6 sec
message.config({ duration: 6 });

export const hideFeedback = () => {
  message.destroy();
};

const createFeedback = (option: { type: string, message: string }) => {
  const iconType = option.type === 'success' ? 'tick' : 'close';
  message[option.type](
    <div className="message-wrap clearfix">
      <div className="message-inner">
        <span className="status-icon">
          <CkoIcon name={iconType} />
        </span>
        <span>{option.message}</span>
      </div>
      <div className="close-btn" onClick={hideFeedback}>
        <CkoIcon name="close" />
      </div>
    </div>
  );
};

export default {
  info(message: string) {
    hideFeedback();
    createFeedback({ type: 'info', message });
  },
  success(message: string) {
    hideFeedback();
    createFeedback({ type: 'success', message });
  },
  error(message: string) {
    hideFeedback();
    createFeedback({ type: 'error', message });
  },
};
