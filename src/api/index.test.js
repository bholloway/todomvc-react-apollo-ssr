import category from 'tape';
import {execute, makePromise} from 'apollo-link';
import gql from 'graphql-tag';

import {createDirectLink} from './index';

const runAsync = (operation) => makePromise(execute(createDirectLink(), operation));

category('mutation', ({name, test, end}) => {

  test(`${name}/mutation should fail`, (t) => {
    runAsync({
      query: gql`
        mutation {
          todos
        }
      `
    })
    .then(() => t.fail('should throw where mutation is missing'))
    .catch(({message}) => t.pass(message))
    .then(() => t.end());
  });
});

category('queries', ({name, test, end}) => {

  test(`${name}/todos`, (t) => {
    runAsync({
      query: gql`
        query{
          todos {
            id
            text
            completed
          }
        }
      `
    })
    .then(({data}) => {
      console.error(JSON.stringify(data));
      t.ok(true, 'foo');
      return 'something';
    })
    .catch(({message}) => t.fail(message))
    .then(() => t.end())
  });

  end();
});
