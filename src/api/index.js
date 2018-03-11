import {GraphQLSchema, GraphQLObjectType} from 'graphql';
import {SchemaLink} from 'apollo-link-schema';

import * as queries from './queries';

export const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: () => queries
  })
});

export const createDirectLink = () => new SchemaLink({schema});
