import React, { useState } from "react";
import { Button, Modal, Card } from "antd";
import { dummyData } from "../../../../dummy-data";

import "./detailsModal.scss";

const DetailsModal = ({ setVisible, visible, selectedTask }) => {
  const [state, setState] = useState({
    day: "",
    breakdownDimesion: "",
    name: "",
  });

  const handleClose = () => {
    setVisible(false);
  };

  const dataValue = () => {
    let tasksVal = [];
    dummyData?.map((el) => {
      tasksVal.push(el.toBeScheduled);
    });
    return tasksVal.map((e) => e);
  };

  console.log(dataValue());

  return (
    <Modal
      centered
      onCancel={handleClose}
      className="details-modal"
      visible={visible}
      destroyOnClose={false}
      title="Day Details"
      footer={[
        <Button className="detailsCloseBtn" onClick={() => setVisible(false)}>
          Cancel
        </Button>,
      ]}
    >
      <div>
        {selectedTask.scheduleDays.map((e, i) => {
          return <div className="detailsBody" key={i}></div>;
        })}
      </div>
    </Modal>
  );
};

export default DetailsModal;
