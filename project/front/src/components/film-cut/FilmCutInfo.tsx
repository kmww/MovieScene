import {
  AspectRatio,
  Box,
  Button,
  Flex,
  HStack,
  Heading,
  Image,
} from '@chakra-ui/react';
import { FaHeart } from 'react-icons/fa';

interface FilmCutInfoProps {
  cutImg: string;
  cutId: number;
}

const FilmCutInfo = ({ cutImg, cutId }: FilmCutInfoProps) => {
  return (
    <Box>
      <AspectRatio ratio={16 / 9}>
        <Image src={cutImg} objectFit="cover" fallbackSrc="" />
      </AspectRatio>

      <Box py={4}>
        <Flex justify="space-between" alignItems="center">
          <Heading size="sm">{cutId}번째 사진</Heading>
          <HStack spacing={1} alignItems="center">
            <Button aria-label="like-this-cut-button" leftIcon={<FaHeart />} />
            <Button colorScheme="teal">리뷰 남기기</Button>
          </HStack>
        </Flex>
      </Box>
    </Box>
  );
};

export default FilmCutInfo;
