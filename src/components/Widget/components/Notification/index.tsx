import Snackbar from '@mui/material/Snackbar';
import { styled } from '@mui/material/styles';
import { NotificationsProvider, NotificationsProviderSlots, useNotifications } from '@toolpad/core';
import { FC, ReactElement, useEffect } from 'react';
import { setNotification } from '@actions';

export type CProps = {
  children: ReactElement;
}

export const NotificationContext: FC<CProps> = ({ children }) => {
  const notifications = useNotifications();
  useEffect(() => {
    setNotification(notifications);

    return () => {
      setNotification({ show: null, close: null });
    };
  }, [notifications]);
  return children;
};

const slots: NotificationsProviderSlots = {
  snackbar: styled(Snackbar)({
    position: 'absolute'
  })
};

export const NotificationProvider: FC<CProps> = ({ children }) => {
  return (
    <NotificationsProvider slots={slots} slotProps={{
      snackbar: {
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right'
        }
      }
    }}>
      <NotificationContext>
        {children}
      </NotificationContext>
    </NotificationsProvider>
  );
};
