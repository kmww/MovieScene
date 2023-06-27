import { ReactElement, useEffect } from 'react';
import {
  NewNotificationDocument,
  NewNotificationSubscription,
  useNotificationsQuery,
} from '../../generated/graphql';
import {
  Box,
  CircularProgress,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuList,
  Text,
  useToast,
} from '@chakra-ui/react';
import { FaBell } from 'react-icons/fa';
import NotificationItem from './NotificationItem';

const Notification = (): ReactElement => {
  const { data, loading, subscribeToMore } = useNotificationsQuery();

  const toast = useToast({
    position: 'top-right',
    isClosable: true,
    status: 'info',
  });

  useEffect(() => {
    if (subscribeToMore) {
      subscribeToMore<NewNotificationSubscription>({
        document: NewNotificationDocument,
        updateQuery: (prev, { subscriptionData }) => {
          const newNoti = subscriptionData.data.newNotification;
          toast({
            title: `새 알림이 도착했습니다!`,
            description:
              newNoti.text.length > 30
                ? `${newNoti.text.slice(0, 30)}`
                : newNoti.text,
          });
          return {
            __typename: 'Query',
            notifications: [newNoti, ...prev.notifications],
          };
        },
      });
    }
  }, [subscribeToMore]);

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
