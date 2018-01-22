import React from 'react';
import Express from 'express';
import {createStore} from 'redux';
import {Provider as ReduxProvider} from 'react-redux';
import {renderToString, renderToStaticMarkup} from 'react-dom/server';
import {ApolloProvider, getDataFromTree} from 'react-apollo';
import {ApolloClient} from 'apollo-client';
import {InMemoryCache} from 'apollo-cache-inmemory';
import fetch from 'node-fetch';
import morgan from 'morgan';

import reducer from './reducers';
import {API_PORT, createDirectLink} from './apiServer';
import {App} from '../build/static/js/app';
import {createHttpLink} from './api/link';

export const WEB_PORT = 3000;
export const DIRECT_LINK = false;

const web = Express();

web.use(morgan('dev'));

web.use('/static', Express.static('build/static'));

web.get('/', (req, res) => {
  // redux
  const store = createStore(reducer);

  // apollo
  const client = new ApolloClient({
    ssrMode: true,
    cache: new InMemoryCache(),
    link: DIRECT_LINK
      ? createDirectLink()
      : createHttpLink({uri: `http://localhost:${API_PORT}/`, fetch})
  });

  // react
  // server App is wrapped differently to the client App
  const ProvidedApp = (
    <ApolloProvider client={client}>
      <ReduxProvider store={store}>
        <App />
      </ReduxProvider>
    </ApolloProvider>
  );

  // analyse data requirements and wait for data to fetch
  getDataFromTree(ProvidedApp).then(() => {
    const content = renderToString(ProvidedApp);
    const apolloUri = `http://${req.hostname}:${API_PORT}/`;
    const apolloState = client.extract();
    const reduxState = store.getState();

    const stringify = (v) => JSON.stringify(v).replace(/</g, '\\\u003c');

    const html = renderToStaticMarkup(
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="stylesheet" type="text/css" href="/static/css/main.css" />
          <title>Redux TodoMVC Example</title>
        </head>

        <body>
          <div id="root" className="todoapp" dangerouslySetInnerHTML={{__html: content}} />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.__REDUX_STATE__ = ${stringify(reduxState)};
              `
            }}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.__APOLLO_URI__ = ${stringify(apolloUri)};
                window.__APOLLO_STATE__ = ${stringify(apolloState)};
              `
            }}
          />
          <script src="/static/js/main.js" />
        </body>
      </html>
    );

    res.send(html);
  });
});

web.listen(WEB_PORT);
