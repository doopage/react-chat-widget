import markdownIt from 'markdown-it';
import markdownItSup from 'markdown-it-sup';
import markdownItSanitizer from 'markdown-it-sanitizer';
import markdownItClass from '@toycode/markdown-it-class';
import markdownItLinkAttributes from 'markdown-it-link-attributes';
import { imgSize } from '@mdit/plugin-img-size';
import { attrs } from '@mdit/plugin-attrs';
import { MessageTypes } from '@types';
import React, { ReactElement, useMemo } from 'react';
import Status from '../Status';
import Toolbar from '../Toolbar';
import { useSelector } from '@selectors';
import './styles.scss';

const quoteIcon = require('@assets/quote-right.svg') as string;

export type Props = {
  message: MessageTypes;
  showTimeStamp?: boolean;
  reply?: boolean;
  reaction?: boolean;
  isReplyContext?: boolean;
  isReplyMessage?: boolean;
}

type FileProps = {
  item: any;
}

function FileAttachment({ item }: FileProps) {
  const href = useMemo(() => {
    if (item instanceof File) {
      return URL.createObjectURL(item);
    }
    return item.url;
  }, [item]);
  const fileType = useMemo(() => {
    const itemType = item.type ?? item.file_type;
    if (item instanceof File) {
      if (itemType.startsWith('image/')) {
        return 'image';
      } else if (itemType.startsWith('video/')) {
        return 'video';
      } else {
        return itemType;
      }
    }
    return itemType;
  }, [item]);
  switch (fileType) {
    case 'image': {
      const sanitizedHTML = markdownIt().use(markdownItClass, { img: ['rcw-message-img'] }).render(`![](${href})`);
      return <div className="rcw-message-text is-attachment" dangerouslySetInnerHTML={{ __html: sanitizedHTML.replace(/\n$/, '') }} />;
    }
    case 'video': {
      const sanitizedHTML = markdownIt({ html: true }).use(markdownItClass, { video: ['rcw-message-video'] }).render(`<video src="${href}" controls />`);
      return <div className="rcw-message-text is-attachment" dangerouslySetInnerHTML={{ __html: sanitizedHTML.replace(/\n$/, '') }} />;
    }
    default: {
      const sanitizedHTML = markdownIt().use(markdownItLinkAttributes, { attrs: { target: '_blank', rel: 'noopener' } }).render(`[${item.name}](${href})`);
      return <div className="rcw-message-text is-attachment" data-type={fileType} dangerouslySetInnerHTML={{ __html: sanitizedHTML.replace(/\n$/, '') }} />;
    }
  }
}

function Message({ message, reply, reaction, showTimeStamp, isReplyContext, isReplyMessage }: Props) {
  const locale = useSelector(({ messages }) => messages?.statusLocale);

  let sanitizedHTML: string | null = null;

  if (message.text) {
    sanitizedHTML = markdownIt({ html: true, breaks: true })
      .use(markdownItClass, {
        img: ['rcw-message-img']
      })
      .use(markdownItSup)
      .use(markdownItSanitizer)
      .use(markdownItLinkAttributes, { attrs: { target: '_blank', rel: 'noopener' } })
      .use(imgSize).use(attrs)
      .render(message.text);
  }

  const attachments: React.ReactPortal[] = [];
  if (message.props?.files) {
    attachments.push(message.props.files.map((item, i) => <FileAttachment key={i} item={item} />));
  }

  if (isReplyContext || isReplyMessage) {
    if (sanitizedHTML) {
      if (isReplyMessage) {
        return <div dangerouslySetInnerHTML={{ __html: sanitizedHTML.replace(/\n$/, '') }} />;
      }
      return (
        <div className="reply-content-body">
          <div className="reply-content-header">
            <img src={quoteIcon} />
            Trả lời
          </div>
          <div className="rcw-message-text" dangerouslySetInnerHTML={{ __html: sanitizedHTML.replace(/\n$/, '') }} />
        </div>
      );
    }
    if (message.props?.files) {
      const { files } = message.props;
      if (files.length == 1) {
        const file = files[0];
        const fileType = file.type ?? file.file_type;
        if (fileType.startsWith('image/')) {
          const href = file.url ?? URL.createObjectURL(file);
          if (isReplyMessage) {
            return <img className="reply-content-preview" src={href} />;
          }
          return (
            <>
              <img className="reply-content-preview" src={href} />
              <div className="reply-content-body has-preview">
                <div className="reply-content-header">
                  <img src={quoteIcon} />
                  Trả lời
                </div>
                <div className="rcw-message-text">
                  [Hình ảnh]
                </div>
              </div>
            </>
          );
        }
        if (isReplyMessage) {
          return <span>[File] {file.name}</span>;
        }
        return (
          <div className="reply-content-body">
            <div className="reply-content-header">
              <img src={quoteIcon} />
              Trả lời
            </div>
            <div className="rcw-message-text">
              [File] {file.name}
            </div>
          </div>
        );
      }
      if (isReplyMessage) {
        return <span>[{files.length} tập tin]</span>;
      }
      return (
        <div className="reply-content-body">
          <div className="reply-content-header">
            <img src={quoteIcon} />
            Trả lời
          </div>
          <div className="rcw-message-text">
            [{files.length} tập tin]
          </div>
        </div>
      );
    }
    return (
      <div className="reply-content-body">
        <div className="reply-content-header">
          <img src={quoteIcon} />
          Trả lời
        </div>
        <div>[Tin nhắn]</div>
      </div>
    );
  }

  let replySection: ReactElement | null = null;
  if (sanitizedHTML && message.props?.replyMessage) {
    replySection = <Message message={message.props.replyMessage} isReplyMessage />;
  }

  return (
    <Status message={message} showTimeStamp={!!showTimeStamp} locale={locale} showStatus>
      <Toolbar message={message} reply={reply} reaction={reaction}>
        {sanitizedHTML && (replySection
            ? (<div className="rcw-message-text">
              <div className={`reply-section rcw-${message.sender}`}>
                <span className="rcw-message-reply-bar" />
                <div className="rcw-message-reply-content">
                  {replySection}
                </div>
              </div>
              <div dangerouslySetInnerHTML={{ __html: sanitizedHTML.replace(/\n$/, '') }} />
            </div>)
            : <div className="rcw-message-text" dangerouslySetInnerHTML={{ __html: sanitizedHTML.replace(/\n$/, '') }} />
        )}
        {attachments}
      </Toolbar>
    </Status>
  );
}

export default Message;
