import React from 'react';
import ReactDOM from 'react-dom/client';
import Gantt from './Gantt';

// css importing
import "antd/dist/antd.min.css";
import "./GanttChart/style/chart-styles.scss";
import "./GanttChart/style/styles.scss"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Gantt />
  </React.StrictMode>
);

