import React from "react";

//importing antd components
import { Button, Input, DatePicker } from "antd";
import moment from "moment";
import { dummyData } from "../../../dummy-data";

const format = "DD-MM-YYYY";
const ScheduleInfo = ({
  isEdit,
  handleEndChange,
  state,
  handleChange,
  handleStartChange,
  styleDate,
}) => {
  return (
    <div>
      <span style={{ marginLeft: 600 }}>{`Weather`}</span>
      <div>
        <form
          className="scheduleInfo"
          style={{
            padding: 10,
            display: "flex",
            flexDirection: "column",
            rowGap: 32,
            marginTop: "24px !important",
          }}
        >
          <div>
            <h3>Schedule Days</h3>
          </div>

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
          <div className="modalName">
            <Input
              bordered={false}
              placeholder="day"
              type="day"
              name="day"
              value={state.day}
              onChange={handleChange}
            />
          </div>
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
          <div className="depModal">
            <Input
              bordered={false}
              placeholder="dependencies"
              type="text"
              name="dependencies"
              value={state.dependencies}
              onChange={handleChange}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ScheduleInfo;
