import React from "react";

const DayInfo = ({ selectedTask }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div>
        <div>
          <span>{`Day: ${selectedTask.day}`}</span>
        </div>
        <div>
          <span>{`Notes: ${selectedTask.notes}`}</span>
        </div>
        <div>
          <span>{`Status: ${selectedTask.status}`}</span>
        </div>
      </div>
      <div
        className="times-div"
        style={{
          display: "flex",
          flexDirection: "column",
          width: "600px",
          gap: "30px",
        }}
      >
        <div
          className="time-weather-div"
          style={{
            display: "flex",
            fontSize: "16px",
            fontWeight: 500,
            gap: 20,
          }}
        >
          {`New York: 19:30`}
          <span className="fahrenhiet-span">
            <div style={{ display: "flex", alignItems: "center" }}>
              {`${selectedTask.weather} ℉ `}
            </div>
          </span>
        </div>
      </div>
    </div>
  );
};

export default DayInfo;
