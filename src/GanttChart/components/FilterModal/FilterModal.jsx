import React, { useContext, useEffect, useState } from "react";

import { GlobalContext } from "../../stateManagement/GlobalStateProvider";
import { intersection, isArray, uniq } from "lodash";
import { Close, DropdownIcon } from "../../../assets/OtherIcons";
import moment from "moment";

//antd components
import { Button, Modal, Select, Form, DatePicker } from "antd";
import "./FilterModal.scss";

import { dummyData, labelOption } from "../../dummy-data";

const { Option } = Select;
const { Item } = Form;
const { RangePicker } = DatePicker;

export const FilterModal = ({
  setFilterTask,
  setVisibleFilter,
  visibleFilter,
  setActiveFilters,
}) => {
  const formatDate = "YYYY-MM-DD";
  const globalCTX = useContext(GlobalContext);
  const [form] = Form.useForm();
  const [elevationName, setElevationName] = useState([]);
  const [typeName, setTypeName] = useState([]); // store all type
  const [labelName, setLabelName] = useState([]); // store all service
  const [labelItem, setLabelItem] = useState(null); //get selectedServiceLabel array
  const [typeValue, setTypeValue] = useState(null);
  const [elevationValue, setElevationValue] = useState(null);
  const [serviceEnabled, setServiceEnabled] = useState(false);
  const [elevationEnabled, setElevationEnabled] = useState(false);
  const [typeEnabled, setTypeEnabled] = useState(false);
  const [rangeDate, setRangeDate] = useState({
    start: null,
    end: null,
  });

  console.log(typeName);
  console.log(labelName);
  console.log(typeName);

  const elevationData = () => {
    const values = form.getFieldsValue();
    let temp = [];
    dummyData?.map((v) => {
      Object.values(v?.toBeScheduled).flatMap((el) => {
        serviceEnabled
          ? el
              .filter((filt) => values.labelSelect.includes(filt.label))
              .flatMap((x) => {
                return x?.serviceOptions.map((e) => {
                  typeEnabled
                    ? e
                        .filter((elevationFilt) =>
                          values.typeSelect.includes(elevationFilt.type)
                        )
                        .map((d) => temp.push(d?.elevationLabel))
                    : e.map((d) => {
                        temp.push(d?.elevationLabel);
                      });
                });
              })
          : el.flatMap((x) => {
              x?.serviceOptions?.map((e) => {
                e.map((d) => {
                  temp.push(d?.elevationLabel);
                });
              });
            });
      });
    });
    // console.log(temp);
    return temp;
  };

  //function get all task type and return only type that selected Service has
  const typeData = () => {
    const values = form.getFieldsValue();
    let typeTemp = [];
    dummyData?.map((v) => {
      Object.values(v?.toBeScheduled).flatMap((el) => {
        serviceEnabled
          ? el
              .filter((filt) => values.labelSelect.includes(filt.label))
              .flatMap((x) => {
                return x?.serviceOptions?.map((e) => {
                  elevationEnabled
                    ? e
                        .filter((typeFilt) =>
                          values.elevationName.includes(typeFilt.elevationLabel)
                        )
                        .map((d) => typeTemp.push(d?.type))
                    : e.map((d) => {
                        typeTemp.push(d?.type);
                      });
                });
              })
          : el.flatMap?.((x) => {
              x?.serviceOptions?.map((e) => {
                e.map((d) => {
                  typeTemp.push(d?.type);
                });
              });
            });
      });
    });
    // console.log(typeTemp);
    return typeTemp;
  };

  // get all service data
  const serviceData = () => {
    let labelTemp = [];
    dummyData?.map((v) => {
      Object.values(v?.toBeScheduled).flatMap((el) => {
        el.flatMap?.((x) => {
          labelTemp.push(x.label);
        });
      });
    });
    console.log(labelTemp);
    return labelTemp;
  };

  //clear input field selected
  const clearInputSelected = () => {
    // form.resetFields();
    setRangeDate({});
    setFilterTask([]);
    setActiveFilters([]);
    setVisibleFilter(false);
  };

  // Gantt Filter function
  const handleChangeFilter = () => {
    const momentSelectedStartDate = moment(rangeDate.start, "YYYY-MM-DD");
    const momentSelectedEndDate = moment(rangeDate.end, "YYYY-MM-DD");
    const values = form.getFieldsValue();
    //returns array that is filtered by selectedService
    const labelFilterRecords = globalCTX?.tasks?.filter?.((el) => {
      return typeof values.labelSelect !== "undefined" &&
        isArray(values.labelSelect)
        ? values.labelSelect.includes(el.label)
        : el;
    });
    console.log(labelFilterRecords);
    //returns array that is filtered by selectedRangeDate
    const dateFilterRecords = globalCTX?.tasks?.filter?.(
      (el) =>
        moment(el.start, "YYYY-MM-DD").isSameOrAfter(momentSelectedStartDate) &&
        moment(el.end, "YYYY-MM-DD").isSameOrBefore(momentSelectedEndDate)
    );
    //returns array that is filtered by selectedType
    const typeFilterRecords = globalCTX?.tasks?.filter?.((el) =>
      typeof values.typeSelect !== "undefined" && isArray(values.typeSelect)
        ? values.typeSelect.includes(el.type)
        : el
    );
    console.log(typeFilterRecords);
    //returns array that is filtered by selectedElevation
    const elevationFilterRecords = globalCTX?.tasks?.filter((el) =>
      typeof values.elevationName !== "undefined" &&
      isArray(values.elevationName)
        ? values.elevationName.includes(el.elevationLabel)
        : el
    );

    //Using lodash function to create an array of unique values and filter only selected one
    const intersectOne =
      labelFilterRecords.length && typeFilterRecords.length
        ? intersection(labelFilterRecords, typeFilterRecords)
        : labelFilterRecords.length
        ? labelFilterRecords
        : typeFilterRecords.length
        ? typeFilterRecords
        : [];
    const intersectTwo =
      dateFilterRecords.length && elevationFilterRecords.length
        ? intersection(dateFilterRecords, elevationFilterRecords)
        : dateFilterRecords.length
        ? dateFilterRecords
        : elevationFilterRecords.length
        ? elevationFilterRecords
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
    setActiveFilters(
      Object.values(values).filter((el) => typeof el !== "undefined")
    );
  };

  const handleChangeRange = (dates) => {
    if (dates) {
      const startString = dates[0].toISOString();
      const endString = dates[1].toISOString();
      setRangeDate({ start: startString, end: endString });
    }
  };

  const handleOnclick = () => {
    handleChangeRange();
    handleChangeFilter();
    setVisibleFilter(false);
  };
  const serviceLabelItem = (e) => {
    setLabelItem(e);
  };
  const typeItem = (e) => {
    setTypeValue(e);
  };
  const elevationItem = (e) => {
    setElevationValue(e);
  };

  useEffect(() => {
    setElevationName(uniq(elevationData()));
    setLabelName(uniq(serviceData()));
    setTypeName(uniq(typeData()));
  }, [labelItem, elevationEnabled, typeEnabled]);

  const content = (
    <div>
      <p>Select service if you want to make a deep filter</p>
    </div>
  );

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
            <Item
              name="labelSelect"
              label="Service"
              // label={
              //   <div className="serviceHeader">
              //     <>Service</>
              //     <div className="InfoIcon">
              //       <Popover trigger="hover" content={content}>
              //         <InfoIcon />
              //       </Popover>
              //     </div>
              //   </div>
              // }
              labelAlign="left"
            >
              <Select
                allowClear
                className="labelSelect"
                placeholder="
                Choose service"
                mode="multiple"
                suffixIcon={<DropdownIcon />}
                onChange={(e) => serviceLabelItem(e)}
                onSelect={() => {
                  setServiceEnabled(true);
                }}
                onClear={() => {
                  setServiceEnabled(false);
                }}
              >
                {labelOption.map?.((label, i) => (
                  <Option key={label + i} value={label}>
                    {label}
                  </Option>
                ))}
              </Select>
            </Item>
            <Item name="typeSelect" label="Type" labelAlign="left">
              <Select
                allowClear
                className="typeSelect"
                placeholder="
              Choose type"
                mode="multiple"
                suffixIcon={<DropdownIcon />}
                onChange={(e) => typeItem(e)}
                onSelect={() => {
                  setTypeEnabled(true);
                }}
                onClear={() => {
                  setTypeEnabled(false);
                }}
              >
                {typeName?.map((type) => {
                  return (
                    <Option key={type} value={type}>
                      {type}
                    </Option>
                  );
                })}
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
                mode="multiple"
                suffixIcon={<DropdownIcon />}
                onChange={(e) => elevationItem(e)}
                onSelect={() => {
                  setElevationEnabled(true);
                }}
                onClear={() => {
                  setElevationEnabled(false);
                }}
              >
                {elevationName?.map((elevation) => (
                  <Option key={elevation} value={elevation}>
                    {elevation}
                  </Option>
                ))}
              </Select>
            </Item>
            <Item name="RangeDateLabel" label="Range Date" labelAlign="left">
              <RangePicker
                allowClear
                className="RangeDateFilter"
                value={rangeDate}
                format={formatDate}
                onChange={(dates) => handleChangeRange(dates)}
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
