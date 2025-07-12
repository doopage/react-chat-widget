import './styles.scss';
import { MessageButton } from '@types';
import React, { MouseEvent, MouseEventHandler, useContext, useMemo, useRef } from 'react';
import { setContextMenu, setMessageReaction, setReplyMessage } from '@actions';
import { MenuId } from './context-menu';
import { MenuId as ReactionMenuId } from './context-reaction';
import { MessageContext } from '../../context';
import Img from '@components/Img';

const replyIcon = require('@assets/reply.svg') as string;
const faceSmileIcon = require('@assets/face-smile.svg') as string;

export type Props = {
  reply?: boolean;
  reaction?: boolean;
  children: React.ReactNode;
}

function Toolbar({ reply, reaction, children }: Props) {
  const message = useContext(MessageContext);
  const msgRef = useRef<HTMLDivElement>(null);

  const buttons = useMemo(() => {
    const buttons: MessageButton[] = [];
    if (reaction) {
      buttons.push({
        icon: faceSmileIcon,
        label: 'Cảm xúc',
        onClick: () => msgRef.current && setContextMenu(ReactionMenuId, msgRef.current, { message })
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
    buttons.length > 0 && setContextMenu(MenuId, { x: ev.clientX, y: ev.clientY }, { message });
  }, [message, buttons]);

  return (
    <div className={`rcw-toolbar rcw-toolbar-${message.sender}`}>
      <div className="rcw-toolbar-msg" onContextMenu={displayMenu} ref={msgRef}>
        {children}
        {message.props?.reaction && <span className="icon-reaction" onClick={() => setMessageReaction(message.customId!, null)}>{message.props?.reaction}</span>}
      </div>
      <div className="rcw-toolbar-btns">
        {buttons.map(({ icon, label, onClick }, i) => <button key={i} title={label} onClick={onClick}>
          <Img src={icon} />
        </button>)}
      </div>
    </div>
  );
}

export default Toolbar;
