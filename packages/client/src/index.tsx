import * as React from 'react';
import { ApolloProvider } from 'react-apollo';
import { render } from 'react-dom';
import { createUploadLink } from 'apollo-upload-client';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';

import App from './App';

const GRAPHQL_API_URL = 'http://localhost:8080/graphql';

const link = createUploadLink({ uri: GRAPHQL_API_URL });

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);
