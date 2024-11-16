import { Message, MessagesState, ResponseUser } from '@types';
import { proxy } from 'valtio';

const initialState: MessagesState = {
  responseUser: null,
  messages: [],
  badgeCount: 0,
  popupMessage: null
};

const state = proxy(initialState);

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

export function setStatusLocale(locale: string) {
  state.statusLocale = locale;
}

export default state;
