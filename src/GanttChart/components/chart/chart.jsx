import * as React from "react";
import { useContext, useState } from "react";
import { GlobalContext } from "../../stateManagement/Contexts/GlobalStateProvider";
import { FrappeGantt } from "frappe-gantt-react";

import "./chart.scss";
import "antd/dist/antd.min.css";

// importing antd components
// import { DeleteFilled } from "@ant-design/icons";
import { Card } from "antd";
import { Stepper } from "../Stepper";
import { statusTitle } from "../Stepper/utils/statusTitle";
import ScheduleDetailsModal from "../Schedule/MainModal";

const initials = statusTitle;

function Chart() {
  const globalCTX = useContext(GlobalContext);
  const [isEdit, setIsEdit] = useState(false);
  const [state, setState] = useState({
    show: false,
  });
  const [selectedTask, setSelectedTask] = useState(null);
  const [currentStep, setCurrentStep] = useState(3);
  const [stepperTitle, setStepperTitle] = useState(initials);

  const handleModalState = () => {
    setState({ ...state, show: !state.show });
  };

  const click = (task) => {
    setSelectedTask(task);
    handleModalState();
  };

  const handleChange = (value) => {
    let temp;

    if (value === 0) {
      temp = "Quarter Day";
    }
    if (value === 1) {
      temp = "Half Day";
    }
    if (value === 2) {
      temp = "Day";
    }
    if (value === 3) {
      temp = "Week";
    }
    if (value === 4) {
      temp = "Month";
    }

    if (globalCTX !== undefined) {
      globalCTX.setState({ ...globalCTX, mode: temp });
    }
  };

  return (
    <div className="chart">
      <div className="header-div">
        <h2 className="labelsHeader">Timeline Schedule</h2>
        <div className="stepperDiv">
          <Stepper
            stepRenderer={false}
            setCurrentStep={setCurrentStep}
            onChange={(e) => handleChange(e)}
            currentStep={currentStep}
            stepperClassName="formStepper"
            steps={stepperTitle}
          />
        </div>
      </div>
      <div className="chartLabel">
        <div className="left">
          {globalCTX.labels?.length ? (
            <div className="labels">
              {globalCTX.labels.map((x, i) => {
                return (
                  <div key={x + i} className="label">
                    <span className="tiny-circle">{i}</span>
                    <span className="bold space-around capitalize">{x}</span>
                  </div>
                );
              })}
            </div>
          ) : null}
          <ScheduleDetailsModal
            isEdit={isEdit}
            setIsEdit={setIsEdit}
            selectedTask={selectedTask}
            onChangeContent={globalCTX.handleUpdate}
            handleClose={handleModalState}
            open={state.show}
            handleAddTask={(taskObj) => globalCTX.handleAddTask(taskObj)}
          />
        </div>
        <Card bordered={false} className="right">
          {globalCTX.tasks?.length ? (
            <div className="gantFrappe_container">
              <FrappeGantt
                tasks={globalCTX.tasks}
                viewMode={globalCTX.mode}
                onClick={(task) => click(task)}
                onDateChange={(task, start, end) =>
                  console.log(task, start, end)
                } //aka on drag bar
                onProgressChange={(task, progress) =>
                  console.log(task, progress, "progress")
                }
                onTasksChange={(task) => console.log(task, "tasks")}
              />
            </div>
          ) : null}
        </Card>
      </div>
    </div>
  );
}

export default Chart;
