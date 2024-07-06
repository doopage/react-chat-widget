import markdownIt from 'markdown-it';
import markdownItSup from 'markdown-it-sup';
import markdownItSanitizer from 'markdown-it-sanitizer';
import markdownItClass from '@toycode/markdown-it-class';
import markdownItLinkAttributes from 'markdown-it-link-attributes';

import { MessageTypes } from '@types';

import './styles.scss';
import React, { useEffect, useState } from 'react';
import Status from '../Status';

export type Props = {
  message: MessageTypes;
  showTimeStamp: boolean;
}

type FileProps = {
  item: any;
}

function FileAttachment({ item }: FileProps) {
  const [name, setName] = useState(item.name);
  const [href, setHref] = useState(item.url);
  const [type, setType] = useState(item.type);
  useEffect(() => {
    if (item instanceof File) {
      setName(item.name);
      setHref(URL.createObjectURL(item));
      if (item.type.startsWith('image/')) {
        setType('image');
      } else {
        setType(item.type);
      }
    }
  }, [item]);
  switch (type) {
    case 'image': {
      const sanitizedHTML = markdownIt({ break: true }).use(markdownItClass, { img: ['rcw-message-img'] }).render(`![](${href})`);
      return <div className="rcw-message-text is-attachment" dangerouslySetInnerHTML={{ __html: sanitizedHTML.replace(/\n$/, '') }} />;
    }
    default: {
      const sanitizedHTML = markdownIt({ break: true }).use(markdownItLinkAttributes, { attrs: { target: '_blank', rel: 'noopener' } }).render(`[${name}](${href})`);
      return <div className="rcw-message-text is-attachment" dangerouslySetInnerHTML={{ __html: sanitizedHTML.replace(/\n$/, '') }} />;
    }
  }
}

function Message({ message, showTimeStamp }: Props) {
  let sanitizedHTML: string | null = null;

  if (message.text) {
    sanitizedHTML = markdownIt({ break: true })
      .use(markdownItClass, {
        img: ['rcw-message-img']
      })
      .use(markdownItSup)
      .use(markdownItSanitizer)
      .use(markdownItLinkAttributes, { attrs: { target: '_blank', rel: 'noopener' } })
      .render(message.text);
  }

  const attachments: React.ReactPortal[] = [];
  if (message.props?.files) {
    attachments.push(message.props.files.map((item, i) => <FileAttachment key={i} item={item} />));
  }

  return (
    <Status message={message} showTimeStamp={showTimeStamp} showStatus>
      {sanitizedHTML && <div className="rcw-message-text" dangerouslySetInnerHTML={{ __html: sanitizedHTML.replace(/\n$/, '') }} />}
      {attachments}
    </Status>
  );
}

export default Message;
