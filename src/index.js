import React from 'react';
import { createRoot } from 'react-dom/client'; // Cambio de importación
import '../src/scss/App.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';

const root = createRoot(document.getElementById('root')); // Uso de createRoot desde react-dom/client
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
