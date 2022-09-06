import React, { useContext, useEffect, useState } from "react";

import { Button, Modal, Select } from "antd";
import { Form, DatePicker } from "antd";
import "./FilterModal.scss";
import { GlobalContext } from "../../stateManagement/GlobalStateProvider";
import { dummyData, labelOption, type } from "../../dummy-data";
import { intersection } from "lodash";
import { Close, DropdownIcon } from "../../../assets/OtherIcons";
import moment from "moment";
import _ from "lodash";
const { Option } = Select;
const { Item } = Form;
const { RangePicker } = DatePicker;

export const FilterModal = ({
  setFilterTask,
  setVisibleFilter,
  visibleFilter,
}) => {
  const formatDate = moment().format();
  const globalCTX = useContext(GlobalContext);
  const [form] = Form.useForm();
  const values = form.getFieldsValue();
  const [labelItem, setLabelItem] = useState(null);
  const [rangeDate, setRangeDate] = useState({
    start: null,
    end: null,
  });

  const elevationName = function () {
    let temp = [];
    dummyData?.map((v) => {
      Object.values(v?.toBeScheduled).flatMap((el) => {
        el.flatMap?.((x) => {
          x?.serviceOptions?.map((e) => {
            e.map((d) => {
              temp.push({
                label: x?.label,
                elevationLabel: d?.elevationLabel,
                type: d?.type,
              });
            });
          });
        });
      });
    });
    console.log(temp);
    return temp;
  };

  const elevationNameData = elevationName();
  _.uniqBy(elevationNameData, function (e) {
    return e.label || e.elevationLabel || e.type;
  });

  useEffect(() => {
    elevationName();
  }, [values.labelSelect]);

  const clearInputSelected = () => {
    form.resetFields();
  };

  // Gantt Filter function
  const handleChangeFilter = () => {
    const dateRangePicker = rangeData();
    console.log(values);

    const dateFilter = dateRangePicker?.filter?.((el) =>
      !values.RangeDateLabel
        ? el.start === rangeDate.start && el.end === rangeDate.end
        : ""
    );

    console.log(dateFilter);

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
    handleChangeRange();
    handleChangeFilter();
    setVisibleFilter(false);
  };

  const handleChangeRange = (dates, dateStrings) => {
    if (dates) {
      setRangeDate({ start: dateStrings[0], end: dateStrings[1] });
    }
  };

  const serviceLabelItem = (e) => {
    setLabelItem(e);
  };

  console.log(labelItem);

  const rangeData = function () {
    let tempDate = [];
    globalCTX.tasks.map((e) => {
      tempDate.push({
        start: e?.start,
        end: e?.end,
      });
    });
    console.log(tempDate);
    return tempDate;
  };

  useEffect(() => {
    rangeData();
  }, [visibleFilter]);

  return (
    <>
      <Modal
        onCancel={() => setVisibleFilter(false)}
        centered
        className="filerModal"
        visible={visibleFilter}
        footer={null}
        title={
          <div className="customTitleFilter">
            <span>Gantt Filters</span>
            <div
              onClick={() => setVisibleFilter(false)}
              className="closeSvgIcon"
            >
              <Close />
            </div>
          </div>
        }
        width="680px"
        closable={false}
      >
        <Form form={form} onFinish={handleOnclick} className="filterBody">
          <div className="columBodyFilter">
            <Item name="labelSelect" label="Service" labelAlign="left">
              <Select
                allowClear
                className="labelSelect"
                placeholder="
                Choose service"
                suffixIcon={<DropdownIcon />}
                onChange={(e) => serviceLabelItem(e)}
              >
                {labelOption.map?.((label, i) => (
                  <Option key={label + i} value={label}>
                    {label}
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
                suffixIcon={<DropdownIcon />}
              >
                {elevationNameData
                  ?.filter((el) => el.label === labelItem)
                  .map?.((e, i) => (
                    <Option key={e + i} value={e.type}>
                      {e.type}
                    </Option>
                  ))}
              </Select>
            </Item>
          </div>
          <div className="columBodyFilter">
            <Item name="elevationName" label="Elevation Name" labelAlign="left">
              <Select
                allowClear
                className="elevationSelect"
                placeholder="
              Choose elevation name"
                suffixIcon={<DropdownIcon />}
              >
                {elevationNameData
                  ?.filter((td) => td?.label === labelItem)
                  .map?.((e, i) => (
                    <Option key={e + i} value={e.elevationLabel}>
                      {e.elevationLabel}
                    </Option>
                  ))}
              </Select>
            </Item>
            <Item name="RangeDateLabel" label="Range Date" labelAlign="left">
              <RangePicker
                allowClear
                className="RangeDateFilter"
                placeholder="
                Choose Range Date"
                defalutValue={rangeDate}
                format={formatDate}
                onChange={handleChangeRange}
              />
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
