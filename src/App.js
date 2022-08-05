import * as React from "react"

import Chart from "./components/chart";

import "./chart-styles.scss";
import "./styles.scss"

import GlobalStateProvider from "./stateManagment/Contexts/GlobalStateProvider"
function App() {
  return (
    <GlobalStateProvider>
      <div style={{ marginLeft: '580px' }}><h2>Gantt Chart Timeline Task</h2></div>
      <div
        style={{
          scrollbarWidth: "thin",
          borderRadius: 32
        }} >
        <Chart />
      </div>
    </GlobalStateProvider>
  );
}

export default App;
