import { BackgroundProps, Box } from '@chakra-ui/react';
import { ReactNode, ReactElement } from 'react';
import Navbar from './nav/Navbar';

interface CommonLayoutProps {
  children: ReactNode;
  bg?: BackgroundProps['bg'];
}

const CommonLayout = ({ children, bg }: CommonLayoutProps): ReactElement => {
  return (
    <div>
      <Navbar />
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
