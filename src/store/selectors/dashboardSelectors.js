import { createSelector } from 'reselect';

// Return the dashboard state
const getDashboardState = ({ dashboard }) => {
  return dashboard;
};

const getLoginState = ({ login }) => {
  return login;
};

/**
 * Selector for the dashboard props:
 * - indicators
 * - paymentMethods
 * - currencies
 * - refresh
 * @returns {object}
 */
export const getDashboardData = createSelector(
  [getDashboardState],
  dashboard => {
    return {
      indicators: dashboard.indicators,
      paymentMethods: dashboard.paymentMethods,
      currencies: dashboard.currencies,
      refresh: dashboard.refresh
    };
  }
);

/**
 * Selector for userData props
 * @returns {object}
 */
export const getUserData = createSelector([getLoginState], login => {
  return login.userData;
});
