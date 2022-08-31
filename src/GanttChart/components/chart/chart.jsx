import * as React from "react";
import { useContext, useState } from "react";
import { GlobalContext } from "../../stateManagement/Contexts/GlobalStateProvider";
import { FrappeGantt } from "frappe-gantt-react";
import { FilterModal } from "./FilterModal/FilterModal";

import "./chart.scss";
import "antd/dist/antd.min.css";

// importing antd components
import { FilterFilled } from "@ant-design/icons";
import { Card, Input } from "antd";
import { Stepper } from "../Stepper";
import { statusTitle } from "../Stepper/utils/statusTitle";
import ScheduleDetailsModal from "../Schedule/MainModal";
const { Search } = Input;
const initials = statusTitle;

function Chart() {
  const globalCTX = useContext(GlobalContext);
  const [isEdit, setIsEdit] = useState(false);
  const [visibleTask, setVisibleTask] = useState(false);
  const [visibleFilter, setVisibleFilter] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [currentStep, setCurrentStep] = useState(3);
  const [stepperTitle, setStepperTitle] = useState(initials);
  const [searchTask, setSearchTask] = useState(globalCTX);
  const [searchActive, setSearchActive] = useState(false);

  const handleChangeSearch = (e) => {
    let substring = e.target.value;
    console.log(substring);
    let data = globalCTX?.tasks?.filter?.((item) =>
      item?.name?.toLowerCase().includes(substring.toLowerCase())
    );

    let search = {
      deleted: globalCTX.deleted,
      labels: globalCTX.labels,
      mode: globalCTX.mode,
      setState: globalCTX.setState,
      state: globalCTX.state,
      tasks: data,
    };
    substring !== undefined || substring !== "" || substring !== null
      ? setSearchActive(true)
      : setSearchActive(false);
    setSearchTask(search);
  };

  const onClickFilter = () => {
    setVisibleFilter(true);
  };

  const handleModalTask = () => {
    setVisibleTask({ ...visibleTask, show: !visibleTask.show });
  };

  const click = (task) => {
    setSelectedTask(task);
    handleModalTask();
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
      <div className="headerChart">
        <div className="header-div">
          <div className="labelsHeader">
            <h2 className="labelHeaderText">Timeline Schedule</h2>
          </div>
          <div className="searchBar">
            <Search onChange={(e) => handleChangeSearch(e)} />
            <FilterFilled onClick={() => onClickFilter()} />
          </div>
        </div>
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
              {searchActive === false
                ? globalCTX.labels.map((x, i) => {
                    return (
                      <div key={x + i} className="label">
                        <span className="tiny-circle">{i}</span>
                        <span className="bold space-around capitalize">
                          {x}
                        </span>
                      </div>
                    );
                  })
                : searchTask?.labels?.map?.((x, i) => {
                    return (
                      <div key={x + i} className="label">
                        <span className="tiny-circle">{i}</span>
                        <span className="bold space-around capitalize">
                          {x}
                        </span>
                      </div>
                    );
                  })}
            </div>
          ) : null}
          <ScheduleDetailsModal
            isEdit={isEdit}
            setIsEdit={setIsEdit}
            selectedTask={selectedTask}
            handleClose={handleModalTask}
            open={visibleTask.show}
          />
        </div>
        <Card bordered={false} className="right">
          {globalCTX.tasks?.length ? (
            searchActive === false ? (
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
            ) : (
              <div className="gantFrappe_container">
                <FrappeGantt
                  tasks={searchTask.tasks}
                  viewMode={searchTask.mode}
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
            )
          ) : null}
        </Card>
      </div>
      <FilterModal
        visibleFilter={visibleFilter}
        setVisibleFilter={setVisibleFilter}
      />
    </div>
  );
}

export default Chart;
