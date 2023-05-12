import { Box, SimpleGrid, Skeleton } from '@chakra-ui/react';
import { useFilmsQuery } from '../../generated/graphql';
import FilmCard from './FilmCard';
import { Waypoint } from 'react-waypoint';

const FilmList = () => {
  const LIMIT = 6;
  const { data, loading, error, fetchMore } = useFilmsQuery({
    variables: { limit: LIMIT, cursor: 1 },
  });
  if (error) return <p>{error.message}</p>;

  return (
    <SimpleGrid columns={[2, null, 3]} spacing={[2, null, 10]}>
      {loading &&
        new Array(6)
          .fill(0)
          .map((_, index) => <Skeleton key={index} height="400px" />)}
      {!loading &&
        data &&
        data.films.films.map((film, index) => (
          <Box key={film.id}>
            {data.films.cursor &&
              index === data.films.films.length - LIMIT / 2 && (
                <Waypoint
                  onEnter={() => {
                    fetchMore({
                      variables: { limit: LIMIT, cursor: data.films.cursor },
                    });
                  }}
                />
              )}
            <FilmCard film={film} />
          </Box>
        ))}
    </SimpleGrid>
  );
};

export default FilmList;
