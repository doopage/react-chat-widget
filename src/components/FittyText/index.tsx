import React, {useEffect, useRef} from 'react';
import fitty from 'fitty';
import './styles.scss';

export interface Props {
  children?: React.ReactNode;
  Element?: React.ElementType;
  className?: string;
  minSize?: number;
  maxSize?: number;
  multiLine?: boolean;
}

function FittyText({children, Element = 'div', minSize = 10, maxSize = 24, multiLine = false, ...props}: Props) {
  const textRef = useRef(null);

  useEffect(() => {
    if (!textRef.current) {
      return;
    }
    const el = textRef.current as HTMLElement;
    const elParent = el.parentElement as HTMLElement;
    el.classList.add('fit');
    el.addEventListener('fit', e => {
      const isOverflow = elParent.scrollWidth > elParent.clientWidth;
      el.classList.toggle('fit-overflow', isOverflow);
    });

    const fitInstance = fitty(el, {
      minSize,
      maxSize,
      multiLine,
    });

    return () => fitInstance.unsubscribe();
  }, [minSize, maxSize]);

  return (
    <Element ref={textRef} className="fitty-text"{...props}>
      {children}
    </Element>
  );
}

export default FittyText;
