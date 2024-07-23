import cn from 'classnames';

import Badge from './components/Badge';
import { setBadgeCount } from '@actions';

import './style.scss';
import { useSelector } from '@selectors';

const openLauncherDefault = require('@assets/launcher-button.svg') as string;
const close = require('@assets/clear-button.svg') as string;

export type CProps = {
  toggle: () => void;
  chatId?: string;
  openLabel?: string;
  closeLabel?: string;
  closeImg?: string;
  openImg?: string;
  showBadge?: boolean;
}

function Launcher({ toggle, chatId = 'rcw-chat-container', openImg, closeImg, openLabel = 'Open chat', closeLabel = 'Close chat', showBadge = true }: CProps) {
  const { showChat, badgeCount } = useSelector(({ behavior, messages }) => ({
    showChat: behavior.showChat,
    badgeCount: messages.badgeCount
  }));

  const toggleChat = () => {
    toggle();
    if (!showChat) setBadgeCount(0);
  };

  return (
    <button type="button" className={cn('rcw-launcher', { 'rcw-hide-sm': showChat, 'default-launcher': !openImg })} onClick={toggleChat} aria-controls={chatId}>
      {!showChat && showBadge && <Badge badge={badgeCount} />}
      {showChat ?
        <img src={closeImg || close} className="rcw-close-launcher" alt={openLabel} /> :
        <div className={cn('rcw-open-launcher', { 'default-launcher': !openImg })}>
          {
            openImg ?
              <img src={openImg} alt={closeLabel} /> :
              <img src={openLauncherDefault} alt={closeLabel} />
          }
        </div>
      }
    </button>
  );
}

export default Launcher;
