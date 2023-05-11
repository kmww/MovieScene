import {
  AspectRatio,
  Box,
  Heading,
  Image,
  LinkBox,
  SimpleGrid,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { useFilmsQuery } from '../../generated/graphql';

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
            <LinkBox as="article" my={6}>
              <Box
                maxW="300px"
                w="full"
                rounded="md"
                px={{ base: 1, md: 3 }}
                pt={3}
                overflow="hidden"
              >
                <Box bg="gray.100" mt={-3} mb={2} pos="relative">
                  <AspectRatio ratio={2 / 3}>
                    <Image src={film.posterImg} />
                  </AspectRatio>
                </Box>
                <Stack>
                  <Heading
                    // eslint-disable-next-line react-hooks/rules-of-hooks
                    color={useColorModeValue('gray.700', 'white')}
                    fontSize="xl"
                    fontFamily="body"
                  >
                    {film.title}
                  </Heading>
                  <Text fontSize="sm" color="gray.500" isTruncated>
                    {film.subtitle ? film.subtitle : <>&nbsp;</>}
                  </Text>
                </Stack>
                <Stack spacing={0} fontSize="sm" mt={2}>
                  <Text
                    as="time"
                    dateTime={film.release}
                    isTruncated
                    color="gray.500"
                  >
                    {`${film.release} · ${film.runningTime}분`}
                  </Text>
                  <Text isTruncated>{film.director.name}</Text>
                </Stack>
              </Box>
            </LinkBox>
          </Box>
        ))}
    </SimpleGrid>
  );
};

export default FilmList;
