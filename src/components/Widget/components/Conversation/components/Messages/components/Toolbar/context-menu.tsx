import Menus from '@components/Menus';
import { useSelector } from '@selectors';
import { setContextMenu, setReplyMessage } from '@actions';
import React, { useMemo } from 'react';
import { ContextMenuItem } from '@types';

const replyIcon = require('@assets/reply.svg') as string;
const faceSmileIcon = require('@assets/face-smile.svg') as string;

export const MenuId = 'message-context';

export type Props = {
  reply?: boolean;
  reaction?: boolean;
}

export function ContextMenu({ reply, reaction }: Props) {
  const contextMenu = useSelector(({ messages }) => messages?.contextMenu);

  const items = useMemo(() => {
    const items: ContextMenuItem[] = [];
    if (reply) {
      items.push({
        icon: replyIcon,
        label: 'Trả lời',
        onClick: ({ message }) => setReplyMessage(message)
      });
    }
    if (reaction) {
      items.push({
        icon: faceSmileIcon,
        label: 'Cảm xúc'
      });
    }
    return items;
  }, [reply, reaction]);

  if (!contextMenu || contextMenu.id != MenuId) {
    return;
  }

  return <Menus items={items} position={contextMenu.position} data={contextMenu.data} onClose={() => setContextMenu(null)} />;
}

export default ContextMenu;
