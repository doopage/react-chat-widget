import { Ref, useEffect, useImperativeHandle, useRef, useState } from 'react';
import cn from 'classnames';

import { getCaretIndex, getSelection, insertNodeAtCaret, isFirefox, updateCaret } from '@utils/content-editable';
import './style.scss';
import { useSelector } from '@selectors';

const send = require('@assets/send_button.svg') as string;
const sendActive = require('@assets/send_button-active.svg') as string;
const emoji = require('@assets/icon-smiley.svg') as string;
const file = require('@assets/icon-file.svg') as string;
const brRegex = /<br>/g;

export interface ISenderRef {
  onSelectEmoji: (event: any) => void;
}

export type CProps = {
  senderRef?: Ref<ISenderRef>,
  placeholder?: string;
  disabledInput?: boolean;
  allowSend: boolean;
  autofocus?: boolean;
  sendMessage: (event: string) => void;
  buttonAlt?: string;
  onPressEmoji: (() => void) | null;
  onPressFile: (() => void) | null;
  onTextInputChange?: (event: any) => void;
}

function Sender({
                  senderRef,
                  sendMessage,
                  placeholder = 'Type a message...',
                  disabledInput = false,
                  autofocus = true,
                  onTextInputChange,
                  buttonAlt = 'Send',
                  onPressEmoji,
                  onPressFile,
                  allowSend = false
                }: CProps) {
  const showChat = useSelector(({ behavior }) => behavior.showChat);
  const inputRef = useRef<HTMLDivElement>(null!);
  const refContainer = useRef<HTMLDivElement>(null);
  const [enter, setEnter] = useState(true);
  const [firefox, setFirefox] = useState(false);
  const [isTextReady, setIsTextReady] = useState(false);
  // @ts-ignore
  useEffect(() => {
    if (showChat && autofocus) inputRef.current?.focus();
  }, [showChat]);
  useEffect(() => {
    setFirefox(isFirefox());
  }, []);

  useEffect(() => {
    if (!disabledInput && inputRef.current) {
      inputRef.current.focus();
    }
  }, [disabledInput]);

  useImperativeHandle(senderRef, () => {
    return {
      onSelectEmoji: handlerOnSelectEmoji
    };
  });

  const handlerOnChange = (event) => {
    setIsTextReady(inputRef.current?.innerHTML.length > 0);
    onTextInputChange && onTextInputChange(event);
  };

  const handlerSendMessage = () => {
    const el = inputRef.current;
    if (el.innerHTML || allowSend) {
      sendMessage(el.innerText);
      el.innerHTML = '';
      setIsTextReady(false);
    }
  };

  const handlerOnSelectEmoji = (emoji) => {
    const el = inputRef.current;
    const { start, end } = getSelection(el);
    if (el.innerHTML) {
      const firstPart = el.innerHTML.substring(0, start);
      const secondPart = el.innerHTML.substring(end);
      el.innerHTML = (`${firstPart}${emoji.emoji}${secondPart}`);
    } else {
      el.innerHTML = emoji.emoji;
    }
    updateCaret(el, start, emoji.emoji.length);
  };

  const handlerOnKeyPress = (event) => {
    const el = inputRef.current;

    if (event.charCode == 13 && !event.shiftKey) {
      event.preventDefault();
      handlerSendMessage();
    }
    if (event.charCode === 13 && event.shiftKey) {
      event.preventDefault();
      insertNodeAtCaret(el);
      setEnter(true);
    }
  };

  const handlerOnKeyUp = (event) => {
    const el = inputRef.current;
    if (!el) return true;
    // Conditions need for firefox
    if (firefox && event.key === 'Backspace') {
      if (el.innerHTML.length === 1 && enter) {
        el.innerHTML = '';
        setEnter(false);
      } else if (brRegex.test(el.innerHTML)) {
        el.innerHTML = el.innerHTML.replace(brRegex, '');
      }
    }
  };

  const handlerOnKeyDown = (event) => {
    const el = inputRef.current;

    if (event.key === 'Backspace' && el) {
      const caretPosition = getCaretIndex(inputRef.current);
      const character = el.innerHTML.charAt(caretPosition - 1);
      if (character === '\n') {
        event.preventDefault();
        event.stopPropagation();
        el.innerHTML = (el.innerHTML.substring(0, caretPosition - 1) + el.innerHTML.substring(caretPosition));
        updateCaret(el, caretPosition, -1);
      }
    }
  };

  const handlerPressEmoji = () => {
    onPressEmoji?.();
  };

  const handlerPressFile = () => {
    onPressFile?.();
  };

  const isSendActive = (!disabledInput && isTextReady) || allowSend;

  return (
    <div ref={refContainer} className="rcw-sender">
      {onPressFile && <button className="rcw-picker-btn file-picker-btn" type="submit" onClick={handlerPressFile}>
        <img src={file} className="rcw-picker-icon" alt="" />
      </button>}
      {onPressEmoji && <button className="rcw-picker-btn emoji-picker-btn" type="submit" onClick={handlerPressEmoji}>
        <img src={emoji} className="rcw-picker-icon" alt="" />
      </button>}
      <div className={cn('rcw-new-message', {
        'rcw-message-disable': disabledInput
      })
      }>
        <div className={cn('rcw-input-placeholder', { 'show': !isTextReady })}>{placeholder}</div>
        <div
          spellCheck
          contentEditable
          className="rcw-input"
          role="textbox"
          ref={inputRef}
          // placeholder={placeholder}
          onInput={handlerOnChange}
          onKeyPress={handlerOnKeyPress}
          onKeyUp={handlerOnKeyUp}
          onKeyDown={handlerOnKeyDown}
        />
        <div className="rcw-input-fake" role="textbox">&nbsp;</div>

      </div>
      <button type="submit" className={cn('rcw-send', { active: isSendActive })} onClick={handlerSendMessage} disabled={!enter && !allowSend}>
        <img src={isSendActive ? sendActive : send} className="rcw-send-icon" alt={buttonAlt} />
      </button>
    </div>
  );
}

export default Sender;
