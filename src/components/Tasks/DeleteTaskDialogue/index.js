import { Input, Button, Modal } from "antd";
import * as React from "react";

function DeleteTaskDialogue({ open, handleClose, handleDeleteTask }) {
    const [state, setState] = React.useState({
        name: ""
    });

    const close = () => {
        handleClose();
    };

    const handleChange = (e) => {
        const { value, name } = e.target;
        console.log(value);
        setState({ ...state, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        handleDeleteTask(state);
    };

    return (
        <Modal onCancel={close} title="Add Item" visible={open} footer={null} closable={false}>
            <form
                style={{
                    padding: 32,
                    display: "flex",
                    flexDirection: "column",
                    rowGap: 32
                }}
                onSubmit={handleSubmit}
            >
                <Input
                    placeholder="name"
                    type="name"
                    name="name"
                    onChange={handleChange}
                />
                <Button type="submit">Submit</Button>
            </form>
            <Button onClick={handleClose} className="space-around">
                Cancel
            </Button>
        </Modal>
    );
}

export default DeleteTaskDialogue;
