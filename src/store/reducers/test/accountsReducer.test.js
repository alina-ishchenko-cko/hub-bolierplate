import accountsReducer from '../accountsReducer';
import currencyIds from 'config/currencyIds.json';
import { ACCOUNTS_TYPE, LOGIN_TYPE } from 'store/constants';

describe('accountsReducer', () => {
  const DEFAULT_STATE = {
    fromDate: null,
    toDate: null,
    data: {
      loading: false,
      error: false,
      assetsLoading: false,
      assetsError: false,
      assetsSuccess: false,
      accounts: [],
      businesses: {},
    },
    selected: {
      account: {
        id: null,
        title: '',
      },
      business: {
        id: null,
        title: '',
      },
      channel: {
        id: null,
        title: '',
      },
    },
    channelCurrencies: {
      loading: false,
      error: false,
      currencies: [],
    },
  };
  let prevState = {};

  it('should return the initial state', () => {
    expect(accountsReducer()).toEqual(DEFAULT_STATE);
    prevState = { ...DEFAULT_STATE };
  });

  it('should handle ACCOUNTS_TYPE PENDING', () => {
    const expectedState = {
      ...prevState,
      data: {
        ...DEFAULT_STATE.data,
        loading: true,
      },
    };

    const action = {
      type: ACCOUNTS_TYPE.ACCOUNTS.PENDING,
    };

    expect(accountsReducer(prevState, action)).toEqual(expectedState);
    prevState = { ...expectedState };
  });

  it('should handle ACCOUNTS_TYPE SUCCESS', () => {
    const expectedState = {
      ...prevState,
      data: {
        ...prevState.data,
        accounts: [{ accountId: 1230 }],
        loading: false,
      },
      channelCurrencies: {
        loading: false,
        currencies: currencyIds.data,
      },
    };

    const action = {
      type: ACCOUNTS_TYPE.ACCOUNTS.SUCCESS,
      payload: {
        data: [{ accountId: 1230 }],
      },
    };

    expect(accountsReducer(prevState, action)).toEqual(expectedState);
    prevState = { ...expectedState };
  });

  it('should handle ASSETS_SUCCESS PENDING', () => {
    const expectedState = {
      ...prevState,
      data: {
        ...prevState.data,
        assetsLoading: true,
      },
    };

    const action = {
      type: ACCOUNTS_TYPE.ASSETS.PENDING,
    };

    expect(accountsReducer(prevState, action)).toEqual(expectedState);
    prevState = { ...expectedState };
  });

  it('should handle ACCOUNTS_TYPE ASSETS_SUCCESS', () => {
    const expectedState = {
      ...prevState,
      data: {
        ...prevState.data,
        assetsLoading: false,
        assetsSuccess: true,
        businesses: {
          '1230': [{ propertyId: 234234, channels: [1, 2] }],
        },
      },
    };

    const action = {
      type: ACCOUNTS_TYPE.ASSETS.SUCCESS,
      payload: {
        data: { businesses: [{ propertyId: 234234, channels: [1, 2] }] },
      },
      entityId: '1230',
    };

    expect(accountsReducer(prevState, action)).toEqual(expectedState);
    prevState = { ...expectedState };
  });

  it('should handle accountSelected', () => {
    const expectedState = {
      ...prevState,
      selected: {
        account: {
          id: 1230,
          title: 'title demo',
        },
        business: {
          id: null,
          title: '',
        },
        channel: {
          id: null,
          title: '',
        },
      },
    };

    let action = {
      type: ACCOUNTS_TYPE.SET_SELECTION,
      payload: {
        account: {
          id: 1230,
          title: 'title demo',
        },
        business: {
          id: null,
          title: '',
        },
        channel: {
          id: null,
          title: '',
        },
      },
    };

    expect(accountsReducer(prevState, action)).toEqual(expectedState);
    prevState = { ...expectedState };
  });

  it('should handle businessSelected', () => {
    const expectedState = {
      ...prevState,
      selected: {
        account: {
          id: 1230,
          title: 'title demo',
        },
        business: {
          id: 234234,
          title: 'biz title',
        },
        channel: {
          id: null,
          title: '',
        },
      },
    };

    let action = {
      type: ACCOUNTS_TYPE.SET_SELECTION,
      payload: {
        account: {
          id: 1230,
          title: 'title demo',
        },
        business: {
          id: 234234,
          title: 'biz title',
        },
        channel: {
          id: null,
          title: '',
        },
      },
    };

    expect(accountsReducer(prevState, action)).toEqual(expectedState);
    prevState = { ...expectedState };
  });

  it('should handle channelSelected', () => {
    const expectedState = {
      ...prevState,
      selected: {
        account: {
          id: 1230,
          title: 'title demo',
        },
        business: {
          id: 234234,
          title: 'biz title',
        },
        channel: {
          id: 444,
          title: 'channe title',
        },
      },
    };

    let action = {
      type: ACCOUNTS_TYPE.SET_SELECTION,
      payload: {
        account: {
          id: 1230,
          title: 'title demo',
        },
        business: {
          id: 234234,
          title: 'biz title',
        },
        channel: {
          id: 444,
          title: 'channe title',
        },
      },
    };

    expect(accountsReducer(prevState, action)).toEqual(expectedState);
    prevState = { ...expectedState };
  });

  it('should handle clear channel when business selected', () => {
    const expectedState = {
      ...prevState,
      selected: {
        account: {
          id: 1230,
          title: 'title demo',
        },
        business: {
          id: 234234,
          title: 'biz title',
        },
        channel: {
          id: null,
          title: '',
        },
      },
    };

    let action = {
      type: ACCOUNTS_TYPE.SET_SELECTION,
      payload: {
        account: {
          id: 1230,
          title: 'title demo',
        },
        business: {
          id: 234234,
          title: 'biz title',
        },
        channel: {
          id: null,
          title: '',
        },
      },
    };

    expect(accountsReducer(prevState, action)).toEqual(expectedState);
    prevState = { ...expectedState };
  });

  it('should handle ACCOUNTS_TYPE SET_DATES', () => {
    const expectedState = {
      ...prevState,
      fromDate: '12-12-2000',
      toDate: '12-12-2018',
    };

    let action = {
      type: ACCOUNTS_TYPE.SET_DATES,
      payload: {
        fromDate: '12-12-2000',
        toDate: '12-12-2018',
      },
    };

    expect(accountsReducer(prevState, action)).toEqual(expectedState);
    prevState = { ...expectedState };
  });

  it('should handle CURRENCIES PENDING', () => {
    const expectedState = {
      ...prevState,
      channelCurrencies: {
        ...DEFAULT_STATE.channelCurrencies,
        loading: true,
      },
    };

    let action = {
      type: ACCOUNTS_TYPE.CURRENCIES.PENDING,
    };

    expect(accountsReducer(prevState, action)).toEqual(expectedState);
    prevState = { ...expectedState };
  });

  it('should handle CURRENCIES SUCCESS', () => {
    const expectedState = {
      ...prevState,
      channelCurrencies: {
        ...DEFAULT_STATE.channelCurrencies,
        currencies: [1, 2, 3, 4],
      },
    };

    let action = {
      type: ACCOUNTS_TYPE.CURRENCIES.SUCCESS,
      payload: {
        data: [1, 2, 3, 4],
      },
    };

    expect(accountsReducer(prevState, action)).toEqual(expectedState);
    prevState = { ...expectedState };
  });
});
