import customerDetailsReducer from '../customerDetailsReducer';
import { CUSTOMERS, CUSTOMERS_ACTIONS, LOGIN_TYPE } from 'store/constants';

describe('customerDetailsReducer', () => {
  const DEFAULT_STATE = {
    details: {
      loading: false,
      error: false,
    },
    transactions: {
      loading: false,
      error: false,
      success: false,
      data: [],
    },
    cardActions: {
      update: {
        loading: false,
        error: false,
        success: false,
      },
      delete: {
        loading: false,
        error: false,
        success: false,
      },
      default: {
        loading: false,
        error: false,
        success: false,
      },
    },
    associatedPaymentPlans: {
      loading: false,
      error: false,
      data: [],
    },
    actions: {
      changeStatus: {
        loading: false,
        error: false,
      },
      delete: {
        loading: false,
        error: false,
      },
      edit: {
        loading: false,
        error: false,
      },
      updateDetails: {
        loading: false,
        error: false,
      },
      createPayment: {
        loading: false,
        error: false,
      },
      addCreditCard: {
        loading: false,
        error: false,
      },
      addPaymentPlan: {
        loading: false,
        error: false,
      },
    },
  };
  let prevState = {};

  it('should return the initial state', () => {
    expect(customerDetailsReducer()).toEqual(DEFAULT_STATE);
    prevState = { ...DEFAULT_STATE };
  });

  it('should handle SINGLE PENDING', () => {
    const expectedState = {
      ...prevState,
      details: {
        ...DEFAULT_STATE.details,
        loading: true,
      },
    };

    let action = {
      type: CUSTOMERS.SINGLE.PENDING,
    };

    expect(customerDetailsReducer(prevState, action)).toEqual(expectedState);
    prevState = { ...expectedState };
  });

  it('should handle SINGLE ERROR', () => {
    const expectedState = {
      ...prevState,
      details: {
        ...DEFAULT_STATE.details,
        error: true,
        errorMsg: 'Oops error',
      },
    };

    let action = {
      type: CUSTOMERS.SINGLE.ERROR,
      payload: { data: 'Oops error' },
    };

    expect(customerDetailsReducer(prevState, action)).toEqual(expectedState);
    prevState = { ...expectedState };
  });

  it('should handle SINGLE SUCCESS', () => {
    const expectedState = {
      ...prevState,
      details: {
        ...prevState.details,
        loading: false,
        error: false,
        uniqueCustomers: 607,
        returningCustomers: 0.0,
        averageSpend: 120.94,
        cards: {
          defaultCard: 1,
          data: [
            { id: 1, title: 'card1', defaultCard: false },
            { id: 2, title: 'card1', defaultCard: true },
          ],
        },
      },
    };
    const action = {
      type: CUSTOMERS.SINGLE.SUCCESS,
      payload: {
        data: {
          uniqueCustomers: 607,
          returningCustomers: 0.0,
          averageSpend: 120.94,
          cards: {
            defaultCard: 1,
            data: [
              { id: 1, title: 'card1', defaultCard: false },
              { id: 2, title: 'card1', defaultCard: true },
            ],
          },
        },
      },
    };

    expect(customerDetailsReducer(prevState, action)).toEqual(expectedState);
    prevState = { ...expectedState };
  });

  it('should handle TRANSACTIONS PENDING', () => {
    const expectedState = {
      ...prevState,
      transactions: {
        ...prevState.transactions,
        loading: true,
        error: false,
        success: false,
      },
    };

    let action = {
      type: CUSTOMERS.TRANSACTIONS.PENDING,
    };
    expect(customerDetailsReducer(prevState, action)).toEqual(expectedState);
  });

  it('should handle TRANSACTIONS SUCCESS', () => {
    const expectedState = {
      ...prevState,
      transactions: {
        ...prevState.transactions,
        loading: false,
        error: false,
        success: true,
        data: [1, 2, 3],
      },
    };

    let action = {
      type: CUSTOMERS.TRANSACTIONS.SUCCESS,
      payload: { data: [1, 2, 3] },
    };
    expect(customerDetailsReducer(prevState, action)).toEqual(expectedState);
  });

  it('should handle TRANSACTIONS SUCCESS - more', () => {
    const expectedState = {
      ...prevState,
      transactions: {
        loading: false,
        error: false,
        success: true,
        data: [...prevState.transactions.data, 4, 5, 6],
      },
    };

    let action = {
      type: CUSTOMERS.TRANSACTIONS.SUCCESS,
      payload: { data: [4, 5, 6] },
    };
    expect(customerDetailsReducer(prevState, action)).toEqual(expectedState);
  });

  it('should handle TRANSACTIONS RESET', () => {
    const expectedState = {
      ...prevState,
      transactions: {
        loading: false,
        error: false,
        success: false,
        data: [],
      },
    };

    let action = {
      type: CUSTOMERS.TRANSACTIONS.RESET,
    };
    expect(customerDetailsReducer(prevState, action)).toEqual(expectedState);
  });

  it('should handle TRANSACTIONS ERROR', () => {
    const expectedState = {
      ...prevState,
      transactions: {
        ...prevState.transactions,
        loading: false,
        error: true,
        errorMsg: 'Ooops!',
      },
    };

    let action = {
      type: CUSTOMERS.TRANSACTIONS.ERROR,
      payload: { data: 'Ooops!' },
    };
    expect(customerDetailsReducer(prevState, action)).toEqual(expectedState);
  });

  it('should handle CARD_UPDATE PENDING', () => {
    const expectedState = {
      ...prevState,
      cardActions: {
        ...prevState.cardActions,
        update: {
          ...DEFAULT_STATE.cardActions.update,
          loading: true,
        },
      },
    };

    let action = {
      type: CUSTOMERS.CARD_UPDATE.PENDING,
    };
    expect(customerDetailsReducer(prevState, action)).toEqual(expectedState);
  });

  it('should handle CARD_UPDATE SUCCESS', () => {
    const expectedState = {
      ...prevState,
      cardActions: {
        ...prevState.cardActions,
        update: {
          ...DEFAULT_STATE.cardActions.update,
          success: true,
          id: 'Ooops!',
        },
      },
    };

    let action = {
      type: CUSTOMERS.CARD_UPDATE.SUCCESS,
      payload: { data: { id: 'Ooops!' } },
    };
    expect(customerDetailsReducer(prevState, action)).toEqual(expectedState);
  });

  it('should handle CARD_DEFAULT PENDING', () => {
    const expectedState = {
      ...prevState,
      cardActions: {
        ...prevState.cardActions,
        default: {
          ...DEFAULT_STATE.cardActions.default,
          loading: true,
        },
      },
    };

    let action = {
      type: CUSTOMERS.CARD_DEFAULT.PENDING,
    };
    expect(customerDetailsReducer(prevState, action)).toEqual(expectedState);
  });

  it('should handle CARD_DEFAULT SUCCESS', () => {
    const customerCards = { ...prevState.details.cards };
    customerCards.defaultCard = 1;
    customerCards.data = [
      {
        id: 1,
        title: 'card1',
        defaultCard: true,
      },
      {
        id: 2,
        title: 'card1',
        defaultCard: false,
      },
    ];

    const expectedState = {
      ...prevState,
      details: {
        ...prevState.details,
        cards: customerCards,
      },
      cardActions: {
        ...prevState.cardActions,
        default: {
          ...DEFAULT_STATE.cardActions.default,
          success: true,
        },
      },
    };

    let action = {
      type: CUSTOMERS.CARD_DEFAULT.SUCCESS,
      cardId: 1,
    };
    expect(customerDetailsReducer(prevState, action)).toEqual(expectedState);
  });

  it('should handle CARD_DELETE PENDING', () => {
    const expectedState = {
      ...prevState,
      cardActions: {
        ...prevState.cardActions,
        delete: {
          loading: true,
          error: false,
          success: false,
        },
      },
    };

    let action = {
      type: CUSTOMERS.CARD_DELETE.PENDING,
    };
    expect(customerDetailsReducer(prevState, action)).toEqual(expectedState);
  });

  it('should handle CARD_DELETE SUCCESS', () => {
    const expectedState = {
      ...prevState,
      cardActions: {
        ...prevState.cardActions,
        delete: {
          loading: false,
          error: false,
          success: true,
        },
      },
      details: {
        ...prevState.details,
        cards: {
          ...prevState.details.cards,
          data: [{ id: 2, title: 'card1', defaultCard: false }],
        },
      },
    };

    let action = {
      type: CUSTOMERS.CARD_DELETE.SUCCESS,
      cardId: 1,
    };
    expect(customerDetailsReducer(prevState, action)).toEqual(expectedState);
  });

  it('should handle CUSTOMERS.PAYMENT_PLANS.PENDING', () => {
    const prevState = {
      associatedPaymentPlans: {
        loading: false,
        error: false,
      },
    };
    const action = {
      type: CUSTOMERS.PAYMENT_PLANS.PENDING,
    };
    const expectedState = {
      associatedPaymentPlans: {
        loading: true,
        error: false,
      },
    };
    const received = customerDetailsReducer(prevState, action);
    expect(received).toEqual(expectedState);
  });

  it('should handle CUSTOMERS.PAYMENT_PLANS.SUCCESS', () => {
    const prevState = {
      associatedPaymentPlans: {
        loading: true,
        error: false,
        data: [],
      },
    };
    const data = [
      {
        planId: 'rp_9E6B498D844Y76BD1812',
        customerPlanId: 'cp_331FC6A5EE9V7AF9A49C',
        cardId: 'card_9be70e2e-ecc4-43d0-9649-7042362f68dd',
        customerId: 'cust_53d5f31d-5f43-426d-b736-210a958e6e56',
        name: 'Recurring Plan 1',
        planTrackId: 'CKO Plan 1',
        autoCapTime: 0,
        value: 1000,
        currency: 'USD',
        cycle: '1d',
        recurringCount: 10,
        recurringCountLeft: 10,
        totalCollectedValue: 0,
        totalCollectedCount: 0,
        status: 1,
        startDate: '2017-10-13T09:00:00Z',
        previousRecurringDate: null,
        nextRecurringDate: '2017-10-13T09:00:00Z',
        channelId: 100083,
      },
    ];
    const action = {
      type: CUSTOMERS.PAYMENT_PLANS.SUCCESS,
      payload: { data },
    };
    const expectedState = {
      associatedPaymentPlans: {
        loading: false,
        error: false,
        data,
      },
    };
    const received = customerDetailsReducer(prevState, action);
    expect(received).toEqual(expectedState);
  });

  it('should handle CUSTOMERS.PAYMENT_PLANS.ERROR', () => {
    const prevState = {
      associatedPaymentPlans: {
        loading: true,
        error: false,
        data: [],
      },
    };
    const action = {
      type: CUSTOMERS.PAYMENT_PLANS.ERROR,
    };
    const expectedState = {
      associatedPaymentPlans: {
        loading: false,
        error: true,
        data: [],
      },
    };
    const received = customerDetailsReducer(prevState, action);
    expect(received).toEqual(expectedState);
  });

  it('should handle CUSTOMERS.PAYMENT_PLANS_ACTIONS.CHANGE_STATUS.PENDING', () => {
    const prevState = {
      actions: {
        changeStatus: {
          loading: false,
          error: false,
          success: false,
        },
      },
    };
    const action = {
      type: CUSTOMERS.PAYMENT_PLANS_ACTIONS.CHANGE_STATUS.PENDING,
    };
    const expectedState = {
      actions: {
        changeStatus: {
          loading: true,
          error: false,
          success: false,
        },
      },
    };
    const received = customerDetailsReducer(prevState, action);
    expect(received).toEqual(expectedState);
  });

  it('should handle CUSTOMERS.PAYMENT_PLANS_ACTIONS.CHANGE_STATUS.SUCCESS', () => {
    const prevState = {
      actions: {
        changeStatus: {
          loading: true,
          error: false,
          success: false,
        },
      },
    };
    const action = {
      type: CUSTOMERS.PAYMENT_PLANS_ACTIONS.CHANGE_STATUS.SUCCESS,
    };
    const expectedState = {
      actions: {
        changeStatus: {
          loading: false,
          error: false,
          success: true,
        },
      },
    };
    const received = customerDetailsReducer(prevState, action);
    expect(received).toEqual(expectedState);
  });

  it('should handle CUSTOMERS.PAYMENT_PLANS_ACTIONS.CHANGE_STATUS.ERROR', () => {
    const prevState = {
      actions: {
        changeStatus: {
          loading: true,
          error: false,
          success: false,
        },
      },
    };
    const action = {
      type: CUSTOMERS.PAYMENT_PLANS_ACTIONS.CHANGE_STATUS.ERROR,
    };
    const expectedState = {
      actions: {
        changeStatus: {
          loading: false,
          error: true,
          success: false,
        },
      },
    };
    const received = customerDetailsReducer(prevState, action);
    expect(received).toEqual(expectedState);
  });

  it('should handle CUSTOMERS.PAYMENT_PLANS_ACTIONS.DELETE.PENDING', () => {
    const prevState = {
      actions: {
        delete: {
          loading: false,
          error: false,
          success: false,
        },
      },
    };
    const action = {
      type: CUSTOMERS.PAYMENT_PLANS_ACTIONS.DELETE.PENDING,
    };
    const expectedState = {
      actions: {
        delete: {
          loading: true,
          error: false,
          success: false,
        },
      },
    };
    const received = customerDetailsReducer(prevState, action);
    expect(received).toEqual(expectedState);
  });

  it('should handle CUSTOMERS.PAYMENT_PLANS_ACTIONS.DELETE.SUCCESS', () => {
    const prevState = {
      actions: {
        delete: {
          loading: true,
          error: false,
          success: false,
        },
      },
    };
    const action = {
      type: CUSTOMERS.PAYMENT_PLANS_ACTIONS.DELETE.SUCCESS,
    };
    const expectedState = {
      actions: {
        delete: {
          loading: false,
          error: false,
          success: true,
        },
      },
    };
    const received = customerDetailsReducer(prevState, action);
    expect(received).toEqual(expectedState);
  });

  it('should handle CUSTOMERS.PAYMENT_PLANS_ACTIONS.DELETE.ERROR', () => {
    const prevState = {
      actions: {
        delete: {
          loading: true,
          error: false,
          success: false,
        },
      },
    };
    const action = {
      type: CUSTOMERS.PAYMENT_PLANS_ACTIONS.DELETE.ERROR,
    };
    const expectedState = {
      actions: {
        delete: {
          loading: false,
          error: true,
          success: false,
        },
      },
    };
    const received = customerDetailsReducer(prevState, action);
    expect(received).toEqual(expectedState);
  });

  it('should handle CUSTOMERS.PAYMENT_PLANS_ACTIONS.EDIT.PENDING', () => {
    const prevState = {
      actions: {
        edit: {
          loading: false,
          error: false,
          success: false,
        },
      },
    };
    const action = {
      type: CUSTOMERS.PAYMENT_PLANS_ACTIONS.EDIT.PENDING,
    };
    const expectedState = {
      actions: {
        edit: {
          loading: true,
          error: false,
          success: false,
        },
      },
    };
    const received = customerDetailsReducer(prevState, action);
    expect(received).toEqual(expectedState);
  });

  it('should handle CUSTOMERS.PAYMENT_PLANS_ACTIONS.EDIT.SUCCESS', () => {
    const prevState = {
      actions: {
        edit: {
          loading: true,
          error: false,
          success: false,
        },
      },
    };
    const action = {
      type: CUSTOMERS.PAYMENT_PLANS_ACTIONS.EDIT.SUCCESS,
    };
    const expectedState = {
      actions: {
        edit: {
          loading: false,
          error: false,
          success: true,
        },
      },
    };
    const received = customerDetailsReducer(prevState, action);
    expect(received).toEqual(expectedState);
  });

  it('should handle CUSTOMERS.PAYMENT_PLANS_ACTIONS.EDIT.ERROR', () => {
    const prevState = {
      actions: {
        edit: {
          loading: true,
          error: false,
          success: false,
        },
      },
    };
    const action = {
      type: CUSTOMERS.PAYMENT_PLANS_ACTIONS.EDIT.ERROR,
    };
    const expectedState = {
      actions: {
        edit: {
          loading: false,
          error: true,
          success: false,
        },
      },
    };
    const received = customerDetailsReducer(prevState, action);
    expect(received).toEqual(expectedState);
  });

  it('should handle CUSTOMERS_ACTIONS.UPDATE_DETAILS.PENDING', () => {
    const prevState = {
      actions: {
        updateDetails: {
          loading: false,
          error: false,
          success: false,
        },
      },
    };
    const action = {
      type: CUSTOMERS_ACTIONS.UPDATE_DETAILS.PENDING,
    };
    const expectedState = {
      actions: {
        updateDetails: {
          loading: true,
          error: false,
          success: false,
        },
      },
    };
    const received = customerDetailsReducer(prevState, action);
    expect(received).toEqual(expectedState);
  });

  it('should handle CUSTOMERS_ACTIONS.UPDATE_DETAILS.SUCCESS', () => {
    const prevState = {
      actions: {
        updateDetails: {
          loading: true,
          error: false,
          success: false,
        },
      },
    };
    const action = {
      type: CUSTOMERS_ACTIONS.UPDATE_DETAILS.SUCCESS,
    };
    const expectedState = {
      actions: {
        updateDetails: {
          loading: false,
          error: false,
          success: true,
        },
      },
    };
    const received = customerDetailsReducer(prevState, action);
    expect(received).toEqual(expectedState);
  });

  it('should handle CUSTOMERS_ACTIONS.UPDATE_DETAILS.ERROR', () => {
    const prevState = {
      actions: {
        updateDetails: {
          loading: true,
          error: false,
          success: false,
        },
      },
    };
    const action = {
      type: CUSTOMERS_ACTIONS.UPDATE_DETAILS.ERROR,
    };
    const expectedState = {
      actions: {
        updateDetails: {
          loading: false,
          error: true,
          success: false,
        },
      },
    };
    const received = customerDetailsReducer(prevState, action);
    expect(received).toEqual(expectedState);
  });

  it('should handle CUSTOMERS_ACTIONS.CREATE_PAYMENT.PENDING', () => {
    const prevState = {
      actions: {
        createPayment: {
          loading: false,
          error: false,
          success: false,
        },
      },
    };
    const action = {
      type: CUSTOMERS_ACTIONS.CREATE_PAYMENT.PENDING,
    };
    const expectedState = {
      actions: {
        createPayment: {
          loading: true,
          error: false,
          success: false,
        },
      },
    };
    const received = customerDetailsReducer(prevState, action);
    expect(received).toEqual(expectedState);
  });

  it('should handle CUSTOMERS_ACTIONS.CREATE_PAYMENT.SUCCESS', () => {
    const prevState = {
      actions: {
        createPayment: {
          loading: true,
          error: false,
          success: false,
        },
      },
    };
    const data = {
      email: 'ckouser_84550@checkout.com',
      chargeMode: 1,
      transactionIndicator: 3,
      customerIp: '167.98.29.52',
      responseMessage: 'Gateway Reject - Card Number Blacklist',
      responseAdvancedInfo: null,
      responseCode: '40201',
      status: 'Declined',
      authCode: '00000',
      isCascaded: false,
    };
    const action = {
      type: CUSTOMERS_ACTIONS.CREATE_PAYMENT.SUCCESS,
      payload: {
        data,
      },
    };
    const expectedState = {
      actions: {
        createPayment: {
          loading: false,
          error: false,
          success: true,
          ...data,
        },
      },
    };
    const received = customerDetailsReducer(prevState, action);
    expect(received).toEqual(expectedState);
  });

  it('should handle CUSTOMERS_ACTIONS.CREATE_PAYMENT.ERROR', () => {
    const prevState = {
      actions: {
        createPayment: {
          loading: true,
          error: false,
          success: false,
        },
      },
    };
    const action = {
      type: CUSTOMERS_ACTIONS.CREATE_PAYMENT.ERROR,
    };
    const expectedState = {
      actions: {
        createPayment: {
          loading: false,
          error: true,
          success: false,
        },
      },
    };
    const received = customerDetailsReducer(prevState, action);
    expect(received).toEqual(expectedState);
  });

  it('should handle CUSTOMERS_ACTIONS.CREATE_PAYMENT.CLEAR', () => {
    const prevState = {
      actions: {
        createPayment: {
          loading: false,
          success: true,
          id: 'charge_test_C98F0919EC951V64672E',
          liveMode: false,
          value: 1700,
          currency: 'EUR',
        },
      },
    };
    const action = {
      type: CUSTOMERS_ACTIONS.CREATE_PAYMENT.CLEAR,
    };
    const expected = {
      actions: {
        createPayment: {
          loading: false,
          error: false,
        },
      },
    };
    const received = customerDetailsReducer(prevState, action);
    expect(received).toEqual(expected);
  });

  it('should handle CUSTOMERS_ACTIONS.ADD_CREDIT_CARD.PENDING', () => {
    const prevState = {
      actions: {
        addCreditCard: {
          loading: false,
          error: false,
          success: false,
        },
      },
    };
    const action = {
      type: CUSTOMERS_ACTIONS.ADD_CREDIT_CARD.PENDING,
    };
    const expectedState = {
      actions: {
        addCreditCard: {
          loading: true,
          error: false,
          success: false,
        },
      },
    };
    const received = customerDetailsReducer(prevState, action);
    expect(received).toEqual(expectedState);
  });

  it('should handle CUSTOMERS_ACTIONS.ADD_CREDIT_CARD.SUCCESS', () => {
    const prevState = {
      actions: {
        addCreditCard: {
          loading: true,
          error: false,
          success: false,
        },
      },
    };
    const action = {
      type: CUSTOMERS_ACTIONS.ADD_CREDIT_CARD.SUCCESS,
    };
    const expectedState = {
      actions: {
        addCreditCard: {
          loading: false,
          error: false,
          success: true,
        },
      },
    };
    const received = customerDetailsReducer(prevState, action);
    expect(received).toEqual(expectedState);
  });

  it('should handle CUSTOMERS_ACTIONS.ADD_CREDIT_CARD.ERROR', () => {
    const prevState = {
      actions: {
        addCreditCard: {
          loading: true,
          error: false,
          success: false,
        },
      },
    };
    const action = {
      type: CUSTOMERS_ACTIONS.ADD_CREDIT_CARD.ERROR,
    };
    const expectedState = {
      actions: {
        addCreditCard: {
          loading: false,
          error: true,
          success: false,
        },
      },
    };
    const received = customerDetailsReducer(prevState, action);
    expect(received).toEqual(expectedState);
  });

  it('should handle CUSTOMERS_ACTIONS.ADD_PAYMENT_PLAN.PENDING', () => {
    const prevState = {
      actions: {
        addPaymentPlan: {
          loading: false,
          error: false,
          success: false,
        },
      },
    };
    const action = {
      type: CUSTOMERS_ACTIONS.ADD_PAYMENT_PLAN.PENDING,
    };
    const expectedState = {
      actions: {
        addPaymentPlan: {
          loading: true,
          error: false,
          success: false,
        },
      },
    };
    const received = customerDetailsReducer(prevState, action);
    expect(received).toEqual(expectedState);
  });

  it('should handle CUSTOMERS_ACTIONS.ADD_PAYMENT_PLAN.SUCCESS', () => {
    const prevState = {
      actions: {
        addPaymentPlan: {
          loading: true,
          error: false,
          success: false,
        },
      },
    };
    const action = {
      type: CUSTOMERS_ACTIONS.ADD_PAYMENT_PLAN.SUCCESS,
    };
    const expectedState = {
      actions: {
        addPaymentPlan: {
          loading: false,
          error: false,
          success: true,
        },
      },
    };
    const received = customerDetailsReducer(prevState, action);
    expect(received).toEqual(expectedState);
  });

  it('should handle CUSTOMERS_ACTIONS.ADD_PAYMENT_PLAN.ERROR', () => {
    const prevState = {
      actions: {
        addPaymentPlan: {
          loading: true,
          error: false,
          success: false,
        },
      },
    };
    const action = {
      type: CUSTOMERS_ACTIONS.ADD_PAYMENT_PLAN.ERROR,
    };
    const expectedState = {
      actions: {
        addPaymentPlan: {
          loading: false,
          error: true,
          success: false,
        },
      },
    };
    const received = customerDetailsReducer(prevState, action);
    expect(received).toEqual(expectedState);
  });
});
