import { BehaviorState } from '@types';
import { proxy, subscribe } from 'valtio';

const initialState: BehaviorState = {
  showChat: false,
  disabledInput: false,
  messageLoader: false
};

const state = proxy(initialState);

export function toggleChat() {
  state.showChat = !state.showChat;
}

export function addToggleChatListener(f: (s: boolean) => void) {
  return subscribe(state, (changes) => {
    for (const [event, path, value] of changes) {
      if (event === 'set' && path.includes('showChat')) {
        f(value as boolean);
      }
    }
  });
}

export function toggleInputDisabled() {
  state.disabledInput = !state.disabledInput;
}

export function toggleMsgLoader() {
  state.messageLoader = !state.messageLoader;
}

export default state;
