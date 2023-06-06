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
  useToast,
  useDisclosure,
} from '@chakra-ui/react';
import { ReactElement, useMemo } from 'react';
import { FaHeart } from 'react-icons/fa';
import {
  CutDocument,
  CutQuery,
  CutQueryVariables,
  useMeQuery,
  useVoteMutation,
} from '../../generated/graphql';
import FilmCutReviewRegiModal from './FilmCutReviewRegiModal';

interface FilmCutInfoProps {
  cutImg: string;
  cutId: number;
  isVoted?: boolean;
  voteCount?: number;
  reviews: CutQuery['cutReviews'];
}

const FilmCutInfo = ({
  cutImg,
  cutId,
  isVoted = false,
  voteCount = 0,
  reviews,
}: FilmCutInfoProps): ReactElement => {
  const toast = useToast();
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

  const accessToken = localStorage.getItem('access_token');
  const { data: userData } = useMeQuery({ skip: !accessToken });
  const isLoggedIn = useMemo(() => {
    if (accessToken) return userData?.me?.id;
    return false;
  }, [accessToken, userData?.me?.id]);

  const reviewRegiDialog = useDisclosure();

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
              onClick={() => {
                if (isLoggedIn) vote();
                else {
                  toast({
                    status: 'warning',
                    description: '해당 기능은 로그인 후 이용해주세요.',
                  });
                }
              }}
            >
              <Text>{voteCount}</Text>
            </Button>
            <Button colorScheme="teal" onClick={reviewRegiDialog.onOpen}>
              리뷰 남기기
            </Button>
          </HStack>
        </Flex>
      </Box>

      <FilmCutReviewRegiModal
        cutId={cutId}
        isOpen={reviewRegiDialog.isOpen}
        onClose={reviewRegiDialog.onClose}
      />
    </Box>
  );
};

export default FilmCutInfo;
