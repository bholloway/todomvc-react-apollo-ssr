# todomvc-react-apollo-ssr

> create-react-app todomvc with SSR from first principles in both Redux
> and Apollo

## Usage

```sh
yarn install
yarn build
yarn serve
```

The web server is on `http://localhost:3000`.

The api server (with graphiql) is on `http://localhost:4000`.


## Development

The [main reference](https://github.com/apollographql/apollo-client/blob/master/docs/source/recipes/server-side-rendering.md)
explains what we are trying to do.

```sh
yarn lint
yarn prettier
```

## Further work

* Mutation for todos from GraphQL.
* Try apollo-server and subscriptions.
* Cleanup Webpack config and scripts (i.e. ejected from
create-react-app).
* Cleanup todomvc implementation (i.e. make it feature centric)
