// @flow
import * as React from 'react';
import CkoModal from 'components/ui/modal/';
import { FlexColumn, FlexRow, FlexItem } from 'components/ui/flex/';
import isEqual from 'lodash/isEqual';
import CkoSwitch from 'components/ui/switch/';
import feedback from 'components/ui/feedback/';
import { WrapStyled } from './Blacklist.sc';

type Props = {
  selected: Object,
  isReadOnly: boolean,
  action: Object,
  loading: boolean,
  chargeId: string,
  visible: boolean,
  cardNumber: boolean,
  ipAddress: boolean,
  email: boolean,
  cardNumberValue: string,
  emailValue: string,
  ipAddressValue: string,
  onCancel: Function,
  blacklistTransaction: Function,
  getTransactionBlacklist: Function,
};

type State = {
  fields: {
    cardNumber: boolean,
    ipAddress: boolean,
    email: boolean,
  },
};

export default class Blacklist extends React.Component<Props, State> {
  state = {
    fields: {
      cardNumber: this.props.cardNumber || false,
      ipAddress: this.props.ipAddress || false,
      email: this.props.email || false,
    },
  };

  shouldComponentUpdate(nextProps: Props, nextState: State) {
    return !isEqual(nextProps, this.props) || !isEqual(nextState, this.state);
  }

  static getDerivedStateFromProps(nextProps: Props, prevState: State) {
    const storeState = {
      cardNumber: nextProps.cardNumber,
      ipAddress: nextProps.ipAddress,
      email: nextProps.email,
    };
    if (!isEqual(storeState, prevState.fields)) {
      return {
        fields: storeState,
      };
    }
    return null;
  }

  componentDidUpdate(prevProps: Props) {
    // Make request to get blacklist details
    if (
      this.props.visible &&
      !isEqual(prevProps.chargeId, this.props.chargeId)
    ) {
      this.resetState();
      this.props.getTransactionBlacklist(this.props.chargeId);
      return;
    }

    // Show Notification
    if (!isEqual(prevProps.action, this.props.action)) {
      this.handleNotification(this.props.action);
    }
  }

  handleNotification(action: Object) {
    if (!action.loading && action.error && action.errorMsg) {
      feedback.error(action.errorMsg);
    } else if (!action.loading && action.success) {
      feedback.success('Blacklist successful');
      this.hideModal();
    }
  }

  hasValuesChanged() {
    const storeState = {
      cardNumber: this.props.cardNumber,
      ipAddress: this.props.ipAddress,
      email: this.props.email,
    };
    return !isEqual(this.state.fields, storeState);
  }

  resetState() {
    this.setState({
      fields: {
        cardNumber: false,
        ipAddress: false,
        email: false,
      },
    });
  }
  /**
   * Verify that the user has permissions and form fields are valid.
   * If they are, submit fields data
   */
  handleSubmit = (e: SyntheticEvent<any>) => {
    e.preventDefault();

    // Only merchant user can make update request
    if (this.doesUserHavePermissions() && this.hasValuesChanged()) {
      const { selected } = this.props;
      const params = {
        ...this.state.fields,
        channelId: selected.channel.id,
        businessId: selected.business.id,
        accountId: selected.account.id,
      };
      this.props.blacklistTransaction(this.props.chargeId, params);
    }
  };

  /**
   * Return false if the merchant has read only permission
   */
  doesUserHavePermissions(): boolean {
    return !this.props.isReadOnly;
  }

  /**
   * Get the text displayed on the confirmation modal
   * The text displayed depends on the user permission
   */
  getConfirmationText(): string {
    return this.doesUserHavePermissions()
      ? 'Are you sure you want to proceed?'
      : 'You do not have the required permission to make changes.';
  }

  /**
   * Get the title of the modal based on the merchant permissions
   */
  getModalTitle(): string {
    return this.doesUserHavePermissions() ? 'Blacklist' : 'Blacklist Status';
  }

  handleToggle = (value: boolean, key: string) => {
    this.setState(prevState => ({
      fields: {
        ...prevState.fields,
        [key]: value,
      },
    }));
  };

  hideModal = () => {
    this.props.onCancel('blacklistId');
  };

  isLoading() {
    return this.props.loading || this.props.action.loading;
  }

  disableOKBtn() {
    return (
      !this.doesUserHavePermissions() ||
      (this.doesUserHavePermissions() && !this.hasValuesChanged())
    );
  }

  render() {
    const { fields } = this.state;
    const { cardNumberValue, emailValue, ipAddressValue, loading } = this.props;
    const disableSwitch = !this.doesUserHavePermissions();
    return (
      <CkoModal
        okText="Blacklist"
        type="danger"
        okBtnType="danger"
        title={this.getModalTitle()}
        titleIcon="modal-payment"
        visible={this.props.visible}
        onOk={this.handleSubmit}
        onCancel={this.hideModal}
        loading={this.isLoading()}
        okButtonDisabled={this.disableOKBtn()}>
        <WrapStyled>
          <p className="sub-text">
            Chose which of the following attributes should be blacklisted
          </p>
          <FlexColumn>
            {cardNumberValue && (
              <FlexRow alignItems="center" margin="0 0 30px 0">
                <FlexItem>
                  <p className="label">
                    Card number{' '}
                    <span className="label-caption">{cardNumberValue}</span>
                  </p>
                </FlexItem>
                <FlexItem className="text-right">
                  {!loading && (
                    <CkoSwitch
                      dataIndex="cardNumber"
                      defaultChecked={fields.cardNumber}
                      type="circle"
                      onToggleBtn={this.handleToggle}
                      disabled={disableSwitch || !cardNumberValue}
                    />
                  )}
                </FlexItem>
              </FlexRow>
            )}
            <FlexRow alignItems="center" margin="0 0 30px 0">
              <FlexItem>
                <p className="label">
                  Email address{' '}
                  <span className="label-caption">{emailValue}</span>
                </p>
              </FlexItem>
              <FlexItem className="text-right">
                {!loading && (
                  <CkoSwitch
                    dataIndex="email"
                    defaultChecked={fields.email}
                    type="circle"
                    onToggleBtn={this.handleToggle}
                    disabled={disableSwitch || !emailValue}
                  />
                )}
              </FlexItem>
            </FlexRow>
            <FlexRow alignItems="center" margin="0 0 30px 0">
              <FlexItem>
                <p className="label">
                  IP address{' '}
                  <span className="label-caption">
                    {ipAddressValue || 'none'}
                  </span>
                </p>
              </FlexItem>
              <FlexItem className="text-right">
                {!loading && (
                  <CkoSwitch
                    dataIndex="ipAddress"
                    defaultChecked={fields.ipAddress}
                    type="circle"
                    onToggleBtn={this.handleToggle}
                    disabled={disableSwitch || !ipAddressValue}
                  />
                )}
              </FlexItem>
            </FlexRow>
          </FlexColumn>
        </WrapStyled>
      </CkoModal>
    );
  }
}
