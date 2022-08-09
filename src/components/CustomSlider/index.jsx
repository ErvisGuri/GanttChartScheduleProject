import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";
import { GlobalContext } from "../../stateManagment/Contexts/GlobalStateProvider";

const useStyles = makeStyles((theme) => ({
  root: {
    // backgroundColor: "black",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    padding: 64,
  },
  margin: {
    height: theme.spacing(3),
  },
}));

const marks = [
  {
    value: 0,
    label: "Quarter Day",
  },
  {
    value: 10,
    label: "Half Day",
  },
  {
    value: 20,
    label: "Day",
  },
  {
    value: 30,
    label: "Week",
  },
  {
    value: 40,
    label: "Month",
  },
];

function valuetext(value) {
  return `${value}`;
}

export default function CustomSlider() {
  const classes = useStyles();
  const globalCTX = React.useContext(GlobalContext);

  const handleChange = (e, newValue) => {
    let temp;

    if (newValue === 0) {
      temp = "Quarter Day";
    }
    if (newValue === 10) {
      temp = "Half Day";
    }
    if (newValue === 20) {
      temp = "Day";
    }
    if (newValue === 30) {
      temp = "Week";
    }
    if (newValue === 40) {
      temp = "Month";
    }

    // console.log(temp, newValue);
    if (globalCTX !== undefined) {
      globalCTX.setState({ ...globalCTX, mode: temp });
    }
  };

  return (
    <div className={classes.root}>
      <Slider
        defaultValue={30}
        getAriaValueText={valuetext}
        aria-labelledby="discrete-slider-custom"
        step={10}
        valueLabelDisplay="auto"
        marks={marks}
        max={40}
        onChange={handleChange}
      />
    </div>
  );
}
