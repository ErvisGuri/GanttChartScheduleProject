import * as React from "react";
import { useContext, useState, useEffect, useCallback } from "react";
import { GlobalContext } from "../../stateManagement/GlobalStateProvider";
import { FrappeGantt } from "frappe-gantt-react";
import { FilterModal } from "../FilterModal/FilterModal";
import CustomSlider from "../Slider/Slider";
import moment from "moment";
import "./chart.scss";
import "antd/dist/antd.min.css";

// importing antd components
import { FilterFilled, SearchOutlined } from "@ant-design/icons";
import { Card, Input, Button, Form } from "antd";
import ScheduleDetailsModal from "../ScheduleModal";

const { Search } = Input;

function Chart() {
  const globalCTX = useContext(GlobalContext);
  const [isEdit, setIsEdit] = useState(false);
  const [visibleTask, setVisibleTask] = useState(false);
  const [visibleFilter, setVisibleFilter] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [searchTasks, setSearchTasks] = useState(globalCTX?.tasks);
  const [filterTask, setFilterTask] = useState([]);
  const [activeFilters, setActiveFilters] = useState([]);

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

  const click = useCallback((task) => {
    setSelectedTask(task);
    handleModalTask();
  }, []);

  useEffect(() => {
    if (!!globalCTX) {
      setSearchTasks(globalCTX?.tasks);
    }
  }, [globalCTX.tasks]);

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
          <div className="activeFilters">
            {/* {activeFilters.map((filter) => {
              console.log(filter);
              return (
                <>
                  <p className="activeLabel">{filter}</p>
                  <p className="activeElevation">{filter}</p>
                  <p className="activeType">{filter}</p>
                </>
              );
            })} */}
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
            setActiveFilters={setActiveFilters}
          />
        )}
      </div>
    </div>
  );
}

export default Chart;
