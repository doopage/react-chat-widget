import './styles.scss';
import { MessageButton, MessageTypes } from '@types';
import { useContextMenu } from 'react-contexify';
import React, { useMemo } from 'react';
import { MenuId } from './context-menu';
import { setReplyMessage } from '@actions';

const replyIcon = require('@assets/reply.svg') as string;

export type Props = {
  message: MessageTypes;
  reply?: boolean;
  children: React.ReactNode;
}

function Toolbar({ message, reply, children }: Props) {
  const { show } = useContextMenu({ id: MenuId });

  const buttons = useMemo(() => {
    const buttons: MessageButton[] = [];
    if (reply) {
      buttons.push({
        icon: replyIcon,
        label: 'Trả lời',
        onClick: () => setReplyMessage(message)
      });
    }
    return buttons;
  }, [reply, message]);

  function displayMenu(event) {
    show({ event });
  }

  return (
    <div className={`rcw-toolbar rcw-toolbar-${message.sender}`}>
      <div className="rcw-toolbar-msg" onContextMenu={displayMenu}>{children}</div>
      <div className="rcw-toolbar-btns">
        {buttons.map(({ icon, label, onClick }, i) => <button key={i} title={label} onClick={onClick}>
          <img src={icon} />
        </button>)}
      </div>
    </div>
  );
}

export default Toolbar;
