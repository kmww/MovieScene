import { Box, SimpleGrid } from '@chakra-ui/react';
import { useFilmsQuery } from '../../generated/graphql';
import FilmCard from './FilmCard';

const FilmList = () => {
  const { data, loading, error } = useFilmsQuery();

  if (error) return <p>{error.message}</p>;

  return (
    <SimpleGrid columns={[2, null, 3]} spacing={[2, null, 10]}>
      {loading && <p>loading...</p>}
      {!loading &&
        data &&
        data.films.map((film) => (
          <Box key={film.id}>
            <FilmCard film={film} />
          </Box>
        ))}
    </SimpleGrid>
  );
};

export default FilmList;
