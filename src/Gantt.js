import * as React from "react"
import Chart from "./GanttChart/components/chart/chart.jsx";
import GlobalStateProvider from "./GanttChart/stateManagement/Contexts/GlobalStateProvider";

function Gantt({ handleAddTask, handleChange, handleClose, handleDeleteTask, handleSubmit, handleUpdate }) {
  return (
    <GlobalStateProvider>
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

export default Gantt;
