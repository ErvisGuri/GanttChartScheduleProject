import * as React from "react";
import { Button } from "@material-ui/core";
import AddTaskDialogue from "../AddTaskDialogue";
import "./add-task.scss";
import "antd/dist/antd.css";
import { Add } from "@material-ui/icons";
const AddTask = ({
  isEdit,
  setIsEdit,
  handleAddTask,
  open,
  handleClick,
  onChangeContent,
}) => {
  return (
    <div className="add-task">
      <Button
        onClick={handleClick}
        variant="contained"
        startIcon={<Add />}
        color="primary"
      >
        Add Task
      </Button>
      {open === true ? (
        <AddTaskDialogue
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          onChangeContent={onChangeContent}
          open={open}
          handleClose={handleClick}
          handleAddTask={(taskObj) => handleAddTask(taskObj)}
        />
      ) : null}
    </div>
  );
};

export default AddTask;
