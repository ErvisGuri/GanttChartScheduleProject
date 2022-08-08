import React from "react";
import Modal from "antd/lib/modal/Modal";
import "antd/dist/antd.css";
import { Popconfirm, Button, DatePicker, Select } from "antd";
import moment from "moment";
import { GlobalContext } from "../../../stateManagment/Contexts/GlobalStateProvider";
const { Option } = Select;
const { RangePicker } = DatePicker;

const Modal1 = ({
  handleOk,
  handleCancel,
  isModalVisible,
  handleUpdateDate,
}) => {
  //   const globalCTX = React.useContext(GlobalContext);
  const [state, setState] = React.useState("");

  const handleChange = (date, e) => {
    console.log(moment(date), e[0], "start");
    console.log(moment(date), e[1], "end");
    setState({ ...state, [date]: e });
  };

  const handleSubmmit = () => {
    setState(state);
    console.log(state);
    handleUpdateDate(state);
  };

  return (
    <div>
      <Modal
        title="GanttChart Modal"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width="480px"
        style={{ height: 350 }}
        onChange={handleChange}
      >
        <div style={{ display: "flex", flexDirection: "row", gap: "242px" }}>
          <div>
            <Select style={{ minWidth: "110px" }} placeholder="Choose Task">
              <Option value="Task 1">Task 1</Option>
              <Option value="Task 2">Task 2</Option>
              <Option value="Task 3">Task 3</Option>
            </Select>
          </div>
          <div style={{ position: "absolute", left: 385 }}>
            <Popconfirm
              title="Are you sure delete this task?"
              okText="Yes"
              cancelText="No"
            >
              <Button>Delete</Button>
            </Popconfirm>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginBottom: "15px",
            marginTop: "15px",
          }}
        >
          <RangePicker
            showTime={{
              format: "HH:mm",
            }}
            format="YYYY-MM-DD HH:mm"
            onChange={handleChange}
            onOk={handleSubmmit}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}></div>
      </Modal>
    </div>
  );
};

export default Modal1;
