import React, { useContext } from "react";

import { Button, Modal, Select } from "antd";
import { Form } from "antd";
import "./FilterModal.scss";
import { GlobalContext } from "../../../stateManagement/Contexts/GlobalStateProvider";
import { label, elevationLabel, type, pliId } from "../../../dummy-data";
import { intersection } from "lodash";
const { Option } = Select;
const { Item } = Form;

export const FilterModal = ({
  filterTask,
  setFilterTask,
  setVisibleFilter,
  visibleFilter,
}) => {
  const globalCTX = useContext(GlobalContext);
  const [form] = Form.useForm();

  const clearInputSelected = () => {
    form.resetFields();
  };

  const handleChangeFilter = () => {
    const values = form.getFieldsValue();
    const labelFilterOne = globalCTX?.tasks?.filter?.(
      (el) => el.label === values.labelSelect
    );
    const labelFilterTwo = globalCTX?.tasks?.filter?.(
      (el) => el.pliId === parseInt(values.pliSelect)
    );
    const labelFilterThree = globalCTX?.tasks?.filter?.(
      (el) => el.type === values.typeSelect
    );
    const labelFilterFour = globalCTX?.tasks?.filter?.(
      (el) => el.elevationLabel === values.elevationLabel
    );
    const intersectOne =
      labelFilterOne.length && labelFilterThree.length
        ? intersection(labelFilterOne, labelFilterThree)
        : labelFilterOne.length
        ? labelFilterOne
        : labelFilterThree.length
        ? labelFilterThree
        : [];
    const intersectTwo =
      labelFilterTwo.length && labelFilterFour.length
        ? intersection(labelFilterTwo, labelFilterFour)
        : labelFilterTwo.length
        ? labelFilterTwo
        : labelFilterFour.length
        ? labelFilterFour
        : [];
    setFilterTask(() => {
      return intersectOne.length && intersectTwo.length
        ? intersection(intersectOne, intersectTwo)
        : intersectOne.length
        ? intersectOne
        : intersectTwo.length
        ? intersectTwo
        : [];
    });
  };

  console.log(filterTask);

  const handleOnclick = () => {
    console.log("asfasf", form.getFieldsValue());
    handleChangeFilter();
    setVisibleFilter(false);
  };

  console.log("form", form.getFieldsValue());

  return (
    <>
      <Modal
        onCancel={() => setVisibleFilter(false)}
        centered
        className="filerModal"
        visible={visibleFilter}
        footer={null}
        title="Gantt Filters"
        width="680px"
      >
        <Form form={form} onFinish={handleOnclick} className="filterBody">
          <Item name="labelSelect" label="Label">
            <Select
              allowClear
              className="labelSelect"
              placeholder="
                Choose options..."
            >
              {label?.map?.((label, i) => (
                <Option key={label + i} value={label}>
                  {label}
                </Option>
              ))}
            </Select>
            {/* </div> */}
          </Item>
          <Item name={"elevationLabel"} label="Elevation Label">
            <Select
              allowClear
              className="elevationSelect"
              placeholder="
              Choose options..."
            >
              {elevationLabel?.map?.((elLabel, i) => (
                <Option key={elLabel + i} value={elLabel}>
                  {elLabel}
                </Option>
              ))}
            </Select>
          </Item>
          <Item name={"pliSelect"} label="PLI Number">
            <Select
              allowClear
              className="pliSelect"
              placeholder="
              Choose options..."
            >
              {pliId?.map?.((pli, i) => (
                <Option key={pli + i} value={pli}>
                  {pli}
                </Option>
              ))}
            </Select>
          </Item>
          <Item name={"typeSelect"} label="Type">
            <Select
              allowClear
              className="typeSelect"
              placeholder="
              Choose options..."
            >
              {type?.map?.((type, i) => (
                <Option key={type + i} value={type}>
                  {type}
                </Option>
              ))}
            </Select>
          </Item>
        </Form>
        <div className="filterFooter">
          <div>
            <Button
              className="ganttClearFilterBtn"
              onClick={clearInputSelected}
            >
              Clear Filter
            </Button>
          </div>
          <div>
            <Button className="ganttFilterBtn" onClick={handleOnclick}>
              Filter
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};
