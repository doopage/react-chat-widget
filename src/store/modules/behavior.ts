import { BehaviorState } from '@types';
import { proxy } from 'valtio';

const initialState: BehaviorState = {
  showChat: false,
  disabledInput: false,
  messageLoader: false
};

const state = proxy(initialState);

export function toggleChat() {
  state.showChat = !state.showChat;
}

export function toggleInputDisabled() {
  state.disabledInput = !state.disabledInput;
}

export function toggleMsgLoader() {
  state.messageLoader = !state.messageLoader;
}

export default state;
