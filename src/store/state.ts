import behavior from './modules/behavior';
import messages from './modules/messages';
import quickButtons from './modules/quick-buttons';
import preview from './modules/fullscreen-preview';
import popup from './modules/popup';
import suggestions from './modules/suggestions';
import notification from './modules/notifications';
import { proxy } from 'valtio';

const state = proxy({ behavior, messages, quickButtons, preview, popup, suggestions, notification });

export default state;
