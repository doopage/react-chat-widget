import { CSSProperties, ElementType } from 'react';
import { Position, StateRef } from '@utils/types';
import { CloseNotification, ShowNotification } from '@toolpad/core';

type BaseMessage = {
  type: string;
  component: StateRef<ElementType>;
  sender: string;
  showAvatar: boolean;
  profileAvatar?: string;
  timestamp: Date;
  status?: string;
  unread: boolean;
  customId?: string;
  props?: any;
}

export interface MessageTypes extends BaseMessage {
  text: string;
}

export type QuickButtonTypes = {
  label: string;
  value: string | number;
  component: StateRef<ElementType>;
};

export interface Link extends BaseMessage {
  title: string;
  link: string;
  target: string;
  showPreview?: boolean;
}

export interface LinkParams {
  link: string;
  title: string;
  target?: string;
}

export interface CustomCompMessage extends BaseMessage {
  props: any;
}

export interface BehaviorState {
  showChat: boolean;
  disabledInput: boolean;
  messageLoader: boolean;
}

export interface PopupState {
  showPopup: boolean;
  styles: CSSProperties;
  component: StateRef<ElementType> | null;
}

export interface SuggestionsState {
  showSuggestion: boolean;
  right: Record<string, () => void>;
  bottom: Record<string, () => void>;
}

export interface NotificationState {
  show: ShowNotification | null;
  close: CloseNotification | null;
}

export type Message = MessageTypes | Link | CustomCompMessage;

export type ResponseUser = {
  avatar: string | string[];
  name?: string;
  message?: string;
  online?: boolean;
}

interface ContextMenuState {
  id: string;
  position: StateRef<Position | HTMLElement>;
  data?: any;
}

export interface MessagesState {
  responseUser: ResponseUser | null;
  messages: Message[];
  badgeCount: number;
  popupMessage: string | string[] | null;
  statusLocale?: string;
  voiceLocale?: string;
  replyMessage: Message | null;
  contextMenu: ContextMenuState | null;
}

export interface QuickButtonsState {
  quickButtons: QuickButtonTypes[];
}

export interface ImageState {
  src: string;
  alt?: string;
  width: number;
  height: number;
}

export interface FullscreenPreviewState extends ImageState {
  visible?: boolean;
}

export interface GlobalState {
  messages: MessagesState;
  behavior: BehaviorState;
  quickButtons: QuickButtonsState;
  preview: FullscreenPreviewState;
  popup: PopupState;
  suggestions: SuggestionsState;
  notification: NotificationState;
}

export interface ResizableProps {
  heightOffset?: number;
  widthOffset?: number;
}

export interface MessageButton {
  icon: string;
  label: string;
  onClick?: () => void;
}

export type ContextMenuItem = 'divider' | {
  icon: string;
  label: string;
  onClick?: (data: any) => void;
};
