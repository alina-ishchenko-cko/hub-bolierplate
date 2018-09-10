import userManagementReducer from '../userManagementReducer';
import { USER_MANAGEMENT } from 'store/constants';

describe('userManagementReducer', () => {
  const initState = {
    listUsers: {
      loading: false,
      error: false,
    },
    createUser: {
      loading: false,
      error: false,
      success: false,
    },
    updateUser: {
      loading: false,
      error: false,
      success: false,
    },
    deleteUser: {
      loading: false,
      error: false,
      success: false,
    },
  };

  it('should return the initial state', () => {
    expect(userManagementReducer()).toEqual(initState);
  });

  it('should handle USER_MANAGEMENT.LIST_USERS.PENDING', () => {
    const prevState = {
      listUsers: {
        loading: false,
        error: false,
      },
    };
    const action = {
      type: USER_MANAGEMENT.LIST_USERS.PENDING,
    };
    const expected = {
      listUsers: {
        loading: true,
        error: false,
      },
    };
    const received = userManagementReducer(prevState, action);
    expect(received).toEqual(expected);
  });

  it('should handle USER_MANAGEMENT.LIST_USERS.SUCCESS', () => {
    const prevState = {
      listUsers: {
        loading: true,
        error: false,
      },
    };
    const data = {
      users: [
        {
          id: 188,
          active: true,
          email: 'dgto1d9buyvak74jnstt9@cko.com',
          readOnly: false,
          merchantAccountId: 100101,
          allowedBusinesses: [100110],
        },
      ],
    };
    const action = {
      type: USER_MANAGEMENT.LIST_USERS.SUCCESS,
      payload: { data },
    };
    const expected = {
      listUsers: {
        loading: false,
        error: false,
        data: data.users,
      },
    };
    const received = userManagementReducer(prevState, action);
    expect(received).toEqual(expected);
  });

  it('should handle USER_MANAGEMENT.LIST_USERS.ERROR', () => {
    const prevState = {
      listUsers: {
        loading: true,
        error: false,
      },
    };
    const action = {
      type: USER_MANAGEMENT.LIST_USERS.ERROR,
    };
    const expected = {
      listUsers: {
        loading: false,
        error: true,
      },
    };
    const received = userManagementReducer(prevState, action);
    expect(received).toEqual(expected);
  });

  it('should handle USER_MANAGEMENT.CREATE_USER.PENDING', () => {
    const prevState = {
      createUser: {
        loading: false,
        error: false,
        success: false,
      },
    };
    const action = {
      type: USER_MANAGEMENT.CREATE_USER.PENDING,
    };
    const expected = {
      createUser: {
        loading: true,
        error: false,
        success: false,
      },
    };
    const received = userManagementReducer(prevState, action);
    expect(received).toEqual(expected);
  });

  it('should handle USER_MANAGEMENT.CREATE_USER.SUCCESS', () => {
    const prevState = {
      createUser: {
        loading: true,
        error: false,
        success: false,
      },
    };
    const action = {
      type: USER_MANAGEMENT.CREATE_USER.SUCCESS,
    };
    const expected = {
      createUser: {
        loading: false,
        error: false,
        success: true,
      },
    };
    const received = userManagementReducer(prevState, action);
    expect(received).toEqual(expected);
  });

  it('should handle USER_MANAGEMENT.CREATE_USER.ERROR', () => {
    const prevState = {
      createUser: {
        loading: true,
        error: false,
        success: false,
      },
    };
    const action = {
      type: USER_MANAGEMENT.CREATE_USER.ERROR,
    };
    const expected = {
      createUser: {
        loading: false,
        error: true,
        success: false,
      },
    };
    const received = userManagementReducer(prevState, action);
    expect(received).toEqual(expected);
  });

  it('should handle USER_MANAGEMENT.UPDATE_USER.PENDING', () => {
    const prevState = {
      updateUser: {
        loading: false,
        error: false,
        success: false,
      },
    };
    const action = {
      type: USER_MANAGEMENT.UPDATE_USER.PENDING,
    };
    const expected = {
      updateUser: {
        loading: true,
        error: false,
        success: false,
      },
    };
    const received = userManagementReducer(prevState, action);
    expect(received).toEqual(expected);
  });
  it('should handle USER_MANAGEMENT.UPDATE_USER.SUCCESS', () => {
    const prevState = {
      updateUser: {
        loading: true,
        error: false,
        success: false,
      },
    };
    const action = {
      type: USER_MANAGEMENT.UPDATE_USER.SUCCESS,
    };
    const expected = {
      updateUser: {
        loading: false,
        error: false,
        success: true,
      },
    };
    const received = userManagementReducer(prevState, action);
    expect(received).toEqual(expected);
  });

  it('should handle USER_MANAGEMENT.UPDATE_USER.ERROR', () => {
    const prevState = {
      updateUser: {
        loading: true,
        error: false,
        success: false,
      },
    };
    const action = {
      type: USER_MANAGEMENT.UPDATE_USER.ERROR,
    };
    const expected = {
      updateUser: {
        loading: false,
        error: true,
        success: false,
      },
    };
    const received = userManagementReducer(prevState, action);
    expect(received).toEqual(expected);
  });

  it('should handle USER_MANAGEMENT.DELETE_USER.PENDING', () => {
    const prevState = {
      deleteUser: {
        loading: false,
        error: false,
        success: false,
      },
    };
    const action = {
      type: USER_MANAGEMENT.DELETE_USER.PENDING,
    };
    const expected = {
      deleteUser: {
        loading: true,
        error: false,
        success: false,
      },
    };
    const received = userManagementReducer(prevState, action);
    expect(received).toEqual(expected);
  });

  it('should handle USER_MANAGEMENT.DELETE_USER.SUCCESS', () => {
    const prevState = {
      deleteUser: {
        loading: true,
        error: false,
        success: false,
      },
    };
    const action = {
      type: USER_MANAGEMENT.DELETE_USER.SUCCESS,
    };
    const expected = {
      deleteUser: {
        loading: false,
        error: false,
        success: true,
      },
    };
    const received = userManagementReducer(prevState, action);
    expect(received).toEqual(expected);
  });

  it('should handle USER_MANAGEMENT.DELETE_USER.ERROR', () => {
    const prevState = {
      deleteUser: {
        loading: true,
        error: false,
        success: false,
      },
    };
    const action = {
      type: USER_MANAGEMENT.DELETE_USER.ERROR,
    };
    const expected = {
      deleteUser: {
        loading: false,
        error: true,
        success: false,
      },
    };
    const received = userManagementReducer(prevState, action);
    expect(received).toEqual(expected);
  });
});
