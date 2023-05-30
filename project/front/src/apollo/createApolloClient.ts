import {
  ApolloClient,
  NormalizedCacheObject,
  HttpLink,
  from,
} from '@apollo/client';
import { createApolloCache } from './createApolloCache';
import { onError } from '@apollo/client/link/error';

const errorLink = onError(({ graphQLErrors, networkError, operation }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(`[GraphQL error]: -> ${operation.operationName}
    Message: ${message}, Query: ${path}, Location: ${JSON.stringify(
        locations,
      )}`),
    );
  }

  if (networkError) {
    console.log(`[networkError]: -> ${operation.operationName}
    Message: ${networkError.message}`);
  }
});

const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql',
});

export const createApolloClient = (): ApolloClient<NormalizedCacheObject> => {
  return new ApolloClient({
    cache: createApolloCache(),
    link: from([errorLink, httpLink]),
  });
};
