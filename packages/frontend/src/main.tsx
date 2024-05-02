import './index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';

import { Providers } from '@/providers/index.tsx';

import App from './App.tsx';

ReactDOM.createRoot(document.querySelector('#root')!).render(
  <React.StrictMode>
    <Providers>
      <App />
    </Providers>
  </React.StrictMode>,
);
