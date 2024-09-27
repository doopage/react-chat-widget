import './style.scss';
import { useSelector } from '@selectors';
import { toggleChat } from '@actions';
import { useState } from 'react';
import Overlay from '@components/Overlay';

const menu = require('@assets/menu.svg') as string;
const close = require('@assets/close.svg') as string;

export type CProps = {
  title?: string;
  subtitle?: string;
  showMenuButton?: boolean;
  showCloseButton?: boolean;
  titleAvatar?: string;
  menus?: Array<{
    icon: string;
    title: string;
    onClick: () => void;
  }>,
}

function Header({ title, subtitle, showMenuButton = true, showCloseButton = true, titleAvatar, menus }: CProps) {
  const user = useSelector(({ messages }) => messages.responseUser);

  const [showMenu, setShowMenu] = useState(false);

  const { isShowChat, popupStyles, PopupComponent } = useSelector(({ popup }) => ({
    isShowChat: popup.showPopup,
    popupStyles: popup.styles,
    PopupComponent: popup.component
  }));

  const clickMenuHandler = (f: () => void) => {
    return () => {
      setShowMenu(false);
      return f();
    };
  };

  return (
    <div className="rcw-header">
      {(showMenuButton || showCloseButton) && <div className="buttons">
        {showMenuButton && menus &&
          <>
            <button className="rcw-menu-button" onClick={() => setShowMenu(!showMenu)}>
              <img src={menu} className="rcw-menu" alt="menu" />
            </button>
            {showMenu && <>
              <Overlay onClick={() => setShowMenu(false)} />
              <ul className="menu-popup">
                {menus.map(({ icon, title, onClick }, i) => <li key={i} onClick={clickMenuHandler(onClick)}>
                  <img src={icon} />
                  <span>{title}</span>
                </li>)}
              </ul>
            </>}
          </>
        }
        {showCloseButton &&
          <button className="rcw-close-button" onClick={toggleChat}>
            <img src={close} className="rcw-close" alt="close" />
          </button>
        }
      </div>}
      {user
        ? <div className="rcw-user">
          {typeof user.avatar === 'string'
            ? (<div className="avatar">
              <img src={user.avatar} alt="profile" />
              {typeof user.online == 'boolean' && <div className={`status status-${user.online ? 'online' : 'offline'}`} />}
            </div>)
            : (<div className="avatars">
              {user.avatar.map((src, index) => (
                <div className="avatar in-avatars" style={{ zIndex: user.avatar.length - index }}>
                  <img src={src} key={index} alt="profile" />
                </div>
              ))}
            </div>)
          }
          <div className="info">
            <span className="name">{user.name ?? <>&nbsp;</>}</span>
            <span className="message">{user.message}</span>
          </div>
        </div>
        : <>
          <p className="rcw-title">
            {titleAvatar && <img src={titleAvatar} className="avatar" alt="profile" />}
            {title ?? <>&nbsp;</>}
          </p>
          {subtitle && <span className="rcw-subtitle">{subtitle}</span>}
        </>
      }
      {isShowChat && <>
        <div className="popup-container">
          <Overlay onClick={() => setShowMenu(false)} />
          <div className="popup" style={popupStyles}>
            {PopupComponent && <PopupComponent />}
          </div>
        </div>
      </>}
    </div>
  );
}

export default Header;
