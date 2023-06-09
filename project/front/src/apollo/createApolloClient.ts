import {
  NormalizedCacheObject,
  from,
  fromPromise,
  ApolloClient,
  split,
} from '@apollo/client';
import { createApolloCache } from './createApolloCache';
import { onError } from '@apollo/client/link/error';
import { setContext } from '@apollo/client/link/context';
import { refreshAccessToken } from './auth';
import { createUploadLink } from 'apollo-upload-client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';

let apolloClient: ApolloClient<NormalizedCacheObject>;

const errorLink = onError(
  ({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
      if (
        graphQLErrors.find((error) => error.message === 'access token expired')
      ) {
        return fromPromise(refreshAccessToken(apolloClient, operation))
          .filter((result) => !!result)
          .flatMap(() => forward(operation));
      }

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
  },
);

const httpUploadLink = createUploadLink({
  uri: 'http://localhost:4000/graphql',
  credentials: 'include',
});

const authLink = setContext((request, prevContext) => {
  const accessToken = localStorage.getItem('access_token');
  return {
    headers: {
      ...prevContext.headers,
      Authorization: accessToken ? `Bearer ${accessToken}` : '',
    },
  };
});

const wsLink = new WebSocketLink({
  uri: 'ws://localhost:4000/graphql',
  options: {
    reconnect: true,
    connectionParams: () => {
      const accessToken = localStorage.getItem('access_token');
      return {
        Authorization: accessToken ? `Bearer ${accessToken}` : '',
      };
    },
  },
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  from([wsLink]),
  from([authLink, errorLink, httpUploadLink as any]),
);

export const createApolloClient = (): ApolloClient<NormalizedCacheObject> => {
  apolloClient = new ApolloClient({
    cache: createApolloCache(),
    uri: 'http://localhost:4000/graphql',
    link: splitLink,
  });

  return apolloClient;
};
