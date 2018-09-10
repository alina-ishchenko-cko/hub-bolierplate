// @flow
import { buildReducer } from 'utils/reducer.util';
import { ACCOUNTS_TYPE } from 'store/constants';
import cloneDeep from 'lodash/cloneDeep';
import { storeBusinesses } from 'services/business/businessService';
import * as typed from './flow-type';
import currencyIds from 'config/currencyIds.json';

type State = {
  fromDate: ?string,
  toDate: ?string,
  data: typed.Account,
  selected: typed.Selected,
  channelCurrencies: typed.AccountChannel,
};

const DEFAULT_STATE: State = {
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

const handlers = {
  /**
   * Login Load Cache Data
   */
  [ACCOUNTS_TYPE.CACHED_DATA]: (state: Object, action: Object) => {
    const cachedData = action.payload.data;

    // Store accounts in business services
    if (cachedData.data) {
      storeBusinesses(cachedData.data.businesses);
    }

    return cachedData;
  },
  /**
   * Accounts - Pending
   */
  [ACCOUNTS_TYPE.ACCOUNTS.PENDING]: (state: Object, action: Object) => ({
    ...state,
    data: {
      ...DEFAULT_STATE.data,
      loading: true,
    },
  }),
  /**
   * Accounts - Success
   */
  [ACCOUNTS_TYPE.ACCOUNTS.SUCCESS]: (state: Object, action: Object) => ({
    ...state,
    data: {
      ...state.data,
      loading: false,
      accounts: [...action.payload.data],
    },
    channelCurrencies: {
      loading: false,
      currencies: currencyIds.data,
    },
  }),
  /**
   * Assets - Pending
   */
  [ACCOUNTS_TYPE.ASSETS.PENDING]: (state: Object, action: Object) => ({
    ...state,
    data: {
      ...state.data,
      assetsLoading: true,
    },
  }),
  /**
   * Assets - Success
   */
  [ACCOUNTS_TYPE.ASSETS.SUCCESS]: (state: Object, action: Object) => {
    const businesses = cloneDeep(state.data.businesses);
    businesses[action.entityId] = action.payload.data.businesses;

    // Store accounts in business services
    storeBusinesses(businesses);

    return {
      ...state,
      data: {
        ...state.data,
        assetsLoading: false,
        assetsSuccess: true,
        businesses,
      },
    };
  },
  /**
   * Set Selection
   */
  [ACCOUNTS_TYPE.SET_SELECTION]: (state: Object, action: Object) => {
    const { account, business, channel } = action.payload;

    let selectionData = cloneDeep(state.selected);
    if (account && account.id) {
      selectionData.account = account;
      selectionData.business = { id: null, title: '' };
      selectionData.channel = { id: null, title: '' };
    }

    if (business && business.id) {
      selectionData.business = business;
      selectionData.channel = { id: null, title: '' };
    }

    if (channel && channel.id) {
      selectionData.channel = channel;
    }

    return {
      ...state,
      selected: {
        ...selectionData,
      },
    };
  },
  /**
   * Set Date Range
   */
  [ACCOUNTS_TYPE.SET_DATES]: (state: Object, action: Object) => {
    const { fromDate, toDate } = action.payload;
    return { ...state, fromDate, toDate };
  },
  /**
   * Currencies - Pending
   */
  [ACCOUNTS_TYPE.CURRENCIES.PENDING]: (state: Object, action: Object) => ({
    ...state,
    channelCurrencies: {
      ...DEFAULT_STATE.channelCurrencies,
      loading: true,
    },
  }),
  /**
   * Currencies - Success
   */
  [ACCOUNTS_TYPE.CURRENCIES.SUCCESS]: (state: Object, action: Object) => ({
    ...state,
    channelCurrencies: {
      ...DEFAULT_STATE.channelCurrencies,
      currencies: [...action.payload.data],
    },
  }),
};

export default buildReducer(handlers, DEFAULT_STATE);
