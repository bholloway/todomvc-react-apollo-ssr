import React from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators, compose} from 'redux';
import {connect} from 'react-redux';
import gql from 'graphql-tag';
import {graphql} from 'react-apollo';
import Header from '../components/Header';
import MainSection from '../components/MainSection';
import * as TodoActions from '../actions';

const AppPure = ({todos, addTodo, ...actions}) => (
  <div>
    <Header addTodo={addTodo} />
    <MainSection todos={todos} actions={actions} />
  </div>
);

AppPure.propTypes = {
  todos: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

const enhance = compose(
  graphql(
    gql`
      query {
        todos {
          id
          text
          completed
        }
      }
    `
  ),
  connect(
    ({todos}, {data}) => {
      const {loading, error, todos: moreTodos} = data;
      return {
        todos: loading || error ? todos : todos.concat(moreTodos)
      };
    },
    (dispatch) => bindActionCreators(TodoActions, dispatch)
  )
);

export const App = enhance(AppPure);
