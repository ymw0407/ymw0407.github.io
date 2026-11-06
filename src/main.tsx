import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { normalizeEntryUrl } from './utils/entryUrl';

const entry = normalizeEntryUrl(window.location.href);
if (entry !== window.location.href) history.replaceState(history.state, '', entry);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
