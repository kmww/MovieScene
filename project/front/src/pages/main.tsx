import { Heading } from '@chakra-ui/react';
import FilmList from '../components/film/FilmList';
import CommonLayout from '../components/CommonLayout';
import { ReactElement } from 'react';
import SignUpForm from '../components/auth/SignUpForm';

const MainPage = (): ReactElement => {
  return (
    <CommonLayout>
      <SignUpForm />
      <Heading size="lg">최고의 장면을 찾아보세요</Heading>
      <FilmList />
    </CommonLayout>
  );
};

export default MainPage;
