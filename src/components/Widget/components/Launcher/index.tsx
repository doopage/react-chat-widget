import cn from 'classnames';

import Badge from './components/Badge';
import { setBadgeCount } from '@actions';

import './style.scss';
import { useSelector } from '@selectors';
import React from 'react';
import Popup, { Props as PopupProps } from './components/Popup';
import Img from '@components/Img';

const openLauncherDefault = require('@assets/launcher-button.svg') as string;
const loading = require('@assets/loading.svg') as string;
const close = require('@assets/clear-button.svg') as string;

export type CProps = {
  toggle: () => void;
  chatId?: string;
  openLabel?: string;
  closeLabel?: string;
  closeImg?: string;
  openImg?: string;
  showBadge?: boolean;
  showPopup?: boolean;
  isLoading?: boolean;
  popupProps?: Omit<PopupProps, 'text'>;
}

function Launcher({
                    toggle,
                    chatId = 'rcw-chat-container',
                    openImg,
                    closeImg,
                    openLabel = 'Open chat',
                    closeLabel = 'Close chat',
                    showBadge = true,
                    showPopup = true,
                    isLoading = false,
                    popupProps = {}
                  }: CProps) {
  const { showChat, badgeCount, popupMessage } = useSelector(({ behavior, messages }) => ({
    showChat: behavior.showChat,
    badgeCount: messages.badgeCount,
    popupMessage: messages.popupMessage
  }));

  const toggleChat = () => {
    toggle();
    if (!showChat) setBadgeCount(0);
  };

  return <>
    {!showChat && showPopup && popupMessage && <Popup text={popupMessage} {...popupProps} />}
    <button type="button" className={cn('rcw-launcher', { 'rcw-hide-sm': showChat, 'default-launcher': !openImg })} onClick={toggleChat} aria-controls={chatId}>
      {!showChat && showBadge && <Badge badge={badgeCount} />}
      {showChat ?
        <Img src={closeImg || close} className="rcw-close-launcher" alt={openLabel} /> :
        <div className={cn('rcw-open-launcher', { 'default-launcher': !openImg && !isLoading, 'loading': isLoading })}>
          {
            isLoading ?
              <Img src={loading} alt={closeLabel} /> :
              (openImg ?
                <Img src={openImg} alt={closeLabel} /> :
                <Img src={openLauncherDefault} alt={closeLabel} />)
          }
        </div>
      }
    </button>
  </>;
}

export default Launcher;
