import {
  Avatar,
  Box,
  Button,
  Flex,
  Text,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
} from '@chakra-ui/react';
import { ReactElement, useMemo } from 'react';
import { ColorModeSwitcher } from '../ColorModeSwitcher';
import { useApolloClient } from '@apollo/client';
import {
  useLogoutMutation,
  useMeQuery,
  useUploadProfileImageMutation,
} from '../../generated/graphql';
import Notification from '../notification/Notification';

const LoggedInNavbarItem = (): ReactElement => {
  const client = useApolloClient();
  const [logout, { loading: logoutLoading }] = useLogoutMutation();
  const [upload] = useUploadProfileImageMutation();

  const accessToken = localStorage.getItem('access_token');
  const { data } = useMeQuery({ skip: !accessToken });
  const profileImage = useMemo(() => {
    if (data?.me?.profileImage) {
      return `http://localhost:4000/${data?.me?.profileImage}`;
    }
    return '';
  }, [data]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      await upload({
        variables: { file },
        update: (cache) => {
          cache.evict({ fieldName: 'me' });
        },
      });
    }
  };

  const onLogoutClick = async () => {
    try {
      await logout();
      localStorage.removeItem('access_token');
      await client.resetStore();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Stack justify="flex-end" alignItems="center" direction="row" spacing={3}>
      <ColorModeSwitcher />
      <Notification />
      <Menu>
        <MenuButton as={Button} rounded="fill" variant="link" cursor="pointer">
          <Avatar size="sm" src={profileImage} />
        </MenuButton>
        <MenuList minW={300}>
          <Flex px={4} pt={2} pb={4}>
            <label htmlFor="upload-profile-image">
              <input
                id="upload-profile-image"
                type="file"
                accept="image/*"
                hidden
                onChange={handleImageUpload}
              />
              <Avatar size="md" src={profileImage} mr={4} cursor="pointer" />
            </label>
            <Box>
              <Text fontWeight="bold">{data?.me?.username}</Text>
              <Text>{data?.me?.email}</Text>
            </Box>
          </Flex>
          <MenuItem isDisabled={logoutLoading} onClick={onLogoutClick}>
            로그아웃
          </MenuItem>
        </MenuList>
      </Menu>
    </Stack>
  );
};

export default LoggedInNavbarItem;
