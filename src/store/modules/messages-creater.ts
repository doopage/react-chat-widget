import { createComponentMessage, createLinkSnippet, createNewMessage } from '@utils/messages';
import { ComponentType } from 'react';
import { MESSAGE_SENDER } from '@constants';
import { LinkParams, MessageTypes } from '@types';

import state from './messages';

type MessageOptions = {
  id?: string;
  status?: string;
  props?: any;
}

export function addUserMessage(text: string, { id, status, props }: MessageOptions = {}, overrides?: Partial<MessageTypes>) {
  state.messages = [...state.messages, createNewMessage(text, MESSAGE_SENDER.CLIENT, id, status, props, overrides)];
}

export function addResponseMessage(text: string, { id, status, props }: MessageOptions = {}, overrides?: Partial<MessageTypes>) {
  state.messages = [...state.messages, createNewMessage(text, MESSAGE_SENDER.RESPONSE, id, status, props, overrides)];
  state.badgeCount += 1;
}

export function addSystemMessage(text: string, { id, status, props }: MessageOptions = {}, overrides?: Partial<MessageTypes>) {
  state.messages = [...state.messages, createNewMessage(text, MESSAGE_SENDER.SYSTEM, id, status, props, overrides)];
}

export function addLinkSnippet(link: LinkParams, id?: string, props?: any) {
  state.messages = [...state.messages, createLinkSnippet(link, id, props)];
}

export function renderCustomComponent(component: ComponentType, props: any, showAvatar: boolean, id?: string) {
  state.messages = [...state.messages, createComponentMessage(component, props, showAvatar, id)];
}
