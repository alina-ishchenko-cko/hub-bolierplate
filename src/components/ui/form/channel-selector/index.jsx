// @flow
import * as React from 'react';
import CkoSelect from 'components/ui/form/CkoSelect';

type Props = {
  form: Object,
  businesses: Array<Object>,
  accountId: number,
  businessId: number,
  channelId: number,
  onChange?: Function,
};

type State = {
  selectedBusinessId: number,
  channels: Array<Object>,
};

export default class ChannelSelector extends React.Component<Props, State> {
  state = {
    selectedBusinessId: 0,
    channels: [],
  };

  componentDidMount() {
    if (this.props.businessId) {
      this.setChannels();
    }
  }

  getBusinessList() {
    const businesses = this.props.businesses[this.props.accountId];
    if (!businesses || !businesses.length) {
      return [];
    }
    return businesses.map(business => ({
      key: business.propertyId,
      value: `${business.propertyId}`,
      label: business.propertyName,
    }));
  }

  setBusinessId = (selectedBusinessId: string) => {
    this.setState(
      { selectedBusinessId: parseInt(selectedBusinessId, 10) },
      this.setChannels
    );
  };

  setChannels() {
    const businesses = this.props.businesses[this.props.accountId];
    const businessId = this.props.businessId || this.state.selectedBusinessId;
    const selectedBusiness = businesses.filter(
      business => business.propertyId === businessId
    );

    const { channels } = selectedBusiness[0];
    this.setState({ channels });
  }

  getChannelList(): Array<Object> {
    type Channel = {
      channelId: number,
      value: string,
      channelName: string,
    };
    return this.state.channels.map((channel: Channel) => ({
      key: channel.channelId,
      value: `${channel.channelId}`,
      label: channel.channelName,
    }));
  }

  render() {
    const { form, channelId } = this.props;

    return (
      !channelId && (
        <div>
          {!this.props.businessId && (
            <CkoSelect
              required
              id="businessId"
              size="large"
              label="Business"
              form={form}
              onChange={this.setBusinessId}
              data={this.getBusinessList()}
              placeholder="Select business"
            />
          )}
          <CkoSelect
            required
            id="channelId"
            size="large"
            label="Channel"
            form={form}
            data={this.getChannelList()}
            placeholder="Select Channel"
          />
        </div>
      )
    );
  }
}
