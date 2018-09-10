// @flow
import {
  RISK_BLACKLIST,
  RISK_AVS,
  RISK_VELOCITY,
  RISK_MISMATCH,
  RISK_THRESHOLD,
  RISK_VERIFIED_INFO,
  RISK_COUNTRY,
} from 'store/constants';
import { buildReducer } from 'utils/reducer.util';

const DEFAULT_STATE = {
  attributes: {
    loading: false,
    error: false,
    data: [],
  },
  blacklist: {
    loading: false,
    error: false,
  },
  avs: {
    loading: false,
    error: false,
    data: [],
    actions: {
      loading: false,
      error: false,
      data: [],
    },
  },
  velocity: {
    list: {
      loading: false,
      error: false,
      data: [],
    },
    actions: {
      loading: false,
      error: false,
      data: [],
    },
  },
  mismatch: {
    list: {
      loading: false,
      error: false,
      data: [],
    },
    actions: {
      loading: false,
      error: false,
      data: [],
    },
  },
  threshold: {
    list: {
      loading: false,
      error: false,
      data: [],
    },
    actions: {
      loading: false,
      error: false,
      data: [],
    },
  },
  verifiedInfo: {
    list: {
      loading: false,
      error: false,
      data: [],
    },
    actions: {
      loading: false,
      error: false,
      data: [],
    },
  },
  riskCountry: {
    list: {
      loading: false,
      error: false,
    },
  },
  actions: {
    deleteBlacklistRules: {
      loading: false,
      error: false,
      success: false,
    },
    addBlacklistRule: {
      loading: false,
      error: false,
      success: false,
    },
    saveAvsRules: {
      loading: false,
      error: false,
      success: false,
    },
    saveVelocityRules: {
      loading: false,
      error: false,
      success: false,
    },
    saveMismatchRules: {
      loading: false,
      error: false,
      success: false,
    },
    saveThresholdRules: {
      loading: false,
      error: false,
      success: false,
    },
    saveVerifiedInfoRules: {
      loading: false,
      error: false,
      success: false,
    },
    saveHighRiskCountries: {
      loading: false,
      error: false,
      success: false,
    },
  },
};

