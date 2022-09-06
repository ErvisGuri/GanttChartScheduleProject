import * as React from "react";
import { useState, useEffect } from "react";

import "./modal.scss";

import moment from "moment";
import { Driver, Truck } from "../../../assets/DispatchIcons";
import { crews } from "../../dummy-data";

/*importing AntComponents*/
import { Modal, Card, Badge } from "antd";
import {
  BigRain,
  ChanceRain,
  Cloudy,
  Lighting,
  Rain,
  SlightCloudy,
  Snow,
  Sunny,
} from "../../../assets/weatherIcons";
import { Close } from "../../../assets/OtherIcons";
const initials = {
  id: "",
  ids: "",
  name: "",
  start: null,
  end: null,
  status: "",
  progress: "",
  dependencies: "",
};

function ScheduleDetailsModal(props) {
  const { open, handleClose, selectedTask, isEdit, setIsEdit } = props;

  const [state, setState] = useState(isEdit ? selectedTask : initials);
  const [data, setData] = useState([]);
  const close = () => {
    setIsEdit(false);
    setState(initials);
    handleClose();
  };

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
    selectedTask?.crews?.forEach((td) => {
      if (td.crewId === crews?.crewId) {
        sr.push({
          ...td,
          members: crews.members,
          foreman: crews.foreman,
        });
      }
    });
    return sr;
  };

  useEffect(() => {
    const crew = dataMerge();
    // console.log(crew);
    setData(crew);
  }, [selectedTask]);

  // console.log("selectedTask", selectedTask);
  return (
    <div className="modal">
      <Modal
        onCancel={close}
        centered
        className="task-modal"
        title={
          <div className="customTitleModal">
            <span>{selectedTask?.name}</span>
            <div onClick={close} className="closeSvgIcon">
              <Close />
            </div>
          </div>
        }
        visible={open}
        footer={null}
        closable={false}
      >
        <div className="dayInfo-container">
          {selectedTask?.scheduleDays
            ?.filter((fl) => {
              return selectedTask?.dayId?.some((sm) => {
                return fl?.id === sm;
              });
            })
            ?.map?.((el, i) => {
              return (
                <div className="cardContent" key={el + i}>
                  <Card
                    title={
                      <div className="dayCardTitle">
                        <b className="dayTitle">
                          {`Day ${el?.day} in Schedule`}{" "}
                        </b>
                        <span className="dayStatus">
                          {el.status}
                          {
                            <span className="statusBadge">
                              <Badge
                                color={styleBadge(el.status)}
                                size="large"
                              />
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
                      <div className="dayCardProgress">
                        <b>Progress: </b>
                        {`${selectedTask?.progress}%`}
                      </div>
                      <div className="dayCardTime">
                        <b>New York: </b>
                        <time className="dayTime">
                          {moment(el.weather[1].endTime).format("HH:mm")}
                        </time>
                      </div>
                      <div className="dayCardWeather">
                        <div className="weatherIcon">
                          {weatherIcon(el.weather[1].shortForecast)}
                        </div>
                        <span className="weatherTemp">{`${el.weather[1].temperature} ℉`}</span>
                        <span>{` Wind Speed: ${el.weather[1].windSpeed}`}</span>
                      </div>
                      {selectedTask?.dispatches
                        ?.filter(
                          (ds) =>
                            moment(ds.dispatchDate).format("MM/DD/YYYY") ===
                            moment(el?.startDate).format("MM/DD/YYYY")
                        )
                        ?.map?.((dispac, i) => {
                          return (
                            <div className="dispatchDiv" key={dispac + i}>
                              <div className="driverDiv">
                                <Driver />
                                <div className="driverName">
                                  {dispac.driverName}
                                </div>
                              </div>
                              <div className="fleetDiv">
                                <Truck />
                                <div className="fleetName">
                                  {dispac.fleetName}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      {data.map((crew, i) => {
                        return (
                          <div key={crew + i}>
                            <div className="foremanDiv">
                              <span className="foremanIcon">Supervisor</span>
                              <div>{crew?.foreman}</div>
                            </div>
                            <div className="memebersDiv">
                              {crew?.members?.map((it) => (
                                <div className="eachMemeber">
                                  <Badge color={"black"} />
                                  {it}
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </Card>
                </div>
              );
            })}
        </div>
      </Modal>
    </div>
  );
}

export default ScheduleDetailsModal;
