import * as React from "react";
import { useState } from "react";

import "./modal.scss";

/*importing AntComponents*/
import { Button, Input, Modal, DatePicker } from "antd";
// import moment from "moment";
import ScheduleInfo from "../ScheduleInfo/ScheduleInfo";

// const format = "MM-DD-YYYY";

const initials = {
  end: null,
  id: "",
  image: "",
  notes: [],
  start: null,
  status: "",
  scheduleAddress: "",
  progress: "",
  dependencies: "",
};

function AddTaskDialogue(props) {
  const {
    open,
    handleClose,
    handleAddTask,
    onChangeContent,
    selectedTask,
    isEdit,
    setIsEdit,
  } = props;

  const [state, setState] = useState(isEdit ? selectedTask : initials);

  const close = () => {
    setIsEdit(false);
    setState(initials);
    handleClose();
  };
  const handleUpdate = (e) => {
    e.preventDefault();
    setIsEdit(false);
    close();
    onChangeContent(state);
  };

  // const valid = () => {
  //   if (state.start === null) {
  //     alert("!!Date Empty!!");
  //   }
  // };

  // const styleDate = (current) => {
  //   const style = {};
  //   if (current.day() === 6 || current.day() === 0) {
  //     style.background = "#c1bfbf4d";
  //     style.borderRadius = "50%";
  //   }
  //   return (
  //     <div className="ant-picker-cell-inner" style={style}>
  //       {current.date()}
  //     </div>
  //   );
  // };

  const handleChange = (e) => {
    const { value, name } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleEndChange = (value) => {
    if (value !== null) {
      setState({ ...state, end: value.toDate() });
    }
  };

  const handleStartChange = (value) => {
    if (value !== null) {
      setState({ ...state, start: value.toDate() });
    }
  };

  // const handleSubmit = () => {
  //   handleAddTask(state);
  //   valid();
  //   close();
  // };

  return (
    <div className="modal">
      <Modal
        onCancel={close}
        centered
        className="task-modal"
        aria-labelledby="simple-dialog-title"
        visible={open}
        // title={selectedTask?.scheduleDays.map((e) => e.name)}
        footer={null}
        width={isEdit ? "1165px" : "410px"}
        destroyOnClose={true}
      >
        {isEdit ? (
          <div>
            <ScheduleInfo
              handleModalState
              handleClose
              open
              state={state}
              selectedTask={selectedTask}
              handleUpdate={handleUpdate}
              handleChange={handleChange}
              handleEndChange={handleEndChange}
              handleStartChange={handleStartChange}
            />
          </div>
        ) : (
          ""
        )}
        {/* {isEdit ? (
          <div>
            <ScheduleInfo
              handleModalState
              handleClose
              open
              state={state}
              selectedTask={selectedTask}
              handleUpdate={handleUpdate}
              handleChange={handleChange}
              handleEndChange={handleEndChange}
              handleStartChange={handleStartChange}
            />
          </div>
        ) : (
          <div>
            <div>
              <form className="addTaskForm">
                {isEdit ? (
                  <div className="modalName">
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
                    defaultValue={isEdit ? moment(state.start) : null}
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
                    defaultValue={isEdit ? moment(state.end) : null}
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
                {isEdit ? (
                  <Button
                    className="addTaskBtn"
                    onClick={handleUpdate}
                    type="submit"
                  >
                    SUBMIT
                  </Button>
                ) : (
                  <Button
                    className="addTaskBtn"
                    onClick={() => {
                      handleSubmit();
                    }}
                    type="submit"
                  >
                    SUBMIT
                  </Button>
                )}
              </form>
              <Button className="cancelAddTaskBtn" onClick={close}>
                CANCEL
              </Button>
            </div>
          </div>
        )} */}
      </Modal>
    </div>
  );
}

export default AddTaskDialogue;
