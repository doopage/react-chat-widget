import React from 'react';
import Status from '../Status';
import Toolbar from '../Toolbar';
import { useSelector } from '@selectors';
import './styles.scss';

export type Props = {
  showTimeStamp?: boolean;
  reply?: boolean;
  reaction?: boolean;
  className: string;
  children?: React.ReactNode;
}

function Message({ showTimeStamp, reply, reaction, className, children }: Props) {
  const locale = useSelector(({ messages }) => messages?.statusLocale);

  return (
    <Status showTimeStamp={!!showTimeStamp} locale={locale} showStatus>
      <Toolbar reply={reply} reaction={reaction}>
        <div className={`rcw-message-custom ${className}`}>
          {children}
        </div>
      </Toolbar>
    </Status>
  );
}

export default Message;
