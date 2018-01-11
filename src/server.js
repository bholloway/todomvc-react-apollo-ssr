import Express from 'express';
import {createElement as e} from 'react';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {renderToString} from 'react-dom/server';

import reducer from './reducers';
import {App} from '../build/static/js/app';

const renderFullPage = (html, state) =>
  renderToString(
    e('html', {lang: 'en'}, [
      e('head', {key: 'head'}, [
        e('meta', {
          key: 'charSet',
          charSet: 'utf-8'
        }),
        e('meta', {
          key: 'viewport',
          name: 'viewport',
          content: 'width=device-width, initial-scale=1'
        }),
        e('link', {key: 'css', rel: 'stylesheet', type: 'text/css', href: '/static/css/main.css'}),
        e('title', {key: 'title'}, 'Redux TodoMVC Example')
      ]),

      e('body', {key: 'body'}, [
        e('div', {
          key: 'content',
          id: 'root',
          className: 'todoapp'
        }),
        e('script', {
          key: 'state',
          dangerouslySetInnerHTML: {
            __html: `window.__REDUX_STATE__ = ${JSON.stringify(state).replace(/</g, '\\\u003c')}`
          }
        }),
        e('script', {
          key: 'js',
          src: '/static/js/main.js'
        })
      ])
    ])
  );

const app = Express();
const port = 3000;

app.use('/static', Express.static('build/static'));

app.get('/', (req, res) => {
  const store = createStore(reducer);

  // TODO populate store with config

  const html = renderToString(e(Provider, {store}, e(App)));

  // TODO wait for async

  const preloadedState = store.getState();

  res.send(renderFullPage(html, preloadedState));
});

app.listen(port);
