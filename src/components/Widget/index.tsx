import { addUserMessage, toggleChat } from '@actions';
import { AnyFunction } from '@utils/types';

import WidgetLayout, { CProps as LayoutProps } from './layout';
import { mergeProps } from '@utils/props';
import { isWidgetOpened } from '@selectors';
import { useEffect, useRef } from 'react';
import { Message } from '@types';

export type Props = {
  layoutProps?: Omit<LayoutProps, 'onToggleConversation' | 'onSendMessage' | 'onQuickButtonClicked' | 'onTextInputChange'>;
  handleNewUserMessage?: (data: { text?: string, files?: File[], replyMessage?: Message | null }) => void | Promise<void>;
  handleQuickButtonClicked?: AnyFunction;
  handleTextInputChange?: (event: any) => void;
  disableRichTextInput?: boolean;
  handleToggle?: (state: boolean) => boolean | Promise<boolean>;
  handleSubmit?: (data: { text?: string, files?: File[] }) => void | Error | Promise<void | Error>;
  onResize?: (w: number, h: number) => void;
}

function Widget({ layoutProps, handleNewUserMessage, handleQuickButtonClicked, handleTextInputChange, disableRichTextInput, handleToggle, handleSubmit, onResize }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!rootRef.current || !onResize) {
      return;
    }
    const el = rootRef.current!;
    const s = new ResizeObserver(() => {
      let width = el.clientWidth;
      let height = el.clientHeight;
      if (width === 0 && height === 0) {
        const launcher = el.querySelector('.rcw-launcher');
        if (launcher) {
          width = launcher.clientWidth;
          height = launcher.clientHeight;
        }
      }
      onResize!(width, height);
      let gridLevel: string = 'sm';
      if (width >= 700) {
        gridLevel = 'xl';
      } else if (width >= 560) {
        gridLevel = 'lg';
      } else if (width >= 480) {
        gridLevel = 'md';
      }
      el.setAttribute('x-grid', gridLevel ?? '');
    });
    s.observe(el);
  }, [rootRef, onResize]);

  const toggleConversation = async () => {
    if (handleToggle) {
      if (!await handleToggle(!isWidgetOpened())) {
        return;
      }
    }
    toggleChat();
  };

  const handleMessageSubmit = async ({ text, files, replyMessage }: { text?: string, files?: File[], replyMessage?: Message | null }) => {
    if (!text?.trim() && !files) {
      return;
    }

    const msgText = text ? text.trim() : '';

    if (handleSubmit) {
      const error = await handleSubmit({ text, files });
      if (error) {
        addUserMessage(msgText, { status: 'error', props: { files, error, replyMessage } });
        return;
      }
    }
    addUserMessage(msgText, { status: 'prepare', props: { files, replyMessage } });
    return handleNewUserMessage?.({ text, files, replyMessage });
  };

  const onQuickButtonClicked = (event, value) => {
    event.preventDefault();
    handleQuickButtonClicked?.(value);
  };

  function defaultTextInputHandler(event) {
    const target = event.target;
    if (target && target.textContent) {
      // Clean the input to retain only plain text
      // target.textContent = target.textContent.replace(/[\u00A0-\u9999<>\&]/g, function(i) {
      //   if (/[\u{00C0}-\u{00FF}\u{1EA0}-\u{1EFF}]/u.test(i)) {
      //     // Vietnamese
      //     return i;
      //   }
      //   return '&#' + i.charCodeAt(0) + ';';
      // });
    }
  }

  return (
    <WidgetLayout
      rootRef={rootRef}
      {...mergeProps<LayoutProps>({
        conversationProps: {
          sendMessage: handleMessageSubmit,
          senderProps: {
            onTextInputChange: disableRichTextInput ? defaultTextInputHandler : handleTextInputChange
          },
          quickButtonsProps: {
            onQuickButtonClicked: onQuickButtonClicked
          }
        }
      }, layoutProps ?? {})}
      onToggleConversation={toggleConversation}
    />
  );
}

export default Widget;
