import { Box, Flex, useColorModeValue } from '@chakra-ui/react';
import { ReactElement } from 'react';
import CommonLayout from '../components/CommonLayout';
import SignUpForm from '../components/auth/SignUpForm';
import { COLORS } from '../constants';

const SignUp = (): ReactElement => {
  return (
    <Box bg={useColorModeValue(COLORS.GRAY50, COLORS.GRAY800)}>
      <CommonLayout>
        <Flex align="center" justify="center">
          <SignUpForm />
        </Flex>
      </CommonLayout>
    </Box>
  );
};

export default SignUp;
