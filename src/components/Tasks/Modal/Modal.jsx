import React from "react";
import Modal from "antd/lib/modal/Modal";
import "antd/dist/antd.css";
import { Popconfirm, Button, DatePicker, Select } from "antd";
import moment from "moment";
import { GlobalContext } from "../../../stateManagment/Contexts/GlobalStateProvider";
const { Option } = Select;
const { RangePicker } = DatePicker;

const Modal1 = ({ handleOk, handleCancel, isModalVisible }) => {
  //   const globalCTX = React.useContext(GlobalContext);
  const [state, setState] = React.useState("");

  return (
    <div>
      <Modal
        title="GanttChart Modal"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width="480px"
        style={{ height: 350 }}
      ></Modal>
    </div>
  );
};

export default Modal1;
