import React from "react";

//importing antd components
import { Button, Input, DatePicker } from "antd";
import moment from "moment";
import { dummyData } from "../../../dummy-data";
import { GlobalContext } from "../../../stateManagement/Contexts/GlobalStateProvider";

import DayInfo from "./DayInfo";

const format = "DD-MM-YYYY";
const ScheduleInfo = ({
  isEdit,
  handleEndChange,
  state,
  handleChange,
  handleStartChange,
  styleDate,
  handleSubmit,
  handleUpdate,
  selectedTask,
}) => {
  const globalCTX = React.useContext(GlobalContext);

  const dataInfo = function () {
    var tasksData = [];
    dummyData?.map((el) => {
      let schedule = [];
      el?.scheduleDays?.map((x) => {
        schedule.push(x);
      });
      console.log(schedule);
      tasksData.push({
        id: el.scheduleDays.id,
        weather: el?.scheduleDays?.weather?.detailedForecast,
        status: el?.status,
      });
    });
    console.log(tasksData);
    return tasksData;
  };
  //   dataInfo();

  //   const ere = function () {
  //     var re = [];
  //     dummyData?.map((el) => el.scheduleDays.map((el) => el.map((el) => el)));
  //   };

  //   console.log(ere);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        paddingLeft: 3,
      }}
    >
      <h3>Day Info</h3>
      {dummyData
        ?.filter((el, index) => {
          return el.scheduleAddress === selectedTask.scheduleAddress;
        })
        .map(() => {
          return <DayInfo selectedTask={selectedTask} state={state} />;
        })}
      <div>
        <div style={{ borderTop: "1px solid gray" }}>
          <h3>Schedule Update</h3>
        </div>
        <form
          className="scheduleInfo"
          style={{
            display: "flex",
            flexDirection: "column",
            rowGap: 10,
            marginTop: "24px !important",
          }}
        >
          <div style={{ display: "flex", flexDirection: "row" }}>
            {isEdit ? (
              <div className="modalName" style={{ border: "none" }}>
                <Input
                  bordered={false}
                  placeholder="id"
                  type="text"
                  name="id"
                  readOnly={isEdit}
                  value={state.id}
                  onChange={handleChange}
                />
              </div>
            ) : (
              <div className="modalName">
                <Input
                  bordered={false}
                  placeholder="id"
                  type="text"
                  name="id"
                  value={state.id}
                  onChange={handleChange}
                />
              </div>
            )}
            <div className="startModal">
              <DatePicker
                bordered={false}
                placeholder="start"
                name="start"
                defaultValue={isEdit ? moment(state.startDate) : null}
                format={format}
                onChange={handleStartChange}
                dateRender={styleDate}
                showToday={true}
              />
            </div>
            <div className="endModal">
              <DatePicker
                dateRender={styleDate}
                format={format}
                bordered={false}
                placeholder="end"
                name="end"
                defaultValue={isEdit ? moment(state.endDate) : null}
                onChange={handleEndChange}
              />
            </div>
            <div className="prgModal">
              <Input
                bordered={false}
                placeholder="progress"
                type="number"
                name="progress"
                value={state.progress}
                onChange={handleChange}
              />
            </div>
            {isEdit ? (
              <Button
                style={{ border: "none" }}
                onClick={() => handleUpdate()}
                type="submit"
              >
                SUBMIT
              </Button>
            ) : (
              <Button
                style={{ border: "none" }}
                onClick={() => {
                  handleSubmit();
                }}
                type="submit"
              >
                SUBMIT
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ScheduleInfo;
