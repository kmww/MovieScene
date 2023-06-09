import { ChakraProvider, theme } from '@chakra-ui/react';
import { ApolloProvider } from '@apollo/client';
import { createApolloClient } from './apollo/createApolloClient';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from './pages/main';
import FilmDetail from './pages/filmDetail';
import SignUp from './pages/signUp';
import Login from './pages/login';

const apolloClient = createApolloClient();

export const App = () => (
  <ApolloProvider client={apolloClient}>
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/film/:filmId" element={<FilmDetail />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  </ApolloProvider>
);
