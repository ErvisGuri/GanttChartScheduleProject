import * as React from "react";

//importing antd components
import { Button, Input, Modal } from "antd";

const initials = {
  id: "",
  name: "",
  start: new Date(),
  end: new Date(),
  progress: 10,
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
    handleClose();
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    setIsEdit(false);
    close();
    onChangeContent(state);
  };

  const handleChange = (e) => {
    var { value, name } = e.target;
    if (name === "start" || name === "end") {
      value = new Date(value);
    }
    setState({ ...state, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddTask(state);
    handleClose();
  };

  return (
    <Modal
      onCancel={close}
      aria-labelledby="simple-dialog-title"
      visible={open}
      title={isEdit ? "Change Date" : "Add Item"}
      footer={null}
      closable={false}
    >
      <form
        style={{
          padding: 32,
          display: "flex",
          flexDirection: "column",
          rowGap: 32,
        }}
      >
        <Input
          placeholder="name"
          type="name"
          name="name"
          value={state.name}
          onChange={handleChange}
        />
        <Input
          placeholder="start"
          name="start"
          type="date"
          value={state.start.toISOString().slice(0, 10)}
          onChange={handleChange}
        />
        <Input
          placeholder="end"
          name="end"
          type="date"
          value={state.end.toISOString().slice(0, 10)}
          onChange={handleChange}
        />
        <Input
          placeholder="progress"
          type="number"
          name="progress"
          value={state.progress}
          onChange={handleChange}
        />
        <Input
          placeholder="dependencies"
          type="text"
          name="dependencies"
          value={state.dependencies}
          onChange={handleChange}
        />
        {isEdit ? (
          <Button
            style={{ border: "none" }}
            onClick={handleUpdate}
            type="submit"
          >
            Submit
          </Button>
        ) : (
          <Button
            style={{ border: "none" }}
            onClick={handleSubmit}
            type="submit"
          >
            Submit
          </Button>
        )}
      </form>
      <Button
        style={{ border: "none", fontSize: "16px" }}
        onClick={handleClose}
        className="space-around"
      >
        Cancel
      </Button>
    </Modal>
  );
}

export default AddTaskDialogue;
