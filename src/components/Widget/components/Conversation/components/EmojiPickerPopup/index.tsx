import './style.scss';
import React from 'react';
import EmojiPicker, { EmojiStyle } from 'emoji-picker-react';

type CProps = {
  onEmojiClick?: (event: any) => void;
  height: number;
  bottom: number;
}

function FilePicker({ onEmojiClick, height, bottom }: CProps) {
  return (
    <div className="rcw-emoji-picker" style={{ bottom: `${bottom}px` }}>
      <EmojiPicker
        onEmojiClick={onEmojiClick}
        emojiStyle={EmojiStyle.NATIVE}
        searchDisabled
        width="100%"
        height={height}
        previewConfig={{
          showPreview: false
        }}
      />
    </div>
  );
}

export default FilePicker;
