import './style.scss';
import { useEffect, useState } from 'react';

export type Props = {
  text: string;
  onResize?: (w: number, h: number) => void;
}

function Popup({ text, onResize }: Props) {
  const [isClosed, setIsClosed] = useState(false);

  useEffect(() => {
    const el = document.querySelector('.rcw-popup') as HTMLElement | null;
    if (el) {
      el.style.top = `-${el.clientHeight + 5}px`;
    }
    onResize?.(el?.clientWidth ?? 0, el?.clientHeight ?? 0);
  }, [text, isClosed, onResize]);

  if (isClosed) {
    return null;
  }

  return <div className="rcw-popup">
    <button className="close-btn" onClick={() => setIsClosed(true)}>X</button>
    <p>{text}</p>
  </div>;
}

export default Popup;
