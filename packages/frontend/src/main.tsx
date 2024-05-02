import '@/styles/global.css';

import React from 'react';
import ReactDOM from 'react-dom/client';

import { TailwindIndicator } from '@/components/utils';
import { Providers } from '@/providers/index.tsx';

ReactDOM.createRoot(document.querySelector('#app')!).render(
  <React.StrictMode>
    <Providers />
    <TailwindIndicator />
  </React.StrictMode>,
);
