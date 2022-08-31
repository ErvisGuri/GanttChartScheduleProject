import React, { useContext, useState } from "react";

import { Button, Modal, Select } from "antd";
import "./FilterModal.scss";
import { GlobalContext } from "../../../stateManagement/Contexts/GlobalStateProvider";
import { label, elevationLabel, type, pliId } from "../../../dummy-data";
const { Option } = Select;

export const FilterModal = ({ setVisibleFilter, visibleFilter }) => {
  const globalCTX = useContext(GlobalContext);
  const [selectedLabel, setSelectedLabel] = useState(null);
  const [selectedElLabel, setSelectedElLabel] = useState(null);
  const [selectedPLI, setSelectedPLI] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [filterTask, setFilterTask] = useState(globalCTX);

  const handleChangeLabel = (event) => {
    setSelectedLabel(event);
  };
  const handleChangeElLabel = (event) => {
    setSelectedElLabel(event);
  };
  const handleChangePLI = (event) => {
    setSelectedPLI(event);
  };
  const handleChangeType = (event) => {
    setSelectedType(event);
  };

  console.log(globalCTX);

  const handleChangeFilter = () => {
    const labelFilter = globalCTX?.tasks?.filter?.((el) => {
      if (
        !!selectedLabel &&
        !!selectedElLabel &&
        !!selectedPLI &&
        !!selectedType
      ) {
        return (
          el?.label === selectedLabel &&
          el?.elevationLabel === selectedElLabel &&
          el?.pliId === selectedPLI &&
          selectedType === el?.type
        );
      } else if (!!selectedElLabel && !!selectedPLI && !!selectedType) {
        return (
          el?.elevationLabel === selectedElLabel &&
          el?.pliId === selectedPLI &&
          selectedType === el?.type
        );
      } else if (!!selectedPLI && !!selectedType) {
        return el?.pliId === selectedPLI && selectedType === el?.type;
      } else if (!!selectedType) {
        return selectedType === el?.type;
      }
    });

    // const ElLabelFilter = globalCTX?.tasks?.filter?.(
    //   (el) => el?.elevationLabel === selectedElLabel
    // );
    // const typeFilter = globalCTX?.tasks?.filter?.(
    //   (el) => el?.type === selectedType
    // );
    // const pliIdFilter = globalCTX?.tasks?.filter?.(
    //   (el) => el?.pliId === selectedPLI
    // );

    let search = {
      deleted: globalCTX.deleted,
      labels: globalCTX.labels,
      mode: globalCTX.mode,
      setState: globalCTX.setState,
      state: globalCTX.state,
      tasks: {},
    };
    console.log(labelFilter);
    // console.log(ElLabelFilter);
    // console.log(typeFilter);
    // console.log(pliIdFilter);

    const filter = () => {
      const de = globalCTX.setState({});
    };

    selectedLabel !== undefined ||
    selectedLabel !== "" ||
    selectedLabel !== null
      ? setFilterTask(filter)
      : setFilterTask(globalCTX.state);
  };

  // console.log(globalCTX);
  // console.log(selectedLabel, selectedElLabel, selectedPLI, selectedType);

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
        destroyOnClose
        width="680px"
      >
        <div className="filterBody">
          <div className="labelFilter">
            <Select onChange={handleChangeLabel} placeholder="Label">
              {label?.map?.((x, i) => (
                <Option key={i} value={x}>
                  {x}
                </Option>
              ))}
            </Select>
          </div>
          <div className="elevationLabelFilter">
            <Select onChange={handleChangeElLabel} placeholder="ElevationLabel">
              {elevationLabel?.map?.((x, i) => (
                <Option key={i} value={x}>
                  {x}
                </Option>
              ))}
            </Select>
          </div>
          <div className="pliFilter">
            <Select onChange={handleChangePLI} placeholder="PLI">
              {pliId?.map?.((x, i) => (
                <Option key={i} value={x}>
                  {x}
                </Option>
              ))}
            </Select>
          </div>
          <div className="typeFilter">
            <Select onChange={handleChangeType} placeholder="type">
              {type?.map?.((x, i) => (
                <Option key={i} value={x}>
                  {x}
                </Option>
              ))}
            </Select>
          </div>
        </div>
        <div className="filterFooter">
          <div>
            <Button>Clear</Button>
          </div>
          <div>
            <Button onClick={handleOnclick}>Submit</Button>
          </div>
        </div>
      </Modal>
    </>
  );
};
