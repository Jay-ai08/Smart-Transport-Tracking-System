import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';
import { ThemeProvider } from './context/ThemeContext';
import { TransportProvider } from './context/TransportContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <TransportProvider>
          <App />
        </TransportProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
