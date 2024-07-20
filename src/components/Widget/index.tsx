import { addUserMessage, toggleChat } from '@actions';
import { AnyFunction } from '@utils/types';

import WidgetLayout, { Props as LayoutProps } from './layout';
import { mergeProps } from '@utils/props';
import { isWidgetOpened } from '@selectors';
import { useEffect, useRef } from 'react';

export type Props = {
  layoutProps?: Omit<LayoutProps, 'onToggleConversation' | 'onSendMessage' | 'onQuickButtonClicked' | 'onTextInputChange'>;
  handleNewUserMessage: (data: { text?: string, files?: File[] }) => void | Promise<void>;
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
    const s = new ResizeObserver(() => {
      onResize?.(rootRef.current!.clientWidth, rootRef.current!.clientHeight);
    });
    s.observe(rootRef.current);
  }, [rootRef, onResize]);

  const toggleConversation = async () => {
    if (handleToggle) {
      if (!await handleToggle(!isWidgetOpened())) {
        return;
      }
    }
    toggleChat();
  };

  const handleMessageSubmit = async ({ text, files }: { text?: string, files?: File[] }) => {
    if (!text?.trim() && !files) {
      return;
    }

    const msgText = text ? text.trim() : '';

    if (handleSubmit) {
      const error = await handleSubmit({ text, files });
      if (error) {
        addUserMessage(msgText, { status: 'error', props: { files, error } });
        return;
      }
    }
    addUserMessage(msgText, { status: 'prepare', props: { files } });
    return handleNewUserMessage({ text, files });
  };

  const onQuickButtonClicked = (event, value) => {
    event.preventDefault();
    handleQuickButtonClicked?.(value);
  };

  function defaultTextInputHandler(event) {
    const target = event.target;
    if (target && target.textContent) {
      // Clean the input to retain only plain text
      target.textContent = target.textContent.replace(/[\u00A0-\u9999<>\&]/g, function(i) {
        return '&#' + i.charCodeAt(0) + ';';
      });
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
