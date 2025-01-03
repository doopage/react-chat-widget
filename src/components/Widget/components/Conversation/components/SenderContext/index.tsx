import { Message } from '@types';
import { getComponentToRender } from '../Messages';
import './style.scss';
import { setReplyMessage } from '@actions';

export type Props = {
  replyMessage?: Message | null;
}

function SenderContext({ replyMessage }: Props) {
  return (
    <div className="rcw-sender-context">
      {replyMessage && <div className="rcw-sender-context-reply">
        <span className="rcw-sender-context-reply-bar" />
        <button className="rcw-sender-context-reply-close" onClick={() => setReplyMessage(null)}>&times;</button>
        <div className="rcw-sender-context-reply-content">
          {getComponentToRender(replyMessage, { isReplyContext: true })}
        </div>
      </div>}
    </div>
  );
}

export default SenderContext;
