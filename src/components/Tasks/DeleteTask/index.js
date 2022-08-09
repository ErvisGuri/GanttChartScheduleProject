import * as React from "react";
import DeleteTaskDialogue from "../DeleteTaskDialogue";

//Antd Components
import { Button } from "antd";
import { DeleteFilled } from "@ant-design/icons";


const DeleteTask = ({ handleDeleteTask }) => {
    const [state, setState] = React.useState({
        show: false
    });

    const handleClick = () => {
        setState({ ...state, show: !state.show });
    };

    return (
        <div className="add-task">
            <Button startIcon={<DeleteFilled />} onClick={handleClick} variant="text">
                <DeleteFilled />
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
