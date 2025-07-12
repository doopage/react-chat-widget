import { ImgHTMLAttributes } from 'react';

export type Props = ImgHTMLAttributes<HTMLImageElement>;

function Img({ ...props }: Props) {
  props.draggable = false;
  return <img {...props} />;
}

export default Img;
