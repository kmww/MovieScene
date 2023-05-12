import * as React from 'react';
import { Box, ChakraProvider, theme, Text } from '@chakra-ui/react';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import FilmList from './components/film/FilmList';
import { PaginatedFilms } from './generated/graphql';

const apolloClient = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          films: {
            keyArgs: false,
            merge: (
              existing: PaginatedFilms | undefined,
              incoming: PaginatedFilms,
            ): PaginatedFilms => {
              return {
                cursor: incoming.cursor,
                films: existing
                  ? [...existing.films, ...incoming.films]
                  : incoming.films,
              };
            },
          },
        },
      },
    },
  }),
});

export const App = () => (
  <ApolloProvider client={apolloClient}>
    <ChakraProvider theme={theme}>
      <Box>
        <Text>Ghibli Graphql</Text>
        <FilmList />
      </Box>
    </ChakraProvider>
  </ApolloProvider>
);
