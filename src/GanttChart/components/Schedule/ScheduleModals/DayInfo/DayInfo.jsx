import React, { useState } from "react";
import "../MainModal/modal.scss";
import moment from "moment";
import { Card, Badge } from "antd";
import {
  BigRain,
  ChanceRain,
  Cloudy,
  Lighting,
  Rain,
  SlightCloudy,
  Snow,
  Sunny,
} from "../../../../../assets/weatherIcons";
import { Button } from "antd/lib/radio";
import DetailsModal from "../DetailsModal/DetailsModal";

const DayInfo = ({ selectedTask }) => {
  const [visible, setVisible] = useState(false);
  const styleBadge = (e) => {
    switch (e) {
      case "Confirmed":
        return "#7AC14D";
      case "Reconfirmed":
        return "#6CAD42";
      case "Cancel":
        return "#787677";
      case "Posponded":
        return "#6BBED1";
      default:
        return "#f5f5f7";
    }
  };

  const weatherIcon = (e) => {
    switch (e) {
      case "Chance Rain Showers":
        return <Rain />;
      case "Partly Sunny then Chance Rain Showers":
        return <ChanceRain />;
      case "Sunny":
        return <Sunny />;
      case "Mostly Clear":
        return <Sunny />;
      case "Mostly Sunny":
        return <Sunny />;
      case "Mostly Cloudy then Chance Rain Showers":
        return <ChanceRain />;
      case "Showers And Thunderstorms":
        return <BigRain />;
      case "Chance Showers And Thunderstorms":
        return <Rain />;
      case "Showers And Thunderstorms Likely":
        return <Lighting />;
      case "Partly Cloudy":
        return <Cloudy />;
      case "Partly Sunny then Chance Showers And Thunderstorms":
        return <ChanceRain />;
      case "Chance Showers And Thunderstorms then Mostly Cloudy":
        return <Cloudy />;
      case "Partly Sunny then Slight Chance Showers And Thunderstorms":
        return <SlightCloudy />;
      case "Slight Chance Showers And Thunderstorms":
        return <Rain />;
      default:
        return;
    }
  };

  return (
    <div className="dayInfo-container">
      {selectedTask.scheduleDays.map((e, i) => {
        return (
          <div className="cardContent" key={i}>
            <Card
              title={
                <div className="dayCardTitle">
                  <b className="dayTitle">Day {e.day}</b>
                  <div className="dayDetails">
                    <Button
                      onClick={() => setVisible(true)}
                      className="detailsBtn"
                    >
                      Details
                    </Button>
                  </div>
                  <span className="dayStatus">
                    {e.status}
                    {
                      <span className="statusBadge">
                        <Badge color={styleBadge(e.status)} size="large" />
                      </span>
                    }
                  </span>
                </div>
              }
            >
              <div className="dayCardBody">
                <div className="dayDate">
                  {moment(e.startDate).format("MM/DD/YYYY hh:mm")} -{" "}
                  {moment(e.endDate).format("MM/DD/YYYY hh:mm")}
                </div>
                <div className="dayNotes">
                  <b>Notes: </b>
                  {e.notes}
                </div>
                <div className="dayCardTime">
                  New York: {""}
                  <time className="dayTime">
                    {moment(e.weather[1].endTime).format("HH:mm")}
                  </time>
                </div>
                <div className="dayCardWeather">
                  <div className="weatherIcon">
                    {weatherIcon(e.weather[1].shortForecast)}
                  </div>
                  <span className="weatherTemp">{`${
                    e.weather[1].temperature
                  } F ${""} `}</span>
                  <span> {` Wind Speed: ${e.weather[1].windSpeed}`}</span>
                </div>
              </div>
            </Card>
          </div>
        );
      })}
      <DetailsModal
        selectedTask={selectedTask}
        setVisible={setVisible}
        visible={visible}
      />
    </div>
  );
  // });
};

export default DayInfo;
