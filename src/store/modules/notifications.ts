import { NotificationState } from '@types';
import { proxy } from 'valtio';
import { ShowNotificationOptions } from '@toolpad/core';
import { ReactNode } from 'react';

const initialState: NotificationState = {
  show: null,
  close: null
};

const state = proxy(initialState);

export function setNotification({ show, close }: NotificationState) {
  state.show = show;
  state.close = close;
}

export function closeNotification(key: string) {
  if (!state.close) {
    return;
  }
  return state.close(key);
}

export function showNotification(message: ReactNode, options?: ShowNotificationOptions): string | null {
  if (!state.show) {
    return null;
  }
  return state.show(message, options);
}

export default state;
