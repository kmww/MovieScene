import { Box, Flex, useColorModeValue } from '@chakra-ui/react';
import { ReactElement } from 'react';
import CommonLayout from '../components/CommonLayout';
import LoginForm from '../components/auth/LoginForm';
import { COLORS } from '../constants';

const Login = (): ReactElement => {
  return (
    <Box bg={useColorModeValue(COLORS.GRAY50, COLORS.GRAY800)}>
      <CommonLayout>
        <Flex align="center" justify="center">
          <LoginForm />
        </Flex>
      </CommonLayout>
    </Box>
  );
};

export default Login;
