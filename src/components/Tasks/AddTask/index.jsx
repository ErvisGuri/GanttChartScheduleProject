import * as React from "react";
import AddTaskDialogue from "../AddTaskDialogue";
import "./add-task.scss";
//importing antd components
import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";

const AddTask = ({
  isEdit,
  setIsEdit,
  handleAddTask,
  selectedTask,
  open,
  handleModalState,
  onChangeContent,
}) => {
  return (
    <div className="add-task">
      <Button
        onClick={handleModalState}
        shape="round"
        icon={<PlusOutlined />}
        type="primary"
      >
        Add Task
      </Button>
      {open === true ? (
        <AddTaskDialogue
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          selectedTask={selectedTask}
          onChangeContent={onChangeContent}
          open={open}
          handleClose={handleModalState}
          handleAddTask={(taskObj) => handleAddTask(taskObj)}
        />
      ) : null}
    </div>
  );
};

export default AddTask;
