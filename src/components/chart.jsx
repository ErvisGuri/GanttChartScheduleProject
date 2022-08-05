import { IconButton, Paper, Avatar } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import { FrappeGantt } from "frappe-gantt-react";
import * as React from "react";
import { GlobalContext } from "../stateManagment/Contexts/GlobalStateProvider";
import "./chart.scss";
import Slider from "./CustomSlider";
import AddTask from "./Tasks/AddTask";
import Modal1 from "./Tasks/Modal/Modal";
import { useState } from "react";

function Chart() {
  const globalCTX = React.useContext(GlobalContext);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  console.log(globalCTX);

  return (
    <div className="chart">
      <div className="left">
        {globalCTX.labels?.length ? (
          <div className="labels">
            {globalCTX.labels.map((x, i) => {
              return (
                <div key={x + i} className="label">
                  <div>
                    <span className="tiny-circle">{i}</span>
                    <span className="bold space-around capitalize">{x}</span>
                  </div>
                  <IconButton
                    className="bold space-around capitalize"
                    onClick={() =>
                      globalCTX.handleDeleteTask(globalCTX.tasks[i])
                    }
                  >
                    <Delete />
                  </IconButton>
                </div>
              );
            })}
          </div>
        ) : null}
        <AddTask
          handleAddTask={(taskObj) => globalCTX.handleAddTask(taskObj)}
        />
      </div>
      <Paper
        elevation={0}
        className="right"
        style={{ scrollbarWidth: "thin", overflow: "hidden" }}
      >
        {globalCTX.tasks?.length ? (
          <>
            <Slider />
            <FrappeGantt
              tasks={globalCTX.tasks}
              viewMode={globalCTX.mode}
              onClick={() => {
                showModal();
              }}
              onDateChange={globalCTX.updatePosition} //aka on drag bar
              onProgressChange={(task, progress) =>
                console.log(task, progress, "progress")
              }
              // onTasksChange={(tasks) => {
              // //
              // }}
            />
          </>
        ) : null}
      </Paper>
      <Modal1
        isModalVisible={isModalVisible}
        handleCancel={handleCancel}
        handleOk={handleOk}
      />
    </div>
  );
}

export default Chart;
