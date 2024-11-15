import React, { createContext, useEffect, useState } from "react";
import { dummyData } from '../dummy-data'

export const GlobalContext = createContext({});

const GlobalStateProvider = ({ children }) => {
    const [state, setState] = useState(JSON.parse(localStorage.getItem('chart')) || {
        tasks: [],
        mode: "Week",
        labels: [],
    });  // Main state


    //brings all days and used to get date at dataSchedule to get all tasks day
    const daysInfo = () => {
        let temp = {}
        dummyData?.map(e => e.scheduleDays.map(day => {
            temp[day.id] = day
        }))
        // console.log(temp)
        return temp;
    }

    // dataSchedule includes all properties that needs ganttChart
    const dataSchedule = function () {
        let allDays = daysInfo();
        let objTask = dataLabel();
        let tasksTemp = [];
        objTask?.map((el) => {
            tasksTemp.push({
                start: allDays[el?.dayId?.[0]]?.startDate,
                end: allDays[el?.dayId?.[el?.dayId?.length - 1]]?.endDate,
                progress: el?.progress,
                scheduleDays: el?.scheduleDays,
                name: el?.mergeLabel,
                label: el?.label,
                dependencies: el?.dependencies,
                dayId: el?.dayId,
                id: el?.id,
                custom_class: el?.customClass,
                dispatches: el?.dispatches,
                scheduleId: el?.scheduleId,
                crews: el?.crews,
                pliId: el?.pliId,
                type: el?.type,
                elevationLabel: el?.elevationLabel,
            })
        });
        // console.log(tasksTemp)
        return tasksTemp;
    };


    //Manipulation data in different levels to get properties that we pass at obj dataSchedule
    const dataLabel = () => {
        let obj = []
        dummyData?.map(v => {
            Object?.values(v?.toBeScheduled).flatMap(el => {
                el?.flatMap?.(x => {
                    x?.serviceOptions?.map?.(e => {
                        e?.map(s => {
                            s?.items?.map(item => {
                                obj.push({
                                    id: `${x?.label} ${s?.elevationLabel} PLI ${item.id}`,
                                    dependencies: item?.id === 1 ? "" : `${x?.label} ${s?.elevationLabel} PLI ${item.id - 1},`,
                                    mergeLabel: `${x?.label} - ${s?.elevationLabel} - PLI ${item?.id}`,
                                    dayId: item?.days,
                                    pliId: item?.id,
                                    progress: item?.totalProgress,
                                    label: x?.label,
                                    elevationLabel: s?.elevationLabel,
                                    customClass: s?.type,
                                    type: s?.type,
                                    dispatches: v?.dispatches,
                                    scheduleId: v?.scheduleId,
                                    crews: v?.crews,
                                    scheduleDays: v?.scheduleDays,
                                })
                            })
                        })
                    })
                })
            })
        })
        return obj;
    }

    const handleUpdate = (taskObject) => {
        state.tasks[state.tasks.findIndex(el => el.id === taskObject.id)] = taskObject;
        setState(state);
    };

    useEffect(() => {
        if (!!state) {
            daysInfo()
            const tasks = dataSchedule()
            const labels = tasks?.map(e => e?.name)  // get all Labels and display in UI 
            setState({ ...state, tasks, labels });
        }
    }, [state.mode, state.deleted]);

    return (
        <GlobalContext.Provider
            value={{ ...state, setState, handleUpdate }}
        >
            {children}
        </GlobalContext.Provider>
    );
};

export default GlobalStateProvider;