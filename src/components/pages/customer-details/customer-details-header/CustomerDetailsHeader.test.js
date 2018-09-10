import React from 'react';
import CustomerDetailsHeader from './CustomerDetailsHeader';
import CopyToClipboardBtn from 'components/ui/copy-to-clipboard-btn';
import UpdateCustomerDetails from '../update-customer-details/';
import { HeaderStyled } from 'components/ui/layout/styled/CkoSideContent.sc';
import {
  CustomerNameWrapperStyled,
  CustomerInfoWrapperStyled,
} from './CustomerDetailsHeader.sc';

describe('Customer Details Header', () => {
  let wrapper;
  let mockProps;

  beforeEach(() => {
    mockProps = {
      details: {
        name: 'Alice',
        createdDate: '2018-04-17T13:51:49.837',
        phone: {},
        email: 'a@a.com',
        id: 'plan_1',
      },
      isReadOnly: false,
      countries: [
        {
          countryId: 1,
          countryIso2Code: 'AF',
          countryPhoneCode: '93',
          name: 'Afghanistan',
        },
        {
          countryId: 239,
          countryIso2Code: 'AX',
          countryPhoneCode: '358 18',
          name: 'Aland',
        },
      ],
      updateCustomerDetails: jest.fn(),
    };
    wrapper = shallow(<CustomerDetailsHeader {...mockProps} />);
    wrapper.setState({ loading: false, isEditDetailsDialogVisible: false });
  });

  // beforeEach(() => {
  //   wrapper.setProps(mockProps);
  //   wrapper.setState({ loading: false, isEditDetailsDialogVisible: false });
  // });

  it('renders without crashing', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('renders correctly', () => {
    const tree = renderer
      .create(<CustomerDetailsHeader {...mockProps} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('contains all required components', () => {
    expect(wrapper.find(CustomerNameWrapperStyled)).toHaveLength(1);
    expect(wrapper.find(CustomerInfoWrapperStyled)).toHaveLength(1);
    expect(wrapper.find('.customer-name')).toHaveLength(1);
    expect(wrapper.find('.edit-details-btn')).toHaveLength(1);
    expect(wrapper.find('.email')).toHaveLength(1);
    expect(wrapper.find('.create-date')).toHaveLength(1);
    expect(wrapper.find('.phone')).toHaveLength(1);
    expect(wrapper.find('.plan-id')).toHaveLength(1);
    expect(wrapper.find(CopyToClipboardBtn)).toHaveLength(1);
  });

  it('does not show Edit button if user is read only', () => {
    wrapper.setProps({
      isReadOnly: true,
    });
    expect(wrapper.find('button.edit-details-btn')).toHaveLength(0);
  });

  it('toggles update details dialog if isEditDetailsDialogVisible changes', () => {
    wrapper.setState({ isEditDetailsDialogVisible: true });
    expect(wrapper.find(UpdateCustomerDetails)).toHaveLength(1);
    wrapper.setState({ isEditDetailsDialogVisible: false });
    expect(wrapper.find(UpdateCustomerDetails)).toHaveLength(0);
  });

  it('toggles state on Edit button click', () => {
    const prevIsEditDetailsDialogVisible = wrapper.instance().state
      .isEditDetailsDialogVisible;
    wrapper.find('.edit-details-btn').simulate('click');
    expect(wrapper.instance().state.isEditDetailsDialogVisible).not.toBe(
      prevIsEditDetailsDialogVisible
    );
  });
});
