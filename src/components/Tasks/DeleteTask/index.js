import * as React from "react";
import { Button } from "@material-ui/core";
import DeleteTaskDialogue from "../DeleteTaskDialogue";
import { Delete } from "@material-ui/icons";

const DeleteTask = ({ handleDeleteTask }) => {
    const [state, setState] = React.useState({
        show: false
    });

    const handleClick = () => {
        setState({ ...state, show: !state.show });
    };

    return (
        <div className="add-task">
            <Button startIcon={<Delete />} onClick={handleClick} variant="text">
                <Delete />
            </Button>
            {state.show === true ? (
                <DeleteTaskDialogue
                    open={state.show}
                    handleClose={handleClick}
                    handleDeleteTask={(taskObj) => handleDeleteTask(taskObj)}
                />
            ) : null}
        </div>
    );
};

export default DeleteTask;
