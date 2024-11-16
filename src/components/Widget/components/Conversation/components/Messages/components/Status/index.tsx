import './styles.scss';
import React from 'react';
import cn from 'classnames';
import { MessageTypes } from '@types';
import { format_time } from '@utils/time';
import { format } from 'date-fns';
import { useSelector } from '@selectors';

const statuses = {
  prepare: require('@assets/status-prepare.svg') as string,
  sent: require('@assets/status-sent.svg') as string,
  read: require('@assets/status-read.svg') as string,
  error: require('@assets/status-error.svg') as string
};

export type Props = {
  message: MessageTypes;
  showTimeStamp: boolean;
  showStatus?: boolean;
  children: React.ReactNode;
}

function Status({ message, showTimeStamp, showStatus, children }: Props) {
  const locale = useSelector(({ messages }) => messages.statusLocale);
  const hasStatus = showStatus && message.sender == 'client' && message.status && statuses[message.status];
  const isStatusError = hasStatus && message.status === 'error';
  let statusTitle = '';
  if (hasStatus && message.status == 'error' && message.props?.error) {
    const { error } = message.props;
    if (error) {
      if (error instanceof Error) {
        statusTitle = error.message;
      } else if (typeof error != 'string') {
        statusTitle = String(error);
      }
    }
  }
  return (
    <div className={cn(`rcw-${message.sender}`, { 'has-status': hasStatus, [`status-${message.status}`]: message.status })}>
      {children}
      <div className="status">
        {showTimeStamp && <span className="rcw-timestamp" title={format(message.timestamp, 'hh:mm:ss, dd MMM, yyyy')}>{format_time(message.timestamp, locale)}</span>}
        {(hasStatus) && <div className="icon-status" title={statusTitle}><img src={statuses[message.status!]} alt={message.status} /></div>}
      </div>
      {(hasStatus && isStatusError) &&
        <div
          className={cn(`status-explained ${message.status}`, { 'can-retry': !!message.props.retry })}
          onClick={message.props.retry}
        >
          {statusTitle}
        </div>
      }
    </div>
  );
}

export default Status;
