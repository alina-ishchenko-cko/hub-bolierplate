// @flow
import * as React from 'react';
import { ACTIONS_ENUMS } from 'config';
import CkoIcon from 'components/ui/icon/';
import CkoButton from 'components/ui/button';
import StatusList from './status-list/';
import {
  DividerStyled,
  AmountWrapStyled,
  LogsWrapStyled,
} from './HeaderSection.sc';
import { FlexColumn, FlexItem } from 'components/ui/flex/';
import { formatNumber } from 'utils/ui.util';

type Props = {
  chargeId: string,
  value: number,
  allowedActions: number,
  isReadOnlyUser: boolean,
  transactionDate: string,
  transactionStatus: string,
  currencyName: string,
  responseCode: string,
  logs: Array<Object>,
  onClick: Function,
  setActiveData: Function,
};

type State = {
  showLogs: boolean,
};

export default class HeaderSection extends React.Component<Props, State> {
  state = {
    showLogs: false,
  };

  showMoreLink(): boolean {
    return this.props.logs.length > 2;
  }

  handleLogClick = (chargeId: string) => {
    this.props.setActiveData({ type: 'transaction', id: chargeId });
  };

  toggleLogs = (e: SyntheticEvent<HTMLDivElement>) => {
    e.preventDefault();
    this.setState(prevState => ({
      showLogs: !prevState.showLogs,
    }));
  };

  renderLogs = () => {
    const { logs } = this.props;
    const statusList = {};
    logs.forEach(log => {
      if (!statusList[log.status]) {
        statusList[log.status] = 1;
      } else {
        statusList[log.status] += 1;
      }
    });
    const isSingleLog = !!(logs.length === 1);
    const hasRefund =
      logs.filter(data => !!data.status.toLowerCase().includes('refund'))
        .length > 0;

    const list = this.state.showLogs ? logs : logs.slice(0, 2);
    return list.map((log, key) => (
      <StatusList
        key={log.id}
        id={log.id}
        isActive={!!(this.props.chargeId === log.id)}
        date={log.timestamp}
        value={log.value}
        currencySymbol={log.currencySymbol}
        status={log.status}
        isSingleLog={isSingleLog}
        hasRefund={hasRefund}
        isPartial={!!(statusList[log.status] > 1)}
        responseCode={log.responseCode}
        onClick={this.handleLogClick}
      />
    ));
  };

  renderShowLabel(): React.Node {
    if (this.state.showLogs) {
      return (
        <span className="more-btn">
          Show less <CkoIcon name="up-arrow" />
        </span>
      );
    }
    return (
      <span className="more-btn">
        Show more <CkoIcon name="down-arrow" />
      </span>
    );
  }

  getAllowedActions(): Object {
    const { allowedActions, isReadOnlyUser } = this.props;
    const canEditTransaction = !isReadOnlyUser;
    return {
      canCapture:
        canEditTransaction && !!(allowedActions & ACTIONS_ENUMS.CAPTURE),
      canVoid: canEditTransaction && !!(allowedActions & ACTIONS_ENUMS.VOID),
      // don't need to check canEditTransaction for canBlacklist because
      // "Blacklist" button just opens a dialog with a blacklist status
      // and doesn't perform any action
      canBlacklist: !!(allowedActions & ACTIONS_ENUMS.BLACKLIST),
      canRefund:
        canEditTransaction && !!(allowedActions & ACTIONS_ENUMS.REFUND),
    };
  }

  render() {
    const actions = this.getAllowedActions();
    return (
      <FlexColumn>
        <AmountWrapStyled>
          <FlexItem className="amount-info" grow="0" basis="auto">
            <span className="value">
              {formatNumber(this.props.value, this.props.currencyName)}
            </span>
            <span className="currency">{this.props.currencyName}</span>
          </FlexItem>
          <FlexItem className="actions">
            {actions.canBlacklist && (
              <CkoButton
                type="light"
                size="large"
                icon="blacklist"
                value="Blacklist"
                dataIndex="blacklistId"
                onClick={this.props.onClick}
              />
            )}
            {actions.canBlacklist &&
              (actions.canVoid || actions.canRefund || actions.canCapture) && (
                <DividerStyled className="divider" />
              )}
            {actions.canVoid && (
              <CkoButton
                size="large"
                icon="void"
                value="Void"
                dataIndex="voidId"
                onClick={this.props.onClick}
              />
            )}
            {actions.canRefund && (
              <CkoButton
                size="large"
                icon="void"
                value="Refund"
                dataIndex="refundId"
                onClick={this.props.onClick}
              />
            )}
            {actions.canCapture && (
              <CkoButton
                size="large"
                type="success"
                icon="capture"
                value="Capture"
                dataIndex="captureId"
                onClick={this.props.onClick}
              />
            )}
          </FlexItem>
        </AmountWrapStyled>
        <LogsWrapStyled showLogs={this.state.showLogs}>
          {this.renderLogs()}
          {this.showMoreLink() && (
            <div className="show-more" onClick={this.toggleLogs}>
              {this.renderShowLabel()}
            </div>
          )}
        </LogsWrapStyled>
      </FlexColumn>
    );
  }
}
