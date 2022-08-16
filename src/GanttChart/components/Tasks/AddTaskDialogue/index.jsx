import * as React from "react";
import "./modal.scss";

//importing antd components
import { Button, Input, Modal, DatePicker } from "antd";
import moment from "moment";
import ScheduleInfo from "./ScheduleInfo";

const format = "DD-MM-YYYY";

const initials = {
  color: "",
  crews: [],
  end: null,
  fleet: [],
  id: "",
  image: "",
  linkedDays: {},
  notes: [],
  start: null,
  status: "",
  scheduleAddress: "",
  progress: "",
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

  const [state, setState] = React.useState(isEdit ? selectedTask : initials);

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

  const valid = () => {
    if (state.start === null) {
      alert("!!Date Empty!!");
    }
  };

  const styleDate = (current) => {
    const style = {};
    if (current.day() === 6 || current.day() === 0) {
      style.background = "#c1bfbf4d";
      style.borderRadius = "50%";
    }
    return (
      <div className="ant-picker-cell-inner" style={style}>
        {current.date()}
      </div>
    );
  };

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
      setState({ ...state, startDate: value.toDate() });
    }
  };

  const handleSubmit = () => {
    handleAddTask(state);
    valid();
    close();
  };

  return (
    <Modal
      onCancel={close}
      className="task-modal"
      aria-labelledby="simple-dialog-title"
      visible={open}
      title={isEdit ? "Schedule Information" : "Add Item"}
      footer={null}
      closable={false}
      width={isEdit ? "1050px" : "300px"}
    >
      {isEdit ? (
        <div>
          <ScheduleInfo state={state} selectedTask={selectedTask} />
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div>
            <form
              className="UpdateForm"
              style={{
                padding: 32,
                display: "flex",
                flexDirection: "column",
                rowGap: 32,
              }}
            >
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
              {isEdit ? (
                <Button
                  style={{ border: "none" }}
                  onClick={handleUpdate}
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
            </form>
            <Button
              style={{
                border: "none",
                fontSize: "16px",
                marginLeft: "113px",
                width: "50px",
              }}
              onClick={close}
              className="space-around"
            >
              CANCEL
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
}

export default AddTaskDialogue;
