import { IconButton, Paper } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import { FrappeGantt } from "frappe-gantt-react";
import * as React from "react";
import { GlobalContext } from "../stateManagment/Contexts/GlobalStateProvider";
import "./chart.scss";
import Slider from "./CustomSlider";
import AddTask from "./Tasks/AddTask";
import { Tooltip } from "antd";

function Chart() {
  const globalCTX = React.useContext(GlobalContext);
  const [isEdit, setIsEdit] = React.useState(false);
  const [state, setState] = React.useState({
    show: false,
  });
  const [selectedBtn, setSelectedBtn] = React.useState(0);
  const noderef = React.useRef(null);

  const onChangeContent = (id) => {
    setSelectedBtn(id);
  };

  console.log(selectedBtn);

  const handleClick = () => {
    setState({ ...state, show: !state.show });
  };

  const click = (event) => {
    console.log("3", event);
    // if (event.detail === 2) {
    handleClick();
    // }
  };

  return (
    <div className="chart">
      <div noderef={noderef} className="left">
        {globalCTX.labels?.length ? (
          <div className="labels">
            {globalCTX.labels.map((x, i) => {
              return (
                <div noderef={noderef} key={x + i} className="label">
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
          idEdit={isEdit}
          setIsEdit={setIsEdit}
          date={globalCTX?.tasks?.find((item) => item.id === selectedBtn)}
          onChangeContent={onChangeContent}
          handleClick={handleClick}
          open={state.show}
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
              onClick={() => click()}
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
      {/* <Modal1
        isModalVisible={isModalVisible}
        handleCancel={handleCancel}
        handleOk={handleOk}
      /> */}
    </div>
  );
}

export default Chart;
