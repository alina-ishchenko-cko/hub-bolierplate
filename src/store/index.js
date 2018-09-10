import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { setupAPI } from 'config';
import reducers from './reducers';
import { handleLogout, cacheStates } from './middlewares';

// Setup API

setupAPI();
// Middlewares
const middlewares = [thunk, handleLogout, cacheStates];

// compose
let composeEnhancers =
  process.env.NODE_ENV !== 'development'
    ? compose
    : window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(...middlewares))
);
export default store;
