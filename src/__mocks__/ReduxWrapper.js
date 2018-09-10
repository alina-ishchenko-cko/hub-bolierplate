import * as React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../store';

export default function(WrappedComponent) {
  return class ReduxWrapper extends React.Component {
    render() {
      return (
        <Provider store={store}>
          <MemoryRouter>
            <WrappedComponent {...this.props} />
          </MemoryRouter>
        </Provider>
      );
    }
  };
}

/*
import * as React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configStore from '../store/storeConfig';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

let middlewares = [ thunk ],
mockStore = configureMockStore(middlewares);

export default function(WrappedComponent, reduxState) {
  return class ReduxWrapper extends React.Component {
    render() {
      return (
        <Provider store={mockStore(reduxState || {})}>
          <MemoryRouter>
            <WrappedComponent {...this.props} />
          </MemoryRouter>
        </Provider>
      );
    }
  };
}
*/
