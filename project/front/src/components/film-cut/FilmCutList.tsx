import { ReactElement } from 'react';
import { useCutsQuery } from '../../generated/graphql';
import {
  SimpleGrid,
  Image,
  Box,
  Spinner,
  LinkBox,
  LinkOverlay,
} from '@chakra-ui/react';
import LazyLoad from 'react-lazyload';

interface FilmCutListProps {
  filmId: number;
  onClick: (cutId: number) => void;
}

const FilmCutList = ({ filmId, onClick }: FilmCutListProps): ReactElement => {
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
        <LazyLoad height={200} once key={id}>
          <LinkBox as="article">
            <LinkOverlay cursor="pointer" onClick={() => onClick(id)}>
              <Image src={src} />
            </LinkOverlay>
          </LinkBox>
        </LazyLoad>
      ))}
    </SimpleGrid>
  );
};

export default FilmCutList;
