import {
  NormalizedCacheObject,
  HttpLink,
  from,
  fromPromise,
  ApolloClient,
} from '@apollo/client';
import { createApolloCache } from './createApolloCache';
import { onError } from '@apollo/client/link/error';
import { setContext } from '@apollo/client/link/context';
import { refreshAccessToken } from './auth';
import { createUploadLink } from 'apollo-upload-client';

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

export const createApolloClient = (): ApolloClient<NormalizedCacheObject> => {
  apolloClient = new ApolloClient({
    cache: createApolloCache(),
    uri: 'http://localhost:4000/graphql',
    link: from([authLink, errorLink, httpUploadLink as any]),
  });

  return apolloClient;
};
