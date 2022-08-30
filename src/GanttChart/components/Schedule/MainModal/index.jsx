import * as React from "react";
import { useState } from "react";

import "./modal.scss";

/*importing AntComponents*/
import { Modal } from "antd";
import DayInfo from "../DayInfo/DayInfo";

const initials = {
  id: "",
  ids: "",
  name: "",
  start: null,
  end: null,
  status: "",
  progress: "",
  dependencies: "",
};

function ScheduleDetailsModal(props) {
  const { open, handleClose, selectedTask, isEdit, setIsEdit } = props;

  const [state, setState] = useState(isEdit ? selectedTask : initials);

  const close = () => {
    setIsEdit(false);
    setState(initials);
    handleClose();
  };

  return (
    <div className="modal">
      <Modal
        onCancel={close}
        centered
        className="task-modal"
        title={selectedTask?.name}
        visible={open}
        footer={null}
        destroyOnClose={true}
      >
        <DayInfo
          handleModalState
          handleClose
          open
          state={state}
          selectedTask={selectedTask}
        />
      </Modal>
    </div>
  );
}

export default ScheduleDetailsModal;
