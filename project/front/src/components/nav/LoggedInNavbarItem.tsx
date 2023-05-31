import { Avatar, Stack } from '@chakra-ui/react';
import { ReactElement } from 'react';
import { ColorModeSwitcher } from '../ColorModeSwitcher';

const LoggedInNavbarItem = (): ReactElement => {
  return (
    <Stack justify="flex-end" alignItems="center" direction="row" spacing={3}>
      <ColorModeSwitcher />
      <Avatar size="sm" />
    </Stack>
  );
};

export default LoggedInNavbarItem;
