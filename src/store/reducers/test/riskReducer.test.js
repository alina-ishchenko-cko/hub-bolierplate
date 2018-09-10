import riskReducer from '../riskReducer';
import {
  RISK_BLACKLIST,
  RISK_AVS,
  RISK_VELOCITY,
  RISK_MISMATCH,
  RISK_THRESHOLD,
  RISK_VERIFIED_INFO,
  RISK_COUNTRY,
} from 'store/constants';

describe('riskReducer', () => {
  const initState = {
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

  it('should return the initial state', () => {
    expect(riskReducer()).toEqual(initState);
  });

  it('should handle RISK_BLACKLIST.ATTRIBUTES.PENDING', () => {
    const prevState = {
      attributes: {
        loading: false,
        error: false,
        data: [],
      },
    };
    const action = {
      type: RISK_BLACKLIST.ATTRIBUTES.PENDING,
    };
    const expected = {
      attributes: {
        loading: true,
        error: false,
        data: [],
      },
    };
    const received = riskReducer(prevState, action);
    expect(received).toEqual(expected);
  });

  it('should handle RISK_BLACKLIST.ATTRIBUTES.SUCCESS', () => {
    const prevState = {
      attributes: {
        loading: true,
        error: false,
        data: [],
      },
    };
    const data = [
      { attributeType: 'Email', description: 'Email' },
      { attributeType: 'Phone', description: 'Phone' },
      { attributeType: 'BinNumber', description: 'BIN' },
      { attributeType: 'IpAddress', description: 'IP' },
      { attributeType: 'Card', description: 'Card Number' },
    ];
    const action = {
      type: RISK_BLACKLIST.ATTRIBUTES.SUCCESS,
      payload: { data },
    };
    const expected = {
      attributes: {
        loading: false,
        error: false,
        data,
      },
    };
    const received = riskReducer(prevState, action);
    expect(received).toEqual(expected);
  });

  it('should handle RISK_BLACKLIST.ATTRIBUTES.ERROR', () => {
    const prevState = {
      attributes: {
        loading: true,
        error: false,
        data: [],
      },
    };
    const action = {
      type: RISK_BLACKLIST.ATTRIBUTES.ERROR,
    };
    const expected = {
      attributes: {
        loading: false,
        error: true,
        data: [],
      },
    };
    const received = riskReducer(prevState, action);
    expect(received).toEqual(expected);
  });

  it('should handle RISK_BLACKLIST.ALL.PENDING', () => {
    const prevState = {
      blacklist: {
        loading: false,
        error: false,
      },
    };
    const action = {
      type: RISK_BLACKLIST.ALL.PENDING,
    };
    const expected = {
      blacklist: {
        ...initState.blacklist,
      },
    };
    const received = riskReducer(prevState, action);
    expect(received).toEqual(expected);
  });

  it('should handle RISK_BLACKLIST.ALL.SUCCESS', () => {
    const prevState = {
      blacklist: {
        loading: true,
        error: false,
      },
    };
    const data = {
      blacklists: [
        {
          id: 'generic_551',
          createdDate: '2017-09-04T14:55:56.227Z',
          attributeType: 'Email',
          attributeValue: 'test@removeme.com',
        },
        {
          id: 'generic_548',
          createdDate: '2017-09-04T14:28:15.443Z',
          attributeType: 'Email',
          attributeValue: 'test@removememe.com',
        },
      ],
      totalRows: 2,
      startIndex: 0,
    };
    const action = {
      type: RISK_BLACKLIST.ALL.SUCCESS,
      payload: { data },
    };
    const expected = {
      blacklist: {
        loading: false,
        error: false,
        ...data,
      },
    };
    const received = riskReducer(prevState, action);
    expect(received).toEqual(expected);
  });

  it('should handle RISK_BLACKLIST.ALL.ERROR', () => {
    const prevState = {
      blacklist: {
        loading: true,
        error: false,
      },
    };
    const action = {
      type: RISK_BLACKLIST.ALL.ERROR,
    };
    const expected = {
      blacklist: {
        loading: false,
        error: true,
      },
    };
    const received = riskReducer(prevState, action);
    expect(received).toEqual(expected);
  });

  it('should handle RISK_BLACKLIST.DELETE.PENDING', () => {
    const prevState = {
      actions: {
        deleteBlacklistRules: {
          loading: false,
          error: false,
          success: false,
        },
      },
    };
    const action = {
      type: RISK_BLACKLIST.DELETE.PENDING,
    };
    const expected = {
      actions: {
        deleteBlacklistRules: {
          loading: true,
          error: false,
          success: false,
        },
      },
    };
    const received = riskReducer(prevState, action);
    expect(received).toEqual(expected);
  });

  it('should handle RISK_BLACKLIST.DELETE.SUCCESS', () => {
    const prevState = {
      actions: {
        deleteBlacklistRules: {
          loading: true,
          error: false,
          success: false,
        },
      },
    };
    const action = {
      type: RISK_BLACKLIST.DELETE.SUCCESS,
    };
    const expected = {
      actions: {
        deleteBlacklistRules: {
          loading: false,
          error: false,
          success: true,
        },
      },
    };
    const received = riskReducer(prevState, action);
    expect(received).toEqual(expected);
  });

  it('should handle RISK_BLACKLIST.DELETE.ERROR', () => {
    const prevState = {
      actions: {
        deleteBlacklistRules: {
          loading: true,
          error: false,
          success: false,
        },
      },
    };
    const action = {
      type: RISK_BLACKLIST.DELETE.ERROR,
    };
    const expected = {
      actions: {
        deleteBlacklistRules: {
          loading: false,
          error: true,
          success: false,
        },
      },
    };
    const received = riskReducer(prevState, action);
    expect(received).toEqual(expected);
  });

  it('should handle RISK_BLACKLIST.ADD.PENDING', () => {
    const prevState = {
      actions: {
        addBlacklistRule: {
          loading: false,
          error: false,
          success: false,
        },
      },
    };
    const action = {
      type: RISK_BLACKLIST.ADD.PENDING,
    };
    const expected = {
      actions: {
        addBlacklistRule: {
          loading: true,
          error: false,
          success: false,
        },
      },
    };
    const received = riskReducer(prevState, action);
    expect(received).toEqual(expected);
  });

  it('should handle RISK_BLACKLIST.ADD.SUCCESS', () => {
    const prevState = {
      actions: {
        addBlacklistRule: {
          loading: true,
          error: false,
          success: false,
        },
      },
    };
    const action = {
      type: RISK_BLACKLIST.ADD.SUCCESS,
    };
    const expected = {
      actions: {
        addBlacklistRule: {
          loading: false,
          error: false,
          success: true,
        },
      },
    };
    const received = riskReducer(prevState, action);
    expect(received).toEqual(expected);
  });

  it('should handle RISK_BLACKLIST.ADD.ERROR', () => {
    const prevState = {
      actions: {
        addBlacklistRule: {
          loading: true,
          error: false,
          success: false,
        },
      },
    };
    const action = {
      type: RISK_BLACKLIST.ADD.ERROR,
    };
    const expected = {
      actions: {
        addBlacklistRule: {
          loading: false,
          error: true,
          success: false,
        },
      },
    };
    const received = riskReducer(prevState, action);
    expect(received).toEqual(expected);
  });

  it('should handle RISK_AVS.ALL.PENDING', () => {
    const prevState = {
      avs: {
        loading: false,
        error: false,
        data: [],
        actions: [],
      },
    };
    const action = {
      type: RISK_AVS.ALL.PENDING,
    };
    const expected = {
      avs: {
        loading: true,
        error: false,
        data: [],
        actions: [],
      },
    };
    const received = riskReducer(prevState, action);
    expect(received).toEqual(expected);
  });

  it('should handle RISK_AVS.ALL.SUCCESS', () => {
    const prevState = {
      avs: {
        loading: true,
        error: false,
        data: [],
      },
    };
    const data = [
      {
        id: 1,
        avsCode: 'A',
        description: 'Street Match Only',
        actionId: 5,
        isActive: false,
        pendingApproval: false,
      },
      {
        id: 2,
        avsCode: 'B',
        description:
          'Street Match but Postal/Zip Not Verified (Invalid Format)',
        actionId: 7,
        isActive: false,
        pendingApproval: false,
      },
    ];
    const action = {
      type: RISK_AVS.ALL.SUCCESS,
      payload: { data },
    };
    const expected = {
      avs: {
        loading: false,
        error: false,
        data,
      },
    };
    const received = riskReducer(prevState, action);
    expect(received).toEqual(expected);
  });

  it('should handle RISK_AVS.ALL.ERROR', () => {
    const prevState = {
      avs: {
        loading: true,
        error: false,
        data: [],
      },
    };
    const action = {
      type: RISK_AVS.ALL.ERROR,
    };
    const expected = {
      avs: {
        loading: false,
        error: true,
        data: [],
      },
    };
    const received = riskReducer(prevState, action);
    expect(received).toEqual(expected);
  });

  it('should handle RISK_AVS.LIST_ACTIONS.PENDING', () => {
    const prevState = {
      avs: {
        actions: {
          loading: false,
          error: false,
          data: [],
        },
      },
    };
    const action = {
      type: RISK_AVS.LIST_ACTIONS.PENDING,
    };
    const expected = {
      avs: {
        actions: {
          loading: true,
          error: false,
          data: [],
        },
      },
    };
    const received = riskReducer(prevState, action);
    expect(received).toEqual(expected);
  });

  it('should handle RISK_AVS.LIST_ACTIONS.SUCCESS', () => {
    const prevState = {
      avs: {
        actions: {
          loading: true,
          error: false,
          data: [],
        },
      },
    };
    const data = [
      { id: 5, action: 'FLAG' },
      { id: 6, action: 'VOID_BLACKLIST' },
      { id: 7, action: 'VOID_AUTHORIZE' },
    ];
    const action = {
      type: RISK_AVS.LIST_ACTIONS.SUCCESS,
      payload: { data },
    };
    const expected = {
      avs: {
        actions: {
          loading: false,
          error: false,
          data,
        },
      },
    };
    const received = riskReducer(prevState, action);
    expect(received).toEqual(expected);
  });

  it('should handle RISK_AVS.LIST_ACTIONS.ERROR', () => {
    const prevState = {
      avs: {
        actions: {
          loading: true,
          error: false,
          data: [],
        },
      },
    };
    const action = {
      type: RISK_AVS.LIST_ACTIONS.ERROR,
    };
    const expected = {
      avs: {
        actions: {
          loading: false,
          error: true,
          data: [],
        },
      },
    };
    const received = riskReducer(prevState, action);
    expect(received).toEqual(expected);
  });

  it('should handle RISK_AVS.SAVE.PENDING', () => {
    const prevState = {
      actions: {
        saveAvsRules: {
          loading: false,
          error: false,
          success: false,
        },
      },
    };
    const action = {
      type: RISK_AVS.SAVE.PENDING,
    };
    const expected = {
      actions: {
        saveAvsRules: {
          loading: true,
          error: false,
          success: false,
        },
      },
    };
    const received = riskReducer(prevState, action);
    expect(received).toEqual(expected);
  });

  it('should handle RISK_AVS.SAVE.SUCCESS', () => {
    const prevState = {
      actions: {
        saveAvsRules: {
          loading: true,
          error: false,
          success: false,
        },
      },
    };
    const action = {
      type: RISK_AVS.SAVE.SUCCESS,
    };
    const expected = {
      actions: {
        saveAvsRules: {
          loading: false,
          error: false,
          success: true,
        },
      },
    };
    const received = riskReducer(prevState, action);
    expect(received).toEqual(expected);
  });

  it('should handle RISK_AVS.SAVE.ERROR', () => {
    const prevState = {
      actions: {
        saveAvsRules: {
          loading: true,
          error: false,
          success: false,
        },
      },
    };
    const action = {
      type: RISK_AVS.SAVE.ERROR,
    };
    const expected = {
      actions: {
        saveAvsRules: {
          loading: false,
          error: true,
          success: false,
        },
      },
    };
    const received = riskReducer(prevState, action);
    expect(received).toEqual(expected);
  });

  it('should handle RISK_VELOCITY.ALL.PENDING', () => {
    const prevState = {
      velocity: {
        list: {
          loading: false,
          error: false,
          data: [],
        },
      },
    };
    const action = {
      type: RISK_VELOCITY.ALL.PENDING,
    };
    const expected = {
      velocity: {
        list: {
          loading: true,
          error: false,
          data: [],
        },
      },
    };
    const received = riskReducer(prevState, action);
    expect(received).toEqual(expected);
  });

  it('should handle RISK_VELOCITY.ALL.SUCCESS', () => {
    const prevState = {
      velocity: {
        list: {
          loading: true,
          error: false,
          data: [],
        },
      },
    };
    const data = [
      {
        id: 21,
        reasonCode: '40150',
        description: 'Card Velocity - Daily - Approved Only',
        actionId: 3,
        isActive: false,
        triggerCount: 1,
        transactionType: 'Approved',
        frequency: 'Daily',
        velocityRuleType: 'CardVelocity',
        pendingApproval: false,
      },
      {
        id: 22,
        reasonCode: '40151',
        description: 'Card Velocity - Daily - All transactions',
        actionId: 3,
        isActive: false,
        triggerCount: 1,
        transactionType: 'Approved & Declined',
        frequency: 'Daily',
        velocityRuleType: 'CardVelocity',
        pendingApproval: false,
      },
    ];
    const action = {
      type: RISK_VELOCITY.ALL.SUCCESS,
      payload: { data },
    };
    const expected = {
      velocity: {
        list: {
          loading: false,
          error: false,
          data,
        },
      },
    };
    const received = riskReducer(prevState, action);
    expect(received).toEqual(expected);
  });

  it('should handle RISK_VELOCITY.ALL.ERROR', () => {
    const prevState = {
      velocity: {
        list: {
          loading: true,
          error: false,
          data: [],
        },
      },
    };
    const action = {
      type: RISK_VELOCITY.ALL.ERROR,
    };
    const expected = {
      velocity: {
        list: {
          loading: false,
          error: true,
          data: [],
        },
      },
    };
    const received = riskReducer(prevState, action);
    expect(received).toEqual(expected);
  });

  it('should handle RISK_VELOCITY.LIST_ACTIONS.PENDING', () => {
    const prevState = {
      velocity: {
        actions: {
          loading: false,
          error: false,
          data: [],
        },
      },
    };
    const action = {
      type: RISK_VELOCITY.LIST_ACTIONS.PENDING,
    };
    const expected = {
      velocity: {
        actions: {
          loading: true,
          error: false,
          data: [],
        },
      },
    };
    const received = riskReducer(prevState, action);
    expect(received).toEqual(expected);
  });

  it('should handle RISK_VELOCITY.LIST_ACTIONS.SUCCESS', () => {
    const prevState = {
      velocity: {
        actions: {
          loading: true,
          error: false,
          data: [],
        },
      },
    };
    const data = [
      { id: 3, action: 'DECLINE' },
      { id: 4, action: 'DECLINE_BLACKLIST' },
    ];
    const action = {
      type: RISK_VELOCITY.LIST_ACTIONS.SUCCESS,
      payload: { data },
    };
    const expected = {
      velocity: {
        actions: {
          loading: false,
          error: false,
          data,
        },
      },
    };
    const received = riskReducer(prevState, action);
    expect(received).toEqual(expected);
  });

  it('should handle RISK_VELOCITY.LIST_ACTIONS.ERROR', () => {
    const prevState = {
      velocity: {
        actions: {
          loading: true,
          error: false,
          data: [],
        },
      },
    };
    const action = {
      type: RISK_VELOCITY.LIST_ACTIONS.ERROR,
    };
    const expected = {
      velocity: {
        actions: {
          loading: false,
          error: true,
          data: [],
        },
      },
    };
    const received = riskReducer(prevState, action);
    expect(received).toEqual(expected);
  });

  it('should handle RISK_VELOCITY.SAVE.PENDING', () => {
    const prevState = {
      actions: {
        saveVelocityRules: {
          loading: false,
          error: false,
          success: false,
        },
      },
    };
    const action = {
      type: RISK_VELOCITY.SAVE.PENDING,
    };
    const expected = {
      actions: {
        saveVelocityRules: {
          loading: true,
          error: false,
          success: false,
        },
      },
    };
    const received = riskReducer(prevState, action);
    expect(received).toEqual(expected);
  });

  it('should handle RISK_VELOCITY.SAVE.SUCCESS', () => {
    const prevState = {
      actions: {
        saveVelocityRules: {
          loading: true,
          success: false,
          error: false,
        },
      },
    };
    const action = {
      type: RISK_VELOCITY.SAVE.SUCCESS,
    };
    const expected = {
      actions: {
        saveVelocityRules: {
          loading: false,
          success: true,
          error: false,
        },
      },
    };
    const received = riskReducer(prevState, action);
    expect(received).toEqual(expected);
  });

  it('should handle RISK_VELOCITY.SAVE.ERROR', () => {
    const prevState = {
      actions: {
        saveVelocityRules: {
          loading: true,
          success: false,
          error: false,
        },
      },
    };
    const action = {
      type: RISK_VELOCITY.SAVE.ERROR,
    };
    const expected = {
      actions: {
        saveVelocityRules: {
          loading: false,
          success: false,
          error: true,
        },
      },
    };
    const received = riskReducer(prevState, action);
    expect(received).toEqual(expected);
  });

  it('should handle RISK_MISMATCH.ALL.PENDING', () => {
    const prevState = {
      mismatch: {
        list: {
          loading: false,
          error: false,
          data: [],
        },
      },
    };
    const action = {
      type: RISK_MISMATCH.ALL.PENDING,
    };
    const expected = {
      mismatch: {
        list: {
          loading: true,
          error: false,
          data: [],
        },
      },
    };
    const received = riskReducer(prevState, action);
    expect(received).toEqual(expected);
  });

  it('should handle RISK_MISMATCH.ALL.SUCCESS', () => {
    const prevState = {
      mismatch: {
        list: {
          loading: true,
          error: false,
          data: [],
        },
      },
    };
    const data = [
      {
        id: 37,
        reasonCode: '40131',
        description: 'Shipping to Billing mismatch',
        actionId: 5,
        isActive: false,
        pendingApproval: false,
      },
      {
        id: 35,
        reasonCode: '40132',
        description: 'Shipping to BIN mismatch',
        actionId: 5,
        isActive: false,
        pendingApproval: false,
      },
    ];
    const action = {
      type: RISK_MISMATCH.ALL.SUCCESS,
      payload: { data },
    };
    const expected = {
      mismatch: {
        list: {
          loading: false,
          error: false,
          data,
        },
      },
    };
    const received = riskReducer(prevState, action);
    expect(received).toEqual(expected);
  });

  it('should handle RISK_MISMATCH.ALL.ERROR', () => {
    const prevState = {
      mismatch: {
        list: {
          loading: true,
          error: false,
          data: [],
        },
      },
    };
    const action = {
      type: RISK_MISMATCH.ALL.ERROR,
    };
    const expected = {
      mismatch: {
        list: {
          loading: false,
          error: true,
          data: [],
        },
      },
    };
    const received = riskReducer(prevState, action);
    expect(received).toEqual(expected);
  });

  it('should handle RISK_MISMATCH.LIST_ACTIONS.PENDING', () => {
    const prevState = {
      mismatch: {
        actions: {
          loading: false,
          error: false,
          data: [],
        },
      },
    };
    const action = {
      type: RISK_MISMATCH.LIST_ACTIONS.PENDING,
    };
    const expected = {
      mismatch: {
        actions: {
          loading: true,
          error: false,
          data: [],
        },
      },
    };
    const received = riskReducer(prevState, action);
    expect(received).toEqual(expected);
  });

  it('should handle RISK_MISMATCH.LIST_ACTIONS.SUCCESS', () => {
    const prevState = {
      mismatch: {
        actions: {
          loading: true,
          error: false,
          data: [],
        },
      },
    };
    const data = [
      { id: 3, action: 'DECLINE' },
      { id: 4, action: 'DECLINE_BLACKLIST' },
    ];
    const action = {
      type: RISK_MISMATCH.LIST_ACTIONS.SUCCESS,
      payload: { data },
    };
    const expected = {
      mismatch: {
        actions: {
          loading: false,
          error: false,
          data,
        },
      },
    };
    const received = riskReducer(prevState, action);
    expect(received).toEqual(expected);
  });

  it('should handle RISK_MISMATCH.LIST_ACTIONS.ERROR', () => {
    const prevState = {
      mismatch: {
        actions: {
          loading: true,
          error: false,
          data: [],
        },
      },
    };
    const action = {
      type: RISK_MISMATCH.LIST_ACTIONS.ERROR,
    };
    const expected = {
      mismatch: {
        actions: {
          loading: false,
          error: true,
          data: [],
        },
      },
    };
    const received = riskReducer(prevState, action);
    expect(received).toEqual(expected);
  });

  it('should handle RISK_MISMATCH.SAVE.PENDING', () => {
    const prevState = {
      actions: {
        saveMismatchRules: {
          loading: false,
          error: false,
          success: false,
        },
      },
    };
    const action = {
      type: RISK_MISMATCH.SAVE.PENDING,
    };
    const expected = {
      actions: {
        saveMismatchRules: {
          loading: true,
          error: false,
          success: false,
        },
      },
    };
    const received = riskReducer(prevState, action);
    expect(received).toEqual(expected);
  });

  it('should handle RISK_MISMATCH.SAVE.SUCCESS', () => {
    const prevState = {
      actions: {
        saveMismatchRules: {
          loading: true,
          error: false,
          success: false,
        },
      },
    };
    const action = {
      type: RISK_MISMATCH.SAVE.SUCCESS,
    };
    const expected = {
      actions: {
        saveMismatchRules: {
          loading: false,
          error: false,
          success: true,
        },
      },
    };
    const received = riskReducer(prevState, action);
    expect(received).toEqual(expected);
  });

  it('should handle RISK_MISMATCH.SAVE.ERROR', () => {
    const prevState = {
      actions: {
        saveMismatchRules: {
          loading: true,
          error: false,
          success: false,
        },
      },
    };
    const action = {
      type: RISK_MISMATCH.SAVE.ERROR,
    };
    const expected = {
      actions: {
        saveMismatchRules: {
          loading: false,
          error: true,
          success: false,
        },
      },
    };
    const received = riskReducer(prevState, action);
    expect(received).toEqual(expected);
  });

  it('should handle RISK_THRESHOLD.ALL.PENDING', () => {
    const prevState = {
      threshold: {
        list: {
          loading: false,
          error: false,
          data: [],
        },
      },
    };
    const action = {
      type: RISK_THRESHOLD.ALL.PENDING,
    };
    const expected = {
      threshold: {
        list: {
          loading: true,
          error: false,
        },
      },
    };
    const received = riskReducer(prevState, action);
    expect(received).toEqual(expected);
  });

  it('should handle RISK_THRESHOLD.ALL.SUCCESS', () => {
    const prevState = {
      threshold: {
        list: {
          loading: true,
          error: false,
          data: {},
        },
      },
    };
    const data = {
      currencyId: 134,
      rules: [
        {
          id: 751,
          actionId: 8,
          isActive: false,
          reasonCode: '40141',
          lower: 0,
          upper: 200000,
          pendingApproval: false,
        },
        {
          id: 752,
          actionId: 8,
          isActive: false,
          reasonCode: '40141',
          lower: 200000,
          upper: -1,
          pendingApproval: false,
        },
      ],
    };
    const action = {
      type: RISK_THRESHOLD.ALL.SUCCESS,
      payload: { data },
    };
    const expected = {
      threshold: {
        list: {
          loading: false,
          error: false,
          ...data,
        },
      },
    };
    const received = riskReducer(prevState, action);
    expect(received).toEqual(expected);
  });

  it('should handle RISK_THRESHOLD.ALL.ERROR', () => {
    const prevState = {
      threshold: {
        list: {
          loading: true,
          error: false,
          data: [],
        },
      },
    };
    const action = {
      type: RISK_THRESHOLD.ALL.ERROR,
    };
    const expected = {
      threshold: {
        list: {
          loading: false,
          error: true,
          data: [],
        },
      },
    };
    const received = riskReducer(prevState, action);
    expect(received).toEqual(expected);
  });

  it('should handle RISK_THRESHOLD.LIST_ACTIONS.PENDING', () => {
    const prevState = {
      threshold: {
        actions: {
          loading: false,
          error: false,
          data: [],
        },
      },
    };
    const action = {
      type: RISK_THRESHOLD.LIST_ACTIONS.PENDING,
    };
    const expected = {
      threshold: {
        actions: {
          loading: true,
          error: false,
          data: [],
        },
      },
    };
    const received = riskReducer(prevState, action);
    expect(received).toEqual(expected);
  });

  it('should handle RISK_THRESHOLD.LIST_ACTIONS.SUCCESS', () => {
    const prevState = {
      threshold: {
        actions: {
          loading: true,
          error: false,
          data: [],
        },
      },
    };
    const data = [
      { id: 3, action: 'DECLINE' },
      { id: 4, action: 'DECLINE_BLACKLIST' },
    ];
    const action = {
      type: RISK_THRESHOLD.LIST_ACTIONS.SUCCESS,
      payload: { data },
    };
    const expected = {
      threshold: {
        actions: {
          loading: false,
          error: false,
          data,
        },
      },
    };
    const received = riskReducer(prevState, action);
    expect(received).toEqual(expected);
  });

  it('should handle RISK_THRESHOLD.LIST_ACTIONS.ERROR', () => {
    const prevState = {
      threshold: {
        actions: {
          loading: true,
          error: false,
          data: [],
        },
      },
    };
    const action = {
      type: RISK_THRESHOLD.LIST_ACTIONS.ERROR,
    };
    const expected = {
      threshold: {
        actions: {
          loading: false,
          error: true,
          data: [],
        },
      },
    };
    const received = riskReducer(prevState, action);
    expect(received).toEqual(expected);
  });

  it('should handle RISK_THRESHOLD.SAVE.PENDING', () => {
    const prevState = {
      actions: {
        saveThresholdRules: {
          loading: false,
          error: false,
          success: false,
        },
      },
    };
    const action = {
      type: RISK_THRESHOLD.SAVE.PENDING,
    };
    const expected = {
      actions: {
        saveThresholdRules: {
          loading: true,
          error: false,
          success: false,
        },
      },
    };
    const received = riskReducer(prevState, action);
    expect(received).toEqual(expected);
  });

  it('should handle RISK_THRESHOLD.SAVE.SUCCESS', () => {
    const prevState = {
      actions: {
        saveThresholdRules: {
          loading: true,
          error: false,
          success: false,
        },
      },
    };
    const action = {
      type: RISK_THRESHOLD.SAVE.SUCCESS,
    };
    const expected = {
      actions: {
        saveThresholdRules: {
          loading: false,
          error: false,
          success: true,
        },
      },
    };
    const received = riskReducer(prevState, action);
    expect(received).toEqual(expected);
  });

  it('should handle RISK_THRESHOLD.SAVE.ERROR', () => {
    const prevState = {
      actions: {
        saveThresholdRules: {
          loading: true,
          error: false,
          success: false,
        },
      },
    };
    const action = {
      type: RISK_THRESHOLD.SAVE.ERROR,
    };
    const expected = {
      actions: {
        saveThresholdRules: {
          loading: false,
          error: true,
          success: false,
        },
      },
    };
    const received = riskReducer(prevState, action);
    expect(received).toEqual(expected);
  });

  it('should handle RISK_VERIFIED_INFO.ALL.PENDING', () => {
    const prevState = {
      verifiedInfo: {
        list: {
          loading: false,
          error: false,
          data: [],
        },
      },
    };
    const action = {
      type: RISK_VERIFIED_INFO.ALL.PENDING,
    };
    const expected = {
      verifiedInfo: {
        list: {
          loading: true,
          error: false,
          data: [],
        },
      },
    };
    const received = riskReducer(prevState, action);
    expect(received).toEqual(expected);
  });

  it('should handle RISK_VERIFIED_INFO.ALL.SUCCESS', () => {
    const prevState = {
      verifiedInfo: {
        list: {
          loading: true,
          error: false,
          data: [],
        },
      },
    };
    const data = [
      {
        id: 44,
        reasonCode: '40181',
        description: 'Verify the email address is valid ',
        actionId: 3,
        isActive: false,
        pendingApproval: false,
      },
      {
        id: 45,
        reasonCode: '40183',
        description: 'Verify if the IP is behind a proxy',
        actionId: 5,
        isActive: false,
        pendingApproval: false,
      },
    ];
    const action = {
      type: RISK_VERIFIED_INFO.ALL.SUCCESS,
      payload: { data },
    };
    const expected = {
      verifiedInfo: {
        list: {
          loading: false,
          error: false,
          data,
        },
      },
    };
    const received = riskReducer(prevState, action);
    expect(received).toEqual(expected);
  });

  it('should handle RISK_VERIFIED_INFO.ALL.ERROR', () => {
    const prevState = {
      verifiedInfo: {
        list: {
          loading: true,
          error: false,
          data: [],
        },
      },
    };
    const action = {
      type: RISK_VERIFIED_INFO.ALL.ERROR,
    };
    const expected = {
      verifiedInfo: {
        list: {
          loading: false,
          error: true,
          data: [],
        },
      },
    };
    const received = riskReducer(prevState, action);
    expect(received).toEqual(expected);
  });

  it('should handle RISK_VERIFIED_INFO.LIST_ACTIONS.PENDING', () => {
    const prevState = {
      verifiedInfo: {
        actions: {
          loading: false,
          error: false,
          data: [],
        },
      },
    };
    const action = {
      type: RISK_VERIFIED_INFO.LIST_ACTIONS.PENDING,
    };
    const expected = {
      verifiedInfo: {
        actions: {
          loading: true,
          error: false,
          data: [],
        },
      },
    };
    const received = riskReducer(prevState, action);
    expect(received).toEqual(expected);
  });

  it('should handle RISK_VERIFIED_INFO.LIST_ACTIONS.SUCCESS', () => {
    const prevState = {
      verifiedInfo: {
        actions: {
          loading: true,
          error: false,
          data: [],
        },
      },
    };
    const data = [
      { id: 3, action: 'DECLINE' },
      { id: 4, action: 'DECLINE_BLACKLIST' },
    ];
    const action = {
      type: RISK_VERIFIED_INFO.LIST_ACTIONS.SUCCESS,
      payload: { data },
    };
    const expected = {
      verifiedInfo: {
        actions: {
          loading: false,
          error: false,
          data,
        },
      },
    };
    const received = riskReducer(prevState, action);
    expect(received).toEqual(expected);
  });

  it('should handle RISK_VERIFIED_INFO.LIST_ACTIONS.ERROR', () => {
    const prevState = {
      verifiedInfo: {
        actions: {
          loading: true,
          error: false,
          data: [],
        },
      },
    };
    const action = {
      type: RISK_VERIFIED_INFO.LIST_ACTIONS.ERROR,
    };
    const expected = {
      verifiedInfo: {
        actions: {
          loading: false,
          error: true,
          data: [],
        },
      },
    };
    const received = riskReducer(prevState, action);
    expect(received).toEqual(expected);
  });

  it('should handle RISK_VERIFIED_INFO.SAVE.PENDING', () => {
    const prevState = {
      actions: {
        saveVerifiedInfoRules: {
          loading: false,
          error: false,
          success: false,
        },
      },
    };
    const action = {
      type: RISK_VERIFIED_INFO.SAVE.PENDING,
    };
    const expected = {
      actions: {
        saveVerifiedInfoRules: {
          loading: true,
          error: false,
          success: false,
        },
      },
    };
    const received = riskReducer(prevState, action);
    expect(received).toEqual(expected);
  });

  it('should handle RISK_VERIFIED_INFO.SAVE.SUCCESS', () => {
    const prevState = {
      actions: {
        saveVerifiedInfoRules: {
          loading: true,
          error: false,
          success: true,
        },
      },
    };
    const action = {
      type: RISK_VERIFIED_INFO.SAVE.SUCCESS,
    };
    const expected = {
      actions: {
        saveVerifiedInfoRules: {
          loading: false,
          error: false,
          success: true,
        },
      },
    };
    const received = riskReducer(prevState, action);
    expect(received).toEqual(expected);
  });

  it('should handle RISK_VERIFIED_INFO.SAVE.ERROR', () => {
    const prevState = {
      actions: {
        saveVerifiedInfoRules: {
          loading: true,
          error: false,
          success: false,
        },
      },
    };
    const action = {
      type: RISK_VERIFIED_INFO.SAVE.ERROR,
    };
    const expected = {
      actions: {
        saveVerifiedInfoRules: {
          loading: false,
          error: true,
          success: false,
        },
      },
    };
    const received = riskReducer(prevState, action);
    expect(received).toEqual(expected);
  });

  it('should handle RISK_COUNTRY.ALL.PENDING', () => {
    const prevState = {
      riskCountry: {
        list: {
          loading: false,
          error: false,
        },
      },
    };
    const action = {
      type: RISK_COUNTRY.ALL.PENDING,
    };
    const expected = {
      riskCountry: {
        list: {
          loading: true,
          error: false,
        },
      },
    };
    const received = riskReducer(prevState, action);
    expect(received).toEqual(expected);
  });

  it('should handle RISK_COUNTRY.ALL.SUCCESS', () => {
    const prevState = {
      riskCountry: {
        list: {
          loading: true,
          error: false,
        },
      },
    };
    const data = { pendingApproval: false, countries: [1, 2, 3, 239] };
    const action = {
      type: RISK_COUNTRY.ALL.SUCCESS,
      payload: { data },
    };
    const expected = {
      riskCountry: {
        list: {
          loading: false,
          error: false,
          ...data,
        },
      },
    };
    const received = riskReducer(prevState, action);
    expect(received).toEqual(expected);
  });

  it('should handle RISK_COUNTRY.ALL.ERROR', () => {
    const prevState = {
      riskCountry: {
        list: {
          loading: true,
          error: false,
        },
      },
    };
    const action = {
      type: RISK_COUNTRY.ALL.ERROR,
    };
    const expected = {
      riskCountry: {
        list: {
          loading: false,
          error: true,
        },
      },
    };
    const received = riskReducer(prevState, action);
    expect(received).toEqual(expected);
  });

  it('should handle RISK_COUNTRY.SAVE.PENDING', () => {
    const prevState = {
      actions: {
        saveHighRiskCountries: {
          loading: false,
          error: false,
          success: false,
        },
      },
    };
    const action = {
      type: RISK_COUNTRY.SAVE.PENDING,
    };
    const expected = {
      actions: {
        saveHighRiskCountries: {
          loading: true,
          error: false,
          success: false,
        },
      },
    };
    const received = riskReducer(prevState, action);
    expect(received).toEqual(expected);
  });

  it('should handle RISK_COUNTRY.SAVE.SUCCESS', () => {
    const prevState = {
      actions: {
        saveHighRiskCountries: {
          loading: true,
          error: false,
          success: false,
        },
      },
    };
    const action = {
      type: RISK_COUNTRY.SAVE.SUCCESS,
    };
    const expected = {
      actions: {
        saveHighRiskCountries: {
          loading: false,
          error: false,
          success: true,
        },
      },
    };
    const received = riskReducer(prevState, action);
    expect(received).toEqual(expected);
  });

  it('should handle RISK_COUNTRY.SAVE.ERROR', () => {
    const prevState = {
      actions: {
        saveHighRiskCountries: {
          loading: true,
          error: false,
          success: false,
        },
      },
    };
    const action = {
      type: RISK_COUNTRY.SAVE.ERROR,
    };
    const expected = {
      actions: {
        saveHighRiskCountries: {
          loading: false,
          error: true,
          success: false,
        },
      },
    };
    const received = riskReducer(prevState, action);
    expect(received).toEqual(expected);
  });
});
