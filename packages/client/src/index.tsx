import {
  InMemoryCache,
  createHttpLink,
  ApolloClient,
  ApolloProvider,
} from '@apollo/client';
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { RootView } from './views/Root';

const cache = new InMemoryCache();
const link = createHttpLink({
  uri: location.origin + '/api/graphql',
});

const client = new ApolloClient({
  cache: cache,
  link: link,

  queryDeduplication: false,
  defaultOptions: {
    query: {
      fetchPolicy: 'network-only',
      errorPolicy: 'all',
    },
  },
});

const main = document.querySelector('main');

render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <RootView />
    </BrowserRouter>
  </ApolloProvider>,
  main,
);
