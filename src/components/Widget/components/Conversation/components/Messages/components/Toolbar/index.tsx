import './styles.scss';
import { MessageButton, MessageTypes } from '@types';
import React, { MouseEvent, MouseEventHandler, useMemo, useRef } from 'react';
import { setContextMenu, setReplyMessage } from '@actions';
import { MenuId } from './context-menu';
import { MenuId as ReactionMenuId } from './context-reaction';

const replyIcon = require('@assets/reply.svg') as string;
const faceSmileIcon = require('@assets/face-smile.svg') as string;

export type Props = {
  message: MessageTypes;
  reply?: boolean;
  reaction?: boolean;
  children: React.ReactNode;
}

function Toolbar({ message, reply, reaction, children }: Props) {
  const msgRef = useRef<HTMLDivElement>(null);

  const buttons = useMemo(() => {
    const buttons: MessageButton[] = [];
    if (reaction) {
      buttons.push({
        icon: faceSmileIcon,
        label: 'Cảm xúc',
        onClick: () => msgRef.current && setContextMenu(ReactionMenuId, msgRef.current)
      });
    }
    if (reply) {
      buttons.push({
        icon: replyIcon,
        label: 'Trả lời',
        onClick: () => setReplyMessage(message)
      });
    }
    return buttons;
  }, [reply, reaction, message]);

  const displayMenu = useMemo((): MouseEventHandler => (ev: MouseEvent) => {
    ev.preventDefault();
    setContextMenu(MenuId, { x: ev.clientX, y: ev.clientY }, { message });
  }, [message]);

  return (
    <div className={`rcw-toolbar rcw-toolbar-${message.sender}`}>
      <div className="rcw-toolbar-msg" onContextMenu={displayMenu} ref={msgRef}>{children}</div>
      <div className="rcw-toolbar-btns">
        {buttons.map(({ icon, label, onClick }, i) => <button key={i} title={label} onClick={onClick}>
          <img src={icon} />
        </button>)}
      </div>
    </div>
  );
}

export default Toolbar;
