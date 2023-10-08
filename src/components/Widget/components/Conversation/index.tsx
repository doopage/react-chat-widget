import { useRef, useState, useEffect } from 'react';
import EmojiPicker, { EmojiStyle } from 'emoji-picker-react';
import cn from 'classnames';

import Header from './components/Header';
import Messages from './components/Messages';
import Sender from './components/Sender';
import QuickButtons from './components/QuickButtons';

import { AnyFunction } from '../../../../utils/types';
import { ResizableProps } from '@types';

import './style.scss';

interface ISenderRef {
  onSelectEmoji: (event: any) => void;
}

type Props = {
  title: string;
  subtitle: string;
  senderPlaceHolder: string;
  showCloseButton: boolean;
  disabledInput: boolean;
  autofocus: boolean;
  className: string;
  sendMessage: AnyFunction;
  toggleChat: AnyFunction;
  profileAvatar?: string;
  profileClientAvatar?: string;
  titleAvatar?: string;
  onQuickButtonClicked?: AnyFunction;
  onTextInputChange?: (event: any) => void;
  sendButtonAlt: string;
  showTimeStamp: boolean;
  resizable?: boolean;
  resizableProps?: ResizableProps;
  emojis?: boolean;
};

function Conversation({
  title,
  subtitle,
  senderPlaceHolder,
  showCloseButton,
  disabledInput,
  autofocus,
  className,
  sendMessage,
  toggleChat,
  profileAvatar,
  profileClientAvatar,
  titleAvatar,
  onQuickButtonClicked,
  onTextInputChange,
  sendButtonAlt,
  showTimeStamp,
  resizable,
  resizableProps,
  emojis
}: Props) {

  const containerDivRef = useRef<HTMLElement | null>(null);
  const boundResizeRef = useRef<(event: MouseEvent) => void>(() => { });
  const startXRef = useRef<number>(0);
  const startYRef = useRef<number>(0);
  const startWidthRef = useRef<number>(0);
  const startHeightRef = useRef<number>(0);

  const MIN_WIDTH = 400; // set the minimum width value
  const MIN_HEIGHT = 300; // set the minimum height value

  useEffect(() => {
    containerDivRef.current = document.getElementById('rcw-messages');
  }, []);

  const initResize = (e) => {
    if (resizable) {
      const resizerType = e.currentTarget.getAttribute('data-resizer');

      startXRef.current = e.clientX;
      startYRef.current = e.clientY;

      if (document.defaultView && containerDivRef.current) {
        startWidthRef.current = parseInt(document.defaultView.getComputedStyle(containerDivRef.current).width);
        startHeightRef.current = parseInt(document.defaultView.getComputedStyle(containerDivRef.current).height);

        // Bind the resizer type and store the reference
        boundResizeRef.current = (event) => resize(event, resizerType);

        window.addEventListener('mousemove', boundResizeRef.current, false);
        window.addEventListener('mouseup', stopResize, false);
      }
    }
  }

  const resize = (e, resizerType) => {
    if (containerDivRef.current) {
      let newWidth = startWidthRef.current;
      let newHeight = startHeightRef.current;

      switch (resizerType) {
        case "top-left":
          newWidth = startWidthRef.current - e.clientX + startXRef.current;
          newHeight = startHeightRef.current - e.clientY + startYRef.current;
          break;
        case "left":
          newWidth = startWidthRef.current - e.clientX + startXRef.current;
          break;
        case "top":
          newHeight = startHeightRef.current - e.clientY + startYRef.current;
          break;
        default:
          break;
      }

      const width = Math.min(Math.max(newWidth, MIN_WIDTH), Math.round(resizableProps?.widthOffset ? window.innerWidth - resizableProps.widthOffset : window.innerWidth - 300));
      const height = Math.min(Math.max(newHeight, MIN_HEIGHT), Math.round(resizableProps?.heightOffset ? window.innerHeight - resizableProps.heightOffset : window.innerHeight - 300));

      containerDivRef.current.style.width = width + 'px';
      containerDivRef.current.style.height = height + 'px';
    }
  }

  const stopResize = (e) => {
    window.removeEventListener('mousemove', boundResizeRef.current, false);
    window.removeEventListener('mouseup', stopResize, false);
  }

  const senderRef = useRef<ISenderRef>(null!);
  const [pickerStatus, setPickerStatus] = useState(false)

  const onSelectEmoji = (emoji) => {
    senderRef.current?.onSelectEmoji(emoji)
  }

  const togglePicker = () => {
    setPickerStatus(prevPickerStatus => !prevPickerStatus)
  }

  const handlerSendMsn = (event) => {
    sendMessage(event)
    if (pickerStatus) setPickerStatus(false)
  }

  return (
    <div id="rcw-conversation-container"
      className={cn('rcw-conversation-container', className)} aria-live="polite">
      {resizable && <div data-resizer="top-left" className="rcw-conversation-xy-resizer" onMouseDown={initResize} />}
      {resizable && <div data-resizer="left" className="rcw-conversation-x-resizer" onMouseDown={initResize} />}
      {resizable && <div data-resizer="top" className="rcw-conversation-y-resizer" onMouseDown={initResize} />}
      <Header
        title={title}
        subtitle={subtitle}
        toggleChat={toggleChat}
        showCloseButton={showCloseButton}
        titleAvatar={titleAvatar}
      />
      <Messages
        profileAvatar={profileAvatar}
        profileClientAvatar={profileClientAvatar}
        showTimeStamp={showTimeStamp}
      />
      <QuickButtons onQuickButtonClicked={onQuickButtonClicked} />
      {emojis && pickerStatus && (<EmojiPicker
        onEmojiClick={onSelectEmoji}
        emojiStyle={EmojiStyle.NATIVE}
        searchDisabled
        width="100%"
        height={300}
        previewConfig={{
          showPreview: false
        }

        }
      />)}
      <Sender
        ref={senderRef}
        sendMessage={handlerSendMsn}
        placeholder={senderPlaceHolder}
        disabledInput={disabledInput}
        autofocus={autofocus}
        onTextInputChange={onTextInputChange}
        buttonAlt={sendButtonAlt}
        onPressEmoji={togglePicker}
      />
    </div>
  );
}

export default Conversation;
