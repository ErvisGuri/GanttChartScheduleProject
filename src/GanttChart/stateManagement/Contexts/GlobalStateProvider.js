import React, { createContext, useEffect, useState } from "react";
import { dummyData } from '../../dummy-data'

export const GlobalContext = createContext({});

const GlobalStateProvider = ({ children }) => {
    const [state, setState] = useState(JSON.parse(localStorage.getItem('chart')) || {
        tasks: [],
        mode: "Week",
        labels: [],
        deleted: [],
    });

    const daysInfo = () => {
        let temp = {}
        dummyData?.map(e => e.scheduleDays.map(day => {
            temp[day.id] = day
        }))
        console.log(temp)
        return temp;
    }

    const dataSchedule = function () {
        let allDays = daysInfo();
        let objTask = dataLabel();
        let tasksTemp = [];
        objTask?.map((el) => {
            tasksTemp.push({
                start: allDays[el?.dayId?.[0]]?.startDate,
                end: allDays[el?.dayId?.[el?.dayId?.length - 1]]?.endDate,
                progress: el.progress,
                scheduleDays: el.scheduleDays,
                name: el.mergeLabel,
                label: el.label,
                dependencies: el.dependencies,
                dayId: el.dayId,
                id: el.id,
                custom_class: el?.customClass,
                dispatches: el?.dispatches,
                scheduleId: el?.scheduleId,
                crews: el?.crews,
                pliId: el.pliId,
                type: el.type,
                elevationLabel: el.elevationLabel,

            })
        });
        return tasksTemp;
    };

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
                                    dependencies: item.id === 1 ? "" : `${x?.label} ${s?.elevationLabel} PLI ${item.id - 1},`,
                                    mergeLabel: `${x?.label} - ${s?.elevationLabel} - PLI ${item?.id}`,
                                    dayId: item?.days,
                                    scheduleDays: v?.scheduleDays,
                                    label: x.label,
                                    elevationLabel: s.elevationLabel,
                                    progress: item?.totalProgress,
                                    customClass: s?.type,
                                    dispatches: v?.dispatches,
                                    scheduleId: v.scheduleId,
                                    crews: v?.crews,
                                    pliId: item.id,
                                    type: s.type
                                })
                            })
                        })
                    })
                })
            })
        })
        console.log(obj)
        return obj;
    }

    console.log(state)

    useEffect(() => {
        if (!!state) {
            daysInfo()
            const label = dataLabel()
            const labels = label?.map?.(e => e.mergeLabel)
            const tasks = dataSchedule()
            setState({ ...state, tasks, labels });
        }
    }, [state.mode, state.deleted]);

    return (
        <GlobalContext.Provider
            value={{ ...state, setState }}
        >
            {children}
        </GlobalContext.Provider>
    );
};

export default GlobalStateProvider;