import React from "react";

import { Slider } from "antd";
import { GlobalContext } from "../../stateManagement/GlobalStateProvider";

import "./Slider.scss";

const marks = {
  0: {
    label: "Quarter Day",
  },
  10: {
    label: "Half Day",
  },
  20: {
    label: "Day",
  },
  30: {
    label: "Week",
  },
  40: {
    label: "Month",
  },
};

export default function CustomSlider() {
  const globalCTX = React.useContext(GlobalContext);

  const handleChange = (value) => {
    let temp;

    if (value === 0) {
      temp = "Quarter Day";
    }
    if (value === 10) {
      temp = "Half Day";
    }
    if (value === 20) {
      temp = "Day";
    }
    if (value === 30) {
      temp = "Week";
    }
    if (value === 40) {
      temp = "Month";
    }

    if (globalCTX !== undefined) {
      globalCTX.setState({ ...globalCTX, mode: temp });
    }
  };

  return (
    <div className="slider-test">
      <Slider
        className="SliderView"
        marks={marks}
        step={10}
        defaultValue={30}
        max={40}
        tooltipVisible={false}
        onAfterChange={handleChange}
      />
    </div>
  );
}
