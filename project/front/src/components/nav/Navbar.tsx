import {
  Box,
  Flex,
  useColorModeValue,
  Link,
  Stack,
  Button,
} from '@chakra-ui/react';
import { ReactElement } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { ColorModeSwitcher } from '../ColorModeSwitcher';

const Navbar = (): ReactElement => {
  return (
    <Box
      zIndex={10}
      position="fixed"
      w="100%"
      bg={useColorModeValue('white', 'gray.800')}
      borderBottom={1}
      borderStyle="solid"
      borderColor={useColorModeValue('gary.200', 'gray.700')}
      py={{ base: 2 }}
      px={{ base: 4 }}
    >
      <Flex
        maxW={960}
        color={useColorModeValue('gray.600', 'white')}
        minH="60px"
        align="center"
        m="auto"
      >
        <Flex flex={{ base: 1, md: 'auto' }}>
          <Link
            as={RouterLink}
            to="/"
            fontFamily="heading"
            fontWeight="bold"
            color={useColorModeValue('gary.800', 'white')}
          >
            BestCut
          </Link>
        </Flex>

        <Stack justify="flex-end" direction="row" spacing={6}>
          <ColorModeSwitcher />
          <Button
            fontSize="sm"
            fontWeight={400}
            variant="link"
            as={RouterLink}
            to="/login"
          >
            로그인
          </Button>
        </Stack>
      </Flex>
    </Box>
  );
};

export default Navbar;
