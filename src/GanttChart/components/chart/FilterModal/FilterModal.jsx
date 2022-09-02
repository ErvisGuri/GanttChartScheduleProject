import React, { useContext } from "react";

import { Button, Modal, Select } from "antd";
import { Form } from "antd";
import "./FilterModal.scss";
import { GlobalContext } from "../../../stateManagement/GlobalStateProvider";
import { label, elevationLabel, type, pliId } from "../../../dummy-data";
import { intersection } from "lodash";
const { Option } = Select;
const { Item } = Form;

export const FilterModal = ({
  setFilterTask,
  setVisibleFilter,
  visibleFilter,
}) => {
  const globalCTX = useContext(GlobalContext);
  const [form] = Form.useForm();

  const clearInputSelected = () => {
    form.resetFields();
  };

  // Filter function
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

  const handleOnclick = () => {
    handleChangeFilter();
    setVisibleFilter(false);
  };

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
          <div className="columBodyFilter">
            <Item name="labelSelect" label="Label" labelAlign="left">
              <Select
                allowClear
                className="labelSelect"
                placeholder="
                Choose label"
              >
                {label?.map?.((label, i) => (
                  <Option key={label + i} value={label}>
                    {label}
                  </Option>
                ))}
              </Select>
            </Item>
            <Item name={"pliSelect"} label="PLI Number" labelAlign="left">
              <Select
                allowClear
                className="pliSelect"
                placeholder="
              Choose PLI number"
              >
                {pliId?.map?.((pli, i) => (
                  <Option key={pli + i} value={pli}>
                    {pli}
                  </Option>
                ))}
              </Select>
            </Item>
          </div>
          <div className="columBodyFilter">
            <Item
              name={"elevationLabel"}
              label="Elevation Label"
              labelAlign="left"
            >
              <Select
                allowClear
                className="elevationSelect"
                placeholder="
              Choose elevation label"
              >
                {elevationLabel?.map?.((elLabel, i) => (
                  <Option key={elLabel + i} value={elLabel}>
                    {elLabel}
                  </Option>
                ))}
              </Select>
            </Item>
            <Item name={"typeSelect"} label="Type" labelAlign="left">
              <Select
                allowClear
                className="typeSelect"
                placeholder="
              Choose type"
              >
                {type?.map?.((type, i) => (
                  <Option key={type + i} value={type}>
                    {type}
                  </Option>
                ))}
              </Select>
            </Item>
          </div>
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
              Apply Filters
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};
