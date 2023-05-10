import * as React from 'react';
import { Box, ChakraProvider, theme, Text } from '@chakra-ui/react';

export const App = () => (
  <ChakraProvider theme={theme}>
    <Box>
      <Text>Ghibli Graphql</Text>
    </Box>
  </ChakraProvider>
);
