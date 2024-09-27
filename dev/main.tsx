import { createRoot } from 'react-dom/client';

import App from './App';
import Simple from './Simple';
import Popup from './Popup';

const rootElement = document.getElementById('root');

if (rootElement === null) {
  throw new Error('Could not find root element');
}

const root = createRoot(rootElement);

root.render(<App />);
// root.render(<Simple />);
// root.render(<Popup />);
