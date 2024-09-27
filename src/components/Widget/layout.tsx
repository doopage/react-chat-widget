import React, { useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import { AnyFunction } from '@utils/types';
import { openFullscreenPreview } from '@actions';

import Conversation, { CProps as ConversationProps } from './components/Conversation';
import Launcher, { CProps as LauncherProps } from './components/Launcher';
import FullScreenPreview from './components/FullScreenPreview';

import './style.scss';
import { useSelector } from '@selectors';

export type CProps = {
  rootRef?: React.Ref<HTMLDivElement>;
  conversationProps?: ConversationProps;
  launcherProps?: Omit<LauncherProps, 'toggle' | 'isLoading'>;
  onToggleConversation: () => Promise<void>;
  fullScreenMode?: boolean;
  customLauncher?: AnyFunction;
  imagePreview?: boolean;
  zoomStep?: number;
}

function WidgetLayout({ rootRef, conversationProps, launcherProps, onToggleConversation, fullScreenMode = false, customLauncher, imagePreview = false, zoomStep = 80 }: CProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { showChat, visible } = useSelector(({ behavior, preview }) => ({
    showChat: behavior.showChat,
    visible: preview.visible
  }));

  const messageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (showChat) {
      messageRef.current = document.getElementById('rcw-messages') as HTMLDivElement;
    }
    return () => {
      messageRef.current = null;
    };
  }, [showChat]);

  const eventHandle = evt => {
    if (evt.target && evt.target.className === 'rcw-message-img') {
      const { src, alt, naturalWidth, naturalHeight } = (evt.target as HTMLImageElement);
      const obj = {
        src: src,
        alt: alt,
        width: naturalWidth,
        height: naturalHeight
      };
      openFullscreenPreview(obj);
    }
  };

  /**
   * Previewer needs to prevent body scroll behavior when fullScreenMode is true
   */
  useEffect(() => {
    const target = messageRef?.current;
    if (imagePreview && showChat) {
      target?.addEventListener('click', eventHandle, false);
    }

    return () => {
      target?.removeEventListener('click', eventHandle);
    };
  }, [imagePreview, showChat]);

  useEffect(() => {
    document.body.setAttribute('style', `overflow: ${visible || fullScreenMode ? 'hidden' : 'auto'}`);
  }, [fullScreenMode, visible]);

  const toggleHandler = async () => {
    setIsLoading(true);
    await onToggleConversation();
    setIsLoading(false);
  };

  return (
    <div
      ref={rootRef}
      className={cn('rcw-widget-container', {
        'rcw-full-screen': fullScreenMode,
        'rcw-previewer': imagePreview,
        'rcw-close-widget-container ': !showChat
      })}
    >
      {(showChat || fullScreenMode) &&
        <Conversation {...conversationProps} className={(showChat || fullScreenMode) ? 'active' : 'hidden'} />
      }
      {customLauncher ?
        customLauncher(toggleHandler) :
        !fullScreenMode &&
        <Launcher {...launcherProps} toggle={toggleHandler} isLoading={isLoading} />
      }
      {
        imagePreview && <FullScreenPreview fullScreenMode={fullScreenMode} zoomStep={zoomStep} />
      }
    </div>
  );
}

export default WidgetLayout;
