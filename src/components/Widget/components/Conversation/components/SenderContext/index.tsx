import { Message } from '@types';
import { getComponentToRender } from '../Messages';
import './style.scss';
import { setReplyMessage } from '@actions';
import { scrollIntoView } from '@utils/scroll';

export type Props = {
  replyMessage?: Message | null;
}

function SenderContext({ replyMessage }: Props) {
  const goToReply = () => {
    if (!replyMessage) {
      return;
    }
    const { customId } = replyMessage;
    if (!customId) {
      return;
    }
    const ctx = document.querySelector('#rcw-messages');
    if (!ctx) {
      return;
    }
    const m = ctx.querySelector(`.rcw-message[data-id="${customId}"]`);
    if (m) {
      scrollIntoView(ctx, m, { behavior: 'smooth', y: -64 * 2 });
    }
  };

  return (
    <div className="rcw-sender-context">
      {replyMessage && <div className="rcw-sender-context-reply">
        <span className="rcw-sender-context-reply-bar" />
        <button className="rcw-sender-context-reply-close" onClick={() => setReplyMessage(null)}>&times;</button>
        <div className="rcw-sender-context-reply-content">
          {getComponentToRender(replyMessage, { isReplyContext: true })}
        </div>
        <div className="full-overlay" onClick={goToReply} />
      </div>}
    </div>
  );
}

export default SenderContext;
