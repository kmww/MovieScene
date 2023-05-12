import { Box, ChakraProvider, theme, Text } from '@chakra-ui/react';
import { ApolloProvider } from '@apollo/client';
import FilmList from './components/film/FilmList';
import { createApolloClient } from './apollo/createApolloClient';

const apolloClient = createApolloClient();

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
