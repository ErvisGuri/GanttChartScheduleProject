import React from "react";
import Modal from "antd/lib/modal/Modal";
import "antd/dist/antd.css";
import { Popconfirm, Button, TimePicker, DatePicker, Select } from "antd";
import moment from "moment";
const { Option } = Select;

const Modal1 = ({ handleOk, handleCancel, isModalVisible }) => {
  return (
    <div>
      <Modal
        title="GanttChart Modal"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width="480px"
        style={{ height: 350 }}
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
          <h3>Start</h3>
          <div style={{ display: "flex", flexDirection: "row", gap: "20px" }}>
            <span>
              <DatePicker />
            </span>
            <span>
              <TimePicker.RangePicker
                defaultValue={moment("13:30:56", "HH:mm:ss")}
              />
            </span>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <h3>End</h3>
          <div style={{ display: "flex", flexDirection: "row", gap: "20px" }}>
            <span>
              <DatePicker />
            </span>
            <span>
              <TimePicker.RangePicker
                defaultValue={moment("13:30:56", "HH:mm:ss")}
              />
            </span>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Modal1;
