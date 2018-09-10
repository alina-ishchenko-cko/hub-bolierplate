// @flow
import { buildReducer } from 'utils/reducer.util';
import { CUSTOMERS, CUSTOMERS_ACTIONS } from 'store/constants';
import * as typed from './flow-type';
const { CHANGE_STATUS, DELETE, EDIT } = CUSTOMERS.PAYMENT_PLANS_ACTIONS;

const DEFAULT_STATE: typed.CUSTOMER_DETAILS = {
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

const handlers = {
  /**
   * Single - Pending
   */
  [CUSTOMERS.SINGLE.PENDING]: (state: Object, action: Object) => ({
    ...state,
    details: {
      ...state.details,
      loading: true,
      error: false,
    },
  }),
  /**
   * Single - Success
   */
  [CUSTOMERS.SINGLE.SUCCESS]: (state: Object, action: Object) => ({
    ...state,
    details: {
      ...state.details,
      loading: false,
      error: false,
      ...action.payload.data,
    },
  }),
  /**
   * Single - Error
   */
  [CUSTOMERS.SINGLE.ERROR]: (state: Object, action: Object) => ({
    ...state,
    details: {
      loading: false,
      error: true,
      errorMsg: action.payload.data,
    },
  }),
  /**
   * Transactions - Reset
   */
  [CUSTOMERS.TRANSACTIONS.RESET]: (state: Object, action: Object) => ({
    ...state,
    transactions: {
      loading: false,
      error: false,
      success: false,
      data: [],
    },
  }),
  /**
   * Transactions - Pending
   */
  [CUSTOMERS.TRANSACTIONS.PENDING]: (state: Object, action: Object) => ({
    ...state,
    transactions: {
      loading: true,
      error: false,
      success: false,
      data: action.resetBeforeLoading ? [] : state.transactions.data,
    },
  }),
  /**
   * Transactions - Success
   */
  [CUSTOMERS.TRANSACTIONS.SUCCESS]: (state: Object, action: Object) => ({
    ...state,
    transactions: {
      loading: false,
      error: false,
      success: true,
      data: [...state.transactions.data, ...action.payload.data],
    },
  }),
  /**
   * Transactions - Error
   */
  [CUSTOMERS.TRANSACTIONS.ERROR]: (state: Object, action: Object) => ({
    ...state,
    transactions: {
      ...state.transactions,
      loading: false,
      error: true,
      success: false,
      errorMsg: action.payload.data,
    },
  }),
  /**
   * Card Update - Pending
   */
  [CUSTOMERS.CARD_UPDATE.PENDING]: (state: Object, action: Object) => ({
    ...state,
    cardActions: {
      ...state.cardActions,
      update: {
        ...DEFAULT_STATE.cardActions.update,
        loading: true,
      },
    },
  }),
  /**
   * Card Update - Success
   */
  [CUSTOMERS.CARD_UPDATE.SUCCESS]: (state: Object, action: Object) => ({
    ...state,
    cardActions: {
      ...state.cardActions,
      update: {
        ...DEFAULT_STATE.cardActions.update,
        success: true,
        ...action.payload.data,
      },
    },
  }),
  /**
   * Card Default - Pending
   */
  [CUSTOMERS.CARD_DEFAULT.PENDING]: (state: Object, action: Object) => ({
    ...state,
    cardActions: {
      ...state.cardActions,
      default: {
        loading: true,
        error: false,
        success: false,
      },
    },
  }),
  /**
   * Card Default - Success
   */
  [CUSTOMERS.CARD_DEFAULT.SUCCESS]: (state: Object, action: Object) => {
    const newDefaultCardId = action.cardId;
    const customerCards = { ...state.details.cards };
    // Set the new selected card as default card
    customerCards.defaultCard = newDefaultCardId;
    // Loop through the cards and set the selected card
    // as defaultCard
    customerCards.data = customerCards.data.map(card => {
      if (card.id === newDefaultCardId) {
        card.defaultCard = true;
      } else {
        card.defaultCard = false;
      }
      return card;
    });

    return {
      ...state,
      details: {
        ...state.details,
        cards: customerCards,
      },
      cardActions: {
        ...state.cardActions,
        default: {
          loading: false,
          error: false,
          success: true,
        },
      },
    };
  },
  /**
   * Card Delete - Pending
   */
  [CUSTOMERS.CARD_DELETE.PENDING]: (state: Object, action: Object) => ({
    ...state,
    cardActions: {
      ...state.cardActions,
      delete: {
        loading: true,
        error: false,
        success: false,
      },
    },
  }),
  /**
   * Card Delete - Success
   */
  [CUSTOMERS.CARD_DELETE.SUCCESS]: (state: Object, action: Object) => {
    const prevCardDetails = state.details.cards;
    const { data } = prevCardDetails;
    const updatedCardList = removeCardFromList(data, action.cardId);

    return {
      ...state,
      cardActions: {
        ...state.cardActions,
        delete: {
          loading: false,
          error: false,
          success: true,
        },
      },
      details: {
        ...state.details,
        cards: {
          ...prevCardDetails,
          data: updatedCardList,
        },
      },
    };
  },
  /**
   * Payment Plans - Pending
   */
  [CUSTOMERS.PAYMENT_PLANS.PENDING]: (state: Object, action: Object) => ({
    ...state,
    associatedPaymentPlans: {
      loading: true,
      error: false,
    },
  }),
  /**
   * Payment Plans - Success
   */
  [CUSTOMERS.PAYMENT_PLANS.SUCCESS]: (state: Object, action: Object) => ({
    ...state,
    associatedPaymentPlans: {
      loading: false,
      error: false,
      data: action.payload.data,
    },
  }),
  /**
   * Payment Plans - Error
   */
  [CUSTOMERS.PAYMENT_PLANS.ERROR]: (state: Object, action: Object) => ({
    ...state,
    associatedPaymentPlans: {
      ...DEFAULT_STATE.associatedPaymentPlans,
      loading: false,
      error: true,
    },
  }),
  /**
   * Change Status - Pending
   */
  [CHANGE_STATUS.PENDING]: (state: Object, action: Object) => ({
    ...state,
    actions: {
      ...state.actions,
      changeStatus: {
        loading: true,
        error: false,
        success: false,
      },
    },
  }),
  /**
   * Change Status - Success
   */
  [CHANGE_STATUS.SUCCESS]: (state: Object, action: Object) => ({
    ...state,
    actions: {
      ...state.actions,
      changeStatus: {
        ...state.actions.changeStatus,
        loading: false,
        success: true,
      },
    },
  }),
  /**
   * Change Status - Error
   */
  [CHANGE_STATUS.ERROR]: (state: Object, action: Object) => ({
    ...state,
    actions: {
      ...state.actions,
      changeStatus: {
        ...state.actions.changeStatus,
        loading: false,
        error: true,
      },
    },
  }),
  /**
   * Delete - Pending
   */
  [DELETE.PENDING]: (state: Object, action: Object) => ({
    ...state,
    actions: {
      ...state.actions,
      delete: {
        loading: true,
        success: false,
        error: false,
      },
    },
  }),
  /**
   * Delete - Success
   */
  [DELETE.SUCCESS]: (state: Object, action: Object) => ({
    ...state,
    actions: {
      ...state.actions,
      delete: {
        ...state.actions.delete,
        loading: false,
        success: true,
      },
    },
  }),
  /**
   * Delete - Error
   */
  [DELETE.ERROR]: (state: Object, action: Object) => ({
    ...state,
    actions: {
      ...state.actions,
      delete: {
        ...state.actions.delete,
        loading: false,
        error: true,
      },
    },
  }),
  /**
   * Edit - Pending
   */
  [EDIT.PENDING]: (state: Object, action: Object) => ({
    ...state,
    actions: {
      ...state.actions,
      edit: {
        ...state.actions.edit,
        loading: true,
        error: false,
        success: false,
      },
    },
  }),
  /**
   * Edit - Success
   */
  [EDIT.SUCCESS]: (state: Object, action: Object) => ({
    ...state,
    actions: {
      ...state.actions,
      edit: {
        ...state.actions.edit,
        loading: false,
        success: true,
      },
    },
  }),
  /**
   * Edit - Error
   */
  [EDIT.ERROR]: (state: Object, action: Object) => ({
    ...state,
    actions: {
      ...state.actions,
      edit: {
        ...state.actions.edit,
        loading: false,
        error: true,
      },
    },
  }),
  /**
   * Update details - Pending
   */
  [CUSTOMERS_ACTIONS.UPDATE_DETAILS.PENDING]: (
    state: Object,
    action: Object
  ) => ({
    ...state,
    actions: {
      ...state.actions,
      updateDetails: {
        loading: true,
        error: false,
        success: false,
      },
    },
  }),
  /**
   * Update details - Success
   */
  [CUSTOMERS_ACTIONS.UPDATE_DETAILS.SUCCESS]: (
    state: Object,
    action: Object
  ) => ({
    ...state,
    actions: {
      ...state.actions,
      updateDetails: {
        ...state.actions.updateDetails,
        loading: false,
        success: true,
      },
    },
  }),
  /**
   * Update details - Error
   */
  [CUSTOMERS_ACTIONS.UPDATE_DETAILS.ERROR]: (
    state: Object,
    action: Object
  ) => ({
    ...state,
    actions: {
      ...state.actions,
      updateDetails: {
        ...state.actions.updateDetails,
        loading: false,
        error: true,
      },
    },
  }),
  /**
   * Create payment - Pending
   */
  [CUSTOMERS_ACTIONS.CREATE_PAYMENT.PENDING]: (
    state: Object,
    action: Object
  ) => ({
    ...state,
    actions: {
      ...state.actions,
      createPayment: {
        loading: true,
        error: false,
        success: false,
      },
    },
  }),
  /**
   * Create payment - Success
   */
  [CUSTOMERS_ACTIONS.CREATE_PAYMENT.SUCCESS]: (
    state: Object,
    action: Object
  ) => ({
    ...state,
    actions: {
      ...state.actions,
      createPayment: {
        ...state.actions.createPayment,
        loading: false,
        success: true,
        ...action.payload.data,
      },
    },
  }),
  /**
   * Create payment - Error
   */
  [CUSTOMERS_ACTIONS.CREATE_PAYMENT.ERROR]: (
    state: Object,
    action: Object
  ) => ({
    ...state,
    actions: {
      ...state.actions,
      createPayment: {
        ...state.actions.createPayment,
        loading: false,
        error: true,
      },
    },
  }),
  /**
   * Create payment - Clear
   */
  [CUSTOMERS_ACTIONS.CREATE_PAYMENT.CLEAR]: (
    state: Object,
    action: Object
  ) => ({
    ...state,
    actions: {
      ...state.actions,
      createPayment: {
        ...DEFAULT_STATE.actions.createPayment,
      },
    },
  }),
  /**
   * Add Card - Pending
   */
  [CUSTOMERS_ACTIONS.ADD_CREDIT_CARD.PENDING]: (
    state: Object,
    action: Object
  ) => ({
    ...state,
    actions: {
      ...state.actions,
      addCreditCard: {
        loading: true,
        error: false,
        success: false,
      },
    },
  }),
  /**
   * Add Card - Success
   */
  [CUSTOMERS_ACTIONS.ADD_CREDIT_CARD.SUCCESS]: (
    state: Object,
    action: Object
  ) => ({
    ...state,
    actions: {
      ...state.actions,
      addCreditCard: {
        ...state.actions.addCreditCard,
        loading: false,
        success: true,
      },
    },
  }),
  /**
   * Add Card - Error
   */
  [CUSTOMERS_ACTIONS.ADD_CREDIT_CARD.ERROR]: (
    state: Object,
    action: Object
  ) => ({
    ...state,
    actions: {
      ...state.actions,
      addCreditCard: {
        ...state.actions.addCreditCard,
        loading: false,
        error: true,
      },
    },
  }),
  /**
   * Add Payment Plan - Pending
   */
  [CUSTOMERS_ACTIONS.ADD_PAYMENT_PLAN.PENDING]: (
    state: Object,
    action: Object
  ) => ({
    ...state,
    actions: {
      ...state.actions,
      addPaymentPlan: {
        loading: true,
        error: false,
        success: false,
      },
    },
  }),
  /**
   * Add Payment Plan - Success
   */
  [CUSTOMERS_ACTIONS.ADD_PAYMENT_PLAN.SUCCESS]: (
    state: Object,
    action: Object
  ) => ({
    ...state,
    actions: {
      ...state.actions,
      addPaymentPlan: {
        ...state.actions.addPaymentPlan,
        loading: false,
        success: true,
      },
    },
  }),
  /**
   * Add Payment Plan - Error
   */
  [CUSTOMERS_ACTIONS.ADD_PAYMENT_PLAN.ERROR]: (
    state: Object,
    action: Object
  ) => ({
    ...state,
    actions: {
      ...state.actions,
      addPaymentPlan: {
        ...state.actions.addPaymentPlan,
        loading: false,
        error: true,
      },
    },
  }),
};

/**
 * Remove card that matches cardId
 * @param {number} cardId
 * @return {Array} customer cards
 */
function removeCardFromList(cards: Array<Object>, cardId: number) {
  return cards.filter(card => card.id !== cardId);
}

export default buildReducer(handlers, DEFAULT_STATE);
