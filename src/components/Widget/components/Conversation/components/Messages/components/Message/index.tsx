import markdownIt from 'markdown-it';
import markdownItSup from 'markdown-it-sup';
import markdownItSanitizer from 'markdown-it-sanitizer';
import markdownItClass from '@toycode/markdown-it-class';
import markdownItLinkAttributes from 'markdown-it-link-attributes';
import { imgSize } from '@mdit/plugin-img-size';
import { attrs } from '@mdit/plugin-attrs';

import { MessageTypes } from '@types';

import './styles.scss';
import React, { useEffect, useState } from 'react';
import Status from '../Status';
import { useSelector } from '@selectors';

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
  const [type, setType] = useState(item.type ?? item.file_type);
  useEffect(() => {
    if (item instanceof File) {
      setName(item.name);
      setHref(URL.createObjectURL(item));
      let itemType = item.type;
      if (itemType.startsWith('image/')) {
        setType('image');
      } else if (itemType.startsWith('video/')) {
        setType('video');
      } else {
        setType(itemType);
      }
    } else {
      console.error('Invalid item', item);
    }
  }, [item]);
  switch (type) {
    case 'image': {
      const sanitizedHTML = markdownIt().use(markdownItClass, { img: ['rcw-message-img'] }).render(`![](${href})`);
      return <div className="rcw-message-text is-attachment" dangerouslySetInnerHTML={{ __html: sanitizedHTML.replace(/\n$/, '') }} />;
    }
    case 'video': {
      const sanitizedHTML = markdownIt({ html: true }).use(markdownItClass, { video: ['rcw-message-video'] }).render(`<video src="${href}" controls />`);
      return <div className="rcw-message-text is-attachment" dangerouslySetInnerHTML={{ __html: sanitizedHTML.replace(/\n$/, '') }} />;
    }
    default: {
      const sanitizedHTML = markdownIt().use(markdownItLinkAttributes, { attrs: { target: '_blank', rel: 'noopener' } }).render(`[${name}](${href})`);
      return <div className="rcw-message-text is-attachment" data-type={type} dangerouslySetInnerHTML={{ __html: sanitizedHTML.replace(/\n$/, '') }} />;
    }
  }
}

function Message({ message, showTimeStamp }: Props) {
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

  return (
    <Status message={message} showTimeStamp={showTimeStamp} locale={locale} showStatus>
      {sanitizedHTML && <div className="rcw-message-text" dangerouslySetInnerHTML={{ __html: sanitizedHTML.replace(/\n$/, '') }} />}
      {attachments}
    </Status>
  );
}

export default Message;
