import {
  Box,
  Button,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { ReactElement } from 'react';
import { useSignUpMutation } from '../../generated/graphql';

const SignUpRealForm = () => {
  const [signUp, { loading }] = useSignUpMutation();
  return (
    <Stack as="form" spacing={4}>
      <FormControl>
        <FormLabel>이메일</FormLabel>
        <Input type="email" placeholder="example@example.com" />
      </FormControl>

      <FormControl>
        <FormLabel>아이디</FormLabel>
        <Input type="text" placeholder="example" />
      </FormControl>

      <FormControl>
        <FormLabel>비밀번호</FormLabel>
        <Input type="password" placeholder="8자 이상의 영문,숫자,특문" />
      </FormControl>

      <Divider />
      <Button colorScheme="teal" type="submit" isLoading={loading}>
        계정 생성
      </Button>
    </Stack>
  );
};

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
        <SignUpRealForm />
      </Box>
    </Stack>
  );
};

export default SignUpForm;
