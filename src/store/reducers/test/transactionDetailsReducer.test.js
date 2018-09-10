import transactionDetailsReducer from '../transactionDetailsReducer';
import {
  TRANSACTIONS,
  TRANSACTION_ACTIONS,
  TRANSACTION_BLACKLIST,
} from 'store/constants';

describe('transactionDetailsReducer', () => {
  let prevState = {};
  const DEFAULT_STATE = {
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

  afterAll(() => {
    prevState = null;
  });

  it('should return the initial state', () => {
    expect(transactionDetailsReducer()).toEqual(DEFAULT_STATE);
    prevState = { ...DEFAULT_STATE };
  });

  it('should handle TRANSACTIONS.SINGLE.PENDING', () => {
    const expectedState = {
      ...prevState,
      data: {
        ...prevState.data,
        loading: true,
      },
    };
    const action = {
      type: TRANSACTIONS.SINGLE.PENDING,
    };
    expect(transactionDetailsReducer(prevState, action)).toEqual(expectedState);
    prevState = { ...expectedState };
  });

  it('should handle TRANSACTIONS.SINGLE.SUCCESS', () => {
    const data = {
      indicators: {
        currencySymbol: '',
        paymentMethodName: '',
        transactionDate: '',
        transactionStatus: '',
        transactionValue: 12.34,
      },
      details: {
        arn: '',
        authorizationCode: '',
        authorizationDate: '',
        billingDescriptor: '222',
        chargeId: '',
        longResponseCode: '112',
        shortResponseCode: '123123',
        trackId: '',
        transactionIndicator: '',
      },
    };
    const expectedState = {
      ...prevState,
      data: {
        ...data,
        loading: false,
        success: true,
      },
    };
    const action = {
      type: TRANSACTIONS.SINGLE.SUCCESS,
      payload: {
        data,
      },
    };
    expect(transactionDetailsReducer(prevState, action)).toEqual(expectedState);
    prevState = { ...expectedState };
  });

  it('should handle TRANSACTIONS.SINGLE.ERROR', () => {
    const expectedState = {
      ...prevState,
      data: {
        ...prevState.data,
        loading: false,
        error: true,
      },
    };

    const action = {
      type: TRANSACTIONS.SINGLE.ERROR,
    };
    expect(transactionDetailsReducer(prevState, action)).toEqual(expectedState);
    prevState = { ...expectedState };
  });

  it('should handle TRANSACTION_ACTIONS.VOID.PENDING', () => {
    const expectedState = {
      ...prevState,
      actions: {
        ...prevState.actions,
        void: {
          ...DEFAULT_STATE.actions.void,
          loading: true,
        },
      },
    };
    const action = {
      type: TRANSACTION_ACTIONS.VOID.PENDING,
    };
    expect(transactionDetailsReducer(prevState, action)).toEqual(expectedState);
    prevState = { ...expectedState };
  });

  it('should handle TRANSACTION_ACTIONS.VOID.SUCCESS', () => {
    const expectedState = {
      ...prevState,
      actions: {
        ...prevState.actions,
        void: {
          ...DEFAULT_STATE.actions.void,
          loading: false,
          success: true,
          data: { chargeId: '556662' },
        },
      },
    };
    const action = {
      type: TRANSACTION_ACTIONS.VOID.SUCCESS,
      payload: {
        data: {
          id: '556662',
        },
      },
    };
    expect(transactionDetailsReducer(prevState, action)).toEqual(expectedState);
    prevState = { ...expectedState };
  });

  it('should handle TRANSACTION_ACTIONS.VOID.ERROR', () => {
    const expectedState = {
      ...prevState,
      actions: {
        ...prevState.actions,
        void: {
          ...DEFAULT_STATE.actions.void,
          error: true,
          errorMsg: 'Oops!',
        },
      },
    };
    const action = {
      type: TRANSACTION_ACTIONS.VOID.ERROR,
      payload: {
        data: {
          message: 'Oops!',
        },
      },
    };
    expect(transactionDetailsReducer(prevState, action)).toEqual(expectedState);
    prevState = { ...expectedState };
  });

  it('should handle TRANSACTION_ACTIONS.CAPTURE.PENDING', () => {
    const expectedState = {
      ...prevState,
      actions: {
        ...prevState.actions,
        capture: {
          ...DEFAULT_STATE.actions.capture,
          loading: true,
        },
      },
    };
    const action = {
      type: TRANSACTION_ACTIONS.CAPTURE.PENDING,
    };
    expect(transactionDetailsReducer(prevState, action)).toEqual(expectedState);
    prevState = { ...expectedState };
  });

  it('should handle TRANSACTION_ACTIONS.CAPTURE.SUCCESS', () => {
    const expectedState = {
      ...prevState,
      actions: {
        ...prevState.actions,
        capture: {
          ...DEFAULT_STATE.actions.capture,
          success: true,
          data: { chargeId: '62626272' },
        },
      },
    };
    const action = {
      type: TRANSACTION_ACTIONS.CAPTURE.SUCCESS,
      payload: {
        data: {
          id: '62626272',
        },
      },
    };
    expect(transactionDetailsReducer(prevState, action)).toEqual(expectedState);
    prevState = { ...expectedState };
  });

  it('should handle TRANSACTION_ACTIONS.CAPTURE.ERROR', () => {
    const expectedState = {
      ...prevState,
      actions: {
        ...prevState.actions,
        capture: {
          ...prevState.actions.capture,
          loading: false,
          success: false,
          error: true,
          errorMsg: 'Oops!',
        },
      },
    };
    const action = {
      type: TRANSACTION_ACTIONS.CAPTURE.ERROR,
      payload: {
        data: {
          message: 'Oops!',
        },
      },
    };
    expect(transactionDetailsReducer(prevState, action)).toEqual(expectedState);
    prevState = { ...expectedState };
  });

  it('should handle TRANSACTION_ACTIONS.REFUND.PENDING', () => {
    const expectedState = {
      ...prevState,
      actions: {
        ...prevState.actions,
        refund: {
          ...DEFAULT_STATE.actions.refund,
          loading: true,
        },
      },
    };
    const action = {
      type: TRANSACTION_ACTIONS.REFUND.PENDING,
    };
    expect(transactionDetailsReducer(prevState, action)).toEqual(expectedState);
    prevState = { ...expectedState };
  });

  it('should handle TRANSACTION_ACTIONS.REFUND.SUCCESS', () => {
    const expectedState = {
      ...prevState,
      actions: {
        ...prevState.actions,
        refund: {
          ...DEFAULT_STATE.actions.refund,
          success: true,
          status: 'refunded',
          data: { chargeId: '000000' },
        },
      },
    };
    const action = {
      type: TRANSACTION_ACTIONS.REFUND.SUCCESS,
      payload: {
        data: {
          id: '000000',
          status: 'refunded',
        },
      },
    };
    expect(transactionDetailsReducer(prevState, action)).toEqual(expectedState);
    prevState = { ...expectedState };
  });

  it('should handle TRANSACTION_ACTIONS.REFUND.ERROR', () => {
    const expectedState = {
      ...prevState,
      actions: {
        ...prevState.actions,
        refund: {
          ...prevState.actions.refund,
          loading: false,
          error: true,
          success: false,
        },
      },
    };
    const action = {
      type: TRANSACTION_ACTIONS.REFUND.ERROR,
    };
    expect(transactionDetailsReducer(prevState, action)).toEqual(expectedState);
    prevState = { ...expectedState };
  });

  it('should handle TRANSACTION_ACTIONS.BLACKLIST.PENDING', () => {
    const expectedState = {
      ...prevState,
      actions: {
        ...prevState.actions,
        blacklist: {
          loading: true,
          error: false,
          success: false,
        },
      },
    };
    const action = {
      type: TRANSACTION_ACTIONS.BLACKLIST.PENDING,
    };
    expect(transactionDetailsReducer(prevState, action)).toEqual(expectedState);
    prevState = { ...expectedState };
  });

  it('should handle TRANSACTION_ACTIONS.BLACKLIST.SUCCESS', () => {
    const expectedState = {
      ...prevState,
      actions: {
        ...prevState.actions,
        blacklist: {
          loading: false,
          error: false,
          success: true,
        },
      },
    };
    const action = {
      type: TRANSACTION_ACTIONS.BLACKLIST.SUCCESS,
    };
    expect(transactionDetailsReducer(prevState, action)).toEqual(expectedState);
    prevState = { ...expectedState };
  });

  it('should handle TRANSACTION_ACTIONS.BLACKLIST.ERROR', () => {
    const expectedState = {
      ...prevState,
      actions: {
        ...prevState.actions,
        blacklist: {
          loading: false,
          error: true,
          success: false,
          errorMsg: 'Ooops!',
        },
      },
    };
    const action = {
      type: TRANSACTION_ACTIONS.BLACKLIST.ERROR,
      payload: {
        data: {
          message: 'Ooops!',
        },
      },
    };
    expect(transactionDetailsReducer(prevState, action)).toEqual(expectedState);
    prevState = { ...expectedState };
  });

  it('should handle TRANSACTION_BLACKLIST.PENDING', () => {
    const expectedState = {
      ...prevState,
      blacklistData: {
        ...DEFAULT_STATE.blacklistData,
        loading: true,
      },
    };
    const action = {
      type: TRANSACTION_BLACKLIST.PENDING,
    };
    expect(transactionDetailsReducer(prevState, action)).toEqual(expectedState);
    prevState = { ...expectedState };
  });

  it('should handle TRANSACTION_BLACKLIST.SUCCESS', () => {
    const expectedState = {
      ...prevState,
      blacklistData: {
        loading: false,
        success: true,
        cardId: true,
      },
    };
    const action = {
      type: TRANSACTION_BLACKLIST.SUCCESS,
      payload: {
        data: {
          cardId: true,
        },
      },
    };
    expect(transactionDetailsReducer(prevState, action)).toEqual(expectedState);
    prevState = { ...expectedState };
  });

  it('should handle TRANSACTION_ACTIONS.VOID_BATCH.PENDING', () => {
    const expectedState = {
      ...prevState,
      actions: {
        ...prevState.actions,
        void: {
          ...DEFAULT_STATE.actions.void,
          batch: {
            ...DEFAULT_STATE.actions.void.batch,
            loading: true,
          },
        },
      },
    };
    const action = {
      type: TRANSACTION_ACTIONS.VOID_BATCH.PENDING,
    };
    expect(transactionDetailsReducer(prevState, action)).toEqual(expectedState);
    prevState = { ...expectedState };
  });

  it('should handle TRANSACTION_ACTIONS.VOID_BATCH.SUCCESS', () => {
    const expectedState = {
      ...prevState,
      actions: {
        ...prevState.actions,
        void: {
          ...DEFAULT_STATE.actions.void,
          batch: {
            ...DEFAULT_STATE.actions.void.batch,
            loading: false,
            success: true,
          },
        },
      },
    };
    const action = {
      type: TRANSACTION_ACTIONS.VOID_BATCH.SUCCESS,
    };
    expect(transactionDetailsReducer(prevState, action)).toEqual(expectedState);
    prevState = { ...expectedState };
  });

  it('should handle TRANSACTION_ACTIONS.VOID_BATCH.ERROR', () => {
    const expectedState = {
      ...prevState,
      actions: {
        ...prevState.actions,
        void: {
          ...DEFAULT_STATE.actions.void,
          batch: {
            loading: false,
            success: false,
            error: true,
          },
        },
      },
    };
    const action = {
      type: TRANSACTION_ACTIONS.VOID_BATCH.ERROR,
    };
    expect(transactionDetailsReducer(prevState, action)).toEqual(expectedState);
    prevState = { ...expectedState };
  });

  it('should handle TRANSACTION_ACTIONS.CAPTURE_BATCH.PENDING', () => {
    const expectedState = {
      ...prevState,
      actions: {
        ...prevState.actions,
        capture: {
          ...DEFAULT_STATE.actions.capture,
          batch: {
            ...DEFAULT_STATE.actions.capture.batch,
            loading: true,
          },
        },
      },
    };
    const action = {
      type: TRANSACTION_ACTIONS.CAPTURE_BATCH.PENDING,
    };
    expect(transactionDetailsReducer(prevState, action)).toEqual(expectedState);
    prevState = { ...expectedState };
  });

  it('should handle TRANSACTION_ACTIONS.CAPTURE_BATCH.PENDING', () => {
    const expectedState = {
      ...prevState,
      actions: {
        ...prevState.actions,
        capture: {
          ...DEFAULT_STATE.actions.capture,
          batch: {
            ...DEFAULT_STATE.actions.capture.batch,
            loading: false,
            success: true,
          },
        },
      },
    };
    const action = {
      type: TRANSACTION_ACTIONS.CAPTURE_BATCH.SUCCESS,
    };
    expect(transactionDetailsReducer(prevState, action)).toEqual(expectedState);
    prevState = { ...expectedState };
  });

  it('should handle TRANSACTION_ACTIONS.REFUND_BATCH.PENDING', () => {
    const expectedState = {
      ...prevState,
      actions: {
        ...prevState.actions,
        refund: {
          ...DEFAULT_STATE.actions.refund,
          batch: {
            ...DEFAULT_STATE.actions.refund.batch,
            loading: true,
          },
        },
      },
    };
    const action = {
      type: TRANSACTION_ACTIONS.REFUND_BATCH.PENDING,
    };
    expect(transactionDetailsReducer(prevState, action)).toEqual(expectedState);
    prevState = { ...expectedState };
  });

  it('should handle TRANSACTION_ACTIONS.REFUND_BATCH.SUCCESS', () => {
    const expectedState = {
      ...prevState,
      actions: {
        ...prevState.actions,
        refund: {
          ...DEFAULT_STATE.actions.refund,
          batch: {
            ...DEFAULT_STATE.actions.refund.batch,
            loading: false,
            success: true,
          },
        },
      },
    };
    const action = {
      type: TRANSACTION_ACTIONS.REFUND_BATCH.SUCCESS,
    };
    expect(transactionDetailsReducer(prevState, action)).toEqual(expectedState);
    prevState = { ...expectedState };
  });

  it('should handle TRANSACTIONS.BATCH.PENDING', () => {
    const expectedState = {
      ...prevState,
      batch: {
        ...prevState.batch,
        loading: true,
        error: false,
        success: false,
      },
    };
    const action = {
      type: TRANSACTIONS.BATCH.PENDING,
    };
    expect(transactionDetailsReducer(prevState, action)).toEqual(expectedState);
    prevState = { ...expectedState };
  });

  it('should handle TRANSACTIONS.BATCH.SUCCESS', () => {
    const expectedState = {
      ...prevState,
      batch: {
        loading: false,
        error: false,
        success: true,
        list: [{ id: '123', title: 'refund' }],
      },
    };
    const action = {
      type: TRANSACTIONS.BATCH.SUCCESS,
      payload: {
        data: { id: '123', title: 'refund' },
      },
    };
    expect(transactionDetailsReducer(prevState, action)).toEqual(expectedState);
    prevState = { ...expectedState };
  });

  it('should handle TRANSACTIONS.BATCH.CLEAR', () => {
    const expectedState = {
      ...prevState,
      batch: DEFAULT_STATE.batch,
    };
    const action = {
      type: TRANSACTIONS.BATCH.CLEAR,
    };
    expect(transactionDetailsReducer(prevState, action)).toEqual(expectedState);
    prevState = { ...expectedState };
  });
});
