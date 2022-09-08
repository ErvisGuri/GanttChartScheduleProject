import * as React from "react";
import { useContext, useState, useEffect } from "react";
import { FrappeGantt } from "frappe-gantt-react";
import { GlobalContext } from "../../stateManagement/GlobalStateProvider";
import { FilterModal } from "../FilterModal/FilterModal";
import ScheduleDetailsModal from "../ScheduleModal";

// importing antd components
import CustomSlider from "../Slider/Slider";
import { FilterFilled, SearchOutlined } from "@ant-design/icons";
import { Card, Input, Button, Popover } from "antd";

import "antd/dist/antd.min.css";
import "./chart.scss";

const { Search } = Input;

function Chart() {
  const globalCTX = useContext(GlobalContext); //call global state from stateManagement file
  const [selectedTask, setSelectedTask] = useState(null); //when click on selectTask, calling all data in dataSchedule
  const [visibleTask, setVisibleTask] = useState(false);
  const [visibleFilter, setVisibleFilter] = useState(false);
  const [searchTasks, setSearchTasks] = useState(globalCTX?.tasks); // get all tasks and update main state with searched one
  const [filterTask, setFilterTask] = useState([]); //same as searchTask
  const [activeFilters, setActiveFilters] = useState([]); // get selected input filters in filterModal and store in state
  const [popover, setPopover] = useState(false);
  //searchFilter function
  const handleChangeSearch = (e) => {
    let substring = e.target.value;
    let data = globalCTX?.tasks?.filter?.((item) =>
      item?.name?.toLowerCase().includes(substring.toLowerCase())
    );
    if (substring === undefined || substring === "" || substring === null) {
      setSearchTasks(globalCTX.tasks);
    } else {
      setSearchTasks(data.length ? data : globalCTX.tasks);
    }
  };

  //Make visible FilterModal
  const onClickFilter = () => {
    setVisibleFilter(true);
  };

  //makeVisible TaskModal
  const handleModalTask = () => {
    setVisibleTask({ ...visibleTask, show: !visibleTask.show });
  };

  //Open ModalTask
  const click = (task) => {
    setSelectedTask(task);
    handleModalTask();
  };

  useEffect(() => {
    if (!!globalCTX) {
      setSearchTasks(globalCTX?.tasks);
    }
  }, [globalCTX.tasks]);

  const content = () => {
    activeFilters.flatMap((el) => {
      console.log(el);
      return (
        <div>
          <div>{el}</div>
        </div>
      );
    });
  };

  console.log(activeFilters.flatMap((el) => el));

  return (
    <div className="chart">
      <div className="headerChart">
        <div className="header-div">
          <div className="labelsHeader">
            <h2 className="labelHeaderText">Timeline Schedule</h2>
          </div>
          <div className="ganttFilters">
            <div className="searchBar">
              <Search
                allowClear
                prefix={<SearchOutlined />}
                placeholder="Search"
                onChange={(e) => handleChangeSearch(e)}
              />
              <>
                <Button
                  className="ganttFilterBtn"
                  onClick={() => onClickFilter()}
                  icon={<FilterFilled />}
                >
                  Apply Data
                </Button>
              </>
            </div>
            <div className="activeFilters">
              <>
                {activeFilters?.length > 0 && (
                  <div className="info-cont">
                    <p className="activeLabel">
                      There are <b>{activeFilters?.length}</b> filters applied,{" "}
                      <Popover content={content} title="Title">
                        <span className="actFiltersPopOver">see more.</span>
                      </Popover>
                    </p>
                  </div>
                )}
              </>
            </div>
          </div>
        </div>
        <div className="stepperDiv">
          <CustomSlider />
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
              onDateChange={(task, start, end) => console.log(task, start, end)}
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
            setActiveFilters={setActiveFilters}
          />
        )}
      </div>
    </div>
  );
}

export default Chart;
