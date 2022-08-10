import { FrappeGantt } from "frappe-gantt-react";
import * as React from "react";
import { GlobalContext } from "../stateManagment/Contexts/GlobalStateProvider";
import AddTask from "./Tasks/AddTask";

import "./chart.scss";

// importing antd components
import { DeleteFilled } from "@ant-design/icons";
import { Card } from "antd";
import Slider from "./CustomSliderAntd/Slider";

function Chart() {
  const globalCTX = React.useContext(GlobalContext);
  const [isEdit, setIsEdit] = React.useState(false);
  const [state, setState] = React.useState({
    show: false,
  });
  const [selectedBtn, setSelectedBtn] = React.useState(0);
  const [selectedTask, setSelectedTask] = React.useState(null);

  const handleModalState = () => {
    setState({ ...state, show: !state.show });
  };

  const click = (task) => {
    setSelectedTask(task);
    setIsEdit(true);
    handleModalState();
  };

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
                  <DeleteFilled
                    className="bold space-around capitalize"
                    onClick={() =>
                      globalCTX.handleDeleteTask(globalCTX.tasks[i])
                    }
                  ></DeleteFilled>
                </div>
              );
            })}
          </div>
        ) : null}
        <AddTask
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          selectedTask={selectedTask}
          date={globalCTX?.tasks?.find((item) => item.id === selectedBtn)}
          onChangeContent={globalCTX.handleUpdate}
          handleModalState={handleModalState}
          open={state.show}
          handleAddTask={(taskObj) => globalCTX.handleAddTask(taskObj)}
        />
      </div>
      <Card
        bordered={false}
        className="right"
        style={{ scrollbarWidth: "thin", overflow: "hidden" }}
      >
        {globalCTX.tasks?.length ? (
          <>
            <Slider />
            <div className="gantFrappe_container">
              <FrappeGantt
                tasks={globalCTX.tasks}
                viewMode={globalCTX.mode}
                onClick={(task) => click(task)}
                onDateChange={globalCTX.updatePosition} //aka on drag bar
                onProgressChange={(task, progress) =>
                  console.log(task, progress, "progress")
                }
                // onTasksChange={(tasks) => {
                // //
                // }}
              />
            </div>
          </>
        ) : null}
      </Card>
    </div>
  );
}

export default Chart;
