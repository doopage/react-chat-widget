import './style.scss';
import { useSelector } from '@selectors';
import { toggleChat } from '@actions';

const close = require('@assets/close.svg') as string;

export type CProps = {
  title?: string;
  subtitle?: string;
  showCloseButton?: boolean;
  titleAvatar?: string;
}

function Header({ title, subtitle, showCloseButton = true, titleAvatar }: CProps) {
  const user = useSelector(({ messages }) => messages.responseUser);

  return (
    <div className="rcw-header">
      {showCloseButton &&
        <button className="rcw-close-button" onClick={toggleChat}>
          <img src={close} className="rcw-close" alt="close" />
        </button>
      }
      {user
        ? <div className="rcw-user">
          {typeof user.avatar === 'string'
            ? (<div className="avatar">
              <img src={user.avatar} alt="profile" />
            </div>)
            : (<div className="avatars">
              {user.avatar.map((src, index) => (
                <div className="avatar in-avatars" style={{ zIndex: user.avatar.length - index }}>
                  <img src={src} key={index} alt="profile" />
                </div>
              ))}
            </div>)
          }
          {typeof user.online == 'boolean' && <div className={`status status-${user.online ? 'online' : 'offline'}`} />}
          <div className="info">
            <span className="name">{user.name}</span>
            <span className="message">{user.message}</span>
          </div>
        </div>
        : <>
          <p className="rcw-title">
            {titleAvatar && <img src={titleAvatar} className="avatar" alt="profile" />}
            {title}
          </p>
          {subtitle && <span className="rcw-subtitle">{subtitle}</span>}
        </>
      }
    </div>
  );
}

export default Header;
