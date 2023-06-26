import { ReactElement } from 'react';
import { useNotificationsQuery } from '../../generated/graphql';
import {
  Box,
  CircularProgress,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuList,
  Text,
} from '@chakra-ui/react';
import { FaBell } from 'react-icons/fa';
import NotificationItem from './NotificationItem';

const Notification = (): ReactElement => {
  const { data, loading } = useNotificationsQuery();
  return (
    <Menu placement="bottom-end" closeOnSelect={false} isLazy>
      <Box position="relative">
        <MenuButton
          as={IconButton}
          size="md"
          fontSize="lg"
          variant="ghost"
          color="current"
          icon={<FaBell />}
          aria-label="open notification popover"
        />
      </Box>
      <MenuList maxH={350} maxW={400} overflowY="auto" w="100%">
        <Text px={4} py={2}>
          알림 목록
        </Text>
        <MenuDivider />

        {loading ? (
          <CircularProgress isIndeterminate />
        ) : (
          <>
            {!data || data.notifications.length === 0 ? (
              <Text px={4} py={2}>
                아직 알림이 없습니다..
              </Text>
            ) : (
              data.notifications.map((noti) => (
                <NotificationItem key={noti.id} notification={noti} />
              ))
            )}
          </>
        )}
      </MenuList>
    </Menu>
  );
};

export default Notification;
