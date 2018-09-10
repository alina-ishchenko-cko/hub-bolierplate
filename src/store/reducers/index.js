import { combineReducers } from 'redux';
import login from './loginReducer';
import password from './passwordReducer';
import accounts from './accountsReducer';
import dashboard from './dashboardReducer';
import transactions from './transactionsReducer';
import transactionDetails from './transactionDetailsReducer';
import paymentPlan from './paymentPlanReducer';
import customers from './customersReducer';
import customerDetails from './customerDetailsReducer';
import risk from './riskReducer';
import statements, { StatementsState } from './statementsReducer';
import app from './appReducer';
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';

export type State = {
  statements: StatementsState,
};

export default combineReducers({
  currentUser: login,
  password,
  global: accounts,
  app,
  dashboard,
  transactions,
  transactionDetails,
  paymentPlan,
  customers,
  customerDetails,
  risk,
  statements,
  loadingBar,
});
