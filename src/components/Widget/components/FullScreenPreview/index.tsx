import { ReactNode, useEffect } from 'react';
import ReactDOM from 'react-dom';
import usePreview from './usePreview';
import usePortal from './usePortal';
import './styles.scss';
import { closeFullscreenPreview } from '@actions';
import { useSelector } from '@selectors';
import Img from '@components/Img';

const close = require('@assets/close.svg') as string;
const plus = require('@assets/plus.svg') as string;
const minus = require('@assets/minus.svg') as string;
const zoomIn = require('@assets/zoom-in.svg') as string;
const zoomOut = require('@assets/zoom-out.svg') as string;

type Props = {
  fullScreenMode?: boolean;
  zoomStep?: number
}

export default function FullScreenPreview({ fullScreenMode, zoomStep }: Props) {
  const {
    state,
    initFileSize,
    onZoomIn,
    onZoomOut,
    onResizePageZoom
  } = usePreview(zoomStep);

  const { src, alt, width, height, visible } = useSelector(({ preview }) => preview);

  useEffect(() => {
    if (src) {
      initFileSize(width, height);
    }
  }, [src]);

  const pDom = usePortal();

  const onClosePreview = () => {
    closeFullscreenPreview();
  };

  const childNode: ReactNode = (
    <div className="rcw-previewer-container">
      <div className="rcw-previewer-veil">
        <Img{...state.layout} src={src} className="rcw-previewer-image" alt={alt} />
      </div>
      <button
        className="rcw-previewer-button rcw-previewer-close-button"
        onClick={onClosePreview}
      >
        <Img src={close} className="rcw-previewer-icon" />
      </button>
      <div className="rcw-previewer-tools">
        <button
          className="rcw-previewer-button"
          onClick={onResizePageZoom}
        >
          <img
            src={state.zoom ? zoomOut : zoomIn}
            className="rcw-previewer-icon"
            alt="reset zoom"
          />
        </button>

        <button
          className="rcw-previewer-button"
          onClick={onZoomIn}
        >
          <Img src={plus} className="rcw-previewer-icon" alt="zoom in" />
        </button>
        <button
          className="rcw-previewer-button"
          onClick={onZoomOut}
        >
          <Img src={minus} className="rcw-previewer-icon" alt="zoom out" />
        </button>
      </div>
    </div>
  );

  return visible ? ReactDOM.createPortal(childNode, pDom) : null;
}
