import React, { RefObject, useEffect } from 'react';
import './styles.scss';

export type Props = {
  anchor: RefObject<HTMLDivElement>;
  margin?: number;
  background?: string;
  className?: string;
  children: React.ReactNode;
}

export function Area({ anchor, margin, background, className, children }: Props) {
  const [rect, setRect] = React.useState<Pick<DOMRect, 'width' | 'height' | 'top' | 'left'> | null>(null);

  useEffect(() => {
    if (anchor?.current) {
      const el = anchor.current;
      const ob = new ResizeObserver(() => {
        const { width, height } = el.getBoundingClientRect();
        setRect({ width, height, top: el.offsetTop, left: el.offsetLeft });
      });
      ob.observe(el);
    }
  }, [anchor]);
  if (!rect) {
    return null;
  }
  return (<div className={`rcw-messages-area ${className}`} style={{
    width: rect.width - (margin ? 2 * margin : 0),
    height: rect.height - (margin ? 2 * margin : 0),
    left: rect.left + (margin ?? 0),
    top: rect.top + (margin ?? 0),
    background
  }}>{children}</div>);
}

export default Area;
