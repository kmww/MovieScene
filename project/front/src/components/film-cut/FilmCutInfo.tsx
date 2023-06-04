import {
  AspectRatio,
  Box,
  Button,
  Text,
  Flex,
  HStack,
  Heading,
  Image,
  useColorModeValue,
} from '@chakra-ui/react';
import { ReactElement } from 'react';
import { FaHeart } from 'react-icons/fa';
import {
  CutDocument,
  CutQuery,
  CutQueryVariables,
  useVoteMutation,
} from '../../generated/graphql';

interface FilmCutInfoProps {
  cutImg: string;
  cutId: number;
  isVoted?: boolean;
  voteCount?: number;
}

const FilmCutInfo = ({
  cutImg,
  cutId,
  isVoted = false,
  voteCount = 0,
}: FilmCutInfoProps): ReactElement => {
  const voteButtonColor = useColorModeValue('gray.500', 'gray.400');
  const [vote, { loading: voteLoading }] = useVoteMutation({
    variables: { cutId },
    update: (cache, fetchResult) => {
      const currentCut = cache.readQuery<CutQuery, CutQueryVariables>({
        query: CutDocument,
        variables: { cutId },
      });
      if (currentCut && currentCut.cut) {
        if (fetchResult.data?.vote) {
          cache.writeQuery<CutQuery, CutQueryVariables>({
            query: CutDocument,
            variables: { cutId: currentCut.cut.id },
            data: {
              __typename: 'Query',
              ...currentCut,
              cut: {
                ...currentCut.cut,
                voteCount: isVoted
                  ? currentCut.cut.voteCount - 1
                  : currentCut.cut.voteCount + 1,
                isVoted: !isVoted,
              },
            },
          });
        }
      }
    },
  });

  return (
    <Box>
      <AspectRatio ratio={16 / 9}>
        <Image src={cutImg} objectFit="cover" fallbackSrc="" />
      </AspectRatio>

      <Box py={4}>
        <Flex justify="space-between" alignItems="center">
          <Heading size="sm">{cutId}번째 사진</Heading>
          <HStack spacing={1} alignItems="center">
            <Button
              aria-label="like-this-cut-button"
              color={isVoted ? 'pink.400' : voteButtonColor}
              leftIcon={<FaHeart />}
              isLoading={voteLoading}
              onClick={() => vote()}
            >
              <Text>{voteCount}</Text>
            </Button>
            <Button colorScheme="teal">리뷰 남기기</Button>
          </HStack>
        </Flex>
      </Box>
    </Box>
  );
};

export default FilmCutInfo;
