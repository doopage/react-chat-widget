import { ElementType } from 'react';
import { StateRef } from '@utils/types';

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

export type Message = MessageTypes | Link | CustomCompMessage;

export type ResponseUser = {
  avatar: string | string[];
  name?: string;
  message?: string;
  online?: boolean;
}

export interface MessagesState {
  responseUser: ResponseUser | null;
  messages: Message[];
  badgeCount: number;
  popupMessage: string | string[] | null;
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
}

export interface ResizableProps {
  heightOffset?: number;
  widthOffset?: number;
}
