import cn from 'classnames';
import './style.scss';
import React, { useEffect, useRef, useState } from 'react';

const file = require('@assets/icon-file.svg') as string;
const close = require('@assets/close.svg') as string;
const plus = require('@assets/plus.svg') as string;

type CProps = {
  onSelectFile?: (event: any) => void;
  addFileRef?: React.MutableRefObject<() => void>;
  items: File[];
  height: number;
  maxItem?: number;
  showButton?: boolean;
  showIcon?: boolean;
  showName?: boolean;
  allowImage?: boolean;
  allowVideo?: boolean;
}

type FileProps = {
  item: File;
  onRemove?: () => void;
}

type FileAddProps = {
  onSelect?: (items: FileList) => void;
  addFileRef?: React.MutableRefObject<() => void>;
  showButton?: boolean;
  multiple?: boolean;
  allowImage?: boolean;
  allowVideo?: boolean;
}

type FileRemoveProps = {
  onClick: () => void;
}

function FileRemove({ onClick }: FileRemoveProps) {
  return (
    <button className="rcw-file-remove" onClick={onClick}>
      <img src={close} alt="" />
    </button>
  );
}

function FileImage({ item, onRemove }: FileProps) {
  const [url, setUrl] = useState<string | null>(null);
  useEffect(() => {
    setUrl(URL.createObjectURL(item));
  }, [item]);
  return (
    <div className="rcw-file rcw-file-type-image">
      {onRemove && <FileRemove onClick={onRemove} />}
      {url && <img src={url} alt="" />}
      <div className="rcw-file-name">&nbsp;</div>
    </div>
  );
}

function FileVideo({ item, onRemove }: FileProps) {
  const [url, setUrl] = useState<string | null>(null);
  useEffect(() => {
    setUrl(URL.createObjectURL(item));
  }, [item]);
  return (
    <div className="rcw-file rcw-file-type-image">
      {onRemove && <FileRemove onClick={onRemove} />}
      {url && <video src={url} />}
      <div className="rcw-file-name">&nbsp;</div>
    </div>
  );
}

function FileUnknown({ item, onRemove }: FileProps) {
  return (
    <div className="rcw-file rcw-file-type-unknown">
      {onRemove && <FileRemove onClick={onRemove} />}
      <img src={file} className="rcw-file-icon" alt="" />
      <div className="rcw-file-name" title={item.name}>{item.name}</div>
    </div>
  );
}

function FileAddButton({ onSelect, addFileRef, showButton, multiple, allowImage, allowVideo }: FileAddProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const handleClick = () => inputRef.current?.click();
  const handleFile = () => {
    const files = inputRef.current?.files;
    files && onSelect?.(files);
  };
  useEffect(() => {
    addFileRef && (addFileRef.current = handleClick);
  }, [addFileRef]);

  const accepts: string[] = [];
  if (allowImage) {
    accepts.push('image/*');
  }
  if (allowVideo) {
    accepts.push('video/*');
  }

  return (
    <div className="rcw-file rcw-file-add">
      {showButton && <>
        <button onClick={handleClick}>
          <img src={plus} className="rcw-file-icon" alt="" />
        </button>
        <div className="rcw-file-name">&nbsp;</div>
      </>}
      <input type="file" className="rcw-file-input" accept={accepts.join(',')} multiple={multiple} ref={inputRef} onChange={handleFile} />
    </div>
  );
}

const isImage = (file: File): boolean => file.type.startsWith('image/');

const isVideo = (file: File): boolean => file.type.startsWith('video/');

function FilePicker({ items, height, maxItem = 3, showButton = true, onSelectFile, addFileRef, allowImage, allowVideo }: CProps) {
  const removeIndex = (item: File) => {
    const newItems = items.filter(x => x !== item);
    onSelectFile?.(newItems.slice(-maxItem));
  };
  return (
    <aside className={cn('rcw-file-picker', { show: showButton || items.length })} style={{ height, width: '100%' }}>
      {items.map((item, i) => {
        if (isImage(item)) {
          return <FileImage key={i} item={item} onRemove={() => removeIndex(item)} />;
        }
        if (isVideo(item)) {
          return <FileVideo key={i} item={item} onRemove={() => removeIndex(item)} />;
        }
        return <FileUnknown key={i} item={item} onRemove={() => removeIndex(item)} />;
      })}
      <FileAddButton
        showButton={items.length ? items.length < maxItem : showButton}
        addFileRef={addFileRef}
        multiple={maxItem > 1}
        allowImage={allowImage}
        allowVideo={allowVideo}
        onSelect={files => {
          let newItems = [...items, ...files];
          if (allowImage || allowVideo) {
            newItems = newItems.filter(item => (allowImage && isImage(item)) || (allowVideo && isVideo(item)));
          }
          if (newItems.length > 0) {
            onSelectFile?.(newItems.slice(-maxItem));
          }
        }} />
    </aside>
  );
}

export default FilePicker;
