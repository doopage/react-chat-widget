import './style.scss';
import { useEffect, useState } from 'react';

export type Props = {
  text: string | readonly string[];
  onResize?: (w: number, h: number) => void;
}

function Popup({ text, onResize }: Props) {
  const [isClosed, setIsClosed] = useState(false);

  useEffect(() => {
    const el = document.querySelector('.rcw-popup') as HTMLElement | null;
    if (el) {
      // el.style.bottom = `-${el.clientHeight + 5}px`;
    }
    onResize?.(el?.clientWidth ?? 0, el?.clientHeight ?? 0);
  }, [text, isClosed, onResize]);

  if (isClosed) {
    return null;
  }

  const texts = Array.isArray(text) ? text : [text];

  return <div className="rcw-popup">
    <div className="close-container">
      <button className="close-btn" onClick={() => setIsClosed(true)}>&times;</button>
    </div>
    {texts.map((text, i) => <p key={i}>{text.length > 100 ? text.slice(0, 100) + ' ...' : text}</p>)}
  </div>;
}

export default Popup;
