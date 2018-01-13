import {GraphQLList, GraphQLBoolean, GraphQLObjectType, GraphQLInt, GraphQLString} from 'graphql';

const TodoType = new GraphQLObjectType({
  name: 'todo',
  description: 'single todo',
  fields: () => ({
    id: {
      type: GraphQLInt,
      resolve: () => -1
    },
    text: {
      type: GraphQLString,
      resolve: () => 'Use GraphQL and Apollo'
    },
    completed: {
      type: GraphQLBoolean,
      resolve: () => false
    }
  })
});

export const todos = {
  name: 'todo list',
  description: 'list of todos from graphql',
  type: new GraphQLList(TodoType),
  resolve: () => [{}]
};
