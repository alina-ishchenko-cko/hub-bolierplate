import * as helper from '../ui.util';
import * as cs from 'services/currency/currencyService';

describe('ui helpers functions', () => {
  it('should contain valid action', () => {
    const actions = {
      CONTAINS: 'CONTAINS',
      EQUALS: 'EQUALS',
      BEGINS: 'BEGINS',
      ENDS: 'ENDS',
      GT: 'GT',
      GTE: 'GTE',
      LT: 'LT',
      LTE: 'LTE',
      SHOW: 'INCLUDE',
      HIDE: 'EXCLUDE',
    };
    expect(helper.FILTER_ACTIONS).toEqual(actions);
  });

  it('should point to the right assets path', () => {
    expect(helper.assetsPath).toEqual('/assets');
  });

  it('should remove empty props', () => {
    const data = {
      name: undefined,
      id: null,
      desc: 'hello testing',
      price: 203,
    };

    const expectedData = {
      desc: 'hello testing',
      price: 203,
    };
    expect(helper.removeEmptyObjects(data)).toEqual(expectedData);
  });

  describe('getTransactionStatusClass()', () => {
    it('should return the Success transaction selector', () => {
      const status = helper.getTransactionStatusClass(
        'Authorisation : Success'
      );
      expect(status).toEqual('green');
    });

    it('should return the failed transaction selector', () => {
      const status = helper.getTransactionStatusClass('Authorisation : Fail');
      expect(status).toEqual('red');
    });

    it('should return the failed transaction selector', () => {
      const status = helper.getTransactionStatusClass(
        'Authorisation : Pending'
      );
      expect(status).toEqual('yellow');
    });

    it('should return the default for unknown transaction status', () => {
      const status = helper.getTransactionStatusClass('Authorisation : Done');
      expect(status).toEqual('default');
    });
  });

  describe('getMenuArray()', () => {
    const menuMock = [
      {
        label: 'Dashboard',
        link: '/dashboard',
        icon: 'sidebar-dashboard',
        id: 'dashboard-link',
        isAuthorised: false,
      },
      {
        label: 'Transactions',
        link: '/transactions',
        icon: 'sidebar-transactions',
        id: 'transactions-link',
        isAuthorised: false,
      },
      {
        label: 'Customers',
        link: '/customers',
        icon: 'sidebar-customers',
        id: 'customers-link',
        isAuthorised: false,
      },
      // {
      //   label: 'Payment plans',
      //   link: '/payment-plans',
      //   icon: 'sidebar-plans',
      //   id: 'payment-link',
      // },
      {
        label: 'Statements',
        link: '/statements',
        icon: 'sidebar-statements',
        id: 'statements-link',
        isAuthorised: false,
      },
      // {
      //   label: 'Blacklist cards',
      //   link: '/risk/blacklist',
      //   icon: 'sidebar-blacklisted',
      //   id: 'blacklist-link',
      // },
      {
        label: 'Reports',
        link: '/reports',
        icon: 'sidebar-reports',
        id: 'reports-link',
        isAuthorised: false,
      },
      {
        isAuthorised: true,
        sideInfo: true,
      },
      {
        label: 'Settings',
        link: '/settings',
        icon: 'sidebar-settings',
        id: 'settings-link',
        isAuthorised: true,
      },
      {
        isAuthorised: true,
        logout: true,
        label: 'Log out',
        icon: 'sidebar-logout',
        id: 'logout-link',
      },
    ];
    it('should contain the main struture', () => {
      expect(helper.getMenuArray()).toEqual(menuMock);
    });
  });

  describe('formErrorMsg', () => {
    const msgMock = {
      creditCard: 'Please enter a valid card details',
      email: 'Please enter a valid email',
      cardholder: 'Please enter cardholder name',
      amount: 'Please enter valid amount',
      cardExpDate: 'Please enter valid date',
      cvv: 'Please enter valid CVV',
      channel: 'Please select a channel',
      currency: 'Please select a currency',
      paymentPlan: 'Please select payment plan',
      address: 'Please enter the address',
      city: 'Please enter the city',
      postcode: 'Please enter the postcode',
      country: 'Please select country',
    };
    it('should contain the main struture', () => {
      expect(helper.formErrorMsg).toEqual(msgMock);
    });
  });

  describe('getFormattedPhoneNumber()', () => {
    it('should format the phone number correctly', () => {
      const expected = '+33 22545688';
      const phone = {
        countryCode: '33',
        number: '22545688',
      };
      const received = helper.getFormattedPhoneNumber(phone);
      expect(received).toEqual(expected);
    });

    it('should return an empty string if phone number empty', () => {
      expect(helper.getFormattedPhoneNumber({})).toEqual('');
      expect(helper.getFormattedPhoneNumber({ countryCode: '' })).toEqual('');
    });
  });

  describe('Px to Em/Rem converter', () => {
    it('should convert Px to Em', () => {
      expect(helper.toEm(13)).toEqual('1em');
    });
    it('should convert Px to Rem', () => {
      expect(helper.toRem(13)).toEqual('0.8125rem');
    });
  });

  describe('numberShortner()', () => {
    it('should shorten 2000000 to 2,000k', () => {
      expect(helper.numberShortner('2000000')).toEqual('2,000k');
    });
  });

  describe('formatNumber()', () => {
    beforeAll(() => {
      const mockCurrencies = [
        {
          currencyId: 1,
          name: 'AED',
        },
        {
          currencyId: 2,
          name: 'GBP',
          coefficient: 2,
          currencyId: 106,
          isCommon: true,
          isSettlement: true,
        },
        {
          currencyId: 3,
          name: 'USD',
        },
      ];
      cs.setCurrency(mockCurrencies, 2);
    });

    it('should return 0.00 for null currencyName & value', () => {
      expect(helper.formatNumber()).toEqual('0');
    });

    it('should format 20000 to 20,000 for int type', () => {
      expect(helper.formatNumber(20000)).toEqual('20,000');
    });

    it('should format 20000 to 20,000 for string type', () => {
      expect(helper.formatNumber('20000')).toEqual('20,000');
    });

    it('should shorten the value', () => {
      expect(helper.formatNumber('20000000', '', true)).toEqual('20,000k');
    });

    it('should format value according to currency', () => {
      expect(helper.formatNumber('5000', 'GBP')).toEqual('5,000.00');
    });

    it('should format value according to currency', () => {
      expect(helper.formatNumber(10.5, 'GBP')).toEqual('10.50');
    });
  });

  describe('getBrowserType()', () => {
    afterAll(() => {
      delete global.InstallTrigger;
      delete global.safari;
      delete global.StyleMedia;
      delete global.chrome;
    });

    it('should be chrome', () => {
      global.InstallTrigger = 'firefox';
      const browser = helper.getBrowserType();
      expect(browser.isFirefox).toEqual(true);
    });

    it('should be Safari', () => {
      global.safari = {
        pushNotification: true,
      };
      const browser = helper.getBrowserType();
      expect(browser.isSafari).toEqual(true);
    });

    it('should be chrome', () => {
      global.chrome = {
        webstore: true,
      };
      const browser = helper.getBrowserType();
      expect(browser.isChrome).toEqual(true);
    });
  });
});