const handlers = {
  /**
   * Blacklist Attributes - Pending
   */
  [RISK_BLACKLIST.ATTRIBUTES.PENDING]: (state: Object, action: Object) => ({
    ...state,
    attributes: {
      ...DEFAULT_STATE.attributes,
      loading: true,
    },
  }),
  /**
   * Blacklist Attributes - Success
   */
  [RISK_BLACKLIST.ATTRIBUTES.SUCCESS]: (state: Object, action: Object) => ({
    ...state,
    attributes: {
      ...state.attributes,
      loading: false,
      data: action.payload.data,
    },
  }),
  /**
   * Blacklist Attributes - Error
   */
  [RISK_BLACKLIST.ATTRIBUTES.ERROR]: (state: Object, action: Object) => ({
    ...state,
    attributes: {
      ...state.attributes,
      loading: false,
      error: true,
    },
  }),
  /**
   * All - Pending
   */
  [RISK_BLACKLIST.ALL.PENDING]: (state: Object, action: Object) => ({
    ...state,
    blacklist: {
      ...DEFAULT_STATE.blacklist,
    },
  }),
  /**
   * All - Success
   */
  [RISK_BLACKLIST.ALL.SUCCESS]: (state: Object, action: Object) => ({
    ...state,
    blacklist: {
      ...state.blacklist,
      loading: false,
      ...action.payload.data,
    },
  }),
  /**
   * All - Error
   */
  [RISK_BLACKLIST.ALL.ERROR]: (state: Object, action: Object) => ({
    ...state,
    blacklist: {
      ...state.blacklist,
      loading: false,
      error: true,
    },
  }),
  /**
   * Delete - Pending
   */
  [RISK_BLACKLIST.DELETE.PENDING]: (state: Object, action: Object) => ({
    ...state,
    actions: {
      ...state.actions,
      deleteBlacklistRules: {
        ...DEFAULT_STATE.actions.deleteBlacklistRules,
        loading: true,
      },
    },
  }),
  /**
   * Delete - Success
   */
  [RISK_BLACKLIST.DELETE.SUCCESS]: (state: Object, action: Object) => ({
    ...state,
    actions: {
      ...state.actions,
      deleteBlacklistRules: {
        loading: false,
        error: false,
        success: true,
      },
    },
  }),
  /**
   * Delete - Error
   */
  [RISK_BLACKLIST.DELETE.ERROR]: (state: Object, action: Object) => ({
    ...state,
    actions: {
      ...state.actions,
      deleteBlacklistRules: {
        loading: false,
        error: true,
        success: false,
      },
    },
  }),
  /**
   * Add - Pending
   */
  [RISK_BLACKLIST.ADD.PENDING]: (state: Object, action: Object) => ({
    ...state,
    actions: {
      ...state.actions,
      addBlacklistRule: {
        ...DEFAULT_STATE.actions.addBlacklistRule,
        loading: true,
      },
    },
  }),
  /**
   * Add - Success
   */
  [RISK_BLACKLIST.ADD.SUCCESS]: (state: Object, action: Object) => ({
    ...state,
    actions: {
      ...state.actions,
      addBlacklistRule: {
        ...state.actions.addBlacklistRule,
        loading: false,
        success: true,
      },
    },
  }),
  /**
   * Add - Error
   */
  [RISK_BLACKLIST.ADD.ERROR]: (state: Object, action: Object) => ({
    ...state,
    actions: {
      ...state.actions,
      addBlacklistRule: {
        ...state.actions.addBlacklistRule,
        loading: false,
        error: true,
      },
    },
  }),
  /**
   * AVS - Pending
   */
  [RISK_AVS.ALL.PENDING]: (state: Object, action: Object) => ({
    ...state,
    avs: {
      ...state.avs,
      loading: true,
      error: false,
      data: [],
    },
  }),
  /**
   * AVS - Success
   */
  [RISK_AVS.ALL.SUCCESS]: (state: Object, action: Object) => ({
    ...state,
    avs: {
      ...state.avs,
      loading: false,
      data: action.payload.data,
    },
  }),
  /**
   * AVS - Error
   */
  [RISK_AVS.ALL.ERROR]: (state: Object, action: Object) => ({
    ...state,
    avs: {
      ...state.avs,
      loading: false,
      error: true,
    },
  }),
  /**
   * AVS Actions - Pending
   */
  [RISK_AVS.LIST_ACTIONS.PENDING]: (state: Object, action: Object) => ({
    ...state,
    avs: {
      ...state.avs,
      actions: {
        ...DEFAULT_STATE.avs.actions,
        loading: true,
      },
    },
  }),
  /**
   * AVS Actions - Success
   */
  [RISK_AVS.LIST_ACTIONS.SUCCESS]: (state: Object, action: Object) => ({
    ...state,
    avs: {
      ...state.avs,
      actions: {
        loading: false,
        error: false,
        data: action.payload.data,
      },
    },
  }),
  /**
   * AVS Actions - Error
   */
  [RISK_AVS.LIST_ACTIONS.ERROR]: (state: Object, action: Object) => ({
    ...state,
    avs: {
      ...state.avs,
      actions: {
        ...state.avs.actions,
        loading: false,
        error: true,
      },
    },
  }),
  /**
   * AVS Save - Pending
   */
  [RISK_AVS.SAVE.PENDING]: (state: Object, action: Object) => ({
    ...state,
    actions: {
      ...state.actions,
      saveAvsRules: {
        loading: true,
        error: false,
        success: false,
      },
    },
  }),
  /**
   * AVS Save - Success
   */
  [RISK_AVS.SAVE.SUCCESS]: (state: Object, action: Object) => ({
    ...state,
    actions: {
      ...state.actions,
      saveAvsRules: {
        loading: false,
        error: false,
        success: true,
      },
    },
  }),
  /**
   * AVS Save - Error
   */
  [RISK_AVS.SAVE.ERROR]: (state: Object, action: Object) => ({
    ...state,
    actions: {
      ...state.actions,
      saveAvsRules: {
        loading: false,
        error: true,
        success: false,
      },
    },
  }),
  /**
   * Velocity all - Pending
   */
  [RISK_VELOCITY.ALL.PENDING]: (state: Object, action: Object) => ({
    ...state,
    velocity: {
      ...state.velocity,
      list: {
        loading: true,
        error: false,
        data: [],
      },
    },
  }),
  /**
   * Velocity all - Success
   */
  [RISK_VELOCITY.ALL.SUCCESS]: (state: Object, action: Object) => ({
    ...state,
    velocity: {
      ...state.velocity,
      list: {
        loading: false,
        error: false,
        data: action.payload.data,
      },
    },
  }),
  /**
   * Velocity all - Error
   */
  [RISK_VELOCITY.ALL.ERROR]: (state: Object, action: Object) => ({
    ...state,
    velocity: {
      ...state.velocity,
      list: {
        ...state.velocity.list,
        loading: false,
        error: true,
      },
    },
  }),
  /**
   * Velocity Actions - Pending
   */
  [RISK_VELOCITY.LIST_ACTIONS.PENDING]: (state: Object, action: Object) => ({
    ...state,
    velocity: {
      ...state.velocity,
      actions: {
        loading: true,
        error: false,
        data: [],
      },
    },
  }),
  /**
   * Velocity Actions - Success
   */
  [RISK_VELOCITY.LIST_ACTIONS.SUCCESS]: (state: Object, action: Object) => ({
    ...state,
    velocity: {
      ...state.velocity,
      actions: {
        loading: false,
        error: false,
        data: action.payload.data,
      },
    },
  }),
  /**
   * Velocity Actions - Error
   */
  [RISK_VELOCITY.LIST_ACTIONS.ERROR]: (state: Object, action: Object) => ({
    ...state,
    velocity: {
      ...state.velocity,
      actions: {
        ...state.velocity.actions,
        loading: false,
        error: true,
      },
    },
  }),
  /**
   * Velocity Save - Pending
   */
  [RISK_VELOCITY.SAVE.PENDING]: (state: Object, action: Object) => ({
    ...state,
    actions: {
      ...state.actions,
      saveVelocityRules: {
        loading: true,
        error: false,
        success: false,
      },
    },
  }),
  /**
   * Velocity Save - Success
   */
  [RISK_VELOCITY.SAVE.SUCCESS]: (state: Object, action: Object) => ({
    ...state,
    actions: {
      ...state.actions,
      saveVelocityRules: {
        loading: false,
        error: false,
        success: true,
      },
    },
  }),
  /**
   * Velocity Save - Error
   */
  [RISK_VELOCITY.SAVE.ERROR]: (state: Object, action: Object) => ({
    ...state,
    actions: {
      ...state.actions,
      saveVelocityRules: {
        loading: false,
        error: true,
        success: false,
      },
    },
  }),
  /**
   * Mismatch All - Pending
   */
  [RISK_MISMATCH.ALL.PENDING]: (state: Object, action: Object) => ({
    ...state,
    mismatch: {
      ...state.mismatch,
      list: {
        loading: true,
        error: false,
        data: [],
      },
    },
  }),
  /**
   * Mismatch All - Success
   */
  [RISK_MISMATCH.ALL.SUCCESS]: (state: Object, action: Object) => ({
    ...state,
    mismatch: {
      ...state.mismatch,
      list: {
        loading: false,
        error: false,
        data: action.payload.data,
      },
    },
  }),
  /**
   * Mismatch All - Error
   */
  [RISK_MISMATCH.ALL.ERROR]: (state: Object, action: Object) => ({
    ...state,
    mismatch: {
      ...state.mismatch,
      list: {
        ...state.mismatch.list,
        loading: false,
        error: true,
      },
    },
  }),
  /**
   * Mismatch Actions - Pending
   */
  [RISK_MISMATCH.LIST_ACTIONS.PENDING]: (state: Object, action: Object) => ({
    ...state,
    mismatch: {
      ...state.mismatch,
      actions: {
        loading: true,
        error: false,
        data: [],
      },
    },
  }),
  /**
   * Mismatch Actions - Success
   */
  [RISK_MISMATCH.LIST_ACTIONS.SUCCESS]: (state: Object, action: Object) => ({
    ...state,
    mismatch: {
      ...state.mismatch,
      actions: {
        loading: false,
        error: false,
        data: action.payload.data,
      },
    },
  }),
  /**
   * Mismatch Actions - Error
   */
  [RISK_MISMATCH.LIST_ACTIONS.ERROR]: (state: Object, action: Object) => ({
    ...state,
    mismatch: {
      ...state.mismatch,
      actions: {
        ...state.mismatch.actions,
        loading: false,
        error: true,
      },
    },
  }),
  /**
   * Mismatch Save - Pending
   */
  [RISK_MISMATCH.SAVE.PENDING]: (state: Object, action: Object) => ({
    ...state,
    actions: {
      ...state.actions,
      saveMismatchRules: {
        loading: true,
        error: false,
        success: false,
      },
    },
  }),
  /**
   * Mismatch Save - Success
   */
  [RISK_MISMATCH.SAVE.SUCCESS]: (state: Object, action: Object) => ({
    ...state,
    actions: {
      ...state.actions,
      saveMismatchRules: {
        loading: false,
        error: false,
        success: true,
      },
    },
  }),
  /**
   * Mismatch Save - Error
   */
  [RISK_MISMATCH.SAVE.ERROR]: (state: Object, action: Object) => ({
    ...state,
    actions: {
      ...state.actions,
      saveMismatchRules: {
        loading: false,
        error: true,
        success: false,
      },
    },
  }),
  /**
   * Threshold All - Pending
   */
  [RISK_THRESHOLD.ALL.PENDING]: (state: Object, action: Object) => ({
    ...state,
    threshold: {
      ...state.threshold,
      list: {
        loading: true,
        error: false,
      },
    },
  }),
  /**
   * Threshold All - Success
   */
  [RISK_THRESHOLD.ALL.SUCCESS]: (state: Object, action: Object) => ({
    ...state,
    threshold: {
      ...state.threshold,
      list: {
        loading: false,
        error: false,
        ...action.payload.data,
      },
    },
  }),
  /**
   * Threshold All - Error
   */
  [RISK_THRESHOLD.ALL.ERROR]: (state: Object, action: Object) => ({
    ...state,
    threshold: {
      ...state.threshold,
      list: {
        ...state.threshold.list,
        loading: false,
        error: true,
      },
    },
  }),
  /**
   * Threshold Actions - Pending
   */
  [RISK_THRESHOLD.LIST_ACTIONS.PENDING]: (state: Object, action: Object) => ({
    ...state,
    threshold: {
      ...state.threshold,
      actions: {
        loading: true,
        error: false,
        data: [],
      },
    },
  }),
  /**
   * Threshold Actions - Success
   */
  [RISK_THRESHOLD.LIST_ACTIONS.SUCCESS]: (state: Object, action: Object) => ({
    ...state,
    threshold: {
      ...state.threshold,
      actions: {
        loading: false,
        error: false,
        data: action.payload.data,
      },
    },
  }),
  /**
   * Threshold Actions - Error
   */
  [RISK_THRESHOLD.LIST_ACTIONS.ERROR]: (state: Object, action: Object) => ({
    ...state,
    threshold: {
      ...state.threshold,
      actions: {
        ...state.threshold.actions,
        loading: false,
        error: true,
      },
    },
  }),
  /**
   * Threshold Save - Pending
   */
  [RISK_THRESHOLD.SAVE.PENDING]: (state: Object, action: Object) => ({
    ...state,
    actions: {
      ...state.actions,
      saveThresholdRules: {
        loading: true,
        error: false,
        success: false,
      },
    },
  }),
  /**
   * Threshold Save - Success
   */
  [RISK_THRESHOLD.SAVE.SUCCESS]: (state: Object, action: Object) => ({
    ...state,
    actions: {
      ...state.actions,
      saveThresholdRules: {
        loading: false,
        error: false,
        success: true,
      },
    },
  }),
  /**
   * Threshold Save - Error
   */
  [RISK_THRESHOLD.SAVE.ERROR]: (state: Object, action: Object) => ({
    ...state,
    actions: {
      ...state.actions,
      saveThresholdRules: {
        loading: false,
        error: true,
        success: false,
      },
    },
  }),
  /**
   * Verified Info - Pending
   */
  [RISK_VERIFIED_INFO.ALL.PENDING]: (state: Object, action: Object) => ({
    ...state,
    verifiedInfo: {
      ...state.verifiedInfo,
      list: {
        loading: true,
        error: false,
        data: [],
      },
    },
  }),
  /**
   * Verified Info - Success
   */
  [RISK_VERIFIED_INFO.ALL.SUCCESS]: (state: Object, action: Object) => ({
    ...state,
    verifiedInfo: {
      ...state.verifiedInfo,
      list: {
        loading: false,
        error: false,
        data: action.payload.data,
      },
    },
  }),
  /**
   * Verified Info - Error
   */
  [RISK_VERIFIED_INFO.ALL.ERROR]: (state: Object, action: Object) => ({
    ...state,
    verifiedInfo: {
      ...state.verifiedInfo,
      list: {
        ...state.verifiedInfo.list,
        loading: false,
        error: true,
      },
    },
  }),
  /**
   * Verified Info Action - Pending
   */
  [RISK_VERIFIED_INFO.LIST_ACTIONS.PENDING]: (
    state: Object,
    action: Object
  ) => ({
    ...state,
    verifiedInfo: {
      ...state.verifiedInfo,
      actions: {
        loading: true,
        error: false,
        data: [],
      },
    },
  }),
  /**
   * Verified Info Action - Success
   */
  [RISK_VERIFIED_INFO.LIST_ACTIONS.SUCCESS]: (
    state: Object,
    action: Object
  ) => ({
    ...state,
    verifiedInfo: {
      ...state.verifiedInfo,
      actions: {
        loading: false,
        error: false,
        data: action.payload.data,
      },
    },
  }),
  /**
   * Verified Info Action - Error
   */
  [RISK_VERIFIED_INFO.LIST_ACTIONS.ERROR]: (state: Object, action: Object) => ({
    ...state,
    verifiedInfo: {
      ...state.verifiedInfo,
      actions: {
        ...state.verifiedInfo.actions,
        loading: false,
        error: true,
      },
    },
  }),
  /**
   * Verified Info Save - Pending
   */
  [RISK_VERIFIED_INFO.SAVE.PENDING]: (state: Object, action: Object) => ({
    ...state,
    actions: {
      ...state.actions,
      saveVerifiedInfoRules: {
        loading: true,
        error: false,
        success: false,
      },
    },
  }),
  /**
   * Verified Info Save - Success
   */
  [RISK_VERIFIED_INFO.SAVE.SUCCESS]: (state: Object, action: Object) => ({
    ...state,
    actions: {
      ...state.actions,
      saveVerifiedInfoRules: {
        loading: false,
        error: false,
        success: true,
      },
    },
  }),
  /**
   * Verified Info Save - Error
   */
  [RISK_VERIFIED_INFO.SAVE.ERROR]: (state: Object, action: Object) => ({
    ...state,
    actions: {
      ...state.actions,
      saveVerifiedInfoRules: {
        loading: false,
        error: true,
        success: false,
      },
    },
  }),
  /**
   * Country - Pending
   */
  [RISK_COUNTRY.ALL.PENDING]: (state: Object, action: Object) => ({
    ...state,
    riskCountry: {
      ...state.riskCountry,
      list: {
        loading: true,
        error: false,
      },
    },
  }),
  /**
   * Country - Success
   */
  [RISK_COUNTRY.ALL.SUCCESS]: (state: Object, action: Object) => ({
    ...state,
    riskCountry: {
      ...state.riskCountry,
      list: {
        loading: false,
        error: false,
        ...action.payload.data,
      },
    },
  }),
  /**
   * Country - Error
   */
  [RISK_COUNTRY.ALL.ERROR]: (state: Object, action: Object) => ({
    ...state,
    riskCountry: {
      ...state.riskCountry,
      list: {
        loading: false,
        error: true,
      },
    },
  }),
  /**
   * Country Save - Pending
   */
  [RISK_COUNTRY.SAVE.PENDING]: (state: Object, action: Object) => ({
    ...state,
    actions: {
      ...state.actions,
      saveHighRiskCountries: {
        loading: true,
        error: false,
        success: false,
      },
    },
  }),
  /**
   * Country Save - Success
   */
  [RISK_COUNTRY.SAVE.SUCCESS]: (state: Object, action: Object) => ({
    ...state,
    actions: {
      ...state.actions,
      saveHighRiskCountries: {
        loading: false,
        error: false,
        success: true,
      },
    },
  }),
  /**
   * Country Save - Error
   */
  [RISK_COUNTRY.SAVE.ERROR]: (state: Object, action: Object) => ({
    ...state,
    actions: {
      ...state.actions,
      saveHighRiskCountries: {
        loading: false,
        error: true,
        success: false,
      },
    },
  }),
};

export default buildReducer(handlers, DEFAULT_STATE);
