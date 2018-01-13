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

```sh
yarn lint
yarn prettier
```

## Further work

* Use GET for GraphQL instead of POST to prove CDN is plausable.
* Mutation for todos from GraphQL.
* Cleanup Webpack config and scripts (i.e. ejected from create-react-app).
