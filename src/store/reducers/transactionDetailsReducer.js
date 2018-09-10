// @flow
import {
  TRANSACTIONS,
  TRANSACTION_ACTIONS,
  TRANSACTION_BLACKLIST,
} from 'store/constants';
import { buildReducer } from 'utils/reducer.util';
import * as typed from './flow-type';

type State = {
  batch: {
    loading: boolean,
    error: boolean,
    success: boolean,
    list: Array<Object>,
  },
  data: {
    loading: boolean,
    error: boolean,
    details: typed.tDataDetails,
    indicators: typed.tIndicator,
    logs: Array<Object>,
    paymentMethods: typed.tPaymentMethods,
    purchases: typed.tPurchases,
  },
  actions: typed.Actions,
  blacklistData: typed.BlackListData,
};

const DEFAULT_STATE: State = {
  batch: {
    loading: false,
    error: false,
    success: false,
    list: [],
  },
  data: {
    loading: false,
    error: false,
    success: false,
    details: {
      arn: '',
      authorizationCode: '',
      authorizationDate: '',
      billingDescriptor: '',
      chargeId: '',
      longResponseCode: '',
      shortResponseCode: '',
      trackId: '',
      transactionIndicator: '',
    },
    indicators: {
      currencySymbol: '',
      paymentMethodName: '',
      transactionDate: '',
      transactionStatus: '',
      transactionValue: 0,
    },
    logs: [],
    paymentMethods: {
      avsCheck: '',
      avsDescription: '',
      bankCountry: '',
      cardHolder: '',
      cardId: '',
      cardProduct: '',
      cardWalletType: 0,
      ccNumber: '',
      customerId: '',
      customerName: '',
      cvvCheck: '',
      cvvDescription: '',
      cvvPresent: false,
      expiryMonth: 0,
      expiryYear: 0,
      issuingBank: '',
      paymentMethod: '',
    },
    purchases: {
      captureTransactionId: '',
      currencyId: 0,
      currencySymbol: '',
      customerIp: '',
      customerIpCountryIso3: '',
      description: '',
      maxRefundAmount: 0,
      product: [],
      shippingAddress: {
        addressLine1: '',
        addressLine2: '',
        city: '',
        country: '',
        phone: { number: '' },
        postCode: '',
        recipientName: '',
        state: '',
        userDefined: '',
      },
      userData: {},
    },
  },
  actions: {
    void: {
      loading: false,
      error: false,
      success: false,
      status: '',
      batch: {
        loading: false,
        error: false,
        success: false,
        status: '',
      },
    },
    capture: {
      loading: false,
      error: false,
      success: false,
      status: '',
      batch: {
        loading: false,
        error: false,
        success: false,
        status: '',
      },
    },
    refund: {
      loading: false,
      error: false,
      success: false,
      status: '',
      batch: {
        loading: false,
        error: false,
        success: false,
        status: '',
      },
    },
    blacklist: {
      loading: false,
      error: false,
      success: false,
      status: '',
    },
  },
  blacklistData: {
    loading: false,
    error: false,
    success: false,
    email: false,
    emailValue: '',
    cardNumberValue: '',
    phoneNumberValue: '',
    phoneNumber: false,
    cardNumber: false,
    ipAddressValue: '',
    ipAddress: false,
    isLocalBlackList: false,
  },
};

