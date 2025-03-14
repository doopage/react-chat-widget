import { useSelector } from '@selectors';
import EmojiPicker, { EmojiClickData, EmojiStyle } from 'emoji-picker-react';
import Overlay from '@components/Overlay';
import { setContextMenu } from '@actions';
import { Position } from '@utils/types';

export const MenuId = 'message-reaction';

const width = 300;

export type CProps = {
  onReaction?: (emoji: string | null) => void;
}

export function ContextReaction({ onReaction }: CProps) {
  const contextMenu = useSelector(({ messages }) => messages?.contextMenu);

  const onClick = (ev: EmojiClickData) => {
    onReaction?.(ev.emoji);
    setContextMenu(null);
  };

  if (!contextMenu || contextMenu.id != MenuId) {
    return;
  }

  let position: Position;
  if (contextMenu.position instanceof HTMLElement) {
    const el = contextMenu.position;
    const r = el.getBoundingClientRect();
    position = {
      x: el.offsetLeft + (el.offsetWidth / 2) - (width / 2),
      y: r.top - 64 - 40
    };
  } else {
    position = contextMenu.position;
  }

  if (position.x < 0) {
    position.x = 10;
  }
  const m = document.querySelector('#rcw-messages');
  if (m && (position.x + width) > m.clientWidth) {
    position.x = m.clientWidth - width;
  }

  return <div className="context-reaction">
    <Overlay opacity={0.05} onClick={() => setContextMenu(null)} />
    <div className="context-reaction-body" style={{ left: position.x, top: position.y }}>
      <EmojiPicker
        onReactionClick={onClick}
        emojiStyle={EmojiStyle.NATIVE}
        reactionsDefaultOpen
        allowExpandReactions={false}
      />
    </div>
  </div>;
}

export default ContextReaction;
