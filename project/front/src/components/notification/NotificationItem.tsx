import { ReactElement } from 'react';
import { Notification as INotification } from '../../generated/graphql';
import { Box, MenuItem, Text } from '@chakra-ui/react';
import { COLORS } from '../../constants';

interface NotificationItemProps {
  notification: INotification;
}

const NotificationItem = ({
  notification,
}: NotificationItemProps): ReactElement => {
  return (
    <MenuItem cursor="pointer">
      <Box position="relative" w="100%">
        <Text>{notification.text}</Text>
        <Text fontSize="xs" color={COLORS.GRAY500}>
          {new Date(parseInt(notification.createdAt, 10)).toLocaleDateString()}
        </Text>
      </Box>
    </MenuItem>
  );
};

export default NotificationItem;
