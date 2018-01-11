import React from 'react';
import {hydrate} from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {App} from './containers/App';
import counterApp from './reducers';

import 'todomvc-app-css/index.css';

const store = createStore(counterApp, window.__REDUX_STATE__);
delete window.__REDUX_STATE__;

hydrate(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
