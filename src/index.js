import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import PrayerImageGenerator from './PrayerImageGenerator';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <PrayerImageGenerator />
  </React.StrictMode>
);

reportWebVitals();
