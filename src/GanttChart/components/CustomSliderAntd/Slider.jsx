import React from "react";

import { Slider } from "antd";
import { GlobalContext } from "../../stateManagement/Contexts/GlobalStateProvider";

const marks = {
  0: {
    label: "Quarter Day",
  },
  10: {
    label: "Half Day",
  },
  20: {
    value: 20,
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
  //   const classes = useStyles();
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

    // console.log(temp, value);
    if (globalCTX !== undefined) {
      globalCTX.setState({ ...globalCTX, mode: temp });
    }
  };

  return (
    <div>
      <Slider
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
