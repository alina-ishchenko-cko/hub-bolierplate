// @flow
// Set the localStorage keys namespace
const storageKeys = {
  loginStatus: 'cko.login',
  account: 'cko.account',
  dateRange: 'cko.account.dateRange',
  user: 'cko.user',
  userSession: 'cko.user.session',
};

// Local data api - stores and gets data
const localDataAPI = {
  storage: window.localStorage,
  /**
   * Gets the specified item
   * @param {string} key - item key
   * @returns {object}
   */
  getData(key: string): Object {
    const localData = this.storage.getItem(key);
    return JSON.parse(localData || '{}');
  },

  /**
   * Store the specified item
   * @param {string} key
   * @param {object} data
   */
  saveData(key: string, data: Object) {
    this.storage.setItem(key, JSON.stringify(data));
  },
};

/* -------------------------------------------------------------- EXPORTS */
/**
 * Login Session
 */
export const userSession = {
  get() {
    return localDataAPI.getData(storageKeys.userSession);
  },
  save() {
    localDataAPI.saveData(storageKeys.userSession, {
      lastDate: new Date().toISOString(),
    });
  },
};

/**
 * User
 */
export const user = {
  get() {
    return localDataAPI.getData(storageKeys.user);
  },
  save(data: Object) {
    localDataAPI.saveData(storageKeys.user, data);
  },
};

/**
 * Accounts
 */
export const accounts = {
  get() {
    return localDataAPI.getData(storageKeys.account);
  },
  save(data: Object) {
    localDataAPI.saveData(storageKeys.account, data);
  },
};

/**
 * Date
 */
export const dateRange = {
  get() {
    return localDataAPI.getData(storageKeys.dateRange);
  },
  save(data: Object) {
    localDataAPI.saveData(storageKeys.dateRange, data);
  },
};

/**
 * Get the user token
 * @returns {string}
 */
export function getToken(): string {
  const userData = user.get();
  return userData.data ? userData.data.token : '';
}

export const login = {
  get() {
    return localDataAPI.getData(storageKeys.loginStatus);
  },
  passed(data: Object) {
    localDataAPI.saveData(storageKeys.loginStatus, { data: true });
  },
};

/**
 * Checks if user is authenticated
 * @returns {boolean}
 */
export function isAuthenticated(): boolean {
  const currentUser = user.get().data;
  const loginStatus = login.get().data;
  return (
    !!(currentUser && currentUser.email !== '' && currentUser.token !== '') ||
    !!loginStatus
  );
}

/**
 * Clears all the data in the localStorage
 */
export function clearData() {
  localDataAPI.storage.clear();
}
