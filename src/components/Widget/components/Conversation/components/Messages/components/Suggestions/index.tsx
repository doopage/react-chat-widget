import './styles.scss';
import React from 'react';
import { useSelector } from '@selectors';

type ItemProps = {
  align: string;
  text: string;
  onClick: () => void;
}

export type CProps = {
  onClick?: (text: string, next: () => void) => void;
}

function Item({ align, text, onClick }: ItemProps) {
  return <div className={`rcw-suggestion align-${align}`} dangerouslySetInnerHTML={{ __html: text }} onClick={onClick} />;
}

function Suggestions({ onClick }: CProps) {
  const { right, bottom } = useSelector(({ suggestions }) => ({
    right: suggestions.right,
    bottom: suggestions.bottom
  }));
  return (
    <div className="rcw-suggestions">
      {Object.entries(right).map(([text, next], i) => <Item key={i} align="right" text={text} onClick={onClick ? () => onClick(text, next) : next} />)}
      {Object.entries(bottom).map(([text, next], i) => <Item key={i} align="bottom" text={text} onClick={onClick ? () => onClick(text, next) : next} />)}
    </div>
  );
}

export default Suggestions;
