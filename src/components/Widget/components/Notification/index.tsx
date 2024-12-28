import Snackbar from '@mui/material/Snackbar';
import { styled } from '@mui/material/styles';
import { NotificationsProvider, NotificationsProviderSlots } from '@toolpad/core';
import { FC, ReactElement } from 'react';

const notificationsProviderSlots: NotificationsProviderSlots = {
  snackbar: styled(Snackbar)({ position: 'absolute' })
};

export type CProps = {
  children: ReactElement;
}

export const NotificationProvider: FC<CProps> = ({ children }) => {
  return <NotificationsProvider>{children} </NotificationsProvider>;
};
