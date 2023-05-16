import { ReactElement } from 'react';
import CommonLayout from '../components/CommonLayout';
import { useParams } from 'react-router-dom';
import { useFilmQuery } from '../generated/graphql';
import { Box, Spinner, Text } from '@chakra-ui/react';
import FilmInfomation from '../components/film/FilmInfomation';

const ERROR_MESSAGE = '페이지를 표시할 수 없습니다.';

const FilmDetail = (): ReactElement => {
  const { filmId } = useParams();
  const { data, loading, error } = useFilmQuery({
    variables: { filmId: Number(filmId) },
  });

  return (
    <CommonLayout>
      {loading && <Spinner />}
      {error && <Text>{ERROR_MESSAGE}</Text>}

      <Box>
        {filmId && data?.film ? (
          <FilmInfomation film={data.film} />
        ) : (
          <Text>{ERROR_MESSAGE}</Text>
        )}
      </Box>
    </CommonLayout>
  );
};

export default FilmDetail;
