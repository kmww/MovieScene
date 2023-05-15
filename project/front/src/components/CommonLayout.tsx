import { BackgroundProps, Box, Flex } from '@chakra-ui/react';
import { ReactNode, ReactElement } from 'react';

interface CommonLayoutProps {
  children: ReactNode;
  bg?: BackgroundProps['bg'];
}

const CommonLayout = ({ children, bg }: CommonLayoutProps): ReactElement => {
  return (
    <div>
      <Flex maxW="960px" justify="center">
        navigation
      </Flex>
      <Box
        px={{ base: 4 }}
        pt={24}
        mx="auto"
        maxW="960px"
        minH="100vh"
        w="100%"
        bg={bg}
      >
        {children}
      </Box>
    </div>
  );
};

export default CommonLayout;
