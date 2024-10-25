import { SuggestionsState } from '@types';
import { proxy } from 'valtio';
import { assign } from 'lodash';

const initialState: SuggestionsState = {
  showSuggestion: false,
  right: {},
  bottom: {}
};

const state = proxy(initialState);

export function hideSuggestions() {
  assign(state, initialState);
}

export function showSuggestions(right: Record<string, () => void>, bottom: Record<string, () => void>) {
  state.right = right;
  state.bottom = bottom;
  state.showSuggestion = true;
}

export default state;
