import './style.scss';
import { useState } from 'react';

type Props = {
  text: string;
}

function Popup({ text }: Props) {
  const [isClosed, setIsClosed] = useState(false);

  if (isClosed) {
    return null;
  }

  return <div className="rcw-popup">
    <button className="close-btn" onClick={() => setIsClosed(true)}>X</button>
    <p>{text}</p>
  </div>;
}

export default Popup;
