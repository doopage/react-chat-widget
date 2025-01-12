import { useSelector } from '@selectors';
import EmojiPicker, { EmojiStyle } from 'emoji-picker-react';

export const MenuId = 'message-reaction';

export function ContextReaction() {
  const contextMenu = useSelector(({ messages }) => messages?.contextMenu);

  if (!contextMenu || contextMenu.id != MenuId) {
    return;
  }

  return <div style={{ width: 'fit-content' }}>
    <EmojiPicker
      onReactionClick={console.log}
      emojiStyle={EmojiStyle.NATIVE}
      reactionsDefaultOpen
      allowExpandReactions={false}
    />
  </div>;
}

export default ContextReaction;
