// @flow
import * as React from 'react';
import moment from 'moment';
import classNames from 'classnames';
import CkoTag from 'components/ui/tag/';
import CkoTooltip from 'components/ui/tooltip';
import CkoIcon from 'components/ui/icon/';
import { RESPONSE_CODES } from 'config';
import { formatNumber } from 'utils/ui.util';

import { StatusWrapStyled } from './StatusList.sc';

type Props = {
  id: string,
  isActive: boolean,
  isPartial: boolean,
  isSingleLog: boolean,
  status: string,
  date: string,
  value: number,
  hasRefund: boolean,
  currencySymbol: string,
  responseCode: string,
  onClick: Function,
};

export default class StatusList extends React.Component<Props> {
  formatDate(): string {
    return moment(this.props.date).format('DD MMM YYYY - HH:mm:ss');
  }

  getIconStatus(): string {
    const status = this.props.status.toLowerCase();
    const action = status.split(' ')[0];

    // Capture
    if (action === 'capture') {
      if (status.includes('success')) {
        return 'captured-payment';
      } else if (status.includes('fail')) {
        return 'capture-fail';
      }
    }

    // Refund - Void
    if (action === 'refund' || action === 'void') {
      if (status.includes('success')) {
        return 'refund';
      } else if (status.includes('fail')) {
        return 'refund-fail';
      }
    }

    // Authorisation
    if (action === 'authorisation') {
      if (status.includes('success')) {
        return 'success';
      } else if (status.includes('fail')) {
        return 'fail';
      } else if (status.includes('flag')) {
        return 'flag';
      } else {
        return 'autocapture-delay';
      }
    }

    if (status.includes('fail')) {
      return 'fail';
    } else if (status.includes('flag')) {
      return 'flag';
    }
    return 'success';
  }

  formatCapturedStatus(status: string): string {
    if (status.includes('fail')) {
      return 'Transaction capture initiated but failed';
    } else if (status.includes('flag')) {
      return 'Transaction captured but flagged';
    }

    if (this.props.hasRefund && !this.props.isActive) {
      const value = formatNumber(this.props.value, this.props.currencySymbol);
      return `Transaction captured sum of ${value} ${
        this.props.currencySymbol
      }`;
    }

    return 'Transaction captured';
  }

  formatRefundStatus(status: string): string {
    if (status.includes('success')) {
      if (this.props.isPartial) {
        const value = formatNumber(this.props.value, this.props.currencySymbol);
        return `Transaction partial refund of ${value} ${
          this.props.currencySymbol
        }`;
      }
      return 'Transaction refunded';
    } else if (status.includes('fail')) {
      return 'Transaction refunded initiated but failed';
    } else if (status.includes('flag')) {
      return 'Transaction refunded but flagged';
    }
    return '';
  }

  formatVoidStatus(status: string): string {
    if (status.includes('fail')) {
      return 'Transaction void initiated but failed';
    } else if (status.includes('flag')) {
      return 'Transaction voided but flagged';
    }
    return 'Transaction voided';
  }

  formatAuthStatus(status: string): string {
    if (status.includes('fail')) {
      return 'Transaction authorisation initiated but failed';
    } else if (status.includes('flag')) {
      return 'Transaction authorised but flagged';
    } else if (status.includes('pending')) {
      return 'Transaction pending';
    }
    return 'Transaction authorised';
  }

  formatCardVerifyStatus(status: string): string {
    if (status.includes('fail')) {
      return 'Card verification initiated but failed';
    } else if (status.includes('flag')) {
      return 'Card verification initiated but flagged';
    }
    return 'Card verified';
  }

  formatStatus(): string {
    let statusOutput = this.props.status;
    const checkStatus = statusOutput.toLowerCase();
    const action = checkStatus.split(' ')[0];

    // Capture
    if (action === 'capture') {
      statusOutput = this.formatCapturedStatus(checkStatus);
    }

    // Refund
    else if (action === 'refund') {
      statusOutput = this.formatRefundStatus(checkStatus);
    }

    // Void
    else if (action === 'void') {
      statusOutput = this.formatVoidStatus(checkStatus);
    }

    // Authorisation
    else if (action === 'authorisation') {
      statusOutput = this.formatAuthStatus(checkStatus);
    }

    // Card Verification
    else if (checkStatus.includes('card verification')) {
      statusOutput = this.formatCardVerifyStatus(checkStatus);
    }

    return statusOutput;
  }

  handleClick = (e: SyntheticEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!this.props.isSingleLog) {
      this.props.onClick(this.props.id);
    }
  };

  shouldShowResponseCode(status: string = ''): boolean {
    const statusCheck = status.toLowerCase();
    return !statusCheck.includes('success') && !statusCheck.includes('pending');
  }

  render() {
    const { responseCode } = this.props;
    const className = classNames({
      'in-active': !this.props.isActive,
    });
    return (
      <StatusWrapStyled
        className={className}
        onClick={this.handleClick}
        isSingleLog={this.props.isSingleLog}>
        <div className="status-wrap">
          <CkoIcon name={this.getIconStatus()} />
          <div className="info">
            <p className="text">{this.formatStatus()}</p>
            <p className="date">{this.formatDate()}</p>
          </div>
          <div className="more-info">
            {this.shouldShowResponseCode(this.props.status) && (
              <CkoTooltip placement="top" title={RESPONSE_CODES[responseCode]}>
                <CkoTag
                  className="td-tag"
                  value={`Response code - ${responseCode}`}
                />
              </CkoTooltip>
            )}
          </div>
        </div>
      </StatusWrapStyled>
    );
  }
}
