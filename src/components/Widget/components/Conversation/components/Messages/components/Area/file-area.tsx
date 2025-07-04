import React, { RefObject, useEffect } from 'react';
import { FileUploader } from 'react-drag-drop-files';
import Area from './area';

export type Props = {
  anchor: RefObject<HTMLDivElement>;
  handleChange: (file: File | File[]) => void;
}

export function FileArea({ anchor, handleChange }: Props) {
  const [isDragging, setIsDragging] = React.useState(false);

  useEffect(() => {
    document.addEventListener('dragenter', () => setIsDragging(true));
    document.addEventListener('dragover', () => setIsDragging(true));
    // document.addEventListener('dragleave', () => setIsDragging(false));
    document.addEventListener('drop', () => setIsDragging(false));
  }, []);

  const changeHandler = (f: File | File[]) => {
    setIsDragging(false);
    handleChange(f);
  };

  if (!isDragging) {
    return null;
  }

  return (<Area margin={10} background="rgba(255, 255, 255, 0.7)" anchor={anchor} className="file-uploader">
    <FileUploader handleChange={changeHandler} />
    <div className="close" onClick={() => setIsDragging(false)}>
      <div className="btn">&times;</div>
    </div>
  </Area>);
}

export default FileArea;
