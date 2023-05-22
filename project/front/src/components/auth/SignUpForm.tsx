import { Box, Heading, Stack, Text, useColorModeValue } from '@chakra-ui/react';
import { ReactElement } from 'react';

const SignUpForm = (): ReactElement => {
  return (
    <Stack spacing={8} mx="auto" maxW="lg" py={12} px={6}>
      <Stack align="center">
        <Heading fontSize="4xl">계정 생성</Heading>
        <Text fontSize="lg" color="gray.600">
          환영합니다!
        </Text>
      </Stack>

      <Box
        rounded="lg"
        bg={useColorModeValue('white', 'gray.700')}
        boxShadow="lg"
        p={8}
      >
        입력창 위치
      </Box>
    </Stack>
  );
};

export default SignUpForm;
