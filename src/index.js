import * as React from 'react';
import { render } from 'react-dom';
import consoleWarning from './utils/consoleWarning';

// Redux
import { Provider } from 'react-redux';
import store from './store';

// App
import App from './App';

//const store = configStore();
const rootNode = document.getElementById('root');

render(
  <Provider store={store}>
    <App store={store} />
  </Provider>,
  rootNode
);

if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default;
    render(
      <Provider store={store}>
        <NextApp />
      </Provider>,
      rootNode
    );
  });
}

// Show Warning message when user opens console in production app
if (process.env.NODE_ENV === 'production') {
  consoleWarning();
}
