import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { normalizeEntryUrl } from './utils/entryUrl';

const root = document.getElementById('root')!;
const notFoundDocument = root.hasAttribute('data-not-found');

if (!notFoundDocument) {
  const entry = normalizeEntryUrl(window.location.href);
  if (entry !== window.location.href) history.replaceState(history.state, '', entry);
}

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <App notFoundDocument={notFoundDocument} />
  </React.StrictMode>
);
