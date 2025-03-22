import cn from 'classnames';
import Status from '../Status';
import Toolbar from '../Toolbar';
import { Link } from '@types';
import { useContext, useMemo } from 'react';
import { MessageContext } from '../../context';
import { useSelector } from '@selectors';
import { FacebookPreview, parseFacebookLink, parseTiktokLink, parseVimeoLink, parseYoutubeLink, TiktokPreview, VimeoPreview, YoutubePreview } from './preview';
import './styles.scss';

export type Props = {
  message: Link;
  showTimeStamp?: boolean;
  reply?: boolean;
  reaction?: boolean;
  isReplyContext?: boolean;
  isReplyMessage?: boolean;
}

function Snippet({ message: messageRaw, reply, reaction, showTimeStamp, isReplyContext, isReplyMessage }: Props) {
  const message = messageRaw ?? useContext(MessageContext) as Link;
  const locale = useSelector(({ messages }) => messages?.statusLocale);

  const preview = useMemo(() => {
    if (!message.showPreview || isReplyContext || isReplyMessage) {
      return;
    }
    const { link } = message;
    const urlLink = new URL(link);
    const youtubeParams = parseYoutubeLink(urlLink);
    if (youtubeParams !== null) {
      return <YoutubePreview {...youtubeParams} />;
    }
    const tiktokParams = parseTiktokLink(urlLink);
    if (tiktokParams !== null) {
      return <TiktokPreview {...tiktokParams} />;
    }
    const facebookParams = parseFacebookLink(urlLink);
    if (facebookParams !== null) {
      return <FacebookPreview {...facebookParams} />;
    }
    const vimeoParams = parseVimeoLink(urlLink);
    if (vimeoParams !== null) {
      return <VimeoPreview {...vimeoParams} />;
    }
  }, [message.link, message.showPreview, isReplyContext, isReplyMessage]);

  return (
    <Status showTimeStamp={!!showTimeStamp} locale={locale} showStatus>
      <Toolbar reply={reply} reaction={reaction}>
        <div className={cn('rcw-snippet', { 'is-preview': !!preview })}>
          {preview ? preview : <><h5 className="rcw-snippet-title">{message.title}</h5>
            <div className="rcw-snippet-details">
              <a href={message.link} target={message.target} className="rcw-link">
                {message.link}
              </a>
            </div>
          </>}
        </div>
      </Toolbar>
    </Status>
  );
}

export default Snippet;
