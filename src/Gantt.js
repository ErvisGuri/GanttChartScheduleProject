import * as React from "react"
import Chart from "./GanttChart/components/chart/chart.jsx";
import GlobalStateProvider from "./GanttChart/stateManagement/Contexts/GlobalStateProvider";

function Gantt({ handleAddTask, handleChange, handleClose, handleDeleteTask, handleSubmit, handleUpdate }) {
  return (
    <GlobalStateProvider>
      <div>
        <Chart />
      </div>
    </GlobalStateProvider>
  );
}

export default Gantt;
