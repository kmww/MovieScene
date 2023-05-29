import { Box, Heading, Stack, Text, useColorModeValue } from '@chakra-ui/react';
import { ReactElement } from 'react';

const LoginForm = (): ReactElement => {
  return (
    <Stack spacing={8} mx="auto" maxW="lg" py={12} px={6}>
      <Stack align="center">
        <Heading fontSize="4xl">지브리 명장면 사이트</Heading>
        <Text fontSize="lg" color="gray.600">
          감상평과 좋아요를 눌러보세요!
        </Text>
      </Stack>
      <Box
        rounded="lg"
        bg={useColorModeValue('white', 'gray.700')}
        boxShadow="lg"
        p={8}
      >
        아이디, 비밀번호 입력 폼
      </Box>
    </Stack>
  );
};

export default LoginForm;
