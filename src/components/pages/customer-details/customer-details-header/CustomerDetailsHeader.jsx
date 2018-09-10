// @flow
import * as React from 'react';
import { FlexColumn, FlexItem } from 'components/ui/flex';
import isEqual from 'lodash/isEqual';
import {
  WrapperStyled,
  CustomerNameWrapperStyled,
  CustomerInfoWrapperStyled,
} from './CustomerDetailsHeader.sc';
import CkoButton from 'components/ui/button';
import CkoIcon from 'components/ui/icon';
import UpdateCustomerDetails from '../update-customer-details';
import CopyToClipboardBtn from 'components/ui/copy-to-clipboard-btn';
import moment from 'moment';
import CkoLoading from 'components/ui/loading/';

type Props = {
  details: {
    name: string,
    createdDate: string,
    phone: Object,
    email: string,
    id: string,
  },
  isReadOnly: boolean,
  countries: Array<Object>,
  updateCustomerDetails: Function,
};

type State = {
  loading: boolean,
  isEditDetailsDialogVisible: boolean,
};

export default class CustomerDetailsHeader extends React.Component<
  Props,
  State
> {
  state = {
    loading: false,
    isEditDetailsDialogVisible: false,
  };

  shouldComponentUpdate(nextProps: Props, nextState: State) {
    return this.hasDataChanged(nextProps) || !isEqual(nextState, this.state);
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    if (this.hasDataChanged(prevProps)) {
      this.setState({ loading: true });
    } else if (this.state.loading) {
      // Add a bit of delay to make the loader icon more obvious
      setTimeout(() => {
        this.setState({ loading: false });
      }, 300);
    }
  }

  hasDataChanged(nextProps: Props): boolean {
    const prevDetails = {
      name: this.props.details.name,
      createdDate: this.props.details.createdDate,
      phone: this.props.details.phone,
      email: this.props.details.email,
      id: this.props.details.id,
    };
    const details = {
      name: nextProps.details.name,
      createdDate: nextProps.details.createdDate,
      phone: nextProps.details.phone,
      email: nextProps.details.email,
      id: nextProps.details.id,
    };
    return !isEqual(prevDetails, details);
  }

  toggleEditDetailsDialog = () => {
    this.setState(prevState => {
      return {
        isEditDetailsDialogVisible: !prevState.isEditDetailsDialogVisible,
      };
    });
  };

  getFormattedPhone() {
    // TODO find a library to format phone according to the country standards
    const { phone } = this.props.details;
    if (!phone || !phone.number) {
      return 'N/A';
    }

    let formattedPhone = '';
    if (phone.countryCode) {
      formattedPhone = `+${phone.countryCode} `;
    }
    if (phone.number) {
      formattedPhone = `${formattedPhone}${phone.number}`;
    }
    return formattedPhone;
  }

  render() {
    return (
      <WrapperStyled className="customer-details-header">
        {this.state.loading && <CkoLoading full opacity="1" />}
        {this.state.isEditDetailsDialogVisible ? (
          <UpdateCustomerDetails
            onCancel={this.toggleEditDetailsDialog}
            updateCustomerDetails={this.props.updateCustomerDetails}
            name={this.props.details.name}
            email={this.props.details.email}
            phone={this.props.details.phone}
            customerId={this.props.details.id}
            countries={this.props.countries}
          />
        ) : null}
        <FlexColumn>
          <CustomerNameWrapperStyled>
            <FlexItem className="customer-name">
              {this.props.details.name || 'N/A'}
            </FlexItem>
            {!this.props.isReadOnly ? (
              <FlexItem className="actions">
                <CkoButton
                  className="edit-details-btn"
                  size="large"
                  icon="edit"
                  value="Edit"
                  dataIndex="editCustomerDetails"
                  onClick={this.toggleEditDetailsDialog}
                />
              </FlexItem>
            ) : null}
          </CustomerNameWrapperStyled>
          <CustomerInfoWrapperStyled>
            <FlexColumn
              className="customer-info-column"
              alignItems="start"
              grow={0}>
              <FlexItem className="email">
                <CkoIcon className="email-icon" name="email" />
                <span> {this.props.details.email}</span>
              </FlexItem>
              <FlexItem className="create-date">
                <CkoIcon className="date-icon" name="date" />
                <span>
                  {moment(this.props.details.createdDate).format(
                    'DD/MM/YYYY HH:mm:ss'
                  )}
                </span>
              </FlexItem>
            </FlexColumn>
            <FlexColumn
              className="customer-info-column"
              alignItems="start"
              grow={0}>
              <FlexItem className="phone">
                <CkoIcon className="phone-icon" name="phone" />
                <span>{this.getFormattedPhone()}</span>
              </FlexItem>
              <FlexItem className="plan-id">
                <CkoIcon className="id-icon" name="id" />
                <span className="id-text">{this.props.details.id}</span>
                <CopyToClipboardBtn text={this.props.details.id} />
              </FlexItem>
            </FlexColumn>
          </CustomerInfoWrapperStyled>
        </FlexColumn>
      </WrapperStyled>
    );
  }
}
