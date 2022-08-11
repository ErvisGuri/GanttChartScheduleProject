import * as React from "react";
import "./modal.scss";

//importing antd components
import { Button, Input, Modal, DatePicker } from "antd";
import moment from "moment";
const format = "DD-MM-YYYY";

const initials = {
  id: "",
  name: "",
  start: "",
  end: "",
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

  const [state, setState] = React.useState(isEdit ? selectedTask : initials);

  const close = () => {
    setState(initials);
    handleClose();
  };

  console.log(state);

  console.log(initials);

  const handleUpdate = (e) => {
    e.preventDefault();
    setIsEdit(false);
    close();
    onChangeContent(state);
  };

  // const styleDate = (current) => {
  //   const style = {};
  //   if (current.day() === 6 || current.day() === 0) {
  //     style.background = "#c1bfbfb8";
  //     style.borderRadius = "50%";
  //   }
  //   return (
  //     <div className="ant-picker-cell-inner" style={style}>
  //       {current.date()}
  //     </div>
  //   );
  // };

  const handleChange = (obj, e) => {
    if (obj === "start" || obj === "end") {
      let name = obj;
      setState((prev) => ({ ...prev, [name]: e.toISOString().slice(0, 10) }));
    } else {
      let name = obj;
      setState((prev) => ({ ...prev, [name]: e }));
    }
  };
  const handleSubmit = () => {
    handleAddTask(state);
    close();
  };

  // const localTime = moment().format("DD-MM-YYYY");
  // const proposedDate = localTime + "T00:00:00.000Z";
  // const isValidDate = moment(proposedDate).isValid();

  return (
    <Modal
      onCancel={close}
      className="task-modal"
      aria-labelledby="simple-dialog-title"
      visible={open}
      title={isEdit ? "Change Date" : "Add Item"}
      footer={null}
      closable={false}
      width={350}
    >
      <form
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
              readOnly
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
            placeholder="name"
            type="name"
            name="name"
            value={state.name}
            onChange={handleChange}
          />
        </div>
        <div className="startModal">
          <DatePicker
            bordered={false}
            placeholder="start"
            name="start"
            defaultValue={state.start}
            format={format}
            onChange={handleChange}
            // dateRender={styleDate}
            showToday={true}
          />
        </div>
        <div className="endModal">
          <DatePicker
            // dateRender={styleDate}
            format={format}
            bordered={false}
            placeholder="end"
            name="end"
            defaultValue={state.end}
            onChange={handleChange}
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
    </Modal>
  );
}

export default AddTaskDialogue;
