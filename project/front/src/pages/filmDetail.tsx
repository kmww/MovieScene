import { ReactElement, useState } from 'react';
import CommonLayout from '../components/CommonLayout';
import { useParams } from 'react-router-dom';
import { useFilmQuery } from '../generated/graphql';
import { Box, Spinner, Text, useDisclosure } from '@chakra-ui/react';
import FilmInfo from '../components/film/FilmInfo';
import FilmCutList from '../components/film-cut/FilmCutList';
import FilmCutModal from '../components/film-cut/FilmCutModal';

const ERROR_MESSAGE = '페이지를 표시할 수 없습니다.';

const FilmDetail = (): ReactElement => {
  const { filmId } = useParams();
  const { data, loading, error } = useFilmQuery({
    variables: { filmId: Number(filmId) },
  });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedCutId, setSelectedCutId] = useState<number>();
  const handleCutSelect = (cutId: number) => {
    setSelectedCutId(cutId);
    onOpen();
  };

  return (
    <CommonLayout>
      {loading && <Spinner />}
      {error && <Text>{ERROR_MESSAGE}</Text>}
      {filmId && data?.film ? (
        <>
          <FilmInfo film={data.film} />
          <Box mt={12}>
            <FilmCutList filmId={data.film.id} onClick={handleCutSelect} />
          </Box>
        </>
      ) : (
        <Text>{ERROR_MESSAGE}</Text>
      )}

      {!selectedCutId ? null : (
        <FilmCutModal open={isOpen} onClose={onClose} cutId={selectedCutId} />
      )}
    </CommonLayout>
  );
};

export default FilmDetail;
