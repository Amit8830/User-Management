import React from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';

import { BrowserRouter as Router } from 'react-router-dom'; // Use the appropriate router component

import App from './App';

const root = createRoot(document.getElementById('root'));

root.render(
  <Router>
    <App />
  </Router>
);
