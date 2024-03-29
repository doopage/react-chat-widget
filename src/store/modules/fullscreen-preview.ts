import { FullscreenPreviewState, ImageState } from '@types';
import { proxy } from 'valtio';

const initialState: FullscreenPreviewState = {
  src: '',
  alt: '',
  width: 0,
  height: 0,
  visible: false
};

const state = proxy(initialState);

export function openFullscreenPreview(payload: ImageState) {
  const { src, width, height } = payload;
  Object.assign(state, { src, width, height, visible: true });
}

export function closeFullscreenPreview() {
  Object.assign(state, initialState);
}

export default state;
