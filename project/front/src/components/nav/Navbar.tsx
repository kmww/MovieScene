import {
  Box,
  Flex,
  useColorModeValue,
  Link,
  Stack,
  Button,
} from '@chakra-ui/react';
import { ReactElement, useMemo } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { ColorModeSwitcher } from '../ColorModeSwitcher';
import { useMeQuery } from '../../generated/graphql';
import LoggedInNavbarItem from './LoggedInNavbarItem';
import { COLORS } from '../../constants';

const Navbar = (): ReactElement => {
  const accessToken = localStorage.getItem('access_token');
  const { data } = useMeQuery({ skip: !accessToken });
  const isLoggedIn = useMemo(() => {
    if (accessToken) return data?.me?.id;
    return false;
  }, [accessToken, data?.me?.id]);

  return (
    <Box
      zIndex={10}
      position="fixed"
      w="100%"
      bg={useColorModeValue(COLORS.WHITE, COLORS.GRAY800)}
      borderBottom={1}
      borderStyle="solid"
      borderColor={useColorModeValue(COLORS.GRAY200, COLORS.GRAY700)}
      py={{ base: 2 }}
      px={{ base: 4 }}
    >
      <Flex
        maxW={960}
        color={useColorModeValue(COLORS.GRAY600, COLORS.WHITE)}
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
            color={useColorModeValue(COLORS.GRAY800, COLORS.WHITE)}
          >
            BestCut
          </Link>
        </Flex>

        {isLoggedIn ? (
          <LoggedInNavbarItem />
        ) : (
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
            <Button
              display={{ base: 'none', md: 'inline-flex' }}
              fontSize="sm"
              fontWeight={600}
              colorScheme={COLORS.TEAL}
              as={RouterLink}
              to="/signup"
            >
              시작하기
            </Button>
          </Stack>
        )}
      </Flex>
    </Box>
  );
};

export default Navbar;
