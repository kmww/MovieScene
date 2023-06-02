import {
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
} from '@chakra-ui/react';
import { ReactElement } from 'react';
import { ColorModeSwitcher } from '../ColorModeSwitcher';
import { useApolloClient } from '@apollo/client';
import { useLogoutMutation } from '../../generated/graphql';

const LoggedInNavbarItem = (): ReactElement => {
  const client = useApolloClient();
  const [logout, { loading: logoutLoading }] = useLogoutMutation();

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

      <Menu>
        <MenuButton as={Button} rounded="fill" variant="link" cursor="pointer">
          <Avatar size="sm" />
        </MenuButton>
        <MenuList>
          <MenuItem isDisabled={logoutLoading} onClick={onLogoutClick}>
            로그아웃
          </MenuItem>
        </MenuList>
      </Menu>
    </Stack>
  );
};

export default LoggedInNavbarItem;
