import * as React from "react";
import { Button } from "@material-ui/core";
import AddTaskDialogue from "../AddTaskDialogue";
import "./add-task.scss";
import { Add } from "@material-ui/icons";
const AddTask = ({ handleAddTask }) => {
  const [state, setState] = React.useState({
    show: false,
  });

  const handleClick = () => {
    setState({ ...state, show: !state.show });
  };

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
      {state.show === true ? (
        <AddTaskDialogue
          open={state.show}
          handleClose={handleClick}
          handleAddTask={(taskObj) => handleAddTask(taskObj)}
        />
      ) : null}
    </div>
  );
};

export default AddTask;
