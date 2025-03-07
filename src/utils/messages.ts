import { ComponentType } from 'react';

import { CustomCompMessage, Link, LinkParams, MessageTypes as MessageI, QuickButtonTypes } from '@types';

import Message from '../components/Widget/components/Conversation/components/Messages/components/Message';
import Snippet from '../components/Widget/components/Conversation/components/Messages/components/Snippet';
import Custom, { Props as CustomProps } from '../components/Widget/components/Conversation/components/Messages/components/Custom';
import QuickButton from '../components/Widget/components/Conversation/components/QuickButtons/components/QuickButton';

import { MESSAGE_BOX_SCROLL_DURATION, MESSAGE_SENDER, MESSAGES_TYPES } from '@constants';
import { ref } from '@utils/store';

export function createNewMessage(
  text: string,
  sender: string,
  id?: string,
  status?: string,
  props?: any,
  overrides?: Partial<MessageI>
): MessageI {
  return {
    type: MESSAGES_TYPES.TEXT,
    component: ref(Message),
    text,
    props: props ? ref(props) : undefined,
    sender,
    timestamp: new Date(),
    showAvatar: true,
    status,
    customId: id,
    unread: sender === MESSAGE_SENDER.RESPONSE,
    ...overrides
  };
}

export function createLinkSnippet(link: LinkParams, id?: string, props?: any): Link {
  return {
    type: MESSAGES_TYPES.SNIPPET.LINK,
    component: ref(Snippet),
    title: link.title,
    link: link.link,
    target: link.target || '_blank',
    props: props ? ref(props) : undefined,
    sender: MESSAGE_SENDER.RESPONSE,
    timestamp: new Date(),
    showAvatar: true,
    customId: id,
    unread: true
  };
}

export function createComponentMessage(component: ComponentType, props: any, showAvatar: boolean, id?: string): CustomCompMessage {
  return {
    type: MESSAGES_TYPES.CUSTOM_COMPONENT,
    component: ref(component),
    props: props ? ref(props) : undefined,
    sender: MESSAGE_SENDER.RESPONSE,
    timestamp: new Date(),
    showAvatar,
    customId: id,
    unread: true
  };
}

export function createQuickButton(button: { label: string, value: string | number }): QuickButtonTypes {
  return {
    component: ref(QuickButton),
    label: button.label,
    value: button.value
  };
}

// TODO: Clean functions and window use for SSR

function sinEaseOut(timestamp: any, begining: any, change: any, duration: any) {
  return change * ((timestamp = timestamp / duration - 1) * timestamp * timestamp + 1) + begining;
}

/**
 *
 * @param {*} target scroll target
 * @param {*} scrollStart
 * @param {*} scroll scroll distance
 */
function scrollWithSlowMotion(target: any, scrollStart: any, scroll: number) {
  const raf = window?.requestAnimationFrame;
  let start = 0;
  const step = (timestamp) => {
    if (!start) {
      start = timestamp;
    }
    let stepScroll = sinEaseOut(timestamp - start, 0, scroll, MESSAGE_BOX_SCROLL_DURATION);
    let total = scrollStart + stepScroll;
    target.scrollTop = total;
    if (total < scrollStart + scroll) {
      raf(step);
    }
  };
  raf(step);
}

export function scrollToBottom(messagesDiv: HTMLDivElement | null) {
  if (!messagesDiv) return;
  const screenHeight = messagesDiv.clientHeight;
  const scrollTop = messagesDiv.scrollTop;
  const scrollOffset = messagesDiv.scrollHeight - (scrollTop + screenHeight);
  if (scrollOffset) scrollWithSlowMotion(messagesDiv, scrollTop, scrollOffset);
}

export const Component = { Message, Snippet, Custom };
export type CustomComponentProps = CustomProps;
