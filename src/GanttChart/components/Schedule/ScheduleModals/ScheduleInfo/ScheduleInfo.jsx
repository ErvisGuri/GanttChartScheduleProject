import React from "react";

import DayInfo from "../DayInfo/DayInfo";
//importing antd components
// import { Button, Input, DatePicker } from "antd";
// import { CopyOutlined } from "@ant-design/icons";
// import moment from "moment";
// const format = "DD-MM-YYYY";

const ScheduleInfo = ({
  handleModalState,
  handleEndChange,
  state,
  handleChange,
  handleStartChange,
  styleDate,
  handleUpdate,
  selectedTask,
}) => {
  // const textAreaRef = useRef(null);

  // const copyIdInput = (e) => {
  //   textAreaRef.current?.select();
  //   document.execCommand("copy");
  //   e.target.focus();
  // };

  return (
    <>
      <DayInfo handleModalState selectedTask={selectedTask} state={state} />
      {/* <div className="scheduleInfo">
        <div className="idModal">
          <Input
            ref={textAreaRef}
            bordered={false}
            placeholder="id"
            type="text"
            name="id"
            readOnly={true}
            value={state.ids}
            onChange={handleChange}
          />
        </div>
        <span onClick={copyIdInput} className="copyId">
          <p className="copyIcon">
            <CopyOutlined />
          </p>
        </span>
        <div className="startModalUp">
          <DatePicker
            bordered={false}
            placeholder="start"
            name="start"
            defaultValue={moment(state.start)}
            format={format}
            onChange={handleStartChange}
            dateRender={styleDate}
            showToday={true}
          />
        </div>
        <div className="endModalUp">
          <DatePicker
            dateRender={styleDate}
            format={format}
            bordered={false}
            placeholder="end"
            name="end"
            defaultValue={moment(state.end)}
            onChange={handleEndChange}
          />
        </div>
        <div className="prgModalUp">
          <Input
            bordered={false}
            placeholder="progress"
            type="number"
            name="progress"
            value={state.progress}
            onChange={handleChange}
          />
        </div>
        <div className="modalBtn">
          <Button onClick={handleUpdate} type="submit">
            SUBMIT
          </Button>
        </div>
      </div> */}
    </>
  );
};

export default ScheduleInfo;
