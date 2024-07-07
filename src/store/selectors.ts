import { useSnapshot } from 'valtio';
import state from './state';
import { Snapshot } from '@utils/types';
import { GlobalState } from '@types';

export const useSelector = <T>(selector: (state: Snapshot<GlobalState>) => T): T => selector(useSnapshot(state));

export function isWidgetOpened(): boolean {
  return state.behavior.showChat;
}
