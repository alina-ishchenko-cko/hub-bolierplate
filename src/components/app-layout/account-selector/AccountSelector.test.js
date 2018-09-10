import React from 'react';
import CkoLoading from 'components/ui/loading/';
import AccountSelector from './';
import BusinessList from './business-list/';
import {
  WrapStyled,
  SelectedStyled,
  BusinessListStyled,
} from './AccountSelector.sc';

describe('AccountSelector', () => {
  let AppComp;
  const accountsData = [
    {
      accountId: 1000,
      name: 'account demo',
    },
  ];
  let mockProps = {};

  beforeEach(() => {
    mockProps = {
      selected: {
        account: {
          id: 1000,
          title: 'account demo',
        },
        business: {
          id: 1002,
          title: 'business demo',
        },
        channel: {
          id: 1003,
          title: 'channel demo',
        },
      },
      onChange: jest.fn(),
      onOpen: jest.fn(),
      accounts: accountsData,
      businesses: {
        '1000': [
          {
            propertyId: 1002,
            propertyName: 'business demo',
            channels: [
              {
                channelId: 1003,
                channelName: 'channel demo',
              },
            ],
          },
        ],
      },
      loading: false,
      isGodUser: false,
    };
    AppComp = shallow(<AccountSelector {...mockProps} />);
  });

  afterEach(() => {
    AppComp = null;
    mockProps.onChange.mockClear();
  });

  it('renders without crashing', () => {
    expect(AppComp.exists()).toBe(true);
  });

  it('should load the default props and state', () => {
    AppComp = mount(<AccountSelector />);
    const defaultProps = {
      selected: {
        account: {
          id: 0,
          title: '',
        },
        business: {
          id: 0,
          title: '',
        },
        channel: {
          id: 0,
          title: '',
        },
      },
      accounts: [],
      businesses: {},
      loading: false,
      isGodUser: false,
    };
    expect(AppComp.props()).toEqual(defaultProps);
    expect(AppComp.state('isOpen')).toEqual(false);
  });

  it('should contain BusinessList', () => {
    expect(AppComp.find(BusinessList)).toHaveLength(1);
  });

  it('should contain styled components', () => {
    expect(AppComp.find(WrapStyled)).toHaveLength(1);
    expect(AppComp.find(SelectedStyled)).toHaveLength(1);
    expect(AppComp.find(BusinessListStyled)).toHaveLength(1);
  });

  it('should show loader', () => {
    mockProps.loading = true;
    AppComp = shallow(<AccountSelector {...mockProps} />);

    expect(AppComp.contains('channel demo')).toEqual(false);
    expect(AppComp.find(CkoLoading)).toHaveLength(1);
    expect(AppComp.find(BusinessList)).toHaveLength(0);
  });

  it('should return false for single channel when menu is clicked', () => {
    const Menu = AppComp.find(SelectedStyled);
    Menu.simulate('click', {
      preventDefault: () => {},
      stopPropagation: () => {},
    });
    expect(AppComp.state().isOpen).toEqual(false);
  });

  it('should disable dropdown for single channel', () => {
    const Wrap = AppComp.find(WrapStyled);
    expect(Wrap.prop('disableDropDown')).toEqual(true);
  });

  it('should set isGodUser props false', () => {
    expect(AppComp.find(BusinessList).prop('showSearch')).toEqual(false);
    expect(AppComp.find(BusinessListStyled).prop('isGodUser')).toEqual(false);
  });

  it('should set isGodUser props true', () => {
    mockProps.isGodUser = true;
    AppComp = shallow(<AccountSelector {...mockProps} />);
    expect(AppComp.find(BusinessList).prop('showSearch')).toEqual(true);
    expect(AppComp.find(BusinessListStyled).prop('isGodUser')).toEqual(true);
  });

  it('should set the title to channel title', () => {
    const title = AppComp.contains(
      <span className="parent-title">business demo</span>
    );
    const subTitle = AppComp.contains(
      <div className="child-title">channel demo</div>
    );

    expect(title).toEqual(true);
    expect(subTitle).toEqual(true);
  });

  it('should set the title to business title', () => {
    mockProps.selected.channel = {
      id: null,
      title: '',
    };

    AppComp = shallow(<AccountSelector {...mockProps} />);
    const title = AppComp.contains(
      <span className="parent-title">account demo</span>
    );
    const subTitle = AppComp.contains(
      <div className="child-title">business demo</div>
    );
    expect(title).toEqual(true);
    expect(subTitle).toEqual(true);
  });

  it('should set the title to account title', () => {
    mockProps.selected.channel = { id: null, title: '' };
    mockProps.selected.business = { id: null, title: '' };

    AppComp = shallow(<AccountSelector {...mockProps} />);
    const title = AppComp.contains(
      <span className="parent-title">Select Account</span>
    );
    const subTitle = AppComp.contains(
      <div className="child-title">account demo</div>
    );
    expect(title).toEqual(true);
    expect(subTitle).toEqual(true);
  });

  it('should not load BusinessList component if accounts array is empty', () => {
    mockProps.accounts = [];
    AppComp = shallow(<AccountSelector {...mockProps} />);
    expect(AppComp.find(BusinessList)).toHaveLength(0);
  });

  it('should set call handleSelection, onChange and toggleMenu. Set the selection', () => {
    const Biz = AppComp.find(BusinessList);
    Biz.simulate('click', {
      preventDefault: () => {},
      stopPropagation: () => {},
      currentTarget: {
        title: 'new channel',
        id: '1004',
        getAttribute(value) {
          if (value === 'data-type') {
            return 'channel';
          }
          return 'true';
        },
      },
    });

    const selected = {
      ...mockProps.selected,
      channel: {
        title: 'new channel',
        id: 1004,
      },
    };
    expect(mockProps.onChange).toHaveBeenCalledWith(selected);
    expect(mockProps.onOpen).toHaveBeenCalledWith(false);
  });
});
