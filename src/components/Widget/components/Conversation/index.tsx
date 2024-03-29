import { useEffect, useRef, useState } from 'react';
import EmojiPicker, { EmojiStyle } from 'emoji-picker-react';
import cn from 'classnames';

import Header, { Props as HeaderProps } from './components/Header';
import Messages, { Props as MessagesProps } from './components/Messages';
import Sender, { ISenderRef, Props as SenderProps } from './components/Sender';
import QuickButtons, { Props as QuickButtonsProps } from './components/QuickButtons';
import { ResizableProps } from '@types';

import './style.scss';
import { Optional } from 'utility-types';
import FilePicker from './components/FilePicker';
import { clone } from 'lodash';
import { useSelector } from '@selectors';

type CProps = {
  headerProps?: HeaderProps;
  messagesProps?: MessagesProps;
  senderProps?: Omit<SenderProps, 'sendMessage' | 'onPressEmoji' | 'onPressFile' | 'disabledInput' | 'allowSend'>;
  quickButtonsProps?: QuickButtonsProps;
  className?: string;
  sendMessage?: (data: { text: string, files: File[] }) => void;
  resizable?: boolean;
  resizableProps?: ResizableProps;
  defaultSize?: { width: number, height: number };
  onResize?: (w: number, h: number) => void;
  emojis?: boolean;
  files?: boolean;
  disabledInput?: boolean;
};

const minSize = {
  width: 400,
  height: 300
};

const defaultProps = {
  resizableProps: {
    heightOffset: 105,
    widthOffset: 35
  } as ResizableProps,
  defaultSize: clone(minSize)
};

type IProps = CProps & typeof defaultProps;
export type Props = Optional<CProps, keyof typeof defaultProps>;

function Conversation({
                        headerProps,
                        messagesProps,
                        senderProps,
                        quickButtonsProps,
                        className,
                        sendMessage,
                        resizable,
                        resizableProps,
                        defaultSize,
                        onResize,
                        emojis,
                        files,
                        disabledInput: propDisabledInput
                      }: IProps) {
  const containerDivRef = useRef<HTMLElement | null>(null);
  const boundResizeRef = useRef<(event: MouseEvent) => void>(() => {
  });
  const startXRef = useRef<number>(0);
  const startYRef = useRef<number>(0);
  const startWidthRef = useRef<number>(0);
  const startHeightRef = useRef<number>(0);
  const [fileItems, setFileItems] = useState<File[]>([]);
  const addFileRef = useRef<() => void>(() => void 0);
  const disableInput = useSelector(({ behavior }) => behavior.disabledInput);

  useEffect(() => {
    containerDivRef.current = document.getElementById('rcw-conversation-container');
  }, []);

  const setSize = (newWidth, newHeight) => {
    if (containerDivRef.current) {
      const width = Math.min(Math.max(newWidth, minSize.width), Math.round(resizableProps?.widthOffset ? window.innerWidth - resizableProps.widthOffset : window.innerWidth - 35));
      const height = Math.min(Math.max(newHeight, minSize.height), Math.round(resizableProps?.heightOffset ? window.innerHeight - resizableProps.heightOffset : window.innerHeight - 105));

      onResize?.(width, height);
      containerDivRef.current.style.width = width + 'px';
      containerDivRef.current.style.height = height + 'px';
    }
  };

  useEffect(() => {
    setSize(defaultSize.width, defaultSize.height);
  }, [defaultSize]);

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
  };

  const resize = (e, resizerType) => {
    if (containerDivRef.current) {
      let newWidth = startWidthRef.current;
      let newHeight = startHeightRef.current;

      switch (resizerType) {
        case 'top-left':
          newWidth = startWidthRef.current - e.clientX + startXRef.current;
          newHeight = startHeightRef.current - e.clientY + startYRef.current;
          break;
        case 'left':
          newWidth = startWidthRef.current - e.clientX + startXRef.current;
          break;
        case 'top':
          newHeight = startHeightRef.current - e.clientY + startYRef.current;
          break;
        default:
          break;
      }

      setSize(newWidth, newHeight);
    }
  };

  const stopResize = (e) => {
    window.removeEventListener('mousemove', boundResizeRef.current, false);
    window.removeEventListener('mouseup', stopResize, false);
  };

  const senderRef = useRef<ISenderRef>(null!);
  const [pickerStatus, setPickerStatus] = useState(false);

  const onSelectEmoji = (emoji) => {
    senderRef.current?.onSelectEmoji(emoji);
  };

  const onSelectFile = (files: File[]) => setFileItems(files);

  const togglePicker = () => {
    setPickerStatus(prevPickerStatus => !prevPickerStatus);
  };

  const selectFile = () => addFileRef.current?.();

  const handlerSendMsn = (text: string) => {
    sendMessage?.({ text, files: fileItems });
    if (pickerStatus) {
      setPickerStatus(false);
    }
    if (files && fileItems.length > 0) {
      setFileItems([]);
    }
  };

  return (
    <div id="rcw-conversation-container" className={cn('rcw-conversation-container', className)} aria-live="polite">
      {resizable && <div data-resizer="top-left" className="rcw-conversation-xy-resizer" onMouseDown={initResize} />}
      {resizable && <div data-resizer="left" className="rcw-conversation-x-resizer" onMouseDown={initResize} />}
      {resizable && <div data-resizer="top" className="rcw-conversation-y-resizer" onMouseDown={initResize} />}
      <Header {...headerProps} />
      <Messages {...messagesProps} />
      <QuickButtons {...quickButtonsProps} />
      {emojis && pickerStatus && (<EmojiPicker
        onEmojiClick={onSelectEmoji}
        emojiStyle={EmojiStyle.NATIVE}
        searchDisabled
        width="100%"
        height={350}
        previewConfig={{
          showPreview: false
        }
        }
      />)}
      {files && (<FilePicker
        items={fileItems}
        onSelectFile={onSelectFile}
        addFileRef={addFileRef}
        height={100}
        maxItem={1}
        showButton={false}
        imageOnly
      />)}
      <Sender
        {...senderProps}
        senderRef={senderRef}
        sendMessage={handlerSendMsn}
        onPressEmoji={emojis ? togglePicker : null}
        onPressFile={files ? selectFile : null}
        disabledInput={propDisabledInput || disableInput || (files && fileItems.length > 0)}
        allowSend={files && fileItems.length > 0}
      />
    </div>
  );
}

Conversation.defaultProps = defaultProps;

export default Conversation;
