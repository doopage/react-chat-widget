import './style.scss';
import { useSelector } from '@selectors';
import { toggleChat } from '@actions';

const close = require('@assets/clear-button.svg') as string;

export type CProps = {
  title?: string;
  subtitle?: string;
  showCloseButton?: boolean;
  titleAvatar?: string;
}

function Header({ title = 'DooPage', subtitle, showCloseButton = true, titleAvatar }: CProps) {
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
          <div className="avatar">
            <img src={user.avatar} alt="profile" />
            {typeof user.online == 'boolean' && <div className={`status status-${user.online ? 'online' : 'offline'}`} />}
          </div>
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
