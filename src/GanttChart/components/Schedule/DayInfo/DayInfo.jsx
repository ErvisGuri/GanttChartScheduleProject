import React, { useEffect, useState } from "react";
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
} from "../../../../assets/weatherIcons";
import _ from "lodash";
import { crews } from "../../../dummy-data";
import { dummyData } from "../../../dummy-data";

const DayInfo = ({ selectedTask }) => {
  const [data, setData] = useState("");
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

  const dataMerge = () => {
    let sr = [];
    dummyData.map((el) => {
      el?.crews?.map((td) => {
        if (td.crewId === crews?.crewId) {
          console.log("td", td);
          sr.push({
            ...td,
            members: crews.members,
            foreman: crews.foreman,
          });
        } else {
          sr.push({
            ...td,
          });
        }
      });
    });
    console.log(sr);
    return sr;
  };

  useEffect(() => {
    const crew = dataMerge();
    setData(crew);
  }, [selectedTask]);

  console.log(selectedTask);

  return (
    <div className="dayInfo-container">
      {selectedTask?.scheduleDays
        ?.filter((fl) => {
          return selectedTask?.dayId?.some((sm) => {
            return fl?.id === sm;
          });
        })
        ?.map?.((el, i) => {
          console.log(el);
          return (
            <div className="cardContent" key={i}>
              <Card
                title={
                  <div className="dayCardTitle">
                    <b className="dayTitle">{`Day ${el?.day} in Schedule`} </b>
                    <span className="dayStatus">
                      {el.status}
                      {
                        <span className="statusBadge">
                          <Badge color={styleBadge(el.status)} size="large" />
                        </span>
                      }
                    </span>
                  </div>
                }
              >
                <div className="dayCardBody">
                  <div></div>
                  <div className="dayDate">
                    {moment(el.startDate).format("MM/DD/YYYY hh:mm")} -{" "}
                    {moment(el.endDate).format("MM/DD/YYYY hh:mm")}
                  </div>
                  <div className="dayNotes">
                    <b>Notes: </b>
                    {el.notes}
                  </div>
                  <div>
                    <b>Progress: </b>
                    {`${selectedTask?.progress}%`}
                  </div>
                  <div className="dayCardTime">
                    New York: {""}
                    <time className="dayTime">
                      {moment(el.weather[1].endTime).format("HH:mm")}
                    </time>
                  </div>
                  <div className="dayCardWeather">
                    <div className="weatherIcon">
                      {weatherIcon(el.weather[1].shortForecast)}
                    </div>
                    <span className="weatherTemp">{`${
                      el.weather[1].temperature
                    } ℉ ${""} `}</span>
                    <span> {` Wind Speed: ${el.weather[1].windSpeed}`}</span>
                  </div>
                  {selectedTask?.dispatches?.map?.((el, i) => {
                    console.log(el);
                    return (
                      <div key={i}>
                        <div className="driverName">{el.driverName}</div>
                        <div className="fleetName">{el.fleetName}</div>
                      </div>
                    );
                  })}
                  {data.map?.((el, i) => {
                    return (
                      <div key={i}>
                        <div>{el?.foreman}</div>
                        <div>{el?.members}</div>
                      </div>
                    );
                  })}
                </div>
              </Card>
            </div>
          );
        })}
    </div>
  );
};

export default DayInfo;
