import { ReactElement } from 'react';
import { useCutsQuery } from '../../generated/graphql';
import { SimpleGrid, Image, Box, Spinner } from '@chakra-ui/react';

interface FilmCutListProps {
  filmId: number;
}

const FilmCutList = ({ filmId }: FilmCutListProps): ReactElement => {
  const { data, loading } = useCutsQuery({ variables: { filmId } });

  if (loading) {
    return (
      <Box textAlign="center" my={10}>
        <Spinner />
      </Box>
    );
  }

  return (
    <SimpleGrid my={4} columns={[1, null, 3]} spacing={[2, null, 8]}>
      {data?.cuts.map(({ src, id }) => (
        <Image src={src} key={id} />
      ))}
    </SimpleGrid>
  );
};

export default FilmCutList;
