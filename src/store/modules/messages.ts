import { LinkParams, Message, MessagesState, MessageTypes, ResponseUser } from '@types';
import { createComponentMessage, createLinkSnippet, createNewMessage } from '@utils/messages';
import { MESSAGE_SENDER } from '@constants';
import { proxy } from 'valtio';
import { ComponentType } from 'react';

const initialState: MessagesState = {
  responseUser: null,
  messages: [],
  badgeCount: 0,
  popupMessage: null
};

const state = proxy(initialState);

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

export function dropMessages() {
  state.messages = [];
}

export function hideAvatar(index: number) {
  state.messages[index].showAvatar = false;
}

export function deleteMessages(count: number, id?: string) {
  state.messages = id
    ? state.messages.filter((_, index) => {
      const targetMsg = state.messages.findIndex(tMsg => tMsg.customId === id);
      return index < targetMsg - count + 1 || index > targetMsg;
    })
    : state.messages.slice(0, state.messages.length - count);
}

export function setBadgeCount(count: number) {
  state.badgeCount = count;
}

export function markAllMessagesRead() {
  state.messages = state.messages.map(message => ({ ...message, unread: false }));
  state.badgeCount = 0;
}

export function setMessages(messages: Message[]) {
  state.messages = messages;
  state.badgeCount = 0;
}

function findMessageByCustomId(id: string): Message | null {
  return state.messages.find(item => item.customId == id) ?? null;
}

export function setMessageStatus(id: string, status: string, props: any = null): boolean {
  const m = findMessageByCustomId(id);
  if (m) {
    m.status = status;
    if (props) {
      Object.assign(m, props);
    }
    return true;
  }
  return false;
}

export function setResponseUser(user: ResponseUser) {
  state.responseUser = user;
}

export function setPopupMessage(message: string | string[] | null) {
  state.popupMessage = message;
}

export default state;
