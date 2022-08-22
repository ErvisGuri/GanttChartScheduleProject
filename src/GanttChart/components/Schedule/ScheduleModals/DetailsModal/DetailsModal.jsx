import React, { useEffect, useState } from "react";
import { Button, Modal, Card } from "antd";
import { dummyData } from "../../../../dummy-data";

import "./detailsModal.scss";
import { CloudDownloadOutlined } from "@ant-design/icons";

const DetailsModal = ({ setVisible, visible, selectedTask }) => {
  const [state, setState] = useState({
    label: "",
    elevationLabel: "",
    id: "",
    totalProgress: "",
  });

  const handleClose = () => {
    setVisible(false);
  };

  let dat = dummyData?.map((el) => {
    return el.toBeScheduled;
  });

  const dataToBe = () => {
    const dataChecked = dummyData?.find?.(
      (el) => el?.scheduleId === selectedTask?.id
    );
    const sc = dataChecked?.toBeScheduled;
    let dataa = [];
    let dataTem = Object.keys(sc).forEach(function (key, index) {
      return dataa?.push(sc[key]);
    });
    // console.log(dataa);
    let data5 = [].concat(dataa);
    // console.log(data5);
    let sd = [];
    let ds = data5.map((rl) => {
      rl?.map((dt) => sd.push(dt));
    });
    return sd;
  };

  console.log(dataToBe());

  const initials = dataToBe();

  const feg = initials?.map((e) => e.serviceOptions);
  console.log(feg);

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
        {state?.map?.((el, i) => {
          return (
            <div key={i}>
              <div className="detailsLabel">{el.label}</div>
            </div>
          );
        })}
        <div className="detailsBody">
          <div></div>
        </div>
      </div>
    </Modal>
  );
};

export default DetailsModal;
