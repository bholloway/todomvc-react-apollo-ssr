import Express from 'express';
import expressGraphQL from 'express-graphql';
import cors from 'cors';
import morgan from 'morgan';
import {SchemaLink} from 'apollo-link-schema';

import schema from './api';

export const API_PORT = 4000;

export const createDirectLink = () => new SchemaLink({schema});

const gql = expressGraphQL((_req, _res, {query, variables}) => {
  if (query) {
    console.log(`query: ${query.replace(/(^\s*|\s*$)/g, '')}`);
  }
  if (variables) {
    console.log(`variables: ${JSON.stringify(variables)}`);
  }

  const startTime = process.hrtime();
  return {
    schema,
    graphiql: true,
    extensions: () => {
      const [seconds, nanoseconds] = process.hrtime(startTime);
      const time = seconds + 1e-9 * nanoseconds;
      return {time};
    }
  };
});

const api = Express();

api.use(morgan('dev'));

api.options('/', cors());
api.use('/', cors(), gql);

api.listen(API_PORT);
