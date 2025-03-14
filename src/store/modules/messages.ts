import { Message, MessagesState, ResponseUser } from '@types';
import { proxy, ref } from 'valtio';
import { Position } from '@utils/types';

const initialState: MessagesState = {
  responseUser: null,
  messages: [],
  badgeCount: 0,
  popupMessage: null,
  replyMessage: null,
  contextMenu: null
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

export function setMessageReaction(id: string, reaction: string | null): boolean {
  const m = findMessageByCustomId(id);
  if (m) {
    if (typeof m.props === 'undefined') {
      m.props = {};
    }
    m.props.reaction = reaction;
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

export function setVoiceLocale(locale: string) {
  state.voiceLocale = locale;
}

export function setReplyMessage(message: Message | null) {
  state.replyMessage = message;
}

export function setContextMenu(id: string | null, pos?: Position | HTMLElement, data?: any) {
  const position = ref(pos ?? { x: 0, y: 0 });
  state.contextMenu = id ? { id, position, data } : null;
}

export default state;
