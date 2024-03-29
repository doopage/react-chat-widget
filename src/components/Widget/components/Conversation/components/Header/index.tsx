import './style.scss';
import { Optional } from 'utility-types';
import { useSelector } from '@selectors';

const close = require('@assets/clear-button.svg') as string;

type CProps = {
  title: string;
  subtitle?: string;
  toggleChat?: () => void;
  showCloseButton: boolean;
  titleAvatar?: string;
}

const defaultProps = {
  title: 'DooPage',
  showCloseButton: true
};

type IProps = CProps & typeof defaultProps;
export type Props = Optional<IProps, keyof typeof defaultProps>;

function Header({ title, subtitle, toggleChat, showCloseButton, titleAvatar }: IProps) {
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

Header.defaultProps = defaultProps;

export default Header;
