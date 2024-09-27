import { PopupState } from '@types';
import { proxy, ref } from 'valtio';
import React from 'react';
import { assign } from 'lodash';

const initialState: PopupState = {
  showPopup: false,
  styles: {},
  component: null
};

const state = proxy(initialState);

export function hidePopup() {
  assign(state, initialState);
}

export function showPopup(component: React.FC, styles?: React.CSSProperties) {
  state.component = ref(component);
  if (styles) {
    state.styles = styles;
  }
  state.showPopup = true;
}

export default state;
