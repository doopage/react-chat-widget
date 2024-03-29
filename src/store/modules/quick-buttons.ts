import { createQuickButton } from '@utils/messages';
import { QuickButtonsState } from '@types';
import { proxy } from 'valtio';

const initialState: QuickButtonsState = {
  quickButtons: []
};

const state = proxy(initialState);

export function setQuickButtons(buttons: Array<{ label: string, value: string | number }>) {
  state.quickButtons = buttons.map(button => createQuickButton(button));
}

export default state;
