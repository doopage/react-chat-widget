import behavior from './modules/behavior';
import messages from './modules/messages';
import quickButtons from './modules/quick-buttons';
import preview from './modules/fullscreen-preview';
import popup from './modules/popup';
import suggestions from './modules/suggestions';
import { proxy } from 'valtio';

const state = proxy({ behavior, messages, quickButtons, preview, popup, suggestions });

export default state;
