import React from 'react';
import {hydrate} from 'react-dom';
import {createStore} from 'redux';
import {ApolloProvider} from 'react-apollo';
import {Provider as ReduxProvider} from 'react-redux';
import {ApolloClient} from 'apollo-client/index';
import {InMemoryCache} from 'apollo-cache-inmemory/lib/index';

import {App} from './containers/App';
import counterApp from './reducers';
import {createHttpLink} from './api/link';

import 'todomvc-app-css/index.css';

// redux
const store = createStore(counterApp, window.__REDUX_STATE__);
delete window.__REDUX_STATE__;

// apollo
const client = new ApolloClient({
  cache: new InMemoryCache().restore(window.__APOLLO_STATE__),
  link: createHttpLink({uri: window.__APOLLO_URI__, fetch}),
  ssrForceFetchDelay: 100
});
delete window.__APOLLO_URI__;
delete window.__APOLLO_STATE__;

// react
// client App is wrapped differently to the server App
hydrate(
  <ApolloProvider client={client}>
    <ReduxProvider store={store}>
      <App />
    </ReduxProvider>
  </ApolloProvider>,
  document.getElementById('root')
);
