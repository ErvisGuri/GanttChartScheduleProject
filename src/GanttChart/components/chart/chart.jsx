import * as React from "react";
import { useContext, useState, useEffect } from "react";
import { GlobalContext } from "../../stateManagement/GlobalStateProvider";
import { FrappeGantt } from "frappe-gantt-react";
import { FilterModal } from "./FilterModal/FilterModal";

import "./chart.scss";
import "antd/dist/antd.min.css";

// importing antd components
import { FilterFilled, SearchOutlined } from "@ant-design/icons";
import { Card, Input, Button } from "antd";
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
  const [searchTasks, setSearchTasks] = useState(globalCTX?.tasks);
  const [filterTask, setFilterTask] = useState([]);

  const handleChangeSearch = (e) => {
    let substring = e.target.value;
    // console.log(substring);
    let data = globalCTX?.tasks?.filter?.((item) =>
      item?.name?.toLowerCase().includes(substring.toLowerCase())
    );

    if (substring === undefined || substring === "" || substring === null) {
      setSearchTasks(globalCTX.tasks);
    } else {
      setSearchTasks(data.length ? data : globalCTX.tasks);
    }
  };

  const onClickFilter = () => {
    setVisibleFilter(true);
  };

  const handleModalTask = () => {
    setVisibleTask({ ...visibleTask, show: !visibleTask.show });
  };

  const click = React.useCallback((task) => {
    setSelectedTask(task);
    handleModalTask();
  }, []);

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

  // console.log(searchTasks);

  useEffect(() => {
    if (!!globalCTX) {
      setSearchTasks(globalCTX?.tasks);
    }
  }, [globalCTX.tasks]);

  // console.log("sfasf", filterTask);

  return (
    <div className="chart">
      <div className="headerChart">
        <div className="header-div">
          <div className="labelsHeader">
            <h2 className="labelHeaderText">Timeline Schedule</h2>
          </div>
          <div className="searchBar">
            <Search
              allowClear
              prefix={<SearchOutlined />}
              placeholder="Search"
              onChange={(e) => handleChangeSearch(e)}
            />
            <div>
              <Button
                className="ganttFilterBtn"
                onClick={() => onClickFilter()}
                icon={<FilterFilled />}
              >
                Apply Data
              </Button>
            </div>
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
          <div className="labels">
            {filterTask.length
              ? filterTask?.map((x, i) => {
                  return (
                    <div key={x?.name + i} className="label">
                      <span className="bold space-around capitalize">
                        {x.name}
                      </span>
                    </div>
                  );
                })
              : searchTasks?.map?.((x, i) => {
                  return (
                    <div key={x?.name + i} className="label">
                      <span className="bold space-around capitalize">
                        {x.name}
                      </span>
                    </div>
                  );
                })}
          </div>
          <ScheduleDetailsModal
            isEdit={isEdit}
            setIsEdit={setIsEdit}
            selectedTask={selectedTask}
            handleClose={handleModalTask}
            open={visibleTask.show}
          />
        </div>
        <Card bordered={false} className="right">
          <div className="gantFrappe_container">
            <FrappeGantt
              tasks={filterTask.length ? filterTask : searchTasks}
              viewMode={globalCTX.mode}
              onClick={(task) => click(task)}
              onDateChange={(task, start, end) => console.log(task, start, end)} //aka on drag bar
              onProgressChange={(task, progress) =>
                console.log(task, progress, "progress")
              }
              onTasksChange={(task) => console.log(task, "tasks")}
            />
          </div>
        </Card>
        {visibleFilter && (
          <FilterModal
            filterTask={filterTask}
            setFilterTask={setFilterTask}
            visibleFilter={visibleFilter}
            setVisibleFilter={setVisibleFilter}
          />
        )}
      </div>
    </div>
  );
}

export default Chart;
