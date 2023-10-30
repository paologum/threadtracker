import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './AppRouter'
import { context, initialContext } from './util';
import './main.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <context.Provider value={initialContext}>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </context.Provider>
  </React.StrictMode>,
);
