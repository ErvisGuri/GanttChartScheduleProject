import * as React from "react";
import { useState, useEffect } from "react";

import "./modal.scss";

import moment from "moment";
import { Driver, Truck } from "../../../assets/DispatchIcons";
import { crews } from "../../dummy-data";

/*importing AntComponents*/
import { Modal, Card, Badge, InputNumber } from "antd";
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
import { Close, EditProgressIcon } from "../../../assets/OtherIcons";
import { Button } from "antd/lib/radio";

function ScheduleDetailsModal(props) {
  const {
    open,
    handleClose,
    selectedTask,
    isEdit,
    onChangeContent,
    setIsEdit,
  } = props;

  const [crewsData, setCrewsData] = useState([]);
  const [progressTask, setProgressTask] = useState(isEdit ? selectedTask : "");
  const [disabledBtn, setDisabledBtn] = useState(true);
  const [toBeEdited, setToBeEdited] = useState(null);

  // Status Badge Style Function
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

  //condition to match weatherIcon with cases
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

  console.log(progressTask);

  //Manipulate crews on main schedule object
  const dataMerge = () => {
    let tempMerge = [];
    selectedTask?.crews?.forEach((td) => {
      if (td.crewId === crews?.crewId) {
        tempMerge.push({
          ...td,
          members: crews.members,
          foreman: crews.foreman,
        });
      }
    });
    return tempMerge;
  };

  const handleCloseModal = () => {
    handleClose();
    setIsEdit(false);
    // setProgressTask(progressTask);
  };

  const handleUpdate = (e) => {
    // e.preventDefault();
    setIsEdit(true);
    onChangeContent(progressTask);
    handleCloseModal();
  };

  const handleChangeProgress = (e) => {
    setProgressTask(e.target.value);
  };

  console.log(onChangeContent(progressTask));

  const disableUpdateBtn = () => {
    setDisabledBtn(!disabledBtn);
  };

  const openEditingCard = (id) => {
    setIsEdit(false);
    setToBeEdited(id);
  };

  // close the edit card view
  const handleHideEditView = (id) => {
    // setShowViewEditCard(false);
    if (id === toBeEdited) {
      setToBeEdited(null);
    }
  };

  useEffect(() => {
    const crew = dataMerge();
    setCrewsData(crew);
  }, [selectedTask]);

  useEffect(() => {
    if (!!selectedTask) {
      setProgressTask(selectedTask?.progress);
    }
  }, [selectedTask]);

  console.log(isEdit);

  return (
    <div className="modal">
      <Modal
        onCancel={handleCloseModal}
        centered
        className="task-modal"
        title={
          <div className="customTitleModal">
            <span>{selectedTask?.name}</span>
            <div onClick={handleCloseModal} className="closeSvgIcon">
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
                      {el.id === toBeEdited ? (
                        <div className="dayCardProgress">
                          <div className="progressUpdate-div">
                            <b>Progress:</b>
                            <InputNumber
                              className="inputProgress"
                              bordered={false}
                              type="number"
                              name="progress"
                              defaultValue={progressTask}
                              onChange={(e) => handleChangeProgress(e)}
                              onClick={disableUpdateBtn}
                            />
                          </div>
                          <div className="btnVisible">
                            <Button
                              onClick={() => handleHideEditView(el.id)}
                              className="progressBtnUpdate"
                            >
                              Cancel
                            </Button>
                            <Button
                              onClick={handleUpdate}
                              className="progressBtnUpdate"
                            >
                              Update
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="dayCardProgress">
                          <div className="progressUpdate-div">
                            <b>Progress:</b>
                            <>{` ${progressTask} %`}</>
                          </div>
                          <div onClick={() => openEditingCard(el?.id)}>
                            <>Edit</>
                            <EditProgressIcon
                              style={{
                                cursor: "pointer",
                                fill: "#323338",
                              }}
                            />
                          </div>
                        </div>
                      )}
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
                      {crewsData.map((crew, i) => {
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