const handlers = {
  /**
   * Batch - Pending
   */
  [TRANSACTIONS.BATCH.PENDING]: (state: Object, action: Object) => ({
    ...state,
    batch: {
      ...state.batch,
      loading: true,
      error: false,
      success: false,
    },
  }),
  /**
   * Batch - Success
   */
  [TRANSACTIONS.BATCH.SUCCESS]: (state: Object, action: Object) => {
    const { data } = action.payload;
    return {
      ...state,
      batch: {
        loading: false,
        error: false,
        success: true,
        list: [...state.batch.list, data],
      },
    };
  },
  /**
   * Clear Batch
   */
  [TRANSACTIONS.BATCH.CLEAR]: (state: Object, action: Object) => ({
    ...state,
    batch: DEFAULT_STATE.batch,
  }),
  /**
   * Single - Pending
   */
  [TRANSACTIONS.SINGLE.PENDING]: (state: Object, action: Object) => ({
    ...DEFAULT_STATE,
    batch: DEFAULT_STATE.batch,
    data: {
      ...DEFAULT_STATE.data,
      loading: true,
    },
  }),
  /**
   * Single - Success
   */
  [TRANSACTIONS.SINGLE.SUCCESS]: (state: Object, action: Object) => {
    const { data } = action.payload;
    return {
      ...state,
      data: {
        ...data,
        loading: false,
        success: true,
      },
    };
  },
  /**
   * Single - Error
   */
  [TRANSACTIONS.SINGLE.ERROR]: (state: Object, action: Object) => ({
    ...state,
    data: {
      ...state.data,
      loading: false,
      error: true,
    },
  }),
  /**
   * Void - Action  - Pending
   */
  [TRANSACTION_ACTIONS.VOID.PENDING]: (state: Object, action: Object) => ({
    ...state,
    actions: {
      ...state.actions,
      void: {
        ...DEFAULT_STATE.actions.void,
        loading: true,
      },
    },
  }),
  /**
   * Void - Action  - Success
   */
  [TRANSACTION_ACTIONS.VOID.SUCCESS]: (state: Object, action: Object) => ({
    ...state,
    actions: {
      ...state.actions,
      void: {
        ...DEFAULT_STATE.actions.void,
        success: true,
        data: { chargeId: action.payload.data.id },
      },
    },
  }),
  /**
   * Void - Action  - Error
   */
  [TRANSACTION_ACTIONS.VOID.ERROR]: (state: Object, action: Object) => ({
    ...state,
    actions: {
      ...state.actions,
      void: {
        ...DEFAULT_STATE.actions.void,
        error: true,
        errorMsg: action.payload.data.message,
      },
    },
  }),
  /**
   * Void (Batch) - Pending
   */
  [TRANSACTION_ACTIONS.VOID_BATCH.PENDING]: (
    state: Object,
    action: Object
  ) => ({
    ...state,
    actions: {
      ...state.actions,
      void: {
        ...DEFAULT_STATE.actions.void,
        batch: {
          ...DEFAULT_STATE.actions.void.batch,
          loading: true,
        },
      },
    },
  }),
  /**
   * Void (Batch) - Success
   */
  [TRANSACTION_ACTIONS.VOID_BATCH.SUCCESS]: (
    state: Object,
    action: Object
  ) => ({
    ...state,
    actions: {
      ...state.actions,
      void: {
        ...DEFAULT_STATE.actions.void,
        batch: {
          ...DEFAULT_STATE.actions.void.batch,
          loading: false,
          success: true,
        },
      },
    },
  }),
  /**
   * Void (Batch) - Error
   */
  [TRANSACTION_ACTIONS.VOID_BATCH.ERROR]: (state: Object, action: Object) => ({
    ...state,
    actions: {
      ...state.actions,
      void: {
        ...DEFAULT_STATE.actions.void,
        batch: {
          loading: false,
          success: false,
          error: true,
        },
      },
    },
  }),
  /**
   * Capture - Action  - Pending
   */
  [TRANSACTION_ACTIONS.CAPTURE.PENDING]: (state: Object, action: Object) => ({
    ...state,
    actions: {
      ...state.actions,
      capture: {
        ...DEFAULT_STATE.actions.capture,
        loading: true,
      },
    },
  }),
  /**
   * Capture - Action  - Success
   */
  [TRANSACTION_ACTIONS.CAPTURE.SUCCESS]: (state: Object, action: Object) => ({
    ...state,
    actions: {
      ...state.actions,
      capture: {
        ...state.actions.capture,
        loading: false,
        success: true,
        data: { chargeId: action.payload.data.id },
      },
    },
  }),
  /**
   * Capture - Action  - Error
   */
  [TRANSACTION_ACTIONS.CAPTURE.ERROR]: (state: Object, action: Object) => ({
    ...state,
    actions: {
      ...state.actions,
      capture: {
        ...state.actions.capture,
        loading: false,
        success: false,
        error: true,
        errorMsg: action.payload.data.message,
      },
    },
  }),
  /**
   * Capture (Batch) - Pending
   */
  [TRANSACTION_ACTIONS.CAPTURE_BATCH.PENDING]: (
    state: Object,
    action: Object
  ) => ({
    ...state,
    actions: {
      ...state.actions,
      capture: {
        ...DEFAULT_STATE.actions.capture,
        batch: {
          ...DEFAULT_STATE.actions.capture.batch,
          loading: true,
        },
      },
    },
  }),
  /**
   * Capture (Batch)  - Success
   */
  [TRANSACTION_ACTIONS.CAPTURE_BATCH.SUCCESS]: (
    state: Object,
    action: Object
  ) => ({
    ...state,
    actions: {
      ...state.actions,
      capture: {
        ...DEFAULT_STATE.actions.capture,
        batch: {
          ...DEFAULT_STATE.actions.capture.batch,
          loading: false,
          success: true,
        },
      },
    },
  }),
  /**
   * Refund - Action  - Pending
   */
  [TRANSACTION_ACTIONS.REFUND.PENDING]: (state: Object, action: Object) => ({
    ...state,
    actions: {
      ...state.actions,
      refund: {
        ...DEFAULT_STATE.actions.refund,
        loading: true,
      },
    },
  }),
  /**
   * Refund - Action  - Success
   */
  [TRANSACTION_ACTIONS.REFUND.SUCCESS]: (state: Object, action: Object) => ({
    ...state,
    actions: {
      ...state.actions,
      refund: {
        ...DEFAULT_STATE.actions.refund,
        loading: false,
        success: true,
        status: action.payload.data.status,
        data: { chargeId: action.payload.data.id },
      },
    },
  }),
  /**
   * Refund - Action  - Error
   */
  [TRANSACTION_ACTIONS.REFUND.ERROR]: (state: Object, action: Object) => ({
    ...state,
    actions: {
      ...state.actions,
      refund: {
        ...state.actions.refund,
        loading: false,
        error: true,
        success: false,
      },
    },
  }),
  /**
   * Refund (Batch) - Pending
   */
  [TRANSACTION_ACTIONS.REFUND_BATCH.PENDING]: (
    state: Object,
    action: Object
  ) => ({
    ...state,
    actions: {
      ...state.actions,
      refund: {
        ...DEFAULT_STATE.actions.refund,
        batch: {
          ...DEFAULT_STATE.actions.refund.batch,
          loading: true,
        },
      },
    },
  }),
  /**
   * Refund (Batch)   - Success
   */
  [TRANSACTION_ACTIONS.REFUND_BATCH.SUCCESS]: (
    state: Object,
    action: Object
  ) => ({
    ...state,
    actions: {
      ...state.actions,
      refund: {
        ...DEFAULT_STATE.actions.refund,
        batch: {
          ...DEFAULT_STATE.actions.refund.batch,
          loading: false,
          success: true,
        },
      },
    },
  }),
  /**
   * Blacklist - Action - Pending
   */
  [TRANSACTION_ACTIONS.BLACKLIST.PENDING]: (state: Object, action: Object) => ({
    ...state,
    actions: {
      ...state.actions,
      blacklist: {
        loading: true,
        error: false,
        success: false,
      },
    },
  }),
  /**
   * Blacklist - Action  - Success
   */
  [TRANSACTION_ACTIONS.BLACKLIST.SUCCESS]: (state: Object, action: Object) => ({
    ...state,
    actions: {
      ...state.actions,
      blacklist: {
        loading: false,
        error: false,
        success: true,
      },
    },
  }),
  /**
   * Blacklist - Action  - Error
   */
  [TRANSACTION_ACTIONS.BLACKLIST.ERROR]: (state: Object, action: Object) => ({
    ...state,
    actions: {
      ...state.actions,
      blacklist: {
        loading: false,
        error: true,
        success: false,
        errorMsg: action.payload.data.message,
      },
    },
  }),
  /**
   * Blacklist - Pending
   */
  [TRANSACTION_BLACKLIST.PENDING]: (state: Object, action: Object) => ({
    ...state,
    blacklistData: {
      ...DEFAULT_STATE.blacklistData,
      loading: true,
    },
  }),
  /**
   * Blacklist - Success
   */
  [TRANSACTION_BLACKLIST.SUCCESS]: (state: Object, action: Object) => ({
    ...state,
    blacklistData: {
      loading: false,
      success: true,
      ...action.payload.data,
    },
  }),
};

export default buildReducer(handlers, DEFAULT_STATE);
