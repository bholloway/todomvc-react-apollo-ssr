import {GraphQLSchema, GraphQLObjectType} from 'graphql';

import * as queries from './queries';

export default new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: () => queries
  })
});
