import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// css importing
import "antd/dist/antd.min.css";
import "./chart-styles.scss";
import "./styles.scss"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

